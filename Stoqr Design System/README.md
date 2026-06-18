# Stoqr Design System

Stoqr is a multi-tenant warehouse and inventory management platform. It ships as **two web apps** sharing a common visual language:

- **Operator Web App** — used by warehouse staff and admins to manage warehouses, stock movements, cycle counts, approvals, and configure agentic-AI workflows.
- **Client Web App** — used by tenants/customers to view inventory, request movements, approve actions, and audit history.

The product is **agentic-AI–native**: autonomous agents can run cycle counts, propose replenishments, route approvals, and execute custom workflows built in Stoqr's visual workflow builder. The design system has to make automated activity legible alongside human activity — agent runs, suggested actions, and approval queues need first-class treatment.

## Sources provided

- `uploads/stoqr-logo.svg` — primary lockup (wordmark + S-mark). Bold blue, angular, parallelogram-based mark suggesting stacked, moving stock.
- No codebase, Figma, or product screenshots were provided. **Visual foundations below are derived from the logo's DNA** (color palette, geometric/angular character, heavy weight) and from category conventions for warehouse-ops + AI-agent SaaS. **Flagged below as needs-review.**

## Index

```
├── README.md                       — this file
├── SKILL.md                        — Agent Skills manifest
├── colors_and_type.css             — root tokens (color, type, spacing, radii, shadow, motion)
├── assets/
│   ├── stoqr-logo.svg              — primary lockup
│   ├── stoqr-mark.svg              — S-mark only
│   ├── stoqr-wordmark.svg          — wordmark only
│   └── stoqr-logo-mono-*.svg       — single-color variants
├── fonts/                          — (using Google Fonts CDN; see CONTENT/VISUAL FOUNDATIONS)
├── preview/                        — design-system tab cards (one per token cluster)
└── ui_kits/
    ├── operator/                   — Operator Web App kit + interactive index
    └── client/                     — Client Web App kit + interactive index
```

---

## CONTENT FUNDAMENTALS

Stoqr is an operational tool. Copy is **direct, dense, low-ceremony**, and trusts the reader.

**Voice.** Plainspoken professional. We say what something does, then stop. We do not perform expertise; the product does. We avoid hype, avoid AI evangelism, and never use words like "magical," "delightful," or "supercharge."

**Person.** Second person ("you") for the user; "Stoqr" or the agent's given name (e.g., "Atlas") for system actions. Never "we" inside the product. Marketing copy may use "we" sparingly.

**Casing.**
- **Sentence case everywhere.** Buttons, menu items, headings, table columns. Title Case is reserved for proper nouns (warehouse names, SKUs, agent names).
- **ALL CAPS** with letter-spacing only for eyebrows, table column headers, and status pill labels (≤14 chars).

**Tone by surface.**
- **Operator app:** Imperative, terse. "Receive shipment", "Confirm count", "Approve & post". Counts + units always visible.
- **Client app:** Slightly softer, still direct. "Your warehouse Atlas-3 has 4 actions waiting for you."
- **Empty states:** One sentence of what this is, one verb-led action. Never quirky.
- **Errors:** What happened, what to do. "Cycle count rejected — variance exceeds 5%. Recount bin A-12-03 or override with reason."
- **AI/agent surfaces:** State the action, the inputs, the confidence. "Atlas suggests transferring 240 units from W-02 to W-04 — based on 30-day demand. Approve / Adjust / Decline."

**Numbers + units.**
- Always show units: `1,240 units`, `48 SKUs`, `3 pallets`. Never bare numbers in primary positions.
- Tabular numerals (`font-variant-numeric: tabular-nums`) in all tables and counters.
- SKU and bin codes are monospace: `SKU-049281`, `A-12-03`.
- Variances are signed and colored: `+12`, `−4`. Zero is rendered as `—` not `0` in delta columns.

**Time.**
- Relative for recent (`2 min ago`, `Yesterday 4:12 PM`). Absolute for >7 days (`Apr 18, 2026`). Never bare ISO timestamps in UI.
- Durations as `2h 14m`, not `2:14:00`.

**Emoji + decorative chars.**
- **No emoji** in product UI, ever. Status is communicated by color + icon + label, not 🟢.
- No unicode decoration (no ✨, →, ✓ in copy). Arrows and checks come from the icon set.
- Em-dash (`—`) used in microcopy. En-dash (`–`) for ranges.

