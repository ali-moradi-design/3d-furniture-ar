# Proposal (awaiting approval)

Nothing is built yet. This file is the plan to approve or change.

## Fictional brand

Working name: **Fernhill & Co.** (warm, editorial, home-decor feel).
Alternatives: **Oakmere Home**, **Linden & Loom**. These are invented names;
a trademark search has NOT been done, so check before any public launch.
Product names in the mockup (Marlow, Hollis, Ainsley, ...) are invented too.

## Source examples that were run

| Source                                                 | License    | What was run                                                     | Result                                                                     |
| ------------------------------------------------------ | ---------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Google `model-viewer` 4.x (npm `@google/model-viewer`) | Apache-2.0 | Local page with two viewers, auto-rotate, shadow, `ar` attribute | Renders correctly; screenshot in `docs/screenshots/model-viewer-local.png` |
| AR itself (WebXR / Scene Viewer / Quick Look)          | n/a        | Not testable in headless desktop (`canActivateAR` is false)      | Needs a real Android phone and iPhone, as the brief says                   |

The optional pmndrs `shoe-configurator` pattern (fabric color) is not needed:
`model-viewer` can tint a material by setting `baseColorFactor`.

## Models (all CC0 or CC-BY)

| Role                                 | Model                    | Author                                                | License         | Source                     | Note                                                             |
| ------------------------------------ | ------------------------ | ----------------------------------------------------- | --------------- | -------------------------- | ---------------------------------------------------------------- |
| Hero product                         | SheenChair               | Eric Chadwick, (c) Wayfair                            | CC0 1.0         | Khronos glTF-Sample-Assets | 4.1 MB, must be compressed; about 83 x 57 x 69 cm (W x D x H)    |
| Second product (AR section, related) | GlamVelvetSofa           | Eric Chadwick, (c) Wayfair                            | CC-BY 4.0       | Khronos glTF-Sample-Assets | Credit required; rename under our brand; about 219 x 102 x 79 cm |
| Related                              | Modern Coffee Table 01   | Amin                                                  | CC0             | Poly Haven                 |                                                                  |
| Related                              | Side Table 01            | James Ray Cock                                        | CC0             | Poly Haven                 |                                                                  |
| Related                              | Mid Century Lounge Chair | Kuutti Siitonen                                       | CC0             | Poly Haven                 |                                                                  |
| Backup                               | Sofa 03 / Arm Chair 01   | Fran Calvente / Kirill Sannikov                       | CC0             | Poly Haven                 |                                                                  |
| Backup                               | SheenWoodLeatherSofa     | Darmstadt Graphics Group (CC-BY), Fran Calvente (CC0) | CC-BY 4.0 + CC0 | Khronos                    | 10 MB, too heavy                                                 |

The two Khronos models named in the brief are used as written. The CC-BY sofa
needs credit on the page and in `CREDITS.md`. Every model will be listed there
with author, link and license.

## Page sections (one product page of a small furniture shop)

1. Header with fictional logo and category links.
2. Gallery + 3D viewer (drag to rotate), thumbnails.
3. Product info: name, price, short text.
4. Fabric/color swatches that recolor the 3D model live.
5. Dimensions (measured from the model).
6. Buttons: Add to cart (fake) and "View in your room" (AR).
7. "See it in your room" explainer: three steps; QR code on desktop.
8. "Pairs well with" related products, each with a small 3D preview.
9. Details and care text.
10. Footer with fictional-brand notice and a small credits section.

## Mockups

- `docs/mockups/mockup-desktop.png` (1440 px wide)
- `docs/mockups/mockup-mobile.png` (390 px wide)

They are HTML/CSS rendered with Playwright using the real models; they are
design proposals, not the final code.

## Open questions for approval

1. Is the brand name OK, or pick one of the alternatives?
2. Is the visual direction OK (warm beige, serif headings, orange accent)?
3. Are the sections and their order OK?
4. Product page only, or also a small shop listing page?
5. Which fabric colors (mockup shows five)?
