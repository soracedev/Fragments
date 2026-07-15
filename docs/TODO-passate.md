# TODO — Diario delle Passate

> Diario **operativo** di lavoro, per non perdere il filo tra una sessione e
> l'altra. Registra cosa è stato fatto, cosa è in corso, cosa resta, con le
> specifiche decise insieme. Complementare a `ProgettoCompleto.md` (la bibbia
> di design ad alto livello) e agli `storyboard *.md` (lo script narrativo):
> qui sta il "come procediamo", lì sta il "cosa raccontiamo".
>
> Ultimo aggiornamento: 15 luglio 2026 (Passata 6 — fix + feedback oggetti)

---

## Legenda

- ✅ Fatto e verificato
- 🔄 In corso / parziale
- 🔲 Da fare
- 📝 Decisione presa (specifica sotto)

---

## Passata 2 — Mondo 2 scheletro ✅

Bridge Fuori-Casa (Auto + Cancello a doppio stadio) + scene interne
(Soggiorno, Camera, Giardino, Cortile) con la catena completa e i due
minigiochi come **stub** auto-risolvibili. Verificata end-to-end col probe.

Vedi lo storyboard `storyboard mondo2.md` per la struttura narrativa.

---

## Passata 3 — Minigiochi Mondo 2 + wiring lavanderia

**Ambito deciso**: solo codice. Niente modifiche ai testi, niente
Stanza dei Dadi/finale. La lavanderia si cabla ma il suo *interno* resta
vuoto per ora.

### Fatto ✅

- **Minigioco 1 — Ricomporre il cuore** (`src/puzzles/heart.js`) 📝
  - **2 metà** (non 6 celle): `frammento-cuore-sinistro/destro.png`.
    Storyboard §4 aggiornato di conseguenza.
  - Sagoma-guida fantasma al centro; **2 trascinamenti** (pointer events,
    touch+mouse); snap a destinazione; **nessun fallimento** (se lasci una
    metà lontana, resta e puoi riprovare).
  - Completato → pulsante **"Trasferisci su USB"** → flag `usbLoaded`.
  - Aperto dall'hotspot **PC** (spostato in `casaf-soggiorno` nella Passata 4).
- **Minigioco 2 — Stampa del D6** (`src/puzzles/print.js`) 📝
  ⚠️ _Meccanica RISCRITTA nella Passata 4 (vedi sotto): quella descritta qui
  (gauge deriva + reveal `dado-rete`) è superata._
  - Aperto dall'hotspot **Stampante** (gate `usbLoaded`).
- **Lavanderia — solo navigazione + gating** 📝
  - `cortile-nonna` (post-`mondo2Done`) → hotspot verso `lavanderia-closeup`
    (`casa/closup-lavanderia.jpeg`).
  - `enter-lavanderia`: senza `chiavi-lavanderia` → *"Mi servono le chiavi
    per entrare."*; con le chiavi → scena `interno-lavanderia`
    (`casa/interno-lavanderia.jpeg`).
  - Corretti i path del cortile e nuove scene (erano `casaFamiliare/*.png`,
    gli asset reali sono in `casa/*.jpeg`).
  - Rimosso il segnaposto di sviluppo dal cancello.
- **Verifica** (hook di debug + probe) 📝
  - `window.__solveHeart()` / `window.__solvePrint()` completano i minigiochi
    e attivano i flag/oggetti reali.
  - `scripts/probe-mondo2.mjs` esteso: usa gli hook e verifica il gating
    lavanderia (senza chiavi bloccata, con chiavi entra).
  - **Feel di drag e gauge da provare manualmente** (`npm run dev`).

### Da fare 🔲 (raccolte qui per non perderle)

- **Testi [BOZZA]** — li riscrive **Luca** dopo aver provato Mondo 2:
  - LUI S1 (prima interazione dal divano) — `mondo2.js`
  - LUI S2 (consegna chiavi auto, apre il giardino) — `mondo2.js`
  - 2 righe d'arrivo al Soggiorno (`casafArrival`) — `mondo2.js`
  - _(S3, bigliettini, LEI, Auto/Cancello sono già verbatim dallo storyboard)_
