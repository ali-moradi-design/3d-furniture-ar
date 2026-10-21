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
