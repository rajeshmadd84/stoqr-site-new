"use client";

/* ============================================================
   Stoqr — landing page (Next.js App Router, client component)

   Usage:
     - Styles live in ./stoqr.css. They are imported from app/page.tsx
       (Next allows global CSS imports from a route/layout). If you'd
       rather load fonts via next/font, delete the @import line at the
       top of stoqr.css and wire Space Grotesk / Inter / JetBrains Mono
       / Archivo Black through next/font in app/layout.tsx instead.
     - This file is a client component (needs state for the mobile menu
       and an IntersectionObserver for scroll reveals).
   ============================================================ */

import { useEffect, useState } from "react";
import Image from "next/image";

/* ---------- content (edit copy here) ---------- */

const PILOT_URL = "/pilot";
const LINKEDIN_URL = "https://www.linkedin.com/company/getstoqr";

const navLinks = [
  { href: "#platform", label: "Platform" },
  { href: "#how", label: "How it works" },
  { href: "#modules", label: "Modules" },
  { href: "#agentic", label: "Agentic AI" },
  { href: "#contact", label: "Contact" },
];

const rackPattern: string[][] = [
  ["full pulse", "", "full", "full pulse", "", "full", "", "full"],
  ["full", "full pulse", "", "full", "", "full", "full pulse", ""],
  ["", "full", "full pulse", "", "full", "", "full", "full"],
];

const problems = [
  {
    id: "ISSUE 01",
    h: "Manual everything",
    p: "Storage lists keyed in by hand. GRNs chased over email. Pick paths worked out on the floor. Your team moves paper, not pallets — and every handoff is a place for error to hide.",
  },
  {
    id: "ISSUE 02",
    h: "No live view",
    p: "Inventory lives in three spreadsheets and one supervisor's head. Clients call to ask where their goods are. So do you. By the time the answer arrives, it's already stale.",
  },
  {
    id: "ISSUE 03",
    h: "Billing that leaks",
    p: "3PL charges get reconstructed from memory at month-end. Storage days, handling steps, and spare-part fees slip through. You're shipping value you never invoice.",
  },
];

const pipeline = [
  {
    zone: "Zone 01 · Inbound",
    h: "Receive",
    p: "Drop a client's storage list as Excel or CSV. Stoqr parses it against your column mapping, creates a receiving job, and runs it through your flow.",
    flow: [
      { b: "Record quantities", t: " + flag variances" },
      { b: "Update inventory", t: " to addressed bins" },
      { b: "Generate GRN", t: " · supervisor sign-off" },
    ],
  },
  {
    zone: "Zone 02 · Storage",
    h: "Store & track",
    p: "Every unit gets a QR-addressed home — down to floor, zone, aisle, rack, and level. Track by batch, lot, or serial with FEFO allocation, or store pallets and containers without ever opening them.",
    flow: [
      { b: "Pallet & container", t: " tracking" },
      { b: "Cycle counts", t: " · ABC velocity" },
      { b: "Bonded zones", t: " for customs stock" },
    ],
  },
  {
    zone: "Zone 03 · Outbound",
    h: "Pick, pack & dispatch",
    p: "A packing list becomes an outbound job. Stoqr builds a location-ordered pick path, verifies every scan on pack, deducts stock, and produces a dispatch note with carrier and tracking.",
    flow: [
      { b: "FEFO / FIFO", t: " pick lists" },
      { b: "Scan-verified", t: " packing" },
      { b: "Dispatch note", t: " · carrier + tracking" },
    ],
  },
];

