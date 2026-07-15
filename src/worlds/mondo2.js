// ============================================================
// MONDO 2 — CASA FAMILIARE (La Solitudine)
//
// Bridge da Fuori Casa (Auto + Cancello a doppio stadio) e tre
// location interne:
//   casaf-soggiorno — bigliettino di LEI, LUI sul divano (3 stadi)
//   casaf-camera    — bigliettino di LUI, frammento, PC, stampante
//   giardino        — LEI sotto il gazebo (finale del mondo), frammento
//
// Catena: S1 LUI → frammento Camera → S2 LUI (chiavi auto, giardino si apre)
//   → frammento Giardino → S3 LUI (USB) → PC (cuore→USB) → Stampante (D6)
//   → Giardino: mostri D6 a LEI → finale → torna a Fuori Casa (warm-2).
//
// I due minigiochi (cuore a 2 pezzi al PC, stampa D6 col gauge) in questa
// fase sono STUB auto-risolvibili: verranno sostituiti nella Passata 3.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, show, setHS, fadeWhite, fadeBlack, setWarmth, P, L, LU, SG, isDialogueLocked } from '../engine.js';
import { addItem, acquire } from '../inventory.js';
import { openCloseup } from '../closeup.js';
import { openHeart } from '../puzzles/heart.js';
import { openPrint } from '../puzzles/print.js';
import { openTavolino } from '../puzzles/tavolino.js';
import { openCompressore } from '../puzzles/compressore.js';

const has = (id) => (S.inventory || []).includes(id);

// ---- Testi bigliettini (mostrati così come sono, nessun commento di Nox) ----

const NOTA_LEI =
  'Hai mai notato almeno una volta come ti guardo? Come ti osservo? ' +
  'Perché questo sguardo sembra non essere mai ricambiato? — LEI';

const NOTA_LUI =
  'Hai mai pensato che io ti ascoltassi veramente, che io sappia cosa tu ' +
  'stia provando? Perché non vuoi mai darmi ascolto? — LUI';

// ---- Refresh hotspot (specifico per questo mondo) ----

export function refreshMondo2Hotspots() {
  if (S.scene === 'casaf-soggiorno') {
    // Il Giardino resta invisibile finché LUI (S2) non consegna le chiavi-auto.
    setHS('to-giardino', has('chiavi-auto'));
  }
  if (S.scene === 'casaf-camera') {
    setHS('frammento-1', !S.flags.fragCamera);
  }
  if (S.scene === 'giardino') {
    setHS('frammento-2', !S.flags.fragGiardino);
  }
  if (S.scene === 'interno-lavanderia') {
    // Tavolino e Compressore si sbloccano dopo il dialogo con LEI.
    setHS('tavolino', S.flags.leiLavIntro);
    setHS('compressore', S.flags.leiLavIntro);
  }
}

// ---- Ingressi di scena (con battute one-shot) ----

export function enterFuoriCasa() {
  show('fuori-casa');
  refreshMondo2Hotspots();
  writeSave();
  if (S.flags.fuoriCasaIntro) return;
  speak([
    P('La sua auto è qui? Strano che non mi abbia avvertito.'),
  ], () => {
    S.flags.fuoriCasaIntro = true;
    writeSave();
  });
}

function enterCasaf() {
  show('casaf-soggiorno');
  refreshMondo2Hotspots();
  writeSave();
  if (S.flags.casafArrival) return;
  // [BOZZA] Battuta d'arrivo/riconoscimento — da revisionare.
  speak([
    P('Questo non è il cortile di mia nonna.'),
    P('Questa casa… la riconoscerei ovunque.'),
  ], () => {
    S.flags.casafArrival = true;
    writeSave();
  });
}

// ---- LUI (Figura 2) — interazione a 3 stadi dal divano ----

