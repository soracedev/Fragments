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
await page.evaluate(() => {
  ['#gate', '#title'].forEach((s) =>
    document.querySelector(s)?.style.setProperty('display', 'none'),
  );
});

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
assert('cassaforte: d4 in inventario', (save.inventory || []).includes('d4'));
assert('cassaforte: overlay chiuso dopo la soluzione', await page.evaluate(() => !document.getElementById('safePuzzle').classList.contains('open')));

// chiude eventuale dialogo aperto dalla soluzione
await page.evaluate(() => document.querySelector('#dialogue')?.classList.remove('show'));

// --- SPECCHIO: rubinetto apre l'acqua → vapore sale → numero affiora ---
// Il giocatore controlla il vapore: un tocco apre l'acqua, il livello
// sale da solo fino al pieno e a quel punto il numero è leggibile →
// mirrorSolved. Il numero è su un layer separato (#mirrorNumber) che
// fa crossfade con l'opacità, non uno swap di sfondo.
await page.evaluate(() => {
  document.querySelectorAll('.puzzle').forEach((p) => p.classList.remove('open'));
});

// 1) Chiudendo l'acqua troppo presto NON risolve.
await page.evaluate(() => document.getElementById('mirrorPuzzle').classList.add('open'));
await page.click('#mirrorTap');        // apre l'acqua
await page.waitForTimeout(400);
await page.click('#mirrorTap');        // la richiude quasi subito (sotto soglia)
await page.waitForTimeout(200);
save = await readSave(page);
assert('specchio: chiudere presto NON risolve', !save.flags?.mirrorSolved);
assert('specchio: il vapore si congela (numero parzialmente visibile)', await page.evaluate(() => {
  const o = parseFloat(document.getElementById('mirrorNumber').style.opacity || '0');
  return o > 0 && o < 0.75;
}));

// 2) Riaprendo l'acqua e lasciandola salire al pieno → risolve.
await page.click('#mirrorTap');
await page.waitForTimeout(5000);
save = await readSave(page);
assert('specchio: mirrorSolved = true a vapore pieno', save.flags?.mirrorSolved === true);
assert('specchio: numero completamente affiorato', await page.evaluate(() =>
  parseFloat(document.getElementById('mirrorNumber').style.opacity || '0') >= 0.99));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} asserzioni superate`);
process.exit(failed.length ? 1 : 0);
