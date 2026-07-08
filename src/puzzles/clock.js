// ============================================================
// ENIGMA OROLOGIO — allinea le lancette a 03:25.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, SG, P, L, collectDie } from '../engine.js';
import { addItem } from '../inventory.js';

const TH = 3, TM = 25;

function drawClock() {
  const h = +$('#rangeH').value;
  const m = +$('#rangeM').value;
  $('#handH').style.transform = `rotate(${(h % 12) * 30 + m * 0.5}deg)`;
  $('#handM').style.transform = `rotate(${m * 6}deg)`;
  const off = Math.abs(h - TH) + Math.abs(m - TM) / 5;
  const fb = $('#clockFb');
  const ok = $('#clockOk');
  if (h === TH && m === TM) {
    fb.textContent = '03:25 \u2014 il tempo si sblocca.';
    fb.classList.add('ok');
    ok.style.display = 'inline-block';
  } else {
    fb.classList.remove('ok');
    ok.style.display = 'none';
    fb.textContent = off <= 2 ? 'Ci sei quasi\u2026' : (off <= 5 ? 'Ti stai avvicinando.' : 'Le lancette non combaciano.');
  }
}

export function openClock() {
  speak([
    SG("Ti avvicini all'orologio. Le lancette sono immobili."),
    P("03:25. Perché proprio quell'ora, poi, chissà."),
  ], () => {
    $('#clockPuzzle').classList.add('open');
    drawClock();
  });
}

export function initClockPuzzle() {
  $('#rangeH').addEventListener('input', drawClock);
  $('#rangeM').addEventListener('input', drawClock);
  $('#clockBack').addEventListener('click', () => $('#clockPuzzle').classList.remove('open'));

  $('#clockOk').addEventListener('click', () => {
    $('#clockPuzzle').classList.remove('open');
    S.flags.clockFixed = true;
    writeSave();

    speak([
      SG("L'orologio riparte. Dentro il meccanismo, incastonato con cura, qualcosa che non c'entra con l'ingranaggio."),
      P("...e questo? Non \u00e8 un pezzo dell'orologio."),
      P("\u00c8... uno dei suoi. Fatto bene, pure. Certo che qui dentro le cose strane non finiscono mai."),
    ], () => {
      collectDie(1);
      addItem('dado1');
      S.flags.leiResisted = true;
      writeSave();
      if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();

      speak([
        L("Ok, riparte. E quindi?"),
        L("Va bene, eh. Sul serio. Solo... non \u00e8 che uno \u00abriparte\u00bb cos\u00ec, perch\u00e9 un orologio ticchetta di nuovo."),
        SG("In fondo alla piazza, una finestra prima buia si illumina."),
        P("...quella finestra prima non c'era, o non era accesa?"),
        L("Non... non lo so. Forse no."),
      ], () => {
        if (typeof window.__onClockDone === 'function') window.__onClockDone();
      });
    });
  });
}
