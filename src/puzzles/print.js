// ============================================================
// MINIGIOCO 2 — STAMPA DEL D6 (6 fasi, tap-nel-verde)
//
// Un indicatore oscilla avanti e indietro sul gauge. Il giocatore
// "batte" (tap) per far avanzare la stampa di una fase, ma SOLO se
// in quel momento l'indicatore è nella zona verde. Ad ogni fase la
// zona verde si sposta e si restringe un po'. Se il tap cade fuori,
// si torna indietro di una fase (nessun fallimento definitivo).
// Il D6 (dado-d6.png) compare gradualmente, una frazione per fase.
// Completate le 6 fasi → oggetto d6.
//
// Aperto dall'hotspot Stampante in casaf-camera (gate: usbLoaded).
// Hook di verifica: window.__solvePrint().
// ============================================================

import { S, writeSave } from "../state.js";
import { $, speak, P, SG } from "../engine.js";
import { acquire } from "../inventory.js";

const PHASES = 6;
const SPEED = 0.92; // velocità dell'indicatore (frazione di barra al secondo)

let needle = 0; // posizione indicatore 0..1
let dir = 1; // verso dell'oscillazione
let phase = 0; // fasi completate 0..PHASES
let green = { c: 0.5, w: 0.3 }; // zona verde: centro + larghezza
let raf = 0;
let last = 0;
let done = false;

// Il verde si restringe man mano che si avanza (0.30 → ~0.16).
const greenWidth = (p) => 0.3 - p * 0.028;

function newGreen(p) {
  const w = greenWidth(p);
  const c = w / 2 + Math.random() * (1 - w); // centro sempre raggiungibile
  green = { c, w };
}

const inGreen = () =>
  needle >= green.c - green.w / 2 && needle <= green.c + green.w / 2;

// Stato "statico" (fase, zona verde, reveal del dado): ridisegnato ad ogni tap.
function renderStatic() {
  const z = $("#gaugeZone");
  z.style.left = (green.c - green.w / 2) * 100 + "%";
  z.style.width = green.w * 100 + "%";
  $("#printFill").style.width = (phase / PHASES) * 100 + "%";
  $("#printDie").style.opacity = String(phase / PHASES);
  $("#printFb").textContent = `Fase ${Math.min(phase, PHASES)} / ${PHASES}`;
}

// Loop di sola animazione: muove l'indicatore, NON tocca il progresso.
function tick(ts) {
  if (done) return;
  if (!last) last = ts;
  const dt = Math.min(0.05, (ts - last) / 1000);
  last = ts;
  needle += dir * SPEED * dt;
  if (needle >= 1) {
    needle = 1;
    dir = -1;
  }
  if (needle <= 0) {
    needle = 0;
    dir = 1;
  }
  $("#gaugeNeedle").style.left = needle * 100 + "%";
  raf = requestAnimationFrame(tick);
}

function flash(ok) {
  const fb = $("#printFb");
  fb.classList.toggle("ok", ok);
  fb.classList.toggle("miss", !ok);
  setTimeout(() => {
    if (!done) {
      fb.classList.remove("ok", "miss");
    }
  }, 240);
}

function onTap() {
  if (done) return;
  if (inGreen()) {
    phase = Math.min(PHASES, phase + 1);
    flash(true);
    if (phase >= PHASES) {
      renderStatic();
      return onComplete();
    }
    newGreen(phase);
  } else {
    phase = Math.max(0, phase - 1);
    flash(false);
    newGreen(phase);
  }
  renderStatic();
}

function onComplete() {
  if (done) return;
  done = true;
  cancelAnimationFrame(raf);
  phase = PHASES;
  $("#printDie").style.opacity = "1";
  $("#printFill").style.width = "100%";
  const fb = $("#printFb");
  fb.textContent = "Stampa completata.";
  fb.classList.remove("miss");
  fb.classList.add("ok");
  setTimeout(() => {
    $("#printPuzzle").classList.remove("open");
    writeSave();
    acquire(
      "d6",
      "La stampante si ferma. Prendi il D6, ancora tiepido.",
      () => {
        speak([P("Guarda un po’. Gli è venuto bene.")]);
      },
    );
  }, 1100);
}

export function openPrint() {
  done = false;
  needle = 0;
  dir = 1;
  phase = 0;
  last = 0;
  newGreen(0);
  $("#printDie").style.opacity = "0";
  $("#printFb").classList.remove("ok", "miss");
  renderStatic();
  $("#printPuzzle").classList.add("open");
  raf = requestAnimationFrame(tick);
}

export function initPrintPuzzle() {
  const g = $("#gauge");
  if (g) g.addEventListener("pointerdown", onTap);
  const back = $("#printBack");
  if (back)
    back.addEventListener("click", () => {
      done = true; // ferma il loop; la stampa riparte da zero alla riapertura
      cancelAnimationFrame(raf);
      $("#printPuzzle").classList.remove("open");
    });

  // Hook di verifica headless: completa la stampa end-to-end.
  window.__solvePrint = () => onComplete();
}
