// Stoqr Client — Inventory, Requests, Approvals, History pages
// Composed from operator's Button/Card/Stat/StatusPill primitives.

function ClientPageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 20 }}>
      <div>
        {eyebrow && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{eyebrow}</div>}
        <h1 style={{ margin: '4px 0 0', fontFamily: 'Geist Mono', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em' }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 13, color: 'var(--fg-secondary)', marginTop: 4 }}>{subtitle}</div>}
      </div>
      {actions && <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>{actions}</div>}
    </div>
  );
}

function ClientPageWrap({ children }) {
  return <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 28px 60px' }}>{children}</div>;
}

// ─── Inventory ─────────────────────────────────────────────────────────
function ClientInventoryPage() {
  const rows = [
    { sku: 'SKU-049281-NV', name: 'Acetic anhydride · 200L drum',  oh: 1240, tx: 240, rp: 800,  bin: 'A-04-12', status: 'ok' },
    { sku: 'SKU-051922-RT', name: 'Phenolic resin · 25kg bag',     oh: 92,   tx: 0,   rp: 150,  bin: 'C-08-03', status: 'low' },
    { sku: 'SKU-061104-XL', name: 'PET preform · 28mm neck',       oh: 18420,tx: 1200,rp: 12000,bin: 'B-02-18', status: 'ok' },
    { sku: 'SKU-073301-AC', name: 'Aluminum coil · 1050-H14',      oh: 0,    tx: 800, rp: 600,  bin: 'D-01-05', status: 'oos' },
    { sku: 'SKU-080012-PG', name: 'Propylene glycol · 1000L tote', oh: 612,  tx: 0,   rp: 400,  bin: 'A-09-02', status: 'ok' },
    { sku: 'SKU-091845-CB', name: 'Corrugated B-flute · 24"',      oh: 4810, tx: 0,   rp: 5000, bin: 'E-12-09', status: 'low' },
    { sku: 'SKU-102237-MS', name: 'Mil-spec fastener kit · M6',    oh: 230,  tx: 120, rp: 200,  bin: 'F-03-14', status: 'ok' },
  ];
  const tone = { ok: 'success', low: 'warning', oos: 'danger' };
  const lbl  = { ok: 'In stock', low: 'Below reorder', oos: 'Out of stock' };

  return (
    <ClientPageWrap>
      <ClientPageHeader
        eyebrow="Atlas-3 · Houston"
        title="Inventory"
        subtitle="Real-time view of every SKU you have at this warehouse."
        actions={<>
          <Button variant="ghost" icon="download">Export</Button>
          <Button variant="primary" icon="filter">Saved views</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 16 }}>
        <ClientStat label="On hand" value="48,210" unit="units" />
        <ClientStat label="In transit" value="3,402" unit="units" tone="info" />
        <ClientStat label="Below reorder" value="11" tone="warning" />
        <ClientStat label="Out of stock" value="2" tone="danger" />
      </div>

      <Card title="All SKUs" meta={<span style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{rows.length} of 1,847</span>} actions={
        <div style={{ display: 'flex', gap: 6 }}>
          <input placeholder="Search SKU or name…" style={{ height: 28, width: 220, padding: '0 10px', border: '1px solid var(--border-default)', borderRadius: 6, fontSize: 12, fontFamily: 'inherit' }} />
          <Button variant="ghost" size="sm" icon="sliders-horizontal">Filter</Button>
        </div>
      }>
        <div style={{ margin: '0 -16px -14px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
                {['SKU', 'Name', 'On hand', 'In transit', 'Reorder pt', 'Bin', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: h === 'Name' || h === 'Bin' ? 'left' : (h === 'SKU' ? 'left' : 'right'), padding: '8px 14px', fontSize: 11, fontWeight: 600, color: 'var(--fg-tertiary)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.sku} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-secondary)' }}>{r.sku}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>{r.name}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'Geist Mono', fontVariantNumeric: 'tabular-nums', color: r.status === 'oos' ? '#DC2626' : 'var(--fg-primary)' }}>{r.oh.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'Geist Mono', fontVariantNumeric: 'tabular-nums', color: r.tx ? '#0891B2' : 'var(--fg-tertiary)' }}>{r.tx ? r.tx.toLocaleString() : '—'}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'Geist Mono', fontVariantNumeric: 'tabular-nums', color: 'var(--fg-tertiary)' }}>{r.rp.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-secondary)' }}>{r.bin}</td>
                  <td style={{ padding: '10px 14px' }}><StatusPill kind={tone[r.status]}>{lbl[r.status]}</StatusPill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </ClientPageWrap>
  );
}

