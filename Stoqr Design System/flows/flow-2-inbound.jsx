// Flow 2 — Inbound: storage list import to GRN
function Flow2() {
  const INBOUND_STAGES = [
    { key: 'uploaded', label: 'uploaded' },
    { key: 'saved', label: 'saved' },
    { key: 'queued', label: 'queued' },
    { key: 'processing', label: 'processing' },
    { key: 'processed', label: 'processed' },
  ];
  return (
    <Flow
      n="2"
      id="flow-inbound"
      title="Inbound — storage list to GRN"
      subtitle="A client sends goods in for storage. The heart of this flow is the file import: a drag-and-drop storage list (Excel/CSV) that's mapped to Stoqr's fields, parsed, and corrected row-by-row before a Job is ever created. Then the Job runs its tenant-defined flow steps — manual work, automated system steps — ending in a GRN and live stock."
      actors={['admin', 'operator', 'supervisor', 'system']}
    >
      {/* 1 — Flow template */}
      <Step
        n={1}
        actor="admin"
        title="Define the inbound flow template"
        note="Flows are tenant-level process templates — every client follows the same steps. Each step has a type that decides how it runs: manual work, a document gate, an automated system action, or a supervisor approval. System steps (violet) need no assignment."
        transition={{ label: 'flows.is_active', steps: [{ k: 'muted', t: 'draft', dot: false }, { k: 'success', t: 'active' }] }}
      >
        <Screen app="operator" crumb="Flows · Inbound" title="Bonded Import" w={620}>
          <MiniTable
            cols={[{ t: '#', w: '26px', mono: true, align: 'center' }, { t: 'Step' }, { t: 'Type', w: '120px', mono: true }, { t: 'Assigned team', w: '128px' }]}
            rows={[
              ['1', 'Unloading', 'work', 'Inbound crew'],
              ['2', 'Customs docs', 'file_collection', 'Compliance'],
              ['3', 'Record quantities', 'prebuilt', 'Receiving'],
              ['4', 'Update inventory', { t: 'system', c: '#7C3AED', b: true }, { t: 'auto', c: 'var(--fg-muted)' }],
              ['5', 'Generate GRN', { t: 'system', c: '#7C3AED', b: true }, { t: 'auto', c: 'var(--fg-muted)' }],
              ['6', 'Supervisor sign-off', 'approval', 'Supervisor'],
            ]}
          />
          <div style={{ marginTop: 9 }}><Banner kind="info" icon="git-branch" title="Steps run in order; any step can be flagged parallel">A file_collection step can't complete until every mandatory document is uploaded.</Banner></div>
        </Screen>
      </Step>

      {/* 2 — Upload storage list (drag-drop) */}
      <Step
        n={2}
        actor="operator"
        title="Drop the storage list file"
        note="Drag an Excel or CSV onto the importer. Stoqr saves the raw file to blob storage and queues it — the parse runs in the background and streams its status back. A malformed file fails here without touching anything downstream."
        transition={{ label: 'storage_list_files.status', steps: [{ k: 'muted', t: 'uploaded', dot: false }, { k: 'info', t: 'queued' }, { k: 'brand', t: 'processing' }, { k: 'success', t: 'processed' }] }}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="Inbound · Import" title="Upload storage list" w="100%">
            <Dropzone state="dragging" />
            <div style={{ marginTop: 11 }}>
              <SLabel>Just uploaded</SLabel>
              <Dropzone state="uploading" name="northwind-storage-2026-06-14.xlsx" size="318 KB" pct={72} type="xlsx" />
            </div>
          </Screen>
          <Screen app="operator" title="Parse · background job" w="100%">
            <Dropzone state="done" name="northwind-storage-2026-06-14.xlsx" size="318 KB" rows={248} type="xlsx" />
            <div style={{ marginTop: 14 }}><SLabel>Pipeline</SLabel></div>
            <ParsePipeline stages={INBOUND_STAGES} current={4} />
            <div style={{ marginTop: 13 }}><Banner kind="brand" icon="cpu" title="StorageListProcessorJob"><span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11 }}>248 rows</span> extracted. Next: map columns &amp; review.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 3 — Column mapping */}
      <Step
        n={3}
        actor="operator"
        title="Map the file's columns to Stoqr fields"
        note="Every client's spreadsheet is shaped differently. The first time, you map their columns to Stoqr's fixed field set and save it as that client's template — next upload, the mapping is detected automatically. Required fields (sku, item_name, expected_quantity) must be filled before the parse can be trusted."
      >
        <Screen app="operator" crumb="Import · northwind-storage-2026-06-14.xlsx" title="Column mapping" w={680}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
            <MapConfig items={[{ k: 'Sheet', v: 'Sheet1' }, { k: 'Header row', v: '1' }, { k: 'Data starts', v: '2' }]} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#1E40AF', background: '#DBEAFE', border: '1px solid #93C5FD', borderRadius: 6, padding: '4px 9px' }}>
              <i data-lucide="bookmark" style={{ width: 12, height: 12 }}></i>Northwind Standard Format
            </span>
          </div>
          <ColumnMap rows={[
            { col: 'A', header: 'Part No', sample: 'SKU-049281-NV', field: 'sku', disp: 'required' },
            { col: 'B', header: 'Item Description', sample: 'Navigator backpack 30L', field: 'item_name', disp: 'required' },
            { col: 'C', header: 'Qty Expected', sample: '600', field: 'expected_quantity', disp: 'required' },
            { col: 'D', header: 'UOM', sample: 'each', field: 'unit_of_measure', disp: 'optional' },
            { col: 'E', header: 'Batch / Lot', sample: 'LOT-22418', field: 'batch_number', disp: 'optional' },
            { col: 'F', header: 'Expiry', sample: '2027-03-01', field: 'expiry_date', disp: 'optional' },
            { col: 'G', header: 'Cost Centre', sample: 'CC-4471', field: '—', disp: 'dropped' },
            { col: 'H', header: 'Net Wt (kg)', sample: '1.8', unmapped: true, disp: 'required' },
          ]} />
          <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', gap: 9 }}>
            <Btn variant="primary" icon="arrow-right">Apply mapping &amp; review</Btn>
            <Btn variant="secondary" icon="save" size="md">Save as template</Btn>
            <span style={{ marginLeft: 'auto', fontSize: 11, color: '#DC2626', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 5 }}><i data-lucide="alert-circle" style={{ width: 13, height: 13 }}></i>1 column needs a field</span>
          </div>
        </Screen>
      </Step>

      {/* 4 — Review & correct */}
      <Step
        n={4}
        actor="operator"
        title="Review parsed rows & fix errors inline"
        note="The parser validates every row against the mapped types and checks each SKU against your inventory. Bad cells are flagged in place — fix them inline, resolve unknown SKUs to an item (or create it), and clear warnings — without leaving the screen. The Job can't be created while errors remain."
        transitions={[
          { label: 'storage_list_lines.status', steps: [{ k: 'warning', t: 'pending', dot: true }, { k: 'success', t: 'received-ready' }] },
          { label: 'storage_list_files.status', steps: [{ k: 'success', t: 'processed' }, { k: 'brand', t: 'job_created' }] },
        ]}
      >
        <Screen app="operator" crumb="Import · review" title="Review & correct — 248 rows" w={720}>
          <ValidationBar total={248} ready={244} errors={3} warnings={1} />
          <div style={{ marginTop: 11 }}>
            <ReviewGrid
              cols={[{ t: 'Ln', w: '34px', mono: true, align: 'center' }, { t: 'SKU', w: '150px', mono: true }, { t: 'Item name' }, { t: 'Exp qty', w: '72px', align: 'right', mono: true }, { t: 'UoM', w: '58px' }, { t: 'Status', w: '88px', align: 'right' }]}
              rows={[
                { state: 'ok', cells: ['1', 'SKU-049281-NV', 'Navigator backpack 30L', { t: '600', b: true }, 'each', { pill: 'success', t: 'ready' }] },
                { state: 'ok', cells: ['2', 'SKU-051104-TR', 'Trail bottle 750ml — slate', { t: '240', b: true }, 'case', { pill: 'success', t: 'ready' }] },
                {
                  state: 'error',
                  cells: ['3', { t: 'SKU-0773?', bad: true }, 'Ascent jacket M', { t: '120', b: true }, 'each', { pill: 'danger', t: 'error' }],
                  fix: 'SKU not found in inventory — resolve to an existing item or create it.',
                  action: 'Resolve item', actionIcon: 'link',
                },
                {
                  state: 'error',
                  cells: ['4', 'SKU-062013-AS', 'Summit gloves L', { t: '12a', bad: true }, 'each', { pill: 'danger', t: 'error' }],
                  fix: 'Expected quantity “12a” is not a whole number.',
                  action: 'Fix value', actionIcon: 'pencil',
                },
                {
                  state: 'warning',
                  cells: ['5', 'SKU-088420-CP', 'Camp pillow', { t: '80', b: true }, 'each', { pill: 'warning', t: 'check' }],
                  fix: 'Expiry “01/03/27” is ambiguous — read as 1 Mar 2027 (DD/MM/YY).',
                  action: 'Confirm', actionIcon: 'check',
                },
              ]}
            />
          </div>
          <div style={{ marginTop: 11, display: 'flex', alignItems: 'center', gap: 9 }}>
            <Btn variant="primary" icon="check"><span>Confirm 248 lines &amp; create Job</span></Btn>
            <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>Disabled until 3 errors are cleared</span>
          </div>
        </Screen>
      </Step>

      {/* 5 — Assign job + tasks */}
      <Step
        n={5}
        actor="supervisor"
        title="Pick up the Job & assign its tasks"
        note="The confirmed file spawns a Job in the unassigned queue. A supervisor self-assigns it, then routes each task to a person (only they see it) or a department (everyone in it sees it). System tasks need no one."
        transitions={[
          { label: 'jobs.status', steps: [{ k: 'muted', t: 'created', dot: false }, { k: 'info', t: 'assigned' }, { k: 'brand', t: 'in_progress' }] },
          { label: 'job_tasks.status', steps: [{ k: 'warning', t: 'pending' }, { k: 'info', t: 'assigned' }] },
        ]}
      >
        <Screen app="operator" crumb="Jobs · JOB-2042" title="Northwind Traders · Bonded Import" w={560}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <Pill kind="brand" mono>248 lines</Pill>
            <Pill kind="warning" mono>priority: high</Pill>
            <span style={{ fontSize: 11, color: 'var(--fg-tertiary)' }}>Due Jun 16 · W-02 Tuas</span>
            <span style={{ marginLeft: 'auto' }}><Btn variant="secondary" size="sm" icon="user-check">Assigned to you</Btn></span>
          </div>
          <StepRail
            items={[
              { label: 'Unloading', status: 'active', tag: 'work', sub: 'Inbound crew · 3 users', subMono: false },
              { label: 'Customs docs', status: 'pending', tag: 'file_collection', sub: 'Compliance dept' },
              { label: 'Record quantities', status: 'pending', tag: 'prebuilt', sub: 'Assigned · Sam O.' },
              { label: 'Update inventory', status: 'system', tag: 'system', sub: 'Auto — no assignee' },
              { label: 'Generate GRN', status: 'system', tag: 'system', sub: 'Auto — no assignee' },
              { label: 'Supervisor sign-off', status: 'pending', tag: 'approval', sub: 'Supervisor' },
            ]}
          />
        </Screen>
      </Step>

      {/* 6 — Manual steps: docs + put-away fan-out */}
      <Step
        n={6}
        actor="operator"
        title="Work the manual steps — docs & put-away"
        note="A file_collection step gates the flow on customs paperwork. A put-away work step fans out into one task per destination zone, each auto-assigned to that zone's put-away team — the step closes only when every zone task is done."
        transition={{ label: 'job_tasks.status', steps: [{ k: 'info', t: 'in_progress' }, { k: 'success', t: 'completed' }] }}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="JOB-2042 · Step 2" title="Customs docs" w="100%">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, border: '1px solid var(--success-border)', borderRadius: 6, padding: '8px 10px', background: 'var(--success-bg)' }}>
                <i data-lucide="check-circle-2" style={{ width: 15, height: 15, color: '#16A34A', flexShrink: 0 }}></i>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11.5, fontWeight: 600 }}>Customs Declaration Form</div><div style={{ fontSize: 10, color: '#166534' }}>customs-decl-NW2042.pdf · mandatory</div></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, border: '1.5px dashed var(--border-default)', borderRadius: 6, padding: '8px 10px', background: 'var(--slate-25)' }}>
                <i data-lucide="upload" style={{ width: 15, height: 15, color: 'var(--fg-muted)', flexShrink: 0 }}></i>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 11.5, fontWeight: 600 }}>Duty Payment Receipt</div><div style={{ fontSize: 10, color: 'var(--fg-tertiary)' }}>mandatory · not uploaded</div></div>
              </div>
            </div>
            <div style={{ marginTop: 9 }}><Banner kind="warning" icon="lock" title="Step locked">All mandatory documents must be uploaded before this step completes.</Banner></div>
          </Screen>
          <Screen app="operator" crumb="JOB-2042 · Step 1" title="Put-away — fanned by zone" w="100%">
            <MiniTable
              dense
              cols={[{ t: 'Zone', w: '108px' }, { t: 'Items', align: 'right', w: '54px', mono: true }, { t: 'Team', w: '92px' }, { t: 'Status', align: 'right', w: '78px' }]}
              rows={[
                ['Storage A', { t: '218', b: true }, 'Crew A', { pill: 'success', t: 'done' }],
                ['Cold', { t: '24', b: true }, 'Crew B', { pill: 'info', t: 'active' }],
                ['Bonded', { t: '6', b: true }, '—', { pill: 'muted', t: 'pending' }],
              ]}
            />
            <div style={{ marginTop: 9 }}><Banner kind="brand" icon="split" title="1 step → 3 zone tasks">Same flow_step_id, different zone_id. Completes when all three are done.</Banner></div>
          </Screen>
        </ScreenRow>
      </Step>

      {/* 7 — Record quantities + variance */}
      <Step
        n={7}
        actors={['operator', 'supervisor']}
        title="Record received quantities — variance branches"
        note="The record_quantities prebuilt step shows each storage-list line; the operator keys what physically arrived. Stoqr computes received − expected. A match auto-approves; any short or over delivery is held for a supervisor with receiving:approve."
      >
        <Screen app="operator" crumb="JOB-2042 · Step 3" title="Record quantities" w={620}>
          <MiniTable
            cols={[{ t: 'SKU', mono: true, w: '150px' }, { t: 'Expected', align: 'right', w: '78px', mono: true }, { t: 'Received', align: 'right', w: '80px', mono: true }, { t: 'Variance', align: 'right', w: '80px', mono: true }, { t: 'Status', w: '96px', align: 'right' }]}
            rows={[
              ['SKU-049281-NV', { t: '600' }, { t: '600', b: true }, { t: '—', c: '#94A3B8' }, { pill: 'success', t: 'match' }],
              { __sel: true, cells: ['SKU-051104-TR', { t: '240' }, { t: '232', b: true }, { t: '−8', b: true, c: '#DC2626' }, { pill: 'warning', t: 'short' }] },
              ['SKU-062013-AS', { t: '120' }, { t: '124', b: true }, { t: '+4', b: true, c: '#D97706' }, { pill: 'warning', t: 'over' }],
            ]}
          />
        </Screen>
        <div style={{ marginTop: 14 }}>
          <Branch>
            <BranchCol kind="success" label="Variance = 0 → auto">
              <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Received matches expected. The line auto-approves and proceeds to the system steps — no sign-off.</div>
              <Transition label="line" steps={[{ k: 'muted', t: 'none', dot: false }, { k: 'success', t: 'approved' }]} />
            </BranchCol>
            <BranchCol kind="warning" label="Short / over → approval">
              <div style={{ fontSize: 11.5, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 10 }}>Discrepancy held for a supervisor. They approve the variance (or send for recount) before inventory updates.</div>
              <Transition label="variance_status" steps={[{ k: 'warning', t: 'short' }, { k: 'info', t: 'pending_approval' }, { k: 'success', t: 'approved' }]} />
            </BranchCol>
          </Branch>
        </div>
      </Step>

      {/* 8 — System steps */}
      <Step
        n={8}
        actor="system"
        title="System steps run: inventory + GRN"
        note="With quantities approved, the two system steps fire automatically. update_inventory writes stock and mints anti-theft QR codes; generate_grn produces one Goods Received Note per Job. No human touches either."
        transitions={[
          { label: 'inventory_stocks.status', steps: [{ k: 'muted', t: 'created', dot: false }, { k: 'success', t: 'available' }] },
          { label: 'goods_received_notes.status', steps: [{ k: 'muted', t: 'created', dot: false }, { k: 'success', t: 'accepted' }] },
        ]}
      >
        <ScreenRow cols="minmax(0,0.95fr) minmax(0,1.05fr)">
          <Screen app="operator" title="System run" w="100%">
            <StepRail
              compact
              items={[
                { label: 'update_inventory', status: 'done', tag: 'system', sub: '+956 units · 3 stock rows · QR minted', subMono: false },
                { label: 'generate_grn', status: 'done', tag: 'system', sub: 'GRN-5567 created (1 per Job)' },
              ]}
            />
            <div style={{ marginTop: 8 }}><Banner kind="info" icon="qr-code">Each inventory_stocks row carries its own anti-theft QR for downstream picks and counts.</Banner></div>
          </Screen>
          <Screen app="operator" crumb="GRN" title="GRN-5567" w="100%">
            <KV k="Job" v="JOB-2042" mono />
            <KV k="Client" v="Northwind Traders" />
            <KV k="Warehouse" v="W-02 · Tuas" />
            <KV k="Lines accepted" v="246 / 248" mono />
            <KV k="Variances resolved" v="2" mono />
            <KV k="Status" v="accepted" kind="success" mono />
          </Screen>
        </ScreenRow>
      </Step>

      {/* 9 — Sign-off + client visibility */}
      <Step
        n={9}
        actors={['supervisor', 'client']}
        last
        title="Sign-off — and the client sees it land"
        note="The supervisor's approval step closes the Job. Throughout, the client has watched step-level progress in their portal; now it reads Stored, with the GRN available to view."
        transition={{ label: 'jobs.status', steps: [{ k: 'brand', t: 'in_progress' }, { k: 'success', t: 'completed' }] }}
      >
        <ScreenRow cols="minmax(0,1fr) minmax(0,1fr)">
          <Screen app="operator" crumb="JOB-2042 · Step 6" title="Supervisor sign-off" w="100%">
            <div style={{ fontSize: 12, color: 'var(--fg-secondary)', lineHeight: 1.5, marginBottom: 11 }}>All tasks complete · GRN-5567 issued · 2 variances approved. Confirm to close the Job.</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn variant="success" icon="check">Approve &amp; close</Btn>
              <Btn variant="secondary" icon="rotate-ccw">Reject &amp; reopen</Btn>
            </div>
            <div style={{ marginTop: 10 }}><Banner kind="info" icon="info">Reject requires a reason and reopens the flagged step — the Job pauses, owner is notified.</Banner></div>
          </Screen>
          <Screen app="client" crumb="Northwind Traders" title="Inbound · JOB-2042" w="100%">
            <StepRail
              compact
              items={[
                { label: 'Job created', status: 'done', sub: 'Jun 14, 9:02 AM' },
                { label: 'Unloading', status: 'done' },
                { label: 'Receiving & checks', status: 'done' },
                { label: 'Stored', status: 'active', sub: '246 units now on hand' },
              ]}
            />
            <div style={{ marginTop: 9 }}><Btn variant="secondary" size="sm" icon="file-text" full>View GRN-5567</Btn></div>
          </Screen>
        </ScreenRow>
      </Step>
    </Flow>
  );
}
window.Flow2 = Flow2;
