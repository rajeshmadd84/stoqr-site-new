// Flow 3 — Outbound: pick, pack & dispatch
function Flow3() {
  const OUT_STAGES = [
    { key: 'uploaded', label: 'uploaded' },
    { key: 'saved', label: 'saved' },
    { key: 'queued', label: 'queued' },
    { key: 'processing', label: 'processing' },
    { key: 'job', label: 'job_created' },
  ];
  return (
    <Flow
      n="3"
      id="flow-outbound"
      title="Outbound — pick, pack & dispatch"
      subtitle="The mirror of inbound. A client (or operator) imports a packing list — fulfillment items and whole storage units in one file — which becomes an outbound Job. Stock is allocated at pick with a FEFO/FIFO engine, fanned out by zone, then packed, deducted from inventory, and shipped on a dispatch note the client can track."
      actors={['client', 'operator', 'supervisor', 'system']}
    >
      {/* 1 — Client uploads packing list */}
      <Step
        n={1}
        actor="client"
        title="Import the packing list"
        note="The client uploads a packing list straight from their portal — the same drag-drop importer, mapping and review as inbound, but with outbound fields. Each line is either an item line (SKU + quantity) or a storage-unit line (a whole pallet/unit to release). On confirm, an outbound Job is created for the tenant to pick up."
        transition={{ label: 'packing_list_files.status', steps: [{ k: 'muted', t: 'uploaded', dot: false }, { k: 'brand', t: 'processing' }, { k: 'success', t: 'job_created' }] }}
      >
        <ScreenRow cols="minmax(0,0.95fr) minmax(0,1.05fr)">
          <Screen app="client" crumb="Northwind Traders" title="New release · upload" w="100%">
            <Dropzone state="done" name="northwind-release-0614.csv" size="44 KB" rows={36} type="csv" />
            <div style={{ marginTop: 13 }}><SLabel>Pipeline</SLabel></div>
            <ParsePipeline stages={OUT_STAGES} current={4} />
          </Screen>
          <Screen app="client" title="Review — 36 lines · 2 types" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Ln', w: '30px', mono: true, align: 'center' }, { t: 'Reference', mono: true }, { t: 'Type', w: '74px' }, { t: 'Qty', align: 'right', w: '50px', mono: true }]}
              rows={[
                ['1', 'SKU-049281-NV', { pill: 'neutral', t: 'item' }, { t: '120', b: true }],
                ['2', 'SKU-062013-AS', { pill: 'neutral', t: 'item' }, { t: '40', b: true }],
                ['3', 'SKU-088420-CP', { pill: 'neutral', t: 'item' }, { t: '60', b: true }],
                ['4', 'SU-PLT-0098', { pill: 'brand', t: 'unit' }, { t: '1', b: true }],
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="info" icon="package-2" title="Mixed lines">Item lines run the pick/pack path; the storage-unit line is retrieved whole and ships as-is.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 2 — Assign + verify */}
      <Step
        n={2}
        actor="supervisor"
        title="Assign the Job & verify the order"
        note="The Job lands in the outbound queue against an outbound flow. The supervisor self-assigns, sets carrier and requested ship date, then the verify step confirms the order before any stock is committed — allocation happens at pick, not now."
        transitions={[
          { label: 'jobs.status', steps: [{ k: 'muted', t: 'created', dot: false }, { k: 'info', t: 'assigned' }, { k: 'brand', t: 'in_progress' }] },
          { label: 'job_tasks.status', steps: [{ k: 'warning', t: 'pending' }, { k: 'info', t: 'assigned' }] },
        ]}
      >
        <Screen app="operator" crumb="Jobs · JOB-2051" title="Northwind Traders · Standard Dispatch" w={560}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <Pill kind="info" mono>outbound</Pill>
            <Pill kind="warning" mono>priority: urgent</Pill>
            <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>Ship by Jun 15 · DHL Express</span>
          </div>
          <StepRail
            items={[
              { label: 'Verify order', status: 'active', tag: 'work', sub: 'Dispatch desk' },
              { label: 'Pick items', status: 'pending', tag: 'prebuilt', sub: 'Fans out by zone' },
              { label: 'Pack items', status: 'pending', tag: 'prebuilt', sub: 'Packing dept' },
              { label: 'Deduct inventory', status: 'system', tag: 'system', sub: 'Auto — no assignee' },
              { label: 'Generate dispatch note', status: 'system', tag: 'system', sub: 'Auto — no assignee' },
              { label: 'Supervisor sign-off', status: 'pending', tag: 'approval', sub: 'Supervisor' },
            ]}
          />
        </Screen>
      </Step>

      {/* 3 — Pick: allocation + scan + short-pick */}
      <Step
        n={3}
        actors={['system', 'operator']}
        title="Pick — allocate, fan out by zone, scan to confirm"
        note="When pick_items starts, the engine allocates stock per line — FEFO for expiry-tracked SKUs, FIFO otherwise — and fans the pick list into one task per source zone, ordered by location. Operators scan item QR + location QR to confirm each pick. A short pick flags the allocation needs_resource and re-sources from the next location."
        transitions={[
          { label: 'stock_allocations.status', steps: [{ k: 'muted', t: 'allocated', dot: false }, { k: 'brand', t: 'picked' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,1.05fr) minmax(0,0.95fr)">
          <Screen app="operator" crumb="JOB-2051 · Pick" title="Allocation · FEFO" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Stock', mono: true, w: '124px' }, { t: 'Bin', mono: true, w: '96px' }, { t: 'Expiry', w: '78px', mono: true }, { t: 'Pick', align: 'right', w: '46px', mono: true }]}
              rows={[
                { __sel: true, cells: ['ST-0049281-a', 'COLD-A-01', { t: '2026-09', c: '#DC2626' }, { t: '70', b: true }] },
                ['ST-0049281-b', 'COLD-A-04', { t: '2027-01', c: 'var(--fg-tertiary)' }, { t: '50', b: true }],
                ['ST-0062013-a', 'A-12-03', { t: '—', c: '#94A3B8' }, { t: '40', b: true }],
              ]}
            />
            <div style={{ marginTop: 9 }}>
              <SLabel>Fanned pick tasks</SLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[['Cold zone', 'TSK-001', '2 lines', 'active'], ['General zone', 'TSK-002', '1 line', 'pending'], ['Bonded zone', 'TSK-003', '1 unit', 'pending']].map(([z, t, n, s]) => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '6px 9px' }}>
                    <i data-lucide="map-pin" style={{ width: 13, height: 13, color: 'var(--fg-tertiary)' }}></i>
                    <span style={{ fontSize: 11.5, fontWeight: 600 }}>{z}</span>
                    <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: 'var(--fg-muted)' }}>{t}</span>
                    <span style={{ fontSize: 10.5, color: 'var(--fg-tertiary)', marginLeft: 'auto' }}>{n}</span>
                    <Pill kind={s === 'active' ? 'info' : 'muted'}>{s}</Pill>
                  </div>
                ))}
              </div>
            </div>
          </Screen>
          <Screen app="operator" crumb="TSK-001 · Cold zone" title="Pick task" w="100%">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[['item QR', 'SKU-049281-NV', true], ['location QR', 'COLD-A-01', true]].map(([l, v, ok]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', border: '1px solid var(--border-subtle)', borderRadius: 6, background: 'var(--slate-50)' }}>
                  <i data-lucide="scan-line" style={{ width: 16, height: 16, color: '#2563EB' }}></i>
                  <div><div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{l}</div><div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 600 }}>{v}</div></div>
                  <i data-lucide="check-circle-2" style={{ width: 15, height: 15, color: '#16A34A', marginLeft: 'auto' }}></i>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <div style={{ flex: 1, height: 40, border: '1.5px solid #2563EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist Mono, monospace', fontSize: 19, fontWeight: 700 }}>70</div>
              <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>of 70 units</span>
            </div>
            <div style={{ marginTop: 10 }}><Btn variant="primary" full icon="check">Confirm pick</Btn></div>
          </Screen>
        </ScreenRow>
        <div style={{ marginTop: 14 }}>
          <Branch>
            <BranchCol kind="success" label="Full pick">
              <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Scanned quantity matches the allocation. It moves picked and the zone task closes.</div>
              <Transition label="allocation" steps={[{ k: 'muted', t: 'allocated', dot: false }, { k: 'success', t: 'picked' }]} />
            </BranchCol>
            <BranchCol kind="danger" label="Short pick → re-source">
              <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Not enough at the bin. The allocation is flagged, a correction row is written, and the shortfall re-sources from the next location as a new pick task.</div>
              <Transition label="allocation" steps={[{ k: 'brand', t: 'picked (partial)' }, { k: 'danger', t: 'needs_resource' }, { k: 'info', t: 're-sourced' }]} />
            </BranchCol>
          </Branch>
        </div>
      </Step>

      {/* 4 — Pack */}
      <Step
        n={4}
        actor="operator"
        title="Pack — build packages, scan in, ships-as-is"
        note="Picked items converge at the staging zone. The operator creates packages, scans items into each, and records weight and dimensions. Kit components flagged needs_packaging must share a package. Storage units and oversized goods are marked ships-as-is — no package."
        transition={{ label: 'packing_list_lines.pack_status', steps: [{ k: 'muted', t: 'pending', dot: false }, { k: 'brand', t: 'packing' }, { k: 'success', t: 'packed' }] }}
      >
        <Screen app="operator" crumb="JOB-2051 · Pack" title="Packages" w={640}>
          <ScreenRow cols="1fr 1fr">
            <div style={{ border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 11px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
                <i data-lucide="box" style={{ width: 14, height: 14, color: '#2563EB' }}></i>
                <span style={{ fontSize: 11.5, fontWeight: 700 }}>PKG-1 · carton</span>
                <span style={{ marginLeft: 'auto', fontFamily: 'Geist Mono, monospace', fontSize: 10.5, color: 'var(--fg-tertiary)' }}>8.4 kg · 60×40×40</span>
              </div>
              <div style={{ padding: 10 }}>
                <MiniTable dense cols={[{ t: 'Item', mono: true }, { t: 'Qty', align: 'right', w: '42px', mono: true }]} rows={[['SKU-049281-NV', { t: '120', b: true }], ['SKU-088420-CP', { t: '60', b: true }]]} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 11px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <i data-lucide="box" style={{ width: 14, height: 14, color: '#2563EB' }}></i>
                  <span style={{ fontSize: 11.5, fontWeight: 700 }}>PKG-2 · box</span>
                  <span style={{ marginLeft: 'auto', fontFamily: 'Geist Mono, monospace', fontSize: 10.5, color: 'var(--fg-tertiary)' }}>3.1 kg</span>
                </div>
                <div style={{ padding: 10 }}>
                  <MiniTable dense cols={[{ t: 'Item', mono: true }, { t: 'Qty', align: 'right', w: '42px', mono: true }]} rows={[['SKU-062013-AS', { t: '40', b: true }]]} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, border: '1px dashed var(--border-default)', borderRadius: 8, padding: '9px 11px', background: 'var(--slate-25)' }}>
                <i data-lucide="forklift" style={{ width: 15, height: 15, color: 'var(--fg-tertiary)', flexShrink: 0 }}></i>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11.5, fontWeight: 600 }}>SU-PLT-0098</div><div style={{ fontSize: 10, color: 'var(--fg-tertiary)' }}>storage unit</div></div>
                <Pill kind="brand">ships as-is</Pill>
              </div>
            </div>
          </ScreenRow>
          <div style={{ marginTop: 10 }}><Btn variant="primary" icon="check">All lines packed — continue</Btn></div>
        </Screen>
      </Step>

      {/* 5 — Deduct inventory (system) */}
      <Step
        n={5}
        actor="system"
        title="System: deduct inventory"
        note="deduct_inventory fires automatically. Picked quantities come off quantity_on_hand, the fulfilled allocations move picked → shipped (the rollup drops), the storage unit flips to shipped_out, and stock movements are written for the audit trail."
        transitions={[
          { label: 'stock_allocations.status', steps: [{ k: 'brand', t: 'picked' }, { k: 'success', t: 'shipped' }] },
          { label: 'storage_units.status', steps: [{ k: 'info', t: 'staged' }, { k: 'neutral', t: 'shipped_out' }] },
        ]}
      >
        <Screen app="operator" title="System run · deduct_inventory" w={560}>
          <StepRail
            compact
            items={[
              { label: 'Deduct on-hand', status: 'done', tag: 'system', sub: '−220 units across 3 stock rows', subMono: false },
              { label: 'Allocations → shipped', status: 'done', tag: 'system', sub: 'quantity_allocated rollup drops' },
              { label: 'Storage unit → shipped_out', status: 'done', tag: 'system', sub: 'SU-PLT-0098 · location cleared' },
              { label: 'Stock movements written', status: 'done', tag: 'system', sub: 'type: ship · QR retained for audit' },
            ]}
          />
        </Screen>
      </Step>

      {/* 6 — Dispatch note (system) */}
      <Step
        n={6}
        actor="system"
        title="System: generate dispatch note"
        note="generate_dispatch_note assembles the shipment record — items and units shipped, packages, carrier, tracking and destination — and publishes it to the client portal."
        transition={{ label: 'dispatch_notes.status', steps: [{ k: 'muted', t: 'created', dot: false }, { k: 'info', t: 'shipped' }] }}
      >
        <Screen app="operator" crumb="Dispatch notes" title="DN-3320" w={560}>
          <ScreenRow cols="1fr 1fr">
            <div>
              <KV k="Job" v="JOB-2051" mono />
              <KV k="Client" v="Northwind Traders" />
              <KV k="Carrier" v="DHL Express" />
              <KV k="Tracking" v="JD0149820SG" mono />
            </div>
            <div>
              <KV k="Packages" v="2 + 1 unit" mono />
              <KV k="Total weight" v="11.5 kg" mono />
              <KV k="Destination" v="Northwind DC, SG" />
              <KV k="Status" v="shipped" kind="info" mono />
            </div>
          </ScreenRow>
        </Screen>
      </Step>

      {/* 7 — Sign-off */}
      <Step
        n={7}
        actor="supervisor"
        title="Supervisor sign-off"
        note="The final approval step closes the outbound Job. (An urgent-dispatch flow can omit sign-off to ship faster.)"
        transition={{ label: 'jobs.status', steps: [{ k: 'brand', t: 'in_progress' }, { k: 'success', t: 'completed' }] }}
      >
        <Screen app="operator" crumb="JOB-2051 · Sign-off" title="Confirm dispatch" w={520}>
          <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 11 }}>All items picked, packed and deducted · DN-3320 issued with tracking. Close the Job.</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="success" icon="check">Approve &amp; close</Btn>
            <Btn variant="secondary" icon="rotate-ccw">Hold</Btn>
          </div>
        </Screen>
      </Step>

      {/* 8 — Client tracks it */}
      <Step
        n={8}
        actor="client"
        last
        title="Client tracks the shipment"
        note="The client follows the same Job through their portal — picking, packing, shipped — and opens the dispatch note for the carrier and tracking number once it's out."
        transition={{ label: 'session', steps: [{ k: 'info', t: 'portal' }, { k: 'success', t: 'tracking visible' }] }}
      >
        <Screen app="client" crumb="Northwind Traders" title="Outbound · JOB-2051" w={620}>
          <StepRail
            compact
            items={[
              { label: 'Order received', status: 'done', sub: 'Jun 14, 10:18 AM' },
              { label: 'Picking', status: 'done' },
              { label: 'Packing', status: 'done' },
              { label: 'Shipped', status: 'active', sub: 'DN-3320 · DHL Express' },
            ]}
          />
          <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', gap: 9, border: '1px solid var(--border-default)', borderRadius: 8, padding: '10px 12px', background: 'var(--slate-25)' }}>
            <i data-lucide="truck" style={{ width: 16, height: 16, color: '#2563EB' }}></i>
            <div><div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Tracking number</div><div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, fontWeight: 600 }}>JD0149820SG</div></div>
            <span style={{ marginLeft: 'auto' }}><Btn variant="secondary" size="sm" icon="external-link">Track</Btn></span>
          </div>
        </Screen>
      </Step>
    </Flow>
  );
}
window.Flow3 = Flow3;
