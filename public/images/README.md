# public/images

Drop image assets here. They are served from the site root, e.g.
`public/images/logo.svg`  →  referenced in code as `/images/logo.svg`.

The current pages use no images (the visuals are CSS + inline SVG), so this
folder can stay empty. Suggested assets if you want them:

- Favicon       → place at `app/favicon.ico` (NOT here; Next auto-detects it)
- OG image      → place at `app/opengraph-image.png` (1200×630)
- Logo          → `public/images/logo.svg`  (optional; design uses a text wordmark)

Use the `next/image` component to render images for automatic optimization.
