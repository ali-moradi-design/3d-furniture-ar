// Compresses the source models: textures resized and re-encoded as JPEG (WebP is avoided because Android Scene Viewer support for EXT_texture_webp is not guaranteed),
// geometry Draco-compressed. Output goes to public/models/*.glb.
// KTX2 needs the `toktx` binary (KTX-Software); it is not installed here,
// so resized JPEG textures are used instead (see docs/build-log.md).
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import {
  dedup,
  draco,
  prune,
  resample,
  textureCompress,
  weld,
} from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';
import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';

const jobs = [
  ['assets-src/SheenChair.glb', 'public/models/marlow-lounge-chair.glb'],
  ['assets-src/GlamVelvetSofa.glb', 'public/models/ainsley-velvet-sofa.glb'],
  [
    'assets-src/modern_coffee_table_01/modern_coffee_table_01.gltf',
    'public/models/slate-coffee-table.glb',
  ],
  ['assets-src/side_table_01/side_table_01.gltf', 'public/models/oak-side-table.glb'],
  [
    'assets-src/mid_century_lounge_chair/mid_century_lounge_chair.gltf',
    'public/models/hollis-swivel-chair.glb',
  ],
];

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'draco3d.decoder': await draco3d.createDecoderModule(),
  'draco3d.encoder': await draco3d.createEncoderModule(),
});

await mkdir('public/models', { recursive: true });
for (const [src, dst] of jobs) {
  const doc = await io.read(src);
  await doc.transform(
    dedup(),
    prune(),
    weld(),
    resample(),
    textureCompress({
      encoder: sharp,
      targetFormat: 'jpeg',
      resize: [1024, 1024],
      quality: 85,
    }),
    draco(),
  );
  await io.write(dst, doc);
  const [a, b] = await Promise.all([stat(src.endsWith('.gltf') ? src : src), stat(dst)]);
  console.log(
    dst,
    `${(b.size / 1024).toFixed(0)} KB`,
    `(source file ${(a.size / 1024).toFixed(0)} KB)`,
  );
}
