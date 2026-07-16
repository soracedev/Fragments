// ============================================================
// SEED — carica uno stato di metà partita nel gioco già avviato.
//
// Il pulsante "Continua" non esiste più (si gioca solo da capo, vedi
// main.js), quindi i probe non possono più farsi caricare un salvataggio
// dal gioco: si agganciano ai moduli veri tramite il dev server di Vite,
// che li serve non bundlati. È la stessa logica che stava dietro
// "Continua", spostata nell'harness — l'unico posto che ne ha ancora
// bisogno.
//
// RICHIEDE `npm run dev` (:5173), non `npm run preview`: contro il build
// di produzione i moduli sono bundlati e /src/... non esiste.
// ============================================================

export const DEV_URL = process.env.BASE_URL || 'http://localhost:5173';

export async function seedGame(page, SEED) {
  await page.addScriptTag({
    type: 'module',
    content: `
      import { S } from '/src/state.js';
      import { show, setWarmth } from '/src/engine.js';
      import { refreshPrologueHotspots } from '/src/worlds/prologue.js';
      import { refreshHotspots } from '/src/worlds/mondo1.js';
      import { refreshMondo2Hotspots } from '/src/worlds/mondo2.js';
      import { refreshBackpackBadge } from '/src/inventory.js';

      window.__seed = (saved) => {
        Object.assign(S, saved);
        document.querySelector('#hud')?.classList.add('show');
        show(S.scene || 'hub');
        setWarmth(S.warmth || 0);
        refreshPrologueHotspots();
        refreshHotspots();
        refreshMondo2Hotspots();
        refreshBackpackBadge();
      };
      // show() vero: passa da playForScene(), quindi muove anche la musica.
      window.__show = show;
    `,
  });
  await page.waitForFunction(() => typeof window.__seed === 'function');
  await page.evaluate((s) => window.__seed(s), SEED);
  await page.evaluate(() =>
    document.getElementById('title')?.style.setProperty('display', 'none'),
  );
  await page.waitForTimeout(300);
}