- **Interno lavanderia**: contenuto ancora da progettare. Asset presente ma
  non usato: `casa/closup-compressore.jpeg`. Il compressore/pressure pot
  richiama la lavorazione dei dadi in resina → possibile aggancio alla
  **Stanza dei Dadi** (vedi sotto), da decidere.
- **Posizioni/scala delle metà del cuore**: valori `TARGET`/`TRAY` in
  `heart.js` scelti a occhio — da rifinire visivamente sull'arte finale.

### Rimandato a passate future 🔲

- **Stanza dei Dadi / finale** (`ProgettoCompleto.md` §2): creazione dei 5
  dadi rimanenti (D8, D10, D12, D%, D20), resa di Figura 1, risveglio di Nox.
  Da chiarire se passa dalla lavanderia (compressore) o è una stanza a sé.
- **Mondo 1**: scena N4 vecchio negozio + resa finale della figura (da
  `ProgettoCompleto.md` §6).
- **Rifacimento inventario**: icona-zaino unica al posto degli slot dadi.
- **Asset**: sprite protagonista, audio ambientale.
- **Build APK** via Capacitor.

---

## Passata 4 — Fix + rifiniture (Fase 1) ✅

Round di correzioni prima di estendere il gioco. Diviso in 2 fasi: **Fase 1
= questi fix** (fatta); **Fase 2 = finale** dallo `storyboard finale.md`
(prossima passata).

### Fatto ✅

**Prologo / Mondo 1**
- Lo **shock delle 3:00** è ora nel primo dialogo automatico del risveglio.
  Il click sul **telefono** dice solo *"Né campo né WiFi"* + nudge nonna.
- **Cellulare** nell'inventario da inizio partita (`addItem('cellulare')` in
  `startPrologue`), nota *"…fisso alle 3:00"* → indizio per l'orologio.
- **Quadro** (soggiorno Mondo 1): l'osservazione è **fuori campo** (SG), non Nox.
- Nota di Casa (`bigliettino-casa`) mostrata col **closeup** `bigliettino.png`
  (testo ancora segnaposto).
- Riposizionati gli hotspot piazza: `to-nettuno` in alto a sx, `figura` sulla
  panchina a dx, `ingranaggio` vicino all'ingranaggio nella fontana.

**Mondo 2 / Casa**
- **Auto** e **Cancello** (Fuori Casa) ora hanno **label** e aprono scene
  closeup dedicate (`closeup-auto`, `closeup-cancello`) con l'oggetto
  cliccabile: `auto-take` (chiavi lavanderia post-Mondo2), `cancello-enter`
  (Mondo 2 / Cortile).