**Specific examples.**
- Button: `Receive shipment` (not `Receive Shipment` or `📦 Receive Shipment`)
- Empty state: `No cycle counts in progress. Start one to reconcile on-hand vs. system stock.`
- Toast: `Posted. 240 units transferred from W-02 to W-04.`
- AI suggestion card title: `Atlas suggests: rebalance Bin A-12-03`
- Error: `Can't post — variance exceeds tolerance. Recount or request override.`
- Tooltip on agent badge: `Action taken by Atlas at 4:12 PM. View run.`

---

## VISUAL FOUNDATIONS

Stoqr's visual language is **operational, dense, and confident**. The logo's angular parallelogram S-mark and heavy black wordmark set the tone: this is industrial software, not a consumer app. Rounded blob shapes, pastel gradients, and decorative illustration are off-brand.

> Note: visual foundations are extrapolated from the logo + category conventions and need user review.

### Color
- **Brand blue `#2563EB`** is the single hero color. Used for primary actions, the wordmark, brand surfaces, and agent identity accents (paired with violet `--ai`).
- **Brand blue bright `#1D97FF`** is reserved for accents inside brand surfaces (e.g., the highlight stripe in the S-mark).
- **Cool slate neutrals** (Tailwind-style scale) carry 90% of UI surface area. Pure white surfaces sit on a `--slate-50` canvas.
- **Five semantic colors** carry status: green (stock OK / approved), amber (low / pending), red (out / rejected), cyan (in transit / info), violet (AI / autonomous).
- **No multi-stop gradients** in product chrome. The only sanctioned gradient is a low-contrast `--brand-blue → --brand-blue-deep` linear, used sparingly on marketing/empty-state hero surfaces.
- **Imagery vibe:** when photography is used (rare; mostly marketing), it's **cool-toned, slightly desaturated, industrial** — warehouses, shelving, scanners. No warm/golden-hour stock. No people-first hero shots.

### Type
Stoqr is a **mono-typed system**. Geist Mono is the ONE typeface — used for display, UI, body, code, everything. The mono grid is part of the brand: every SKU, label, and number sits on the same column rhythm. Inter and Space Grotesk are intentionally not loaded.

- **Display (H1–H3):** Geist Mono 700/800, tight tracking (`-0.03em`).
- **UI / body (H4–H5, paragraphs):** Geist Mono 400/500/600 at normal tracking.
- **Code, SKUs, bin codes, IDs:** Geist Mono 400/500 — same family, no visual context switch.
- Default UI size is **13px** (dense ops UI; mono glyphs are wider than Inter at the same px, so we step the scale down 1px); marketing body is 15–17px.
- Eyebrow / table-header all-caps use wide tracking (`0.06em`).
- **Wordmark** in the lockup uses Geist Mono 800/900 in production; the SVG-rendered logo asset is unaffected by font swaps.

### Spacing & layout
- **4px base grid.** Most spacing is `4 / 8 / 12 / 16 / 24` — tight by SaaS standards.
- Page max-width for marketing: 1200px. Operator app uses **fluid** layout with a fixed left sidebar (240–280px) and a fluid main pane.
- Tables are **dense** — 36px row height by default, 28px in compact mode. Table cells have horizontal padding 12px, no vertical zebra striping (use a subtle bottom border instead).
- Fixed elements: top bar 56px, sidebar 240–280px, page tabs 40px.

### Radii
- **Restrained.** Default `--radius-md` is **6px**. Cards/panels use 6–10px. Pills (status badges) use the `--radius-pill`.
- Buttons are **6px**. Inputs are **6px**. The brand is angular — large rounded corners feel off.

### Borders, shadows, elevation
- **Borders carry weight.** Most surfaces use a 1px `--border-subtle` border instead of a shadow. Cards on white sit on a 1px border + `--shadow-xs`.
- **Shadows are crisp, low-spread.** Never the soft pillowy shadows common in consumer apps.
- **Focus ring** is a 3px `rgba(37,99,235,0.28)` halo — visible, not subtle.
- **Inset highlights** (1px white, top) on dark CTAs to suggest physicality.
- No "protection gradients" (the iOS-style fade-to-bg over imagery). When text overlays imagery, use a solid 80%-opacity dark capsule.

### Backgrounds
- **No full-bleed photography** in product chrome. Marketing hero may use one cool-toned warehouse photograph with a 40%-opacity dark overlay.
- **No hand-drawn illustrations.** No textures. No noise.
- **Subtle pattern allowed:** a 24px square grid at 6% opacity on empty states and the agentic-AI workflow canvas — reads as a graph-paper / blueprint background. This is the only repeating pattern.

