// Stoqr Client — Overview / inventory / request stock / approvals
function ClientOverview({ onRequest }) {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 28px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Tuesday, May 5</div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'Geist Mono', fontSize: 30, fontWeight: 600, letterSpacing: '-0.02em' }}>Welcome back, Jordan.</h1>
          <div style={{ fontSize: 14, color: 'var(--fg-secondary)', marginTop: 4 }}>Your warehouse <strong>Atlas-3</strong> has 4 actions waiting on you.</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button onClick={onRequest} style={{ height: 36, padding: '0 14px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)' }}>
            <i data-lucide="arrow-down-up" style={{ width: 14, height: 14 }}></i>
            Request stock movement
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginTop: 24 }}>
        <ClientStat label="On hand" value="48,210" unit="units" />
        <ClientStat label="In transit" value="3,402" unit="units" tone="info" />
        <ClientStat label="Open requests" value="6" />
        <ClientStat label="SKUs below reorder" value="11" tone="warning" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16, marginTop: 16 }}>
        <Card title="Recent activity" actions={<Button variant="ghost" size="sm">View all</Button>}>
          <ActivityRow icon="package-plus" who="Atlas" action="Received 1,200 units" sub="SKU-049281-NV · from supplier ACME-09" t="2h ago" tone="info" />
          <ActivityRow icon="check-circle-2" who="You" action="Approved transfer · 240 units" sub="W-02 → W-04 · suggested by Atlas" t="Yesterday" tone="success" />
          <ActivityRow icon="clipboard-check" who="Atlas" action="Closed cycle count #2841" sub="Variance 0.4% — within tolerance" t="Yesterday" tone="success" />
          <ActivityRow icon="alert-triangle" who="Atlas" action="Flagged variance" sub="Bin C-08-03 · −22 units" t="2d ago" tone="warning" />
          <ActivityRow icon="package-minus" who="Marcus L." action="Posted shipment · 84 units" sub="Order #SO-99412" t="2d ago" tone="info" />
        </Card>
        <Card title="Action queue" meta={<span style={{ fontSize: 11, color: '#DC2626', fontWeight: 600 }}>4 waiting</span>}>
          <ActionRow title="Approve transfer · 240 units" body="Atlas suggests rebalancing W-02 → W-04." kind="ai" />
          <ActionRow title="Confirm receipt · PO-77291" body="1,200 units arrived at dock 3 yesterday." kind="info" />
          <ActionRow title="Resolve variance · bin C-08-03" body="System −22. Recount or accept?" kind="warning" />
          <ActionRow title="Sign off cycle count #2843" body="Marcus completed his pass at 3:48 PM." kind="success" />
        </Card>
      </div>
    </div>
  );
}

function ClientStat({ label, value, unit, tone }) {
  const accent = tone === 'warning' ? '#D97706' : tone === 'info' ? '#0891B2' : 'var(--fg-primary)';
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{label}</div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 30, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', color: accent }}>{value}</span>
        {unit && <span style={{ fontSize: 13, color: 'var(--fg-tertiary)' }}>{unit}</span>}
      </div>
    </div>
  );
}

function ActivityRow({ icon, who, action, sub, t, tone }) {
  const bgMap = { info: '#CFFAFE', success: '#DCFCE7', warning: '#FEF3C7', danger: '#FEE2E2' };
  const fgMap = { info: '#0891B2', success: '#16A34A', warning: '#D97706', danger: '#DC2626' };
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: bgMap[tone], color: fgMap[tone], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <i data-lucide={icon} style={{ width: 14, height: 14 }}></i>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{action}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--fg-tertiary)', fontFamily: 'Geist Mono', whiteSpace: 'nowrap' }}>{who} · {t}</div>
    </div>
  );
}

function ActionRow({ title, body, kind }) {
  const icMap = { ai: 'sparkles', info: 'info', warning: 'alert-triangle', success: 'check-circle-2' };
  const fgMap = { ai: '#7C3AED', info: '#0891B2', warning: '#D97706', success: '#16A34A' };
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <i data-lucide={icMap[kind]} style={{ width: 13, height: 13, color: fgMap[kind] }}></i>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.45, marginLeft: 21 }}>{body}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8, marginLeft: 21 }}>
        <button style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: 5, fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Review</button>
        <button style={{ background: 'transparent', border: 'none', padding: '5px 8px', fontSize: 12, fontWeight: 600, color: 'var(--fg-secondary)', fontFamily: 'inherit', cursor: 'pointer' }}>Snooze</button>
      </div>
    </div>
  );
}

function ClientRequest({ onSubmit, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(8px)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{ width: 540, background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 8, boxShadow: '0 24px 48px -12px rgba(15,23,42,0.20)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Request stock movement</div>
          <button onClick={onClose} style={{ marginLeft: 'auto', width: 28, height: 28, border: 'none', background: 'transparent', cursor: 'pointer' }}><i data-lucide="x" style={{ width: 14, height: 14 }}></i></button>
        </div>
        <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Field label="SKU"><input value="SKU-049281-NV" readOnly style={inp('mono')} /></Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="From"><div style={inp()}>W-02 · Houston North</div></Field>
            <Field label="To"><div style={inp()}>W-04 · Dallas East</div></Field>
          </div>
          <Field label="Quantity"><input defaultValue="240" style={inp()} /></Field>
          <Field label="Reason"><textarea rows="3" defaultValue="Demand projection at W-04 has grown 18% over the last 30 days." style={{ ...inp(), height: 'auto', padding: 10, resize: 'vertical' }}></textarea></Field>
          <div style={{ background: '#FAF5FF', border: '1px solid #C4B5FD', borderRadius: 6, padding: 10, display: 'flex', gap: 10 }}>
            <i data-lucide="sparkles" style={{ width: 14, height: 14, color: '#7C3AED', flexShrink: 0, marginTop: 2 }}></i>
            <div style={{ fontSize: 12, color: '#5B21B6', lineHeight: 1.5 }}>Atlas pre-filled this from your demand model. You can edit any field — Atlas will note overrides.</div>
          </div>
        </div>
        <div style={{ padding: 14, borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ height: 34, padding: '0 14px', background: '#fff', border: '1px solid var(--border-default)', borderRadius: 6, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onSubmit} style={{ height: 34, padding: '0 14px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Submit request</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return <div><div style={{ fontSize: 12, fontWeight: 500, color: 'var(--fg-secondary)', marginBottom: 6 }}>{label}</div>{children}</div>;
}
function inp(kind) {
  return { width: '100%', height: 34, padding: '0 10px', border: '1px solid var(--border-default)', borderRadius: 6, fontSize: 13, fontFamily: kind === 'mono' ? 'Geist Mono, monospace' : 'inherit', background: '#fff', display: 'flex', alignItems: 'center', boxSizing: 'border-box', outline: 'none' };
}

Object.assign(window, { ClientOverview, ClientRequest });
