# Stoqr — Client Inventory Display Feed (`file_import.md`)

> **Status: PLANNING.** This document designs how the tenant's daily inventory file (RIO WMS export) is uploaded into Stoqr **purely to display to clients in their portal** — replacing the file the tenant currently emails clients every day. Sections marked **[DECISION]** are open.

---

## Part 1: What this is

A **daily client-visibility feed** that the tenant uploads to replace the inventory file they currently email clients each day. It does **two** things with the data (confirmed):
1. **Stores the raw rows verbatim** in `client_inventory_snapshot` tables — including columns that have no home in core inventory (bonded lot, permit, GRN, ageing, dimensions) — for display.
2. **Projects the quantities into the operational model** — `inventory_stocks` + `stock_allocations` — so existing portal inventory views work.

**Is NOT:** a storage list (inbound) or packing list (outbound). The tenant's external WMS stays authoritative; this is a daily mirror refreshed for a defined period.

---

## Part 1.5: Confirmed Process (walkthrough)

1. **Upload** the file.
2. **Parse** → extract rows.
3. **Process** each row:
   - **Client:** resolve by `AcCode` against the tenant's client **names**; if no match → **auto-create** the client. *(Match is by name — accepted limitation; no code field available.)*
   - **Item:** look up `SKU` in inventory; if missing → **auto-create** the item.
   - **Location:** `inventory_stocks.location_id` is required but absent from the file → **pass a dummy/placeholder location for now** (proper location + feed-row cleanup deferred).
   - **`OnHandLHUQty`** → `inventory_stocks.quantity_on_hand`.
   - **`AllocatedLHUQty`** → a `stock_allocations` row, `status = 'allocated'`.
   - **`PickedLHUQty`** → a `stock_allocations` row, `status = 'picked'`.
   - **`HeldLHUQty`** → a `stock_allocations` row, `status = 'on_hold'`.
   - **`AvailableLHUQty`** → **computed** (`quantity_available` generated column), not stored.

### Required core-schema changes (to support this)
- **`stock_allocations.job_id`** → **nullable** (FK constraint to `jobs` **paused** for feed-created rows; they have no Job).
- **`stock_allocations.status`** → add **`on_hold`**.
- **`quantity_allocated` rollup invariant** → now `SUM(quantity) WHERE status IN ('reserved','allocated','picked','on_hold')`. This makes `quantity_available = on_hand − allocated − picked − held` fall straight out of the generated column = `AvailableLHUQty`.

### Client portal access (confirmed)
This is mainly a data check; all clients in the file are expected to already exist. If a new client is auto-created and they ask for access, the **tenant issues a password manually** — no automated onboarding from the feed.

---

## Part 2: Data Model (self-contained, display-only)

Two new tables, isolated from the inventory schema.

```
client_inventory_snapshots (one per uploaded file / day)
├── id                  UUID PK
├── tenant_id           UUID (RLS)
├── snapshot_date       DATE              -- the business day this file represents
├── source_file_name    VARCHAR(255)
├── file_type           ENUM('xlsx', 'csv')
├── storage_key         TEXT              -- Azure Blob / S3 (raw file retained)
├── status              ENUM('uploaded', 'saved_to_storage', 'queued', 'wiping_previous',
│                             'processing', 'active', 'failed')  -- latest-only; one active at a time
├── row_count           INT
├── error_message       TEXT (nullable)
├── uploaded_by         UUID FK → users
├── processed_at        TIMESTAMPTZ (nullable)
├── expires_at          TIMESTAMPTZ (nullable)  -- retention cutoff (see [DECISION 2])
├── created_at          TIMESTAMPTZ
└── updated_at          TIMESTAMPTZ

client_inventory_snapshot_rows (parsed display rows, verbatim)
├── id                  UUID PK
├── tenant_id           UUID (RLS)
├── snapshot_id         UUID FK → client_inventory_snapshots
├── client_id           UUID FK → clients (nullable — resolved from AcCode; null if unmatched)
├── account_code        VARCHAR(100)      -- AcCode as in file (for matching/audit)
├── line_number         INT
│
│ -- Display columns (kept set; dropped: Code2, PerOuterValue, TotalValue,
│ --                  ItemDutiableQuantity, ItemDutiableUOM, Literage/KGM)
├── sku                 VARCHAR(100)
├── description         TEXT (nullable)
├── on_hand_qty         DECIMAL (nullable)
├── allocated_qty       DECIMAL (nullable)
├── picked_qty          DECIMAL (nullable)
├── held_qty            DECIMAL (nullable)
├── available_qty       DECIMAL (nullable)
├── grn_number          VARCHAR(100) (nullable)
├── customer_reference  VARCHAR(255) (nullable)
├── gr_date             DATE (nullable)
├── ageing_days         INT (nullable)
├── ops_job_number      VARCHAR(100) (nullable)
├── weight              DECIMAL (nullable)
├── total_weight        DECIMAL (nullable)
├── uom_descr           VARCHAR(50) (nullable)
├── po_number           VARCHAR(100) (nullable)
├── hs_code             VARCHAR(20) (nullable)
├── length              DECIMAL (nullable)
├── width               DECIMAL (nullable)
├── height              DECIMAL (nullable)
├── vol                 DECIMAL (nullable)
├── total_vol           DECIMAL (nullable)
├── area                DECIMAL (nullable)
├── total_area          DECIMAL (nullable)
├── bonded_lot_no       VARCHAR(255) (nullable)
├── permit              VARCHAR(100) (nullable)
├── vessel              VARCHAR(255) (nullable)   -- stored as text (display only, not vessel_id)
├── supplier            VARCHAR(255) (nullable)   -- stored as text (display only, not supplier FK)
├── created_at          TIMESTAMPTZ
```

