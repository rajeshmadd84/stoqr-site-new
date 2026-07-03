"use client";

/* ============================================================
   Stoqr — Transport / Logistics Agentic AI (Freight Quotation Agent)

   Shares the site's header, footer, and design system (./stoqr.css)
   with the rest of the app — see app/transport/page.tsx.
   ============================================================ */

import { Fragment, useEffect } from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";

/* ---------- content (edit copy here) ---------- */

const PILOT_URL = "/pilot";
const LINKEDIN_URL = "https://www.linkedin.com/company/getstoqr";

const problems = [
  { id: "ISSUE 01", h: "Latency", p: "Decomposing a shipment, contacting several partners per leg, and chasing replies takes hours to days. The forwarder who answers fastest with a competitive price usually wins the business." },
  { id: "ISSUE 02", h: "Manual effort", p: "Skilled staff spend a large share of the day reading, copying, and re-emailing rates — not on the judgement and relationship work that actually adds value." },
  { id: "ISSUE 03", h: "Inconsistency", p: "Which legs get priced, which partners get asked, and what margin gets applied all depend on who is at the desk. Quotes get mis-transcribed; options get missed." },
  { id: "ISSUE 04", h: "No memory", p: "Rates, partner performance, and negotiation history sit scattered across mailboxes, so the business cannot easily learn from its own data." },
];

const zones = [
  {
    zone: "Stage 01 · Intake",
    h: "Read & structure",
    p: "The Agent watches the inbox, classifies each message's intent, and turns free text into a structured shipment — then breaks it into its service legs.",
    flow: [
      { b: "Classify intent", t: " · RFQ, selection, negotiation" },
      { b: "Extract shipment", t: " · origin, mode, commodity" },
      { b: "Decompose", t: " into ordered service legs" },
    ],
  },
  {
    zone: "Stage 02 · Sourcing",
    h: "Source the rates",
    p: "For every leg, the Agent selects suitable partners from your registry, dispatches RFQs, and normalises the heterogeneous replies into comparable end-to-end options.",
    flow: [
      { b: "Match partners", t: " · capability · lane · mode" },
      { b: "Dispatch RFQs", t: " · track outstanding" },
      { b: "Evaluate & consolidate", t: " · normalise quotes" },
    ],
  },
  {
    zone: "Stage 03 · Quote & book",
    h: "Quote & commit",
    p: "Margin is applied, options are ranked, and a clear quote goes to the client behind an approval gate. On selection it books; on a counter-offer it negotiates within guardrails.",
    flow: [
      { b: "Apply margin", t: " · rank options" },
      { b: "Send quotation", t: " · approval gate" },
      { b: "Confirm booking", t: " · or bounded negotiation" },
    ],
  },
];

const orchestrator = {
  id: "ORCHESTRATOR",
  h: "Coordinator",
  p: "Maintains workflow state as an explicit state machine, routes each message to the right specialist, enforces approval checkpoints, and guarantees every shipment moves through a well-defined lifecycle. Agents share a versioned workflow state — not free-form chat — so every transition is predictable and auditable.",
};

const workers = [
  { id: "AGENT · 01", h: "Intake & Intent", p: "Classifies the intent of each incoming email and extracts a structured shipment request from free text.", tags: ["Intent", "Extraction"] },
  { id: "AGENT · 02", h: "Shipment Decomposition", p: "Breaks a shipment into its ordered service components using a service-component ontology plus LLM reasoning over its attributes.", tags: ["Ontology", "Legs"] },
  { id: "AGENT · 03", h: "Partner Matching", p: "Selects candidate partners for each component from the registry by capability, lane, mode, and service level — aided by retrieval.", tags: ["Registry", "Retrieval"] },
  { id: "AGENT · 04", h: "RFQ Dispatch", p: "Composes and sends a request for quotation to each selected partner per component, and tracks which requests are still outstanding.", tags: ["RFQ", "Tracking"] },
  { id: "AGENT · 05", h: "Quote Evaluation", p: "Parses partner replies; extracts and normalises price, currency, lead time, validity, and conditions; aggregates component quotes into options.", tags: ["Parse", "Normalise"] },
  { id: "AGENT · 06", h: "Pricing & Margin", p: "Applies configurable markup rules and ranks the consolidated options by price and lead time.", tags: ["Margin", "Ranking"] },
  { id: "AGENT · 07", h: "Client Communication", p: "Drafts the client-facing quotation and any follow-up correspondence in a clear, consistent format.", tags: ["Quotation"] },
  { id: "AGENT · 08", h: "Negotiation", p: "Conducts bounded negotiation on a client's counter-offer, within configured floors and round limits.", tags: ["Guardrails"] },
  { id: "AGENT · 09", h: "Booking & Confirmation", p: "On selection, confirms the booking with each chosen partner and records the confirmations received.", tags: ["Booking", "Confirm"] },
];

