// Stoqr — User Flows · shared storyboard kit
// Loaded as <script type="text/babel">. Exposes components on window.
// Visual language: Geist Mono, cool slate, brand blue, semantic status colors.

// ============================================================
// Status color map (matches operator/client UI kit)
// ============================================================
const STATUS = {
  success: { bg: '#DCFCE7', bd: '#86EFAC', fg: '#166534', dot: '#16A34A' },
  warning: { bg: '#FEF3C7', bd: '#FCD34D', fg: '#854D0E', dot: '#D97706' },
  danger:  { bg: '#FEE2E2', bd: '#FCA5A5', fg: '#991B1B', dot: '#DC2626' },
  info:    { bg: '#CFFAFE', bd: '#67E8F9', fg: '#155E75', dot: '#0891B2' },
  brand:   { bg: '#DBEAFE', bd: '#93C5FD', fg: '#1E40AF', dot: '#2563EB' },
  neutral: { bg: '#EEF2F7', bd: '#E2E8F0', fg: '#334155', dot: '#64748B' },
  muted:   { bg: '#F5F7FB', bd: '#E2E8F0', fg: '#64748B', dot: '#94A3B8' },
};

// ============================================================
// Status pill
// ============================================================
function Pill({ kind = 'neutral', children, dot = true, mono = false }) {
  const c = STATUS[kind] || STATUS.neutral;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: c.bg, border: `1px solid ${c.bd}`, color: c.fg, padding: '2px 7px', borderRadius: 9999, fontSize: 10, fontWeight: 600, letterSpacing: mono ? '0.01em' : '0.05em', textTransform: mono ? 'none' : 'uppercase', whiteSpace: 'nowrap', fontFamily: mono ? 'Geist Mono, monospace' : 'inherit', lineHeight: 1.4 }}>
      {dot && <span style={{ width: 5, height: 5, background: c.dot, borderRadius: 9999, flexShrink: 0 }}></span>}
      {children}
    </span>
  );
}

// State transition: prev → next, with an optional field label
function Transition({ steps, label }) {
  // steps: [{ k:'kind', t:'text' }, ...]
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      {label && <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: 'var(--fg-muted)', marginRight: 1 }}>{label}</span>}
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          {i > 0 && <i data-lucide="arrow-right" style={{ width: 12, height: 12, color: 'var(--fg-muted)', flexShrink: 0 }}></i>}
          <Pill kind={s.k} mono dot={s.dot !== false}>{s.t}</Pill>
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================================
// Actor chip
// ============================================================
const ACTORS = {
  admin:    { label: 'Tenant admin', c: '#2563EB', icon: 'shield' },
  operator: { label: 'Operator',     c: '#0891B2', icon: 'hard-hat' },
  supervisor:{ label: 'Supervisor',  c: '#7C3AED', icon: 'user-check' },
  client:   { label: 'Client user',  c: '#0F172A', icon: 'building-2' },
  system:   { label: 'System',       c: '#64748B', icon: 'cpu' },
};
function ActorChip({ who, size = 'md' }) {
  const a = ACTORS[who] || ACTORS.system;
  const sm = size === 'sm';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: sm ? '2px 7px' : '3px 9px', borderRadius: 9999, background: '#fff', border: `1px solid ${a.c}33`, color: a.c, fontSize: sm ? 10 : 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
      <i data-lucide={a.icon} style={{ width: sm ? 11 : 12, height: sm ? 11 : 12, strokeWidth: 2 }}></i>
      {a.label}
    </span>
  );
}

// ============================================================
// Screen frame — a mini app window
// ============================================================
function Screen({ app = 'operator', title, crumb, w, children, pad = true }) {
  const isClient = app === 'client';
  const dotColor = isClient ? '#0F172A' : '#2563EB';
  const appLabel = isClient ? 'Client portal' : 'Operator';
  return (
    <div style={{ width: w || '100%', maxWidth: '100%', background: '#fff', border: '1px solid var(--border-default)', borderRadius: 8, boxShadow: '0 1px 2px rgba(15,23,42,0.06), 0 4px 12px -6px rgba(15,23,42,0.10)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 34, background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 11px', flexShrink: 0 }}>
        <span style={{ display: 'flex', gap: 4 }}>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#E2E8F0' }}></span>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#E2E8F0' }}></span>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: '#E2E8F0' }}></span>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginLeft: 4 }}>
          <span style={{ width: 7, height: 7, borderRadius: 2, background: dotColor }}></span>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{appLabel}</span>
        </span>
        {(crumb || title) && <i data-lucide="chevron-right" style={{ width: 11, height: 11, color: 'var(--fg-muted)' }}></i>}
        {crumb && <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>{crumb}</span>}
        {crumb && title && <i data-lucide="chevron-right" style={{ width: 11, height: 11, color: 'var(--fg-muted)' }}></i>}
        {title && <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--fg-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</span>}
      </div>
      <div style={{ padding: pad ? 12 : 0, flex: 1, minWidth: 0 }}>{children}</div>
    </div>
  );
}

