// ============================================================
// ENIGMA INGRANAGGI — sequenza da attivare in ordine.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, $$, speak, SG, P, show, setHS } from '../engine.js';
import { addItem } from '../inventory.js';

let gearNext = 1;

export function openGear() {
  gearNext = 1;
  $('#gearFb').textContent = '\u2026';
  $$('.gear').forEach(g => g.classList.remove('lit'));
  $('#gearPuzzle').classList.add('open');
}

function gearSolved() {
  $('#gearPuzzle').classList.remove('open');
  S.has.lancetta = true;
  addItem('lancetta');
  writeSave();

  speak([
    SG("Dietro la saracinesca alzata, incastrata, una lancetta di ferro."),
    P("Eccola."),
  ], () => {
    show('piazza');
    // refreshHotspots è chiamato dal mondo
    if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();
  });
}

export function initGearPuzzle() {
  const backBtn = $('#gearBack');
  if (backBtn) backBtn.addEventListener('click', () => $('#gearPuzzle').classList.remove('open'));

  $$('.gear').forEach(g => {
    g.addEventListener('click', () => {
      const o = +g.dataset.order;
      if (o === gearNext) {
        g.classList.add('lit');
        gearNext++;
        const fb = $('#gearFb');
        fb.classList.remove('ok');
        if (gearNext > 3) {
          fb.textContent = 'Il meccanismo gira. La saracinesca si alza.';
          fb.classList.add('ok');
          setTimeout(gearSolved, 1100);
        } else {
          fb.textContent = 'Ingrana. Continua.';
        }
      } else {
        $$('.gear').forEach(x => x.classList.remove('lit'));
        gearNext = 1;
        const fb = $('#gearFb');
        fb.classList.remove('ok');
        fb.textContent = 'No. Non così. — Vabbè, riprovo, mica scappa nessuno.';
      }
    });
  });
}
