// ============================================================
// PROBE — verifica comportamentale dei puzzle Fase 3 (cassaforte,
// specchio) pilotando gli hotspot/tasti reali e leggendo lo stato
// salvato in localStorage. Esce !=0 se un'asserzione fallisce.
// ============================================================

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';
const results = [];
function assert(name, cond) {
  results.push({ name, ok: !!cond });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`);
}

const readSave = (page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem('fragments_save') || '{}'));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
page.on('pageerror', (e) => console.log('PAGEERROR', String(e)));
await page.goto(BASE_URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.querySelector('#title')?.style.setProperty('display', 'none'));

// --- CASSAFORTE: codice sbagliato non risolve, codice giusto sì ---
const openSafe = () => page.evaluate(() => document.getElementById('safePuzzle').classList.add('open'));
const tapKeys = async (seq) => {
  for (const k of seq) {
    await page.click(`#safeKeys button[data-key="${k}"]`);
    await page.waitForTimeout(40);
  }
};

await openSafe();
await tapKeys(['0', '0', '0', '0', '0', '0']);
await page.waitForTimeout(900);
let save = await readSave(page);
assert('cassaforte: codice errato NON dà il dado', !save.has?.dado);
assert('cassaforte: resta aperta dopo errore', await page.evaluate(() => document.getElementById('safePuzzle').classList.contains('open')));

await tapKeys(['2', '1', '0', '5', '2', '5']);
await page.waitForTimeout(1300);
save = await readSave(page);
assert('cassaforte: codice 210525 dà il dado', save.has?.dado === true);
assert('cassaforte: dado1 in inventario', (save.inventory || []).includes('dado1'));
assert('cassaforte: overlay chiuso dopo la soluzione', await page.evaluate(() => !document.getElementById('safePuzzle').classList.contains('open')));

// chiude eventuale dialogo aperto dalla soluzione
await page.evaluate(() => document.querySelector('#dialogue')?.classList.remove('show'));

// --- SPECCHIO: rubinetto → vapore ~5s → numero + mirrorSolved ---
await page.evaluate(() => {
  document.querySelectorAll('.puzzle').forEach((p) => p.classList.remove('open'));
  document.getElementById('mirrorPuzzle').classList.add('open');
});
// reset dello stato interno del modulo via il vero flusso non è esposto:
// forziamo lo sfondo di partenza e azioniamo il rubinetto reale.
await page.evaluate(() => {
  document.getElementById('mirrorBg').style.backgroundImage = "url('/assets/images/CittaFerma/closeup-specchio.png')";
});
await page.click('#mirrorTap');
await page.waitForTimeout(6000);
save = await readSave(page);
assert('specchio: mirrorSolved = true dopo il vapore', save.flags?.mirrorSolved === true);
assert('specchio: sfondo passato al numero', await page.evaluate(() =>
  document.getElementById('mirrorBg').style.backgroundImage.includes('closeup-specchio-numero')));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} asserzioni superate`);
process.exit(failed.length ? 1 : 0);
