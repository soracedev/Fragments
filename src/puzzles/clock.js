// ============================================================
// ENIGMA OROLOGIO — allinea le lancette a 03:00.
//
// Quadrante e lancette sono tre immagini separate. Gli sprite
// delle lancette sono disegnati in diagonale, non in verticale:
// HAND_*_OFFSET è la rotazione che serve a riportarli su
// mezzogiorno, misurata sui pixel (perno → punta).
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, SG, P, L } from '../engine.js';
import { addItem } from '../inventory.js';

const TH = 3, TM = 0;

const HAND_H_OFFSET = 46.17;
const HAND_M_OFFSET = 64.59;

// Perno dello sprite (il foro dell'anello), identico per entrambe le lancette.
const HAND_PIVOT = 'translate(-75.55%, -74.43%)';

function drawClock() {
  const h = +$('#rangeH').value;
  const m = +$('#rangeM').value;

  const hDeg = HAND_H_OFFSET + (h % 12) * 30 + m * 0.5;
  const mDeg = HAND_M_OFFSET + m * 6;
  $('#handH').style.transform = `${HAND_PIVOT} rotate(${hDeg}deg)`;
  $('#handM').style.transform = `${HAND_PIVOT} rotate(${mDeg}deg)`;

  const off = Math.abs(h - TH) + Math.abs(m - TM) / 5;
  const fb = $('#clockFb');
  const ok = $('#clockOk');
  if (h === TH && m === TM) {
    fb.textContent = '03:00 — il tempo si sblocca.';
    fb.classList.add('ok');
    ok.style.display = 'inline-block';
  } else {
    fb.classList.remove('ok');
    ok.style.display = 'none';
    fb.textContent = off <= 2 ? 'Ci sei quasi…' : (off <= 5 ? 'Ti stai avvicinando.' : 'Le lancette non combaciano.');
  }
}

export function openClock() {
  speak([
    SG("Ti avvicini all'orologio. La lancetta delle ore entra nel perno, come se avesse sempre avuto quel posto."),
    P('03:00. Perché proprio quell’ora, poi, chissà.'),
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
      SG("L'orologio riparte. Un ticchettio, poi un CLICK secco: da dietro il quadrante cade qualcosa che tintinna sul selciato."),
      P('Una chiave.'),
    ], () => {
      S.has.chiave = true;
      addItem('chiave');
      writeSave();
      if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();

      speak([
        P('Hai visto? Incredibile, ma ce l’ho fatta.'),
        L('Ok, riparte. E quindi?'),
        L('Va bene, eh. Sul serio. Solo... non è che uno «riparte» così, perché un orologio ticchetta di nuovo.'),
        SG('In fondo alla piazza, una finestra prima buia si illumina. Sotto, una porta.'),
      ], () => {
        if (typeof window.__onClockDone === 'function') window.__onClockDone();
      });
    });
  });
}
