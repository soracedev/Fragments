// ============================================================
// CLOSEUP — vista ravvicinata di un oggetto da guardare, non da
// risolvere. Nessuna logica di gioco: mostra un'immagine e, se
// serve, un testo sovrapposto. Chiudendola si torna alla scena.
//
// Uso:  openCloseup({ image: '/assets/images/bigliettino.png',
//                     text: 'La frase scritta sul foglio.' }, onClose)
// ============================================================

import { $ } from './engine.js';

let onCloseCb = null;

export function openCloseup({ image, text = '' }, onClose) {
  onCloseCb = onClose || null;
  const img = $('#cuImage');
  img.style.backgroundImage = image ? `url("${image}")` : 'none';
  $('#cuText').textContent = text;
  $('#closeup').classList.add('open');
}

function closeCloseup() {
  $('#closeup').classList.remove('open');
  const cb = onCloseCb;
  onCloseCb = null;
  if (cb) cb();
}

export function initCloseup() {
  const btn = $('#cuClose');
  if (btn) btn.addEventListener('click', closeCloseup);
}
