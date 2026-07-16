// ============================================================
// PROBE FINALE — verifica la sequenza della lavanderia: LEI →
// Tavolino → Compressore → set dadi → dialogo finale → abbraccio →
// nero → dedica. Parte da un seed post-Mondo2 nel Cortile della nonna,
// con le chiavi della lavanderia già raccolte. Esce !=0 se fallisce.
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
  scene: 'cortile-nonna',
  has: { ingranaggio: true, lancetta: true, chiave: true, dado: true },
  flags: {
    checkedPhone: true, checkedWindow: true, talkedToFigure: true,
    shutterOpened: true, clockFixed: true, readNote: true, dadoGifted: true,
    mirrorSolved: true,
    fuoriCasaIntro: true, casafArrival: true, luiSpoke1: true,
    fragCamera: true, fragGiardino: true, usbLoaded: true,
    readNoteLei: true, readNoteLui: true, mondo2Done: true,
    leiLavIntro: false, tavoloDone: false, compressoreDone: false, gameDone: false,
  },
  inventory: ['cellulare', 'ingranaggio', 'lancetta', 'chiave', 'd4',
    'frammento-sinistro', 'frammento-destro', 'chiavi-auto', 'usb', 'chiavi-lavanderia', 'd6'],
  warmth: 2,
};

const readSave = (page) =>
  page.evaluate(() => JSON.parse(localStorage.getItem('fragments_save') || '{}'));
const scene = (page) =>
  page.evaluate(() => document.querySelector('.scene.active')?.dataset.scene);
const isHidden = (page, a) =>
  page.evaluate((x) => document.querySelector(`[data-action="${x}"]`)?.classList.contains('hidden'), a);
const isOpen = (page, id) =>
  page.evaluate((x) => document.getElementById(x)?.classList.contains('open'), id);
const hasItem = (save, id) => (save.inventory || []).includes(id);
const flag = (save, f) => !!(save.flags || {})[f];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
page.on('pageerror', (e) => console.log('PAGEERROR', String(e)));

await page.goto(BASE_URL, { waitUntil: 'networkidle' });
await seedGame(page, SEED);

async function drain() {
  for (let i = 0; i < 80; i++) {
    const open = await page.evaluate(() => document.getElementById('dialogue')?.classList.contains('show'));
    if (!open) return;
    await page.click('#dialogue'); await page.waitForTimeout(60);
  }
}
const tap = async (a) => { await page.click(`[data-action="${a}"]`); await page.waitForTimeout(60); };

// --- Cortile → Lavanderia → Interno (con chiavi) + dialogo LEI ---
assert('start: Cortile della nonna', (await scene(page)) === 'cortile-nonna');
await tap('to-lavanderia');
assert('cortile → closeup lavanderia', (await scene(page)) === 'lavanderia-closeup');
await tap('enter-lavanderia'); await drain();
assert('closeup → interno lavanderia', (await scene(page)) === 'interno-lavanderia');
assert('LEI: dialogo d’ingresso fatto', flag(await readSave(page), 'leiLavIntro'));
assert('Tavolino visibile dopo LEI', !(await isHidden(page, 'tavolino')));
assert('Compressore visibile dopo LEI', !(await isHidden(page, 'compressore')));

// --- Compressore bloccato prima del Tavolino ---
await tap('compressore'); await drain();
assert('Compressore bloccato senza stampo', !(await isOpen(page, 'compressorePuzzle')));
assert('Compressore: tavoloDone ancora falso', !flag(await readSave(page), 'tavoloDone'));

// --- Tavolino → hook → tavoloDone ---
await tap('tavolino');
assert('Tavolino: minigioco aperto', await isOpen(page, 'tavoloPuzzle'));
await page.evaluate(() => window.__solveTavolino()); await drain();
assert('Tavolino completato', flag(await readSave(page), 'tavoloDone'));

// --- Compressore ora apribile → hook → set dadi + finale ---
await tap('compressore');
assert('Compressore: minigioco aperto', await isOpen(page, 'compressorePuzzle'));
await page.evaluate(() => window.__solveCompressore());
await page.waitForTimeout(1000);            // onComplete (900) + avvio dialogo finale
let s = await readSave(page);
assert('Compressore completato', flag(s, 'compressoreDone'));
assert('set dadi ottenuto (D8/D20)', hasItem(s, 'd8') && hasItem(s, 'd20'));
await drain();                              // dialogo finale §6
assert('finale: illustrazione dell’abbraccio', (await scene(page)) === 'abbraccio');
await drain();                              // battuta dell'abbraccio
await page.waitForTimeout(1400);            // fadeBlack (hold 1000) + apertura crediti
await page.waitForTimeout(1800);            // fade-in della dedica (1.6s)

// Storyboard finale §7 + §9: niente ritorno in camera, niente riflessione
// di Nox — dall'abbraccio si va al nero e dal nero alla dedica.
s = await readSave(page);
assert('finale: gameDone', flag(s, 'gameDone'));
assert('finale: nessun ritorno in camera (resta su abbraccio)', (await scene(page)) === 'abbraccio');
assert('finale: nessuna riflessione (dialogo chiuso)',
  !(await page.evaluate(() => document.getElementById('dialogue')?.classList.contains('show'))));
assert('finale: crediti aperti', await isOpen(page, 'credits'));
assert('finale: dedica in dissolvenza completata',
  (await page.evaluate(() => +getComputedStyle(document.querySelector('.creditsInner')).opacity)) === 1);
assert('finale: nessun segnaposto nella dedica',
  !(await page.evaluate(() => document.body.innerHTML.includes('SEGNAPOSTO'))));
assert('finale: dedica scorrevole (formato B)',
  await page.evaluate(() => {
    const c = document.getElementById('credits');
    return c.scrollHeight > c.clientHeight;
  }));

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} asserzioni superate`);
process.exit(failed.length ? 1 : 0);
