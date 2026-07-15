// ============================================================
// INVENTARIO / ZAINO
// Database degli oggetti, aggiunta, griglia visuale, dettaglio.
// Per aggiungere un nuovo oggetto: aggiungi una voce a ITEM_DB
// e chiama addItem('id') quando viene raccolto.
// ============================================================

import { S, writeSave } from './state.js';
import { $, speak, SG } from './engine.js';

// L'icona può essere un'emoji (stringa breve) oppure un percorso immagine
// (inizia con '/'), nel qual caso viene renderizzata come sprite <img>.
export const ITEM_DB = {
  cellulare: {
    icon: '📱',
    name: 'Cellulare',
    desc: 'Niente da fare, il telefono è fisso alle 3:00.',
  },
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
  d4: {
    icon: '/assets/images/dado.png',
    name: 'Dado di resina — D4',
    desc: "Il primo dado. Le piccole imperfezioni non sono difetti: sono la firma di un pezzo fatto a mano.",
  },
  // ---- MONDO 2 · Casa Familiare ----
  'frammento-sinistro': {
    icon: '/assets/images/casaFamiliare/frammento-cuore-sinistro.png',
    name: 'Frammento di cuore',
    desc: 'Metà di un piccolo cuore. Il taglio è netto, come se qualcuno l’avesse spezzato di proposito.',
  },
  'frammento-destro': {
    icon: '/assets/images/casaFamiliare/frammento-cuore-destro.png',
    name: 'Frammento di cuore',
    desc: 'L’altra metà del cuore. Da sole non sono niente; forse insieme sì.',
  },
  'chiavi-auto': {
    icon: '/assets/images/chiavi-auto.png',
    name: "Chiavi dell'auto",
    desc: "Le chiavi dell'auto. «Ti serviranno per uscire», ha detto LUI, senza guardarla.",
  },
  usb: {
    icon: '\u{1F4BE}',
    name: 'Chiavetta USB',
    desc: "Gliel'ha lasciata LUI. Custodiva quei frammenti, dice. Forse qui dentro c'è quello che non è mai riuscito a rimettere insieme.",
  },
  'chiavi-lavanderia': {
    icon: '/assets/images/chiave-lavanderia.png',
    name: 'Chiavi della lavanderia',
    desc: "Erano nell'auto, chissà perché. Aprono la porta della lavanderia, nel cortile della nonna.",
  },
  d6: {
    icon: '/assets/images/dado-d6.png',
    name: 'Dado di resina — D6',
    desc: "Sei facce. Al posto del sei, un piccolo cuore. Lo stava creando LUI, un pezzo alla volta.",
  },
  // ---- FINALE · set completato nella lavanderia ----
  d8: {
    icon: '\u{1F3B2}',
    name: 'Dado di resina — D8',
    desc: 'Otto facce. Il primo che ha finito con le sue mani, fino in fondo.',
  },
  d10: {
    icon: '\u{1F3B2}',
    name: 'Dado di resina — D10',
    desc: 'Dieci facce. Non è perfetto. Non deve esserlo.',
  },
  d12: {
    icon: '\u{1F3B2}',
    name: 'Dado di resina — D12',
    desc: 'Dodici facce. Le imperfezioni, ormai, le chiama firma.',
  },
  d100: {
    icon: '\u{1F3B2}',
    name: 'Dado di resina — D%',
    desc: 'Il percentile. Piccolo, ostinato, come chi l’ha fatto.',
  },
  d20: {
    icon: '\u{1F3B2}',
    name: 'Dado di resina — D20',
    desc: 'Venti facce. Il set è completo. Lo ha completato lei.',
  },
};

// Rende un'icona (emoji o sprite immagine) dentro un elemento contenitore.
function setIcon(el, icon) {
  if (typeof icon === 'string' && icon.startsWith('/')) {
    el.textContent = '';
    el.classList.add('img');
    el.style.backgroundImage = `url("${icon}")`;
  } else {
    el.classList.remove('img');
    el.style.backgroundImage = '';
    el.textContent = icon;
  }
}

export function addItem(id) {
  if (!ITEM_DB[id] || S.inventory.includes(id)) return;
  S.inventory.push(id);
  refreshBackpackBadge();
  writeSave();
}

// Mostra un'icona (sprite o emoji) in primo piano insieme a una riga SG,
// che il giocatore chiude come un normale dialogo.
function showPickup(icon, sgText, cb) {
  const el = $('#acquireImg');
  if (el) setIcon(el, icon);
  if (el) el.classList.add('show');
  speak([SG(sgText)], () => {
    if (el) el.classList.remove('show');
    if (cb) cb();
  });
}

// Raccogli un oggetto: lo aggiunge (idempotente) e lo presenta in primo
// piano con la sua riga SG. `sgText` di default: "Hai ottenuto: <nome>".
export function acquire(id, sgText, cb) {
  addItem(id);
  const def = ITEM_DB[id];
  showPickup(def ? def.icon : '\u{1F3B2}', sgText || (def ? `Hai ottenuto: ${def.name}` : ''), cb);
}

// Banner unico (senza aggiungere nulla): per presentazioni cumulative come
// il set completo di dadi del finale.
export function pickupBanner(icon, sgText, cb) {
  showPickup(icon, sgText, cb);
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
    setIcon(btn, def.icon);
    btn.title = def.name;
    btn.addEventListener('click', () => showItemDetail(id));
    grid.appendChild(btn);
  });
}

function showItemDetail(id) {
  const def = ITEM_DB[id];
  if (!def) return;
  setIcon($('#invDetailIcon'), def.icon);
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
