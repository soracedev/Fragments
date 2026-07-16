// ============================================================
// MAIN — entry point. Importa tutti i moduli e li collega.
// ============================================================

import { $, initParallax, initDust, initNavLabels } from './engine.js';
import { initAudio, playTheme, fadeOutTheme, setMasterVolume } from './audio.js';
import { initInventoryUI } from './inventory.js';
import { initCloseup } from './closeup.js';
import { initShutterPuzzle } from './puzzles/shutter.js';
import { initClockPuzzle } from './puzzles/clock.js';
import { initSafePuzzle } from './puzzles/safe.js';
import { initMirrorPuzzle } from './puzzles/mirror.js';
import { initHeartPuzzle } from './puzzles/heart.js';
import { initPrintPuzzle } from './puzzles/print.js';
import { initTavoloPuzzle } from './puzzles/tavolino.js';
import { initCompressorePuzzle } from './puzzles/compressore.js';
import { runIntro, initIntro, initPrologueHotspots } from './worlds/prologue.js';
import { initMondo1 } from './worlds/mondo1.js';
import { initMondo2 } from './worlds/mondo2.js';

// ---- Attendi il DOM ----
document.addEventListener('DOMContentLoaded', () => {

  // ---- Init sistemi ----
  // L'audio va inizializzato prima di tutto: show() lo chiama a ogni cambio
  // scena, quindi il deck deve esistere prima che un mondo possa muoversi.
  initAudio($('#themeAudio'));
  initParallax();
  initDust();
  initInventoryUI();
  initCloseup();
  initShutterPuzzle();
  initClockPuzzle();
  initSafePuzzle();
  initMirrorPuzzle();
  initHeartPuzzle();
  initPrintPuzzle();
  initTavoloPuzzle();
  initCompressorePuzzle();
  initIntro();

  // Crediti: "Torna al titolo" ricarica pulito sulla title screen.
  $('#creditsBack')?.addEventListener('click', () => location.reload());
  initPrologueHotspots();
  initMondo1();
  initMondo2();
  initNavLabels();

  // ---- Title Screen ----
  const title = $('#title');

  function closeTitle() {
    title.style.opacity = 0;
    setTimeout(() => { title.style.display = 'none'; }, 1400);
    // Il tema sfuma e il monologo del prologo resta in silenzio: la musica
    // di gioco entra solo al risveglio in camera, via show('hub').
    fadeOutTheme();
  }

  // Nuova Partita — unica via d'ingresso: si riparte sempre da zero.
  $('#newGameBtn').addEventListener('click', () => {
    closeTitle();
    runIntro();
  });

  // ---- Opzioni ----
  const optionsPanel = $('#options');
  $('#optionsBtn').addEventListener('click', () => optionsPanel.classList.add('open'));
  $('#optBack').addEventListener('click', () => optionsPanel.classList.remove('open'));

  const volSlider = $('#volMusic');
  function applyVolume() {
    setMasterVolume((+volSlider.value) / 100);
  }
  volSlider.addEventListener('input', applyVolume);
  applyVolume();

  let autoAdvance = false;
  const toggleAutoBtn = $('#toggleAuto');
  toggleAutoBtn.addEventListener('click', () => {
    autoAdvance = !autoAdvance;
    toggleAutoBtn.textContent = autoAdvance ? 'Sì' : 'No';
    toggleAutoBtn.dataset.on = autoAdvance ? '1' : '0';
  });

  // Musica: il primo click sulla title la avvia (policy autoplay browser).
  // Sblocca anche l'audio per le tracce di scena che partiranno dopo.
  title.addEventListener('click', () => { playTheme(); }, { once: true });

});
