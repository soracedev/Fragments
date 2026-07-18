// ============================================================
// ENIGMA OROLOGIO — trascina le lancette fino alle 03:00.
//
// Quadrante e lancette sono tre immagini separate, mostrate a
// tutto schermo sopra la piazza sfocata. Si afferra una lancetta
// e la si fa ruotare attorno al perno; al rilascio scatta sul
// rintocco più vicino (12 posizioni, i minuti a passi di 5).
//
// Gli sprite delle lancette sono disegnati in diagonale, non in
// verticale: HAND_*_OFFSET è la rotazione che serve a riportarli
// su mezzogiorno, misurata sui pixel (perno → punta).
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, SG, P, L } from '../engine.js';
import { acquire } from '../inventory.js';

const TH = 3, TM = 0; // bersaglio 03:00: ore sul 3, minuti sul 12

const HAND_H_OFFSET = 46.17;
const HAND_M_OFFSET = 64.59;

// Perno dello sprite (il foro dell'anello), identico per entrambe le lancette.
const HAND_PIVOT = 'translate(-75.55%, -74.43%)';

// Perno del quadrante, in frazione dell'immagine (misurato sui pixel).
const DIAL_CX = 0.4979, DIAL_CY = 0.4716;

const START_H = 7, START_M = 8; // rintocchi di partenza (07:40)

let hTick = START_H, mTick = START_M; // rintocco corrente (0-11)
let hAngle = START_H * 30;            // angolo mostrato: 0 = mezzogiorno, orario
let mAngle = START_M * 30;
let grabbed = null;                   // 'H' | 'M' | null
let solved = false;
let dialC = null;                     // rect del quadrante, misurato una volta per drag

function dialCenter() {
  const r = $('#clock').getBoundingClientRect();
  return {
    x: r.left + r.width * DIAL_CX,
    y: r.top + r.height * DIAL_CY,
    radius: r.width / 2,
  };
}

// Angolo del puntatore attorno al perno: 0 = mezzogiorno, cresce in senso orario.
function pointerAngle(e, c) {
  return (Math.atan2(e.clientX - c.x, -(e.clientY - c.y)) * 180 / Math.PI + 360) % 360;
}

// Porta una differenza di angoli nell'intervallo (-180, 180].
function shortestDelta(a) {
  return ((((a + 180) % 360) + 360) % 360) - 180;
}

function render() {
  $('#handH').style.transform = `${HAND_PIVOT} rotate(${HAND_H_OFFSET + hAngle}deg)`;
  $('#handM').style.transform = `${HAND_PIVOT} rotate(${HAND_M_OFFSET + mAngle}deg)`;
}

function feedback() {
  const fb = $('#clockFb');
  const hd = Math.min(Math.abs(hTick - TH), 12 - Math.abs(hTick - TH));
  const md = Math.min(mTick, 12 - mTick);
  const off = hd + md;
  fb.classList.remove('ok');
  fb.textContent = off <= 2 ? 'Ci sei quasi…' : (off <= 5 ? 'Ti stai avvicinando.' : 'Le lancette non combaciano.');
}

// Sceglie la lancetta da afferrare: quella più vicina in angolo al puntatore.
// Se sono quasi sovrapposte decide la distanza dal perno (lontano = minuti).
function pickHand(angle, dist, radius) {
  const dH = Math.abs(shortestDelta(angle - hAngle));
  const dM = Math.abs(shortestDelta(angle - mAngle));
  if (Math.abs(dH - dM) < 20) return dist > radius * 0.4 ? 'M' : 'H';
  return dH < dM ? 'H' : 'M';
}

function onDown(e) {
  if (solved) return;
  const c = (dialC = dialCenter());
  const a = pointerAngle(e, c);
  const dist = Math.hypot(e.clientX - c.x, e.clientY - c.y);
  grabbed = pickHand(a, dist, c.radius);

  const clock = $('#clock');
  clock.classList.add('grabbing');
  clock.setPointerCapture(e.pointerId);
  $('#handH').classList.remove('snap');
  $('#handM').classList.remove('snap');
  onMove(e); // la lancetta salta subito sotto il dito
}

function onMove(e) {
  if (!grabbed || solved) return;
  const a = pointerAngle(e, dialC || dialCenter());
  if (grabbed === 'H') hAngle = a; else mAngle = a;
  render();
}

function onUp(e) {
  const clock = $('#clock');
  clock.classList.remove('grabbing');
  if (clock.hasPointerCapture?.(e.pointerId)) clock.releasePointerCapture(e.pointerId);
  if (!grabbed || solved) return;

  // Scatto sul rintocco più vicino. L'angolo mostrato può valere 360
  // (e non 0) così lo snap da ~355° non torna indietro di un giro.
  const hand = grabbed;
  grabbed = null;
  dialC = null;
  if (hand === 'H') {
    const raw = Math.round(hAngle / 30);
    hTick = raw % 12;
    hAngle = raw * 30;
    $('#handH').classList.add('snap');
  } else {
    const raw = Math.round(mAngle / 30);
    mTick = raw % 12;
    mAngle = raw * 30;
    $('#handM').classList.add('snap');
  }
  render();

  if (hTick === TH && mTick === TM) onSolved();
  else feedback();
}

function onSolved() {
  solved = true;
  const fb = $('#clockFb');
  fb.textContent = '03:00 — il tempo si sblocca.';
  fb.classList.add('ok');
  $('#clock').classList.add('solved');

  setTimeout(() => {
    $('#clockPuzzle').classList.remove('open');
    S.flags.clockFixed = true;
    writeSave();

    speak([
      SG("L'orologio riparte. Un ticchettio, poi un CLICK secco: da dietro il quadrante cade qualcosa che tintinna sul selciato."),
      P('Una chiave.'),
    ], () => {
      S.has.chiave = true;
      acquire('chiave', 'Raccogli la chiave.', () => {
        writeSave();
        if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();

        speak([
          P('Hai visto? Incredibile, ma ce l’ho fatta.'),
          L('Ok, riparte. E quindi?'),
          L('Va bene, eh. Sul serio. Solo... non è che uno «riparte» così, perché un orologio ticchetta di nuovo.'),
          SG('In fondo alla piazza, una finestra prima buia si illumina. Sotto, una porta.'),
        ], () => {
          if (typeof window.__onClockDone === 'function') window.__onClockDone();
        });
      });
    });
  }, 1100);
}

export function openClock() {
  speak([
    SG("Ti avvicini all'orologio. La lancetta delle ore entra nel perno, come se avesse sempre avuto quel posto."),
    P('03:00. Perché proprio quell’ora, poi, chissà.'),
  ], () => {
    hTick = START_H; mTick = START_M;
    hAngle = hTick * 30; mAngle = mTick * 30;
    grabbed = null;
    solved = false;
    $('#clock').classList.remove('solved');
    $('#handH').classList.remove('snap');
    $('#handM').classList.remove('snap');
    $('#clockPuzzle').classList.add('open');
    render();
    feedback();
  });
}

export function initClockPuzzle() {
  const clock = $('#clock');
  clock.addEventListener('pointerdown', onDown);
  clock.addEventListener('pointermove', onMove);
  clock.addEventListener('pointerup', onUp);
  clock.addEventListener('pointercancel', onUp);

  $('#clockBack').addEventListener('click', () => $('#clockPuzzle').classList.remove('open'));
}
