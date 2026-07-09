// ============================================================
// INVENTARIO / ZAINO
// Database degli oggetti, aggiunta, griglia visuale, dettaglio.
// Per aggiungere un nuovo oggetto: aggiungi una voce a ITEM_DB
// e chiama addItem('id') quando viene raccolto.
// ============================================================

import { S, writeSave } from './state.js';
import { $ } from './engine.js';

export const ITEM_DB = {
  ingranaggio: {
    icon: '⚙️',
    name: 'Ingranaggio arrugginito',
    desc: "Ripescato dalla fontana del Dio Nettuno. Denti consumati, ruggine ovunque, eppure gira ancora. Sembra fatto apposta per un meccanismo rimasto scoperto da qualche parte.",
  },
  lancetta: {
    icon: '\u{1F550}',
    name: 'Lancetta delle ore',
    desc: "Una piccola lancetta di ferro battuto, trovata sotto la saracinesca del vicolo. È quella corta: quella che segna le ore, non i minuti.",
  },
  chiave: {
    icon: '\u{1F511}',
    name: 'Chiave',
    desc: "Caduta da dietro il quadrante nel momento esatto in cui l'orologio è ripartito. Qualcuno l'aveva lasciata lì perché qualcuno, prima o poi, lo aggiustasse.",
  },
  dado1: {
    icon: '\u{1F3B2}',
    name: 'Dado di resina — I',
    desc: "Il primo dado. Le piccole imperfezioni non sono difetti: sono la firma di un pezzo fatto a mano.",
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
