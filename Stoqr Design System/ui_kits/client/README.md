# Client Web App — UI kit

Tenant-facing app. Centered layout, no sidebar. Used by the customer (e.g. a brand whose stock Stoqr is operating) to view inventory, request movements, approve actions, and audit history.

## Files

- `index.html` — interactive app. Click "Request stock movement" to open the modal flow.
- `ClientShell.jsx` — `ClientTopbar` (logo, primary nav, warehouse switcher, user avatar).
- `ClientPages.jsx` — `ClientOverview` (welcome + stats + activity + action queue), `ClientRequest` (modal).

## Conventions

- Top nav, no sidebar. Page max-width 1100px, centered.
- Slightly softer voice than the operator app — addresses the user by name, leads with what's waiting on them.
- Reuses `Button` and `Card` from `../operator/Shell.jsx` — these are shared primitives.

## Disclaimer

Recreation derived from the brand DNA, not a production codebase.