### Animation & motion
- **Restrained, fast.** Default `--dur-base` is 180ms with `--ease-out`.
- **No bounces.** No spring physics. No elastic.
- Page/route transitions: 120ms cross-fade.
- Modal/drawer: 220ms slide + fade.
- Skeletons pulse at 1.4s.
- Status pills can shimmer once on change (180ms) — never loop.
- Agent run indicator: a 1.5s linear progress sweep, monochromatic.

### Hover & press
- **Buttons (primary):** hover → bg shifts to `--brand-blue-deep`; press → `transform: translateY(1px)` + remove inset highlight. No scale.
- **Buttons (secondary/ghost):** hover → bg `--slate-100`; press → bg `--slate-200`.
- **Rows (tables/lists):** hover → bg `--slate-50`; selected → bg `--slate-100` + 2px left brand border.
- **Cards:** hover → border `--border-default` + `--shadow-sm`. No lift/scale.
- **Links:** hover → `text-decoration: underline; text-underline-offset: 3px;`. Color stays.

### Transparency & blur
- Used sparingly. The only sanctioned blur is the **command palette / modal backdrop** (`backdrop-filter: blur(8px)` on a `rgba(15,23,42,0.4)` overlay).
- Agent activity feed uses a `rgba(124,58,237,0.06)` tinted row background — no blur.

### Cards
- Surface `--bg-surface` (white), 1px `--border-subtle`, `--radius-md` (6px), `--shadow-xs`.
- Header: 16px padding, `--text-md` semibold title, `--text-sm` `--fg-tertiary` meta on right.
- Body: 16px padding, 1px top border separator from header.
- Compact card variant: 12px padding, no header separator.

### Layout rules (fixed)
- Operator app: fixed top bar (56px), fixed left sidebar (240–280px), fluid main. Right rail (320px) appears for detail/inspector views.
- Client app: fixed top bar (64px), no sidebar by default; pages are centered with 1200px max-width.
- Both apps: a persistent **agent activity dock** can be summoned bottom-right (380px wide, drawer-style).

---

## ICONOGRAPHY

Stoqr uses **Lucide** (https://lucide.dev) as its primary icon library. Lucide's geometric, even-stroke aesthetic matches the angular brand mark and is freely available via CDN.

- **Default size:** 16px in dense UI, 20px in headers, 24px in empty states / marketing.
- **Default stroke:** 1.75px (Lucide default is 2; we go slightly lighter for dense UI).
- **Color:** inherits `currentColor`. Status icons use the matching semantic token.
- **Pairing:** Icon + label is the default. Icon-only buttons require a tooltip and 36×36 minimum hit area.
- **No emoji** in product UI. No unicode arrow/check chars (use Lucide `arrow-right`, `check`).
- **Brand mark** is never used as an icon inside the product. It only appears in the top-left of the app shell, on auth screens, and in marketing.
- **Agent identity:** the AI/agent badge uses Lucide `sparkles` paired with the agent's name — never alone, never as decoration.

**Loading from CDN.** Lucide is loaded via `https://unpkg.com/lucide@latest/dist/umd/lucide.js` or as inline SVG. The `assets/icons/` folder may contain product-specific glyphs (e.g., warehouse-bin diagram, pallet, scanner) that aren't in Lucide; for now this folder is empty and **should be filled by the user with any product-specific glyphs** in the production codebase.

> **Substitution flag:** Lucide is a substitute for whatever the production codebase actually uses. If Stoqr's codebase ships its own icon set or uses Heroicons / Phosphor / Tabler, replace this section accordingly.

---

## Caveats / asks

- **No production codebase, Figma, or screenshots were provided.** Every component shape and screen layout was derived from the logo + product description. They follow category conventions (dense ops table, sidebar shell, agent drawer) but are not pixel-true to a real Stoqr build. **Please attach the codebase or Figma so we can replace these with the real components.**
- **Iconography substitution.** Lucide is used as a stand-in. If Stoqr ships its own icon set or uses Heroicons / Phosphor / Tabler, the `ICONOGRAPHY` section + UI kit imports should be swapped.
- **Semantic color choices.** Green/amber/red/cyan/violet were chosen for stock states + agent identity. The violet (`--ai`) for agent surfaces is an opinionated call worth confirming.
- **Agent name "Atlas"** is a placeholder for whatever Stoqr's actual agent name(s) are.
