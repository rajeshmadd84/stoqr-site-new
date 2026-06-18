// Stoqr Operator — Overview / dashboard page
function OverviewPage({ onOpenAgent }) {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Tuesday, May 5</div>
          <h1 style={{ margin: '4px 0 0', fontFamily: 'Geist Mono', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>Good morning, Priya.</h1>
          <div style={{ fontSize: 13, color: 'var(--fg-secondary)', marginTop: 2 }}>4 warehouses online · 7 actions waiting on you · Atlas ran 3 cycle counts overnight.</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <Button variant="secondary" size="sm" icon="calendar">May 5</Button>
          <Button variant="primary" size="sm" icon="plus">New movement</Button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>
        <Stat label="Total on hand" value="142,891" unit="units" delta="+1.4%" deltaKind="up" />
        <Stat label="Open movements" value="38" delta="−6" deltaKind="down" />
        <Stat label="Cycle accuracy" value="98.7" unit="%" delta="+0.3pp" deltaKind="up" />
        <Stat label="Awaiting approval" value="7" delta="3 over SLA" deltaKind="flat" />
      </div>

      {/* Two-column main row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <Card title="Throughput · last 7 days" meta="Units in / out per warehouse">
          <ThroughputChart />
        </Card>
        <Card title="Atlas activity" meta={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#7C3AED' }}><span style={{ width: 6, height: 6, background: '#7C3AED', borderRadius: 9999 }}></span>Live</span>} accent="ai">
          <AgentFeed onOpen={onOpenAgent} />
        </Card>
      </div>

      {/* Approvals + low stock */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card title="Approvals · 7 waiting" actions={<Button variant="ghost" size="sm">View all</Button>}>
          <ApprovalRow who="Atlas" what="Transfer 240 units · W-02 → W-04" when="4m ago" kind="ai" />
          <ApprovalRow who="Marcus L." what="Adjust −18 units · SKU-051104-TR" when="22m ago" kind="warning" />
          <ApprovalRow who="Atlas" what="Replenish bin C-08-03 · 60 units" when="1h ago" kind="ai" />
        </Card>
        <Card title="Low stock · across all warehouses" actions={<Button variant="ghost" size="sm">View all</Button>}>
          <LowStockRow sku="SKU-049282-NV" name="Navigator backpack 45L" qty={42} reorder={120} />
          <LowStockRow sku="SKU-062014-AS" name="Ascent jacket L"        qty={14} reorder={50} />
          <LowStockRow sku="SKU-088144-CM" name="Camp pillow"             qty={28} reorder={80} />
        </Card>
      </div>
    </div>
  );
}

function ThroughputChart() {
  const days = ['Wed','Thu','Fri','Sat','Sun','Mon','Tue'];
  const data = [[42,68],[51,72],[60,80],[24,30],[18,22],[78,90],[88,72]];
  const max = 100;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 14, height: 160 }}>
        {data.map((d,i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 4 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3, justifyContent: 'center' }}>
              <div style={{ width: 12, height: `${d[0]/max*100}%`, background: '#2563EB', borderRadius: '3px 3px 0 0' }} title="In"></div>
              <div style={{ width: 12, height: `${d[1]/max*100}%`, background: '#1D97FF', borderRadius: '3px 3px 0 0' }} title="Out"></div>
            </div>
            <div style={{ fontSize: 10, color: 'var(--fg-tertiary)', fontFamily: 'Geist Mono', textAlign: 'center' }}>{days[i]}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: 'var(--fg-secondary)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, background: '#2563EB', borderRadius: 2 }}></span>Inbound</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, background: '#1D97FF', borderRadius: 2 }}></span>Outbound</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'Geist Mono', fontSize: 10, color: 'var(--fg-tertiary)' }}>units (×1k)</span>
      </div>
    </div>
  );
}

function AgentFeed({ onOpen }) {
  const items = [
    { t: 'Now',    title: 'Recounting bin A-12-03', body: 'Variance trigger from yesterday\'s receive. Run started 4:14 PM.', running: true },
    { t: '4m ago', title: 'Suggests transfer · W-02 → W-04', body: '240 units of SKU-049281, based on 30-day demand. Awaiting approval.', cta: 'Review' },
    { t: '1h ago', title: 'Replenished 4 bins · zone D', body: 'Auto-routed from inbound dock 3. 642 units posted.', done: true },
    { t: '3h ago', title: 'Closed cycle count #2841', body: 'Reconciled within tolerance. Variance 0.4%.', done: true },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, margin: '-14px -14px' }}>
      {items.map((it,i) => (
        <div key={i} style={{ padding: '10px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none', background: it.running ? 'rgba(124,58,237,0.06)' : '#fff', display: 'flex', gap: 10 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: it.running ? '#7C3AED' : it.done ? '#16A34A' : '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
            <i data-lucide={it.done ? 'check' : 'sparkles'} style={{ width: 11, height: 11, color: it.done || it.running ? '#fff' : '#7C3AED' }}></i>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.title}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-tertiary)', fontFamily: 'Geist Mono', flexShrink: 0 }}>{it.t}</div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 2, lineHeight: 1.45 }}>{it.body}</div>
            {it.cta && <button onClick={onOpen} style={{ marginTop: 6, background: 'transparent', border: 'none', color: '#7C3AED', fontWeight: 600, fontSize: 12, padding: 0, cursor: 'pointer' }}>{it.cta} →</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ApprovalRow({ who, what, when, kind }) {
  const isAI = kind === 'ai';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ width: 24, height: 24, borderRadius: 5, background: isAI ? '#EDE9FE' : 'var(--slate-100)', color: isAI ? '#7C3AED' : 'var(--slate-700)', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {isAI ? <i data-lucide="sparkles" style={{ width: 11, height: 11 }}></i> : who.split(' ').map(p=>p[0]).join('')}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{what}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>{who} · {when}</div>
      </div>
      <Button variant="primary" size="sm">Approve</Button>
      <Button variant="ghost" size="sm">Adjust</Button>
    </div>
  );
}

function LowStockRow({ sku, name, qty, reorder }) {
  const pct = Math.min(100, (qty / reorder) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--fg-tertiary)' }}>{sku}</div>
      </div>
      <div style={{ width: 100 }}>
        <div style={{ height: 6, background: 'var(--slate-100)', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: '#D97706' }}></div>
        </div>
        <div style={{ fontSize: 10, color: 'var(--fg-tertiary)', marginTop: 3, textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontFamily: 'Geist Mono' }}>{qty}/{reorder}</div>
      </div>
    </div>
  );
}

Object.assign(window, { OverviewPage });
