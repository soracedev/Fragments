// ============================================================
// PROBE MONDO 2 — verifica la catena della Casa Familiare pilotando
// gli hotspot reali, partendo da un salvataggio seed a "Fuori Casa"
// (Mondo 1 già concluso). Esce !=0 se un'asserzione fallisce.
//
// Richiede `npm run dev` (:5173) — vedi scripts/seed.mjs.
// ============================================================

import { chromium } from 'playwright';
import { seedGame, DEV_URL } from './seed.mjs';

const BASE_URL = DEV_URL;
const results = [];
function assert(name, cond) {
  results.push({ name, ok: !!cond });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
}

const SEED = {
  scene: 'fuori-casa',
  has: { ingranaggio: true, lancetta: true, chiave: true, dado: true },
  flags: {
    checkedPhone: true, checkedWindow: true, talkedToFigure: true,
    shutterOpened: true, clockFixed: true, readNote: true, dadoGifted: true,
    mirrorSolved: true,
    fuoriCasaIntro: true, casafArrival: false, luiSpoke1: false,
    fragCamera: false, fragGiardino: false, usbLoaded: false,
    readNoteLei: false, readNoteLui: false, mondo2Done: false,
  },
  inventory: ['cellulare', 'ingranaggio', 'lancetta', 'chiave', 'd4'],
  warmth: 1,
};

const readSave = (page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem('fragments_save') || '{}'));
const scene = (page) =>
  page.evaluate(() => document.querySelector('.scene.active')?.dataset.scene);
const isHidden = (page, action) =>
  page.evaluate((a) => document.querySelector(`[data-action="${a}"]`)?.classList.contains('hidden'), action);
const hasItem = (save, id) => (save.inventory || []).includes(id);
const flag = (save, f) => !!(save.flags || {})[f];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
page.on('pageerror', (e) => console.log('PAGEERROR', String(e)));

await page.goto(BASE_URL, { waitUntil: 'networkidle' });
await seedGame(page, SEED);

async function drain() {
  for (let i = 0; i < 60; i++) {
    const open = await page.evaluate(() =>
      document.getElementById('dialogue')?.classList.contains('show'));
    if (!open) return;
    await page.click('#dialogue');
    await page.waitForTimeout(70);
  }
}
// Chiude un eventuale closeup nota aperto (overlay #closeup).
const closeCloseup = async () => {
  const open = await page.evaluate(() => document.getElementById('closeup')?.classList.contains('open'));
  if (open) { await page.click('#cuClose'); await page.waitForTimeout(60); }
};
const tap = async (action) => { await page.click(`[data-action="${action}"]`); await page.waitForTimeout(60); };

// --- Fuori Casa: Auto (closeup) senza chiavi non dà nulla ---
assert('start: siamo a Fuori Casa', (await scene(page)) === 'fuori-casa');
await tap('auto');
assert('auto → closeup auto', (await scene(page)) === 'closeup-auto');
await tap('auto-take'); await drain();
assert('auto senza chiavi: nessuna chiave lavanderia', !hasItem(await readSave(page), 'chiavi-lavanderia'));
await tap('closeup-auto-back');
assert('closeup auto back → Fuori Casa', (await scene(page)) === 'fuori-casa');

// --- Cancello (closeup) 1ª volta → Soggiorno ---
await tap('cancello');
assert('cancello → closeup cancello', (await scene(page)) === 'closeup-cancello');
await tap('cancello-enter'); await drain();
await page.waitForTimeout(1000); await drain(); // fade + battuta d'arrivo
assert('cancello 1ª volta → Soggiorno', (await scene(page)) === 'casaf-soggiorno');
assert('arrivo Soggiorno segnato', flag(await readSave(page), 'casafArrival'));

// --- Giardino: hotspot nascosto finché non hai le chiavi auto ---
assert('giardino nascosto senza chiavi auto', await isHidden(page, 'to-giardino'));

// --- LUI S1 ---
await tap('lui'); await drain();
let s = await readSave(page);
assert('LUI S1: luiSpoke1 = true', flag(s, 'luiSpoke1'));
assert('LUI S1: ancora niente chiavi auto', !hasItem(s, 'chiavi-auto'));

// --- Frammento in Camera → item frammento-sinistro ---
await tap('to-camera'); assert('vado in Camera', (await scene(page)) === 'casaf-camera');
await tap('frammento-1'); await drain();
s = await readSave(page);
assert('frammento Camera raccolto', flag(s, 'fragCamera'));
assert('frammento Camera in inventario', hasItem(s, 'frammento-sinistro'));

