// Flow 6 — Ship-spares: vessels, allocation & reserve-at-order
function Flow6() {
  return (
    <Flow
      n="6"
      id="flow-vessels"
      title="Ship-spares — vessels & reserve-at-order"
      subtitle="A maritime variant of storage. Shipping companies store spare parts tagged to specific vessels; when a vessel docks, parts are dispatched to it. It reuses the Job/Flow engine (a ship_spares flow type with customs document steps), and adds three things: a vessels register, a soft vessel-tag on stock, and shipping requests — vessel-scoped intake that reserves stock the moment an order exists, not at pick."
      actors={['admin', 'operator', 'client', 'system']}
    >
      {/* 1 — Register vessel */}
      <Step
        n={1}
        actor="admin"
        title="Register the client's vessel"
        note="Vessels belong to the client (the shipping company); a client can have many. Each is keyed by its 7-digit IMO number — unique per tenant — and carries flag state, type, and owner / manager / local-agent details for customs paperwork later."
        transition={{ label: 'vessels.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Clients · Pacific Lines · Vessels" title="MV Pacific Star" w={620}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, marginBottom: 10 }}>
            <Field label="IMO number" value="9412705" mono icon="hash" />
            <Field label="Call sign" value="9V2810" mono />
            <Field label="Flag state" value="Singapore" icon="flag" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 9 }}>
            <Field label="Vessel type" value="Container ship" />
            <Field label="Gross tonnage" value="74,000" mono />
            <Field label="Local agent" value="Sembawang UEN" />
          </div>
          <div style={{ marginTop: 10 }}><Banner kind="info" icon="ship" title="One register, many vessels">Operators allocate stock and raise shipping requests against a vessel by IMO — it threads through every ship-spares Job.</Banner></div>
        </Screen>
      </Step>

      {/* 2 — Ship-spares inbound flow w/ customs */}
      <Step
        n={2}
        actor="admin"
        title="Build a ship_spares inbound flow"
        note="ship_spares is a flow type alongside inbound and outbound. Customs compliance is handled entirely through ordinary flow steps — a mandatory-document step for each permit — so no special customs columns exist on Jobs or Items. The flow adds a vessel-allocation step that tags received parts to a vessel, and stores them in a bonded zone."
        transition={{ label: 'flows.flow_type', steps: [{ k: 'brand', t: 'ship_spares', dot: false }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Flows · Ship-spares inbound" title="Vessel parts intake" w={620}>
          <MiniTable
            cols={[{ t: '#', w: '26px', mono: true, align: 'center' }, { t: 'Step' }, { t: 'Type', w: '128px', mono: true }, { t: 'Doc / note', w: '150px' }]}
            rows={[
              ['1', 'Security check', 'work', { t: '—', c: 'var(--fg-muted)' }],
              ['2', 'Customs IN permit filing', { t: 'file · required', c: '#DC2626' }, { t: 'TradeNet IN Permit', c: 'var(--fg-secondary)' }],
              ['3', 'Unloading + inspection', 'work', { t: '—', c: 'var(--fg-muted)' }],
              ['4', 'Record quantities', 'prebuilt', { t: 'record_quantities', c: 'var(--fg-tertiary)' }],
              ['5', 'Vessel allocation', { t: 'work', c: '#0891B2' }, { t: 'tag parts → vessel', c: 'var(--fg-secondary)' }],
              ['6', 'Update inventory', { t: 'system', c: '#7C3AED', b: true }, { t: 'bonded zone', c: 'var(--fg-tertiary)' }],
              ['7', 'Generate GRN', { t: 'system', c: '#7C3AED', b: true }, { t: 'auto', c: 'var(--fg-muted)' }],
              ['8', 'Supervisor sign-off', 'approval', { t: '—', c: 'var(--fg-muted)' }],
            ]}
          />
          <div style={{ marginTop: 9 }}><Banner kind="neutral" icon="shield-check" title="Bonded = zone + Job, not a flag">Bonded stock is identified by its zone_type and the customs docs attached to the incoming Job — no special bonded column on stock.</Banner></div>
        </Screen>
      </Step>

      {/* 3 — Vessel allocation (soft tag) */}
      <Step
        n={3}
        actor="operator"
        title="Tag received parts to a vessel"
        note="At the vessel-allocation step the operator soft-tags stock to a vessel — “these 20 engine filters are reserved for MV Pacific Star.” This is a standing tag (parts can sit vessel-tagged for months) that does NOT touch quantity_allocated — vessel-tagged parts still read available until a real order exists. Distinct from the order-allocation ledger."
        transitions={[
          { label: 'inventory_stocks.vessel_id', steps: [{ k: 'muted', t: 'null', dot: false }, { k: 'info', t: 'MV Pacific Star' }] },
        ]}
      >
        <Screen app="operator" crumb="JOB-2102 · Step 5" title="Vessel allocation" w={620}>
          <MiniTable
            dense
            cols={[{ t: 'Stock', mono: true, w: '128px' }, { t: 'Part', w: '150px' }, { t: 'Zone', w: '92px' }, { t: 'Qty', align: 'right', w: '46px', mono: true }, { t: 'Vessel tag', w: '120px', align: 'right' }]}
            rows={[
              ['ST-0091233-a', 'Engine filter EF-7', { t: 'Bonded-A', c: '#854D0E' }, { t: '20', b: true }, { pill: 'info', t: 'Pacific Star' }],
              ['ST-0091240-a', 'Fuel injector FI-3', { t: 'Bonded-A', c: '#854D0E' }, { t: '8', b: true }, { pill: 'info', t: 'Pacific Star' }],
              ['ST-0091255-a', 'Gasket set GS-9', { t: 'Bonded-B', c: '#854D0E' }, { t: '40', b: true }, { pill: 'muted', t: 'unallocated' }],
            ]}
          />
          <div style={{ marginTop: 10 }}>
            <Branch>
              <BranchCol kind="info" label="Vessel allocation — standing soft tag">
                <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5 }}>inventory_stocks.vessel_id. Long-lived, reallocatable, no order needed. <strong>Does not</strong> reduce available stock.</div>
              </BranchCol>
              <BranchCol kind="brand" label="Order allocation — the Phase 3 ledger">
                <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5 }}>stock_allocations. Created only when there's a real order. <strong>Does</strong> reduce available stock.</div>
              </BranchCol>
            </Branch>
          </div>
        </Screen>
      </Step>

      {/* 4 — Client submits shipping request */}
      <Step
        n={4}
        actor="client"
        title="Client raises a shipping request for the vessel"
        note="Ship-spares outbound starts from a shipping request — a vessel-scoped ask (“send these spares to MV Pacific Star when she docks”), not a generic packing-list upload. Capturing the vessel up front is exactly what makes reserve-at-order possible: the engine knows whose tagged stock to reserve."
        transition={{ label: 'shipping_requests.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'warning', t: 'submitted' }] }}
      >
        <Screen app="client" crumb="Pacific Lines" title="New shipping request · SR-000071" w={600}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 9, marginBottom: 11 }}>
            <Field label="Vessel" value="MV Pacific Star · IMO 9412705" icon="ship" />
            <Field label="Expected dock date" value="2026-06-20" mono icon="calendar" />
          </div>
          <SLabel>Requested spares</SLabel>
          <MiniTable
            dense
            cols={[{ t: 'Ln', w: '28px', mono: true, align: 'center' }, { t: 'Part', mono: true }, { t: 'Name', w: '150px' }, { t: 'Qty', align: 'right', w: '48px', mono: true }]}
            rows={[
              ['1', 'EF-7', 'Engine filter', { t: '12', b: true }],
              ['2', 'FI-3', 'Fuel injector', { t: '6', b: true }],
            ]}
          />
          <div style={{ marginTop: 10 }}><Banner kind="info" icon="anchor">The request targets one vessel — its tagged stock is what gets reserved on confirm.</Banner></div>
        </Screen>
      </Step>

      {/* 5 — Accept + confirm → reserve-at-order */}
      <Step
        n={5}
        actors={['operator', 'system']}
        title="Confirm → spawn the Job & reserve-at-order"
        note="The tenant accepts, then confirms the request. Confirmation creates an outbound Job on the ship_spares flow (packing-list lines from the request) AND — unlike general outbound, which allocates at pick — immediately writes stock_allocations with status reserved against the vessel's tagged stock. quantity_allocated rises, quantity_available drops: the parts no longer show as available to any other order."
        transitions={[
          { label: 'shipping_requests.status', steps: [{ k: 'warning', t: 'submitted' }, { k: 'info', t: 'accepted' }, { k: 'brand', t: 'job_created' }] },
          { label: 'stock_allocations.status', steps: [{ k: 'muted', t: 'none', dot: false }, { k: 'warning', t: 'reserved' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="SR-000071" title="Confirm shipping request" w="100%">
            <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 11 }}>Accepting spawns JOB-2118 (ship_spares outbound) and reserves the vessel's tagged stock now — at order, not at pick.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="success" icon="check">Accept &amp; confirm</Btn>
              <Btn variant="secondary" icon="x">Reject</Btn>
            </div>
            <div style={{ marginTop: 10 }}><Banner kind="warning" icon="lock" title="Shortfall flagged like any short allocation">If the vessel's tagged stock can't cover the request, the gap is raised at reserve time.</Banner></div>
          </Screen>
          <Screen app="operator" title="Reserve-at-order · stock" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Stock', mono: true, w: '120px' }, { t: 'On hand', align: 'right', w: '64px', mono: true }, { t: 'Reserved', align: 'right', w: '70px', mono: true }, { t: 'Avail', align: 'right', w: '56px', mono: true }]}
              rows={[
                { __sel: true, cells: ['ST-0091233-a', { t: '20' }, { t: '12', b: true, c: '#D97706' }, { t: '8', b: true }] },
                { __sel: true, cells: ['ST-0091240-a', { t: '8' }, { t: '6', b: true, c: '#D97706' }, { t: '2', b: true }] },
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="info" icon="git-commit-horizontal">Reserved rows carry job_id from creation; quantity_available already reflects the hold.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 6 — Outbound w/ customs + pick converts reserved */}
      <Step
        n={6}
        actor="operator"
        title="Run the outbound — customs gates & pick"
        note="The ship_spares outbound flow runs pick → pack → dispatch with customs steps interleaved: a TradeNet OUT permit before picking and a Ship Stores Declaration before deduction, each a mandatory-document step. At pick_items, each reserved allocation becomes allocated, then picked — the reservation made at order is now realised."
        transitions={[
          { label: 'stock_allocations.status', steps: [{ k: 'warning', t: 'reserved' }, { k: 'info', t: 'allocated' }, { k: 'brand', t: 'picked' }, { k: 'success', t: 'shipped' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,0.95fr) minmax(0,1.05fr)">
          <Screen app="operator" crumb="JOB-2118 · ship_spares outbound" title="Flow steps" w="100%">
            <StepRail
              compact
              items={[
                { label: 'Verify release request', status: 'done', tag: 'work' },
                { label: 'File TradeNet OUT permit', status: 'done', tag: 'file', sub: 'tradenet-out-2118.pdf' },
                { label: 'Pick items', status: 'active', tag: 'prebuilt', sub: 'reserved → allocated → picked' },
                { label: 'Pack items', status: 'pending', tag: 'prebuilt' },
                { label: 'Ship Stores Declaration', status: 'pending', tag: 'file', sub: 'mandatory before deduct' },
                { label: 'Deduct inventory · GRN', status: 'pending', tag: 'system' },
              ]}
            />
          </Screen>
          <Screen app="operator" crumb="JOB-2118 · Pick" title="Reserved → allocated → picked" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Stock', mono: true, w: '116px' }, { t: 'Bin', mono: true, w: '92px' }, { t: 'Qty', align: 'right', w: '44px', mono: true }, { t: 'Status', align: 'right', w: '82px' }]}
              rows={[
                ['ST-0091233-a', 'BND-A-02', { t: '12', b: true }, { pill: 'brand', t: 'picked' }],
                { __sel: true, cells: ['ST-0091240-a', 'BND-A-05', { t: '6', b: true }, { pill: 'info', t: 'allocated' }] },
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="brand" icon="scan-line">Same scan-to-confirm pick as Flow 3 — the rows just started life reserved rather than fresh.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 7 — Dispatched to vessel + client view */}
      <Step
        n={7}
        actors={['system', 'client']}
        last
        title="Dispatched to the vessel — client sees its parts"
        note="System steps deduct inventory and issue the dispatch note; the request rides the Job to shipped → completed. The client's portal shows their vessels and the parts stored against each — but never the internal customs documents."
        transitions={[
          { label: 'shipping_requests.status', steps: [{ k: 'brand', t: 'in_progress' }, { k: 'warning', t: 'shipped' }, { k: 'success', t: 'completed' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,0.9fr) minmax(0,1.1fr)">
          <Screen app="operator" crumb="Dispatch notes" title="DN-3360 · to vessel" w="100%">
            <KV k="Job" v="JOB-2118" mono />
            <KV k="Vessel" v="MV Pacific Star" />
            <KV k="Request" v="SR-000071" mono />
            <KV k="Parts shipped" v="18 units" mono />
            <KV k="Status" v="shipped" kind="success" mono />
          </Screen>
          <Screen app="client" crumb="Pacific Lines" title="MV Pacific Star · stored parts" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Part', mono: true }, { t: 'Name', w: '140px' }, { t: 'On hand', align: 'right', w: '64px', mono: true }, { t: '', w: '78px', align: 'right' }]}
              rows={[
                ['EF-7', 'Engine filter', { t: '8', b: true }, { pill: 'success', t: 'stored' }],
                ['FI-3', 'Fuel injector', { t: '2', b: true }, { pill: 'success', t: 'stored' }],
                ['GS-9', 'Gasket set', { t: '40', b: true }, { pill: 'muted', t: 'untagged' }],
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="muted" icon="eye-off">Customs permits & declarations are internal workflow docs — not shown to the client.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>
    </Flow>
  );
}
window.Flow6 = Flow6;
