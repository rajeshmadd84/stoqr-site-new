// Stoqr — User Flows · file-import kit
// Modern drag-drop upload, parse pipeline, column mapping, row-level error
// correction and a validation summary. Reused by inbound (storage list),
// outbound (packing list) and the client inventory feed. Exposes on window.

// ============================================================
// File-type chip
// ============================================================
function FileType({ type = 'xlsx', size }) {
  const cfg = type === 'csv'
    ? { icon: 'file-text', c: '#2563EB', bg: '#EFF6FF', label: 'CSV' }
    : { icon: 'file-spreadsheet', c: '#16A34A', bg: '#ECFDF3', label: 'XLSX' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ width: size || 28, height: size || 28, borderRadius: 6, background: cfg.bg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <i data-lucide={cfg.icon} style={{ width: (size || 28) * 0.54, height: (size || 28) * 0.54, color: cfg.c }}></i>
      </span>
    </span>
  );
}

// ============================================================
// Drag-and-drop dropzone — idle / dragging / uploading / done
// ============================================================
const GRID_BG = {
  backgroundImage: 'linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
};

function Dropzone({ state = 'idle', name, hint, pct = 0, rows, type = 'xlsx', size }) {
  if (state === 'uploading') {
    return (
      <div style={{ border: '1px solid var(--border-default)', borderRadius: 10, padding: 14, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <FileType type={type} size={36} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, fontFamily: 'Geist Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-tertiary)', marginTop: 1 }}>{size} · uploading…</div>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Geist Mono, monospace', color: '#2563EB' }}>{pct}%</span>
        </div>
        <div style={{ height: 5, borderRadius: 9999, background: 'var(--slate-100)', marginTop: 11, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,#2563EB,#1D97FF)', borderRadius: 9999 }}></div>
        </div>
      </div>
    );
  }
  if (state === 'done') {
    return (
      <div style={{ border: '1px solid var(--success-border)', borderRadius: 10, padding: 14, background: 'var(--success-bg)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <FileType type={type} size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, fontFamily: 'Geist Mono, monospace', color: '#166534', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ fontSize: 10.5, color: '#166534', marginTop: 1 }}>{rows != null ? `${rows} rows parsed` : 'parsed'} · {size}</div>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: '#166534', background: '#fff', border: '1px solid var(--success-border)', borderRadius: 9999, padding: '3px 9px' }}>
          <i data-lucide="check" style={{ width: 12, height: 12, strokeWidth: 3 }}></i>Parsed
        </span>
      </div>
    );
  }
  const dragging = state === 'dragging';
  return (
    <div style={{
      border: `1.5px dashed ${dragging ? '#2563EB' : 'var(--border-default)'}`,
      borderRadius: 10, padding: '26px 18px', textAlign: 'center',
      background: dragging ? 'rgba(37,99,235,0.05)' : 'var(--slate-25)',
      ...(dragging ? {} : GRID_BG),
      transition: 'border-color .18s, background .18s',
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: dragging ? '#2563EB' : '#fff', border: dragging ? 'none' : '1px solid var(--border-subtle)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 11, boxShadow: '0 1px 2px rgba(15,23,42,0.06)' }}>
        <i data-lucide={dragging ? 'download' : 'upload-cloud'} style={{ width: 22, height: 22, color: dragging ? '#fff' : 'var(--fg-tertiary)' }}></i>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', color: dragging ? '#1E40AF' : 'var(--fg-primary)' }}>
        {dragging ? 'Drop to upload' : (name || 'Drag & drop your file here')}
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--fg-tertiary)', marginTop: 4 }}>{hint || 'or click to browse'}</div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 12 }}>
        {['XLSX', 'CSV'].map(t => (
          <span key={t} style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, fontWeight: 600, color: 'var(--fg-secondary)', background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 5, padding: '3px 8px' }}>.{t.toLowerCase()}</span>
        ))}
        <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, color: 'var(--fg-muted)', alignSelf: 'center' }}>max 20 MB</span>
      </div>
    </div>
  );
}

// ============================================================
// Parse pipeline — horizontal status stepper
// ============================================================
function ParsePipeline({ stages, current = 0, failedAt }) {
  // stages: [{ key, label }]
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
      {stages.map((s, i) => {
        const failed = failedAt === i;
        const done = i < current;
        const active = i === current && !failed;
        const c = failed ? '#DC2626' : done ? '#16A34A' : active ? '#2563EB' : '#CBD5E1';
        const last = i === stages.length - 1;
        return (
          <React.Fragment key={s.key}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0 }}>
              <span style={{ width: 19, height: 19, borderRadius: 9999, background: (done || active || failed) ? c : '#fff', border: `1.5px solid ${c}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: active ? '0 0 0 3px rgba(37,99,235,0.18)' : 'none' }}>
                <i data-lucide={failed ? 'x' : done ? 'check' : active ? 'loader' : 'circle'} style={{ width: 10, height: 10, color: (done || active || failed) ? '#fff' : '#CBD5E1', strokeWidth: 3 }}></i>
              </span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 8.5, fontWeight: active ? 700 : 500, color: active ? '#2563EB' : failed ? '#DC2626' : 'var(--fg-tertiary)', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {!last && <span style={{ flex: 1, height: 2, background: done ? '#86EFAC' : 'var(--border-subtle)', margin: '0 4px', marginBottom: 16, minWidth: 12 }}></span>}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ============================================================
// Column mapping — file column → Stoqr field, with disposition
// ============================================================
const DISPOSITION = {
  required: { c: '#DC2626', bg: '#FEE2E2', label: 'Required' },
  optional: { c: '#64748B', bg: '#EEF2F7', label: 'Optional' },
  resolve:  { c: '#2563EB', bg: '#DBEAFE', label: 'Resolve' },
  core:     { c: '#7C3AED', bg: '#EDE9FE', label: 'Core' },
  computed: { c: '#0891B2', bg: '#CFFAFE', label: 'Computed' },
  snapshot: { c: '#0F172A', bg: '#EEF2F7', label: 'Snapshot' },
  dropped:  { c: '#94A3B8', bg: '#F5F7FB', label: 'Dropped' },
};

function MapConfig({ items }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--border-subtle)', borderRadius: 6, padding: '4px 9px', background: 'var(--slate-25)' }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{it.k}</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, fontWeight: 600 }}>{it.v}</span>
        </div>
      ))}
    </div>
  );
}

function ColumnMap({ rows }) {
  // rows: [{ col, header, sample, field, disp, unmapped }]
  return (
    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 22px 1.25fr 92px', gap: 8, padding: '7px 11px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
        {['File column', '', 'Stoqr field', 'Disposition'].map((t, i) => (
          <div key={i} style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{t}</div>
        ))}
      </div>
      {rows.map((r, i) => {
        const d = DISPOSITION[r.disp] || DISPOSITION.optional;
        const last = i === rows.length - 1;
        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.35fr 22px 1.25fr 92px', gap: 8, padding: '8px 11px', borderBottom: last ? 'none' : '1px solid var(--border-subtle)', alignItems: 'center', background: r.unmapped ? 'rgba(220,38,38,0.035)' : '#fff' }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9, fontWeight: 700, color: 'var(--fg-muted)', background: 'var(--slate-100)', borderRadius: 3, padding: '1px 4px', flexShrink: 0 }}>{r.col}</span>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11.5, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.header}</span>
              </div>
              {r.sample && <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 2, fontFamily: 'Geist Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.sample}</div>}
            </div>
            <i data-lucide="arrow-right" style={{ width: 13, height: 13, color: 'var(--fg-muted)' }}></i>
            <div style={{ minWidth: 0 }}>
              {r.unmapped ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, height: 26, border: '1px solid #FCA5A5', borderRadius: 6, padding: '0 8px', background: '#fff', color: '#DC2626', fontSize: 11, fontWeight: 600 }}>
                  Select field… <i data-lucide="chevron-down" style={{ width: 12, height: 12 }}></i>
                </div>
              ) : r.field === '—' ? (
                <span style={{ fontSize: 11, color: 'var(--fg-muted)', fontStyle: 'italic' }}>not imported</span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, height: 26, border: '1px solid var(--border-default)', borderRadius: 6, padding: '0 8px', background: 'var(--slate-25)', fontFamily: 'Geist Mono, monospace', fontSize: 11, fontWeight: 600, overflow: 'hidden' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.field}</span>
                  <i data-lucide="chevron-down" style={{ width: 12, height: 12, color: 'var(--fg-muted)', flexShrink: 0 }}></i>
                </div>
              )}
            </div>
            <div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.03em', textTransform: 'uppercase', color: d.c, background: d.bg, borderRadius: 4, padding: '2px 6px' }}>
                {r.disp === 'required' && <span style={{ width: 4, height: 4, borderRadius: 9999, background: d.c }}></span>}
                {d.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Review grid — parsed rows with per-cell validation + inline fix
// ============================================================
function ReviewGrid({ cols, rows }) {
  const grid = cols.map(c => c.w || '1fr').join(' ');
  return (
    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 8, overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 8, padding: '6px 10px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
        {cols.map((c, i) => (
          <div key={i} style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--fg-tertiary)', textAlign: c.align || 'left' }}>{c.t}</div>
        ))}
      </div>
      {rows.map((r, ri) => {
        const last = ri === rows.length - 1;
        const edge = r.state === 'error' ? '#DC2626' : r.state === 'warning' ? '#D97706' : 'transparent';
        const tint = r.state === 'error' ? 'rgba(220,38,38,0.035)' : r.state === 'warning' ? 'rgba(217,119,6,0.04)' : '#fff';
        return (
          <div key={ri} style={{ borderBottom: (last && !r.fix) ? 'none' : '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 8, padding: '7px 10px', alignItems: 'center', background: tint, borderLeft: `2px solid ${edge}` }}>
              {r.cells.map((cell, ci) => {
                const c = cols[ci] || {};
                if (cell && cell.pill) return <div key={ci} style={{ textAlign: c.align || 'left' }}><Pill kind={cell.pill}>{cell.t}</Pill></div>;
                const bad = cell && cell.bad;
                const mono = (cell && cell.mono) || c.mono;
                const txt = cell && cell.t != null ? cell.t : cell;
                if (bad) {
                  return (
                    <div key={ci} style={{ textAlign: c.align || 'left' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: '1px solid #FCA5A5', background: '#fff', borderRadius: 5, padding: '2px 6px', fontFamily: 'Geist Mono, monospace', fontSize: 11, color: '#DC2626', fontWeight: 600 }}>
                        {txt}
                        <i data-lucide="pencil" style={{ width: 10, height: 10 }}></i>
                      </span>
                    </div>
                  );
                }
                return <div key={ci} style={{ fontSize: 11, textAlign: c.align || 'left', fontFamily: mono ? 'Geist Mono, monospace' : 'inherit', fontWeight: (cell && cell.b) ? 600 : 400, color: (cell && cell.c) || 'var(--fg-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{txt}</div>;
              })}
            </div>
            {r.fix && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px 8px 12px', background: tint, borderLeft: `2px solid ${edge}` }}>
                <i data-lucide={r.state === 'warning' ? 'alert-triangle' : 'alert-circle'} style={{ width: 13, height: 13, color: edge, flexShrink: 0 }}></i>
                <span style={{ fontSize: 10.5, color: r.state === 'warning' ? '#854D0E' : '#991B1B', flex: 1, minWidth: 0 }}>{r.fix}</span>
                {r.action && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 9px', border: `1px solid ${edge}`, background: '#fff', borderRadius: 6, fontSize: 10.5, fontWeight: 600, color: edge, whiteSpace: 'nowrap' }}>
                    {r.actionIcon && <i data-lucide={r.actionIcon} style={{ width: 11, height: 11 }}></i>}
                    {r.action}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Validation summary bar
// ============================================================
function ValidationBar({ total, ready, errors = 0, warnings = 0 }) {
  const seg = (n, color) => n > 0 ? <span style={{ flex: n, background: color }}></span> : null;
  return (
    <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 11, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 9, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 18, fontWeight: 700 }}>{total}</span>
          <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>rows</span>
        </div>
        <span style={{ width: 1, height: 18, background: 'var(--border-subtle)' }}></span>
        <Count icon="check-circle-2" c="#16A34A" n={ready} label="ready" />
        <Count icon="x-circle" c="#DC2626" n={errors} label="errors" />
        <Count icon="alert-triangle" c="#D97706" n={warnings} label="warnings" />
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 10.5, fontWeight: 600, color: 'var(--fg-secondary)', border: '1px solid var(--border-default)', borderRadius: 6, padding: '4px 9px' }}>
          <i data-lucide="filter" style={{ width: 11, height: 11 }}></i>Show errors only
        </span>
      </div>
      <div style={{ display: 'flex', height: 6, borderRadius: 9999, overflow: 'hidden', background: 'var(--slate-100)' }}>
        {seg(ready, '#16A34A')}
        {seg(errors, '#DC2626')}
        {seg(warnings, '#D97706')}
      </div>
    </div>
  );
}
function Count({ icon, c, n, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: n > 0 ? c : 'var(--fg-muted)', fontWeight: 600 }}>
      <i data-lucide={icon} style={{ width: 13, height: 13 }}></i>
      <span style={{ fontFamily: 'Geist Mono, monospace' }}>{n}</span> {label}
    </span>
  );
}

Object.assign(window, { FileType, Dropzone, ParsePipeline, ColumnMap, MapConfig, ReviewGrid, ValidationBar });
