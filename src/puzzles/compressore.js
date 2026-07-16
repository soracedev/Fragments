// ============================================================
// FINALE · MINIGIOCO 2 — COMPRESSORE (pressure pot)
//
// Stesso spirito della stampa (tap-nel-verde a fasi) ma volutamente
// facile: 3 fasi, zona verde larga, una barra di "pressione" che si
// riempie. Tap col verde = +1 fase; tap fuori = -1 fase (mai sotto
// zero). A pressione piena → set di dadi (D8/D10/D12/D%/D20) e parte
// il finale. È l'ultimo enigma del gioco: il più semplice.
//
// Hook di verifica: window.__solveCompressore().
// ============================================================

import { S, writeSave } from "../state.js";
import { $ } from "../engine.js";
import { addItem, pickupBanner } from "../inventory.js";

const PHASES = 3;
const SPEED = 0.82; // indicatore un po' più lento della stampa

let needle = 0;
let dir = 1;
let phase = 0;
let green = { c: 0.5, w: 0.42 };
let raf = 0;
let last = 0;
let done = false;

const greenWidth = (p) => 0.42 - p * 0.04; // resta larga: 0.42 → 0.34

function newGreen(p) {
  const w = greenWidth(p);
  const c = w / 2 + Math.random() * (1 - w);
  green = { c, w };
}

const inGreen = () =>
  needle >= green.c - green.w / 2 && needle <= green.c + green.w / 2;

function renderStatic() {
  const z = $("#pressZone");
  z.style.left = (green.c - green.w / 2) * 100 + "%";
  z.style.width = green.w * 100 + "%";
  $("#pressFill").style.width = (phase / PHASES) * 100 + "%";
  $("#pressFb").textContent =
    `Pressione ${Math.min(phase, PHASES)} / ${PHASES}`;
}

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
  $("#pressNeedle").style.left = needle * 100 + "%";
  raf = requestAnimationFrame(tick);
}

function flash(ok) {
  const fb = $("#pressFb");
  fb.classList.toggle("ok", ok);
  fb.classList.toggle("miss", !ok);
  setTimeout(() => {
    if (!done) fb.classList.remove("ok", "miss");
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
  $("#pressFill").style.width = "100%";
  const fb = $("#pressFb");
  fb.classList.remove("miss");
  fb.classList.add("ok");
  fb.textContent = "Pressione raggiunta.";
  setTimeout(() => {
    $("#compressorePuzzle").classList.remove("open");
    S.flags.compressoreDone = true;
    ["d8", "d10", "d12", "d100", "d20"].forEach(addItem);
    writeSave();
    // Un unico banner per l'intero set, poi parte il dialogo finale.
    pickupBanner("\u{1F3B2}", "Il set di dadi è finalmente completo.", () => {
      if (typeof window.__onCompressoreDone === "function")
        window.__onCompressoreDone();
    });
  }, 900);
}

export function openCompressore() {
  done = false;
  needle = 0;
  dir = 1;
  phase = 0;
  last = 0;
  newGreen(0);
  $("#pressFb").classList.remove("ok", "miss");
  renderStatic();
  $("#compressorePuzzle").classList.add("open");
  raf = requestAnimationFrame(tick);
}

export function initCompressorePuzzle() {
  const g = $("#pressGauge");
  if (g) g.addEventListener("pointerdown", onTap);
  const back = $("#pressBack");
  if (back)
    back.addEventListener("click", () => {
      done = true;
      cancelAnimationFrame(raf);
      $("#compressorePuzzle").classList.remove("open");
    });

  window.__solveCompressore = () => onComplete();
}