function talkLui() {
  // S1 · prima interazione: parla dei pezzi che cercava e non ricorda dove.
  if (!S.flags.luiSpoke1) {
    // [BOZZA] Riga S1 — da revisionare.
    speak([
      LU('Erano qui. Ne sono certo. Li avevo messi al sicuro… e adesso non ricordo più dove.'),
      SG('Lo sguardo perso nel vuoto.'),
      P('Chissà a cosa sta pensando.'),
    ], () => {
      S.flags.luiSpoke1 = true;
      writeSave();
    });
    return;
  }

  // S2 · consegna le chiavi dell'auto e apre il giardino (serve frammento Camera).
  if (!has('chiavi-auto')) {
    if (!S.flags.fragCamera) {
      speak([SG('LUI ha di nuovo lo sguardo perso. Quei «pezzi» che cerca devono essere da qualche parte, qui intorno.')]);
      return;
    }
    // [BOZZA] Riga S2 — da revisionare.
    speak([
      LU('Ne hai trovato uno. Erano sparsi ovunque… continuo a perderli, come se non volessi ritrovarli davvero.'),
      LU('Tieni. Ti serviranno per uscire.'),
      SG('Oltre il vetro, il cigolio di una porta che si apre. Il giardino.'),
    ], () => {
      acquire('chiavi-auto', 'LUI ti mette in mano le chiavi dell’auto.', () => {
        writeSave();
        refreshMondo2Hotspots();
      });
    });
    return;
  }

  // S3 · consegna la USB e chiude il suo arco (servono entrambi i frammenti).
  if (!has('usb')) {
    if (!S.flags.fragGiardino) {
      speak([SG('LUI tace. Manca ancora qualcosa — un altro di quei frammenti.')]);
      return;
    }
    speak([
      LU('Mi dispiace. Custodivo quei frammenti gelosamente, sperando di trovare il modo giusto per ripararli.'),
      LU('Eppure… per quanto io ci provi, finisco sempre col romperlo di nuovo.'),
      LU('Perdonami.'),
      LU('Tieni, forse a te potrà tornare più utile.'),
    ], () => {
      acquire('usb', 'LUI ti lascia la chiavetta USB.', () => writeSave());
    });
    return;
  }

  // Dopo S3: LUI non ha più nulla da dire.
  speak([SG('LUI fissa il vuoto, in silenzio. Ha detto tutto quello che poteva.')]);
}

// ---- Giardino — LEI, finale del mondo ----

const LEI_BASE = [
  P('Alla fine ti ritrovo anche qui eh?'),
  L('Forse era meglio rimanere ferma, che andare avanti e vivere questo dolore.'),
  P('A cosa ti riferisci?'),
  L('Pensi che quello sia lo sguardo che mi merito?'),
  L('Mi sento così sola.'),
  P("Non dire così… Ci sarà qualcosa che potrò fare per aiutarti. Come con l'orologio."),
  P('Alla fine ti sei mossa no? Eppure dicevi di non esserne in grado.'),
  L('Anche se mi sono mossa, non sono in grado di fare nulla. Mi sento vuota.'),
];

const LEI_FINALE = [
  SG('Nox mostra il D6.'),
  P('Guarda cosa ho trovato. Lo stava facendo LUI. Per te.'),
  L('…per me?'),
  L('Non capisco. Perché avrebbe dovuto?'),
  P('Forse è proprio questo il punto. Non serve un motivo. L’ha fatto e basta.'),
  L('…'),
  SG('La figura fissa il dado a lungo, senza prenderlo.'),
  L('Non lo so. Non so se basta.'),
  L('Ma… grazie. Per avermelo detto.'),
];

function talkLeiGiardino() {
  if (S.flags.mondo2Done) {
    speak([SG("La figura guarda l'orizzonte. Non dice altro.")]);
    return;
  }
  if (has('d6')) {
    speak([...LEI_BASE, ...LEI_FINALE], () => {
      S.flags.mondo2Done = true;
      writeSave();
      fadeWhite(() => {
        setWarmth(2);
        enterFuoriCasa();
      }, 1000);
    });
    return;
  }
  speak(LEI_BASE);
}

// ---- FINALE · Interno Lavanderia (LEI, minigiochi, epilogo) ----

// §3 storyboard finale — dialogo d'ingresso (verbatim).
const LEI_LAV_INTRO = [
  P('E tu cosa ci fai qui? Allora sto veramente sognando?'),
  L('Perché sei così ostinata? Nessuno può aiutarmi. Smettila.'),
  P('Aiutando te sono già tornata a casa mia una volta. Posso capire come ti senti.'),
  L('NO CHE NON PUOI CAPIRE!'),
  L('Non riesco mai a farne una giusta. Sono una buona a nulla che ha solo buttato il suo tempo nel niente.'),
  P('Non è vero. Guarda questi dadi — sono opera tua. A me sembrano bellissimi.'),
  L('Sono imperfetti, inutili. Anche LUI mi vede così. Anche io mi vedo così.'),
  P('Ti dimostrerò che ti sbagli. Finirò quello che hai iniziato.'),
  L('È inutile. Non ci riuscirai mai.'),
];

