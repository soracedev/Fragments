// ============================================================
// PROLOGO — P0 monologo a schermo nero + P1 camera da letto.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, P, SG, show, setHS, fadeWhite, isDialogueLocked } from '../engine.js';
import { addItem } from '../inventory.js';
import { arrivePiazza } from './mondo1.js';
import { enterFuoriCasa } from './mondo2.js';

// ---- P0 · Monologo a schermo nero ----

const INTRO_LINES = [
  "Ricordo solo che stavo scrollando YouTube cercando chissà cosa...",
  "Poi le 3:00 di notte. Non ho sonno, ma decido di andare a dormire.",
  "Metto la sveglia per domani mattina. Vorrei provare a impegnare la giornata, concludendo qualcosa... Sì. Ma cosa?",
  "Senza rendermene conto chiudo gli occhi. Al risveglio c'era qualcosa di strano — non saprei descriverlo.",
  "Era come se il tempo stesso fosse fermo. Un silenzio quasi inquietante.",
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

// ---- P1 · Camera da letto ----

function startPrologue() {
  $('#hud').classList.add('show');
  show('hub');

  // Il cellulare è nello zaino fin da subito: la sua nota ("fisso alle 3:00")
  // fa da indizio per l'orologio di Nettuno.
  addItem('cellulare');

  speak([
    P('Ok.'),
    P('Ok, non è ok. Manca qualcosa.'),
    SG("La stanza è immobile. Luce piatta, nessun'ombra viva. Sul letto il gatto dorme beato — l'unica cosa che sembra normale qui dentro."),
    P('Non ha suonato la sveglia. Che strano...'),
    P('E che ora è, poi? ...Le 3:00?'),
    P('Le 3:00 del mattino? Impossibile, di fuori è giorno e ricordo benissimo di essermi addormentata.'),
  ], refreshPrologueHotspots);
}

// I quattro hotspot sono sempre attivi: nessun ordine imposto.
export function refreshPrologueHotspots() {
  if (S.scene !== 'hub') return;
  setHS('gatto', true);
  setHS('telefono', true);
  setHS('finestra', true);
  setHS('porta', true);
}

const ACTIONS = {
  'gatto': () => speak([P('Beato tu che dormi. Bella la vita eh?')]),

  'telefono': () => {
    if (S.flags.checkedPhone) {
      speak([P('Né campo né WiFi. Sai che novità.')]);
      return;
    }
    speak([
      P('Né campo né WiFi. Sai che novità.'),
      P('Fammi andare a controllare giù da mia nonna. Con il suo WiFi dovrei riuscire a collegarmi.'),
    ], () => {
      S.flags.checkedPhone = true;
      writeSave();
    });
  },

  'finestra': () => {
    if (S.flags.checkedWindow) {
      speak([P('Non so dire se sia rilassante o meno.')]);
      return;
    }
    speak([
      P('Che tempo strano, mai vista tutta questa nebbia. Non si sentono nemmeno gli uccellini o il rumore del vento.'),
      P('Non so dire se sia rilassante o meno.'),
    ], () => {
      S.flags.checkedWindow = true;
      writeSave();
    });
  },

  'porta': () => {
    // Dopo il ritorno dalla spiaggia la porta non porta più nella piazza
    // dell'orologio, ma davvero fuori casa (scena segnaposto, arte da fare).
    if (S.flags.dadoGifted) {
      fadeWhite(() => { enterFuoriCasa(); });
      return;
    }
    speak([
      P('È il momento di alzarsi.'),
    ], () => fadeWhite(() => { show('piazza'); arrivePiazza(); }));
  },
};

export function initPrologueHotspots() {
  window.__refreshPrologueHotspots = refreshPrologueHotspots;

  $('#stage').addEventListener('click', e => {
    const h = e.target.closest('.hotspot');
    if (!h || isDialogueLocked()) return;
    const action = h.dataset.action;
    if (ACTIONS[action]) ACTIONS[action]();
  });
}
