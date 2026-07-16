// ============================================================
// AUDIO — musica del titolo e tracce di scena.
//
// Unico aggancio: `show()` in engine.js chiama playForScene() a ogni
// cambio scena. I mondi non toccano mai l'audio direttamente.
//
// Tre tracce: casa (mondo reale — camera di Nox, fuori casa, il finale
// fino alla dedica), mondo1 (la Città Ferma), mondo2 (la Casa Familiare).
// Il crossfade scatta solo quando cambia la traccia: navigare dentro lo
// stesso mondo non la fa mai ripartire da capo.
// ============================================================

const SRC = {
  casa: '/assets/audio/casa.mp3',
  mondo1: '/assets/audio/mondo1.mp3',
  mondo2: '/assets/audio/mondo2.mp3',
};

// Scena → traccia. Ogni scena di gioco è qui: una scena che manca cade sul
// ramo "nessuna traccia nota" di playForScene() e lascia suonare l'ultima.
const SCENE_TRACKS = {
  // Mondo reale
  hub: 'casa',
  'fuori-casa': 'casa',
  'closeup-auto': 'casa',
  'closeup-cancello': 'casa',
  // Il finale: dal cortile alla dedica è un blocco unico, casa.mp3 non si
  // interrompe mai. I crediti sono un overlay, non una scena: la musica
  // sulla dedica è semplicemente quella dell'abbraccio che continua.
  'cortile-nonna': 'casa',
  'lavanderia-closeup': 'casa',
  'interno-lavanderia': 'casa',
  abbraccio: 'casa',
  // Mondo 1 — La Città Ferma (l'appartamento della piazza è dentro il
  // sogno: stessa traccia, la porta non spezza il mondo)
  piazza: 'mondo1',
  vicolo: 'mondo1',
  nettuno: 'mondo1',
  spiaggia: 'mondo1',
  'casa-soggiorno': 'mondo1',
  'casa-bagno': 'mondo1',
  // Mondo 2 — La Casa Familiare
  'casaf-soggiorno': 'mondo2',
  'casaf-camera': 'mondo2',
  giardino: 'mondo2',
};

const FADE_MS = 1000;
const FADE_STEP_MS = 50;

let theme = null;
let deck = [];      // due <audio> alternati per sovrapporre le tracce
let active = 0;     // indice del deck che sta suonando
let current = null; // chiave della traccia in corso
let fadeTimer = null;
let masterVol = 0.55;

function makeEl() {
  const el = document.createElement('audio');
  el.loop = true;
  el.preload = 'none'; // le tracce pesano ~5MB: si caricano solo all'uso
  el.volume = 0;
  document.body.appendChild(el);
  return el;
}

export function initAudio(themeEl) {
  theme = themeEl || null;
  deck = [makeEl(), makeEl()];
}

// Volume: un solo valore per tema e tracce di gioco. I fade puntano sempre
// a masterVol, mai a 1.0, così lo slider resta rispettato anche a metà
// dissolvenza.
export function setMasterVolume(v) {
  masterVol = Math.max(0, Math.min(1, v));
  if (theme) theme.volume = masterVol;
  // Se un crossfade è in corso non tocchiamo il deck: ci pensa il fade,
  // che legge masterVol a ogni step.
  if (!fadeTimer && deck[active]) deck[active].volume = masterVol;
}

export function playTheme() {
  if (!theme) return Promise.resolve(false);
  theme.volume = masterVol;
  return theme.play().then(() => true).catch(() => false);
}

export function fadeOutTheme() {
  if (!theme) return;
  const start = theme.volume;
  const steps = Math.round(FADE_MS / FADE_STEP_MS);
  let i = 0;
  const t = setInterval(() => {
    i++;
    theme.volume = Math.max(0, start * (1 - i / steps));
    if (i >= steps) {
      clearInterval(t);
      theme.pause();
      theme.currentTime = 0;
      theme.volume = masterVol;
    }
  }, FADE_STEP_MS);
}

// Crossfade: la uscente scende, l'entrante sale, ~1s. Un fade già in corso
// viene interrotto e il suo elemento riciclato — cambi scena rapidi non
// lasciano tracce zombie che continuano a suonare.
function crossfadeTo(key) {
  if (fadeTimer) {
    clearInterval(fadeTimer);
    fadeTimer = null;
  }

  const prev = deck[active];
  const next = deck[1 - active];
  active = 1 - active;
  current = key;

  next.src = SRC[key];
  next.volume = 0;
  next.currentTime = 0;
  next.play().catch(() => {}); // autoplay bloccato: resta muto, non rompe

  const startPrev = prev.volume;
  const steps = Math.round(FADE_MS / FADE_STEP_MS);
  let i = 0;
  fadeTimer = setInterval(() => {
    i++;
    const t = i / steps;
    next.volume = Math.min(1, masterVol * t);
    prev.volume = Math.max(0, startPrev * (1 - t));
    if (i >= steps) {
      clearInterval(fadeTimer);
      fadeTimer = null;
      next.volume = masterVol;
      prev.pause();
      prev.removeAttribute('src');
      prev.load(); // libera lo stream della traccia uscente
    }
  }, FADE_STEP_MS);
}

// Chiamata da show(). Se la scena non cambia traccia, non fa nulla.
export function playForScene(scene) {
  const key = SCENE_TRACKS[scene];
  if (!key || key === current) return;
  if (!deck.length) return;
  crossfadeTo(key);
}