const modules = [
  {
    id: "Module · Inventory",
    h: "Inventory & warehouse layout",
    p: "Map every warehouse to the bin. Multi-floor zones, QR-addressed locations, and a full storage-rules engine for dimensions, weight, temperature, and hazmat. Track SKUs to the each, or whole pallets you store and forward.",
    tags: ["QR-addressed", "FEFO / FIFO", "Batch · Lot · Serial"],
    hPrimary: true,
  },
  {
    id: "Module · Inbound",
    h: "Inbound & receiving",
    p: "From storage list to shelf. Stoqr parses incoming files, opens a job, and walks it through receiving — quantities, variances, document checks, inventory update, and an auto-generated GRN.",
    tags: ["File parsing", "Variance flags", "Auto GRN"],
    hPrimary: true,
  },
  {
    id: "Module · Outbound",
    h: "Outbound & dispatch",
    p: "Pick, pack, dispatch. Location-ordered pick lists, scan-verified packing, automatic stock deduction, and dispatch notes carrying carrier, vehicle, driver, and tracking — visible to clients live.",
    tags: ["Pick paths", "Pack scanning", "Carrier + tracking"],
    hPrimary: true,
  },
  {
    id: "Module · Procurement",
    h: "Item requests & procurement",
    p: "Clients ask, Stoqr sources. Requests flow through sourcing, PO, and receipt against a full supplier directory. Delivered POs auto-chain into an inbound job, then an outbound job on ship date.",
    tags: ["Supplier directory", "PO lifecycle", "Auto-chaining"],
    hPrimary: true,
  },
  {
    id: "Module · Maritime",
    h: "Ship spares & bonded storage",
    p: "Built for maritime clients. Track vessels by IMO, reserve parts to a specific ship, and clear customs inside the flow — TradeNet permits and Ship Stores Declarations as mandatory steps, bonded stock by zone.",
    tags: ["IMO vessels", "TradeNet", "Bonded"],
    hPrimary: true,
  },
  {
    id: "Module · Billing",
    h: "Billing & invoicing",
    p: "Every move, metered. Step-level job billing, daily-snapshot storage billing, a wallet ledger for each debit and credit, and one auto-generated invoice per cycle — PDF in the cloud, corrections without rewriting history.",
    tags: ["Job + storage", "Wallet ledger", "Auto invoice"],
    hPrimary: true,
  },
  {
    id: "Module · Compliance",
    h: "Compliance & audit",
    p: "Region-locked by design. GDPR, PDPA, and DPDPA built in — consent records, DSAR workflows with deadline tracking, breach timelines, and an immutable, hash-chained audit log of every action.",
    tags: ["DSAR", "Hash-chained log", "Data residency"],
    hPrimary: true,
  },
  {
    id: "Module · Client portal",
    h: "Client portal",
    p: "Your customers, self-served. A read-only window onto inventory, inbound, outbound, and invoices — with per-client visibility you control. One login spans every vendor a client works with.",
    tags: ["Read-only views", "Per-client control", "Cross-vendor"],
    hPrimary: true,
  },
  {
    id: "Layer · Agentic",
    h: "The agentic layer",
    p: "Agents sit on top of every flow — watching jobs, reasoning about exceptions, and acting. They reallocate short picks, flag variances, retry failed steps, and escalate only what needs a human.",
    tags: ["Observe", "Reason", "Act"],
    hPrimary: true,
  },
];

const segments = [
  {
    tier: "Starter",
    h: "SMB warehouses",
    who: "Single-site operators who want to retire the spreadsheets.",
    points: ["Full WMS: layout, inbound, outbound", "QR labels and cycle counts", "Self-serve onboarding"],
    iso: "// Shared DB · row-level isolation",
    hPrimary: true,
  },
  {
    tier: "Professional",
    h: "Third-party logistics",
    who: "3PLs juggling many clients, many service types, one floor.",
    points: ["Per-client billing & invoicing", "Client portal with controlled visibility", "Bonded, maritime & procurement flows"],
    iso: "// Schema-per-tenant isolation",
    feat: true,
    hPrimary: true,
  },
  {
    tier: "Enterprise",
    h: "Enterprise & regulated",
    who: "Operations that need their data in their own region, full stop.",
    points: ["Dedicated database, optionally self-hosted", "SSO, granular RBAC & audit", "GDPR / PDPA / DPDPA residency"],
    iso: "// Dedicated DB · EU · SG · IN",
    hPrimary: true,
  },
];

const compliance = [
  { ct: "Residency", h: "Region-locked data", p: "Personal data never leaves its region. Only non-PII metadata syncs across EU, Singapore, and Mumbai." },
  { ct: "Subject rights", h: "DSAR workflows", p: "Access, erasure, rectification, and portability — with regime-specific deadline tracking built in." },
  { ct: "Audit", h: "Immutable log", p: "Every action lands in an append-only, hash-chained audit log — IP, actor, and timestamp, partitioned by month." },
  { ct: "Access", h: "Scoped by design", p: "Warehouse-scoped RBAC, SSO and MFA, single-use refresh tokens, and per-tenant security policy." },
];

