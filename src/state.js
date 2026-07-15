// ============================================================
// STATO DI GIOCO — unico oggetto condiviso da tutti i moduli.
// Importa sempre da qui, non creare copie locali.
// ============================================================

export const S = {
  scene: 'hub',
  has: {
    ingranaggio: false, // N3 fontana → sblocca il minigioco saracinesca
    lancetta: false,    // N2 saracinesca → serve all'orologio di N1
    chiave: false,      // N1 orologio riparato → apre la porta della Casa
    dado: false,        // Casa (WIP) → sblocca la figura sulla spiaggia
  },
  flags: {
    checkedPhone: false,
    checkedWindow: false,
    talkedToFigure: false,
    shutterOpened: false,
    clockFixed: false,
    readNote: false,
    dadoGifted: false,
    mirrorSolved: false, // Casa-Bagno: enigma specchio risolto → bagno resta casa-bagno-2
    // ---- MONDO 2 · Casa Familiare ----
    fuoriCasaIntro: false, // battuta one-shot d'arrivo a Fuori Casa
    casafArrival: false,   // battuta one-shot di riconoscimento nel Soggiorno
    luiSpoke1: false,      // LUI ha fatto la prima interazione (S1)
    fragCamera: false,     // frammento di cuore raccolto in Camera
    fragGiardino: false,   // frammento di cuore raccolto in Giardino
    usbLoaded: false,      // minigioco PC completato: cuore trasferito su USB
    readNoteLei: false,    // bigliettino di LEI (Soggiorno) letto
    readNoteLui: false,    // bigliettino di LUI (Camera) letto
    mondo2Done: false,     // finale del Giardino concluso → cancello porta al Cortile
    // ---- FINALE · Interno Lavanderia ----
    leiLavIntro: false,    // dialogo d'ingresso con LEI in lavanderia fatto
    tavoloDone: false,     // minigioco Tavolino completato (stampo pronto)
    compressoreDone: false,// minigioco Compressore completato → set dadi
    gameDone: false,       // finale concluso → crediti visti
  },
  inventory: [],
  warmth: 0,
};

// ---- Salvataggio (localStorage) ----

const SAVE_KEY = 'fragments_save';

export function hasSave() {
  try { return !!localStorage.getItem(SAVE_KEY); }
  catch { return false; }
}

export function writeSave() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); }
  catch { /* silently fail */ }
}

export function readSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
