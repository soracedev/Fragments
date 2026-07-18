// ============================================================
// MAIN — entry point. Importa tutti i moduli e li collega.
// ============================================================

import { $, initParallax, initDust, initNavLabels, preloadBackgrounds } from './engine.js';
import {
  initAudio, playTheme, fadeOutTheme, setMasterVolume,
  TRACKS, playPreview, stopPreview, currentPreview,
} from './audio.js';
import { hasCompleted } from './state.js';
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
  preloadBackgrounds(); // decodifica gli sfondi ora, così i cambi scena non stallano
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

  // Crediti: dopo il finale "Torna al titolo" ricarica pulito. Se invece la
  // dedica è stata aperta dal menu, il gioco non è in corso: basta chiudere
  // l'overlay, senza ricaricare (e senza rivedere il gate d'ingresso).
  let creditsFromTitle = false;
  $('#creditsBack')?.addEventListener('click', () => {
    if (!creditsFromTitle) { location.reload(); return; }
    creditsFromTitle = false;
    const c = $('#credits');
    c.classList.remove('open', 'vis');
  });
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

  // ---- Dedica (solo a gioco concluso almeno una volta) ----
  const dedicaBtn = $('#dedicaBtn');
  if (hasCompleted()) dedicaBtn.classList.remove('hidden');
  dedicaBtn.addEventListener('click', () => {
    creditsFromTitle = true;
    const c = $('#credits');
    c.scrollTop = 0; // riparte dall'inizio anche se era già stata letta
    c.classList.add('open');
    void c.offsetWidth; // reflow: senza, il fade-in della dedica non parte
    c.classList.add('vis');
  });

  // ---- Ascolta ----
  // Lista secca: una traccia alla volta, nessuna playlist. Ritoccare la
  // traccia in ascolto la ferma; uscendo torna il tema del titolo.
  const soundsPanel = $('#sounds');
  const soundList = $('#soundList');

  function paintTracks() {
    const playing = currentPreview();
    soundList.querySelectorAll('.trackBtn').forEach((b) => {
      const on = b.dataset.key === playing;
      b.dataset.playing = on ? '1' : '0';
      b.querySelector('.trackIcon').textContent = on ? '■' : '▶';
    });
  }

  TRACKS.forEach((t) => {
    const b = document.createElement('button');
    b.className = 'trackBtn';
    b.dataset.key = t.key;
    b.innerHTML = '<span class="trackIcon"></span>';
    b.appendChild(document.createTextNode(t.name));
    b.addEventListener('click', () => { playPreview(t.key); paintTracks(); });
    soundList.appendChild(b);
  });

  $('#soundsBtn').addEventListener('click', () => {
    soundsPanel.classList.add('open');
    paintTracks();
  });
  $('#soundsBack').addEventListener('click', () => {
    stopPreview(); // il tema del titolo riprende
    paintTracks();
    soundsPanel.classList.remove('open');
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

  // ---- Gate d'ingresso ----
  // Il click sul gate è il gesto utente che sblocca l'audio per tutta la
  // partita: avvia il tema e scopre il titolo con la musica già in corso.
  const gate = $('#gate');
  gate?.addEventListener('click', () => {
    playTheme();
    gate.classList.add('off');
    setTimeout(() => { gate.style.display = 'none'; }, 1000);
  }, { once: true });

});
