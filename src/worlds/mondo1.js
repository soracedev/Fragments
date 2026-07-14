// ============================================================
// MONDO 1 — NETTUNO (La Città Ferma)
//
// Quattro location collegate:
//   N1 piazza   — orologio, figura misteriosa, porta della Casa
//   N2 vicolo   — saracinesca (serve l'ingranaggio) → lancetta
//   N3 nettuno  — fontana: ingranaggio + bigliettino
//   N4 spiaggia — secondo incontro con la figura (serve il dado)
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, show, setHS, hs, fadeWhite, setWarmth, collectDie, P, L, SG, isDialogueLocked } from '../engine.js';
import { openShutter } from '../puzzles/shutter.js';
import { openClock } from '../puzzles/clock.js';
import { openSafe } from '../puzzles/safe.js';
import { openMirror } from '../puzzles/mirror.js';
import { openCloseup } from '../closeup.js';
import { addItem } from '../inventory.js';

const TESTO_BIGLIETTINO =
  "Ma l'acqua qui dentro è solo bella da vedere? Serve a qualcosa? " +
  'Mi sento un po’ come quest’acqua.';

// ---- Stati della Piazza (swap sfondo in base al momento della storia) ----
//   A (arrivo)        piazza.png    — orologio fermo, figura sulla panchina
//   B (orologio ok)   piazza-2.png  — finestra accesa, porta "Appartamento" sbloccata
//   C (dado ottenuto) piazza-3.png  — la figura non è più sulla panchina
const PIAZZA_BG = {
  A: '/assets/images/CittaFerma/piazza.png',
  B: '/assets/images/CittaFerma/piazza-2.png',
  C: '/assets/images/CittaFerma/piazza-3.png',
};

function setPiazzaState() {
  const layer = $('.scene[data-scene="piazza"] .layer');
  if (!layer) return;
  const state = S.has.dado ? 'C' : S.flags.clockFixed ? 'B' : 'A';
  layer.style.backgroundImage = `url("${PIAZZA_BG[state]}")`;
}

// ---- Stato del Bagno (swap permanente dopo l'enigma dello specchio) ----
const BAGNO_BG = {
  base: '/assets/images/CittaFerma/casa-bagno.png',
  solved: '/assets/images/CittaFerma/casa-bagno-2.png',
};

function setBagnoState() {
  const layer = $('.scene[data-scene="casa-bagno"] .layer');
  if (!layer) return;
  layer.style.backgroundImage = `url("${BAGNO_BG[S.flags.mirrorSolved ? 'solved' : 'base']}")`;
}

// ---- Stato di Piazza Nettuno (l'ingranaggio sparisce dalla fontana) ----
const NETTUNO_BG = {
  base: '/assets/images/CittaFerma/piazza-nettuno.png',
  taken: '/assets/images/CittaFerma/piazza-nettuno-2.png',
};

function setNettunoState() {
  const layer = $('.scene[data-scene="nettuno"] .layer');
  if (!layer) return;
  layer.style.backgroundImage = `url("${NETTUNO_BG[S.has.ingranaggio ? 'taken' : 'base']}")`;
}

// ---- Stato della Spiaggia (la figura appare nell'arte col dado) ----
const SPIAGGIA_BG = {
  base: '/assets/images/CittaFerma/spiaggia.png',
  reveal: '/assets/images/CittaFerma/spiaggia-2.png',
};

function setSpiaggiaState() {
  const layer = $('.scene[data-scene="spiaggia"] .layer');
  if (!layer) return;
  layer.style.backgroundImage = `url("${SPIAGGIA_BG[S.has.dado ? 'reveal' : 'base']}")`;
}

// ---- Hotspot refresh (specifico per questo mondo) ----

export function refreshHotspots() {
  if (S.scene === 'piazza') {
    const t = S.flags.talkedToFigure;
    setPiazzaState();
    setHS('figura', t);
    setHS('piazza-clock', t);
    setHS('to-vicolo', t);
    setHS('to-nettuno', t);
    setHS('porta-casa', S.flags.clockFixed);
    if (hs('piazza-clock')) hs('piazza-clock').classList.toggle('done', S.flags.clockFixed);
  }

  if (S.scene === 'nettuno') {
    setNettunoState();
  }

  if (S.scene === 'casa-soggiorno') {
    // Il Quadro è "done" una volta preso il dado dalla cassaforte.
    if (hs('quadro')) hs('quadro').classList.toggle('done', S.has.dado);
  }

  if (S.scene === 'casa-bagno') {
    setBagnoState();
    if (hs('specchio')) hs('specchio').classList.toggle('done', S.flags.mirrorSolved);
  }

  if (S.scene === 'spiaggia') {
    setSpiaggiaState();
    setHS('figura-spiaggia', S.has.dado && !S.flags.dadoGifted);
  }
}

