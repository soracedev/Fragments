// ============================================================
// INVENTARIO / ZAINO
// Database degli oggetti, aggiunta, griglia visuale, dettaglio.
// Per aggiungere un nuovo oggetto: aggiungi una voce a ITEM_DB
// e chiama addItem('id') quando viene raccolto.
// ============================================================

import { S, writeSave } from './state.js';
import { $ } from './engine.js';

export const ITEM_DB = {
  lancetta: {
    icon: '\u{1F550}',
    name: "Lancetta d'orologio",
    desc: "Una piccola lancetta di ferro battuto, trovata incastrata dietro la saracinesca del vicolo. È servita a rimettere in moto l'orologio di Nettuno.",
  },
  dado1: {
    icon: '\u{1F3B2}',
    name: 'Dado di resina \u2014 I',
    desc: "Il primo dado, trovato incastonato nel meccanismo dell'orologio riparato. Non è un difetto: le piccole imperfezioni sono la firma di un pezzo fatto a mano.",
  },
  // ---- MONDO 2 e 3: aggiungi qui ----
};

export function addItem(id) {
  if (!ITEM_DB[id] || S.inventory.includes(id)) return;
  S.inventory.push(id);
  refreshBackpackBadge();
  writeSave();
}

export function refreshBackpackBadge() {
  const b = $('#backpackBadge');
  if (!b) return;
  const n = (S.inventory || []).length;
  b.textContent = n;
  b.classList.toggle('show', n > 0);
}

function renderInventoryGrid() {
  const grid = $('#invGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const items = S.inventory || [];
  const empty = $('#invEmpty');
  if (empty) empty.style.display = items.length ? 'none' : 'block';
  items.forEach(id => {
    const def = ITEM_DB[id];
    if (!def) return;
    const btn = document.createElement('button');
    btn.className = 'invItem';
    btn.textContent = def.icon;
    btn.title = def.name;
    btn.addEventListener('click', () => showItemDetail(id));
    grid.appendChild(btn);
  });
}

function showItemDetail(id) {
  const def = ITEM_DB[id];
  if (!def) return;
  $('#invDetailIcon').textContent = def.icon;
  $('#invDetailName').textContent = def.name;
  $('#invDetailDesc').textContent = def.desc;
  $('#invListView').style.display = 'none';
  $('#invDetail').classList.add('show');
}

function backToInvList() {
  $('#invDetail').classList.remove('show');
  $('#invListView').style.display = 'block';
}

export function initInventoryUI() {
  const btn = $('#backpackBtn');
  if (btn) btn.addEventListener('click', () => {
    renderInventoryGrid();
    backToInvList();
    $('#inventory').classList.add('open');
  });

  const close = $('#invClose');
  if (close) close.addEventListener('click', () => $('#inventory').classList.remove('open'));

  const back = $('#invBack');
  if (back) back.addEventListener('click', backToInvList);
}
