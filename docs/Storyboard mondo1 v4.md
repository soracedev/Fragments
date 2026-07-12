# Storyboard — Mondo 1: Nettuno (revisione 4)

### "Fragments" — protagonista: Nox

> Questa versione **estende la v3**: aggiunge la sezione Casa completa
> (Soggiorno + Bagno, con l'enigma dello specchio appannato collegato alla
> cassaforte), il sistema a stati della Piazza (`piazza` → `piazza-2` →
> `piazza-3`), la rivelazione `spiaggia-2`, e la nuova organizzazione delle
> cartelle asset. Tutto il resto (Prologo, dialogo N1, Vicolo, Piazza del
> Dio Nettuno, dialogo base Spiaggia) resta valido dalla v3 e non viene
> ripetuto qui salvo dove cambia qualcosa.

---

## 0 · Mappa aggiornata — stati della Piazza dell'Orologio

La Piazza non è più un'unica immagine statica: cambia sfondo (e comportamento
degli hotspot) in tre momenti precisi della storia.

| Stato                     | File sfondo    | Quando                                         | Cosa cambia                                                                                                                   |
| ------------------------- | -------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **A — arrivo**            | `piazza.jpg`   | Dall'inizio, orologio non riparato             | Figura sulla panchina, orologio fermo, nessun accesso alla porta                                                              |
| **B — orologio riparato** | `piazza-2.jpg` | Subito dopo aver risolto il minigioco orologio | La chiave cade, la finestra è accesa nell'immagine stessa (non più solo testo), si sblocca l'hotspot **porta → Appartamento** |
| **C — dado recuperato**   | `piazza-3.jpg` | Dopo aver preso il dado D4 in Casa             | La figura non è più sulla panchina; l'hotspot in quel punto mostra solo una riga di flavor text                               |

**Stato C — testo dell'hotspot dove prima sedeva la figura:**

> **NOX**
> Alla fine si è mossa. Chissà dove è finita.

_(Nessuno scambio di battute, solo questa riga — coerente con l'idea che la
figura non è più fisicamente lì: l'abbiamo già vista spostarsi altrove, e la
ritroveremo in `spiaggia-2`.)_

---

## 1 · La sequenza completa, aggiornata

```
N1 Piazza [stato A] → dialogo automatico con la figura
 │
 ├──→ N2 Vicolo (con ingranaggio da N3) → minigioco rotazione → LANCETTA
 │
 └──→ N3 Piazza del Dio Nettuno → INGRANAGGIO + BIGLIETTINO (statua)
        └──→ N4 Spiaggia [base] → solo flavor text (dado non ancora ottenuto)

N1 [con LANCETTA] → minigioco orologio → risolto
  → Piazza passa a [stato B] = piazza-2.jpg
  → CHIAVE ottenuta, dialogo, hotspot PORTA (label "Appartamento") sbloccato
  ↓
CASA — Soggiorno (raggiunta dalla porta in piazza-2, richiede CHIAVE)
  hotspot 1: Quadro → rivela cassaforte a muro (scena "wallsafe")
             → richiede il codice trovato nel Bagno
             → risolta: DADO D4 + una nota (testo da scrivere)
  hotspot 2: Bigliettino → mostra testo in primo piano (da scrivere)
  hotspot 3: → Casa - Bagno
  ↓
CASA — Bagno
  hotspot 1: Lavandino/specchio → "closeup-specchio"
             → minigioco vapore (rubinetto acqua calda, attesa)
             → risolto: "closeup-specchio-numero" (il codice appare appannato)
             → indietro → "casa-bagno-2" (stato permanente dopo la soluzione)
  hotspot 2: → torna al Soggiorno

Con DADO D4 in inventario:
  Piazza passa a [stato C] = piazza-3.jpg (figura non più sulla panchina)
  N4 Spiaggia passa a "spiaggia-2.jpg" → hotspot figura visibile e attivo
    → dialogo finale, la figura regala il dado (vedi v3 per il testo completo)
```

---

## CASA — Soggiorno

_(Raggiunta interagendo con la porta in `piazza-2`, solo se si possiede la
CHIAVE. L'hotspot della porta in piazza mostra l'etichetta **"Appartamento"**
sopra l'icona, coerente con lo stile delle altre label già in uso — es.
"La porta", "Il vicolo" — nel motore di dialogo/hotspot.)_

**Tre hotspot in questa scena:**

### 1 · Quadro appeso al muro

> **NOX** _(dopo aver toccato il quadro)_
> _Noti un piccolo spessore fra il muro e il quadro._

> **NOX**
> Sembra esserci qualcosa qui dietro.

_(Sposta il quadro — transizione di immagine a `wallsafe`: cassaforte a muro
con tastierino numerico.)_

**Puzzle — Cassaforte a combinazione**

- Il giocatore inserisce un codice a 6 cifre: **210525**
- Il codice **non è dato al giocatore qui** — va scoperto nel Bagno
  (vedi minigioco specchio più sotto). Questo crea la dipendenza
  cross-hotspot tipica di Another Code: osservi un dettaglio in una stanza,
  lo usi in un'altra.
