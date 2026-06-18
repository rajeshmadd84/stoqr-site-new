# Operator Web App — UI kit

Used by warehouse staff and admins. Dense, fluid layout with a fixed left sidebar.

## Files

- `index.html` — interactive app shell. Click between Overview, Inventory, Cycle counts, Workflows; toggle the Atlas drawer from the topbar.
- `Shell.jsx` — `Sidebar`, `Topbar`, `Button`, `Card`, `Stat`, `StatusPill`.
- `OverviewPage.jsx` — dashboard with stats, throughput chart, agent feed, approvals, low stock.
- `InventoryPage.jsx` — filterable, selectable inventory table with bulk actions.
- `CycleCountsPage.jsx` — count progress + scanner terminal + variance rows.
- `WorkflowsPage.jsx` — agentic workflow builder canvas (node palette · canvas · inspector).

## Conventions

- **Layout:** sidebar 248px · topbar 56px · fluid main pane.
- **Density:** 14px base text, 32–36px control heights, 9px row padding in tables.
- **AI surfaces** use violet (`--ai`) and the Atlas badge is the only place the agent identity appears persistently in chrome.
- **No emoji.** Status is dot + label inside a pill.

## Disclaimer

This kit is a recreation derived from the brand DNA in the logo + product description. No production codebase was provided, so component shapes/states are conventional choices, not pixel-perfect copies. Replace component bodies once production code is available.