// ---- N1 · Arrivo in piazza (dialogo automatico) ----

export function arrivePiazza() {
  writeSave();
  refreshHotspots();
  // Il dialogo d'arrivo si gioca una volta sola: rientrando in piazza
  // dalla camera (dopo la spiaggia) la scena è già "conosciuta".
  if (S.flags.talkedToFigure) return;
  speak([
    P('Ma cosa...?'),
    P('Sto sognando, è impossibile!'),
    P("Ho avuto un'amnesia o qualcosa di simile? Come sono finita in piazza?"),
    P('Stranamente però non mi sento agitata...'),
    SG("Un'ombra: una figura poco distinta, seduta su una panchina vicino all'orologio."),
    P('Ok, sono sicura che quella cosa non fosse lì fino a poco fa.'),
    P('Ehi. Scusami? Sai dirmi dove siamo?'),
    L('Ehi. Se sei venuta a dirmi che devo «reagire», puoi anche tornare da dove sei venuta.'),
    P('No, tranquilla. Non sono neanche brava a dirlo a me, figurati a te.'),
    L("Vedi quell'orologio? È fermo da... non lo so. Ho smesso di controllare, credo."),
    L('Comunque va bene così. Tanto anche se riparte, poi si rompe di nuovo. No?'),
    P('Manca la lancetta piccola. Tutto qui?'),
    P('Pensi che io sia in grado di poter uscire da qualunque sia questo posto e tornare a casa mia, se lo aggiusto?'),
    L('Non saprei. Prova pure. Io resto qui.'),
    P('Va bene, va bene. Ti lascio ai tuoi pensieri.'),
  ], () => {
    S.flags.talkedToFigure = true;
    writeSave();
    refreshHotspots();
  });
}

// ---- Dialoghi ripetibili con la figura (N1) ----

function talkFigure() {
  if (S.has.dado) {
    // Stato C: la figura non è più sulla panchina — solo una riga di flavor.
    speak([P('Alla fine si è mossa. Chissà dove è finita.')]);
    return;
  }
  if (S.flags.clockFixed) {
    speak([L('Va bene, eh. Sul serio. Solo... non è che uno «riparte» così, perché un orologio ticchetta di nuovo.')]);
    return;
  }
  speak([L('Se vuoi riparare l’orologio, fa pure. A me non cambia nulla, credo.')]);
}

// ---- N4 · Secondo incontro con la figura ----

function talkFigureBeach() {
  speak([
    P('Alla fine vedo che ti sei mossa.'),
    L('O magari sono sempre stata qui. Ferma a contemplare il vuoto.'),
    L('Boh, non ci faccio più caso a dove sto. Tanto non cambia niente.'),
    P("Sono proprio sicura di averti visto vicino all'orologio poco fa."),
    L('Ha ripreso a ticchettare. Il tempo scorre, ed io resto immobile.'),
    L('Forse è più facile così. Magari è l’unica cosa che mi riesce bene.'),
    SG('Nox tira fuori il dado che ha trovato nella casa.'),
    P('...Questo è tuo? Lo hai fatto tu? È molto bello.'),
    SG('La figura trasale per un attimo, quasi a mostrare un’emozione.'),
    L('Non è niente di che. È pieno di imperfezioni.', 'FiguraMisteriosa_neutral2'),
    P('Non sono forse quelle a renderlo unico?'),
    P('E comunque questo smentisce il fatto che tu sia capace solo a restare immobile.'),
    L('...', 'FiguraMisteriosa_neutral2'),
    SG("L'ombra fissa Nox intensamente."),
    L('Tu dici? Sarà... Vabbè, per questa volta te lo regalo. Puoi tenerlo.', 'FiguraMisteriosa_neutral2'),
  ], () => {
    S.flags.dadoGifted = true;
    collectDie(1);
    writeSave();
    fadeWhite(() => {
      show('hub');
      setWarmth(1);
      writeSave();
      refreshHotspots();
      if (typeof window.__refreshPrologueHotspots === 'function') window.__refreshPrologueHotspots();
      speak([
        P('Sono riuscita a tornare a casa!'),
        P('Stavo forse sognando? Chi era quella figura misteriosa? Forse stavo ancora dormendo?'),
        SG('In tasca noti qualcosa, è un D4.'),
        P('Impossibile...E questo come ci è finito qui? Era tutto vero?'),
      ]);
    }, 1000);
  });
}

// ---- Mappa azioni hotspot ----