> Values are stored as parsed text/number/date for sorting & filtering in the portal — **not** linked to `inventory_items`, `vessels`, `suppliers`, etc. This keeps the feed a pure mirror.

---

## Part 3: Upload & Refresh Flow

**Refresh model: daily full wipe-and-reload, latest-only (no history).** Each day's upload first **deletes the prior feed data**, then loads the new file fresh.

```
uploaded → saved_to_storage → queued → wiping_previous → processing → active
                                                                     → failed
```

| Stage | What happens |
|-------|--------------|
| `uploaded` | Tenant uploads the daily file |
| `saved_to_storage` | Raw file persisted to blob storage |
| `queued` | Enqueued for the processor |
| `wiping_previous` | **Delete prior feed data** (see below) |
| `processing` | `ClientInventoryFeedProcessorJob` parses + loads rows |
| `active` | Rows live; clients see them in the portal |
| `failed` | Parse error → abort; **prior active data is left intact** (wipe runs only after a successful parse) |

### Daily wipe — what gets deleted, and how it stays safe
Feed stock all lands in **one dedicated dummy "feed" location** per tenant, so that location *is* the marker (no schema change to `inventory_stocks` needed). The daily wipe:
1. Delete `inventory_stocks` at the tenant's feed location → cascades to their `stock_allocations` (the `on_hold`/`allocated`/`picked` rows, all with null `job_id`).
2. Delete the prior `client_inventory_snapshot` + its rows.
3. Then load the new file.

Because the wipe is **scoped to the feed location**, it can never delete real operational stock. **Order matters:** parse the new file successfully *first*, only then wipe + load (so a bad file never destroys the live data).

**[DECISION] Retention:** how long the feed runs overall (the "certain period") — when the tenant stops the daily feed for a client and the feed location is cleared for good. Drives an end-date / teardown, not per-day history.

---

## Part 4: Client Portal Display

- Client logs into the portal → sees **their own rows only** from the current `active` snapshot.
- Rows filtered by `client_id` (resolved from `account_code`/AcCode at parse time).
- Respects the existing **per-client visibility config** (tenant decides this feed is enabled for a client).
- Columns shown are configurable per tenant **[DECISION 4]** (which of the kept columns to surface, and labels).

**[DECISION 3] Client matching:** a single uploaded file likely contains **many clients' rows** (the tenant's whole bonded inventory). Resolve each row's `AcCode` → Stoqr `client_id`. How to handle rows whose `AcCode` doesn't match any client (skip / store-unmatched / fail)?

---

## Part 5: Column Mapping (complete disposition)

**All kept columns are stored verbatim in `client_inventory_snapshot_rows`** (the display source). A subset is additionally **projected into core** (`inventory_stocks` / `stock_allocations`, or existing `inventory_items` fields set on auto-create). Some are **calculated** (not stored). The rest are **dropped**.

