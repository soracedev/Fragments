// ============================================================
// MAIN — entry point. Importa tutti i moduli e li collega.
// ============================================================

import { S, hasSave, readSave, writeSave } from './state.js';
import { $, show, collectDie, say, setWarmth, initParallax, initDust, initNavLabels } from './engine.js';
import { refreshBackpackBadge, initInventoryUI } from './inventory.js';
import { initCloseup } from './closeup.js';
import { initShutterPuzzle } from './puzzles/shutter.js';
import { initClockPuzzle } from './puzzles/clock.js';
import { initSafePuzzle } from './puzzles/safe.js';
import { initMirrorPuzzle } from './puzzles/mirror.js';
import { runIntro, initIntro, initPrologueHotspots, refreshPrologueHotspots } from './worlds/prologue.js';
import { initMondo1, refreshHotspots } from './worlds/mondo1.js';

// ---- Attendi il DOM ----
document.addEventListener('DOMContentLoaded', () => {

  // ---- Init sistemi ----
  initParallax();
  initDust();
  initInventoryUI();
  initCloseup();
  initShutterPuzzle();
  initClockPuzzle();
  initSafePuzzle();
  initMirrorPuzzle();
  initIntro();
  initPrologueHotspots();
  initMondo1();
  initNavLabels();

  // ---- Title Screen ----
  const themeAudio = $('#themeAudio');
  const title = $('#title');

  // Continua: attiva solo se c'è un salvataggio
  if (hasSave()) $('#continueBtn').removeAttribute('disabled');

  function closeTitle() {
    title.style.opacity = 0;
    setTimeout(() => { title.style.display = 'none'; }, 1400);
    stopMusic();
  }

  function stopMusic() {
    if (!themeAudio) return;
    const startVol = themeAudio.volume;
    const steps = 20;
    let i = 0;
    const fade = setInterval(() => {
      i++;
      themeAudio.volume = Math.max(0, startVol * (1 - i / steps));
      if (i >= steps) {
        clearInterval(fade);
        themeAudio.pause();
        themeAudio.currentTime = 0;
        themeAudio.volume = startVol;
      }
    }, 60);
  }

  // Nuova Partita
  $('#newGameBtn').addEventListener('click', () => {
    closeTitle();
    runIntro();
  });

  // Continua
  $('#continueBtn').addEventListener('click', () => {
    const saved = readSave();
    if (!saved) return;
    Object.assign(S, saved);
    closeTitle();
    $('#hud').classList.add('show');
    show(S.scene || 'hub');
    setWarmth(S.warmth || 0);
    refreshPrologueHotspots();
    refreshHotspots();
    refreshBackpackBadge();
    (S.dice || []).forEach(n => {
      const s = $(`.slot[data-die="${n}"]`);
      if (s) { s.classList.add('filled'); s.textContent = '\u25c6'; }
    });
    say('Bentornata. Riprendi da dove avevi lasciato.');
  });

  // ---- Opzioni ----
  const optionsPanel = $('#options');
  $('#optionsBtn').addEventListener('click', () => optionsPanel.classList.add('open'));
  $('#optBack').addEventListener('click', () => optionsPanel.classList.remove('open'));

  const volSlider = $('#volMusic');
  function applyVolume() {
    if (themeAudio) themeAudio.volume = (+volSlider.value) / 100;
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

  // Musica: il primo click sulla title la avvia (policy autoplay browser)
  let musicStarted = false;
  title.addEventListener('click', () => {
    if (musicStarted || !themeAudio) return;
    themeAudio.play().then(() => { musicStarted = true; }).catch(() => {});
  }, { once: true });

});
