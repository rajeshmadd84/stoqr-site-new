// Stoqr Client — shared shell (topbar + page chrome) for tenant-facing app
const { useState: useStateClient } = React;

function ClientTopbar({ active, onNav }) {
  const items = [
    { k: 'home', label: 'Overview' },
    { k: 'inventory', label: 'Inventory' },
    { k: 'requests', label: 'Requests' },
    { k: 'approvals', label: 'Approvals', count: 4 },
    { k: 'history', label: 'History' },
  ];
  return (
    <header style={{ height: 64, background: '#fff', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', padding: '0 28px', gap: 28, position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <img src="../../assets/stoqr-mark.svg" style={{ height: 22 }} alt="" />
        <span style={{ fontFamily: 'Geist Mono', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' }}>stoqr</span>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--slate-100)', color: 'var(--slate-700)', padding: '2px 6px', borderRadius: 4, marginLeft: 4 }}>Client</span>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {items.map(it => (
          <button key={it.k} onClick={() => onNav(it.k)} style={{ height: 32, padding: '0 12px', background: active === it.k ? 'var(--slate-100)' : 'transparent', color: active === it.k ? 'var(--fg-primary)' : 'var(--fg-secondary)', border: 'none', borderRadius: 6, fontSize: 13, fontWeight: active === it.k ? 600 : 500, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            {it.label}
            {it.count != null && <span style={{ fontSize: 10, fontWeight: 700, background: '#DC2626', color: '#fff', padding: '1px 6px', borderRadius: 9999 }}>{it.count}</span>}
          </button>
        ))}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ height: 32, padding: '0 10px', background: '#fff', border: '1px solid var(--border-default)', borderRadius: 6, fontSize: 12, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <i data-lucide="warehouse" style={{ width: 13, height: 13, color: 'var(--fg-tertiary)' }}></i>
          Atlas-3 · Houston
          <i data-lucide="chevron-down" style={{ width: 12, height: 12, color: 'var(--fg-tertiary)' }}></i>
        </button>
        <button style={{ width: 32, height: 32, border: '1px solid var(--border-subtle)', background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <i data-lucide="bell" style={{ width: 15, height: 15 }}></i>
        </button>
        <div style={{ width: 30, height: 30, borderRadius: 9999, background: '#0F172A', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>JR</div>
      </div>
    </header>
  );
}

Object.assign(window, { ClientTopbar });
