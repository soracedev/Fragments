// ============================================================
// SHOTS — harness di screenshot con Playwright.
// Carica il gioco, forza attiva ogni scena/overlay e cattura
// uno screenshot del #stage. Registra 404 ed errori di console.
//
// Uso:
//   node scripts/shots.mjs                 # http://localhost:4173, out ./.shots
//   BASE_URL=http://localhost:5173 SHOTS_DIR=/tmp/x node scripts/shots.mjs
//
// Prerequisito: un server che serve il gioco (es. `npm run preview`).
// Esce con codice !=0 se qualche immagine/asset risponde >=400.
// ============================================================

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';
const OUT = resolve(process.env.SHOTS_DIR || './.shots');
mkdirSync(OUT, { recursive: true });

// Scene statiche in index.html + overlay puzzle da forzare con .open
const SCENES = ['hub', 'piazza', 'vicolo', 'nettuno', 'spiaggia', 'casa-soggiorno', 'casa-bagno'];
const PUZZLES = ['shutterPuzzle', 'clockPuzzle', 'safePuzzle', 'mirrorPuzzle'];

const failed = [];   // { url, status }
const errors = [];   // console/page errors

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 720 } });

page.on('response', (r) => {
  const s = r.status();
  if (s >= 400) failed.push({ url: r.url(), status: s });
});
page.on('pageerror', (e) => errors.push(String(e)));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

await page.goto(BASE_URL, { waitUntil: 'networkidle' });

const stage = page.locator('#stage');

// --- Gate d'ingresso (la prima cosa che si vede) ---
await page.waitForTimeout(300);
await stage.screenshot({ path: `${OUT}/00-gate.png` });

// --- Title screen (dietro il gate) ---
await page.evaluate(() => document.querySelector('#gate')?.style.setProperty('display', 'none'));
await page.waitForTimeout(200);
await stage.screenshot({ path: `${OUT}/01-title.png` });

// --- Nasconde gate/title/intro/hud overlays per vedere le scene ---
await page.evaluate(() => {
  ['#gate', '#title', '#intro'].forEach((s) => {
    const el = document.querySelector(s);
    if (el) el.style.display = 'none';
  });
});

// Forza una scena attiva e rivela i suoi hotspot (per vedere le label nav)
async function showScene(name) {
  await page.evaluate((n) => {
    document.querySelectorAll('.scene').forEach((s) =>
      s.classList.toggle('active', s.dataset.scene === n),
    );
    const active = document.querySelector(`.scene[data-scene="${n}"]`);
    if (active) active.querySelectorAll('.hotspot.hidden').forEach((h) => h.classList.remove('hidden'));
  }, name);
  await page.waitForTimeout(1200); // > transizione 1.1s: evita bleed-through
}

let i = 1;
for (const name of SCENES) {
  await showScene(name);
  await stage.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}-${name}.png` });
  i++;
}

// --- Stati alternativi della Piazza (swap sfondo diretto: verifica load/rendering) ---
const PIAZZA_STATES = [
  ['piazza-B', '/assets/images/CittaFerma/piazza-2.png'],
  ['piazza-C', '/assets/images/CittaFerma/piazza-3.png'],
];
await showScene('piazza');
for (const [label, url] of PIAZZA_STATES) {
  await page.evaluate((u) => {
    const layer = document.querySelector('.scene[data-scene="piazza"] .layer');
    if (layer) layer.style.backgroundImage = `url("${u}")`;
  }, url);
  await page.waitForTimeout(400);
  await stage.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}-${label}.png` });
  i++;
}

// --- Spiaggia rivelata (spiaggia-2, la figura appare nell'arte) ---
await showScene('spiaggia');
await page.evaluate((u) => {
  const layer = document.querySelector('.scene[data-scene="spiaggia"] .layer');
  if (layer) layer.style.backgroundImage = `url("${u}")`;
}, '/assets/images/CittaFerma/spiaggia-2.png');
await page.waitForTimeout(400);
await stage.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}-spiaggia-2.png` });
i++;

// --- Bagno stato risolto (casa-bagno-2, swap sfondo diretto) ---
await showScene('casa-bagno');
await page.evaluate((u) => {
  const layer = document.querySelector('.scene[data-scene="casa-bagno"] .layer');
  if (layer) layer.style.backgroundImage = `url("${u}")`;
}, '/assets/images/CittaFerma/casa-bagno-2.png');
await page.waitForTimeout(400);
await stage.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}-casa-bagno-2.png` });
i++;

// --- Overlay puzzle ---
for (const id of PUZZLES) {
  await page.evaluate((pid) => {
    document.querySelectorAll('.puzzle').forEach((p) => p.classList.remove('open'));
    const el = document.getElementById(pid);
    if (el) el.classList.add('open');
  }, id);
  await page.waitForTimeout(400);
  await stage.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}-${id}.png` });
  i++;
}

// --- Specchio rivelato (numero nella condensa: verifica closeup-specchio-numero) ---
await page.evaluate(() => {
  document.querySelectorAll('.puzzle').forEach((p) => p.classList.remove('open'));
  const el = document.getElementById('mirrorPuzzle');
  if (el) el.classList.add('open');
  const bg = document.getElementById('mirrorBg');
  if (bg) bg.style.backgroundImage = "url('/assets/images/CittaFerma/closeup-specchio-numero.png')";
  const steam = document.getElementById('mirrorSteam');
  if (steam) steam.style.opacity = '0.15';
});
await page.waitForTimeout(400);
await stage.screenshot({ path: `${OUT}/${String(i).padStart(2, '0')}-mirror-solved.png` });
i++;

await browser.close();

// --- Report ---
const imgFails = failed.filter((f) => /\.(png|jpg|jpeg|webp|svg)$/i.test(f.url));
console.log(`\nScreenshots → ${OUT}`);
console.log(`Richieste fallite (>=400): ${failed.length}  (di cui immagini: ${imgFails.length})`);
for (const f of failed) console.log(`  ${f.status}  ${f.url}`);
if (errors.length) {
  console.log(`Errori console/page: ${errors.length}`);
  for (const e of errors) console.log(`  ${e}`);
}
process.exit(imgFails.length > 0 ? 1 : 0);
