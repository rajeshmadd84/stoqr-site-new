"use client";

/* ============================================================
   Stoqr — /pilot page (request-a-pilot, client component)

   Submissions post directly to Web3Forms (api.web3forms.com), which
   emails the request — no backend needed. Requires
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to be set.
   ============================================================ */

import { useState } from "react";
import Image from "next/image";
import type { ChangeEvent, FormEvent } from "react";

const PILOT_URL = "https://getstoqr.com/pilot";
const LINKEDIN_URL = "https://www.linkedin.com/company/getstoqr";

const roles = ["Owner / Executive", "Operations / Warehouse manager", "IT / Engineering", "Other"];
const operations = ["SMB warehouse", "Third-party logistics (3PL)", "Enterprise / multi-site", "Maritime & bonded"];
const regions = ["Singapore", "India", "European Union", "Other"];
const firstFlows = [
  "Inbound / receiving",
  "Outbound / dispatch",
  "Inventory & layout",
  "Billing & invoicing",
  "Ship spares / bonded",
  "Not sure yet",
];

const steps = [
  { n: "01", h: "Tell us about your operation", p: "Warehouse type, region, and the one thing that's most painful today." },
  { n: "02", h: "We map one flow", p: "Your steps, your documents, your locations — modelled in Stoqr, not a generic template." },
  { n: "03", h: "Go live on that module", p: "Run it for real alongside your current systems, then expand flow by flow." },
];

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export default function PilotPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: roles[0], operation: operations[0], region: regions[0], firstFlow: firstFlows[0], volume: "", message: "" });
  const [error, setError] = useState("");

  const update = (k: keyof typeof form) => (e: ChangeEvent<Field>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please add your name and a work email.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError("That email address doesn't look right.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New pilot request — ${form.company || form.name}`,
          from_name: "Stoqr pilot form",
          name: form.name,
          email: form.email,
          company: form.company,
          role: form.role,
          operation: form.operation,
          region: form.region,
          first_flow: form.firstFlow,
          volume: form.volume,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your request. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="stoqr-root" id="top">
      <header className="nav">
        <div className="sq-wrap nav-inner">
          <a href="/" className="brand">
            <Image src="/images/logo.svg" alt="Stoqr" width={120} height={36} priority />
          </a>
          <a href="/" className="pilot-back">
            ← Back to site
          </a>
        </div>
      </header>

      <main className="pilot-main">
        <div className="sq-wrap">
          {submitted ? (
            <div className="pilot-success">
              <div className="tick" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5l4.5 4.5L19 7.5" stroke="var(--brand-blue)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2>Request received.</h2>
              <p>
                Thanks, {form.name.split(" ")[0] || "there"}. We&rsquo;ll be in touch at <strong style={{ color: "var(--fg-primary)" }}>{form.email}</strong> to set up your pilot.
              </p>
              <div className="pilot-next">
                <span>
                  <i>01</i> We review your operation within 2 business days
                </span>
                <span>
                  <i>02</i> A short intro call to map your first flow
                </span>
                <span>
                  <i>03</i> We stand up your pilot module — first module live July 2026
                </span>
              </div>
              <a href="/" className="sq-btn sq-btn-ghost">
                Back to site
              </a>
            </div>
          ) : (
            <div className="pilot-grid">
              {/* left: the pitch */}
              <div className="pilot-aside">
                <span className="eyebrow">Start a pilot</span>
                <h1>
                  Put one flow on <span className="brand">autopilot.</span>
                </h1>
                <p className="pilot-lead">
                  Pick a single operation — receiving, dispatch, billing — and we&rsquo;ll stand it up on Stoqr for your
                  warehouse. No rip-and-replace, no year-long rollout.
                </p>
                <ul className="pilot-steps">
                  {steps.map((s) => (
                    <li key={s.n}>
                      <span className="n">{s.n}</span>
                      <div>
                        <h4>{s.h}</h4>
                        <p>{s.p}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pilot-reassure">
                  <b>Your data stays in your region</b> — SG, IN, or EU.
                  <br />
                  <b>Works alongside your ERP</b> — no migration required.
                  <br />
                  <b>No obligation</b> — a pilot is a pilot.
                </div>
              </div>

              {/* right: the form */}
              <div className="pilot-card">
                <span className="card-eyebrow">Request access</span>
                <h2>Tell us about your warehouse</h2>

                <form onSubmit={onSubmit} noValidate>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="name">
                        Full name <span className="req">*</span>
                      </label>
                      <input id="name" type="text" placeholder="Priya Sharma" value={form.name} onChange={update("name")} />
                    </div>
                    <div className="field">
                      <label htmlFor="email">
                        Work email <span className="req">*</span>
                      </label>
                      <input id="email" type="email" placeholder="priya@company.com" value={form.email} onChange={update("email")} />
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="company">Company</label>
                      <input id="company" type="text" placeholder="Acme Logistics" value={form.company} onChange={update("company")} />
                    </div>
                    <div className="field">
                      <label htmlFor="role">Your role</label>
                      <select id="role" value={form.role} onChange={update("role")}>
                        {roles.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="operation">Operation type</label>
                      <select id="operation" value={form.operation} onChange={update("operation")}>
                        {operations.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="region">Region</label>
                      <select id="region" value={form.region} onChange={update("region")}>
                        {regions.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="firstFlow">Put on autopilot first</label>
                      <select id="firstFlow" value={form.firstFlow} onChange={update("firstFlow")}>
                        {firstFlows.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor="volume">Rough monthly volume</label>
                      <input id="volume" type="text" placeholder="e.g. 4,000 orders" value={form.volume} onChange={update("volume")} />
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="message">Anything else? (optional)</label>
                    <textarea id="message" placeholder="What's slowing your floor down right now?" value={form.message} onChange={update("message")} />
                  </div>

                  {error && (
                    <div className="form-error" role="alert">
                      <span>⚠</span>
                      {error}
                    </div>
                  )}

                  <div className="form-foot">
                    <button type="submit" className="sq-btn sq-btn-primary" disabled={submitting}>
                      {submitting ? "Sending…" : "Request a pilot"} {!submitting && <span className="arw">→</span>}
                    </button>
                    <p className="form-note">
                      We&rsquo;ll only use this to talk to you about Stoqr.
                      <br />
                      No spam, no sharing — data handled per GDPR / PDPA / DPDPA.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="foot">
        <div className="sq-wrap foot-inner">
          <div className="foot-left">
            <span className="foot-brand">STOQR</span>
            <span className="foot-copy">© 2026 Stoqr. All rights reserved.</span>
          </div>
          <div className="foot-right">
            <a href={LINKEDIN_URL}>LinkedIn ↗</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
