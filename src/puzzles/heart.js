// ============================================================
// MINIGIOCO 1 — RICOMPORRE IL CUORE (→ USB)
//
// Due metà (frammento-cuore-sinistro/destro) da trascinare su una
// sagoma-guida fantasma al centro. Snap quando la metà è vicina al
// suo bersaglio; nessun fallimento — se la lasci lontana resta dov'è
// e puoi riprovare. Piazzate entrambe → pulsante "Trasferisci su USB"
// → flag usbLoaded, poi si torna alla Camera.
//
// Aperto dall'hotspot PC in casaf-camera (gate: has('usb')).
// Hook di verifica: window.__solveHeart().
// ============================================================

import { S, writeSave } from "../state.js";
import { $, speak, P, SG } from "../engine.js";

// Coordinate in % dello stage (0..100). La sagoma-guida sta ai bersagli;
// le metà partono in basso ai lati (vassoio).
const TARGET = { L: { x: 40, y: 50 }, R: { x: 60, y: 50 } };
const TRAY = { L: { x: 17, y: 82 }, R: { x: 83, y: 82 } };
const SNAP = 16; // raggio di aggancio in % dello stage

let placed = { L: false, R: false };
let drag = null;
let solved = false;
let rectC = null; // rect dello stage, misurato una volta per drag

const pieceEl = (k) => $(k === "L" ? "#pieceL" : "#pieceR");

function stageRect() {
  return $("#heartStage").getBoundingClientRect();
}

function pctFromEvent(e) {
  const r = rectC || stageRect();
  return {
    x: ((e.clientX - r.left) / r.width) * 100,
    y: ((e.clientY - r.top) / r.height) * 100,
  };
}

function setPos(el, x, y) {
  el.style.left = x + "%";
  el.style.top = y + "%";
}

function onDown(key, e) {
  if (solved || placed[key]) return;
  const el = pieceEl(key);
  drag = { key, el };
  rectC = stageRect();
  el.classList.add("grab");
  el.setPointerCapture?.(e.pointerId);
  onMove(e); // la metà salta subito sotto il dito
}

function onMove(e) {
  if (!drag) return;
  const p = pctFromEvent(e);
  setPos(drag.el, p.x, p.y);
}

function onUp(e) {
  if (!drag) return;
  const { key, el } = drag;
  el.classList.remove("grab");
  drag = null;
  const p = pctFromEvent(e);
  const t = TARGET[key];
  if (Math.hypot(p.x - t.x, p.y - t.y) <= SNAP) {
    setPos(el, t.x, t.y);
    el.classList.add("set");
    placed[key] = true;
    check();
  }
  // fuori raggio: resta dov'è, nessuna penalità
}

function check() {
  if (!(placed.L && placed.R)) return;
  const fb = $("#heartFb");
  fb.textContent = "Il cuore è di nuovo intero.";
  fb.classList.add("ok");
  $("#heartTransfer").style.display = "";
}

function onSolved() {
  if (solved) return;
  solved = true;
  $("#heartPuzzle").classList.remove("open");
  S.flags.usbLoaded = true;
  writeSave();
  speak([
    SG("Le due metà combaciano. Carichi il modello 3D dentro la chiavetta."),
    P("Fatto. È tutto sulla chiavetta, adesso."),
  ]);
}

export function openHeart() {
  solved = false;
  drag = null;
  placed = { L: false, R: false };
  const fb = $("#heartFb");
  fb.textContent = "…";
  fb.classList.remove("ok");
  $("#heartTransfer").style.display = "none";
  ["L", "R"].forEach((k) => {
    const el = pieceEl(k);
    el.classList.remove("set", "grab");
    setPos(el, TRAY[k].x, TRAY[k].y);
  });
  $("#heartPuzzle").classList.add("open");
}

export function initHeartPuzzle() {
  // Sagoma-guida fissa ai bersagli.
  ["L", "R"].forEach((k) => {
    const g = $(`#ghost${k}`);
    if (g) setPos(g, TARGET[k].x, TARGET[k].y);
    const el = pieceEl(k);
    if (!el) return;
    el.addEventListener("pointerdown", (e) => onDown(k, e));
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
  });

  const t = $("#heartTransfer");
  if (t) t.addEventListener("click", onSolved);
  const back = $("#heartBack");
  if (back)
    back.addEventListener("click", () =>
      $("#heartPuzzle").classList.remove("open"),
    );

  // Hook di verifica headless: completa il minigioco end-to-end.
  window.__solveHeart = () => onSolved();
}
