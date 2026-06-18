// Flow 1 — Warehouse setup, inventory & cycle counts
function Flow1() {
  return (
    <Flow
      n="1"
      id="flow-inventory"
      title="Warehouse setup, inventory & cycle counts"
      subtitle="Stand up a warehouse, generate its bins, define an item, then run the cycle-count loop that keeps system stock honest — blind counts, variance handling, and the three ways a variance resolves (auto-approve, auto-adjust, supervisor approval)."
      actors={['admin', 'operator', 'supervisor', 'system']}
    >
      {/* 1 — Create warehouse */}
      <Step
        n={1}
        actor="admin"
        title="Create a warehouse"
        note="Name, code, address, timezone and a configurable location-code pattern. The pattern drives auto-generated bin codes in the next step."
        transition={{ label: 'warehouses.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Warehouses" title="New warehouse" w={540}>
          <ScreenRow cols="1fr 1fr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Name" value="Tuas Distribution Centre" />
              <div style={{ display: 'flex', gap: 9 }}>
                <Field label="Code" value="W-02" mono w="46%" />
                <Field label="Timezone" value="Asia/Singapore" w="54%" />
              </div>
              <Field label="Address" value="12 Tuas Ave 1, Singapore" icon="map-pin" />
            </div>
            <div>
              <SLabel>Location code pattern</SLabel>
              <Field value="{floor}-{zone}-{aisle}-{rack}-{level}" mono />
              <div style={{ marginTop: 8, fontSize: 11, color: 'var(--fg-tertiary)' }}>Preview</div>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, fontWeight: 600, color: '#2563EB', marginTop: 2 }}>1-STR-A01-R05-L03</div>
              <div style={{ marginTop: 14 }}><Btn variant="primary" full icon="plus">Create warehouse</Btn></div>
            </div>
          </ScreenRow>
        </Screen>
      </Step>

      {/* 2 — Bulk-generate locations */}
      <Step
        n={2}
        actor="admin"
        title="Generate bins from a template"
        note="Define a zone, the aisles, racks per aisle and levels per rack. Stoqr fans the template out into every bin — each with an auto code, default rules and a QR value. (CSV import is the alternative for existing warehouses with their own codes.)"
        transition={{ label: 'locations.status', steps: [{ k: 'muted', t: 'generated', dot: false }, { k: 'success', t: 'available' }] }}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="W-02 · Layout" title="Generate locations" w="100%">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Zone" value="Storage (STR) · Floor 1" icon="layers" />
              <div style={{ display: 'flex', gap: 8 }}>
                <Field label="Aisles" value="6" mono w="33%" />
                <Field label="Racks / aisle" value="8" mono w="33%" />
                <Field label="Levels / rack" value="4" mono w="34%" />
              </div>
              <Banner kind="brand" icon="grid-3x3" title="192 bins will be generated">6 × 8 × 4 — each gets a code, QR label and default capacity rules.</Banner>
              <Btn variant="primary" full icon="sparkles">Generate 192 bins</Btn>
            </div>
          </Screen>
          <Screen app="operator" title="Generated · QR labels ready" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Code', mono: true }, { t: 'Type' }, { t: 'QR', align: 'center', w: '52px' }, { t: 'Status', align: 'right', w: '92px' }]}
              rows={[
                ['1-STR-A01-R01-L01', 'shelf', { t: '▦', c: '#64748B' }, { pill: 'success', t: 'avail' }],
                ['1-STR-A01-R01-L02', 'shelf', { t: '▦', c: '#64748B' }, { pill: 'success', t: 'avail' }],
                ['1-STR-A01-R02-L01', 'shelf', { t: '▦', c: '#64748B' }, { pill: 'success', t: 'avail' }],
                ['1-STR-A01-R02-L02', 'shelf', { t: '▦', c: '#64748B' }, { pill: 'success', t: 'avail' }],
                ['1-STR-A02-R01-L01', 'shelf', { t: '▦', c: '#64748B' }, { pill: 'success', t: 'avail' }],
              ]}
            />
            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>1–5 of 192</span>
              <Btn variant="secondary" size="sm" icon="printer">Print QR labels</Btn>
            </div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 3 — Create item */}
      <Step
        n={3}
        actor="operator"
        title="Define an item (SKU)"
        note="WMS-essential fields only. Storage class and tracking type drive bin-rule validation; the reorder point + alert toggle feed low-stock warnings. UoM conversions let the team receive in cases and pick in eaches."
        transition={{ label: 'inventory_items.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Inventory" title="New item" w={560}>
          <ScreenRow cols="1fr 1fr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="SKU" value="SKU-049282-NV" mono />
              <Field label="Name" value="Navigator backpack 45L" />
              <div style={{ display: 'flex', gap: 8 }}>
                <Field label="Base UoM" value="each" w="50%" />
                <Field label="Case" value="24 each" mono w="50%" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <Field label="Storage class" value="ambient" w="50%" />
                <Field label="Tracking" value="none" w="50%" />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Field label="Reorder point" value="50" mono w="50%" />
                <Field label="Reorder qty" value="200" mono w="50%" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5, color: 'var(--fg-secondary)' }}>
                <span style={{ width: 26, height: 15, borderRadius: 9999, background: '#2563EB', position: 'relative' }}><span style={{ position: 'absolute', top: 2, left: 13, width: 11, height: 11, borderRadius: 9999, background: '#fff' }}></span></span>
                Low-stock alert enabled
              </div>
            </div>
          </ScreenRow>
          <div style={{ marginTop: 10 }}><Btn variant="primary" icon="plus">Create item</Btn></div>
        </Screen>
      </Step>

      {/* 4 — Inventory exists */}
      <Step
        n={4}
        actor="operator"
        title="Stock lands in the inventory table"
        note="Once received (full inbound is flow 2), each stock record lives per item × location × batch, carries its own anti-theft QR, and rolls up to on-hand / available. Items below their reorder point surface as Low; zero shows Out."
        transition={{ label: 'inventory_stocks.status', steps: [{ k: 'success', t: 'available' }] }}
      >
        <Screen app="operator" crumb="Inventory" title="4,821 SKUs · W-02" w={680}>
          <MiniTable
            cols={[{ t: 'SKU', mono: true, w: '146px' }, { t: 'Description' }, { t: 'Bin', mono: true, w: '92px' }, { t: 'On hand', align: 'right', w: '74px' }, { t: 'Avail', align: 'right', w: '62px' }, { t: 'Status', w: '78px' }]}
            rows={[
              ['SKU-049281-NV', 'Navigator backpack 30L', 'A-12-03', { t: '1,240', b: true }, { t: '1,118' }, { pill: 'success', t: 'OK' }],
              { __sel: true, cells: ['SKU-049282-NV', 'Navigator backpack 45L', 'A-12-04', { t: '42', b: true }, { t: '42' }, { pill: 'warning', t: 'Low' }] },
              ['SKU-051104-TR', 'Trail bottle 750ml — slate', 'B-04-11', { t: '0', b: true }, { t: '0' }, { pill: 'danger', t: 'Out' }],
              ['SKU-062013-AS', 'Ascent jacket M', 'C-08-02', { t: '86', b: true }, { t: '80' }, { pill: 'success', t: 'OK' }],
            ]}
          />
          <div style={{ marginTop: 9 }}><Banner kind="warning" icon="bell-ring" title="2 items below reorder point">Notifies users with inventory:read and any client with can_view_inventory.</Banner></div>
        </Screen>
      </Step>

      {/* 5 — Create cycle count plan */}
      <Step
        n={5}
        actor="supervisor"
        title="Create a cycle count plan"
        note="A plan scopes the count — full warehouse, a zone, or an ABC class. Blind counting hides the expected quantity from the operator. On schedule, Stoqr generates one task per item × location in scope."
        transitions={[
          { label: 'cycle_count_plans.status', steps: [{ k: 'neutral', t: 'draft' }, { k: 'info', t: 'scheduled' }] },
          { label: 'cycle_count_tasks.status', steps: [{ k: 'muted', t: 'generated', dot: false }, { k: 'warning', t: 'pending' }] },
        ]}
      >
        <Screen app="operator" crumb="Cycle counts" title="New plan" w={560}>
          <ScreenRow cols="1fr 1fr">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <Field label="Plan name" value="Zone A — weekly A-class" />
              <Field label="Count type" value="ABC class · A" icon="layers" />
              <Field label="Scheduled" value="Mon, Jun 15" icon="calendar" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600, marginBottom: 9 }}>
                <span style={{ width: 26, height: 15, borderRadius: 9999, background: '#2563EB', position: 'relative' }}><span style={{ position: 'absolute', top: 2, left: 13, width: 11, height: 11, borderRadius: 9999, background: '#fff' }}></span></span>
                Blind count
              </div>
              <Banner kind="brand" icon="clipboard-list" title="38 tasks will be generated">One per item × location across the A-class in Zone A.</Banner>
              <div style={{ marginTop: 12 }}><Btn variant="primary" full icon="calendar-check">Schedule plan</Btn></div>
            </div>
          </ScreenRow>
        </Screen>
      </Step>

      {/* 6 — Operator counts */}
      <Step
        n={6}
        actor="operator"
        title="Count a bin (blind)"
        note="Operator self-assigns a task, scans the location QR and enters what they physically count. Because it's a blind count, the expected figure stays hidden. Stoqr computes the variance on submit."
        transition={{ label: 'cycle_count_tasks.status', steps: [{ k: 'warning', t: 'pending' }, { k: 'info', t: 'in_progress' }, { k: 'brand', t: 'counted' }] }}
      >
        <Screen app="operator" crumb="Cycle counts · #2841" title="Count task" w={460}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', border: '1px solid var(--border-subtle)', borderRadius: 6, background: 'var(--slate-50)', marginBottom: 11 }}>
            <i data-lucide="scan-line" style={{ width: 18, height: 18, color: '#2563EB' }}></i>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Location scanned</div>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, fontWeight: 600 }}>1-STR-A12-R04 · SKU-049282-NV</div>
            </div>
            <i data-lucide="check-circle-2" style={{ width: 16, height: 16, color: '#16A34A', marginLeft: 'auto' }}></i>
          </div>
          <SLabel>Counted quantity</SLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 44, border: '1.5px solid #2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist Mono, monospace', fontSize: 22, fontWeight: 700 }}>38</div>
            <span style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>units</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: 6 }}><i data-lucide="eye-off" style={{ width: 12, height: 12 }}></i>Expected quantity hidden (blind count)</div>
          <div style={{ marginTop: 11 }}><Btn variant="primary" full icon="check">Submit count</Btn></div>
        </Screen>
      </Step>

      {/* 7 — Variance branch */}
      <Step
        n={7}
        actors={['system', 'supervisor']}
        title="Variance resolves three ways"
        note="Counted − expected = variance. Where it lands against the tolerance threshold decides the path. Any adjustment writes a stock_movement; if it would push on-hand below allocated, the affected allocations are flagged needs_resource for re-sourcing."
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <BranchCol kind="success" label="Variance = 0">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Count matches system. Auto-approved, no adjustment, no movement.</div>
            <Transition label="task" steps={[{ k: 'brand', t: 'counted' }, { k: 'success', t: 'approved' }]} />
          </BranchCol>
          <BranchCol kind="warning" label="Within threshold">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Small variance auto-adjusts. A stock_movement (type: adjust) is posted automatically.</div>
            <Transition label="task" steps={[{ k: 'brand', t: 'counted' }, { k: 'success', t: 'adjusted' }]} />
          </BranchCol>
          <BranchCol kind="danger" label="Exceeds threshold">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Held for supervisor sign-off before any adjustment posts.</div>
            <Transition label="task" steps={[{ k: 'brand', t: 'counted' }, { k: 'warning', t: 'pending_approval' }]} />
          </BranchCol>
        </div>
        <div style={{ marginTop: 14 }}>
          <Screen app="operator" crumb="Approvals" title="Cycle count variance — needs sign-off" w={620}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, fontWeight: 600 }}>SKU-049282-NV</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, color: 'var(--fg-tertiary)' }}>1-STR-A12-R04</span>
              <Pill kind="warning">Exceeds 5%</Pill>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 11 }}>
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '8px 10px' }}><div style={{ fontSize: 10, color: 'var(--fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Expected</div><div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 17, fontWeight: 700, marginTop: 2 }}>42</div></div>
              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '8px 10px' }}><div style={{ fontSize: 10, color: 'var(--fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Counted</div><div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 17, fontWeight: 700, marginTop: 2 }}>38</div></div>
              <div style={{ border: '1px solid var(--danger-border)', borderRadius: 6, padding: '8px 10px', background: 'var(--danger-bg)' }}><div style={{ fontSize: 10, color: '#991B1B', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Variance</div><div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 17, fontWeight: 700, marginTop: 2, color: '#DC2626' }}>−4</div></div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="success" icon="check">Approve &amp; adjust</Btn>
              <Btn variant="secondary" icon="rotate-ccw">Request recount</Btn>
            </div>
            <div style={{ marginTop: 10 }}><Banner kind="info" icon="link-2">If the −4 adjustment drives on-hand below allocated, the affected stock_allocations flip to <span style={{ fontFamily: 'Geist Mono, monospace' }}>needs_resource</span> and a correction row is written.</Banner></div>
          </Screen>
        </div>
        <div style={{ marginTop: 12 }}><Transition label="on approve · task" steps={[{ k: 'warning', t: 'pending_approval' }, { k: 'success', t: 'adjusted' }]} /></div>
      </Step>

      {/* 8 — Plan completes */}
      <Step
        n={8}
        actor="supervisor"
        last
        title="Plan completes"
        note="When every task is approved or adjusted, the plan closes. The reconciled counts feed ABC re-classification and the next count schedule."
        transition={{ label: 'cycle_count_plans.status', steps: [{ k: 'info', t: 'in_progress' }, { k: 'success', t: 'completed' }] }}
      >
        <Screen app="operator" crumb="Cycle counts" title="Plan #2841 — complete" w={520}>
          <StatRow items={[
            { label: 'Tasks', value: '38' },
            { label: 'Matched', value: '34', c: '#16A34A' },
            { label: 'Adjusted', value: '3', c: '#D97706' },
            { label: 'Recount', value: '1', c: '#DC2626' },
          ]} />
          <div style={{ marginTop: 10 }}><Banner kind="success" icon="badge-check" title="Reconciled — 96% match rate">Net adjustment −7 units across 3 bins. ABC re-class queued.</Banner></div>
        </Screen>
      </Step>
    </Flow>
  );
}
window.Flow1 = Flow1;
