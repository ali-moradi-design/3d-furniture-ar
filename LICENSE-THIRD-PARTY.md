# Third-party licenses

## model-viewer

Source of the 3D viewer and the AR flow (WebXR, Scene Viewer, Quick Look).
https://github.com/google/model-viewer — Apache License 2.0.
Used as the npm package `@google/model-viewer`, not modified.

## Draco decoder (via three.js)

`public/draco/*` is copied from `three/examples/jsm/libs/draco/gltf`.
https://github.com/mrdoob/three.js — MIT License, Copyright (c) 2010-2024
three.js authors. The decoder itself is from Google Draco (Apache License 2.0).

The MIT license text:

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

## Other dependencies

Next.js, React, `qrcode` and the dev tools are used under their own MIT or
Apache-2.0 licenses; see each package in `node_modules`.

## Note on the brief

The brief suggests taking the 3D core from MIT pmndrs examples. This page uses
Google `model-viewer` (Apache-2.0) instead, as named in the brief's own
3d-furniture-ar section. No pmndrs example code is included.
