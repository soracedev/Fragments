// ============================================================
// MONDO 1 — NETTUNO (La Città Ferma)
// Tutte le azioni degli hotspot di questo mondo, dialoghi con
// Lei-Nettuno, e logica di avanzamento.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, show, setHS, hs, P, L, SG, FX, say, isDialogueLocked } from '../engine.js';
import { openGear } from '../puzzles/gears.js';
import { openClock } from '../puzzles/clock.js';

// ---- Hotspot refresh (specifico per questo mondo) ----

export function refreshHotspots() {
  if (S.scene === 'hub') {
    setHS('hub-desk', S.flags.prologueDone);
    setHS('hub-window', S.flags.prologueDone);
    setHS('hub-door', S.flags.prologueDone);
  }
  if (S.scene === 'piazza') {
    setHS('lei', true);
    setHS('piazza-clock', S.flags.arrivedPiazza);
    setHS('fox-vicolo', S.flags.arrivedPiazza && !S.has.lancetta);
    setHS('to-vicolo', S.flags.arrivedPiazza);
    setHS('to-negozio', S.flags.clockFixed && S.flags.leiResisted);
    if (hs('piazza-clock')) hs('piazza-clock').classList.toggle('done', S.flags.clockFixed);
  }
}

// ---- Arrivo in piazza ----

function arrivePiazza() {
  S.flags.arrivedPiazza = true;
  writeSave();
  refreshHotspots();
  speak([
    SG("La piazza di Nettuno. Foschia bassa, l'orologio pubblico fermo. Su una panchina, seduta, una ragazza dallo sguardo basso."),
    P("Ah. Ok, quindi \u00e8 tipo cos\u00ec che funziona."),
  ], () => talkLei(true));
}

// ---- Dialoghi con Lei-Nettuno ----

function talkLei(first) {
  if (S.flags.clockFixed && !S.has.orologioTasca && S.flags.leiResisted) {
    speak([
      L("Ok, riparte. E quindi?"),
      L("Va bene, eh. Sul serio. Solo... non \u00e8 che uno \u00abriparte\u00bb cos\u00ec, perch\u00e9 un orologio ticchetta di nuovo."),
    ]);
    return;
  }
  if (first) {
    speak([
      P("Ehi."),
      L("Ehi. Se sei venuta a dirmi che devo \u00abreagire\u00bb, puoi anche tornare da dove sei venuta."),
      P("No, tranquilla. Non sono neanche brava a dirlo a me, figurati a te."),
      L("L'orologio \u00e8 fermo da... non lo so. Da quando ho smesso di controllare, credo."),
      L("Comunque va bene cos\u00ec. Tanto anche se riparte, poi si rompe di nuovo. No?"),
      P("Manca la lancetta piccola. Tutto qui?"),
      L("Boh. Prova pure. Io resto qui."),
      FX("Sul muretto in fondo, una volpe si \u00e8 seduta. Guarda verso la traversa a sinistra."),
    ], () => {
      setHS('fox-vicolo', true);
      refreshHotspots();
    });
  } else {
    speak([L("Sono ancora qui. Non vado da nessuna parte, tranquilla.")]);
  }
}

// ---- Fine bozza (placeholder per il negozio) ----

function showEnd() {
  $('#endtext').textContent =
    "L'orologio di Nettuno batte di nuovo le ore, e una finestra si \u00e8 accesa. " +
    "Il primo dado \u00e8 tuo. Da qui la storia prosegue nel vecchio negozio \u2014 " +
    "e verso i due mondi che restano.";
  $('#endcard').classList.add('show');
}

// ---- Mappa azioni hotspot ----

const ACTIONS = {
  // --- HUB ---
  'hub-desk': () => speak([
    P("Le 03:25. Da qui non si muove."),
    P("Se la risposta fosse in questa stanza, l'avrei gi\u00e0 trovata. Immagino."),
  ]),
  'hub-window': () => speak([
    SG("Fuori, tutto \u00e8 fermo. Nemmeno una foglia."),
    P("Manco un albero che si muove. Comunque bel panorama da incubo, complimenti a chi l'ha scelto."),
  ]),
  'hub-door': () => speak([
    P("Va bene. O esco, o resto qui a fissare un orologio rotto. Detta cos\u00ec sembra facile."),
  ], () => { show('piazza'); arrivePiazza(); }),

  // --- PIAZZA ---
  'lei': () => talkLei(false),
  'fox-vicolo': () => speak([
    FX("La volpe \u00e8 seduta su un muretto. Ti guarda, poi si volta verso la traversa a sinistra della piazza."),
    P("Va bene, va bene, ho capito. Di l\u00e0."),
  ], () => { setHS('to-vicolo', true); }),
  'to-vicolo': () => show('vicolo'),
  'piazza-clock': () => {
    if (S.flags.clockFixed) { speak([P("Ticchetta di nuovo. Un rumore quasi dimenticato.")]); return; }
    if (!S.has.lancetta) { speak([P("Manca la lancetta piccola. Devo trovarla prima.")]); return; }
    openClock();
  },
  'to-negozio': () => speak([
    SG("Una finestra prima buia, in fondo alla piazza, ora \u00e8 illuminata."),
  ], showEnd),

  // --- VICOLO ---
  'saracinesca': () => {
    if (S.has.lancetta) { speak([P("Ho gi\u00e0 preso quello che serviva, qui.")]); return; }
    speak([
      SG("Una vecchia saracinesca arrugginita, mezza abbassata. Sotto, qualcosa di metallico incastrato."),
      P("C'\u00e8 qualcosa l\u00ec sotto. Ovviamente nel punto pi\u00f9 scomodo possibile."),
    ], openGear);
  },
  'vicolo-back': () => show('piazza'),
};

// ---- Callback per puzzles (bridge tra moduli) ----

window.__refreshHotspots = refreshHotspots;
window.__onClockDone = () => { setHS('to-negozio', true); };

// ---- Init: listener unico sullo stage ----

export function initMondo1() {
  $('#stage').addEventListener('click', e => {
    const h = e.target.closest('.hotspot');
    if (!h || isDialogueLocked()) return;
    const action = h.dataset.action;
    if (ACTIONS[action]) ACTIONS[action]();
  });

  $('#restart').addEventListener('click', () => location.reload());

  refreshHotspots();
}
