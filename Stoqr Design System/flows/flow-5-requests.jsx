// Flow 5 — Item requests, Purchase Orders & procurement chaining
function Flow5() {
  return (
    <Flow
      n="5"
      id="flow-requests"
      title="Item requests — procure, PO & auto-chain"
      subtitle="The third job type. A client asks the tenant to BUY goods from a supplier — not store their own (inbound) or release what's stored (outbound). Item requests run a fixed lifecycle rather than the configurable flow engine: a request drives a Purchase Order to a supplier, then auto-chains into an inbound Job when goods arrive and — if a ship date is set — an outbound Job to the client. One parent Job, up to two children."
      actors={['client', 'supervisor', 'operator', 'system']}
    >
      {/* 1 — Client submits request */}
      <Step
        n={1}
        actor="client"
        title="Client submits an item request"
        note="From the portal, the client lists what they need the tenant to procure — each line an item description (and SKU if known), a quantity and notes — sets urgency and a preferred delivery date, and optionally a ship-to address. Setting a ship-to address is the switch that later auto-creates an outbound Job. Large requests can be dropped in as Excel/CSV through the same importer instead."
        transition={{ label: 'item_requests.status', steps: [{ k: 'muted', t: 'new', dot: false }, { k: 'warning', t: 'requested' }] }}
      >
        <Screen app="client" crumb="Northwind Traders" title="New item request" w={640}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 11 }}>
            <Field label="Urgency" value="High" icon="flame" />
            <Field label="Preferred delivery" value="2026-06-24" mono icon="calendar" />
          </div>
          <SLabel right={<span style={{ fontSize: 10.5, color: 'var(--fg-tertiary)' }}>3 lines</span>}>Requested items</SLabel>
          <MiniTable
            dense
            cols={[{ t: 'Ln', w: '28px', mono: true, align: 'center' }, { t: 'Item description' }, { t: 'SKU (if known)', w: '128px', mono: true }, { t: 'Qty', align: 'right', w: '48px', mono: true }]}
            rows={[
              ['1', 'Brake pads — Model X', 'BRK-X', { t: '50', b: true }],
              ['2', 'Oil filter — Type Y', '—', { t: '100', b: true }],
              ['3', 'Spark plugs Z', 'SPK-Z', { t: '200', b: true }],
            ]}
          />
          <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', gap: 9 }}>
            <Field label="Ship-to address (optional)" value="Northwind DC · 14 Tuas Ave, SG" icon="map-pin" />
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
            <Btn variant="primary" icon="send">Submit request</Btn>
            <Btn variant="secondary" icon="upload">Upload list instead</Btn>
            <span style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--fg-tertiary)' }}>Tenant can also raise this on the client's behalf</span>
          </div>
        </Screen>
      </Step>

      {/* 2 — Supervisor reviews + assigns */}
      <Step
        n={2}
        actor="supervisor"
        title="Supervisor picks it up & starts sourcing"
        note="The request lands in the procurement queue. A supervisor self-assigns — only then can the tenant act on it — and moves it into sourcing while staff find a supplier. The whole lifecycle is fixed: requested → reviewing → sourcing → po_created → ordered → in_transit → received → stored → completed."
        transitions={[
          { label: 'item_requests.status', steps: [{ k: 'warning', t: 'requested' }, { k: 'info', t: 'reviewing' }, { k: 'brand', t: 'sourcing' }] },
          { label: 'item_requests.assigned_to', steps: [{ k: 'muted', t: 'null', dot: false }, { k: 'info', t: 'supervisor' }] },
        ]}
      >
        <Screen app="operator" crumb="Item requests · IR-000042" title="Northwind Traders · 3 items" w={560}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <Pill kind="brand" mono>item_request</Pill>
            <Pill kind="warning" mono>urgency: high</Pill>
            <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>Deliver by Jun 24 · ship-to set</span>
            <span style={{ marginLeft: 'auto' }}><Btn variant="secondary" size="sm" icon="user-check">Assigned to you</Btn></span>
          </div>
          <StepRail
            compact
            items={[
              { label: 'Requested', status: 'done', sub: 'Jun 15, 8:40 AM · client portal' },
              { label: 'Reviewing', status: 'done', sub: 'Self-assigned' },
              { label: 'Sourcing', status: 'active', sub: 'Finding a supplier for 3 items' },
              { label: 'PO created', status: 'pending' },
              { label: 'Ordered → received → stored', status: 'pending', sub: 'Then auto inbound / outbound Jobs' },
            ]}
          />
          <div style={{ marginTop: 9 }}><Banner kind="info" icon="info" title="Fixed lifecycle — not the flow engine">Item requests don't run tenant-defined flow steps. Inbound/outbound Jobs they spawn do.</Banner></div>
        </Screen>
      </Step>

      {/* 3 — Source supplier from directory */}
      <Step
        n={3}
        actor="operator"
        title="Source from the supplier directory"
        note="Each item maps to one or more suppliers in the directory, carrying that supplier's own SKU, unit cost, minimum order quantity and lead time. One can be flagged the preferred supplier for the item. Staff pick the supplier to buy from — none of this is ever visible to the client."
      >
        <Screen app="operator" crumb="Sourcing · Brake pads — Model X" title="Suppliers for this item" w={620}>
          <MiniTable
            cols={[{ t: 'Supplier' }, { t: 'Supplier SKU', w: '116px', mono: true }, { t: 'Unit cost', align: 'right', w: '88px', mono: true }, { t: 'MOQ', align: 'right', w: '52px', mono: true }, { t: 'Lead', align: 'right', w: '64px', mono: true }, { t: '', w: '92px', align: 'right' }]}
            rows={[
              { __sel: true, cells: ['Apex Auto Parts', 'AP-BRKX-50', { t: '$4.20', b: true }, { t: '25' }, { t: '7 d', b: true }, { pill: 'success', t: 'preferred' }] },
              ['Meridian Spares', 'MS-0091', { t: '$3.95', b: true }, { t: '100' }, { t: '21 d', b: true }, { t: '', c: 'transparent' }],
              ['Harbour Supply Co', 'HS-BX', { t: '$4.60', b: true }, { t: '10' }, { t: '4 d', b: true }, { t: '', c: 'transparent' }],
            ]}
          />
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
            <Btn variant="primary" icon="file-plus">Create PO · Apex Auto Parts</Btn>
            <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>Preferred — best lead time within MOQ</span>
          </div>
          <div style={{ marginTop: 10 }}><Banner kind="neutral" icon="boxes" title="New items get created here">If a requested item isn't in the catalog yet, it's created during sourcing so the PO line can reference it.</Banner></div>
        </Screen>
      </Step>

      {/* 4 — Create PO */}
      <Step
        n={4}
        actor="operator"
        title="Raise the Purchase Order"
        note="A PO is created against the selected supplier, its lines copied from the request lines at the supplier's costs. Payment terms and currency default from the supplier. The PO starts as a draft — totals computed, nothing sent yet — and links back to the request so the chain stays traceable."
        transitions={[
          { label: 'item_requests.status', steps: [{ k: 'brand', t: 'sourcing' }, { k: 'info', t: 'po_created' }] },
          { label: 'purchase_orders.status', steps: [{ k: 'muted', t: 'draft', dot: false }] },
        ]}
      >
        <Screen app="operator" crumb="Purchase orders · PO-000118" title="Apex Auto Parts · draft" w={640}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 11, flexWrap: 'wrap' }}>
            <KVInline k="From request" v="IR-000042" />
            <KVInline k="Terms" v="Net 30" />
            <KVInline k="Currency" v="USD" />
            <KVInline k="ETA" v="Jun 22" />
          </div>
          <MiniTable
            dense
            cols={[{ t: 'Item' }, { t: 'Supplier SKU', w: '110px', mono: true }, { t: 'Qty', align: 'right', w: '52px', mono: true }, { t: 'Unit', align: 'right', w: '64px', mono: true }, { t: 'Line total', align: 'right', w: '84px', mono: true }]}
            rows={[
              ['Brake pads — Model X', 'AP-BRKX-50', { t: '50', b: true }, { t: '$4.20' }, { t: '$210.00', b: true }],
              ['Oil filter — Type Y', 'AP-OF-Y', { t: '100', b: true }, { t: '$1.80' }, { t: '$180.00', b: true }],
              ['Spark plugs Z', 'AP-SPK-Z', { t: '200', b: true }, { t: '$0.95' }, { t: '$190.00', b: true }],
            ]}
          />
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
            <Btn variant="primary" icon="send">Mark sent to supplier</Btn>
            <Btn variant="secondary" icon="pencil">Edit lines</Btn>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'var(--fg-tertiary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total</div>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 17, fontWeight: 700 }}>$580.00</div>
            </div>
          </div>
        </Screen>
      </Step>

      {/* 5 — PO lifecycle to supplier */}
      <Step
        n={5}
        actor="operator"
        title="Drive the PO to delivery"
        note="The PO walks its own lifecycle — sent → acknowledged → shipped → delivered — each transition stamped with a timestamp. Sending and acknowledging happen outside Stoqr (email/phone); staff record each milestone. The client's portal mirrors this as plain-language status, with no PO number, supplier or cost shown."
        transitions={[
          { label: 'purchase_orders.status', steps: [{ k: 'muted', t: 'draft', dot: false }, { k: 'info', t: 'sent' }, { k: 'brand', t: 'acknowledged' }, { k: 'warning', t: 'shipped' }, { k: 'success', t: 'delivered' }] },
          { label: 'item_requests.status', steps: [{ k: 'info', t: 'ordered' }, { k: 'brand', t: 'in_transit' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,0.9fr)">
          <Screen app="operator" crumb="PO-000118" title="Status timeline" w="100%">
            <StepRail
              compact
              items={[
                { label: 'Sent to supplier', status: 'done', sub: 'Jun 15, 11:02 AM' },
                { label: 'Acknowledged', status: 'done', sub: 'Jun 15, 4:30 PM' },
                { label: 'Shipped', status: 'active', tag: 'in_transit', sub: 'ETA warehouse Jun 22' },
                { label: 'Delivered', status: 'pending', sub: 'Triggers auto inbound Job' },
              ]}
            />
          </Screen>
          <Screen app="client" crumb="Northwind Traders" title="Request IR · status" w="100%">
            <StepRail
              compact
              items={[
                { label: 'Submitted', status: 'done' },
                { label: 'In progress', status: 'done' },
                { label: 'Arriving Jun 22', status: 'active', sub: 'Expected delivery date' },
                { label: 'Received', status: 'pending' },
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="muted" icon="eye-off">Client never sees supplier, PO number or costs — only simplified status.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 6 — PO delivered → AUTO inbound Job */}
      <Step
        n={6}
        actor="system"
        title="Delivered → auto-create the inbound Job"
        note="Marking the PO delivered fires PODeliveryAutoInboundJob: the system spawns an inbound Job on the tenant's default inbound flow, auto-populating its storage-list lines from the PO lines (expected quantities). That Job is linked as a child of the item-request Job, then runs the normal receiving / put-away flow from Flow 2."
        transitions={[
          { label: 'purchase_orders.status', steps: [{ k: 'success', t: 'delivered' }] },
          { label: 'jobs (child)', steps: [{ k: 'muted', t: 'created', dot: false }, { k: 'brand', t: 'in_progress' }] },
          { label: 'item_requests.status', steps: [{ k: 'brand', t: 'in_transit' }, { k: 'info', t: 'received' }] },
        ]}
      >
        <Screen app="operator" crumb="Jobs · IR-000042" title="Parent → child Jobs" w={600}>
          <JobTree
            parent={{ id: 'JOB-2088', type: 'item_request', label: 'IR-000042 · Northwind procurement', status: 'brand', statusT: 'in_progress' }}
            children={[
              { id: 'JOB-2089', type: 'inbound', label: 'Receiving from Apex PO-000118', status: 'brand', statusT: 'in_progress', note: 'Storage-list lines auto-filled from 3 PO lines' },
              { id: '—', type: 'outbound', label: 'Dispatch to Northwind DC', status: 'muted', statusT: 'queued', note: 'Spawns after receiving — ship-to is set', ghost: true },
            ]}
          />
          <div style={{ marginTop: 10 }}><Banner kind="brand" icon="cpu" title="PODeliveryAutoInboundJob">No operator action needed to create the inbound Job — receiving picks up where Flow 2 left off.</Banner></div>
        </Screen>
      </Step>

      {/* 7 — Stored → branch on ship-to */}
      <Step
        n={7}
        actor="system"
        title="Received & stored — then it branches"
        note="When the inbound child Job completes, the goods are in inventory and the request reads stored. What happens next depends on whether the client set a ship-to address and ship date on the original request."
        transition={{ label: 'item_requests.status', steps: [{ k: 'info', t: 'received' }, { k: 'brand', t: 'stored' }] }}
      >
        <Branch>
          <BranchCol kind="neutral" label="No ship-to → hold in storage">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Goods stay on hand for the client, visible in their live inventory feed (Flow 4). The request completes once stored — no outbound Job.</div>
            <Transition label="request" steps={[{ k: 'brand', t: 'stored' }, { k: 'success', t: 'completed' }]} />
          </BranchCol>
          <BranchCol kind="success" label="Ship-to set → auto outbound">
            <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>InboundCompleteAutoOutboundJob spawns an outbound child Job on the default outbound flow — packing-list lines from the received items. Its pick step creates stock_allocations like any dispatch.</div>
            <Transition label="job (child)" steps={[{ k: 'muted', t: 'outbound created', dot: false }, { k: 'brand', t: 'in_progress' }]} />
          </BranchCol>
        </Branch>
        <div style={{ marginTop: 12 }}><Banner kind="warning" icon="undo-2" title="Cancel releases reservations">Cancelling a request or PO with an in-flight outbound child releases that Job's open stock_allocations → reserved stock frees up.</Banner></div>
      </Step>

      {/* 8 — Parent completes, client sees it */}
      <Step
        n={8}
        actors={['system', 'client']}
        last
        title="Parent Job completes — client is notified"
        note="The parent item-request Job auto-completes once all child Jobs finish. The client sees only the simplified arc — never the procurement detail underneath — and is notified the request is done."
        transition={{ label: 'item_requests.status', steps: [{ k: 'brand', t: 'stored' }, { k: 'success', t: 'completed' }] }}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="JOB-2088" title="Parent rollup" w="100%">
            <JobTree
              parent={{ id: 'JOB-2088', type: 'item_request', label: 'IR-000042 · Northwind procurement', status: 'success', statusT: 'completed' }}
              children={[
                { id: 'JOB-2089', type: 'inbound', label: 'Receiving from Apex', status: 'success', statusT: 'completed' },
                { id: 'JOB-2091', type: 'outbound', label: 'Dispatch to Northwind DC', status: 'success', statusT: 'completed', note: 'DN-3344 · DHL Express' },
              ]}
            />
          </Screen>
          <Screen app="client" crumb="Northwind Traders" title="Request IR · completed" w="100%">
            <StepRail
              compact
              items={[
                { label: 'Submitted', status: 'done' },
                { label: 'In progress', status: 'done' },
                { label: 'Received', status: 'done' },
                { label: 'Completed', status: 'active', sub: 'Shipped to Northwind DC' },
              ]}
            />
            <div style={{ marginTop: 10 }}><Toast>Item request IR-000042 completed</Toast></div>
          </Screen>
        </ScreenRow>
      </Step>
    </Flow>
  );
}

// Small inline helpers for this flow
function KVInline({ k, v }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '4px 9px', background: 'var(--slate-25)' }}>
      <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{k}</span>
      <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, fontWeight: 600 }}>{v}</span>
    </div>
  );
}