- Note LEI/LUI (soggiorno/camera) mostrate col **closeup** `bigliettino.png`.
- Hotspot **Giardino** visibile solo con `chiavi-auto` (rimosso "Senti un
  rumore"); refresh in `casaf-soggiorno`.
- Camera → sfondo `camera-da-letto.png`; **Stampante** spostata sulla stampante
  3D; **PC spostato in Soggiorno** (gate: entrambi i frammenti + USB).
- Invertiti i nav Camera/Giardino nel soggiorno.
- **Frammenti nell'inventario**: `frammento-sinistro` (Camera) /
  `frammento-destro` (Giardino), con sprite.
- Cortile: lavanderia più in alto + hotspot `porta-nonna`
  (*"Non sembra esserci nessuno in casa."*).

**Minigiochi / Inventario**
- **Heart puzzle**: metà più distanziate (`TARGET`/`TRAY`), pezzi più piccoli.
- **Stampa RISCRITTA** (`print.js`): niente più `dado-rete`. Ora è un
  minigioco a **6 fasi** — indicatore che oscilla, **tap quando è nella zona
  verde** = +1 fase, tap fuori = **−1 fase**; la zona verde si sposta e si
  restringe (0.30→~0.16). Il `dado-d6.png` **compare a scatti** (opacità =
  fase/6). A 6 fasi → oggetto `d6`. Niente più auto-completamento.
- **Inventario con sprite reali** (icona = percorso immagine): `d4`
  (`dado.png`), `d6` (`dado-d6.png`), `chiavi-auto`, `chiavi-lavanderia`
  (`chiave-lavanderia.png`), i 2 frammenti. Il resto resta emoji.

### Verifica
- `probe-mondo2.mjs` aggiornato: auto/cancello via closeup, giardino
  nascosto→visibile, PC in soggiorno, frammenti-item, porta-nonna. Verde +
  regressione Mondo 1.
- **Feel di drag/stampa da provare a mano** (`npm run dev`).

### Fase 2 — vedi Passata 5 (fatta) ✅

---

## Passata 5 — Finale (Fase 2) ✅

Implementato il finale da `docs/storyboard finale.md`. Vincolo guida:
`ProgettoCompleto.md` §8.7 — **l'ultimo enigma è il più semplice** → i due
minigiochi del finale sono volutamente "quasi simbolici" (nessun fallimento
reale, molto forgiving).

### Fatto ✅

- **Interno Lavanderia** (`mondo2.js`): entrando parte il **dialogo LEI** (§3
  verbatim) → sblocca gli hotspot **Tavolino** e **Compressore** (Compressore
  bloccato finché il Tavolino non è completo). Flag `leiLavIntro`.
- **Minigioco 1 — Tavolino** (`src/puzzles/tavolino.js`) 📝: 2 slider
  (componenti A/B) da portare in una **zona verde larga** (nessun rapporto
  preciso) + **contagocce** (~3 gocce, lo stampo si tinge) → "Cola nello
  stampo" → `tavoloDone`. Sfondo `interno-lavanderia.jpeg`.
- **Minigioco 2 — Compressore** (`src/puzzles/compressore.js`) 📝: riuso del
  meccanismo tap-nel-verde della stampa, **facile: 3 fasi, verde largo**,
  barra di pressione. Sfondo `closup-compressore.jpeg`. A pressione piena →
  set **D8/D10/D12/D%/D20** (5 item, icona 🎲) → parte il finale.
- **Dialogo finale** (§6 verbatim) → abbraccio → **dissolvenza al nero**
  (`fadeBlack` in engine) → **risveglio** in camera (hub, **warm-3**) →
  **riflessione di Nox** ([SEGNAPOSTO]) → **crediti** (`#credits`, dedica
  [SEGNAPOSTO], "Torna al titolo" = reload). Flag `gameDone`.
- `state.js`: flag `leiLavIntro`, `tavoloDone`, `compressoreDone`, `gameDone`.
  `engine.js`: `fadeBlack` + stili `warm-2`/`warm-3` (prima mancavano).

### Verifica
- `scripts/probe-finale.mjs` (17/17): cortile → lavanderia → LEI → tavolino →
  compressore bloccato/poi ok → set dadi → dialogo finale → risveglio warm-3 →
  crediti. Hook: `__solveTavolino`, `__solveCompressore`. Regressione Mondo 2
  (35/35) e Mondo 1 (9/9) verdi.
- **Feel di slider/pressione da provare a mano.**

### [SEGNAPOSTO] per Luca
- **Riflessione di Nox al risveglio** (`REFLECTION` in `mondo2.js`).
- **Dedica dei crediti** (`#creditsDedica` in `index.html`).
- Eventuale revisione della riga di sintesi *"Ed è anche grazie a te, se ci
  sto arrivando"* (storyboard finale §9).

---

## Convenzioni tecniche utili

- Ogni puzzle = overlay `.puzzle#xxxPuzzle` in `index.html` con `.zoombg` +
  `.scrim` + `.pcard`; modulo `src/puzzles/xxx.js` con `openXxx()` +
  `initXxx()` (init chiamato una volta da `main.js`).
- Ogni hotspot di navigazione ha bisogno di una entry in `ACTIONS`
  (mondo2.js); `data-goto` serve solo all'etichetta (`SCENE_NAMES` in
  `engine.js`).
- Asset Mondo 2: minigiochi/personaggi in `images/casaFamiliare/*.png`;
  esterni/lavanderia/cortile in `images/casa/*.jpeg`. **Attenzione a far
  combaciare estensione e cartella col path nel codice.**
- Verifica: `npm run build` → `npm run preview` → `node scripts/probe-mondo2.mjs`
  (regressione Mondo 1: `scripts/probe.mjs`).
