// ============================================================
// PROLOGO — intro + prima interazione nella camera.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, P, SG, show } from '../engine.js';

// ---- Testo introduttivo (riscrivibile con parole tue) ----

const INTRO_LINES = [
  "Ti sei svegliata, ma qualcosa non torna.",
  "Il telefono segna sempre la stessa ora. 03:25.",
  "Non c\u2019\u00e8 vento. Non cantano gli uccelli. Non c\u2019\u00e8 nessun suono.",
  "Come se il tempo, qui, avesse deciso di fermarsi.",
  "\u2014 o come se qualcuno gli avesse chiesto di farlo."
];

let introIdx = 0;
let introTimer = null;

function introStep() {
  if (introIdx >= INTRO_LINES.length) { endIntro(); return; }
  const el = $('#introLine');
  el.textContent = INTRO_LINES[introIdx];
  el.classList.remove('vis');
  void el.offsetWidth;
  el.classList.add('vis');
  introIdx++;
  introTimer = setTimeout(introStep, 5000);
}

function endIntro() {
  clearTimeout(introTimer);
  const el = $('#intro');
  el.style.transition = 'opacity 1s';
  el.style.opacity = 0;
  setTimeout(() => {
    el.classList.remove('show');
    el.style.opacity = 1;
    startPrologue();
  }, 1000);
}

export function runIntro() {
  introIdx = 0;
  $('#intro').classList.add('show');
  introStep();
}

export function initIntro() {
  $('#introSkip').addEventListener('click', endIntro);
}

// ---- Prologo vero e proprio ----

function startPrologue() {
  $('#hud').classList.add('show');
  show('hub');

  speak([
    P("Ok."),
    P("Ok, non \u00e8 ok. Manca qualcosa."),
    SG("La stanza \u00e8 immobile. Nessun'ombra si muove. Il telefono sul comodino segna le 03:25."),
    P("Le 03:25. Anche ieri. Anche l'altro ieri, mi pare \u2014 boh, non lo so nemmeno pi\u00f9."),
    SG("Sul davanzale, qualcosa di rossiccio guizza e sparisce dietro l'angolo."),
    P("...c'era qualcosa l\u00ec? Vabb\u00e8."),
  ], () => {
    S.flags.prologueDone = true;
    writeSave();
    if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();
  });
}