// ============================================================
// Button (display only)
// ============================================================
function Btn({ variant = 'primary', icon, children, full = false, size = 'md' }) {
  const v = {
    primary:   { bg: '#2563EB', fg: '#fff', bd: 'transparent' },
    secondary: { bg: '#fff', fg: 'var(--fg-primary)', bd: 'var(--border-default)' },
    ghost:     { bg: 'transparent', fg: 'var(--fg-secondary)', bd: 'transparent' },
    danger:    { bg: '#DC2626', fg: '#fff', bd: 'transparent' },
    success:   { bg: '#16A34A', fg: '#fff', bd: 'transparent' },
  }[variant];
  const h = size === 'sm' ? 26 : 30;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: h, padding: '0 12px', background: v.bg, color: v.fg, border: `1px solid ${v.bd}`, borderRadius: 6, fontSize: 12, fontWeight: 600, width: full ? '100%' : 'auto', boxShadow: (variant === 'primary' || variant === 'danger' || variant === 'success') ? 'inset 0 1px 0 rgba(255,255,255,0.18)' : 'none' }}>
      {icon && <i data-lucide={icon} style={{ width: 13, height: 13 }}></i>}
      {children}
    </span>
  );
}

// ============================================================
// Form field (display)
// ============================================================
function Field({ label, value, ph, mono, icon, w }) {
  return (
    <div style={{ width: w || '100%' }}>
      {label && <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--fg-secondary)', marginBottom: 4, letterSpacing: '0.01em' }}>{label}</div>}
      <div style={{ height: 30, border: '1px solid var(--border-default)', borderRadius: 6, background: value ? '#fff' : 'var(--slate-25)', display: 'flex', alignItems: 'center', gap: 7, padding: '0 9px', fontSize: 12, color: value ? 'var(--fg-primary)' : 'var(--fg-muted)', fontFamily: mono ? 'Geist Mono, monospace' : 'inherit', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {icon && <i data-lucide={icon} style={{ width: 12, height: 12, color: 'var(--fg-tertiary)', flexShrink: 0 }}></i>}
        {value || ph}
      </div>
    </div>
  );
}

// Key/value display row
function KV({ k, v, mono, kind }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '5px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ fontSize: 11.5, color: 'var(--fg-tertiary)' }}>{k}</span>
      {kind ? <Pill kind={kind} mono>{v}</Pill> : <span style={{ fontSize: 12, fontWeight: 600, fontFamily: mono ? 'Geist Mono, monospace' : 'inherit', color: 'var(--fg-primary)' }}>{v}</span>}
    </div>
  );
}

// ============================================================
// Upload zone
// ============================================================
function Upload({ name, hint, state = 'idle', pct }) {
  if (state === 'progress') {
    return (
      <div style={{ border: '1px solid var(--border-default)', borderRadius: 8, padding: 12, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 6, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i data-lucide="file-spreadsheet" style={{ width: 15, height: 15, color: '#2563EB' }}></i>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Geist Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-tertiary)' }}>{hint}</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, fontFamily: 'Geist Mono, monospace', color: '#2563EB' }}>{pct}%</span>
        </div>
        <div style={{ height: 4, borderRadius: 9999, background: 'var(--slate-100)', marginTop: 9, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: '#2563EB', borderRadius: 9999 }}></div>
        </div>
      </div>
    );
  }
  if (state === 'done') {
    return (
      <div style={{ border: '1px solid var(--success-border)', borderRadius: 8, padding: 12, background: 'var(--success-bg)', display: 'flex', alignItems: 'center', gap: 9 }}>
        <i data-lucide="check-circle-2" style={{ width: 16, height: 16, color: '#16A34A', flexShrink: 0 }}></i>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, fontFamily: 'Geist Mono, monospace', color: '#166534', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ fontSize: 10.5, color: '#166534' }}>{hint}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ border: '1.5px dashed var(--border-default)', borderRadius: 8, padding: '20px 12px', background: 'var(--slate-25)', textAlign: 'center' }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: '#fff', border: '1px solid var(--border-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
        <i data-lucide="upload-cloud" style={{ width: 17, height: 17, color: 'var(--fg-tertiary)' }}></i>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600 }}>{name || 'Drop file or browse'}</div>
      <div style={{ fontSize: 10.5, color: 'var(--fg-tertiary)', marginTop: 2 }}>{hint || 'Excel (.xlsx) or CSV — max 20 MB'}</div>
    </div>
  );
}