// --- LUI S2 → chiavi auto + giardino ora visibile ---
await tap('to-soggiorno-cf');
await tap('lui'); await drain();
s = await readSave(page);
assert('LUI S2: chiavi auto ottenute', hasItem(s, 'chiavi-auto'));
assert('giardino ora visibile', !(await isHidden(page, 'to-giardino')));

// --- Giardino accessibile + frammento → item frammento-destro ---
await tap('to-giardino');
assert('giardino ora accessibile', (await scene(page)) === 'giardino');
await tap('frammento-2'); await drain();
s = await readSave(page);
assert('frammento Giardino raccolto', flag(s, 'fragGiardino'));
assert('frammento Giardino in inventario', hasItem(s, 'frammento-destro'));

// --- LUI S3 → USB ---
await tap('giardino-back');
await tap('lui'); await drain();
assert('LUI S3: USB ottenuta', hasItem(await readSave(page), 'usb'));

// --- PC in Soggiorno → Minigioco 1 (cuore) via hook → usbLoaded ---
await tap('pc'); await page.waitForTimeout(80);
assert('PC (soggiorno): minigioco cuore aperto', await page.evaluate(() =>
  document.getElementById('heartPuzzle')?.classList.contains('open')));
await page.evaluate(() => window.__solveHeart()); await drain();
assert('PC: usbLoaded = true', flag(await readSave(page), 'usbLoaded'));

// --- Stampante in Camera → Minigioco 2 (stampa) via hook → D6 ---
await tap('to-camera');
await tap('stampante'); await drain(); // 2 battute d'apertura, poi openPrint()
assert('Stampante (camera): minigioco stampa aperto', await page.evaluate(() =>
  document.getElementById('printPuzzle')?.classList.contains('open')));
await page.evaluate(() => window.__solvePrint());
await page.waitForTimeout(1200); await drain(); // timeout finale (1100ms) + battute
assert('Stampante: D6 stampato', hasItem(await readSave(page), 'd6'));

// --- Giardino: finale con D6 → mondo2Done, ritorno a Fuori Casa, warm-2 ---
await tap('to-soggiorno-cf');
await tap('to-giardino');
await tap('lei-giardino'); await drain();
await page.waitForTimeout(1300); // fadeWhite del finale
s = await readSave(page);
assert('finale: mondo2Done = true', flag(s, 'mondo2Done'));
assert('finale: ritorno a Fuori Casa', (await scene(page)) === 'fuori-casa');
assert('finale: warmth a livello 2', await page.evaluate(() => document.getElementById('stage').classList.contains('warm-2')));

// --- Post-Mondo2: Cancello (closeup) → Cortile della nonna ---
await tap('cancello'); await tap('cancello-enter'); await drain();
await page.waitForTimeout(900); await drain();
assert('cancello 2º stadio → Cortile della nonna', (await scene(page)) === 'cortile-nonna');

// --- Cortile: porta ingresso = flavor ("nessuno in casa") ---
await tap('porta-nonna'); await drain();
assert('porta nonna: resta al cortile', (await scene(page)) === 'cortile-nonna');

// --- Lavanderia SENZA chiavi: closeup raggiungibile, ingresso bloccato ---
await tap('to-lavanderia');
assert('cortile → closeup lavanderia', (await scene(page)) === 'lavanderia-closeup');
await tap('enter-lavanderia'); await drain();
assert('lavanderia senza chiavi → resta al closeup', (await scene(page)) === 'lavanderia-closeup');
assert('lavanderia senza chiavi: non ancora dentro', !hasItem(await readSave(page), 'chiavi-lavanderia'));
await tap('lavanderia-back');
assert('lavanderia back → cortile', (await scene(page)) === 'cortile-nonna');

// --- Auto (closeup) con chiavi auto → chiavi lavanderia ---
await tap('cortile-back'); await drain();
assert('cortile back → Fuori Casa', (await scene(page)) === 'fuori-casa');
await tap('auto'); await tap('auto-take'); await drain();
assert('auto con chiavi: chiavi lavanderia ottenute', hasItem(await readSave(page), 'chiavi-lavanderia'));
await tap('closeup-auto-back');

// --- Ora la lavanderia si apre ---
await tap('cancello'); await tap('cancello-enter'); await drain();
await page.waitForTimeout(900); await drain();
await tap('to-lavanderia');
await tap('enter-lavanderia');
assert('lavanderia con chiavi → interno', (await scene(page)) === 'interno-lavanderia');

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} asserzioni superate`);
process.exit(failed.length ? 1 : 0);
