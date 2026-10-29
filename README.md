# 3d-furniture-ar

A fictional furniture shop (Fernhill & Co.) with a 3D product viewer and "view in
your room" augmented reality. Portfolio demo; all content is English.

- `/` shop listing, `/shop/<category>/` filtered listing
- `/products/<slug>/` product page: 3D viewer, fabric options, dimensions, AR

## Stack

Next.js 16 (App Router, standalone server in a container), TypeScript strict, pnpm, ESLint + Prettier,
Feature-Sliced Design checked with Steiger, Google `model-viewer` for 3D and AR.
Playwright E2E with axe, Lighthouse CI.

## Commands

```
pnpm install
pnpm dev            # development server
pnpm build          # .next/standalone (pnpm start runs it on :3100)
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

## Deploy

`output: 'standalone'`: CI builds `.next/standalone` and `Dockerfile` puts only that folder in the image.
After CI passes on `main`, `.github/workflows/docker.yml` pushes
`ghcr.io/ali-moradi-design/3d-furniture-ar-web:<sha>` and deploy-kit makes the VPS pull and restart it.
`next.config.ts` serves `.glb` as `model/gltf-binary`; models, the Draco decoder and posters get a
30-day cache (their names have no hash: rename a file when it changes). `deploy/compose.yaml` is the
server file (port `127.0.0.1:3117`, read-only, 256 MB) and `deploy/nginx.conf` the host Nginx site.
AR needs HTTPS, which certbot provides.