function JobTree({ parent, children }) {
  const TYPE = {
    item_request: { c: '#2563EB', icon: 'git-merge', label: 'parent · item_request' },
    inbound: { c: '#0891B2', icon: 'corner-down-right', label: 'child · inbound' },
    outbound: { c: '#7C3AED', icon: 'corner-down-right', label: 'child · outbound' },
  };
  const Row = ({ node, child }) => {
    const t = TYPE[node.type] || TYPE.item_request;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: `1px solid ${node.ghost ? 'var(--border-subtle)' : 'var(--border-default)'}`, borderRadius: 8, padding: '9px 11px', background: node.ghost ? 'var(--slate-25)' : '#fff', opacity: node.ghost ? 0.7 : 1, marginLeft: child ? 26 : 0 }}>
        <i data-lucide={t.icon} style={{ width: 15, height: 15, color: t.c, flexShrink: 0 }}></i>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 700 }}>{node.id}</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: t.c, background: t.c + '14', padding: '1px 6px', borderRadius: 3 }}>{t.label}</span>
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{node.label}</div>
          {node.note && <div style={{ fontSize: 10, color: 'var(--fg-tertiary)', marginTop: 2 }}>{node.note}</div>}
        </div>
        <Pill kind={node.status} mono>{node.statusT}</Pill>
      </div>
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <Row node={parent} />
      {children.map((c, i) => <Row key={i} node={c} child />)}
    </div>
  );
}
window.Flow5 = Flow5;