- Risolto: si apre la cassaforte, dentro ci sono il **DADO D4** e una nota.

> _(testo della nota — da scrivere)_

_(Nota: la sigla "D4" per il primo dado della Casa è curiosa se letta come
riferimento ai dadi poliedrici — un D4 è il dado a 4 facce nel set
D&D. Se è un riferimento intenzionale ai dadi di resina veri, potrebbe
valere la pena mantenere la stessa logica per i dadi degli altri mondi
(D6, D8...) come piccolo easter egg per lei. Se invece "D4" era solo una
sigla di comodo per te in fase di scrittura, nessun problema — chiarisci
tu quale dei due casi è.)_

### 2 · Bigliettino

_(Stessa meccanica del bigliettino già presente sul bordo della fontana in
Piazza del Dio Nettuno — v. v3: al click, mostra in primo piano l'immagine
del foglietto con un testo.)_

> _(testo del bigliettino — da scrivere)_

### 3 · Passaggio al Bagno

Hotspot di transizione → scena **Casa - Bagno**.

---

## CASA — Bagno

**Due hotspot in questa scena:**

### 1 · Lavandino / specchio

_(Transizione a closeup: `closeup-specchio`.)_

**Puzzle — Specchio appannato**

- Un solo hotspot cliccabile: il **rubinetto**
- Cliccandolo, l'acqua calda si apre e il vapore inizia ad accumularsi
  (rappresentabile con un'animazione/progressione visiva del livello di
  vapore)
- Il giocatore deve **attendere** che il vapore raggiunga il massimo
  (meccanica di attesa passiva, diversa dagli altri enigmi che richiedono
  interazione continua — dà ritmo variato alla sequenza dei puzzle)
- Al completamento: cambio immagine a `closeup-specchio-numero` — il
  numero appare "scritto" nella condensa. **L'immagine del numero è già
  pronta in partenza** (va solo mostrata al momento giusto, non generata
  dinamicamente) — il numero visibile qui è il codice della cassaforte,
  **210525**
- Hotspot "indietro" → torna a `casa-bagno-2`

_(`casa-bagno-2` è lo stato permanente della stanza dopo aver risolto
l'enigma — ogni volta che si rientra nel bagno da questo punto in poi,
si mostra questa variante, non più `casa-bagno` originale. Utile
segnalarlo perché è un dettaglio facile da dimenticare in fase di
implementazione: la scena "di base" del bagno cambia in modo permanente.)_

### 2 · Passaggio al Soggiorno

Hotspot di transizione → torna a **Casa - Soggiorno**.

---

## N4 · Spiaggia degli Scogli — stato aggiornato

Come da v3, ma ora formalizzato con il cambio immagine:

- **Prima del dado**: sfondo `spiaggia.jpg`, solo il flavor text sul cielo,
  nessuna figura visibile/interagibile
- **Dopo aver ottenuto il DADO D4 dalla Casa**: sfondo cambia a
  `spiaggia-2.jpg` — la figura è ora visibile nell'immagine stessa (non
  solo un hotspot invisibile su uno sfondo invariato) e l'hotspot per
  parlarle è attivo. Da qui parte il dialogo finale già scritto in v3
  (Nox mostra il dado, la figura lo riconosce come suo, glielo regala).

---

## Oggetti — tabella aggiornata

| Oggetto                      | Ottenuto in                                      | Usato in                                  |
| ---------------------------- | ------------------------------------------------ | ----------------------------------------- |
| Ingranaggio                  | N3, statua/fontana                               | N2, sblocca minigioco saracinesca         |
| Lancetta (delle ore)         | N2, minigioco saracinesca                        | N1, minigioco orologio                    |
| Chiave                       | N1, cade dall'orologio riparato (stato piazza-2) | Porta "Appartamento" → Casa               |
| Codice cassaforte (210525)   | Casa-Bagno, enigma specchio appannato            | Casa-Soggiorno, cassaforte a muro         |
| **Dado D4**                  | Casa-Soggiorno, dentro la cassaforte             | N4, dialogo finale (spiaggia-2)           |
| Bigliettino (Piazza Nettuno) | N3, fontana                                      | Solo testo/immagine, nessun uso meccanico |
| Bigliettino (Casa)           | Casa-Soggiorno                                   | Solo testo/immagine, nessun uso meccanico |

---

## Asset — mappa immagini aggiornata (per Claude Code)

> **Riorganizzazione cartelle**: gli asset del Mondo 1 vanno ora in una
> sottocartella dedicata `public/assets/CittaFerma/`, invece che nella
> cartella piatta `public/assets/images/`. Fanno eccezione `camera.jpg`
> (la stanza, che è hub/prologo, non Mondo 1) e il **bigliettino della
> Piazza Nettuno**, che restano in `public/assets/images/`.
>
> ⚠️ **Da chiarire**: il bigliettino della Casa segue la stessa regola
> (resta in `images/`) o va dentro `CittaFerma/` insieme al resto degli
> asset della Casa? Non è specificato — segnalo per non assumere in modo
> silenzioso, essendo un dettaglio che cambia il percorso nel codice.

