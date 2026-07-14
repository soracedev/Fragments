// ============================================================
// ENIGMA SPECCHIO APPANNATO — vapore controllato dal giocatore.
//
// Un solo comando: il rubinetto, che apre/chiude l'acqua calda.
// Mentre l'acqua scorre il vapore si addensa e il numero (210525)
// affiora poco a poco nella condensa: l'immagine closeup-specchio-
// numero fa crossfade proporzionale al vapore. Chiudendo l'acqua il
// livello si CONGELA dov'è. Se il numero è abbastanza leggibile
// (oltre la soglia) l'enigma è risolto; altrimenti un suggerimento
// invita a riaprire l'acqua. Imposta mirrorSolved → il Bagno diventa
// permanentemente casa-bagno-2.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, P } from '../engine.js';

const RISE = 4200;      // ms per portare il vapore da 0 a pieno mentre scorre
const THRESHOLD = 0.75; // livello oltre cui il numero è leggibile

let raf = null;
let t0 = 0;
let base = 0;      // progresso "congelato" da cui riparte l'acqua
let progress = 0;  // livello attuale del vapore [0..1]
let running = false;
let solved = false;

function render() {
  $('#mirrorSteam').style.opacity = (0.85 * progress).toFixed(3);
  $('#mirrorNumber').style.opacity = progress.toFixed(3);
  $('#mirrorFill').style.width = `${Math.round(progress * 100)}%`;
}

function frame(now) {
  progress = Math.min(1, base + (now - t0) / RISE);
  render();
  if (progress >= 1) { stopWater(); return; }
  raf = requestAnimationFrame(frame);
}

function startWater() {
  running = true;
  base = progress;
  t0 = performance.now();
  $('#mirrorHint').textContent = 'Il vapore sale… chiudi l’acqua quando il numero è leggibile.';
  raf = requestAnimationFrame(frame);
}

// Chiude l'acqua: il vapore si congela al livello attuale. Se è
// abbastanza addensato il numero è leggibile e l'enigma è risolto.
function stopWater() {
  if (raf) cancelAnimationFrame(raf);
  running = false;
  base = progress;
  if (progress >= THRESHOLD) { reveal(); return; }
  $('#mirrorHint').textContent = 'Si intravede qualcosa, ma è ancora troppo debole. Apri ancora l’acqua.';
}

function toggleWater() {
  if (solved) return;
  if (running) stopWater();
  else startWater();
}

function reveal() {
  solved = true;
  progress = 1;
  render();
  $('#mirrorSteam').style.opacity = '0.15'; // resta un velo: il numero è nella condensa
  $('#mirrorHint').textContent = 'Qualcosa affiora nella condensa.';
  S.flags.mirrorSolved = true;
  writeSave();
  speak([P('Dei numeri, disegnati nel vapore. 210525.'), P('Meglio che me li ricordi.')]);
}

function close() {
  if (raf) cancelAnimationFrame(raf);
  running = false;
  $('#mirrorPuzzle').classList.remove('open');
  // Rientrando nel bagno, lo sfondo passa a casa-bagno-2 se risolto.
  if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();
}

export function openMirror() {
  if (raf) cancelAnimationFrame(raf);
  running = false;
  solved = false;
  base = 0;
  progress = 0;
  render();
  $('#mirrorHint').textContent = 'Apri l’acqua calda dal rubinetto.';
  $('#mirrorPuzzle').classList.add('open');
}

export function initMirrorPuzzle() {
  const tap = $('#mirrorTap');
  if (tap) tap.addEventListener('click', toggleWater);
  const back = $('#mirrorBack');
  if (back) back.addEventListener('click', close);
}
