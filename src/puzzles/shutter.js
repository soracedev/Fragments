// ============================================================
// ENIGMA SARACINESCA — far girare il disco di 360°.
//
// Non basta trascinare: il meccanismo fa resistenza. L'angolo
// accumulato cresce solo finché si gira nel verso giusto (orario)
// e decade da solo appena ci si ferma o si inverte. Serve una
// rotazione continua e sostenuta per arrivare in fondo.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, SG, P, show } from '../engine.js';
import { acquire } from '../inventory.js';

const TARGET = 360;      // gradi da accumulare
const DECAY = 55;        // gradi/secondo che si perdono quando non si gira
const REVERSE_COST = 2;  // girare al contrario costa il doppio
const IDLE_MS = 110;     // dopo quanto un drag fermo è considerato "fermo"

let progress = 0;
let dragging = false;
let lastAngle = 0;
let lastGain = 0;
let solved = false;
let raf = null;
let lastTs = 0;
let center = null; // centro del disco, misurato una volta per drag

function discCenter() {
  const r = $('#shutterDisc').getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

// Angolo del puntatore attorno al perno, in gradi. Cresce in senso orario.
function pointerAngle(e) {
  const c = center || discCenter();
  return (Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180) / Math.PI;
}

// Porta una differenza di angoli nell'intervallo (-180, 180].
function shortestDelta(a) {
  return ((((a + 180) % 360) + 360) % 360) - 180;
}

function render() {
  const pct = (progress / TARGET) * 100;
  $('#shutterDisc').style.transform = `translate(-50%,-50%) rotate(${progress}deg)`;
  $('#shutterFill').style.width = `${pct}%`;

  const fb = $('#shutterFb');
  if (solved) return;
  fb.classList.remove('ok');
  if (progress < 1) fb.textContent = 'Non si muove di un millimetro.';
  else if (pct < 35) fb.textContent = 'Cede appena. Continua a girare.';
  else if (pct < 75) fb.textContent = 'Sta girando. Non fermarti.';
  else fb.textContent = 'Ancora un poco…';
}

function tick(now) {
  raf = requestAnimationFrame(tick);
  const dt = Math.min((now - lastTs) / 1000, 0.05); // il cap evita un salto dopo un tab in background
  lastTs = now;
  if (solved) return;

  const idle = !dragging || now - lastGain > IDLE_MS;
  if (idle && progress > 0) {
    progress = Math.max(0, progress - DECAY * dt);
    render();
  }
}

function onDown(e) {
  if (solved) return;
  dragging = true;
  center = discCenter();
  lastAngle = pointerAngle(e);
  lastGain = performance.now();
  $('#shutterDisc').classList.add('grabbing');
  $('#shutterDisc').setPointerCapture(e.pointerId);
}

function onMove(e) {
  if (!dragging || solved) return;
  const a = pointerAngle(e);
  const delta = shortestDelta(a - lastAngle);
  lastAngle = a;
  if (Math.abs(delta) < 0.01) return;

  if (delta > 0) {
    progress += delta;
    lastGain = performance.now();
  } else {
    progress += delta * REVERSE_COST;
  }
  progress = Math.max(0, Math.min(TARGET, progress));
  render();

  if (progress >= TARGET) onSolved();
}

function onUp(e) {
  dragging = false;
  center = null;
  const disc = $('#shutterDisc');
  disc.classList.remove('grabbing');
  if (disc.hasPointerCapture?.(e.pointerId)) disc.releasePointerCapture(e.pointerId);
}

function onSolved() {
  solved = true;
  dragging = false;
  const fb = $('#shutterFb');
  fb.textContent = 'Il meccanismo scatta. La saracinesca si alza.';
  fb.classList.add('ok');
  $('#shutterDisc').classList.add('solved');

  setTimeout(() => {
    close();
    S.has.lancetta = true;
    S.flags.shutterOpened = true;
    writeSave();

    speak([
      SG('La saracinesca si solleva di mezzo metro. Sotto, nella polvere, qualcosa di metallico.'),
      P('Sembra la lancetta di un orologio!'),
    ], () => {
      acquire('lancetta', 'Raccogli la lancetta delle ore.', () => {
        show('vicolo');
        if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();
      });
    });
  }, 1200);
}

function close() {
  $('#shutterPuzzle').classList.remove('open');
  cancelAnimationFrame(raf);
  raf = null;
}

export function openShutter() {
  progress = 0;
  dragging = false;
  solved = false;
  $('#shutterDisc').classList.remove('solved');
  $('#shutterPuzzle').classList.add('open');
  render();
  cancelAnimationFrame(raf);
  lastTs = performance.now();
  raf = requestAnimationFrame(tick);
}

export function initShutterPuzzle() {
  const disc = $('#shutterDisc');
  disc.addEventListener('pointerdown', onDown);
  disc.addEventListener('pointermove', onMove);
  disc.addEventListener('pointerup', onUp);
  disc.addEventListener('pointercancel', onUp);

  $('#shutterBack').addEventListener('click', close);
}
