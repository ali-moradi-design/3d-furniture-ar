# 3d-furniture-ar

A fictional furniture shop (Fernhill & Co.) with a 3D product viewer and "view in
your room" augmented reality. Portfolio demo; all content is English.

- `/` shop listing, `/shop/<category>/` filtered listing
- `/products/<slug>/` product page: 3D viewer, fabric options, dimensions, AR

## Stack

Next.js 16 (App Router, static export), TypeScript strict, pnpm, ESLint + Prettier,
Feature-Sliced Design checked with Steiger, Google `model-viewer` for 3D and AR.
Playwright E2E with axe, Lighthouse CI.

## Commands

```
pnpm install
pnpm dev            # development server
pnpm build          # static export to out/
pnpm check          # lint, typecheck, format check, steiger
pnpm test:e2e       # needs a build first; set CHROMIUM_PATH if needed
pnpm models:fetch && pnpm models:optimize && pnpm posters   # rebuild 3D assets
```

## Layout

`app/` holds the thin Next.js routes. The Feature-Sliced layers live in `src/`
(`app`, `pages`, `widgets`, `features`, `entities`, `shared`). The root `pages/`
folder only exists so Next.js ignores `src/pages`.

See `docs/` for the brief, the approved proposal, mockups and the build log, and
`CREDITS.md` / `LICENSE-THIRD-PARTY.md` for licenses.