const team = [
  { initials: "RM", name: "Rajesh Maddineni", role: "Co-Founder & CEO" },
  { initials: "TS", name: "Tahrun Sai Kalimili", role: "Co-Founder & CTO" },
  { initials: "DY", name: "Deepesh Yenuga", role: "Co-Founder & CPO" },
  { initials: "HS", name: "Hari Sagaran", role: "CGO" },
];

const agentLog = [
  { t: "09:14:02", body: <>Pick list built · <span className="ag">14 lines</span> · ordered by location</> },
  { t: "09:14:09", act: true, body: <><span className="ag">⚠ short pick</span> at F2-A03-R12-L4 · qty 6 of 10</> },
  { t: "09:14:10", body: <>Agent → reallocating from F2-B07-R04-L2</> },
  { t: "09:14:11", body: <><span className="ok">✓ resolved</span> · line complete · no hold</> },
  { t: "09:18:44", body: <>Pack verified · <span className="ag">3 cartons</span> · 41.2 kg</> },
  { t: "09:19:01", body: <>Stock deducted · dispatch note <span className="ag">DSP-2207</span></> },
  { t: "09:19:02", act: true, body: <><span className="ok">✓ job complete</span> · billed to wallet</> },
];

/* ---------- small pieces ---------- */

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="var(--brand-blue)" strokeWidth="1.5" />
      <path d="M6 10l2.5 2.5L14 7" stroke="var(--brand-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="sq-wrap nav-inner">
        <a href="#top" className="brand">
          <Image src="/images/logo.svg" alt="Stoqr" width={120} height={36} priority />
        </a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a href={PILOT_URL} className="sq-btn sq-btn-primary">
            Start a pilot <span className="arw">→</span>
          </a>
          <button
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

