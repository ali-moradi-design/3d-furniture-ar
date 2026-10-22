// Downloads the CC0 / CC-BY source models into assets-src/ (not committed).
// Authors and licenses are listed in CREDITS.md.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const KHRONOS =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models';
const UA = { 'User-Agent': 'Mozilla/5.0' };
const out = 'assets-src';

async function get(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function save(path, buf) {
  await mkdir(join(path, '..'), { recursive: true });
  await writeFile(path, buf);
}

for (const name of ['SheenChair', 'GlamVelvetSofa']) {
  await save(
    join(out, `${name}.glb`),
    await get(`${KHRONOS}/${name}/glTF-Binary/${name}.glb`),
  );
  console.log('ok', name);
}

for (const slug of [
  'modern_coffee_table_01',
  'side_table_01',
  'mid_century_lounge_chair',
]) {
  const files = await (
    await fetch(`https://api.polyhaven.com/files/${slug}`, { headers: UA })
  ).json();
  const gltf = files.gltf['1k'].gltf;
  const dir = join(out, slug);
  await save(join(dir, `${slug}.gltf`), await get(gltf.url));
  for (const [rel, file] of Object.entries(gltf.include)) {
    await save(join(dir, rel), await get(file.url));
  }
  console.log('ok', slug);
}