// ─── Requests ──────────────────────────────────────────────────────────
function ClientRequestsPage({ onNewRequest }) {
  const reqs = [
    { id: 'REQ-3019', kind: 'Transfer',  what: '240u SKU-049281-NV', from: 'W-02', to: 'W-04', when: 'Today · 9:14 AM',  status: 'pending', sub: 'Pending Atlas review' },
    { id: 'REQ-3018', kind: 'Reorder',   what: '5,000u SKU-091845-CB', from: 'Supplier ULINE-04', to: 'W-03', when: 'Today · 8:02 AM', status: 'approved', sub: 'PO-77295 · ETA Thu' },
    { id: 'REQ-3017', kind: 'Adjust',    what: '−22u bin C-08-03',  from: 'W-02', to: '—',    when: 'Yesterday · 5:48 PM', status: 'pending', sub: 'Variance from cycle count #2841' },
    { id: 'REQ-3015', kind: 'Transfer',  what: '120u SKU-102237-MS', from: 'W-04', to: 'W-02', when: 'Yesterday · 2:11 PM', status: 'rejected', sub: 'Marcus · insufficient projected demand' },
    { id: 'REQ-3014', kind: 'Reorder',   what: '800u SKU-073301-AC', from: 'Supplier ALCOA-12', to: 'W-04', when: '2d ago', status: 'approved', sub: 'PO-77291 · received' },
    { id: 'REQ-3011', kind: 'Disposal',  what: '12u SKU-051922-RT', from: 'W-02', to: '—',    when: '3d ago', status: 'approved', sub: 'Expired lot' },
  ];
  const tone = { pending: 'warning', approved: 'success', rejected: 'danger' };

  return (
    <ClientPageWrap>
      <ClientPageHeader
        eyebrow="My requests"
        title="Requests"
        subtitle="Stock movements, reorders, and adjustments you've submitted."
        actions={<Button variant="primary" icon="plus" onClick={onNewRequest}>New request</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 16 }}>
        <ClientStat label="Open" value="6" />
        <ClientStat label="Approved (30d)" value="48" tone="info" />
        <ClientStat label="Rejected (30d)" value="3" tone="danger" />
        <ClientStat label="Avg time to decision" value="11m" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        <Card title="All requests" actions={
          <div style={{ display: 'flex', gap: 4 }}>
            {['All', 'Pending', 'Approved', 'Rejected'].map((t, i) => (
              <button key={t} style={{ height: 26, padding: '0 10px', background: i === 0 ? 'var(--slate-100)' : 'transparent', border: 'none', borderRadius: 4, fontSize: 12, fontWeight: 600, fontFamily: 'inherit', color: i === 0 ? 'var(--fg-primary)' : 'var(--fg-secondary)', cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
        }>
          {reqs.map(r => (
            <div key={r.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 56, fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)', paddingTop: 2 }}>{r.id}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-secondary)', background: 'var(--slate-100)', padding: '2px 6px', borderRadius: 3 }}>{r.kind}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.what}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 4, fontFamily: 'Geist Mono' }}>{r.from} → {r.to} · {r.when}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-tertiary)', marginTop: 2 }}>{r.sub}</div>
              </div>
              <StatusPill kind={tone[r.status]}>{r.status}</StatusPill>
            </div>
          ))}
        </Card>

        <Card title="Suggested by Atlas" meta={<span style={{ fontSize: 11, color: '#7C3AED', fontWeight: 600, fontFamily: 'Geist Mono', letterSpacing: '0.04em', textTransform: 'uppercase' }}>AI</span>}>
          <SuggestionRow title="Reorder SKU-091845-CB" body="Projected stockout in 5 days at W-03. Suggested 5,000u." />
          <SuggestionRow title="Transfer 80u from W-04 → W-02" body="W-02 burning faster than expected." />
          <SuggestionRow title="Cycle-count bin F-03-14" body="No count in 60d. 3 high-velocity SKUs." />
        </Card>
      </div>
    </ClientPageWrap>
  );
}

function SuggestionRow({ title, body }) {
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 3, lineHeight: 1.45 }}>{body}</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        <button style={{ background: '#2563EB', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: 5, fontSize: 12, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Submit</button>
        <button style={{ background: 'transparent', border: 'none', padding: '4px 8px', fontSize: 12, fontWeight: 600, color: 'var(--fg-secondary)', fontFamily: 'inherit', cursor: 'pointer' }}>Dismiss</button>
      </div>
    </div>
  );
}

