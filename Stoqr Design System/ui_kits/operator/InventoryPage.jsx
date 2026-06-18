// Stoqr Operator — Inventory page (table, filters, bulk actions)
const { useState: useStateInv } = React;

function InventoryPage() {
  const [selected, setSelected] = useStateInv(new Set([1]));
  const rows = [
    { id: 0, sku: 'SKU-049281-NV', name: 'Navigator backpack 30L', bin: 'A-12-03', wh: 'W-02', qty: 1240, d7: +128, status: 'success', lbl: 'OK' },
    { id: 1, sku: 'SKU-049282-NV', name: 'Navigator backpack 45L', bin: 'A-12-04', wh: 'W-02', qty: 42,   d7: -86,  status: 'warning', lbl: 'Low' },
    { id: 2, sku: 'SKU-051104-TR', name: 'Trail bottle 750ml — slate', bin: 'B-04-11', wh: 'W-04', qty: 0, d7: 0, status: 'danger', lbl: 'Out' },
    { id: 3, sku: 'SKU-051105-TR', name: 'Trail bottle 750ml — sand',  bin: 'B-04-12', wh: 'W-04', qty: 318,  d7: -12, status: 'success', lbl: 'OK' },
    { id: 4, sku: 'SKU-062013-AS', name: 'Ascent jacket M',            bin: 'C-08-02', wh: 'W-02', qty: 86,   d7: +4,  status: 'success', lbl: 'OK' },
    { id: 5, sku: 'SKU-062014-AS', name: 'Ascent jacket L',            bin: 'C-08-03', wh: 'W-02', qty: 14,   d7: -22, status: 'warning', lbl: 'Low' },
    { id: 6, sku: 'SKU-070881-PB', name: 'Pebble headlamp',            bin: 'D-01-09', wh: 'W-01', qty: 612,  d7: +48, status: 'success', lbl: 'OK' },
    { id: 7, sku: 'SKU-070882-PB', name: 'Pebble headlamp — red',      bin: 'D-01-10', wh: 'W-01', qty: 0,    d7: 0,   status: 'danger',  lbl: 'Out' },
    { id: 8, sku: 'SKU-088100-CM', name: 'Camp stool — folding',       bin: 'E-03-04', wh: 'W-04', qty: 240,  d7: +12, status: 'success', lbl: 'OK' },
  ];
  const toggle = id => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: 'Geist Mono', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>Inventory</h1>
          <div style={{ fontSize: 12, color: 'var(--fg-tertiary)', marginTop: 2 }}>4,821 SKUs across 4 warehouses · synced 2 min ago</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <Button variant="secondary" icon="download" size="sm">Export</Button>
          <Button variant="primary" icon="package-plus" size="sm">Receive</Button>
        </div>
      </div>

      {/* Filter row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: 280 }}>
          <i data-lucide="search" style={{ width: 14, height: 14, position: 'absolute', left: 10, top: 9, color: 'var(--fg-tertiary)' }}></i>
          <input placeholder="Filter SKUs, names, bins…" style={{ width: '100%', height: 32, padding: '0 10px 0 30px', border: '1px solid var(--border-default)', borderRadius: 6, background: '#fff', fontSize: 13, fontFamily: 'inherit' }} />
        </div>
        <FilterChip icon="warehouse">Warehouse: All</FilterChip>
        <FilterChip icon="circle-dot">Status: Any</FilterChip>
        <FilterChip icon="tag">Category: All</FilterChip>
        <button style={{ height: 32, padding: '0 10px', background: 'transparent', border: '1px dashed var(--border-default)', color: 'var(--fg-secondary)', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <i data-lucide="plus" style={{ width: 12, height: 12 }}></i>Add filter
        </button>
        <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--fg-tertiary)' }}>9 of 4,821</div>
      </div>

      {/* Bulk action bar (visible when rows selected) */}
      {selected.size > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, padding: '8px 12px' }}>
          <span style={{ fontSize: 13, color: '#1E40AF', fontWeight: 600 }}>{selected.size} selected</span>
          <span style={{ width: 1, height: 16, background: '#BFDBFE' }}></span>
          <Button variant="secondary" size="sm" icon="arrow-down-up">Transfer</Button>
          <Button variant="secondary" size="sm" icon="clipboard-check">Cycle count</Button>
          <Button variant="secondary" size="sm" icon="tag">Tag</Button>
          <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>Clear</Button>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 6, overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
        <div style={{ ...gridCols, padding: '8px 14px', background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>
          <input type="checkbox" style={{ accentColor: '#2563EB' }} />
          <div>SKU</div>
          <div>Description</div>
          <div>Bin</div>
          <div style={{ textAlign: 'right' }}>On hand</div>
          <div style={{ textAlign: 'right' }}>Δ 7d</div>
          <div>Status</div>
        </div>
        {rows.map(r => (
          <div key={r.id} style={{ ...gridCols, padding: '9px 14px', borderBottom: '1px solid var(--border-subtle)', fontSize: 13, alignItems: 'center', background: selected.has(r.id) ? 'var(--slate-50)' : '#fff', borderLeft: selected.has(r.id) ? '2px solid #2563EB' : '2px solid transparent' }}>
            <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r.id)} style={{ accentColor: '#2563EB' }} />
            <div style={{ fontFamily: 'Geist Mono', fontSize: 12 }}>{r.sku}</div>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
            <div style={{ fontFamily: 'Geist Mono', fontSize: 12, color: 'var(--fg-secondary)' }}>{r.bin} · {r.wh}</div>
            <div style={{ textAlign: 'right', fontWeight: 500 }}>{r.qty.toLocaleString()}</div>
            <div style={{ textAlign: 'right', color: r.d7 > 0 ? '#16A34A' : r.d7 < 0 ? '#DC2626' : 'var(--fg-tertiary)' }}>{r.d7 === 0 ? '—' : (r.d7 > 0 ? '+' : '') + r.d7}</div>
            <div><StatusPill kind={r.status}>{r.lbl}</StatusPill></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterChip({ icon, children }) {
  return (
    <button style={{ height: 32, padding: '0 10px', background: '#fff', border: '1px solid var(--border-default)', color: 'var(--fg-primary)', borderRadius: 6, fontSize: 12, fontWeight: 500, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
      <i data-lucide={icon} style={{ width: 12, height: 12, color: 'var(--fg-tertiary)' }}></i>
      {children}
      <i data-lucide="chevron-down" style={{ width: 12, height: 12, color: 'var(--fg-tertiary)' }}></i>
    </button>
  );
}

const gridCols = { display: 'grid', gridTemplateColumns: '20px 140px 1fr 160px 90px 80px 90px', gap: 12 };

Object.assign(window, { InventoryPage });
