// ============================================================
// ENGINE — cuore del gioco. Si scrive una volta, non si tocca
// quasi più. I mondi importano queste funzioni.
// ============================================================

import { S, writeSave } from "./state.js";

// ---- Shortcut DOM ----
export const $ = (s) => document.querySelector(s);
export const $$ = (s) => document.querySelectorAll(s);

// ---- Scene Manager ----

export function show(scene) {
  $$(".scene").forEach((s) =>
    s.classList.toggle("active", s.dataset.scene === scene),
  );
  S.scene = scene;
}

export function hs(action) {
  return $(`[data-action="${action}"]`);
}

export function setHS(action, visible) {
  const el = hs(action);
  if (el) el.classList.toggle("hidden", !visible);
}

// ---- Etichette di navigazione ----
// Nomi leggibili delle scene, mostrati sopra gli hotspot di viaggio
// (.hotspot.nav[data-goto]). Unica fonte dei nomi: modificali qui.
export const SCENE_NAMES = {
  hub: "Camera",
  piazza: "Piazza dell'Orologio",
  vicolo: "Vicolo Saracinesca",
  nettuno: "Piazza Nettuno",
  spiaggia: "Spiaggia degli Scogli",
  "casa-soggiorno": "Soggiorno",
  "casa-bagno": "Bagno",
};

// Inietta l'etichetta col nome della destinazione in ogni hotspot di
// navigazione. Chiamata una volta all'avvio (gli hotspot sono statici).
// `data-label` sull'hotspot sovrascrive il nome della mappa (serve p.es.
// alla porta in piazza: "Appartamento" invece di "Soggiorno").
export function initNavLabels() {
  $$(".hotspot.nav[data-goto]").forEach((el) => {
    const name = el.dataset.label || SCENE_NAMES[el.dataset.goto];
    if (!name || el.querySelector(".label")) return;
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = name;
    el.appendChild(label);
  });
}

// ---- Dissolvenza bianca fra due scene ----
// `swap` viene eseguita a schermo pieno bianco, poi il bianco svanisce.

export function fadeWhite(swap, hold = 700) {
  const w = $("#whiteout");
  if (!w) {
    swap();
    return;
  }
  w.classList.add("on");
  setTimeout(() => {
    swap();
    setTimeout(() => w.classList.remove("on"), 80);
  }, hold);
}

// ---- Warmth (riscaldamento visivo) ----

export function setWarmth(n) {
  S.warmth = n;
  const stage = $("#stage");
  stage.classList.remove("warm-0", "warm-1", "warm-2", "warm-3");
  stage.classList.add("warm-" + n);
}

// ---- Dadi (slot HUD) ----

export function collectDie(n) {
  if (S.dice.includes(n)) return;
  S.dice.push(n);
  const slot = $(`.slot[data-die="${n}"]`);
  if (slot) {
    slot.classList.add("filled");
    slot.textContent = "\u25c6";
  }
}

// ---- Narrazione (testo breve in basso, auto-dismiss) ----

let narrTimer;
export function say(text, hold = 4200) {
  const box = $("#narrBox");
  if (!box) return;
  box.textContent = text;
  box.classList.add("show");
  clearTimeout(narrTimer);
  narrTimer = setTimeout(() => box.classList.remove("show"), hold);
}

// ---- Dialogue Engine ----

let dQueue = [];
let dCb = null;
let dLock = false;

export function isDialogueLocked() {
  return dLock;
}

export function speak(lines, cb) {
  dQueue = lines.slice();
  dCb = cb || null;
  $("#dialogue").classList.add("show");
  dLock = true;
  nextLine();
}

function nextLine() {
  if (dQueue.length === 0) {
    $("#dialogue").classList.remove("show");
    hidePortraits();
    dLock = false;
    const c = dCb;
    dCb = null;
    if (c) c();
    return;
  }
  const l = dQueue.shift();
  const whoEl = $("#dWho");
  const txtEl = $("#dTxt");
  whoEl.className = "who" + (l.who === "Nox" ? " prot" : "");
  whoEl.textContent = l.who || "";
  whoEl.style.display = l.who ? "block" : "none";
  txtEl.className = "txt" + (l.stage ? " stage" : "");
  txtEl.textContent = l.text;
  updatePortraits(l);
}

// ---- Ritratti personaggio (stile visual novel) ----
// image è il nome file senza estensione (es. "Nox_worried"); la cartella
// del personaggio è tutto ciò che precede il primo "_".

function portraitSrc(image) {
  const folder = image.split("_")[0];
  return `/assets/images/characters/${folder}/${image}.png`;
}

function setPortrait(el, image) {
  if (!image) {
    el.classList.remove("show");
    return;
  }
  el.style.backgroundImage = `url("${portraitSrc(image)}")`;
  el.classList.add("show");
}

function updatePortraits(l) {
  const left = $("#portraitLeft");
  const right = $("#portraitRight");
  if (!left || !right) return;
  if (l.who === "Nox") setPortrait(left, l.image);
  else if (l.who) setPortrait(right, l.image);
  const active = l.who === "Nox" ? "left" : l.who ? "right" : null;
  left.classList.toggle("dim", active !== "left");
  right.classList.toggle("dim", active !== "right");
}

function hidePortraits() {
  const left = $("#portraitLeft");
  const right = $("#portraitRight");
  if (left) left.classList.remove("show");
  if (right) right.classList.remove("show");
}

// Avanza i dialoghi al click
document.addEventListener("DOMContentLoaded", () => {
  const dEl = $("#dialogue");
  if (dEl)
    dEl.addEventListener("click", () => {
      if (dLock) nextLine();
    });
});

// ---- Shortcut per costruire battute ----

export const P = (t, image = "Nox_worried") => ({ who: "Nox", text: t, image });
export const L = (t, image = "FiguraMisteriosa_neutral") => ({
  who: "?",
  text: t,
  image,
});
export const SG = (t, image) => ({ stage: true, text: t, image });

// ---- Parallax ----

function parallax(px, py) {
  $$(".scene.active .layer").forEach((l) => {
    const d = parseFloat(l.dataset.depth || 0);
    l.style.transform = `translate(${-px * d * 38}px, ${-py * d * 38}px)`;
  });
}

export function initParallax() {
  window.addEventListener("mousemove", (e) =>
    parallax(
      (e.clientX / innerWidth - 0.5) * 2,
      (e.clientY / innerHeight - 0.5) * 2,
    ),
  );
  window.addEventListener(
    "deviceorientation",
    (e) => {
      if (e.gamma == null) return;
      parallax(
        Math.max(-1, Math.min(1, e.gamma / 30)),
        Math.max(-1, Math.min(1, (e.beta - 45) / 30)),
      );
    },
    true,
  );
}

// ---- Polvere sospesa ----

export function initDust() {
  const dust = $("#dust");
  if (!dust) return;
  for (let i = 0; i < 22; i++) {
    const m = document.createElement("div");
    m.className = "mote";
    m.style.left = Math.random() * 100 + "%";
    m.style.top = Math.random() * 100 + "%";
    const dur = 8 + Math.random() * 10;
    m.style.animationDuration = dur + "s";
    m.style.animationDelay = -Math.random() * dur + "s";
    m.style.opacity = 0.2 + Math.random() * 0.4;
    dust.appendChild(m);
  }
}
