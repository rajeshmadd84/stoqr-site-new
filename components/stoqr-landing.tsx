"use client";

/* ============================================================
   Stoqr — home page (overview, Next.js App Router, client component)

   Two product pillars link out to their deep-dive pages:
     • Warehousing → /wms        (wms-page.tsx)
     • Logistics   → /transport  (transport-page.tsx)

   Shares the site's header, footer, and design system (./stoqr.css)
   with the rest of the app — see app/page.tsx.
   ============================================================ */

import { useEffect } from "react";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import WarehouseFloor from "./warehouse-floor";

/* ---------- content (edit copy here) ---------- */

const PILOT_URL = "/pilot";
const LINKEDIN_URL = "https://www.linkedin.com/company/getstoqr";

/* warehousing pillar — job console */
const whLog = [
  { t: "09:14:02", body: <>Pick list built · <span className="ag">14 lines</span> · ordered by location</> },
  { t: "09:14:09", act: true, body: <><span className="ag">⚠ short pick</span> at F2-A03-R12-L4 · qty 6 of 10</> },
  { t: "09:14:10", body: <>Agent → reallocating from F2-B07-R04-L2</> },
  { t: "09:14:11", body: <><span className="ok">✓ resolved</span> · line complete · no hold</> },
  { t: "09:18:44", body: <>Pack verified · <span className="ag">3 cartons</span> · 41.2 kg</> },
  { t: "09:19:02", act: true, body: <><span className="ok">✓ job complete</span> · billed to wallet</> },
];

/* logistics pillar — quotation console */
const fqaLog: { t: string; body: string; act?: boolean }[] = [
  { t: "09:02", body: "Intake — new RFQ · pharma, temp-controlled, air" },
  { t: "09:02", body: "Extract — shipment structured · Singapore → Hamburg" },
  { t: "09:03", body: "Decompose — 7 service legs · pickup → air → delivery" },
  { t: "09:04", body: "Dispatch — 11 RFQs sent · tracking replies" },
  { t: "09:22", body: "Consolidate — 2 end-to-end options · margin applied" },
  { t: "09:23", body: "[approval] quotation ready for review", act: true },
];

const warehousingPoints = [
  { b: "Floor to invoice.", t: " Receive, store, pick, pack, dispatch, and bill — one flow engine, one source of inventory truth." },
  { b: "Live to the bin.", t: " Every unit QR-addressed down to floor, zone, aisle, rack, and level, with FEFO and cycle counts." },
  { b: "Self-healing jobs.", t: " Agents reallocate short picks, flag variances, and escalate only what genuinely needs a human." },
];

const logisticsPoints = [
  { b: "Reads the inbox.", t: " Classifies each email, extracts the shipment, and decomposes it into its priceable service legs." },
  { b: "Sources the rates.", t: " Dispatches RFQs to the right partners per leg, then normalises replies into ranked end-to-end options." },
  { b: "Humans hold the keys.", t: " Approval gates before every quote and booking, with bounded negotiation and a full audit log." },
];