// §6 storyboard finale — dialogo finale con LEI (verbatim) + abbraccio.
const LEI_FINALE_2 = [
  P('Guarda, questi sono i restanti dadi.'),
  L('Sono imperfetti. Non valgono niente. Come me.'),
  P('Non è vero. E lo sai anche tu, in fondo.'),
  L('Non lo so più. Ho smesso di crederci da tempo.'),
  P('Io no. Io ci credo ancora.'),
  L('Perché continui a insistere con me?'),
  P('Perché tu sei quella parte di me che ha smesso di crederci. Ma non sei un errore da correggere.'),
  L('…quindi sono solo questo? Un promemoria di tutto ciò che c’è di sbagliato?'),
  P('No. Ti sei fatta carico di tutta la tristezza, delle ferite del passato. Hai accumulato le mie paure, le mie insicurezze — e io, nel frattempo, mi sono lasciata andare.'),
  L('Quindi servo solo a questo. Sono un ostacolo. Qualcosa da eliminare.'),
  P('No. Sei la motivazione che mi spinge ad andare avanti, a migliorare. Mi ricordi la parte più negativa di me — ma non devo vederti come un male. Sei un’impronta di ciò che sono.'),
  P('Devo accettare la tua presenza. Capire che non si nasce già capaci di qualcosa — lo si diventa. Ed è anche grazie a te, se ci sto arrivando.'),
  SG('Un silenzio lungo.'),
  L('Anche se lo accettassi… non sparirò. Resterò comunque qui.'),
  P('Lo so. E va bene così.'),
  P('Non voglio farti sparire. Voglio solo che tu smetta di parlare più forte di tutto il resto.'),
  L('E se un giorno tornassi a urlare come prima?'),
  P('Allora ti ascolterò di nuovo. E ti risponderò di nuovo, come sto facendo ora.'),
  SG('La sua voce trema, per la prima volta senza difendersi.'),
  L('Non so se sono pronta a crederci davvero.'),
  P('Non serve crederci subito. Basta provarci. Un po’ alla volta — come con l’orologio.'),
];

// La battuta dell'abbraccio è separata: si gioca sopra l'illustrazione
// dedicata (scena "abbraccio"), non nell'interno lavanderia.
const ABBRACCIO_SG = SG('LEI si alza dalla sedia. Si avvicina. Le due si abbracciano.');

// [SEGNAPOSTO] Riflessione di Nox al risveglio — testo da scrivere (Luca).
const REFLECTION = [
  SG('Nox riapre gli occhi nella sua stanza. Fuori si sente di nuovo il vento; da qualche parte, un orologio ticchetta.'),
  P('[SEGNAPOSTO] Riflessione di Nox al risveglio — da scrivere.'),
];

function enterInternoLavanderia() {
  show('interno-lavanderia');
  refreshMondo2Hotspots();
  writeSave();
  if (S.flags.leiLavIntro) return;
  speak(LEI_LAV_INTRO, () => {
    S.flags.leiLavIntro = true;
    writeSave();
    refreshMondo2Hotspots();
  });
}

function openCredits() {
  const c = $('#credits');
  if (c) c.classList.add('open');
}

// Innescato dal completamento del Compressore: dialogo finale → nero →
// risveglio in camera (warm-3) → riflessione → crediti.
function runFinale() {
  speak(LEI_FINALE_2, () => {
    // L'abbraccio: si passa all'illustrazione dedicata, poi al nero.
    show('abbraccio');
    speak([ABBRACCIO_SG], () => {
      fadeBlack(() => {
        show('hub');
        setWarmth(3);
        writeSave();
        speak(REFLECTION, () => {
          S.flags.gameDone = true;
          writeSave();
          openCredits();
        });
      }, 1000);
    });
  });
}

// ---- Mappa azioni hotspot ----