function WarehouseFloor() {
  return (
    <div className="floor" aria-hidden="true">
      <div className="floor-bar">
        <span>Warehouse Floor — WH-SG-01</span>
        <span className="live">
          <i />
          LIVE
        </span>
      </div>
      <div className="floor-body">
        <div className="dock in">
          <div className="chev">
            <span />
            <span />
            <span />
          </div>
          <div className="dlabel">
            Inbound
            <br />
            Dock
          </div>
          <div className="dval">DOOR&nbsp;3</div>
        </div>
        <div className="racks">
          {rackPattern.map((row, i) => (
            <div className="rack-row" key={i}>
              <span className="rack-tag">RACK&nbsp;{String.fromCharCode(65 + i)}</span>
              <div className="bins">
                {row.map((cls, j) => (
                  <div className={`bin${cls ? " " + cls : ""}`} key={j} />
                ))}
              </div>
            </div>
          ))}
          <div className="flow-lane">
            {[0, 1.4, 2.9, 4.2].map((d, i) => (
              <span className="pellet" key={i} style={{ animationDelay: `${d}s` }} />
            ))}
          </div>
        </div>
        <div className="dock out">
          <div className="chev">
            <span />
            <span />
            <span />
          </div>
          <div className="dlabel">
            Outbound
            <br />
            Dispatch
          </div>
          <div className="dval">CARRIER</div>
        </div>
      </div>
      <div className="ticker">
        <span>
          <b>F2-A03-R12-L4</b> · stored
        </span>
        <span>
          <b>GRN-4471</b> · generated
        </span>
        <span>
          IMO <b>9385412</b> · MV Pacific Star
        </span>
        <span>
          <b>DSP-2207</b> · dispatched
        </span>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function StoqrLanding() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="stoqr-root" id="top">
      <Nav />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid-bg" />
          <div className="sq-wrap hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Warehousing &amp; Transport · Agentic AI</span>
              <h1>
                Your warehouse,<br />
                on <span style={{ color: "var(--brand-blue)" }}>autopilot.</span>
              </h1>
              <p className="hero-sub">
                Stoqr is an agentic platform for warehousing and transport. AI agents receive, store, pick, pack,
                dispatch, and bill — across every zone, in every region.
              </p>
              <div className="hero-actions">
                <a href={PILOT_URL} className="sq-btn sq-btn-primary">
                  Start a pilot <span className="arw">→</span>
                </a>
                <a href="#how" className="sq-btn sq-btn-ghost">
                  See how it works
                </a>
                
              </div>
            </div>
            <WarehouseFloor />
          </div>
        </section>

        {/* TRUST */}
        <div className="trust">
          <div className="sq-wrap trust-inner">
            <span className="trust-label">One platform · floor to invoice</span>
            <div className="trust-items">
              <span>
                Fulfilment <b>+</b> 3PL storage
              </span>
              <span>
                Bonded <b>+</b> maritime
              </span>
              <span>GDPR · PDPA · DPDPA</span>
              <span>
                <b>SG</b> · <b>IN</b> · <b>UAE</b>
              </span>
            </div>
          </div>
        </div>

        {/* PROBLEM */}
        <section className="problem sec" id="platform">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow eyebrow-danger">The cost of the floor</span>
              <h2>Warehouses don&rsquo;t lose money on rent. <span style={{ color: "var(--danger)" }}>They lose it on operations.</span></h2>
              <p>
                Racking is the cheap part. The expensive part is everything that happens between the inbound dock and
                the invoice — and most of it still runs on paper, spreadsheets, and memory.
              </p>
            </div>
            <div className="prob-grid">
              {problems.map((c) => (
                <div className="prob-card reveal" key={c.id}>
                  <div className="prob-num">{c.id}</div>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="sec" id="how">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">How Stoqr works</span>
              <h2>Goods flow in, get stored, flow out — and <span style={{ color: "var(--brand-blue)" }}>Stoqr runs every step.</span></h2>
              <p>
                Every operation in Stoqr is a <b style={{ color: "var(--fg-primary)" }}>flow</b>: an ordered sequence of
                steps your team defines once. Upload a list, Stoqr spins up a job, and agents execute it — recording
                quantities, validating documents, updating stock, and generating the paperwork automatically.
              </p>
            </div>
            <div className="pipe-grid">
              {pipeline.map((s) => (
                <div className="pipe-step reveal" key={s.zone}>
                  <div className="pipe-zone">{s.zone}</div>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                  <ul className="pipe-flow">
                    {s.flow.map((f, i) => (
                      <li key={i}>
                        <b>{f.b}</b>
                        {f.t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section className="sec problem" id="modules">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The platform</span>
              <h2>One system, from the <span style={{ color: "var(--brand-blue)" }}>inbound dock to the invoice.</span></h2>
              <p>
                Eight modules built on a single flow engine and one source of inventory truth. Run fulfilment and 3PL
                storage in the same building — service type is set per job, not per client.
              </p>
            </div>
            <div className="mod-grid">
              {modules.map((m) => (
                <div className="mod reveal" key={m.h}>
                  <div className="mod-id">{m.id}</div>
                  <h3 style={m.hPrimary ? { color: "var(--brand-blue)" } : undefined}>{m.h}</h3>
                  <p>{m.p}</p>
                  <div className="tags">
                    {m.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENTIC */}
        <section className="agent sec" id="agentic">
          <div className="sq-wrap agent-wrap">
            <div className="agent-copy reveal">
              <span className="eyebrow">The agentic layer</span>
              <h2>Flows aren&rsquo;t checklists. <span style={{ color: "var(--brand-blue)" }}>They&rsquo;re agents.</span></h2>
              <p>
                A flow in Stoqr isn&rsquo;t a static set of boxes to tick. Each job is watched by AI agents that
                understand what the step is for, notice when something&rsquo;s wrong, and act on it — before a human
                has to.
              </p>
              <p>
                The platform is backed by a logistics-trained small language model that sharpens with every job your
                warehouse runs. The more you operate, the better it gets at the work.
              </p>
              <ul className="agent-list">
                <li>
                  <Check />
                  <span>
                    <b style={{ color: "var(--brand-blue)" }}>Self-healing jobs.</b> Short pick on a line? The agent reallocates from another location and
                    keeps the job moving instead of stalling for a supervisor.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b style={{ color: "var(--brand-blue)" }}>Exceptions, not everything.</b> Variances get flagged, retries get attempted, and only the
                    genuinely unusual reaches a person. Your team manages the edge cases, not the routine.
                  </span>
                </li>
                <li>
                  <Check />
                  <span>
                    <b style={{ color: "var(--brand-blue)" }}>A data flywheel.</b> Every receipt, pick, and dispatch trains the model on your operation — so
                    forecasts, allocations, and routing get sharper over time.
                  </span>
                </li>
              </ul>
            </div>
            <div className="agent-panel reveal" aria-hidden="true">
              <div className="ap-head">
                <span>Agent log · JOB-8842</span>
                <span>OUTBOUND</span>
              </div>
              {agentLog.map((line, i) => (
                <div className={`ap-line${line.act ? " act" : ""}`} key={i}>
                  <span className="t">{line.t}</span>
                  <span>{line.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEGMENTS */}
        <section className="sec" id="segments">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Built for the way you operate</span>
              <h2>From a single warehouse to a multi-region 3PL.</h2>
              <p>
                Stoqr scales its isolation to your size — shared, schema-isolated, or a dedicated database — so a
                small operator and an enterprise run on the same product with the data boundaries each one needs.
              </p>
            </div>
            <div className="seg-grid">
              {segments.map((s) => (
                <div className={`seg reveal${s.feat ? " feat" : ""}`} key={s.h}>
                  <div className="tier">{s.tier}</div>
                  <h3>{s.h}</h3>
                  <p className="who">{s.who}</p>
                  <ul>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="iso">{s.iso}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPLIANCE */}
        <section className="sec problem">
          <div className="sq-wrap">
            <div className="sec-head center reveal">
              <span className="eyebrow">Trust &amp; residency</span>
              <h2>Compliance isn&rsquo;t a bolt-on.</h2>
              <p>
                It&rsquo;s wired into the data model — so the goods, the documents, and the audit trail all stay where
                they&rsquo;re supposed to.
              </p>
            </div>
            <div className="comp">
              {compliance.map((c) => (
                <div className="comp-card reveal" key={c.h}>
                  <div className="ct">{c.ct}</div>
                  <h4>{c.h}</h4>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="sec" id="team">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The team</span>
              <h2>People behind Stoqr</h2>
              <p>Operators and builders shipping warehousing software out of Bangalore and Singapore.</p>
            </div>
            <div className="team-grid">
              {team.map((p) => (
                <div className="person reveal" key={p.name}>
                  <div className="avatar">{p.initials}</div>
                  <h4>{p.name}</h4>
                  <div className="role">{p.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFICES + CONTACT */}
        <section className="sec sec-alt" id="contact">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">Get in touch</span>
              <h2>Where to find us</h2>
              <p>Reach out directly, or drop by our Singapore office.</p>
            </div>
            <div className="office-grid">
              <div className="office reveal">
                <div className="flag">HQ</div>
                <h4>Stoqr Singapore Pte. Ltd.</h4>
                <address>
                  #15-01,MIDDLE ROAD, FORTUNE CENTRE
                  <br />
                  Singapore 188979
                </address>
                <div className="reg">UEN: 202628772K</div>
              </div>
              <div className="office reveal">
                <div className="flag">Contact</div>
                <h4>Say hello</h4>
                <address>
                  Email: <a href="mailto:hello@getstoqr.com">hello@getstoqr.com</a>
                  <br />
                  Telephone: <a href="tel:+6590413331">+65 9041 3331</a>
                </address>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-bg" />
          <div className="sq-wrap">
            <div className="cta-inner reveal">
              <span className="eyebrow" style={{ justifyContent: "center" }}>
                Start a pilot
              </span>
              <h2>
                See Stoqr run
                <br />
                your <span style={{ color: "var(--brand-blue-bright)" }}>warehouse.</span>
              </h2>
              <p>
                Put one flow on autopilot and watch it work — from the inbound dock to the invoice. 
              </p>
              <div className="cta-actions">
                <a href={PILOT_URL} className="sq-btn sq-btn-primary">
                  Start a pilot <span className="arw">→</span>
                </a>
                <a href={LINKEDIN_URL} className="sq-btn sq-btn-ghost">
                  Follow on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="foot">
        <div className="sq-wrap foot-inner">
          <div className="foot-left">
            <span className="foot-brand">STOQR</span>
            <span className="foot-copy">© 2026 Stoqr Singapore Pte. Ltd. All rights reserved.</span>
          </div>
          <div className="foot-right">
            <a href={LINKEDIN_URL}>LinkedIn ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
