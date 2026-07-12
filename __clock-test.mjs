import { chromium } from 'playwright';

const SHOT = process.env.SHOT_DIR;
const save = {
  scene: 'piazza',
  has: { ingranaggio: true, lancetta: true, chiave: false, dado: false },
  flags: {
    checkedPhone: true, checkedWindow: true, talkedToFigure: true,
    shutterOpened: true, clockFixed: false, readNote: true, dadoGifted: false,
  },
  dice: [], inventory: ['ingranaggio', 'lancetta'], warmth: 0,
};

// direzione da un angolo-orologio (0 = mezzogiorno, orario)
function dir(deg) {
  const r = (deg * Math.PI) / 180;
  return { dx: Math.sin(r), dy: -Math.cos(r) };
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
page.on('console', m => { if (m.type() === 'error') console.log('PAGE ERR:', m.text()); });
page.on('pageerror', e => console.log('PAGE EXCEPTION:', e.message));

await page.addInitScript(s => {
  localStorage.setItem('fragments_save', s);
}, JSON.stringify(save));

await page.goto('http://localhost:5173/');
await page.click('#continueBtn');
await page.waitForSelector('.scene[data-scene="piazza"].active', { timeout: 5000 });
await page.waitForTimeout(1500); // fade + say()
await page.screenshot({ path: `${SHOT}/1-piazza.png` });

// apri il puzzle orologio
await page.click('[data-action="piazza-clock"]');
// avanza i 2 dialoghi di openClock
for (let i = 0; i < 6; i++) {
  if (await page.locator('#clockPuzzle.open').count()) break;
  await page.click('#dialogue');
  await page.waitForTimeout(400);
}
await page.waitForSelector('#clockPuzzle.open', { timeout: 5000 });
await page.waitForTimeout(400);
await page.screenshot({ path: `${SHOT}/2-clock-initial.png` });

// geometria del quadrante
const box = await page.locator('#clock').boundingBox();
const cx = box.x + box.width * 0.4979;
const cy = box.y + box.height * 0.4716;
const R = box.width * 0.30;

async function dragHand(fromDeg, toDeg) {
  const a = dir(fromDeg), b = dir(toDeg);
  await page.mouse.move(cx + a.dx * R, cy + a.dy * R);
  await page.mouse.down();
  await page.waitForTimeout(60);
  // qualche step intermedio per un drag realistico
  for (let t = 1; t <= 5; t++) {
    const k = t / 5;
    const dx = a.dx + (b.dx - a.dx) * k;
    const dy = a.dy + (b.dy - a.dy) * k;
    await page.mouse.move(cx + dx * R, cy + dy * R);
    await page.waitForTimeout(30);
  }
  await page.mouse.up();
  await page.waitForTimeout(300);
}

// stato iniziale 07:40 → ore a 210°, minuti a 240°
// 1) porta la lancetta delle ORE dal 7 al 3 (210° → 90°)
await dragHand(210, 90);
const fb1 = await page.locator('#clockFb').textContent();
console.log('dopo lancetta ore:', JSON.stringify(fb1));
await page.screenshot({ path: `${SHOT}/3-hour-set.png` });

// 2) porta la lancetta dei MINUTI dall'8 al 12 (240° → 0°)
await dragHand(240, 0);
await page.waitForTimeout(400);
const fb2 = await page.locator('#clockFb').textContent();
const solvedClass = await page.locator('#clock.solved').count();
console.log('dopo lancetta minuti:', JSON.stringify(fb2), '| solved class:', solvedClass);
await page.screenshot({ path: `${SHOT}/4-solved.png` });

// verifica auto-avanzamento: parte il dialogo della chiave
await page.waitForTimeout(1400);
const puzzleStillOpen = await page.locator('#clockPuzzle.open').count();
const dialogueShown = await page.locator('#dialogue.show').count();
console.log('puzzle ancora aperto:', puzzleStillOpen, '| dialogo chiave visibile:', dialogueShown);
await page.screenshot({ path: `${SHOT}/5-after-solve.png` });

console.log('RESULT:', solvedClass === 1 && fb2.includes('03:00') ? 'PASS' : 'FAIL');
await browser.close();
