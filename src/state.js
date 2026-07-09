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
  },
  dice: [],
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
