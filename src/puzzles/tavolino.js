// ============================================================
// FINALE · MINIGIOCO 1 — TAVOLINO (dosaggio + colore)
//
// Due slider (componenti A e B della resina) da portare ciascuno nella
// propria zona verde. Con entrambi nel verde si sblocca il contagocce:
// ogni goccia tinge lo stampo, ma sposta e restringe le due zone verdi,
// così vanno ri-centrati prima della goccia successiva (stessa logica di
// ri-centraggio del Compressore). 3 gocce → "Cola nello stampo" → flag
// tavoloDone (sblocca il Compressore). Difficoltà volutamente minima (è
// tra gli ultimi gesti del gioco: conta la scelta di farlo, non la sfida).
//
// Hook di verifica: window.__solveTavolino().
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, P, SG } from '../engine.js';

const DROPS_TARGET = 3;
// La zona verde parte larga e si stringe a ogni goccia: 40 → 34 → 28 punti
// su 0..100. Resta comunque generosa anche all'ultima goccia.
const greenWidth = (d) => 40 - d * 6;

let drops = 0;
let solved = false;
// Una zona verde per slider: { lo, hi } su 0..100.
let zones = { doseA: null, doseB: null };

const val = (id) => Number($(id).value);

// Nuova zona verde larga `greenWidth(d)`, che deve NON contenere `avoid`
// (la posizione attuale dello slider): se la zona casuale ci ricadesse
// sopra, si potrebbe premere il contagocce di nuovo senza ricentrare
// niente, e il gesto perderebbe senso. I due tratti ammessi sono
// [0, avoid-w] e [avoid, 100-w]; si sorteggia in proporzione alla loro
// lunghezza.
function newZone(d, avoid) {
  const w = greenWidth(d);
  const left = Math.max(0, avoid - w); // lo ∈ [0, left]  → hi < avoid
  const right = Math.max(0, 100 - w - avoid); // lo ∈ [avoid, avoid+right]
  const lo =
    Math.random() * (left + right) < left
      ? Math.random() * left
      : avoid + Math.random() * right;
  return { lo, hi: lo + w };
}

function newZones(d) {
  zones = {
    doseA: newZone(d, val('#doseA')),
    doseB: newZone(d, val('#doseB')),
  };
}

const inZone = (id) => {
  const z = zones[id];
  const v = val('#' + id);
  return !!z && v >= z.lo && v <= z.hi;
};

// La zona verde dello slider è dipinta come gradiente della track: va
// ridisegnata da JS ogni volta che si sposta.
function paintZone(id) {
  const z = zones[id];
  const el = $('#' + id);
  if (!el || !z) return;
  el.style.background =
    'linear-gradient(90deg,' +
    ` rgba(139, 142, 163, 0.3) 0 ${z.lo}%,` +
    ` rgba(122, 180, 120, 0.5) ${z.lo}% ${z.hi}%,` +
    ` rgba(139, 142, 163, 0.3) ${z.hi}%)`;
}

function render() {
  paintZone('doseA');
  paintZone('doseB');

  // Stampo: si riempie e si tinge man mano che aggiungi colore.
  const fill = $('#beakerFill');
  fill.style.height = (18 + drops * 15) + '%';
  fill.style.background = `hsl(325, 62%, ${72 - drops * 9}%)`;

  const okDose = inZone('doseA') && inZone('doseB');
  const done = drops >= DROPS_TARGET;
  const fb = $('#tavoloFb');
  const dropBtn = $('#dropBtn');

  // Il contagocce esiste solo col dosaggio centrato: altrimenti basterebbe
  // premerlo tre volte di fila e il ri-centraggio non conterebbe nulla.
  if (dropBtn) dropBtn.style.display = !done && okDose ? '' : 'none';
  $('#tavoloPour').style.display = done && okDose ? '' : 'none';

  fb.classList.toggle('ok', okDose);
  if (done && okDose) fb.textContent = 'Dosaggio giusto, colore pronto.';
  else if (done) fb.textContent = 'Il colore c’è. Ricentra il dosaggio.';
  else if (okDose) fb.textContent = `Dosaggio giusto. Gocce: ${drops} / ${DROPS_TARGET}.`;
  else fb.textContent = 'Il dosaggio non è ancora nel verde.';
}

function addDrop() {
  if (solved || drops >= DROPS_TARGET) return;
  if (!(inZone('doseA') && inZone('doseB'))) return;
  drops += 1;
  // Ogni goccia sposta e restringe le zone: il dosaggio va rifatto.
  if (drops < DROPS_TARGET) newZones(drops);
  render();
}

function pour() {
  if (solved || $('#tavoloPour').style.display === 'none') return;
  onSolved();
}

function onSolved() {
  if (solved) return;
  solved = true;
  $('#tavoloPuzzle').classList.remove('open');
  S.flags.tavoloDone = true;
  writeSave();
  speak([
    SG('Versi la resina nello stampo. Ora manca solo la pressione.'),
  ], () => { if (typeof window.__refreshMondo2 === 'function') window.__refreshMondo2(); });
}

export function openTavolino() {
  solved = false;
  drops = 0;
  newZones(0);
  // Posizioni di partenza agli estremi, così il primo gesto c'è comunque.
  $('#doseA').value = 8;
  $('#doseB').value = 92;
  $('#tavoloFb').classList.remove('ok');
  $('#tavoloPour').style.display = 'none';
  render();
  $('#tavoloPuzzle').classList.add('open');
}

export function initTavoloPuzzle() {
  ['#doseA', '#doseB'].forEach((id) => {
    const el = $(id);
    if (el) el.addEventListener('input', render);
  });
  const drop = $('#dropBtn');
  if (drop) drop.addEventListener('click', addDrop);
  const p = $('#tavoloPour');
  if (p) p.addEventListener('click', pour);
  const back = $('#tavoloBack');
  if (back) back.addEventListener('click', () => $('#tavoloPuzzle').classList.remove('open'));

  window.__solveTavolino = () => onSolved();
}
