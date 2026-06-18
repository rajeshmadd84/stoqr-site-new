// Stoqr Operator — Movements, Approvals, Agents, Warehouses, Team, Settings.
// Built from Shell.jsx primitives: Button, Card, Stat, StatusPill.

// ============================================================
// PAGE HEADER (shared)
// ============================================================
function PageHeader({ eyebrow, title, sub, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
      <div>
        {eyebrow && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{eyebrow}</div>}
        <h1 style={{ margin: '4px 0 0', fontFamily: 'Geist Mono', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{title}</h1>
        {sub && <div style={{ fontSize: 13, color: 'var(--fg-secondary)', marginTop: 2 }}>{sub}</div>}
      </div>
      {actions && <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>{actions}</div>}
    </div>
  );
}

// ============================================================
// MOVEMENTS
// ============================================================
function MovementsPage() {
  const [tab, setTab] = React.useState('all');
  const tabs = [
    { k: 'all', label: 'All', count: 38 },
    { k: 'inbound', label: 'Inbound', count: 9 },
    { k: 'outbound', label: 'Outbound', count: 12 },
    { k: 'transfer', label: 'Transfer', count: 14 },
    { k: 'adjust', label: 'Adjust', count: 3 },
  ];
  const rows = [
    { id: 'MV-104821', kind: 'transfer', sku: 'SKU-049281-NV', name: 'Navigator backpack 30L', from: 'W-02 · A-12-03', to: 'W-04 · B-03-11', qty: 240, status: 'running', who: 'Atlas', when: 'Now' },
    { id: 'MV-104820', kind: 'inbound',  sku: 'SKU-088144-CM', name: 'Camp pillow',              from: 'PO-77291',     to: 'W-02 · dock 3',  qty: 600, status: 'pending', who: 'Marcus L.', when: '4m ago' },
    { id: 'MV-104819', kind: 'outbound', sku: 'SKU-051104-TR', name: 'Trail bottle 750ml',       from: 'W-04 · D-01-08', to: 'SO-44819',     qty: 18,  status: 'done',    who: 'Priya K.',  when: '12m ago' },
    { id: 'MV-104818', kind: 'transfer', sku: 'SKU-062014-AS', name: 'Ascent jacket L',          from: 'W-03 · F-22-01', to: 'W-02 · F-22-01', qty: 36,  status: 'done',    who: 'Atlas',     when: '38m ago' },
    { id: 'MV-104817', kind: 'adjust',   sku: 'SKU-049282-NV', name: 'Navigator backpack 45L',   from: 'W-02 · A-12-04', to: '—',             qty: -4,  status: 'flagged', who: 'Marcus L.', when: '1h ago' },
    { id: 'MV-104816', kind: 'inbound',  sku: 'SKU-049281-NV', name: 'Navigator backpack 30L',   from: 'PO-77284',     to: 'W-02 · dock 3',  qty: 1200,status: 'done',    who: 'Marcus L.', when: '2h ago' },
    { id: 'MV-104815', kind: 'outbound', sku: 'SKU-088144-CM', name: 'Camp pillow',              from: 'W-02 · C-08-01', to: 'SO-44814',     qty: 60,  status: 'done',    who: 'Atlas',     when: '3h ago' },
    { id: 'MV-104814', kind: 'transfer', sku: 'SKU-051104-TR', name: 'Trail bottle 750ml',       from: 'W-04 · D-01-08', to: 'W-01 · D-01-08', qty: 84,  status: 'done',    who: 'Priya K.',  when: '4h ago' },
  ];
  const kindIcon = { transfer: 'arrow-right-left', inbound: 'arrow-down-to-line', outbound: 'arrow-up-from-line', adjust: 'pencil' };
  const statusKind = { running: 'ai', pending: 'warning', done: 'success', flagged: 'danger' };
  const statusLabel = { running: 'Running', pending: 'Pending', done: 'Posted', flagged: 'Flagged' };

  const filtered = tab === 'all' ? rows : rows.filter(r => r.kind === tab);

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        eyebrow="Last 24 hours"
        title="Movements"
        sub="38 movements in flight across 4 warehouses · 3 flagged."
        actions={<>
          <Button variant="secondary" size="sm" icon="download">Export</Button>
          <Button variant="primary" size="sm" icon="plus">New movement</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>
        <Stat label="Open" value="38" delta="−6" deltaKind="down" />
        <Stat label="Posted today" value="124" delta="+12%" deltaKind="up" />
        <Stat label="Avg cycle time" value="14" unit="min" delta="−2 min" deltaKind="up" />
        <Stat label="Flagged" value="3" delta="2 over SLA" deltaKind="flat" />
      </div>

      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12, borderBottom: '1px solid var(--border-subtle)', margin: '-14px -14px 0' }}>
          {tabs.map(t => (
            <button key={t.k} onClick={() => setTab(t.k)} style={{
              height: 38, padding: '0 14px', border: 'none', background: 'transparent',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              color: tab === t.k ? 'var(--fg-primary)' : 'var(--fg-secondary)',
              borderBottom: `2px solid ${tab === t.k ? '#2563EB' : 'transparent'}`,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {t.label}
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--fg-tertiary)', fontVariantNumeric: 'tabular-nums' }}>{t.count}</span>
            </button>
          ))}
          <div style={{ marginLeft: 'auto', padding: '0 14px', display: 'flex', gap: 6 }}>
            <Button variant="ghost" size="sm" icon="filter">Filter</Button>
            <Button variant="ghost" size="sm" icon="arrow-down-up">Sort</Button>
          </div>
        </div>

        <div style={{ margin: '0 -14px -14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 32px 1.4fr 1.6fr 80px 110px 110px', padding: '8px 14px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>ID</div><div></div><div>Item</div><div>From → To</div><div style={{ textAlign: 'right' }}>Qty</div><div>Status</div><div>When</div>
          </div>
          {filtered.map(r => (
            <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '120px 32px 1.4fr 1.6fr 80px 110px 110px', padding: '10px 14px', fontSize: 13, alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', fontVariantNumeric: 'tabular-nums' }}>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-secondary)' }}>{r.id}</div>
              <div style={{ width: 22, height: 22, borderRadius: 5, background: 'var(--slate-100)', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i data-lucide={kindIcon[r.kind]} style={{ width: 12, height: 12 }}></i>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)' }}>{r.sku}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--fg-secondary)', fontFamily: 'Geist Mono', overflow: 'hidden' }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.from}</span>
                <i data-lucide="arrow-right" style={{ width: 12, height: 12, color: 'var(--fg-muted)', flexShrink: 0 }}></i>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.to}</span>
              </div>
              <div style={{ textAlign: 'right', fontWeight: 600, color: r.qty < 0 ? '#DC2626' : 'inherit' }}>{r.qty > 0 ? '+' : ''}{r.qty.toLocaleString()}</div>
              <div><StatusPill kind={statusKind[r.status]}>{statusLabel[r.status]}</StatusPill></div>
              <div style={{ fontSize: 12, color: 'var(--fg-secondary)' }}>{r.who} · {r.when}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// APPROVALS
// ============================================================
function ApprovalsPage() {
  const queue = [
    { id: 'AP-2841', who: 'Atlas',     ai: true,  title: 'Transfer 240 units · W-02 → W-04', sla: 'overdue 6m', conf: 94, kind: 'transfer' },
    { id: 'AP-2840', who: 'Marcus L.', ai: false, title: 'Adjust −18 units · SKU-051104-TR',  sla: '22m left',   kind: 'adjust' },
    { id: 'AP-2839', who: 'Atlas',     ai: true,  title: 'Replenish bin C-08-03 · 60 units',  sla: '1h left',    conf: 88, kind: 'transfer' },
    { id: 'AP-2838', who: 'Atlas',     ai: true,  title: 'Auto-route inbound dock 3 → zone D', sla: '2h left',   conf: 99, kind: 'route' },
    { id: 'AP-2837', who: 'Jess W.',   ai: false, title: 'Override variance 7.4% · bin F-22-01', sla: '3h left', kind: 'adjust' },
    { id: 'AP-2836', who: 'Atlas',     ai: true,  title: 'Open PO · 800 units · SKU-088144',  sla: '4h left',   conf: 76, kind: 'po' },
    { id: 'AP-2835', who: 'Marcus L.', ai: false, title: 'Receive shipment SHP-22918 short by 12u', sla: '6h left', kind: 'inbound' },
  ];
  const [sel, setSel] = React.useState(0);
  const cur = queue[sel];

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        eyebrow="7 waiting · 1 overdue"
        title="Approvals"
        sub="Human and agent-proposed actions awaiting your sign-off."
        actions={<>
          <Button variant="secondary" size="sm" icon="filter">Filter</Button>
          <Button variant="secondary" size="sm" icon="archive">Archive</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 14, alignItems: 'flex-start' }}>
        {/* Queue */}
        <Card title="Queue" meta="7 items">
          <div style={{ margin: '-14px' }}>
            {queue.map((q, i) => (
              <button key={q.id} onClick={() => setSel(i)} style={{
                width: '100%', display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px', border: 'none', background: sel === i ? 'var(--slate-50)' : '#fff',
                borderLeft: `2px solid ${sel === i ? '#2563EB' : 'transparent'}`,
                borderBottom: '1px solid var(--border-subtle)', fontFamily: 'inherit', textAlign: 'left', cursor: 'pointer',
              }}>
                <div style={{ width: 24, height: 24, borderRadius: 5, background: q.ai ? '#EDE9FE' : 'var(--slate-100)', color: q.ai ? '#7C3AED' : 'var(--slate-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, fontWeight: 700 }}>
                  {q.ai ? <i data-lucide="sparkles" style={{ width: 11, height: 11 }}></i> : q.who.split(' ').map(p=>p[0]).join('')}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35 }}>{q.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-tertiary)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'Geist Mono' }}>{q.id}</span>
                    <span>·</span>
                    <span>{q.who}</span>
                    <span>·</span>
                    <span style={{ color: q.sla.includes('overdue') ? '#DC2626' : 'var(--fg-tertiary)', fontWeight: q.sla.includes('overdue') ? 600 : 400 }}>{q.sla}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Detail */}
        <Card
          accent={cur.ai ? 'ai' : null}
          title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>{cur.ai && <i data-lucide="sparkles" style={{ width: 14, height: 14, color: '#7C3AED' }}></i>}{cur.title}</span>}
          meta={<span style={{ fontFamily: 'Geist Mono' }}>{cur.id}</span>}
        >
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <StatusPill kind={cur.ai ? 'ai' : 'neutral'}>{cur.ai ? `Atlas · ${cur.conf}% conf` : cur.who}</StatusPill>
            <StatusPill kind={cur.sla.includes('overdue') ? 'danger' : 'warning'}>{cur.sla}</StatusPill>
            <StatusPill kind="info">{cur.kind}</StatusPill>
          </div>

          {cur.ai && (
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: 6, padding: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7C3AED', marginBottom: 6 }}>Atlas reasoning</div>
              <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.55 }}>30-day demand at the destination has grown 18% week-over-week. Source warehouse carries 4.3× safety stock. Proposed move reduces holding cost by ~$840/mo without affecting fill rate at the source. Confidence: <strong style={{ color: '#7C3AED' }}>{cur.conf}%</strong>.</div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 10, columnGap: 14, fontSize: 13, padding: '4px 0 14px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--fg-tertiary)' }}>SKU</div><div style={{ fontFamily: 'Geist Mono' }}>SKU-049281-NV</div>
            <div style={{ color: 'var(--fg-tertiary)' }}>Item</div><div>Navigator backpack 30L</div>
            <div style={{ color: 'var(--fg-tertiary)' }}>Source</div><div style={{ fontFamily: 'Geist Mono' }}>W-02 · bin A-12-03</div>
            <div style={{ color: 'var(--fg-tertiary)' }}>Destination</div><div style={{ fontFamily: 'Geist Mono' }}>W-04 · bin B-03-11</div>
            <div style={{ color: 'var(--fg-tertiary)' }}>Quantity</div><div style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>240 units</div>
            <div style={{ color: 'var(--fg-tertiary)' }}>Window</div><div>May 5, 2026 · within 24h</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14 }}>
            <Button variant={cur.ai ? 'agent' : 'primary'} icon="check">Approve & post</Button>
            <Button variant="secondary" icon="pencil">Adjust</Button>
            <Button variant="ghost">Decline</Button>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-tertiary)' }}>Use <span style={{ fontFamily: 'Geist Mono', background: 'var(--slate-100)', padding: '1px 5px', borderRadius: 3 }}>A</span> to approve · <span style={{ fontFamily: 'Geist Mono', background: 'var(--slate-100)', padding: '1px 5px', borderRadius: 3 }}>D</span> to decline</span>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// AGENTS
