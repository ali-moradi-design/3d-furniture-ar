# Build log

## 2026-10-21, session 1: discovery and proposal (no code)

- Prerequisites: git 2.43.0, node v22.22.0 (LTS), pnpm 10.28.0 OK. Playwright
  1.56.1 runs with the installed Chromium (WebGL via SwiftShader works).
- `gh auth status` reports an invalid token (env `GH_TOKEN` / `GITHUB_TOKEN`),
  but `gh api` reads the private `roadmap-portfolio` repo fine; the brief was read
  from `origin/main` of the local clone.
- This folder is an empty clone (no commits) of ali-moradi-design/3d-furniture-ar.
  The task text said `REPO`; it was taken to mean this repo.
- Copied the common part and the 3d-furniture-ar section of the brief into
  `docs/brief.md`.
- Decision: the page and all repo files are English only.
- Ran `model-viewer` locally with SheenChair and GlamVelvetSofa; screenshots in
  `docs/screenshots/`.
- Checked licenses of Khronos furniture models and picked CC0 Poly Haven models
  for related products. Details in `docs/proposal.md`.
- Rendered desktop and mobile mockups in `docs/mockups/`.
- Next: wait for approval of brand, look and sections before building.

## 2026-10-22, session 1 (continued): approved, first build

Approval received for brand (Fernhill & Co.), look, sections and order. Added:
a shop listing page (`/` and `/shop/<category>/`).

- Scaffold: Next.js 16 static export, TypeScript strict, pnpm, ESLint, Prettier,
  Feature-Sliced Design in `src/` checked by Steiger (`pnpm check`). Next routes are
  in root `app/`; root `pages/` exists only so Next ignores `src/pages`.
  `package.json` has `"type": "module"` because Steiger only loads its config that way.
- Models: `scripts/fetch-models.mjs` + `scripts/optimize-models.mjs`. Draco geometry,
  textures at most 1024 px as JPEG. Sizes: chair 4029 -> 821 KB, sofa 3076 -> 753 KB.
  KTX2 skipped: `toktx` is not installed here. JPEG (not WebP) was chosen because
  Android Scene Viewer support for `EXT_texture_webp` is not guaranteed.
- Draco decoder is self-hosted in `public/draco/` (no third-party CDN at runtime).
- Posters: `scripts/make-posters.mjs` renders transparent WebP posters; they are used
  while the scene loads and as product-card images (listing and related products show
  posters, not live 3D, to avoid many WebGL contexts).
- Fabric picker uses the models' real glTF material variants: sofa has 5
  (Champagne, Navy, Gray, Black, Pale Pink), chair has 2 (Mango, Peacock).
- "View in your room": `model-viewer` AR (WebXR, Scene Viewer, Quick Look); on desktop
  a dialog with a QR code of the page URL.
- Quality: Playwright E2E (7 tests: page loads, fabric variant switch, add to cart,
  QR dialog, filter, no console errors, axe on shop and product pages) all pass;
  Lighthouse CI: accessibility, best practices and SEO pass; performance is a
  warning (0.73 on the product page with software WebGL here).
- CI: `.github/workflows/ci.yml` (one job `check`). Not run on GitHub yet.
- `docs/nginx.md`: MIME type and cache headers for deploy (roadmap phase 7).

### Differences from the approved mockup

- The chair has 2 fabric choices, not 5, because the model has only 2 real variants.
  Extra colors need recoloring (flat tint) and would look different; ask before adding.
- Related products and the AR phone frame use poster images instead of live 3D.
- No "Room" thumbnail; thumbnails are 3D, Front, Side, Detail camera angles.
- Header has category links to the new filtered listing pages and a working cart count.

### Not verified

- AR on a real Android phone and iPhone (required by the brief before calling it done).
  Scene Viewer likely shows the default fabric, not the chosen variant.
- CI on GitHub (the workflow has only been reproduced step by step locally).
