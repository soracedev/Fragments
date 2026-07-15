// ============================================================
// FINALE · MINIGIOCO 1 — TAVOLINO (dosaggio + colore)
//
// Due slider (componenti A e B della resina) da portare in una zona
// verde ampia — basta avvicinarsi, nessun rapporto preciso. Un
// contagocce da cliccare qualche volta tinge lo stampo. Dosaggio ok
// + almeno 3 gocce → "Cola nello stampo" → flag tavoloDone (sblocca
// il Compressore). Difficoltà volutamente minima (è tra gli ultimi
// gesti del gioco: conta la scelta di farlo, non la sfida).
//
// Hook di verifica: window.__solveTavolino().
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, P, SG } from '../engine.js';

const GREEN_LO = 30, GREEN_HI = 70; // zona verde larga (su 0..100)
const DROPS_TARGET = 3;
const DROPS_MAX = 5;

let drops = 0;
let solved = false;

const val = (id) => Number($(id).value);
const inGreen = (v) => v >= GREEN_LO && v <= GREEN_HI;

function render() {
  const a = val('#doseA'), b = val('#doseB');
  // Stampo: si riempie e si tinge man mano che aggiungi colore.
  const fill = $('#beakerFill');
  fill.style.height = (18 + drops * 15) + '%';
  fill.style.background = `hsl(325, 62%, ${72 - drops * 9}%)`;

  const okDose = inGreen(a) && inGreen(b);
  const okColor = drops >= DROPS_TARGET;
  const fb = $('#tavoloFb');
  if (okDose && okColor) {
    fb.textContent = 'Dosaggio giusto, colore pronto.';
    fb.classList.add('ok');
    $('#tavoloPour').style.display = '';
  } else {
    fb.classList.remove('ok');
    fb.textContent = !okDose ? 'Il dosaggio non è ancora nel verde.' : 'Serve ancora un po’ di colore.';
    $('#tavoloPour').style.display = 'none';
  }
}

function addDrop() {
  if (solved) return;
  drops = Math.min(DROPS_MAX, drops + 1);
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
  // Posizioni di partenza fuori dal verde, così il gesto c'è.
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