const team = [
  { initials: "RM", name: "Rajesh Maddineni", role: "Co-Founder & CEO" },
  { initials: "TS", name: "Tahrun Sai Kalimili", role: "Co-Founder & CTO" },
  { initials: "DY", name: "Deepesh Yenuga", role: "Co-Founder & CPO" },
  { initials: "HS", name: "Hari Sagaran", role: "CGO" },
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
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid-bg" />
          <div className="sq-wrap hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">Warehousing &amp; Logistics · Agentic AI</span>
              <h1>
                Warehousing and logistics,
                <br />
                on <span style={{ color: "var(--brand-blue)" }}>autopilot.</span>
              </h1>
              <p className="hero-sub">
                Stoqr is an agentic platform for warehousing and freight forwarding. AI agents run your warehouse
                floor-to-invoice — and turn freight quote requests into booked shipments.
              </p>
              <div className="hero-actions">
                <a href={PILOT_URL} className="sq-btn sq-btn-primary">
                  Start a pilot <span className="arw">→</span>
                </a>
                <a href="#warehousing" className="sq-btn sq-btn-ghost">
                  Explore the platform
                </a>
              </div>
            </div>
            <WarehouseFloor />
          </div>
        </section>

        {/* TRUST */}
        <div className="trust">
          <div className="sq-wrap trust-inner">
            <span className="trust-label">One platform · warehouse to freight quote</span>
            <div className="trust-items">
              <span>
                Warehousing <b>·</b> WMS
              </span>
              <span>Freight forwarding</span>
              <span>GDPR · PDPA · DPDPA</span>
              <span>
                <b>SG</b> · <b>IN</b> · <b>EU</b>
              </span>
            </div>
          </div>
        </div>

        {/* WAREHOUSING PILLAR */}
        <section className="agent sec" id="warehousing">
          <div className="sq-wrap agent-wrap">
            <div className="agent-copy reveal">
              <span className="eyebrow">Product · Warehousing</span>
              <h2>A warehouse that runs itself.</h2>
              <p>
                The full WMS — inventory and layout, inbound, outbound, procurement, maritime, billing, compliance,
                and a client portal — on a single flow engine. Run fulfilment and 3PL storage in the same building,
                with service type set per job, not per client.
              </p>
              <ul className="agent-list">
                {warehousingPoints.map((c, i) => (
                  <li key={i}>
                    <Check />
                    <span>
                      <b>{c.b}</b>
                      {c.t}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="/wms" className="sq-btn sq-btn-primary" style={{ marginTop: "1.7rem" }}>
                Explore the WMS <span className="arw">→</span>
              </a>
            </div>
            <div className="agent-panel reveal" aria-hidden="true">
              <div className="ap-head">
                <span>Agent log · JOB-8842</span>
                <span>OUTBOUND</span>
              </div>
              {whLog.map((line, i) => (
                <div className={`ap-line${line.act ? " act" : ""}`} key={i}>
                  <span className="t">{line.t}</span>
                  <span>{line.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOGISTICS PILLAR */}
        <section className="sec" id="logistics">
          <div className="sq-wrap agent-wrap">
            <div className="agent-panel reveal" aria-hidden="true">
              <div className="ap-head">
                <span>Freight Quotation Agent · RFQ-4471</span>
                <span>SIN → HAM</span>
              </div>
              {fqaLog.map((line, i) => (
                <div className={`ap-line${line.act ? " act" : ""}`} key={i}>
                  <span className="t">{line.t}</span>
                  <span>{line.body}</span>
                </div>
              ))}
            </div>
            <div className="agent-copy reveal">
              <span className="eyebrow">Product · Logistics</span>
              <h2>Freight quotes, inbox to booking.</h2>
              <p>
                The Freight Quotation Agent reads a client&rsquo;s email, decomposes the shipment into its service
                legs, sources rates from your partners, and returns a ranked, margin-applied quote — then confirms
                the booking, all with humans in control.
              </p>
              <ul className="agent-list">
                {logisticsPoints.map((c, i) => (
                  <li key={i}>
                    <Check />
                    <span>
                      <b>{c.b}</b>
                      {c.t}
                    </span>
                  </li>
                ))}
              </ul>
              <a href="/transport" className="sq-btn sq-btn-primary" style={{ marginTop: "1.7rem" }}>
                Explore Logistics AI <span className="arw">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="sec" id="team">
          <div className="sq-wrap">
            <div className="sec-head reveal">
              <span className="eyebrow">The team</span>
              <h2>People behind Stoqr</h2>
              <p>Operators and builders shipping warehousing and logistics software out of Singapore and Amaravati.</p>
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
                your <span style={{ color: "var(--brand-blue-bright)" }}>operation.</span>
              </h2>
              <p>
                Put one flow on autopilot — a warehouse module or a freight quote loop — and watch it work.
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
