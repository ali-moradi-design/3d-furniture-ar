// Renders a transparent poster image for each model (shown while the 3D scene loads
// and in product cards). Run after optimize-models: `pnpm posters`.
import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const slugs = [
  'marlow-lounge-chair',
  'ainsley-velvet-sofa',
  'slate-coffee-table',
  'oak-side-table',
  'hollis-swivel-chair',
];
const types = {
  '.js': 'text/javascript',
  '.glb': 'model/gltf-binary',
  '.wasm': 'application/wasm',
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x').pathname;
  const file =
    url === '/mv.js'
      ? 'node_modules/@google/model-viewer/dist/model-viewer.min.js'
      : url === '/'
        ? null
        : join('public', url);
  try {
    if (!file) {
      res.setHeader('content-type', 'text/html');
      res.end(`<!doctype html><style>html,body{margin:0;background:transparent}
model-viewer{width:600px;height:450px;--poster-color:transparent}</style>
<script type=module src=/mv.js></script>
<script type=module>customElements.whenDefined('model-viewer').then(()=>{
customElements.get('model-viewer').dracoDecoderLocation='/draco/'})</script>
<model-viewer id=m camera-orbit="35deg 75deg auto" shadow-intensity=1 shadow-softness=1
environment-image=neutral exposure=1></model-viewer>`);
      return;
    }
    res.setHeader('content-type', types[extname(file)] ?? 'application/octet-stream');
    res.end(await readFile(file));
  } catch {
    res.statusCode = 404;
    res.end();
  }
}).listen(0);
const port = server.address().port;

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
await mkdir('public/posters', { recursive: true });
const page = await browser.newPage({ viewport: { width: 600, height: 450 } });
for (const slug of slugs) {
  await page.goto(`http://localhost:${port}/`);
  await page.evaluate(async (src) => {
    const m = document.getElementById('m');
    m.src = src;
    await new Promise((r) => m.addEventListener('load', r, { once: true }));
    await new Promise((r) => setTimeout(r, 1200));
  }, `/models/${slug}.glb`);
  const png = await page.screenshot({ omitBackground: true });
  await sharp(png).webp({ quality: 85 }).toFile(`public/posters/${slug}.webp`);
  console.log('poster', slug);
}
await browser.close();
server.close();