// ============================================================
// Mini table
// ============================================================
function MiniTable({ cols, rows, dense }) {
  // cols: [{ t, w, align, mono }]
  // rows: [[cell, ...]] — cell can be string or {pill:'kind',t} or {mono:true,t}
  const grid = cols.map(c => c.w || '1fr').join(' ');
  const pad = dense ? '5px 9px' : '7px 9px';
  return (
    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 6, overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 8, padding: '6px 9px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
        {cols.map((c, i) => (
          <div key={i} style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', textAlign: c.align || 'left' }}>{c.t}</div>
        ))}
      </div>
      {rows.map((r, ri) => (
        <div key={ri} style={{ display: 'grid', gridTemplateColumns: grid, gap: 8, padding: pad, borderBottom: ri < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'center', background: r.__sel ? 'var(--slate-50)' : '#fff', borderLeft: r.__sel ? '2px solid #2563EB' : '2px solid transparent' }}>
          {(r.cells || r).map((cell, ci) => {
            const c = cols[ci] || {};
            if (cell && cell.pill) return <div key={ci} style={{ textAlign: c.align || 'left' }}><Pill kind={cell.pill}>{cell.t}</Pill></div>;
            const txt = cell && cell.t != null ? cell.t : cell;
            const mono = (cell && cell.mono) || c.mono;
            return <div key={ci} style={{ fontSize: 11.5, textAlign: c.align || 'left', fontFamily: mono ? 'Geist Mono, monospace' : 'inherit', fontWeight: (cell && cell.b) ? 600 : 400, color: (cell && cell.c) || 'var(--fg-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{txt}</div>;
          })}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Step rail — vertical list of job tasks / flow steps with status
// ============================================================
function StepRail({ items, compact }) {
  // items: [{ label, status:'done'|'active'|'pending'|'rejected'|'system', sub, tag }]
  const cfg = {
    done:    { c: '#16A34A', icon: 'check', ring: '#86EFAC' },
    active:  { c: '#2563EB', icon: 'loader', ring: '#93C5FD' },
    pending: { c: '#94A3B8', icon: 'circle', ring: '#E2E8F0' },
    rejected:{ c: '#DC2626', icon: 'x', ring: '#FCA5A5' },
    system:  { c: '#64748B', icon: 'cpu', ring: '#CBD5E1' },
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((it, i) => {
        const c = cfg[it.status] || cfg.pending;
        const last = i === items.length - 1;
        return (
          <div key={i} style={{ display: 'flex', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20 }}>
              <span style={{ width: 18, height: 18, borderRadius: 9999, background: it.status === 'pending' ? '#fff' : c.c, border: `1.5px solid ${it.status === 'pending' ? '#CBD5E1' : c.c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: it.status === 'active' ? `0 0 0 3px ${c.ring}66` : 'none' }}>
                <i data-lucide={c.icon} style={{ width: 10, height: 10, color: it.status === 'pending' ? '#94A3B8' : '#fff', strokeWidth: 2.5 }}></i>
              </span>
              {!last && <span style={{ width: 2, flex: 1, minHeight: compact ? 10 : 14, background: it.status === 'done' ? '#86EFAC' : 'var(--border-subtle)' }}></span>}
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 0 : (compact ? 8 : 11) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 12, fontWeight: it.status === 'active' ? 700 : 500, color: it.status === 'pending' ? 'var(--fg-tertiary)' : 'var(--fg-primary)' }}>{it.label}</span>
                {it.tag && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#64748B', background: 'var(--slate-100)', padding: '1px 5px', borderRadius: 3 }}>{it.tag}</span>}
                {it.status === 'active' && <Pill kind="brand">In progress</Pill>}
                {it.status === 'rejected' && <Pill kind="danger">Rejected</Pill>}
              </div>
              {it.sub && <div style={{ fontSize: 10.5, color: 'var(--fg-tertiary)', marginTop: 2, fontFamily: it.subMono ? 'Geist Mono, monospace' : 'inherit' }}>{it.sub}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Banner / inline alert
// ============================================================
function Banner({ kind = 'info', icon, title, children }) {
  const c = STATUS[kind] || STATUS.info;
  return (
    <div style={{ display: 'flex', gap: 9, background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 6, padding: '9px 11px' }}>
      {icon && <i data-lucide={icon} style={{ width: 15, height: 15, color: c.dot, flexShrink: 0, marginTop: 1 }}></i>}
      <div style={{ minWidth: 0 }}>
        {title && <div style={{ fontSize: 12, fontWeight: 700, color: c.fg }}>{title}</div>}
        <div style={{ fontSize: 11.5, color: c.fg, lineHeight: 1.45, marginTop: title ? 2 : 0 }}>{children}</div>
      </div>
    </div>
  );
}

// Toast
function Toast({ children, kind = 'dark' }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--slate-900)', color: '#fff', padding: '9px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500, boxShadow: '0 12px 24px -8px rgba(15,23,42,0.4)' }}>
      <i data-lucide="check-circle-2" style={{ width: 14, height: 14, color: '#86EFAC' }}></i>
      {children}
    </div>
  );
}

// Section label inside a screen
function SLabel({ children, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{children}</span>
      {right}
    </div>
  );
}

// Stat tiles row
function StatRow({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 8 }}>
      {items.map((it, i) => (
        <div key={i} style={{ border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '9px 10px', background: '#fff' }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{it.label}</div>
          <div style={{ marginTop: 3, display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 700, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em', color: it.c || 'var(--fg-primary)' }}>{it.value}</span>
            {it.unit && <span style={{ fontSize: 10, color: 'var(--fg-tertiary)' }}>{it.unit}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Storyboard structure: Flow > Step (with timeline rail)
// ============================================================
function Flow({ n, id, title, subtitle, actors = [], children }) {
  return (
    <section id={id} style={{ breakBefore: 'page', paddingTop: 8 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 26, paddingBottom: 18, borderBottom: '2px solid var(--slate-900)' }}>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 40, fontWeight: 800, letterSpacing: '-0.04em', color: '#2563EB', lineHeight: 0.9, flexShrink: 0 }}>{n}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontFamily: 'Geist Mono, monospace', fontSize: 25, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}>{title}</h2>
          {subtitle && <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--fg-secondary)', maxWidth: 760, lineHeight: 1.5 }}>{subtitle}</p>}
          {actors.length > 0 && <div style={{ display: 'flex', gap: 6, marginTop: 11, flexWrap: 'wrap' }}>{actors.map(a => <ActorChip key={a} who={a} size="sm" />)}</div>}
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}

function Step({ n, actor, actors, title, transition, transitions, note, screen, children, last, branch }) {
  // left rail line geometry
  let lineStyle;
  if (last) lineStyle = { top: 0, height: 15 };
  else lineStyle = { top: 15, bottom: 0 };
  const actorList = actors || (actor ? [actor] : []);
  return (
    <div style={{ display: 'flex', gap: 16, breakInside: 'avoid' }}>
      {/* rail */}
      <div style={{ position: 'relative', width: 30, flexShrink: 0 }}>
        {n != null && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'var(--border-default)', marginLeft: 14, ...lineStyle }}></div>}
        {n != null && (
          <div style={{ position: 'relative', width: 30, height: 30, borderRadius: 9999, background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: 'Geist Mono, monospace', zIndex: 1 }}>{n}</div>
        )}
      </div>
      {/* body */}
      <div style={{ flex: 1, minWidth: 0, paddingBottom: last ? 6 : 30 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap', marginBottom: 4 }}>
          {actorList.map(a => <ActorChip key={a} who={a} size="sm" />)}
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h4>
        </div>
        {note && <p style={{ margin: '0 0 12px', fontSize: 12.5, color: 'var(--fg-secondary)', lineHeight: 1.5, maxWidth: 720 }}>{note}</p>}
        {(transition || transitions) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '0 0 13px' }}>
            {(transitions || [transition]).map((t, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', background: 'var(--slate-50)', border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '6px 10px', alignSelf: 'flex-start', maxWidth: '100%' }}>
                <Transition steps={t.steps} label={t.label} />
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// Two-outcome branch block (e.g. approve / reject)
function Branch({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 4 }}>{children}</div>;
}
function BranchCol({ kind = 'success', label, children }) {
  const c = STATUS[kind] || STATUS.success;
  return (
    <div style={{ border: `1px solid ${c.bd}`, borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 11px', background: c.bg, borderBottom: `1px solid ${c.bd}` }}>
        <i data-lucide={kind === 'danger' ? 'corner-down-right' : 'corner-down-right'} style={{ width: 13, height: 13, color: c.fg }}></i>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: c.fg }}>{label}</span>
      </div>
      <div style={{ padding: 12 }}>{children}</div>
    </div>
  );
}

// Side-by-side screen pair within a step
function ScreenRow({ children, cols }) {
  return <div style={{ display: 'grid', gridTemplateColumns: cols || 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14, alignItems: 'start' }}>{children}</div>;
}

Object.assign(window, {
  STATUS, Pill, Transition, ActorChip, ACTORS, Screen, Btn, Field, KV, Upload,
  MiniTable, StepRail, Banner, Toast, SLabel, StatRow, Flow, Step, Branch, BranchCol, ScreenRow,
});
