// Flow 7 — Billing, invoicing & corrections
function Flow7() {
  return (
    <Flow
      n="7"
      id="flow-billing"
      title="Billing — charges, invoices & corrections"
      subtitle="The financial backbone. Two streams accrue charges: job billing (per billable step, by charge type) and storage billing (per daily inventory snapshot). Both debit a wallet. A nightly scheduler aggregates everything due into one invoice per billing cycle, generates a PDF, and ages it to overdue. Records are immutable — corrections are additive adjustments applied to the next invoice."
      actors={['admin', 'system', 'operator', 'client']}
    >
      {/* 1 — Configure rate cards */}
      <Step
        n={1}
        actor="admin"
        title="Configure the rate cards"
        note="Pricing lives in two configs, settable per tenant and overridable per client. step_billing_config prices billable flow steps by charge type (JOB / ITEM / PALLET / CONTAINER). storage_billing_config prices storage per unit (PALLET / BIN / CONTAINER), split by general vs spare-parts — only spare parts get free_days grace. Prices are snapshotted at billing time, so later changes never alter past records."
        transition={{ label: 'config.is_active', steps: [{ k: 'muted', t: 'draft', dot: false }, { k: 'success', t: 'active' }] }}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="Billing · Rate cards" title="Step billing (job)" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Step', w: '120px' }, { t: 'Charge', w: '78px', mono: true }, { t: 'Type', w: '78px' }, { t: 'Unit price', align: 'right', w: '78px', mono: true }]}
              rows={[
                ['Record qty', 'ITEM', 'inbound', { t: '$0.12', b: true }],
                ['Generate GRN', 'JOB', 'inbound', { t: '$8.00', b: true }],
                ['Pick items', 'ITEM', 'outbound', { t: '$0.15', b: true }],
                ['Pack items', 'CONTAINER', 'outbound', { t: '$1.20', b: true }],
              ]}
            />
          </Screen>
          <Screen app="operator" title="Storage billing" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Applies to', w: '108px' }, { t: 'Charge', w: '74px', mono: true }, { t: 'Free days', align: 'right', w: '74px', mono: true }, { t: 'Per day', align: 'right', w: '70px', mono: true }]}
              rows={[
                ['General', 'PALLET', { t: '0', c: '#94A3B8' }, { t: '$0.90', b: true }],
                ['General', 'BIN', { t: '0', c: '#94A3B8' }, { t: '$0.30', b: true }],
                ['Spare parts', 'PALLET', { t: '14', b: true, c: '#16A34A' }, { t: '$1.10', b: true }],
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="info" icon="lock" title="Pricing snapshot">Unit prices are copied onto each billing line at billing time — immutable thereafter.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 2 — Job charges accrue */}
      <Step
        n={2}
        actor="system"
        title="Job charges accrue as steps complete"
        note="As each billable step finishes, the system resolves its price, computes quantity by charge type — PICK sums item quantities, PACK counts containers, DISPATCH is a fixed job count — and writes a line item. On job completion the lines aggregate into one job_billing record (UNIQUE per job, preventing duplicates) and debit the wallet."
        transitions={[
          { label: 'job_billing.status', steps: [{ k: 'muted', t: 'draft', dot: false }, { k: 'success', t: 'finalized' }] },
          { label: 'wallet_transactions', steps: [{ k: 'muted', t: 'pending', dot: false }, { k: 'danger', t: 'debit', dot: true }, { k: 'success', t: 'confirmed' }] },
        ]}
      >
        <Screen app="operator" crumb="Billing · JOB-2051" title="Job billing rollup" w={620}>
          <MiniTable
            dense
            cols={[{ t: 'Step', w: '128px' }, { t: 'Charge', w: '76px', mono: true }, { t: 'Qty', align: 'right', w: '52px', mono: true }, { t: 'Unit', align: 'right', w: '62px', mono: true }, { t: 'Amount', align: 'right', w: '78px', mono: true }]}
            rows={[
              ['Pick items', 'ITEM', { t: '220', b: true }, { t: '$0.15' }, { t: '$33.00', b: true }],
              ['Pack items', 'CONTAINER', { t: '2', b: true }, { t: '$1.20' }, { t: '$2.40', b: true }],
              ['Generate dispatch', 'JOB', { t: '1', b: true }, { t: '$6.00' }, { t: '$6.00', b: true }],
            ]}
          />
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <KV2 k="job_billing total" v="$41.40" />
            <span style={{ marginLeft: 'auto' }}><Pill kind="success" mono>finalized</Pill></span>
            <Pill kind="danger" mono>wallet −$41.40</Pill>
          </div>
          <div style={{ marginTop: 10 }}><Banner kind="neutral" icon="shield" title="Idempotent by construction">UNIQUE(job_id) on job_billing and UNIQUE(source_type, source_id) on wallet transactions block double-billing.</Banner></div>
        </Screen>
      </Step>

      {/* 3 — Daily storage snapshot (cron) */}
      <Step
        n={3}
        actor="system"
        title="Nightly: capture the storage snapshot"
        note="A daily cron (midnight) photographs inventory grouped by client, storage type and charge type, writing one inventory_snapshots row per group — guarded by a UNIQUE constraint so a retry can't double-count. These snapshots are what storage billing sums over the cycle; general stock charges from day one, spare parts only after their free-day grace."
        transitions={[
          { label: 'billing_job_runs', steps: [{ k: 'info', t: 'started' }, { k: 'success', t: 'completed' }], },
          { label: 'inventory_snapshots', steps: [{ k: 'muted', t: 'none', dot: false }, { k: 'success', t: 'captured' }] },
        ]}
      >
        <Screen app="operator" crumb="Scheduler · DailyStorageSnapshotJob" title="2026-06-15 · snapshot" w={600}>
          <MiniTable
            dense
            cols={[{ t: 'Client', w: '140px' }, { t: 'Storage', w: '100px' }, { t: 'Charge', w: '74px', mono: true }, { t: 'Qty', align: 'right', w: '52px', mono: true }, { t: 'Billable', align: 'right', w: '70px' }]}
            rows={[
              ['Northwind Traders', 'General', 'PALLET', { t: '34', b: true }, { pill: 'success', t: 'yes' }],
              ['Northwind Traders', 'General', 'BIN', { t: '120', b: true }, { pill: 'success', t: 'yes' }],
              ['Pacific Lines', 'Spare parts', 'PALLET', { t: '6', b: true }, { pill: 'warning', t: 'grace' }],
            ]}
          />
          <div style={{ marginTop: 9 }}><Banner kind="info" icon="repeat" title="Retry-safe">UNIQUE(client, snapshot_date, storage_type, charge_type) — re-running the night's job is a no-op.</Banner></div>
        </Screen>
      </Step>

      {/* 4 — Billing cycle → invoice */}
      <Step
        n={4}
        actor="system"
        title="Cycle processor builds the invoice"
        note="A nightly processor checks each client's billing_cycle and billing_cycle_day against last_billing_date. When a cycle is due it gathers finalized job_billing (invoice_id IS NULL), aggregates the period's storage snapshots into storage_billing, and assembles one invoice with three sections — Job, Spare Parts, Storage — stamps a due date from payment_terms, renders a PDF to cloud storage and writes back the URL."
        transitions={[
          { label: 'invoices.status', steps: [{ k: 'muted', t: 'draft', dot: false }, { k: 'brand', t: 'generated' }, { k: 'info', t: 'sent' }] },
          { label: 'job_billing.invoice_id', steps: [{ k: 'muted', t: 'null', dot: false }, { k: 'success', t: 'assigned' }] },
        ]}
      >
        <Screen app="operator" crumb="Invoices · INV-2026-0088" title="Northwind Traders · June cycle" w={640}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 11, flexWrap: 'wrap' }}>
            <Pill kind="info" mono>Jun 1 – Jun 30</Pill>
            <Pill kind="warning" mono>due Jul 30 · Net 30</Pill>
            <span style={{ marginLeft: 'auto' }}><Btn variant="secondary" size="sm" icon="file-text">View PDF</Btn></span>
          </div>
          <InvoiceSections
            sections={[
              { label: 'Job billing', icon: 'briefcase', note: '18 jobs · step charges', amount: '$742.60' },
              { label: 'Spare parts storage', icon: 'anchor', note: '6 pallets · after grace', amount: '$48.40' },
              { label: 'Storage', icon: 'warehouse', note: 'pallets + bins · daily', amount: '$1,284.00' },
            ]}
            total="$2,075.00"
          />
        </Screen>
      </Step>

      {/* 5 — Client receives invoice + wallet */}
      <Step
        n={5}
        actors={['client', 'system']}
        title="Client gets the invoice — wallet reflects it"
        note="The invoice surfaces in the client portal with its PDF; the wallet ledger shows every debit and credit that fed it. A separate nightly job ages any unpaid invoice past its due date to overdue."
        transitions={[
          { label: 'invoices.status', steps: [{ k: 'info', t: 'sent' }, { k: 'success', t: 'paid' }, { k: 'danger', t: 'overdue' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,1.05fr) minmax(0,0.95fr)">
          <Screen app="client" crumb="Northwind Traders" title="Invoices" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Invoice', mono: true, w: '128px' }, { t: 'Period', w: '110px' }, { t: 'Amount', align: 'right', w: '84px', mono: true }, { t: 'Status', align: 'right', w: '74px' }]}
              rows={[
                { __sel: true, cells: ['INV-2026-0088', 'June', { t: '$2,075.00', b: true }, { pill: 'info', t: 'sent' }] },
                ['INV-2026-0072', 'May', { t: '$1,940.50', b: true }, { pill: 'success', t: 'paid' }],
                ['INV-2026-0061', 'April', { t: '$2,210.00', b: true }, { pill: 'danger', t: 'overdue' }],
              ]}
            />
          </Screen>
          <Screen app="operator" crumb="Wallet · Northwind" title="Ledger" w="100%">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>Balance</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 20, fontWeight: 700, color: '#DC2626' }}>−$2,075.00</span>
            </div>
            <MiniTable
              dense
              cols={[{ t: 'Source', w: '92px', mono: true }, { t: 'Type', w: '66px' }, { t: 'Amount', align: 'right', w: '78px', mono: true }, { t: 'Status', align: 'right', w: '78px' }]}
              rows={[
                ['JOB-2051', 'debit', { t: '−$41.40', c: '#DC2626', b: true }, { pill: 'success', t: 'confirmed' }],
                ['STORAGE', 'debit', { t: '−$1,284.00', c: '#DC2626', b: true }, { pill: 'success', t: 'confirmed' }],
              ]}
            />
          </Screen>
        </ScreenRow>
      </Step>

      {/* 6 — Corrections */}
      <Step
        n={6}
        actors={['supervisor', 'system']}
        last
        title="Corrections — additive, never destructive"
        note="Billing records are immutable, so a mistake is fixed with a billing_adjustment — a credit, debit or discount — never by editing history. The adjustment writes a matching wallet transaction (credit refunds, debit charges more) and is applied to the NEXT invoice, with full audit linkage from source to target."
        transition={{ label: 'billing_adjustments.status', steps: [{ k: 'warning', t: 'pending' }, { k: 'success', t: 'applied' }] }}
      >
        <Screen app="operator" crumb="Billing · Adjustments" title="Correct INV-2026-0061" w={640}>
          <MiniTable
            cols={[{ t: 'Reference', w: '110px', mono: true }, { t: 'Type', w: '88px' }, { t: 'Reason', }, { t: 'Amount', align: 'right', w: '84px', mono: true }, { t: 'Status', align: 'right', w: '84px' }]}
            rows={[
              ['INV-2026-0061', { t: 'CREDIT', c: '#16A34A', b: true }, 'Full reversal — billed in error', { t: '−$2,210.00', c: '#16A34A', b: true }, { pill: 'warning', t: 'pending' }],
              ['JOB-1987', { t: 'DEBIT', c: '#DC2626', b: true }, 'Under-billed pallets', { t: '+$36.00', c: '#DC2626', b: true }, { pill: 'success', t: 'applied' }],
              ['STORAGE', { t: 'DISCOUNT', c: '#7C3AED', b: true }, 'Goodwill — 10% May storage', { t: '−$128.00', c: '#7C3AED', b: true }, { pill: 'success', t: 'applied' }],
            ]}
          />
          <div style={{ marginTop: 12 }}>
            <Branch>
              <BranchCol kind="success" label="Full reversal">
                <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 9 }}>Reverse the whole amount, mark the billing REVERSED, write a wallet credit.</div>
                <Transition label="billing" steps={[{ k: 'success', t: 'finalized' }, { k: 'neutral', t: 'reversed' }]} />
              </BranchCol>
              <BranchCol kind="info" label="Applied next cycle">
                <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 9 }}>Adjustments never touch past invoices — they roll into the next one via target_invoice_id.</div>
                <Transition label="adjustment" steps={[{ k: 'warning', t: 'pending' }, { k: 'success', t: 'applied' }]} />
              </BranchCol>
            </Branch>
          </div>
        </Screen>
      </Step>
    </Flow>
  );
}

// Inline helpers for billing flow
function KV2({ k, v }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7 }}>
      <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' }}>{k}</span>
      <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, fontWeight: 700 }}>{v}</span>
    </div>
  );
}

function InvoiceSections({ sections, total }) {
  return (
    <div style={{ border: '1px solid var(--border-default)', borderRadius: 8, overflow: 'hidden' }}>
      {sections.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 13px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: 'var(--slate-50)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <i data-lucide={s.icon} style={{ width: 15, height: 15, color: '#2563EB' }}></i>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 10.5, color: 'var(--fg-tertiary)' }}>{s.note}</div>
          </div>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, fontWeight: 600 }}>{s.amount}</span>
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 13px', background: 'var(--slate-50)' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-secondary)', marginLeft: 41 }}>Grand total</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'Geist Mono, monospace', fontSize: 18, fontWeight: 800 }}>{total}</span>
      </div>
    </div>
  );
}
window.Flow7 = Flow7;
