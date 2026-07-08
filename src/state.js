// ============================================================
// STATO DI GIOCO — unico oggetto condiviso da tutti i moduli.
// Importa sempre da qui, non creare copie locali.
// ============================================================

export const S = {
  scene: 'hub',
  has: { lancetta: false, orologioTasca: false },
  flags: { prologueDone: false, arrivedPiazza: false, clockFixed: false, leiResisted: false },
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
