---
name: stoqr-design
description: Use this skill to generate well-branded interfaces and assets for Stoqr, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Stoqr is a multi-tenant warehouse + inventory management platform with operator and client web apps, agentic-AI workflows, and a custom workflow builder.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- Tokens live in `colors_and_type.css` — load this first.
- Logo + mark + wordmark variants live in `assets/`.
- UI kit components live in `ui_kits/operator/` (warehouse staff) and `ui_kits/client/` (tenant-facing). Each has an `index.html` showing an interactive recreation of a typical product view, plus JSX components you can lift.
- Iconography is Lucide (CDN). No emoji, ever, in product UI.
- Voice is operational and direct. Sentence case. Always show units. SKUs/bin codes in mono.
