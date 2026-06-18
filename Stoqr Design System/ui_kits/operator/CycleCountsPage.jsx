// Stoqr Operator — Cycle counts page (mobile-style scanner card + variance review)
function CycleCountsPage() {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'Geist Mono', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Cycle counts</h1>
          <div style={{ fontSize: 12, color: 'var(--fg-tertiary)', marginTop: 2 }}>3 in progress · 28 closed this week · 98.7% accuracy</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <Button variant="secondary" size="sm" icon="sparkles">Atlas: schedule</Button>
          <Button variant="primary" size="sm" icon="plus">New count</Button>
        </div>
      </div>

      {/* Active count detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card title="Count #2843 · Zone C" meta={<StatusPill kind="warning">In progress</StatusPill>}>
          <div style={{ display: 'flex', gap: 14, marginBottom: 12 }}>
            <div><div style={{ fontSize: 11, color: 'var(--fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Counted</div><div style={{ fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>48 <span style={{ fontSize: 12, color: 'var(--fg-tertiary)', fontWeight: 500 }}>/ 64 bins</span></div></div>
            <div><div style={{ fontSize: 11, color: 'var(--fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Variance</div><div style={{ fontSize: 22, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: '#D97706' }}>2.1<span style={{ fontSize: 12, fontWeight: 500 }}>%</span></div></div>
            <div style={{ marginLeft: 'auto' }}><div style={{ fontSize: 11, color: 'var(--fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Counter</div><div style={{ fontSize: 13, fontWeight: 500, marginTop: 4 }}>Marcus L.</div></div>
          </div>
          <div style={{ height: 6, background: 'var(--slate-100)', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{ width: '75%', height: '100%', background: '#2563EB' }}></div>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Variances · 3</div>
          <div style={{ marginTop: 8 }}>
            <VarianceRow bin="C-08-03" sku="SKU-062014-AS" sys={36} act={14} delta={-22} />
            <VarianceRow bin="C-08-09" sku="SKU-062018-AS" sys={42} act={48} delta={+6} />
            <VarianceRow bin="C-09-01" sku="SKU-062032-AS" sys={120} act={114} delta={-6} />
          </div>
        </Card>

        <Card title="Scanner · live" meta={<span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)' }}>device_42</span>}>
          <div style={{ background: 'var(--slate-900)', color: '#fff', borderRadius: 6, padding: 18, fontFamily: 'Geist Mono', fontSize: 12, lineHeight: 1.7 }}>
            <div style={{ color: '#94A3B8' }}>[16:14:02]</div>
            <div>scan&nbsp;→&nbsp;<span style={{ color: '#67E8F9' }}>C-08-03</span></div>
            <div>sku&nbsp;&nbsp;→&nbsp;<span style={{ color: '#67E8F9' }}>SKU-062014-AS</span></div>
            <div>sys&nbsp;&nbsp;36&nbsp;·&nbsp;count <span style={{ color: '#FCD34D' }}>14</span></div>
            <div style={{ color: '#FCA5A5' }}>variance &minus;22 (61%) — flag</div>
            <div style={{ color: '#94A3B8', marginTop: 8 }}>[16:14:18]</div>
            <div>recount? <span style={{ color: '#86EFAC' }}>y</span></div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
            <Button variant="primary" size="sm" icon="check">Confirm</Button>
            <Button variant="secondary" size="sm" icon="repeat">Recount</Button>
            <Button variant="ghost" size="sm">Skip</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function VarianceRow({ bin, sku, sys, act, delta }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 60px 60px 60px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ fontFamily: 'Geist Mono' }}>{bin}</div>
      <div style={{ fontFamily: 'Geist Mono', color: 'var(--fg-secondary)' }}>{sku}</div>
      <div style={{ textAlign: 'right', color: 'var(--fg-tertiary)' }}>{sys}</div>
      <div style={{ textAlign: 'right', fontWeight: 500 }}>{act}</div>
      <div style={{ textAlign: 'right', color: delta < 0 ? '#DC2626' : '#16A34A', fontWeight: 600 }}>{delta > 0 ? '+' : ''}{delta}</div>
    </div>
  );
}

Object.assign(window, { CycleCountsPage });
