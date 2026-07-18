// ============================================================
// ENIGMA CASSAFORTE — tastierino a 6 cifre dietro il quadro.
//
// Il codice (210525) NON è dato qui: si scopre allo specchio del
// bagno. Nessun blocco duro (stile Another Code): il tastierino
// accetta il codice in qualunque momento — la dipendenza è di
// conoscenza, non un lucchetto meccanico. Risolto: DADO + nota.
// ============================================================

import { S, writeSave } from '../state.js';
import { $, speak, P, SG } from '../engine.js';
import { addItem, acquire } from '../inventory.js';

const CODE = '210525';

let entry = '';
let solved = false;

function setFb(text, ok = false) {
  const fb = $('#safeFb');
  fb.textContent = text || '…';
  fb.classList.toggle('ok', ok);
}

function render() {
  // Sei caselle: cifre inserite + trattini per le mancanti.
  $('#safeDisplay').textContent = (entry + '––––––').slice(0, 6);
}

function press(key) {
  if (solved) return;
  if (key === 'C') { entry = ''; setFb(''); render(); return; }
  if (key === '⌫') { entry = entry.slice(0, -1); setFb(''); render(); return; }
  if (entry.length >= 6) return;
  entry += key;
  render();
  if (entry.length === 6) check();
}

function check() {
  if (entry === CODE) return onSolved();
  setFb('Non è questo.');
  setTimeout(() => { if (!solved) { entry = ''; render(); } }, 700);
}

function onSolved() {
  solved = true;
  setFb('Uno scatto. La serratura cede.', true);
  setTimeout(() => {
    $('#safePuzzle').classList.remove('open');
    S.has.dado = true;
    addItem('d4');
    writeSave();
    speak([
      SG('La cassaforte si apre. Dentro, un dado di resina e un biglietto piegato.'),
      P('Un D4. Quattro facce. Chi lo teneva chiuso qui dentro?'),
      SG('Sul biglietto, piegato sotto il dado, una grafia stretta:'),
      SG('«L’ho fatto io. Non benissimo, ma l’ho fatto io. Lo chiudo qui perché se resta fuori, prima o poi qualcuno mi spiega cos’ho sbagliato. Comunque non è niente de che.»'),
    ], () => {
      acquire('d4', 'Prendi il dado di resina — D4.', () => {
        if (typeof window.__refreshHotspots === 'function') window.__refreshHotspots();
      });
    });
  }, 900);
}

export function openSafe() {
  entry = '';
  solved = false;
  setFb('');
  render();
  $('#safePuzzle').classList.add('open');
}

export function initSafePuzzle() {
  const keys = $('#safeKeys');
  if (keys) {
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].forEach((k) => {
      const b = document.createElement('button');
      b.textContent = k;
      b.dataset.key = k;
      keys.appendChild(b);
    });
    keys.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b) press(b.dataset.key);
    });
  }
  const back = $('#safeBack');
  if (back) back.addEventListener('click', () => $('#safePuzzle').classList.remove('open'));
}
