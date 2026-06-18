// Stoqr Operator — Workflow builder canvas (agentic AI workflow)
function WorkflowsPage() {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14, height: 'calc(100vh - 56px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Workflow · draft</div>
          <h1 style={{ margin: '2px 0 0', fontFamily: 'Geist Mono', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>Auto-replenish low stock</h1>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--fg-tertiary)', fontFamily: 'Geist Mono' }}>Saved 12s ago</span>
          <Button variant="secondary" size="sm" icon="play">Test run</Button>
          <Button variant="primary" size="sm" icon="check">Publish</Button>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr 280px', gap: 0, border: '1px solid var(--border-subtle)', borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
        {/* Node palette */}
        <div style={{ borderRight: '1px solid var(--border-subtle)', padding: 12, background: 'var(--slate-50)' }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', marginBottom: 8 }}>Triggers</div>
          <Node icon="zap"   label="Schedule" />
          <Node icon="bell"  label="Stock event" />
          <Node icon="webhook" label="Webhook" />
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', margin: '14px 0 8px' }}>Actions</div>
          <Node icon="arrow-down-up" label="Transfer stock" />
          <Node icon="package-plus" label="Create PO" />
          <Node icon="clipboard-check" label="Cycle count" />
          <Node icon="user-check" label="Request approval" />
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', margin: '14px 0 8px' }}>Agents</div>
          <Node icon="sparkles" label="Atlas — decide" ai />
          <Node icon="sparkles" label="Atlas — explain" ai />
        </div>

        {/* Canvas */}
        <div style={{ position: 'relative', backgroundImage: 'linear-gradient(var(--slate-200) 1px, transparent 1px), linear-gradient(90deg, var(--slate-200) 1px, transparent 1px)', backgroundSize: '24px 24px', backgroundPosition: '-1px -1px', overflow: 'hidden' }}>
          <FlowNode x={40}  y={40}  icon="bell"            title="When stock falls below" sub="reorder threshold"     kind="trigger" />
          <FlowEdge x1={184} y1={66} x2={260} y2={130} />
          <FlowNode x={260} y={104} icon="sparkles"        title="Atlas decides"           sub="rebalance vs purchase" kind="agent" />
          <FlowEdge x1={404} y1={130} x2={480} y2={194} />
          <FlowNode x={480} y={168} icon="user-check"      title="Request approval"        sub="if cost > $5,000"      kind="action" />
          <FlowEdge x1={624} y1={194} x2={700} y2={258} />
          <FlowNode x={700} y={232} icon="arrow-down-up"   title="Execute transfer"        sub="post movement"          kind="action" />

          <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', gap: 4, background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 4 }}>
            <button style={zb}><i data-lucide="minus" style={ic}></i></button>
            <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)', alignSelf: 'center', padding: '0 6px' }}>100%</span>
            <button style={zb}><i data-lucide="plus" style={ic}></i></button>
            <button style={zb}><i data-lucide="maximize" style={ic}></i></button>
          </div>
        </div>

        {/* Inspector */}
        <div style={{ borderLeft: '1px solid var(--border-subtle)', padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: 5, background: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i data-lucide="sparkles" style={{ width: 12, height: 12, color: '#fff' }}></i>
            </div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>Atlas decides</div>
            <span style={{ marginLeft: 'auto', fontSize: 10, fontFamily: 'Geist Mono', color: 'var(--fg-tertiary)' }}>node_3</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 14 }}>The agent decides whether to rebalance from another warehouse or create a purchase order, based on cost, lead time, and projected demand.</div>

          <FieldRow label="Inputs">
            <span style={chip}>SKU</span>
            <span style={chip}>quantity</span>
            <span style={chip}>warehouse</span>
            <span style={chip}>+ 2</span>
          </FieldRow>
          <FieldRow label="Confidence floor">
            <input value="80%" readOnly style={smallInput} />
          </FieldRow>
          <FieldRow label="On low confidence">
            <select style={smallInput}><option>Request approval</option></select>
          </FieldRow>
          <FieldRow label="Outputs">
            <span style={chip}>action</span>
            <span style={chip}>reasoning</span>
            <span style={chip}>confidence</span>
          </FieldRow>
        </div>
      </div>
    </div>
  );
}

function Node({ icon, label, ai }) {
  return (
    <div draggable style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px', background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 5, fontSize: 12, fontWeight: 500, marginBottom: 5, cursor: 'grab', color: ai ? '#5B21B6' : 'var(--fg-primary)' }}>
      <i data-lucide={icon} style={{ width: 14, height: 14, color: ai ? '#7C3AED' : 'var(--fg-secondary)', strokeWidth: 1.75 }}></i>
      {label}
    </div>
  );
}

function FlowNode({ x, y, icon, title, sub, kind }) {
  const colors = {
    trigger: { bg: '#EFF6FF', bd: '#BFDBFE', ic: '#1E40AF' },
    action:  { bg: '#fff',    bd: 'var(--border-default)', ic: 'var(--fg-primary)' },
    agent:   { bg: '#FAF5FF', bd: '#C4B5FD', ic: '#7C3AED' },
  }[kind];
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: 144, padding: 10, background: colors.bg, border: `1px solid ${colors.bd}`, borderRadius: 6, boxShadow: '0 1px 2px rgba(15,23,42,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <i data-lucide={icon} style={{ width: 12, height: 12, color: colors.ic, strokeWidth: 2 }}></i>
        <div style={{ fontSize: 12, fontWeight: 600, color: colors.ic }}>{title}</div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--fg-secondary)' }}>{sub}</div>
    </div>
  );
}

function FlowEdge({ x1, y1, x2, y2 }) {
  const left = Math.min(x1, x2), top = Math.min(y1, y2);
  const w = Math.abs(x2 - x1), h = Math.abs(y2 - y1) || 1;
  return (
    <svg style={{ position: 'absolute', left, top, width: w, height: h, pointerEvents: 'none', overflow: 'visible' }}>
      <path d={`M0 0 C ${w*0.5} 0, ${w*0.5} ${h}, ${w} ${h}`} stroke="#94A3B8" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FieldRow({ label, children }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{children}</div>
    </div>
  );
}

const chip = { background: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: 4, fontFamily: 'Geist Mono', fontSize: 11 };
const smallInput = { width: '100%', height: 28, padding: '0 8px', border: '1px solid var(--border-default)', borderRadius: 5, background: '#fff', fontSize: 12, fontFamily: 'inherit' };
const zb = { width: 24, height: 24, border: 'none', background: 'transparent', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };
const ic = { width: 12, height: 12, color: 'var(--fg-secondary)' };

Object.assign(window, { WorkflowsPage });
