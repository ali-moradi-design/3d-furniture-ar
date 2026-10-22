import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { getBounds } from '@gltf-transform/functions';
import draco3d from 'draco3dgltf';

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  'draco3d.decoder': await draco3d.createDecoderModule(),
});
for (const f of process.argv.slice(2)) {
  const doc = await io.read(f);
  const { min, max } = getBounds(doc.getRoot().getDefaultScene());
  const cm = [0, 1, 2].map((i) => Math.round((max[i] - min[i]) * 100));
  console.log(f, 'W', cm[0], 'D', cm[2], 'H', cm[1]);
}
