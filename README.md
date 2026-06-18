# Stoqr — Website (Next.js / App Router)

New marketing site repositioned for **agentic warehousing & transport management**.
Two pages: the landing page (`/`) and the request-a-pilot page (`/pilot`).
Self-contained, scoped CSS — drops into an existing Next.js App Router project.

---

## What's in here

```
stoqr-site/
├── app/
│   ├── page.tsx              # Landing page  → route "/"
│   └── pilot/
│       └── page.tsx          # Pilot page    → route "/pilot"
├── components/
│   ├── stoqr-landing.tsx     # Landing (client component, all copy in data arrays at top)
│   ├── pilot-page.tsx        # Pilot form (client component)
│   └── stoqr.css             # Design tokens + all styles (scoped under .stoqr-root)
└── public/
    └── images/               # Put image assets here (see below)
```

## Install (into an existing Next.js App Router project)

1. Copy `app/`, `components/`, and `public/` into your project root (merge with existing folders).
2. Imports use the `@/` path alias (default in v0 / create-next-app projects). If yours
   isn't configured, change the two imports at the top of each `app/**/page.tsx` to relative
   paths, e.g. `../components/stoqr-landing` and `../components/stoqr.css`.
3. Run `npm run dev` and open `/` and `/pilot`.

No Tailwind config changes are required — the styling is self-contained CSS and coexists
with Tailwind / shadcn.

## Fonts

Fonts load via an `@import` at the top of `components/stoqr.css` (Space Grotesk, Inter,
JetBrains Mono, Archivo Black) — zero config. To use `next/font` instead, delete that
`@import` line and wire the four families in `app/layout.tsx`.

## Editing copy

All landing-page text lives in plain data arrays at the top of
`components/stoqr-landing.tsx` (`problems`, `pipeline`, `modules`, `segments`, `team`,
`agentLog`). Edit those — no JSX surgery needed.

## Wiring the pilot form

`components/pilot-page.tsx` currently shows a success screen on submit without sending
anywhere. Find the `// TODO: wire this to your backend` comment and connect it:

- **Easiest:** create `app/api/pilot/route.ts` with a `POST` handler that forwards the
  payload to your email / CRM / sheet, then uncomment the `fetch("/api/pilot", …)` call.
- Or use a Next.js Server Action if you prefer.

---

## Images

Static assets go in **`public/`** and are served from the site root, so
`public/images/logo.svg` is referenced as `/images/logo.svg`.

Use the **`next/image`** component for optimization:

```tsx
import Image from "next/image";
<Image src="/images/warehouse.webp" width={1200} height={700} alt="Warehouse floor" />
```

Note: **these pages use no image files** — the warehouse-floor visual, grids, and icons
are all CSS + inline SVG. The only assets you may want to add:

| Asset                | Where it goes                         | Notes                                  |
|----------------------|---------------------------------------|----------------------------------------|
| Favicon              | `app/favicon.ico` (or `app/icon.png`) | Auto-detected by Next, no `<link>`     |
| Social / OG image    | `app/opengraph-image.png` (1200×630)  | Auto-attached to metadata              |
| Logo (if you want one) | `public/images/logo.svg`            | Current design uses the text wordmark  |
| Optional hero photo  | `public/images/…`                     | Only if swapping the CSS floor visual  |

For images loaded from an external URL / CMS, allowlist the domain in `next.config.js`
under `images.remotePatterns`.

---

© 2026 Stoqr.
