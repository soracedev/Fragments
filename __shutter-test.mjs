import { chromium } from 'playwright';
const SHOT = process.env.SHOT_DIR;
const save = {
  scene: 'vicolo',
  has: { ingranaggio: true, lancetta: false, chiave: false, dado: false },
  flags: { checkedPhone: true, checkedWindow: true, talkedToFigure: true,
    shutterOpened: false, clockFixed: false, readNote: true, dadoGifted: false },
  dice: [], inventory: ['ingranaggio'], warmth: 0,
};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 960, height: 720 } });
await page.addInitScript(s => localStorage.setItem('fragments_save', s), JSON.stringify(save));
await page.goto('http://localhost:5173/');
await page.click('#continueBtn');
await page.waitForSelector('.scene[data-scene="vicolo"].active', { timeout: 5000 });
await page.waitForTimeout(1200);
await page.click('[data-action="saracinesca"]');
for (let i = 0; i < 6; i++) {
  if (await page.locator('#shutterPuzzle.open').count()) break;
  await page.click('#dialogue'); await page.waitForTimeout(400);
}
await page.waitForSelector('#shutterPuzzle.open', { timeout: 5000 });
await page.waitForTimeout(500);
await page.screenshot({ path: `${SHOT}/6-shutter.png` });
console.log('shutter aperto OK');
await browser.close();