// ============================================================
function AgentsPage() {
  const agents = [
    { name: 'Atlas',  role: 'Operations',         color: '#7C3AED', status: 'running',  runs: 1284, success: 98.7, sub: 'Replenishment, transfers, cycle counts.' },
    { name: 'Helix',  role: 'Receiving',          color: '#0891B2', status: 'idle',     runs:  642, success: 99.1, sub: 'Inbound routing, dock scheduling.' },
    { name: 'Vault',  role: 'Audit',              color: '#16A34A', status: 'idle',     runs:  318, success: 99.8, sub: 'Variance investigation, cycle audits.' },
    { name: 'Pilot',  role: 'Demand forecasting', color: '#D97706', status: 'paused',   runs:   91, success: 92.4, sub: 'Replenishment proposals, PO drafts.' },
  ];
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        eyebrow="4 active · 1 paused"
        title="Agents"
        sub="Autonomous workers running on your behalf. Configure scope, approval rules, and escalations."
        actions={<>
          <Button variant="secondary" size="sm" icon="book-open">Docs</Button>
          <Button variant="agent" size="sm" icon="plus">Add agent</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10 }}>
        <Stat label="Runs today" value="2,335" delta="+8%" deltaKind="up" />
        <Stat label="Auto-resolved" value="91" unit="%" delta="+2pp" deltaKind="up" />
        <Stat label="Awaiting approval" value="5" delta="−2" deltaKind="up" />
        <Stat label="Cost · today" value="$12.40" delta="of $50 budget" deltaKind="flat" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {agents.map(a => (
          <Card key={a.name} accent={a.status === 'running' ? 'ai' : null}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: `linear-gradient(180deg, ${a.color}, ${shade(a.color, -0.18)})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)' }}>
                <i data-lucide="sparkles" style={{ width: 20, height: 20 }}></i>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: 'Geist Mono', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{a.role}</div>
                  <div style={{ marginLeft: 'auto' }}>
                    <StatusPill kind={a.status === 'running' ? 'ai' : a.status === 'paused' ? 'warning' : 'neutral'}>{a.status}</StatusPill>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: 'var(--fg-secondary)', marginTop: 6, lineHeight: 1.5 }}>{a.sub}</div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                  <Mini label="Runs (30d)" value={a.runs.toLocaleString()} />
                  <Mini label="Success" value={`${a.success}%`} />
                  <Mini label="Last run" value={a.status === 'running' ? 'Now' : a.status === 'paused' ? '3d ago' : '4m ago'} />
                </div>

                <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                  <Button variant="secondary" size="sm" icon="settings">Configure</Button>
                  <Button variant="ghost" size="sm" icon="history">Runs</Button>
                  {a.status === 'paused'
                    ? <Button variant="ghost" size="sm" icon="play">Resume</Button>
                    : <Button variant="ghost" size="sm" icon="pause">Pause</Button>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Recent agent runs" actions={<Button variant="ghost" size="sm">View all</Button>}>
        <div style={{ margin: '-14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 100px 1fr 110px 90px 80px', padding: '8px 14px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>Run</div><div>Agent</div><div>Action</div><div>Outcome</div><div>Duration</div><div>When</div>
          </div>
          {[
            { id: 'r_01HK9X4ZQ7P', agent: 'Atlas', action: 'Recount bin A-12-03', outcome: 'running', dur: '—',     t: 'Now' },
            { id: 'r_01HK9X4Q12K', agent: 'Helix', action: 'Route inbound dock 3 → zone D', outcome: 'success', dur: '4.2s', t: '12m ago' },
            { id: 'r_01HK9X4M77B', agent: 'Atlas', action: 'Suggest transfer W-02→W-04', outcome: 'awaiting', dur: '1.8s', t: '4m ago' },
            { id: 'r_01HK9X4F33A', agent: 'Vault', action: 'Investigate variance bin F-22', outcome: 'success', dur: '11s', t: '38m ago' },
            { id: 'r_01HK9X4A09Y', agent: 'Atlas', action: 'Replenish 4 bins · zone D',   outcome: 'success', dur: '6.1s', t: '1h ago' },
          ].map(r => (
            <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '90px 100px 1fr 110px 90px 80px', padding: '10px 14px', fontSize: 13, alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.id.slice(0, 10)}…</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                <i data-lucide="sparkles" style={{ width: 11, height: 11, color: '#7C3AED' }}></i>
                {r.agent}
              </div>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.action}</div>
              <div>
                <StatusPill kind={r.outcome === 'success' ? 'success' : r.outcome === 'awaiting' ? 'warning' : 'ai'}>{r.outcome}</StatusPill>
              </div>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-secondary)', fontVariantNumeric: 'tabular-nums' }}>{r.dur}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{r.t}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Geist Mono', fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function shade(hex, amt) {
  const h = hex.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(h.slice(0,2),16) + Math.round(255*amt)));
  const g = Math.max(0, Math.min(255, parseInt(h.slice(2,4),16) + Math.round(255*amt)));
  const b = Math.max(0, Math.min(255, parseInt(h.slice(4,6),16) + Math.round(255*amt)));
  return '#' + [r,g,b].map(v => v.toString(16).padStart(2,'0')).join('');
}

// ============================================================
// WAREHOUSES
// ============================================================
function WarehousesPage() {
  const houses = [
    { code: 'W-01', name: 'Atlanta South',  city: 'Atlanta, GA',     status: 'online', skus: 1842, units: 38_120, cap: 0.62, agent: 'Helix', acc: 99.1 },
    { code: 'W-02', name: 'Houston North',  city: 'Houston, TX',     status: 'online', skus: 2104, units: 51_842, cap: 0.78, agent: 'Atlas', acc: 98.7 },
    { code: 'W-03', name: 'Reno East',      city: 'Reno, NV',        status: 'online', skus: 1118, units: 22_644, cap: 0.41, agent: 'Atlas', acc: 99.4 },
    { code: 'W-04', name: 'Newark Hub',     city: 'Newark, NJ',      status: 'attention', skus: 1422, units: 30_285, cap: 0.91, agent: 'Atlas', acc: 96.8 },
  ];
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        eyebrow="4 online · 1 needs attention"
        title="Warehouses"
        sub="Capacity, accuracy, and assigned agents per facility."
        actions={<>
          <Button variant="secondary" size="sm" icon="map">Map view</Button>
          <Button variant="primary" size="sm" icon="plus">Add warehouse</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 }}>
        {houses.map(h => (
          <Card key={h.code} accent={h.status === 'attention' ? null : null}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 64, height: 64, borderRadius: 6, background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
                <i data-lucide="warehouse" style={{ width: 28, height: 28, color: 'var(--slate-500)' }}></i>
                <span style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', fontFamily: 'Geist Mono', fontSize: 10, fontWeight: 700, background: '#fff', border: '1px solid var(--border-subtle)', padding: '1px 5px', borderRadius: 3 }}>{h.code}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>{h.name}</div>
                  <div style={{ marginLeft: 'auto' }}>
                    <StatusPill kind={h.status === 'online' ? 'success' : 'warning'}>{h.status}</StatusPill>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 2 }}>{h.city}</div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Capacity</div>
                    <div style={{ marginLeft: 'auto', fontFamily: 'Geist Mono', fontSize: 12, fontWeight: 600, color: h.cap > 0.85 ? '#DC2626' : 'var(--fg-primary)' }}>{Math.round(h.cap*100)}%</div>
                  </div>
                  <div style={{ height: 6, background: 'var(--slate-100)', borderRadius: 9999, marginTop: 5, overflow: 'hidden' }}>
                    <div style={{ width: `${h.cap*100}%`, height: '100%', background: h.cap > 0.85 ? '#DC2626' : h.cap > 0.7 ? '#D97706' : '#16A34A' }}></div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
                  <Mini label="SKUs" value={h.skus.toLocaleString()} />
                  <Mini label="Units" value={h.units.toLocaleString()} />
                  <Mini label="Accuracy" value={`${h.acc}%`} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#7C3AED', fontWeight: 600 }}>
                    <i data-lucide="sparkles" style={{ width: 11, height: 11 }}></i>
                    {h.agent}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>· managing this site</span>
                  <Button variant="ghost" size="sm" icon="arrow-up-right" style={{ marginLeft: 'auto' }}>Open</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// TEAM
// ============================================================
function TeamPage() {
  const team = [
    { name: 'Priya Kapoor',   email: 'priya@acme.co',    role: 'Owner',       wh: 'All',           last: 'Now',       seat: 'pro',  init: 'PK', col: '#2563EB' },
    { name: 'Marcus Lehman',  email: 'marcus@acme.co',   role: 'Ops manager', wh: 'W-02',          last: '2m ago',    seat: 'pro',  init: 'ML', col: '#0891B2' },
    { name: 'Jess Ward',      email: 'jess@acme.co',     role: 'Auditor',     wh: 'W-03, W-04',    last: '1h ago',    seat: 'pro',  init: 'JW', col: '#7C3AED' },
    { name: 'Devin Park',     email: 'devin@acme.co',    role: 'Floor lead',  wh: 'W-02',          last: 'Yesterday', seat: 'std',  init: 'DP', col: '#16A34A' },
    { name: 'Sana Iqbal',     email: 'sana@acme.co',     role: 'Floor lead',  wh: 'W-04',          last: '3d ago',    seat: 'std',  init: 'SI', col: '#D97706' },
    { name: 'Open invitation', email: 'lukas@acme.co',   role: 'Floor lead',  wh: 'W-01',          last: '—',         seat: 'pending', init: '?', col: 'var(--slate-400)' },
  ];
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader
        eyebrow="5 active · 1 invited"
        title="Team"
        sub="Members who can sign in to this Stoqr tenant."
        actions={<>
          <Button variant="secondary" size="sm" icon="shield">Roles</Button>
          <Button variant="primary" size="sm" icon="user-plus">Invite member</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>
        <Stat label="Active members" value="5" />
        <Stat label="Pending invites" value="1" />
        <Stat label="Seats used" value="6" unit="of 10" />
      </div>

      <Card title="Members" actions={<>
        <Button variant="ghost" size="sm" icon="filter">Filter</Button>
        <Button variant="ghost" size="sm" icon="download">Export</Button>
      </>}>
        <div style={{ margin: '-14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 100px 90px 40px', padding: '8px 14px', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>Member</div><div>Role</div><div>Warehouses</div><div>Seat</div><div>Last active</div><div></div>
          </div>
          {team.map(m => (
            <div key={m.email} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 100px 90px 40px', padding: '10px 14px', fontSize: 13, alignItems: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: m.col, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, opacity: m.seat === 'pending' ? 0.6 : 1 }}>{m.init}</div>
                <div style={{ minWidth: 0, overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Geist Mono' }}>{m.email}</div>
                </div>
              </div>
              <div>
                <StatusPill kind={m.role === 'Owner' ? 'info' : m.role === 'Auditor' ? 'ai' : 'neutral'} dot={false}>{m.role}</StatusPill>
              </div>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-secondary)' }}>{m.wh}</div>
              <div>
                {m.seat === 'pending'
                  ? <StatusPill kind="warning" dot={false}>Invited</StatusPill>
                  : <span style={{ fontSize: 12, color: 'var(--fg-secondary)' }}>{m.seat === 'pro' ? 'Pro' : 'Standard'}</span>}
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{m.last}</div>
              <button style={{ width: 28, height: 28, border: '1px solid var(--border-subtle)', background: '#fff', borderRadius: 5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i data-lucide="more-horizontal" style={{ width: 14, height: 14 }}></i>
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// SETTINGS
// ============================================================
function SettingsPage() {
  const [section, setSection] = React.useState('org');
  const sections = [
    { k: 'org',           label: 'Organization', icon: 'building-2' },
    { k: 'notifications', label: 'Notifications', icon: 'bell' },
    { k: 'agents',        label: 'Agent policy', icon: 'sparkles' },
    { k: 'integrations',  label: 'Integrations',  icon: 'plug' },
    { k: 'api',           label: 'API & webhooks', icon: 'code' },
    { k: 'billing',       label: 'Billing',       icon: 'credit-card' },
  ];
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <PageHeader eyebrow="Acme Co. · tenant_47291" title="Settings" sub="Tenant-wide configuration. Per-warehouse settings live on each warehouse page." />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 6, position: 'sticky', top: 70 }}>
          {sections.map(s => (
            <button key={s.k} onClick={() => setSection(s.k)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px', border: 'none',
              background: section === s.k ? 'var(--slate-100)' : 'transparent',
              color: section === s.k ? 'var(--fg-primary)' : 'var(--fg-secondary)',
              fontWeight: section === s.k ? 600 : 500, fontFamily: 'inherit', fontSize: 13,
              borderRadius: 5, cursor: 'pointer', textAlign: 'left',
            }}>
              <i data-lucide={s.icon} style={{ width: 14, height: 14 }}></i>
              {s.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {section === 'org' && <SettingsOrg />}
          {section === 'notifications' && <SettingsNotifications />}
          {section === 'agents' && <SettingsAgentPolicy />}
          {section === 'integrations' && <SettingsIntegrations />}
          {section === 'api' && <SettingsApi />}
          {section === 'billing' && <SettingsBilling />}
        </div>
      </div>
    </div>
  );
}

function FieldRow({ label, hint, children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border-subtle)', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
        {hint && <div style={{ fontSize: 12, color: 'var(--fg-tertiary)', marginTop: 2, lineHeight: 1.45 }}>{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Inp(props) {
  return <input {...props} style={{ width: '100%', height: 34, padding: '0 10px', border: '1px solid var(--border-default)', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', background: '#fff', ...props.style }} />;
}

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{
      width: 36, height: 20, borderRadius: 9999, padding: 2, border: 'none', cursor: 'pointer',
      background: on ? '#2563EB' : 'var(--slate-300)', display: 'flex', alignItems: 'center',
      justifyContent: on ? 'flex-end' : 'flex-start', transition: 'all 180ms',
    }}>
      <span style={{ width: 16, height: 16, borderRadius: 9999, background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></span>
    </button>
  );
}

function SettingsOrg() {
  return (
    <Card title="Organization">
      <FieldRow label="Tenant name" hint="Shown in the sidebar and on tenant-facing exports.">
        <Inp defaultValue="Acme Co." />
      </FieldRow>
      <FieldRow label="Tenant ID" hint="Read-only. Used for API + webhook payloads.">
        <Inp readOnly defaultValue="tenant_47291_acme" style={{ background: 'var(--slate-50)', color: 'var(--fg-secondary)' }} />
      </FieldRow>
      <FieldRow label="Time zone" hint="Used for SLAs, schedules, and cycle-count windows.">
        <Inp defaultValue="America/Chicago" />
      </FieldRow>
      <FieldRow label="Default unit of measure">
        <div style={{ display: 'inline-flex', border: '1px solid var(--border-default)', borderRadius: 6, overflow: 'hidden' }}>
          {['Each','Case','Pallet'].map((u, i) => (
            <button key={u} style={{ height: 32, padding: '0 14px', border: 'none', background: i === 0 ? 'var(--slate-100)' : '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: i === 0 ? 600 : 500, cursor: 'pointer', borderLeft: i ? '1px solid var(--border-subtle)' : 'none' }}>{u}</button>
          ))}
        </div>
      </FieldRow>
      <FieldRow label="Danger zone" hint="These actions affect the entire tenant.">
        <Button variant="destructive" size="sm" icon="trash-2">Delete tenant</Button>
      </FieldRow>
    </Card>
  );
}

function SettingsNotifications() {
  const [n, setN] = React.useState({ approvals: true, lowStock: true, agentRuns: false, digest: true, slack: true, email: true });
  const t = (k) => (v) => setN({ ...n, [k]: v });
  return (
    <Card title="Notifications">
      <FieldRow label="Approval requests" hint="When a user or agent needs your sign-off."><Toggle on={n.approvals} onChange={t('approvals')} /></FieldRow>
      <FieldRow label="Low stock"          hint="When any SKU drops below its reorder point."><Toggle on={n.lowStock}  onChange={t('lowStock')} /></FieldRow>
      <FieldRow label="Agent runs"         hint="Every action an agent takes. Noisy."><Toggle on={n.agentRuns} onChange={t('agentRuns')} /></FieldRow>
      <FieldRow label="Daily digest"       hint="One summary at 8:00 AM local time."><Toggle on={n.digest}    onChange={t('digest')} /></FieldRow>
      <FieldRow label="Channels" hint="Where to deliver notifications.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <Toggle on={n.email} onChange={t('email')} />
            <i data-lucide="mail" style={{ width: 14, height: 14, color: 'var(--fg-tertiary)' }}></i>
            Email · priya@acme.co
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <Toggle on={n.slack} onChange={t('slack')} />
            <i data-lucide="message-square" style={{ width: 14, height: 14, color: 'var(--fg-tertiary)' }}></i>
            Slack · <span style={{ fontFamily: 'Geist Mono', color: 'var(--fg-secondary)' }}>#ops-acme</span>
          </label>
        </div>
      </FieldRow>
    </Card>
  );
}

function SettingsAgentPolicy() {
  return (
    <>
      <Card accent="ai" title={<span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><i data-lucide="sparkles" style={{ width: 14, height: 14, color: '#7C3AED' }}></i>Agent policy</span>}>
        <FieldRow label="Auto-approve threshold" hint="Agents may execute actions without sign-off if confidence is at or above this.">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Inp defaultValue="95" style={{ width: 80 }} />
            <span style={{ fontSize: 13, color: 'var(--fg-secondary)' }}>% confidence</span>
          </div>
        </FieldRow>
        <FieldRow label="Max units per auto-action" hint="Caps the unit volume an agent can move without approval.">
          <Inp defaultValue="500" style={{ width: 120 }} />
        </FieldRow>
        <FieldRow label="Allowed action types" hint="Toggle the categories agents may perform on their own.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[['Replenish', true], ['Transfer', true], ['Cycle count', true], ['Adjust', false], ['Open PO', false], ['Cancel order', false]].map(([l, on]) => (
              <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', border: '1px solid var(--border-default)', borderRadius: 9999, fontSize: 12, fontWeight: 500, background: on ? '#EDE9FE' : '#fff', color: on ? '#5B21B6' : 'var(--fg-secondary)', borderColor: on ? '#C4B5FD' : 'var(--border-default)' }}>
                <i data-lucide={on ? 'check' : 'plus'} style={{ width: 11, height: 11 }}></i>
                {l}
              </span>
            ))}
          </div>
        </FieldRow>
        <FieldRow label="Escalation" hint="Who to notify when an agent action is declined or fails.">
          <Inp defaultValue="priya@acme.co, marcus@acme.co" />
        </FieldRow>
      </Card>
    </>
  );
}

function SettingsIntegrations() {
  const list = [
    { name: 'Shopify',          status: 'connected',    sub: 'Order sync · 2-way · 4m ago' },
    { name: 'NetSuite',         status: 'connected',    sub: 'GL postings · 1-way · 12m ago' },
    { name: 'ShipStation',      status: 'connected',    sub: 'Outbound labels · 38s ago' },
    { name: 'Slack',            status: 'connected',    sub: '#ops-acme · webhooks' },
    { name: 'QuickBooks',       status: 'disconnected', sub: 'Not configured' },
    { name: 'SAP S/4HANA',      status: 'available',    sub: 'Available on Enterprise' },
  ];
  return (
    <Card title="Integrations">
      <div style={{ margin: '-14px' }}>
        {list.map(it => (
          <div key={it.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Geist Mono', fontWeight: 700, fontSize: 13, color: 'var(--slate-600)' }}>{it.name.slice(0,2).toUpperCase()}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{it.sub}</div>
            </div>
            <StatusPill kind={it.status === 'connected' ? 'success' : it.status === 'disconnected' ? 'neutral' : 'info'}>{it.status}</StatusPill>
            <Button variant={it.status === 'connected' ? 'secondary' : 'primary'} size="sm">
              {it.status === 'connected' ? 'Manage' : it.status === 'disconnected' ? 'Connect' : 'Upgrade'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SettingsApi() {
  return (
    <>
      <Card title="API keys" actions={<Button variant="primary" size="sm" icon="plus">New key</Button>}>
        <div style={{ margin: '-14px' }}>
          {[
            { name: 'Production · server-to-server', last: 'today 4:12 PM', prefix: 'sk_live_4f2a' },
            { name: 'Staging',                       last: 'Apr 28',         prefix: 'sk_test_91xb' },
          ].map(k => (
            <div key={k.prefix} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 110px 80px', padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{k.name}</div>
                <div style={{ fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-tertiary)', marginTop: 2 }}>{k.prefix}…••••••••</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--fg-secondary)' }}>Last used {k.last}</div>
              <Button variant="secondary" size="sm" icon="copy">Copy</Button>
              <Button variant="ghost" size="sm">Revoke</Button>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Webhooks" actions={<Button variant="primary" size="sm" icon="plus">Add endpoint</Button>}>
        <div style={{ margin: '-14px' }}>
          {[
            { url: 'https://acme.co/hooks/stoqr', events: 'movement.*, approval.*', status: 'success' },
            { url: 'https://ops.acme.co/at',      events: 'agent.run.completed',     status: 'warning' },
          ].map(h => (
            <div key={h.url} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 110px 40px', padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center', gap: 10 }}>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{h.url}</div>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)' }}>{h.events}</div>
              <StatusPill kind={h.status}>{h.status === 'success' ? '200 OK' : '4 retries'}</StatusPill>
              <button style={{ width: 28, height: 28, border: '1px solid var(--border-subtle)', background: '#fff', borderRadius: 5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i data-lucide="more-horizontal" style={{ width: 14, height: 14 }}></i>
              </button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function SettingsBilling() {
  return (
    <>
      <Card title="Plan">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Current plan</div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Geist Mono', letterSpacing: '-0.02em', marginTop: 2 }}>Pro · $899/mo</div>
            <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 2 }}>Up to 10 seats, 4 warehouses, unlimited SKUs. Renews May 28, 2026.</div>
          </div>
          <Button variant="secondary" icon="arrow-up-right">Compare plans</Button>
          <Button variant="primary" icon="trending-up">Upgrade</Button>
        </div>
      </Card>
      <Card title="Usage this period" meta="May 1 – May 5">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { l: 'Seats',       v: 6,    max: 10,  unit: '' },
            { l: 'Warehouses',  v: 4,    max: 4,   unit: '' },
            { l: 'Agent runs',  v: 2335, max: 5000,unit: '' },
          ].map(u => {
            const pct = Math.min(100, (u.v / u.max) * 100);
            const over = pct > 90;
            return (
              <div key={u.l}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{u.l}</div>
                  <div style={{ marginLeft: 'auto', fontFamily: 'Geist Mono', fontSize: 12, fontWeight: 600 }}>{u.v.toLocaleString()} / {u.max.toLocaleString()}</div>
                </div>
                <div style={{ height: 6, background: 'var(--slate-100)', borderRadius: 9999, marginTop: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: over ? '#DC2626' : '#2563EB' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <Card title="Invoices" actions={<Button variant="ghost" size="sm">View all</Button>}>
        <div style={{ margin: '-14px' }}>
          {[
            { id: 'INV-2026-04', date: 'Apr 28, 2026', amt: '$899.00', status: 'success' },
            { id: 'INV-2026-03', date: 'Mar 28, 2026', amt: '$899.00', status: 'success' },
            { id: 'INV-2026-02', date: 'Feb 28, 2026', amt: '$899.00', status: 'success' },
          ].map(i => (
            <div key={i.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 110px 110px 80px', padding: '10px 14px', borderBottom: '1px solid var(--border-subtle)', alignItems: 'center', fontSize: 13 }}>
              <div style={{ fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-secondary)' }}>{i.id}</div>
              <div>{i.date}</div>
              <div style={{ fontFamily: 'Geist Mono', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{i.amt}</div>
              <div><StatusPill kind="success">Paid</StatusPill></div>
              <Button variant="ghost" size="sm" icon="download">PDF</Button>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

Object.assign(window, { MovementsPage, ApprovalsPage, AgentsPage, WarehousesPage, TeamPage, SettingsPage });
