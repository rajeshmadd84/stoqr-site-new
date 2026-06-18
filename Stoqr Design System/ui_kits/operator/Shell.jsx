// Stoqr Operator — shared UI primitives
// Loaded as <script type="text/babel">. Exposes components on window.

const { useState } = React;

// ============================================================
// Sidebar
// ============================================================
function Sidebar({ active, onNav }) {
  const items = [
    { k: 'overview', icon: 'layout-dashboard', label: 'Overview' },
    { k: 'inventory', icon: 'package', label: 'Inventory', count: 4821 },
    { k: 'movements', icon: 'arrow-down-up', label: 'Movements' },
    { k: 'cycle-counts', icon: 'clipboard-check', label: 'Cycle counts', count: 3 },
    { k: 'approvals', icon: 'check-circle-2', label: 'Approvals', count: 7, urgent: true },
    { k: 'workflows', icon: 'workflow', label: 'Workflows' },
    { k: 'agents', icon: 'sparkles', label: 'Agents', ai: true },
  ];
  const settings = [
    { k: 'warehouses', icon: 'warehouse', label: 'Warehouses' },
    { k: 'team', icon: 'users', label: 'Team' },
    { k: 'settings', icon: 'settings', label: 'Settings' },
  ];
  return (
    <aside style={s.sidebar}>
      <div style={s.brand}>
        <img src="../../assets/stoqr-mark.svg" style={{ height: 22 }} alt="" />
        <span style={s.brandText}>stoqr</span>
        <span style={s.tenantBadge}>Acme Co.</span>
      </div>

      <div style={s.navGroup}>
        {items.map(it => <NavItem key={it.k} item={it} active={active === it.k} onClick={() => onNav(it.k)} />)}
      </div>

      <div style={s.navLabel}>Configure</div>
      <div style={s.navGroup}>
        {settings.map(it => <NavItem key={it.k} item={it} active={active === it.k} onClick={() => onNav(it.k)} />)}
      </div>

      <div style={s.userCard}>
        <div style={s.avatar}>PK</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Priya Kapoor</div>
          <div style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>Ops manager · W-02</div>
        </div>
        <i data-lucide="chevron-up" style={{ width: 14, height: 14, color: 'var(--fg-tertiary)' }}></i>
      </div>
    </aside>
  );
}

function NavItem({ item, active, onClick }) {
  return (
    <button onClick={onClick} style={{ ...s.navItem, ...(active ? s.navItemActive : {}) }}>
      <i data-lucide={item.icon} style={{ width: 16, height: 16, strokeWidth: 1.75, color: item.ai ? '#7C3AED' : 'currentColor' }}></i>
      <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
      {item.count != null && (
        <span style={item.urgent ? s.countUrgent : s.count}>{item.count.toLocaleString()}</span>
      )}
    </button>
  );
}

// ============================================================
// Topbar
// ============================================================
function Topbar({ title, breadcrumbs = [], onAgentToggle }) {
  return (
    <header style={s.topbar}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
        {breadcrumbs.map((b, i) => (
          <React.Fragment key={i}>
            <span style={{ color: 'var(--fg-tertiary)', fontSize: 13 }}>{b}</span>
            <i data-lucide="chevron-right" style={{ width: 12, height: 12, color: 'var(--fg-muted)' }}></i>
          </React.Fragment>
        ))}
        <span style={{ fontSize: 14, fontWeight: 600 }}>{title}</span>
      </div>
      <div style={{ position: 'relative', width: 320 }}>
        <i data-lucide="search" style={{ width: 14, height: 14, position: 'absolute', left: 10, top: 9, color: 'var(--fg-tertiary)' }}></i>
        <input placeholder="Search SKUs, bins, runs…" style={s.searchInput} />
        <span style={s.kbd}>⌘K</span>
      </div>
      <button style={s.iconBtn}><i data-lucide="bell" style={{ width: 16, height: 16 }}></i></button>
      <button onClick={onAgentToggle} style={s.agentBtn}>
        <i data-lucide="sparkles" style={{ width: 14, height: 14 }}></i>
        Atlas
      </button>
    </header>
  );
}

// ============================================================
// Status pill
// ============================================================
function StatusPill({ kind = 'success', children, dot = true }) {
  const map = {
    success: { bg: '#DCFCE7', bd: '#86EFAC', fg: '#166534', dot: '#16A34A' },
    warning: { bg: '#FEF3C7', bd: '#FCD34D', fg: '#854D0E', dot: '#D97706' },
    danger:  { bg: '#FEE2E2', bd: '#FCA5A5', fg: '#991B1B', dot: '#DC2626' },
    info:    { bg: '#CFFAFE', bd: '#67E8F9', fg: '#155E75', dot: '#0891B2' },
    ai:      { bg: '#EDE9FE', bd: '#C4B5FD', fg: '#5B21B6', dot: '#7C3AED' },
    neutral: { bg: '#EEF2F7', bd: '#E2E8F0', fg: '#334155', dot: '#64748B' },
  };
  const c = map[kind];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: c.bg, border: `1px solid ${c.bd}`, color: c.fg, padding: '2px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {dot && <span style={{ width: 6, height: 6, background: c.dot, borderRadius: 9999 }}></span>}
      {children}
    </span>
  );
}

