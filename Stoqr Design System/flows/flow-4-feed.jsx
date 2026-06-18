// Flow 4 — Client inventory display feed (daily import → portal mirror)
function Flow4() {
  const FEED_STAGES = [
    { key: 'uploaded', label: 'uploaded' },
    { key: 'saved', label: 'saved' },
    { key: 'queued', label: 'queued' },
    { key: 'wiping', label: 'wiping_prev' },
    { key: 'processing', label: 'processing' },
    { key: 'active', label: 'active' },
  ];
  return (
    <Flow
      n="4"
      id="flow-feed"
      title="Client inventory display feed"
      subtitle="The tenant's daily WMS export (RIO) uploaded into Stoqr purely to show clients their stock — replacing the file they email out every morning. It's a latest-only mirror: each upload parses first, then safely wipes yesterday's feed and reloads. Rows are stored verbatim for display and projected into the operational model so existing portal views just work."
      actors={['operator', 'system', 'client']}
    >
      {/* 1 — Upload daily file */}
      <Step
        n={1}
        actor="operator"
        title="Drop the daily inventory export"
        note="One file holds the tenant's whole bonded inventory — many clients' rows together. The importer accepts the same Excel/CSV drag-drop. The raw file is retained in blob storage as the source of truth for the day."
        transition={{ label: 'client_inventory_snapshots.status', steps: [{ k: 'muted', t: 'uploaded', dot: false }, { k: 'info', t: 'saved_to_storage' }, { k: 'info', t: 'queued' }] }}
      >
        <Screen app="operator" crumb="Inventory feed" title="Upload daily snapshot" w={560}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <Pill kind="brand" mono>snapshot_date: 2026-06-14</Pill>
            <Pill kind="info" mono>latest-only</Pill>
            <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>Replaces the file you email clients daily</span>
          </div>
          <Dropzone state="done" name="RIO-bonded-inventory-2026-06-14.xlsx" size="2.4 MB" rows={4120} type="xlsx" />
        </Screen>
      </Step>

      {/* 2 — Column disposition mapping */}
      <Step
        n={2}
        actor="operator"
        title="Map columns — resolve, project, store, drop"
        note="The RIO export carries far more than core inventory. Each column gets a disposition: Resolve (AcCode → client, SKU → item, auto-creating either), Core (projected into inventory_stocks / stock_allocations), Computed (derived, never stored), Snapshot (kept verbatim for display only), or Dropped. Saved per tenant as mapping_type = client_inventory_feed."
      >
        <Screen app="operator" crumb="Feed · mapping" title="Column disposition — RIO format" w={700}>
          <ColumnMap rows={[
            { col: '1', header: 'AcCode', sample: 'NW · Northwind', field: 'client_id', disp: 'resolve' },
            { col: '2', header: 'SKUCode', sample: 'SKU-049281-NV', field: 'inventory_items.sku', disp: 'resolve' },
            { col: '5', header: 'OnHandLHUQty', sample: '1,240', field: 'quantity_on_hand', disp: 'core' },
            { col: '6', header: 'AllocatedLHUQty', sample: '122', field: 'allocation · allocated', disp: 'core' },
            { col: '8', header: 'HeldLHUQty', sample: '0', field: 'allocation · on_hold', disp: 'core' },
            { col: '9', header: 'AvailableLHUQty', sample: '1,118', field: 'quantity_available', disp: 'computed' },
            { col: '32', header: 'Bonded Lot No', sample: 'BL-90412', field: 'snapshot.bonded_lot_no', disp: 'snapshot' },
            { col: '3', header: 'Code2', sample: 'X-0098', field: '—', disp: 'dropped' },
          ]} />
          <div style={{ marginTop: 9 }}><Banner kind="info" icon="layers" title="Verbatim + projected">Every kept column is stored as-is for display; a subset is also projected into core so portal inventory views work. Item-master fields (dims, weight, hs_code) are seeded on auto-create only.</Banner></div>
        </Screen>
      </Step>

      {/* 3 — Process: parse first, then safe wipe-and-reload */}
      <Step
        n={3}
        actor="system"
        title="Parse first, then wipe & reload — safely"
        note="ClientInventoryFeedProcessorJob parses the whole file before touching live data. Only on a clean parse does it wipe the prior feed — scoped to the tenant's dedicated dummy feed location, so it can never delete real operational stock — then load the new rows fresh and mark the snapshot active. A bad file fails and leaves yesterday's feed intact."
        transitions={[
          { label: 'snapshots.status', steps: [{ k: 'info', t: 'queued' }, { k: 'warning', t: 'wiping_previous' }, { k: 'brand', t: 'processing' }, { k: 'success', t: 'active' }] },
        ]}
      >
        <Screen app="operator" crumb="Feed · processor" title="Refresh pipeline" w={680}>
          <ParsePipeline stages={FEED_STAGES} current={5} />
          <div style={{ marginTop: 16 }}>
            <StepRail
              compact
              items={[
                { label: 'Parse 4,120 rows', status: 'done', tag: 'system', sub: 'Validated before any write', subMono: false },
                { label: 'Resolve clients & items', status: 'done', tag: 'system', sub: 'AcCode → client · SKU → item · auto-create misses' },
                { label: 'Wipe prior feed', status: 'done', tag: 'system', sub: 'Scoped to feed location → cascades feed allocations' },
                { label: 'Dual-write', status: 'done', tag: 'system', sub: 'snapshot_rows (verbatim) + inventory_stocks + stock_allocations' },
                { label: 'Mark active', status: 'done', tag: 'system', sub: 'One active snapshot at a time' },
              ]}
            />
          </div>
          <div style={{ marginTop: 11, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Banner kind="success" icon="shield-check" title="Wipe is safe by design">Feed stock lives in one dummy feed location — the wipe is location-scoped and runs only after a successful parse.</Banner>
            <Banner kind="info" icon="git-merge" title="Allocation projection">Allocated → <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11 }}>allocated</span>, Picked → <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11 }}>picked</span>, Held → <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11 }}>on_hold</span>; rows carry null job_id.</Banner>
          </div>
        </Screen>
      </Step>

      {/* 4 — Unmatched AcCode branch */}
      <Step
        n={4}
        actor="system"
        title="Client resolution — match, auto-create, or hold"
        note="Each row's AcCode is matched to a client by name (no code field exists in the export — an accepted limitation). The three outcomes determine whether a row is visible, newly created, or parked for review."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <BranchCol kind="success" label="Match found">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>AcCode resolves to an existing client. Rows attach to that client_id and show in their portal.</div>
            <Transition label="row.client_id" steps={[{ k: 'success', t: 'resolved' }]} />
          </BranchCol>
          <BranchCol kind="brand" label="No match → auto-create">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>New AcCode creates the client record. Portal access isn't automatic — the tenant issues a password manually if they ask.</div>
            <Transition label="clients" steps={[{ k: 'muted', t: 'auto_created', dot: false }, { k: 'success', t: 'active' }]} />
          </BranchCol>
          <BranchCol kind="warning" label="Ambiguous → review">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Name collisions or blanks are stored unmatched (null client_id) and surfaced for the tenant to reconcile.</div>
            <Transition label="row.client_id" steps={[{ k: 'warning', t: 'unmatched' }, { k: 'info', t: 'review' }]} />
          </BranchCol>
        </div>
      </Step>

      {/* 5 — Client display */}
      <Step
        n={5}
        actor="client"
        title="Client sees their live inventory"
        note="The client opens the portal and sees only their own rows from the current active snapshot — scoped by client_id and the per-client visibility config. The view carries the full export richness: bonded lot, permit, GRN, ageing, weights, dimensions — with available computed on the fly."
      >
        <Screen app="client" crumb="Northwind Traders" title="Inventory · as of Jun 14" w={720}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
            <Pill kind="success" mono>active snapshot</Pill>
            <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>1,284 of your rows · refreshed 06:10 AM</span>
            <span style={{ marginLeft: 'auto' }}><Btn variant="secondary" size="sm" icon="download">Export CSV</Btn></span>
          </div>
          <MiniTable
            cols={[
              { t: 'SKU', mono: true, w: '128px' }, { t: 'Description' },
              { t: 'On hand', align: 'right', w: '64px', mono: true }, { t: 'Alloc', align: 'right', w: '52px', mono: true },
              { t: 'Avail', align: 'right', w: '58px', mono: true }, { t: 'Bonded lot', mono: true, w: '90px' }, { t: 'Ageing', align: 'right', w: '60px' },
            ]}
            rows={[
              ['SKU-049281-NV', 'Navigator backpack 30L', { t: '1,240', b: true }, { t: '122' }, { t: '1,118', b: true, c: '#16A34A' }, 'BL-90412', { t: '34d' }],
              ['SKU-051104-TR', 'Trail bottle 750ml — slate', { t: '640', b: true }, { t: '0' }, { t: '640', b: true, c: '#16A34A' }, 'BL-90418', { t: '12d' }],
              ['SKU-062013-AS', 'Ascent jacket M', { t: '86', b: true }, { t: '80' }, { t: '6', b: true, c: '#D97706' }, 'BL-90402', { t: '88d' }],
              ['SKU-088420-CP', 'Camp pillow', { t: '300', b: true }, { t: '0' }, { t: '300', b: true, c: '#16A34A' }, 'BL-90421', { t: '5d' }],
            ]}
          />
          <div style={{ marginTop: 9 }}><Banner kind="info" icon="calculator" title="Available is computed, never stored">quantity_available = on_hand − allocated − picked − held, straight from the generated column.</Banner></div>
        </Screen>
      </Step>

      {/* 6 — Refresh & teardown */}
      <Step
        n={6}
        actors={['system', 'operator']}
        last
        title="Daily refresh & end-of-period teardown"
        note="There's no day-to-day history — tomorrow's upload repeats the parse-then-wipe cycle, always leaving exactly one active snapshot. When the tenant ends a client's feed period, a teardown job clears the feed location and snapshot for good."
        transitions={[
          { label: 'daily', steps: [{ k: 'success', t: 'active (today)' }, { k: 'warning', t: 'wiped' }, { k: 'success', t: 'active (tomorrow)' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="Feed · snapshots" title="Refresh history" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Date', mono: true, w: '96px' }, { t: 'Rows', align: 'right', w: '60px', mono: true }, { t: 'Status', align: 'right', w: '78px' }]}
              rows={[
                { __sel: true, cells: ['2026-06-14', { t: '4,120', b: true }, { pill: 'success', t: 'active' }] },
                ['2026-06-13', { t: '4,098', c: 'var(--fg-muted)' }, { pill: 'muted', t: 'wiped' }],
                ['2026-06-12', { t: '4,090', c: 'var(--fg-muted)' }, { pill: 'muted', t: 'wiped' }],
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="warning" icon="history" title="Latest-only">No per-day history is retained — each load replaces the last.</Banner></div>
          </Screen>
          <Screen app="operator" title="Teardown" w="100%">
            <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 11 }}>When the feed period ends, ClientInventoryFeedTeardownJob clears the dedicated feed location and the snapshot — the client's mirror is removed for good.</div>
            <StepRail
              compact
              items={[
                { label: 'Stop daily feed', status: 'done', sub: 'Tenant sets end-date' },
                { label: 'Clear feed location', status: 'done', tag: 'system', sub: 'inventory_stocks + feed allocations' },
                { label: 'Drop snapshot', status: 'done', tag: 'system', sub: 'Mirror removed' },
              ]}
            />
          </Screen>
        </ScreenRow>
      </Step>
    </Flow>
  );
}
window.Flow4 = Flow4;