### `public/assets/images/` (invariata / condivisa)

| Elemento                     | File              | Stato          |
| ---------------------------- | ----------------- | -------------- |
| Camera da letto              | `camera.jpg`      | ✅ esiste      |
| Title screen                 | `title-bg.jpg`    | ✅ esiste      |
| Bigliettino (Piazza Nettuno) | `bigliettino.jpg` | 🔲 da generare |

### `public/assets/CittaFerma/` (nuova cartella — Mondo 1)

| Scena/Elemento                         | File                                        | Tipo           | Stato                                                                        |
| -------------------------------------- | ------------------------------------------- | -------------- | ---------------------------------------------------------------------------- |
| Piazza — stato A (arrivo)              | `piazza.jpg`                                | sfondo         | ✅ esiste _(da spostare qui dentro)_                                         |
| Piazza — stato B (finestra accesa)     | `piazza-2.jpg`                              | sfondo         | 🔲 da generare                                                               |
| Piazza — stato C (figura assente)      | `piazza-3.jpg`                              | sfondo         | 🔲 da generare                                                               |
| Vicolo                                 | `vicolo.jpg`                                | sfondo         | ✅ esiste _(da spostare)_                                                    |
| Orologio — quadrante (senza lancette)  | `orologio-quadrante.jpg`                    | sfondo/closeup | 🔲 da rifare                                                                 |
| Lancetta ore (sprite isolato)          | `orologio-lancetta-ore.png`                 | sprite         | 🔲 da generare                                                               |
| Lancetta minuti (sprite isolato)       | `orologio-lancetta-minuti.png`              | sprite         | 🔲 da generare                                                               |
| Saracinesca — meccanismo               | `saracinesca-meccanismo.jpg`                | sfondo/closeup | 🔲 da rifare                                                                 |
| Disco rotante (sprite)                 | `saracinesca-disco.png`                     | sprite         | 🔲 da generare                                                               |
| Piazza del Dio Nettuno                 | `piazza-nettuno.jpg`                        | sfondo         | 🔲 da generare                                                               |
| Fontana — closeup (opzionale)          | `fontana-nettuno.jpg`                       | closeup        | 🔲 opzionale                                                                 |
| Ingranaggio (icona/sprite)             | `ingranaggio.png`                           | sprite/icona   | 🔲 da generare                                                               |
| Spiaggia — base                        | `spiaggia.jpg`                              | sfondo         | 🔲 da generare                                                               |
| Spiaggia — con figura                  | `spiaggia-2.jpg`                            | sfondo         | 🔲 da generare                                                               |
| Casa — Soggiorno                       | `casa-soggiorno.jpg`                        | sfondo         | 🔲 da generare                                                               |
| Cassaforte a muro                      | `wallsafe.jpg`                              | closeup        | 🔲 da generare                                                               |
| Casa — Bagno (iniziale)                | `casa-bagno.jpg`                            | sfondo         | 🔲 da generare                                                               |
| Casa — Bagno (dopo enigma, permanente) | `casa-bagno-2.jpg`                          | sfondo         | 🔲 da generare                                                               |
| Specchio — closeup                     | `closeup-specchio.jpg`                      | closeup        | 🔲 da generare                                                               |
| Specchio — con numero appannato        | `closeup-specchio-numero.jpg`               | closeup        | 🔲 da generare, **il numero 210525 deve essere già disegnato nell'immagine** |
| Chiave (sprite/icona)                  | `chiave.png`                                | sprite/icona   | 🔲 da generare                                                               |
| Dado D4 (icona zaino)                  | `dado-d4.png`                               | icona          | 🔲 da generare                                                               |
| Bigliettino Casa                       | `bigliettino-casa.jpg` _(nome provvisorio)_ | closeup        | 🔲 da generare — path da confermare, vedi nota sopra                         |

---

## Note aperte (v4)

- **Testo della nota nella cassaforte**: da scrivere.
- **Testo del bigliettino in Casa**: da scrivere.
- **"D4" come sigla del dado**: chiarire se è un riferimento intenzionale ai
  dadi poliedrici (per un eventuale schema D4/D6/D8 sui tre mondi) o solo
  una sigla di comodo.
- **Percorso del bigliettino della Casa**: `images/` condivisa o
  `CittaFerma/` insieme al resto? Vedi nota nella sezione asset.
- **Riga vuota nel dialogo di spiaggia-2** (ereditata dalla v3): ancora da
  scrivere, non inventata di proposito.
- **Meccanica del "vapore" nel bagno**: da specificare tecnicamente quanto
  deve durare l'attesa e se è puro tempo (es. 4-5 secondi di click sul
  rubinetto) o se richiede click ripetuti — utile deciderlo prima di
  passare il tutto a Claude Code, altrimenti lo implementa a caso.