const ACTIONS = {
  // --- FUORI CASA (bridge) — Auto e Cancello aprono un closeup dedicato ---
  'auto': () => { show('closeup-auto'); },
  'cancello': () => { show('closeup-cancello'); },

  // Closeup Auto: cliccando l'auto raccogli le chiavi della lavanderia
  // (post-Mondo2, se hai già le chiavi-auto); altrimenti flavor.
  'auto-take': () => {
    if (has('chiavi-lavanderia')) {
      speak([P("Ho già dato un'occhiata. Dentro, solo le chiavi della lavanderia.")]);
      return;
    }
    if (has('chiavi-auto')) {
      speak([
        P('Chissà perché le chiavi della lavanderia erano proprio qui dentro. Vale la pena dare un’occhiata.'),
      ], () => {
        acquire('chiavi-lavanderia', 'Prendi le chiavi della lavanderia.', () => writeSave());
      });
      return;
    }
    speak([P("Mi servirebbero le chiavi per aprire l'auto.")]);
  },
  'closeup-auto-back': () => { show('fuori-casa'); },

  // Closeup Cancello: cliccando il cancello entri nel Mondo 2 (prima volta)
  // o al Cortile della nonna (dopo aver concluso il mondo).
  'cancello-enter': () => {
    if (S.flags.mondo2Done) {
      // Crossfade normale tra scene: la dissolvenza bianca è riservata al
      // primo ingresso nel Mondo 2.
      show('cortile-nonna');
      refreshMondo2Hotspots();
      writeSave();
      return;
    }
    speak([
      P("L'auto di nonno non c'è, provo ad entrare lo stesso — magari è uscito solo lui ed è rimasta nonna."),
    ], () => fadeWhite(() => enterCasaf()));
  },
  'closeup-cancello-back': () => { show('fuori-casa'); },

  'cortile-back': () => enterFuoriCasa(),
  'porta-nonna': () => speak([P('Non sembra esserci nessuno in casa.')]),

  // --- CORTILE / LAVANDERIA ---
  'to-lavanderia': () => { show('lavanderia-closeup'); refreshMondo2Hotspots(); },
  'enter-lavanderia': () => {
    if (!has('chiavi-lavanderia')) {
      speak([P('Mi servono le chiavi per entrare.')]);
      return;
    }
    enterInternoLavanderia();
  },
  'lavanderia-back': () => { show('cortile-nonna'); refreshMondo2Hotspots(); },
  'interno-lavanderia-back': () => { show('lavanderia-closeup'); refreshMondo2Hotspots(); },

  // Minigioco 1 finale.
  'tavolino': () => {
    if (S.flags.tavoloDone) { speak([P('Lo stampo è pronto. Ora tocca al compressore.')]); return; }
    openTavolino();
  },
  // Minigioco 2 finale (bloccato finché lo stampo non è pronto).
  'compressore': () => {
    if (S.flags.compressoreDone) { speak([SG('Il set è completo. Non serve altro.')]); return; }
    if (!S.flags.tavoloDone) {
      speak([P('Penso mi serva prima qualcosa da poterci mettere dentro.')]);
      return;
    }
    openCompressore();
  },

  // --- SOGGIORNO ---
  'bigliettino-lei': () => {
    openCloseup({ image: '/assets/images/bigliettino.png', text: NOTA_LEI }, () => {
      if (S.flags.readNoteLei) return;
      S.flags.readNoteLei = true;
      writeSave();
    });
  },
  'lui': talkLui,
  'to-camera': () => { show('casaf-camera'); refreshMondo2Hotspots(); },
  'to-giardino': () => { show('giardino'); refreshMondo2Hotspots(); },

  // --- CAMERA DA LETTO ---
  'bigliettino-lui': () => {
    openCloseup({ image: '/assets/images/bigliettino.png', text: NOTA_LUI }, () => {
      if (S.flags.readNoteLui) return;
      S.flags.readNoteLui = true;
      writeSave();
    });
  },
  'frammento-1': () => {
    if (S.flags.fragCamera) return;
    S.flags.fragCamera = true;
    refreshMondo2Hotspots();
    acquire('frammento-sinistro', 'Un frammento di cuore, sul letto. Lo raccogli.', () => writeSave());
  },
  'pc': () => {
    if (S.flags.usbLoaded) { speak([P('Ho già trasferito tutto sulla chiavetta.')]); return; }
    if (!(S.flags.fragCamera && S.flags.fragGiardino)) {
      speak([P('Mi servono prima i pezzi da rimettere insieme.')]);
      return;
    }
    if (!has('usb')) { speak([P('Mi servirebbe qualcosa su cui salvare — una chiavetta.')]); return; }
    // Minigioco 1: ricomponi il cuore a 2 metà → usbLoaded.
    openHeart();
  },
  'stampante': () => {
    if (has('d6')) { speak([P('Il dado è già stampato. È qui con me.')]); return; }
    if (!S.flags.usbLoaded) { speak([P('Mi servirebbe prima qualcosa da poter stampare.')]); return; }
    // Minigioco 2: stampa del D6 (gauge + reveal) → oggetto d6.
    speak([
      P('Forse questa può tornarmi utile…'),
      SG('Inserisce la chiavetta USB, accende la stampante 3D.'),
    ], () => openPrint());
  },
  'to-soggiorno-cf': () => { show('casaf-soggiorno'); refreshMondo2Hotspots(); },

  // --- GIARDINO ---
  'lei-giardino': talkLeiGiardino,
  'frammento-2': () => {
    if (S.flags.fragGiardino) return;
    S.flags.fragGiardino = true;
    refreshMondo2Hotspots();
    acquire('frammento-destro', 'Un frammento di cuore, sul prato. Lo raccogli.', () => writeSave());
  },
  'giardino-back': () => { show('casaf-soggiorno'); refreshMondo2Hotspots(); },
};

// ---- Init: listener unico sullo stage ----

export function initMondo2() {
  $('#stage').addEventListener('click', e => {
    const h = e.target.closest('.hotspot');
    if (!h || isDialogueLocked()) return;
    const action = h.dataset.action;
    if (ACTIONS[action]) ACTIONS[action]();
  });

  // Bridge per i puzzle del finale (evita import circolari).
  window.__refreshMondo2 = refreshMondo2Hotspots;
  window.__onCompressoreDone = runFinale;

  refreshMondo2Hotspots();
}
