"use client";

import { useState } from "react";
import Image from "next/image";

const PILOT_URL = "/contact";

const navLinks = [
  { href: "/wms", label: "Warehousing" },
  { href: "/transport", label: "Logistics" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="sq-wrap nav-inner">
        <a href="/" className="brand">
          <Image src="/images/logo.svg" alt="Stoqr" width={120} height={36} priority />
        </a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={PILOT_URL} className="sq-btn sq-btn-primary nav-cta-mobile" onClick={() => setOpen(false)}>
            Start a pilot <span className="arw">→</span>
          </a>
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
