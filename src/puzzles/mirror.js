// ============================================================
// ENIGMA SPECCHIO APPANNATO — attesa passiva (vapore).
//
// Un solo hotspot: il rubinetto. Al tocco parte l'acqua calda e il
// vapore si addensa in ~5s (feedback visibile, così non sembra uno
// stallo). Al culmine crossfade a closeup-specchio-numero: il codice
// 210525 appare "scritto" nella condensa. Imposta mirrorSolved →
// il Bagno diventa permanentemente casa-bagno-2.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, P } from '../engine.js';

const BG_FOG = '/assets/images/CittaFerma/closeup-specchio.png';
const BG_NUM = '/assets/images/CittaFerma/closeup-specchio-numero.png';
const DUR = 5000; // durata dell'attesa vapore

let raf = null;
let t0 = 0;
let running = false;
let solved = false;

function setBg(url) {
  $('#mirrorBg').style.backgroundImage = `url("${url}")`;
}

function frame(now) {
  const p = Math.min(1, (now - t0) / DUR);
  $('#mirrorSteam').style.opacity = (0.85 * p).toFixed(3);
  $('#mirrorFill').style.width = `${Math.round(p * 100)}%`;
  if (p >= 1) { reveal(); return; }
  raf = requestAnimationFrame(frame);
}

function startWater() {
  if (running || solved) return;
  running = true;
  $('#mirrorHint').textContent = 'Il vapore sale…';
  t0 = performance.now();
  raf = requestAnimationFrame(frame);
}

function reveal() {
  if (raf) cancelAnimationFrame(raf);
  running = false;
  solved = true;
  setBg(BG_NUM);
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
  running = false;
  solved = false;
  if (raf) cancelAnimationFrame(raf);
  setBg(BG_FOG);
  $('#mirrorSteam').style.opacity = '0';
  $('#mirrorFill').style.width = '0%';
  $('#mirrorHint').textContent = 'Apri l’acqua calda dal rubinetto.';
  $('#mirrorPuzzle').classList.add('open');
}

export function initMirrorPuzzle() {
  const tap = $('#mirrorTap');
  if (tap) tap.addEventListener('click', startWater);
  const back = $('#mirrorBack');
  if (back) back.addEventListener('click', close);
}