// ─── Approvals ─────────────────────────────────────────────────────────
function ClientApprovalsPage() {
  const queue = [
    { id: 'APR-991', kind: 'Transfer',  what: '240u SKU-049281-NV · W-02 → W-04', who: 'Atlas',  why: 'Demand at W-04 +18% over 30d', age: '4m', selected: true },
    { id: 'APR-990', kind: 'Reorder',   what: '5,000u SKU-091845-CB · ULINE-04 → W-03', who: 'Atlas', why: 'Projected stockout in 5d', age: '12m' },
    { id: 'APR-989', kind: 'Adjust',    what: '−22u SKU-051922-RT · bin C-08-03', who: 'Marcus L.', why: 'Cycle count #2841 variance', age: '1h' },
    { id: 'APR-988', kind: 'Disposal',  what: '12u SKU-051922-RT · expired',     who: 'Atlas',  why: 'Lot RT-1029 past use-by', age: '3h' },
  ];

  return (
    <ClientPageWrap>
      <ClientPageHeader
        eyebrow="Action queue"
        title="Approvals"
        subtitle="Decisions only you can make. Atlas does the rest."
        actions={<>
          <Button variant="ghost" icon="check-check">Bulk approve</Button>
          <Button variant="primary" icon="settings-2">Approval rules</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 12, marginBottom: 16 }}>
        <ClientStat label="Waiting on you" value="4" tone="danger" />
        <ClientStat label="Auto-approved today" value="118" tone="info" />
        <ClientStat label="Saved by rules (30d)" value="2,402" />
        <ClientStat label="Avg decision time" value="11m" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 16 }}>
        <Card title="Queue" meta={<span style={{ fontSize: 11, color: '#DC2626', fontWeight: 600 }}>4</span>}>
          {queue.map(q => (
            <div key={q.id} style={{ padding: '12px 12px', margin: '0 -12px', borderLeft: q.selected ? '2px solid #2563EB' : '2px solid transparent', background: q.selected ? 'var(--slate-50)' : 'transparent', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-secondary)', background: '#fff', border: '1px solid var(--border-subtle)', padding: '2px 6px', borderRadius: 3 }}>{q.kind}</span>
                <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)' }}>{q.id}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--fg-tertiary)', fontFamily: 'Geist Mono' }}>{q.age}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, marginTop: 6 }}>{q.what}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 3 }}>by {q.who} — {q.why}</div>
            </div>
          ))}
        </Card>

        <Card
          title="APR-991 · Transfer"
          meta={<StatusPill kind="warning">Pending your approval</StatusPill>}
          actions={<>
            <Button variant="ghost" size="sm" icon="x">Reject</Button>
            <Button variant="primary" size="sm" icon="check">Approve</Button>
          </>}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '4px 0 12px' }}>
            <DetailField label="SKU" value="SKU-049281-NV" mono />
            <DetailField label="Quantity" value="240 units" />
            <DetailField label="From" value="W-02 · Houston North" />
            <DetailField label="To" value="W-04 · Dallas East" />
            <DetailField label="Submitted" value="Today · 9:14 AM" />
            <DetailField label="Submitted by" value="Atlas (auto-suggestion)" />
          </div>

          <div style={{ background: '#FAF5FF', border: '1px solid #C4B5FD', borderRadius: 6, padding: 12, display: 'flex', gap: 10, marginBottom: 12 }}>
            <i data-lucide="sparkles" style={{ width: 14, height: 14, color: '#7C3AED', flexShrink: 0, marginTop: 2 }}></i>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#5B21B6' }}>Atlas's reasoning</div>
              <div style={{ fontSize: 12, color: '#5B21B6', lineHeight: 1.5, marginTop: 4 }}>
                W-04's 30-day burn rate for SKU-049281-NV grew 18% (1,820 → 2,148 u/wk). At current pace W-04 stocks out in 9 days; W-02 has 18 days of cover. Transfer cost $182, projected stockout cost $2,400.
              </div>
            </div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', marginBottom: 8 }}>Activity</div>
          <ActivityLite who="Atlas" what="Drafted suggestion" t="9:14 AM" />
          <ActivityLite who="System" what="Routed to your queue (above $200 threshold)" t="9:14 AM" />
          <ActivityLite who="Marcus L." what="Added note: 'Looks correct. Defer to Jordan.'" t="9:31 AM" />
        </Card>
      </div>
    </ClientPageWrap>
  );
}

function DetailField({ label, value, mono }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{label}</div>
      <div style={{ fontSize: 13, marginTop: 4, fontFamily: mono ? 'Geist Mono' : 'inherit', fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function ActivityLite({ who, what, t }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '6px 0', fontSize: 12, color: 'var(--fg-secondary)' }}>
      <div style={{ width: 70, fontFamily: 'Geist Mono', color: 'var(--fg-tertiary)' }}>{t}</div>
      <div><strong style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>{who}</strong> · {what}</div>
    </div>
  );
}