const ACTIONS = {
  // --- N1 PIAZZA DELL'OROLOGIO ---
  'figura': talkFigure,
  'to-vicolo': () => show('vicolo'),
  'to-nettuno': () => { show('nettuno'); refreshHotspots(); },

  'piazza-clock': () => {
    if (S.flags.clockFixed) { speak([P('Ticchetta di nuovo. Un rumore quasi dimenticato.')]); return; }
    if (!S.has.lancetta) {
      speak([P("Manca la lancetta delle ore all'orologio. Forse riparandolo potrei uscire da questo posto.")]);
      return;
    }
    openClock();
  },

  'porta-casa': () => {
    if (!S.has.chiave) { speak([P('È chiusa. Ci vorrebbe una chiave.')]); return; }
    show('casa-soggiorno');
    refreshHotspots();
  },

  // --- CASA · SOGGIORNO ---
  'quadro': () => {
    if (S.has.dado) { speak([P('La cassaforte è aperta. Non c’è rimasto altro, qui dietro.')]); return; }
    speak([
      P('Noto un piccolo spessore fra il muro e il quadro.'),
      P('Sembra esserci qualcosa qui dietro.'),
    ], openSafe);
  },

  'bigliettino-casa': () => {
    // [SEGNAPOSTO FASE 2] Immagine e testo del bigliettino di Casa non
    // esistono ancora (path da confermare, testo da scrivere).
    speak([P('Un foglietto. La grafia è incerta.'), SG('[SEGNAPOSTO DI SVILUPPO] Testo del bigliettino di Casa da scrivere.')]);
  },

  'to-bagno': () => { show('casa-bagno'); refreshHotspots(); },
  'soggiorno-exit': () => { show('piazza'); refreshHotspots(); },

  // --- CASA · BAGNO ---
  'specchio': () => {
    if (S.flags.mirrorSolved) { speak([P('Il numero è ancora lì, disegnato nella condensa. 210525.')]); return; }
    openMirror();
  },
  'to-soggiorno': () => { show('casa-soggiorno'); refreshHotspots(); },

  // --- N2 VICOLO SARACINESCA ---
  'saracinesca': () => {
    if (S.has.lancetta) { speak([P('Ho già preso quello che mi serviva, qui.')]); return; }
    if (!S.has.ingranaggio) {
      speak([
        P('Una vecchia saracinesca. Sembra esserci qualcosa incastrato lì sotto, ovviamente nel punto più scomodo possibile.'),
        P('Il meccanismo per alzarla sembra rotto, forse manca qualcosa...'),
      ]);
      return;
    }
    speak([
      P('Una vecchia saracinesca. Sembra esserci qualcosa incastrato lì sotto, ovviamente nel punto più scomodo possibile.'),
      P('Forse con questo potrebbe aprirsi...'),
    ], openShutter);
  },
  'vicolo-back': () => { show('piazza'); refreshHotspots(); },

  // --- N3 PIAZZA DEL DIO NETTUNO ---
  'ingranaggio': () => {
    if (S.has.ingranaggio) { speak([P('La fontana è vuota. Solo alghe, e acqua che non va da nessuna parte.')]); return; }
    speak([
      P('Un vecchio ingranaggio dentro una fontana? Potrebbe tornarmi utile.'),
    ], () => {
      S.has.ingranaggio = true;
      addItem('ingranaggio');
      writeSave();
      refreshHotspots();
    });
  },

  'bigliettino': () => {
    openCloseup({ image: '/assets/images/bigliettino.png', text: TESTO_BIGLIETTINO }, () => {
      if (S.flags.readNote) return;
      S.flags.readNote = true;
      writeSave();
      speak([P('Chi l’ha scritto non stava parlando dell’acqua.')]);
    });
  },

  'to-spiaggia': () => { show('spiaggia'); refreshHotspots(); },
  'nettuno-back': () => { show('piazza'); refreshHotspots(); },

  // --- N4 SPIAGGIA DEGLI SCOGLI ---
  'spiaggia-cielo': () => speak([
    P('Certo che questo posto senza nessuno in giro è uno spettacolo.'),
    P('Magari fosse sempre così.'),
  ]),
  'figura-spiaggia': talkFigureBeach,
  'spiaggia-back': () => { show('nettuno'); refreshHotspots(); },

  // --- FUORI CASA (placeholder) ---
  'fuori-casa-back': () => {
    show('hub');
    if (typeof window.__refreshPrologueHotspots === 'function') window.__refreshPrologueHotspots();
  },
};

// ---- Callback per i puzzle (bridge fra moduli) ----

window.__refreshHotspots = refreshHotspots;
window.__onClockDone = refreshHotspots;

// ---- Init: listener unico sullo stage ----

export function initMondo1() {
  $('#stage').addEventListener('click', e => {
    const h = e.target.closest('.hotspot');
    if (!h || isDialogueLocked()) return;
    const action = h.dataset.action;
    if (ACTIONS[action]) ACTIONS[action]();
  });

  refreshHotspots();
}