const legs: { n: string; b: string; loc: string; act?: boolean }[] = [
  { n: "01", b: "Origin pickup", loc: "Singapore · reefer haulier" },
  { n: "02", b: "Export customs", loc: "Singapore · customs broker" },
  { n: "03", b: "Origin handling", loc: "SIN · GDP airport handler" },
  { n: "04", b: "Main leg — air", loc: "SIN → HAM · temp-controlled ULD", act: true },
  { n: "05", b: "Import customs", loc: "Hamburg · customs broker" },
  { n: "06", b: "Destination handling", loc: "HAM · cold-chain handler" },
  { n: "07", b: "Final delivery", loc: "Hamburg · reefer haulier" },
];

const hitl = [
  { b: "Approval gates.", t: " Nothing commits before review at the two points that matter — the client quotation, and every partner booking." },
  { b: "Confidence-scored.", t: " Every extraction and decomposition carries a confidence score; anything below your threshold is routed to a review queue." },
  { b: "Bounded negotiation.", t: " A floor margin, a maximum discount, and a round limit — beyond which the Agent escalates to a person." },
  { b: "Full audit trail.", t: " Every agent action, tool call, and human decision is written to an immutable log." },
  { b: "Assisted or autonomous.", t: " Review every quote, or let low-value, high-confidence cases flow on their own. You set the dial." },
];

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="var(--brand-blue)" strokeWidth="1.5" />
      <path d="M6 10l2.5 2.5L14 7" stroke="var(--brand-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ffStages = [
  { key: "inbox", lbl: "Client email", val: "intent →", icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5" strokeWidth="1.4" /><path d="M3 6l7 5 7-5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { key: "decompose", lbl: "Decompose", val: "7 legs", icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h5m0 0 3-4h4m-4 4 3 4h4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
  { key: "dispatch", lbl: "RFQ dispatch", val: "11 partners", icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M18 2 2 9l6 2.4L18 2 8.4 11.4 11 18 18 2Z" strokeWidth="1.3" strokeLinejoin="round" /></svg>) },
  { key: "evaluate", lbl: "Quotes in", val: "9 parsed", icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3.5" width="14" height="13" rx="1.5" strokeWidth="1.4" /><path d="M6 8h8M6 11h8M6 14h5" strokeWidth="1.4" strokeLinecap="round" /></svg>) },
  { key: "rank", lbl: "Rank + margin", val: "2 options", icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 15V9M10 15V5M15 15v-3.5" strokeWidth="1.7" strokeLinecap="round" /></svg>) },
  { key: "book", lbl: "Booking", val: "held", on: true, icon: (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.4" strokeWidth="1.4" /><path d="M6.5 10l2.4 2.4 4.6-5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>) },
];

function FreightFlow() {
  return (
    <div className="floor" aria-hidden="true">
      <div className="floor-bar">
        <span>Freight Quotation Flow · RFQ-4471</span>
        <span className="live">
          <i />
          LIVE
        </span>
      </div>
      <div className="ff-body">
        <div className="ff-rail">
          {ffStages.map((s, i) => (
            <Fragment key={s.key}>
              <div className={`ff-stage${s.on ? " on" : ""}`}>
                <div className="ff-ic">{s.icon}</div>
                <div className="ff-lbl">{s.lbl}</div>
                <div className="ff-val">{s.val}</div>
              </div>
              {i < ffStages.length - 1 && (
                <div className="ff-conn">
                  <span className="ff-dot" style={{ animationDelay: `${i * 0.45}s` }} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="ticker">
        <span>
          <b>RFQ-4471</b> · dispatched to 11 partners
        </span>
        <span>
          Quote <b>SGD 4,820</b> · SIN → HAM air
        </span>
        <span>
          <b>2 options</b> · ranked + margin
        </span>
        <span>
          <b>Booking</b> · awaiting sign-off
        </span>
      </div>
    </div>
  );
}

export default function TransportPage() {
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
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid-bg" />
          <div className="sq-wrap hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Logistics Agentic AI · Freight Forwarding</span>
              <h1>
                Freight quotes, from inbox to booking. On <span style={{ color: "var(--brand-blue)" }}>autopilot.</span>
              </h1>
              <p className="hero-sub">
                The Freight Quotation Agent is a Stoqr module that reads a client&rsquo;s email, decomposes the shipment
                into its service legs, sources rates from your partners, and returns a ranked, margin-applied quote —
                with your team in control of every commitment.
              </p>
              <div className="hero-actions">
                <a href={PILOT_URL} className="sq-btn sq-btn-primary">
                  Start a pilot <span className="arw">→</span>
                </a>
                <a href="#how" className="sq-btn sq-btn-ghost">
                  See how it works
                </a>
                <span className="hero-note">// A Stoqr module · pilot stage</span>
              </div>
            </div>
            <FreightFlow />
          </div>
        </section>

        {/* TRUST */}
        <div className="trust">
          <div className="sq-wrap trust-inner">
            <span className="trust-label">One loop · email to booking</span>
            <div className="trust-items">
              <span>Air · Ocean · Road</span>
              <span>
                RFQ <b>→</b> Quote <b>→</b> Booking
              </span>
              <span>Human-in-the-loop</span>
              <span>
                <b>SG</b> · Asia
              </span>
            </div>
          </div>
        </div>

        {/* PROBLEM */}
        <section className="problem sec" id="why">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The cost of the inbox</span>
              <h2>A freight quote still means a dozen emails and a day of waiting.</h2>
              <p>
                Forwarders coordinate international shipments over free-form email — reading requests, breaking them into
                legs, chasing partner rates, and re-keying replies. It is slow, labour-intensive, and inconsistent, and
                a late quote often costs the business.
              </p>
            </div>
            <div className="fqa-grid2">
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

        {/* HOW / WORKFLOW */}
        <section className="sec" id="how">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The quotation loop</span>
              <h2>One inbound email, run end to end.</h2>
              <p>
                A client email arrives and the Agent takes it through the whole loop — intake and decomposition,
                sourcing and evaluation, then a ranked quote, booking, and bounded negotiation. Every path ends in a
                logged, closed state.
              </p>
            </div>
            <div className="pipe-grid">
              {zones.map((s) => (
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

        {/* AGENTS */}
        <section className="sec problem" id="agents">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The multi-agent team</span>
              <h2>An orchestrator and nine specialists.</h2>
              <p>
                Rather than one monolithic model, responsibility is split across a coordinator and nine worker agents,
                each with a narrow, testable remit — so behaviour stays predictable and every step is auditable.
              </p>
            </div>
            <div className="mod feat reveal" style={{ marginBottom: "1.1rem" }}>
              <div className="mod-id">{orchestrator.id}</div>
              <h3>{orchestrator.h}</h3>
              <p>{orchestrator.p}</p>
            </div>
            <div className="mod-grid">
              {workers.map((m) => (
                <div className="mod reveal" key={m.h}>
                  <div className="mod-id">{m.id}</div>
                  <h3>{m.h}</h3>
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

        {/* DECOMPOSITION */}
        <section className="sec" id="decomposition">
          <div className="sq-wrap agent-wrap">
            <div className="agent-copy reveal">
              <span className="eyebrow">Decomposition</span>
              <h2>Every shipment, broken into priceable legs.</h2>
              <p>
                Decomposition is the heart of the Agent. A shipment becomes an ordered chain of components — each
                separately sourceable and separately priced — grounded in an explicit ontology, so the output is
                consistent and easy to validate against expert-labelled ground truth.
              </p>
              <p>
                Special handling reshapes the chain. Flag a reefer, GDP-pharma, or dangerous-goods requirement and the
                Agent inserts the right tasks, restricts partners to certified providers, and reflects the premium in
                costing.
              </p>
              <a href={PILOT_URL} className="sq-btn sq-btn-primary" style={{ marginTop: "1.6rem" }}>
                Run it on your lane <span className="arw">→</span>
              </a>
            </div>
            <div className="agent-panel reveal" aria-hidden="true">
              <div className="ap-head">
                <span>Decomposition · SIN → HAM</span>
                <span>PHARMA · REEFER</span>
              </div>
              {legs.map((l) => (
                <div className={`ap-line${l.act ? " act" : ""}`} key={l.n}>
                  <span className="t">{l.n}</span>
                  <span>
                    <b style={{ color: "var(--fg-primary)" }}>{l.b}</b> · {l.loc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HUMAN IN THE LOOP */}
        <section className="sec problem" id="governance">
          <div className="sq-wrap agent-wrap">
            <div className="agent-copy reveal">
              <span className="eyebrow">Human-in-the-loop</span>
              <h2>Agents do the legwork. People own the commitments.</h2>
              <p>
                Because the loop ends in commercially binding actions, oversight is a first-class design concern —
                configurable from fully assisted, where a human approves the quotation and every booking, to autonomous
                for low-value, high-confidence cases.
              </p>
              <ul className="agent-list">
                {hitl.map((c, i) => (
                  <li key={i}>
                    <Check />
                    <span>
                      <b>{c.b}</b>
                      {c.t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="agent-panel reveal" aria-hidden="true">
              <div className="ap-head">
                <span>Guardrails · negotiation</span>
                <span>BOUNDED</span>
              </div>
              <div className="ap-line">
                <span className="t">floor</span>
                <span>margin ≥ configured minimum</span>
              </div>
              <div className="ap-line">
                <span className="t">max</span>
                <span>discount ≤ configured cap</span>
              </div>
              <div className="ap-line">
                <span className="t">rounds</span>
                <span>≤ 3, then escalate</span>
              </div>
              <div className="ap-line act">
                <span className="t">gate</span>
                <span>[approval] booking held for review</span>
              </div>
              <div className="ap-line">
                <span className="t">log</span>
                <span>every action written · immutable</span>
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
                See the Agent quote
                <br />
                your <span style={{ color: "var(--brand-blue)" }}>lane.</span>
              </h2>
              <p>
                Point it at a mailbox and a handful of partners, and watch a real RFQ go from inbox to ranked quote. A
                Stoqr module, at pilot stage.
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

      <SiteFooter />
    </div>
  );
}
