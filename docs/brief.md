# Brief: 3d-furniture-ar

Copied from `notes/3d-landings-brief.md` in the private `roadmap-portfolio`
repo (main, 2026-10-21): only the "Common to all five" part and this repo's
section. Language decision (session 1): the page and all repo files are English only.

## Common to all five

- Do not build from scratch. No polished, permissively licensed full 3D landing
  page was found (2026-10-21), so each page takes its 3D core from MIT examples
  (mostly `pmndrs/examples`, https://github.com/pmndrs/examples, MIT,
  demos at `pmndrs.github.io/examples/<slug>`) and the landing page around it is
  built new.
- Each page has a FICTIONAL brand (suggest names at session start); no real
  brands, logos or trademarked products.
- Licenses: keep the MIT text and credit of every example used in
  `LICENSE-THIRD-PARTY.md`. Many example models have no credit: never ship an
  uncredited model. Use only CC0 or CC-BY models and HDRIs (Khronos
  glTF-Sample-Assets, Poly Haven, Sketchfab with CC0/CC-BY) and list each with
  author, link and license in `CREDITS.md` and a small credits section on the page.
- Stack: Next.js 16 App Router, static export (`output: 'export'`), TypeScript
  strict, pnpm, ESLint + Prettier, Feature-Sliced Design checked with Steiger.
  React Three Fiber + drei (+ postprocessing where needed); the canvas is a
  client component loaded with `dynamic(..., { ssr: false })`.
- English only (decide otherwise at session start if the user wants).
- Performance: compress models with gltf-transform (Draco or Meshopt) and
  textures to KTX2; lazy-load the scene after the first paint; light mobile
  version (lower DPR, fewer effects); poster image while loading;
  `prefers-reduced-motion` stops camera moves. Serve `.glb` as
  `model/gltf-binary` with long cache headers (roadmap rule).
- Quality: Playwright E2E (page loads, main interaction works, no console
  errors) + axe on the HTML parts; Lighthouse check in CI; one required check.
- Deploy: changed on 2026-10-29 to a Next.js standalone container (roadmap decision for every
  Next.js site); see the README.
- How each session starts:
  1. Check prerequisites: `git`, `node` (LTS), `pnpm`, Playwright runs; the
     folder is a clean clone of that repo; GitHub access.
  2. Copy the common part and that page's section into `docs/brief.md`.
  3. Run the source example(s), take screenshots, find licensed replacement
     models, and propose the brand and the page sections as mockup images
     (HTML/CSS rendered with Playwright). Wait for approval.
  4. Build in small PRs (branch → PR → CI → squash merge), explaining each step.
- Language rules: explain in Persian, every English term inside parentheses and
  backticks, never start a line with an English word, repo files in English.

## 3d-furniture-ar

- Sources: Google `model-viewer` (https://github.com/google/model-viewer,
  Apache-2.0): 3D viewer plus AR (WebXR / Scene Viewer on Android, Quick Look on
  iOS with auto-generated USDZ), floor placement. Optional pmndrs
  `shoe-configurator` pattern for changing fabric color.
- Models: Khronos `SheenChair` (CC0) and `GlamVelvetSofa` (CC-BY 4.0, credit
  Eric Chadwick / Wayfair; rename it under our brand).
- Page: a small furniture shop product page: gallery + 3D viewer, fabric/color
  options, "View in your room" button, dimensions, price, related products.
  Test AR on a real Android phone and iPhone before calling it done.