// ─── History ───────────────────────────────────────────────────────────
function ClientHistoryPage() {
  const events = [
    { d: 'Today',      items: [
      { t: '11:42 AM', icon: 'package-plus', tone: 'info',    who: 'Atlas',     what: 'Received 1,200u SKU-049281-NV', sub: 'PO-77295 · supplier ACME-09 · dock 3' },
      { t: '10:18 AM', icon: 'arrow-right',  tone: 'info',    who: 'Atlas',     what: 'Transferred 80u SKU-080012-PG', sub: 'W-02 → W-03 (auto, under $200)' },
      { t: '9:31 AM',  icon: 'message-circle', tone: 'info',  who: 'Marcus L.', what: 'Commented on APR-991', sub: '"Looks correct. Defer to Jordan."' },
      { t: '9:14 AM',  icon: 'sparkles',     tone: 'ai',      who: 'Atlas',     what: 'Drafted transfer suggestion',   sub: 'APR-991 · 240u W-02 → W-04' },
    ]},
    { d: 'Yesterday',  items: [
      { t: '5:48 PM',  icon: 'alert-triangle',tone: 'warning',who: 'Atlas',     what: 'Flagged variance bin C-08-03', sub: 'System −22u during cycle count #2841' },
      { t: '3:48 PM',  icon: 'clipboard-check',tone:'success',who: 'Marcus L.', what: 'Completed cycle count #2843',  sub: '128 bins · 0.4% variance' },
      { t: '2:11 PM',  icon: 'x-circle',     tone: 'danger',  who: 'Marcus L.', what: 'Rejected REQ-3015',            sub: 'Insufficient projected demand at W-02' },
      { t: '11:02 AM', icon: 'check-circle-2',tone: 'success',who: 'You',       what: 'Approved transfer 240u',       sub: 'W-02 → W-04 (suggested by Atlas)' },
    ]},
    { d: '2 days ago', items: [
      { t: '4:30 PM',  icon: 'package-minus',tone: 'info',    who: 'Marcus L.', what: 'Posted shipment 84u',          sub: 'Order #SO-99412' },
      { t: '9:00 AM',  icon: 'settings-2',   tone: 'info',    who: 'You',       what: 'Updated approval rule',        sub: 'Auto-approve transfers under $250 (was $200)' },
    ]},
  ];
  const bgMap = { info: '#CFFAFE', success: '#DCFCE7', warning: '#FEF3C7', danger: '#FEE2E2', ai: '#EDE9FE' };
  const fgMap = { info: '#0891B2', success: '#16A34A', warning: '#D97706', danger: '#DC2626', ai: '#7C3AED' };

  return (
    <ClientPageWrap>
      <ClientPageHeader
        eyebrow="Audit log"
        title="History"
        subtitle="Everything that's happened at Atlas-3, by you, your team, and Atlas."
        actions={<>
          <Button variant="ghost" icon="filter">Filter</Button>
          <Button variant="ghost" icon="download">Export CSV</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'flex-start' }}>
        <Card title="Activity">
          {events.map(group => (
            <div key={group.d} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)', marginBottom: 6 }}>{group.d}</div>
              {group.items.map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ width: 60, fontSize: 11, fontFamily: 'Geist Mono', color: 'var(--fg-tertiary)', paddingTop: 6 }}>{e.t}</div>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: bgMap[e.tone], color: fgMap[e.tone], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <i data-lucide={e.icon} style={{ width: 14, height: 14 }}></i>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13 }}><strong style={{ fontWeight: 600 }}>{e.who}</strong> · {e.what}</div>
                    <div style={{ fontSize: 12, color: 'var(--fg-secondary)', marginTop: 2 }}>{e.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card title="Filter by actor">
            {[
              { k: 'Atlas',    n: 1284, c: '#7C3AED' },
              { k: 'You',      n: 47,   c: '#2563EB' },
              { k: 'Marcus L.',n: 38,   c: '#16A34A' },
              { k: 'Sara K.',  n: 12,   c: '#D97706' },
              { k: 'System',   n: 318,  c: 'var(--fg-tertiary)' },
            ].map(a => (
              <label key={a.k} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 13, cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: '#2563EB' }} />
                <span style={{ width: 8, height: 8, borderRadius: 9999, background: a.c }}></span>
                <span style={{ flex: 1 }}>{a.k}</span>
                <span style={{ fontFamily: 'Geist Mono', fontSize: 11, color: 'var(--fg-tertiary)' }}>{a.n}</span>
              </label>
            ))}
          </Card>
          <Card title="Range">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Today', 'Last 7 days', 'Last 30 days', 'Quarter to date', 'Custom…'].map((r, i) => (
                <button key={r} style={{ textAlign: 'left', height: 30, padding: '0 10px', background: i === 1 ? 'var(--slate-100)' : 'transparent', border: 'none', borderRadius: 4, fontSize: 13, fontWeight: i === 1 ? 600 : 500, fontFamily: 'inherit', color: 'var(--fg-primary)', cursor: 'pointer' }}>{r}</button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ClientPageWrap>
  );
}

Object.assign(window, { ClientInventoryPage, ClientRequestsPage, ClientApprovalsPage, ClientHistoryPage });