| # | File column | Disposition |
|---|-------------|-------------|
| 1 | `AcCode` | **Resolve** → `client_id` (match by name, auto-create) |
| 2 | `SKUCode` | **Resolve** → `inventory_items.sku` (auto-create) |
| 3 | `Code2` | ❌ dropped |
| 4 | `Description` | snapshot; seeds `inventory_items.name/description` on create |
| 5 | `OnHandLHUQty` | **Core** → `inventory_stocks.quantity_on_hand` |
| 6 | `AllocatedLHUQty` | **Core** → `stock_allocations` row, `status='allocated'` |
| 7 | `PickedLHUQty` | **Core** → `stock_allocations` row, `status='picked'` |
| 8 | `HeldLHUQty` | **Core** → `stock_allocations` row, `status='on_hold'` |
| 9 | `AvailableLHUQty` | **Computed** (`quantity_available` generated column) — not stored |
| 10 | `GRNo` | snapshot only |
| 11 | `CustomerReference` | snapshot only |
| 12 | `GRDate` | snapshot; **Core** → `inventory_stocks.received_at` |
| 13 | `AgeingDays` | snapshot (or computed from `GRDate`) |
| 14 | `Reference 3` (ops job no.) | snapshot only |
| 15 | `WT` | snapshot; seeds `inventory_items.weight_kg` on create |
| 16 | `TotalWT` | **Calculated** (`WT × OnHand`) — not stored |
| 17 | `LHUUomDescr` | snapshot; seeds `inventory_items.base_uom` on create |
| 18 | `PONumber` | snapshot only |
| 19 | `PerOuterValue` | ❌ ignored |
| 20 | `TotalValue` | ❌ ignored |
| 21 | `HSCode` | snapshot; seeds `inventory_items.hs_code` on create |
| 22 | `ItemDutiableQuantity` | ❌ dropped |
| 23 | `ItemDutiableUOM` | ❌ dropped |
| 24 | `Literage/KGM` | ❌ dropped |
| 25 | `Length` | snapshot; seeds `inventory_items.length_cm` |
| 26 | `Width` | snapshot; seeds `inventory_items.width_cm` |
| 27 | `Height` | snapshot; seeds `inventory_items.height_cm` |
| 28 | `Vol` | snapshot; seeds `inventory_items.volume_m3` (or calc `L×W×H`) |
| 29 | `TotalVol` | **Calculated** (`Vol × OnHand`) — not stored |
| 30 | `Area` | **Calculated** (`L×W`) — not stored |
| 31 | `TotalArea` | **Calculated** (`Area × OnHand`) — not stored |
| 32 | `Bonded Lot No` | snapshot only |
| 33 | `Permit` | snapshot only |
| 34 | `Vessel` | snapshot only (text) — `inventory_stocks.vessel_id` not set |
| 35 | `Supplier` | snapshot only (per-row); optionally seed `inventory_items.supplier_name` |

> Item-master fields (dims, weight, hs_code, uom, supplier) are **seeded on auto-create only** — the per-row values always live in the snapshot for display, so multiple rows of the same SKU never fight over the item master.

Column mapping config reuses `client_column_mappings` with `mapping_type = 'client_inventory_feed'`.

---

## Part 6: API Endpoints (draft)

**Tenant:**
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/v1/inventory-feed/upload` | Upload daily file |
| GET | `/api/v1/inventory-feed/snapshots` | List snapshots (status, date) |
| GET | `/api/v1/inventory-feed/snapshots/{id}` | Snapshot detail + rows |
| DELETE | `/api/v1/inventory-feed/snapshots/{id}` | Remove a snapshot |

**Client portal:**
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/v1/client/vendors/{tId}/inventory` | Current active snapshot — my rows |
| GET | `/api/v1/client/vendors/{tId}/inventory/export` | Download my rows (CSV/Excel) |

---

## Part 7: Background Jobs
| Job | Trigger | Action |
|-----|---------|--------|
| `ClientInventoryFeedProcessorJob` | On upload (queue) | Parse new file → on success, **wipe prior feed data** (feed location + prior snapshot) → load fresh → mark `active` |
| `ClientInventoryFeedTeardownJob` | Feed end-date / manual | Clear the feed location + snapshot for good when the daily feed period ends |

---

## Part 8: Open Decisions (still to resolve)
1. **Retention / feed period** — how long the daily feed runs overall before teardown (the "certain period"). Day-to-day there's no history to retain (latest-only).

### Resolved
- ✅ **Refresh:** daily full wipe-and-reload, latest-only (no history). Wipe is scoped to the dedicated feed location, and runs only **after** the new file parses successfully.
- ✅ Dual-write: snapshot tables **and** `inventory_stocks` + `stock_allocations`.
- ✅ `stock_allocations.job_id` nullable (FK paused); `on_hold` added to status + rollup.
- ✅ Client match by name + auto-create; item match by SKU + auto-create.
- ✅ Available is computed, not stored.
- ✅ **Location:** pass a dummy/placeholder for now.
- ✅ **Vessel & Supplier:** snapshot text only (no `vessel_id`/supplier FK resolution).
- ✅ **Non-core columns** (bonded lot, permit, hs_code, GRNo, ageing, dims) live in `client_inventory_snapshot_rows` only.
- ✅ Portal access handled manually by tenant.