// ============================================================
// Button
// ============================================================
function Button({ variant = 'primary', size = 'md', icon, children, ...rest }) {
  const sizes = {
    sm: { h: 28, px: 10, fs: 12 },
    md: { h: 34, px: 12, fs: 13 },
    lg: { h: 40, px: 16, fs: 14 },
  };
  const sz = sizes[size];
  const variants = {
    primary:    { bg: '#2563EB', fg: '#fff', bd: 'transparent', shadow: 'inset 0 1px 0 rgba(255,255,255,0.18)' },
    secondary:  { bg: '#fff',    fg: 'var(--fg-primary)', bd: 'var(--border-default)', shadow: 'none' },
    ghost:      { bg: 'transparent', fg: 'var(--fg-primary)', bd: 'transparent', shadow: 'none' },
    destructive:{ bg: '#DC2626', fg: '#fff', bd: 'transparent', shadow: 'inset 0 1px 0 rgba(255,255,255,0.18)' },
    agent:      { bg: '#7C3AED', fg: '#fff', bd: 'transparent', shadow: 'inset 0 1px 0 rgba(255,255,255,0.18)' },
  };
  const v = variants[variant];
  return (
    <button {...rest} style={{ height: sz.h, padding: `0 ${sz.px}px`, fontSize: sz.fs, fontWeight: 600, fontFamily: 'inherit', background: v.bg, color: v.fg, border: `1px solid ${v.bd}`, borderRadius: 6, boxShadow: v.shadow, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer', ...rest.style }}>
      {icon && <i data-lucide={icon} style={{ width: sz.fs, height: sz.fs }}></i>}
      {children}
    </button>
  );
}

// ============================================================
// Card
// ============================================================
function Card({ title, meta, actions, children, accent }) {
  return (
    <div style={{ background: '#fff', border: `1px solid ${accent === 'ai' ? '#C4B5FD' : 'var(--border-subtle)'}`, borderRadius: 6, boxShadow: '0 1px 0 rgba(15,23,42,0.04)', overflow: 'hidden' }}>
      {(title || meta) && (
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: 'var(--fg-tertiary)' }}>{meta}{actions}</div>
        </div>
      )}
      <div style={{ padding: 14 }}>{children}</div>
    </div>
  );
}

// ============================================================
// Stat tile
// ============================================================
function Stat({ label, value, unit, delta, deltaKind = 'up' }) {
  const deltaColor = deltaKind === 'up' ? '#16A34A' : deltaKind === 'down' ? '#DC2626' : 'var(--fg-tertiary)';
  return (
    <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: 14 }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{label}</div>
      <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 600, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ marginTop: 4, fontSize: 12, color: deltaColor, fontVariantNumeric: 'tabular-nums', display: 'flex', alignItems: 'center', gap: 4 }}>
          <i data-lucide={deltaKind === 'up' ? 'trending-up' : 'trending-down'} style={{ width: 12, height: 12 }}></i>
          {delta} <span style={{ color: 'var(--fg-tertiary)' }}>vs last week</span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Styles
// ============================================================
const s = {
  sidebar: {
    width: 248, height: '100vh', background: '#fff', borderRight: '1px solid var(--border-subtle)',
    display: 'flex', flexDirection: 'column', padding: '14px 10px 10px', position: 'sticky', top: 0, gap: 4, flexShrink: 0,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 7, padding: '6px 8px 14px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 10 },
  brandText: { fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em' },
  tenantBadge: { marginLeft: 'auto', fontSize: 9, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', background: 'var(--slate-100)', color: 'var(--slate-700)', padding: '2px 5px', borderRadius: 4, whiteSpace: 'nowrap' },
  navGroup: { display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 14 },
  navLabel: { fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', padding: '0 8px 6px' },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 9, padding: '7px 8px', border: 'none', background: 'transparent',
    color: 'var(--fg-secondary)', borderRadius: 5, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
  },
  navItemActive: { background: 'var(--slate-100)', color: 'var(--fg-primary)', fontWeight: 600 },
  count: { fontSize: 11, fontWeight: 600, color: 'var(--fg-tertiary)', fontVariantNumeric: 'tabular-nums' },
  countUrgent: { fontSize: 10, fontWeight: 700, color: '#fff', background: '#DC2626', padding: '1px 6px', borderRadius: 9999 },
  userCard: {
    marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: 8,
    border: '1px solid var(--border-subtle)', borderRadius: 6, background: 'var(--slate-50)',
  },
  avatar: { width: 28, height: 28, borderRadius: 6, background: '#2563EB', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  topbar: {
    height: 56, borderBottom: '1px solid var(--border-subtle)', background: '#fff',
    display: 'flex', alignItems: 'center', gap: 12, padding: '0 20px', position: 'sticky', top: 0, zIndex: 10,
  },
  searchInput: {
    width: '100%', height: 32, padding: '0 50px 0 30px',
    border: '1px solid var(--border-subtle)', borderRadius: 6, background: 'var(--slate-50)',
    fontSize: 13, fontFamily: 'inherit', outline: 'none',
  },
  kbd: {
    position: 'absolute', right: 8, top: 7, fontSize: 10, fontFamily: 'Geist Mono, monospace',
    color: 'var(--fg-tertiary)', background: '#fff', border: '1px solid var(--border-subtle)', padding: '1px 5px', borderRadius: 4,
  },
  iconBtn: { width: 32, height: 32, border: '1px solid var(--border-subtle)', background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  agentBtn: {
    height: 32, padding: '0 12px', border: 'none', borderRadius: 6,
    background: 'linear-gradient(180deg,#7C3AED,#6D28D9)', color: '#fff',
    fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)',
  },
};

Object.assign(window, { Sidebar, Topbar, StatusPill, Button, Card, Stat });
