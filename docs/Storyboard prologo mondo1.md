# Storyboard — Mondo 1: Nettuno (revisione 3)

### "Fragments" — protagonista: Nox

> Questa versione **sostituisce la v2** e integra la mappa completa del
> Mondo 1: non più solo Piazza dell'Orologio, ma quattro location collegate
> (Vicolo Saracinesca, Piazza del Dio Nettuno, Spiaggia degli Scogli) più il
> rimando alla Casa (ancora da scrivere). Include il dialogo iniziale a
> schermo nero fuso con le righe già esistenti.

---

## 0 · Mappa completa

```
PROLOGO
P0 Schermo nero — monologo introduttivo
 ↓
P1 Camera — Nox nota l'anomalia
   hotspot sempre disponibili: telefono · gatto · finestra · porta
 ↓ (porta → dissolvenza bianca)

MONDO 1 — NETTUNO
N1 Piazza dell'Orologio (arrivo)
   dialogo automatico con la FIGURA all'ingresso in scena
   [dialogo concluso] → si sbloccano: FIGURA (ripetibile) · OROLOGIO ·
                          hotspot basso-sx (Vicolo) · hotspot alto-dx (Piazza Nettuno)
 │
 ├──→ N2 Vicolo Saracinesca (basso-sx da N1)
 │      ↺ torna a N1
 │      SENZA ingranaggio: solo testo d'ambiente
 │      CON ingranaggio (ottenuto in N3): minigioco rotazione 360°
 │        → ricompensa: LANCETTA (delle ore)
 │
 └──→ N3 Piazza del Dio Nettuno (alto-dx da N1)
        destra → torna a N1
        statua/fontana → INGRANAGGIO (inventario) + BIGLIETTINO (testo in primo piano)
        sinistra → N4 Spiaggia degli Scogli

        N4 Spiaggia degli Scogli
          destra (cielo) → solo testo d'ambiente
          "?" compare SOLO se DADO già ottenuto in Casa (WIP)
            → dialogo, la figura regala il dado a Nox
          in basso → torna a N3

N1 (con LANCETTA in inventario) → usa su OROLOGIO
   → minigioco slider (ore + minuti, indipendenti) → target 03:00
   → risolto: CLICK, cade la CHIAVE, dialogo, finestra si illumina
   → nuovo hotspot: porta sotto la finestra → CASA (WIP, richiede CHIAVE)
```

**Oggetti che attraversano le scene**: `ingranaggio` (N3 → N2) · `lancetta`
(N2 → N1, orologio) · `chiave` (N1 → porta casa) · `dado` (Casa/WIP → N4).

---

## PROLOGO

### P0 · Schermo nero — monologo

_(Solo testo su nero, nessun visivo. Le righe si susseguono come nell'intro
già implementata — comparsa/dissolvenza, non a blocco unico.)_

> **NOX** _(voce fuori campo)_
> Ricordo solo che stavo scrollando YouTube cercando chissà cosa...

> **NOX**
> Poi le 3:00 di notte. Non ho sonno, ma decido di andare a dormire.

> **NOX**
> Metto la sveglia per domani mattina. Vorrei provare a impegnare la
> giornata, concludendo qualcosa... Sì. Ma cosa?

> **NOX**
> Senza rendermene conto chiudo gli occhi. Al risveglio c'era qualcosa di
> strano — non saprei descriverlo.

> **NOX**
> Era come se il tempo stesso fosse fermo. Un silenzio quasi inquietante.

_(Dissolvenza dal nero alla Scena P1.)_

---

### P1 · Camera da letto

_(Visivo: luce piatta, tutto immobile. Sulla scrivania, il telefono. Sul
letto, il gatto dorme beato.)_

> **NOX** _(fra sé, guardando il soffitto)_
> Ok.

> **NOX**
> Ok, non è ok. Manca qualcosa.

_(Nota di continuità: queste due righe, già presenti nella v1/v2, restano
come primo respiro dopo il monologo a schermo nero — il passaggio dal
"racconto" al "presente" della scena.)_

> **NOX**
> Non ha suonato la sveglia. Che strano...

> **NOX**
> ...?!?

> **NOX**
> Le 3:00 del mattino? Impossibile, di fuori è giorno e ricordo di essermi
> addormentata.

> **NOX**
> "Niente da fare, sembra bloccato. A quanto pare non prende né internet né
> la linea del telefono. Sai che novità."

> **NOX**
> Fammi andare a controllare giù da mia nonna. Con il suo WiFi dovrei
> riuscire a collegarmi.

_(Nota: qui "nonna" sostituisce la precedente "madre" delle revisioni
passate — allineato ai nuovi appunti. Se il telefono della nonna è un
hotspot separato o solo una battuta di passaggio è da decidere: nella
lista sotto non compare come hotspot a sé, quindi per ora resta solo testo
di intenzione, non un'azione giocabile.)_

**Hotspot disponibili in camera (sempre attivi, nessun ordine imposto):**

> **Gatto**
> "Beato tu che dormi. Bella la vita eh?"

> **Telefono**
> "Niente da fare, sembra bloccato. Segna sempre le 3:00."

> **Finestra**
> "Che tempo strano, mai vista tutta questa nebbia. Non si sentono nemmeno
> gli uccellini o il rumore del vento."
> "Non so dire se sia rilassante o meno."

> **Porta della camera**
> "È il momento di alzarsi."

_(Interazione con la porta → transizione a dissolvenza bianca → Scena N1.)_

---

## MONDO 1 — NETTUNO

### N1 · Piazza dell'Orologio (arrivo)

_(Il dialogo parte automaticamente all'ingresso in scena — non richiede un
click su un hotspot. Il giocatore osserva.)_

> **NOX**
> Ma cosa...?

> **NOX**
> Sto sognando, è impossibile!

> **NOX**
> Ho avuto un'amnesia o qualcosa di simile? Come sono finita in piazza?

> **NOX**
> Stranamente però non mi sento agitata...

_(Nota un'ombra: una figura poco distinta, seduta su una panchina vicino
all'orologio.)_

> **NOX**
> Ok, sono sicura che quella cosa non fosse lì fino a poco fa.

> **NOX** _(avvicinandosi)_
> Ehi. Scusami? Sai dirmi cosa sta succedendo?

> **?** _(senza alzare troppo lo sguardo)_
> Ehi. Se sei venuta a dirmi che devo "reagire", puoi anche tornare da dove
> sei venuta.

> **NOX**
> No, tranquilla. Non sono neanche brava a dirlo a me, figurati a te.

> **?**
> Vedi quell'orologio? È fermo da... non lo so. Ho smesso di controllare,
> credo.

> **?**
> Comunque va bene così. Tanto anche se riparte, poi si rompe di nuovo. No?

> **NOX**
> Manca la lancetta piccola. Tutto qui?

> **NOX**
> Pensi che io sia in grado di poter uscire da qualunque sia questo posto e
> tornare a casa mia, se lo aggiusto?

> **?** _(scrollando le spalle)_
> Non saprei. Prova pure. Io resto qui.

> **NOX**
> Va bene, va bene. Ti lascio ai tuoi pensieri.

_(Fine del dialogo automatico. Si sbloccano: FIGURA come hotspot ripetibile,
OROLOGIO, e i due passaggi — basso-sx verso il Vicolo, alto-dx verso la
Piazza del Dio Nettuno.)_

**Hotspot ripetibile — Figura misteriosa (prima dell'orologio riparato):**

> "Se vuoi riparare l'orologio, fa pure. A me non cambia nulla, credo."

**Hotspot ripetibile — Figura (dopo l'orologio riparato):**

> "Va bene, eh. Sul serio. Solo... non è che uno «riparte» così, perché un
> orologio ticchetta di nuovo."

**Hotspot — Orologio (senza lancetta):**

> "Manca la lancetta delle ore all'orologio. Forse riparandolo potrei uscire
> da questo posto."

---

### N2 · Vicolo Saracinesca

_(Raggiungibile dal punto basso-sinistra di N1. Hotspot per tornare a N1
sempre presente.)_

**Saracinesca — SENZA ingranaggio:**

> "Una vecchia saracinesca. Sembra esserci qualcosa incastrato lì sotto,
> ovviamente nel punto più scomodo possibile."
> "Il meccanismo per alzarla sembra rotto, forse manca qualcosa..."

**Saracinesca — CON ingranaggio (ottenuto in N3):**

> "Una vecchia saracinesca. Sembra esserci qualcosa incastrato lì sotto,
> ovviamente nel punto più scomodo possibile."
> "Forse con questo potrebbe aprirsi..."

_(Si avvia il minigioco. Vedi §Minigiochi più sotto per la meccanica di
rotazione a 360°.)_

**Risolto:**

> "Sembra la lancetta di un orologio!"

_(La LANCETTA si aggiunge all'inventario/zaino.)_

**Se si interagisce di nuovo con la saracinesca dopo aver preso la lancetta:**

> "Ho già preso quello che mi serviva, qui."

---

### N3 · Piazza del Dio Nettuno

_(Raggiungibile dal punto alto-destra di N1. Nuova location.)_

**Destra:** torna a N1 (Piazza dell'Orologio)

**Statua del Dio Nettuno / fontana:**

- **Ingranaggio** dentro la fontana — cliccabile, si aggiunge all'inventario:
  > "Un vecchio ingranaggio dentro una fontana? Potrebbe tornarmi utile."
- **Bigliettino** posato sul bordo della fontana — al click, mostra in
  primo piano l'immagine di un foglietto con una frase di riflessione che
  rispecchia i dilemmi di Nox:
  > _(bozza di testo, da rifinire)_
  > "Ma l'acqua qui dentro è solo bella da vedere? Serve a qualcosa? Mi
  > sento un po' come quest'acqua."

**Sinistra:** transizione a N4 (Spiaggia degli Scogli)

---

### N4 · Spiaggia degli Scogli

_(Raggiungibile da N3, sinistra.)_

**Destra (verso il cielo) — solo testo d'ambiente:**

> **NOX**
> Certo che questo posto senza nessuno in giro è uno spettacolo.

> **NOX**
> Magari fosse sempre così.

**Figura "?" — compare SOLO se il DADO è già stato ottenuto in Casa (WIP):**

> **NOX**
> Alla fine vedo che ti sei mossa.

> **?**
> O magari sono sempre stata qui. Ferma a contemplare il vuoto.

> **?**
> _(riga da scrivere — nell'appunto originale è lasciata vuota;_
> _segnaposto per una battuta di transizione prima della riga successiva)_

> **NOX**
> Sono proprio sicura di averti visto vicino all'orologio poco fa.

> **?**
> Ha ripreso a ticchettare. Il tempo scorre, ed io resto immobile.

> **?**
> Forse è più facile così. Magari è l'unica cosa che mi riesce bene.

_(Nox mostra il dado che ha trovato nella casa.)_

> **NOX**
> ...Questo è tuo? Lo hai fatto tu? È molto bello.

_(La figura misteriosa trasale per un attimo, quasi a mostrare un'emozione.)_

> **?**
> Non è niente di che. È pieno di imperfezioni.

> **NOX**
> Non sono forse quelle a renderlo unico?

> **NOX**
> E comunque questo smentisce il fatto che tu sia capace solo a restare
> immobile.

> **?**
> ...

_(L'ombra fissa Nox intensamente.)_

> **?**
> Tu dici? Sarà... Vabbè, per questa volta te lo regalo. Puoi tenerlo.

_(Dissolvenza bianca → si torna in camera/hub.)_

**In basso:** torna a N3 (Piazza del Dio Nettuno)

---

### N1 · Piazza dell'Orologio (con lancetta) — risoluzione

_(Usando la LANCETTA sull'orologio si avvia il minigioco — vedi §Minigiochi.
Target: le lancette allineate sulle 03:00.)_

**Risolto:**

> "L'orologio ha ripreso a funzionare."

_(CLICK! Da dietro l'orologio cade una CHIAVE, si aggiunge all'inventario.)_

> **NOX**
> Hai visto? Incredibile, ma ce l'ho fatta.

> **?**
> Ok, riparte. E quindi?

> **?**
> Va bene, eh. Sul serio. Solo... non è che uno «riparte» così, perché un
> orologio ticchetta di nuovo.

_(Una finestra prima buia, in fondo alla piazza, ora è illuminata. Si
sblocca un nuovo hotspot: la porta sotto la finestra — usando la CHIAVE si
entra nella Casa.)_

---

## CASA — work in progress

_(Sezione non ancora scritta. Deve contenere almeno: dove si trova il DADO
che serve per lo sblocco della figura in N4, e come si esce per tornare in
piazza. Segnaposto per la prossima sessione di scrittura.)_

---

## Minigiochi — specifiche

### 1. Orologio: slider ore + minuti indipendenti (aggiornato)

**Differenza rispetto alle versioni precedenti**: non più un solo blocco
"lancette insieme", ma **tre sprite separati**:

- Quadrante dell'orologio (sfondo fisso)
- Lancetta dei minuti (sprite isolato, ruota sul proprio perno)
- Lancetta delle ore (sprite isolato, ruota sul proprio perno)

Due slider indipendenti (uno per le ore, uno per i minuti) muovono le
rispettive lancette in tempo reale. Target: **03:00** esatto.

_(Questo si collega direttamente al workflow di animazione sprite discusso
in precedenza: quadrante e lancette vanno generati/ritagliati come immagini
separate con pivot allineato, per la rotazione via CSS/JS.)_

### 2. Saracinesca: rotazione a 360° con resistenza (nuovo)

Sostituisce il precedente enigma a sequenza di ingranaggi. Meccanica:

- Il giocatore trascina (drag) un disco con un perno centrale
- La rotazione **fa resistenza**: se il giocatore smette di trascinare o
  inverte direzione, il disco torna leggermente indietro
- Serve una rotazione **continua e sostenuta** per accumulare progresso
  fino a 360°
- Al completamento, la saracinesca si alza e rivela l'oggetto (lancetta)

_(Nota tecnica per l'implementazione futura: si traduce in un accumulatore
d'angolo che aumenta mentre il drag è in corso nella direzione giusta, e
decade lentamente nel tempo se il drag si ferma — non un semplice
"trascina fino in fondo".)_

---

## Oggetti — tabella riepilogativa

| Oggetto              | Ottenuto in                             | Usato in                                                           |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Ingranaggio          | N3, statua/fontana                      | N2, sblocca minigioco saracinesca                                  |
| Lancetta (delle ore) | N2, risolvendo il minigioco saracinesca | N1, minigioco orologio                                             |
| Chiave               | N1, cade dall'orologio riparato         | Porta sotto la finestra → Casa (WIP)                               |
| Dado                 | Casa (WIP)                              | N4, dialogo finale con la figura                                   |
| Bigliettino          | N3, fontana                             | Solo testo/immagine in primo piano, nessun uso meccanico (per ora) |

---

## Cosa cambia rispetto alla v2

1. **Monologo a schermo nero** aggiunto come vera apertura del gioco,
   fuso con le righe "Ok. Ok, non è ok. Manca qualcosa." già esistenti.
2. **Nonna al posto della madre** per il secondo controllo dell'ora
   (per ora solo accennato a parole, non ancora un hotspot separato).
3. **Il dialogo con la figura in N1 parte automaticamente** all'arrivo in
   scena, non richiede più un click esplicito — semplifica il gate
   introdotto in v2 (non serve più perché il dialogo blocca comunque gli
   altri hotspot finché non finisce).
4. **Mappa del Mondo 1 molto più ampia**: da una singola piazza a quattro
   location (Piazza Orologio, Vicolo, Piazza Nettuno, Spiaggia).
5. **Minigioco orologio ridisegnato**: tre sprite separati (quadrante +
   2 lancette indipendenti) invece di un blocco unico — coerente con il
   workflow di animazione discusso.
6. **Minigioco saracinesca ridisegnato**: rotazione a 360° con resistenza,
   al posto della sequenza a tre click. Richiede un oggetto precedente
   (ingranaggio) invece di essere accessibile da subito.
7. **Nuovo oggetto: la chiave**, cade dall'orologio riparato, apre la casa.
8. **Nuovo oggetto: il bigliettino**, puramente narrativo/atmosferico.
9. **Introduzione della Spiaggia degli Scogli** con un secondo incontro
   con la figura, condizionato al possesso del dado — il dado stesso ora
   si ottiene nella Casa (non più dentro l'orologio come in v1/v2).

## Asset — mappa immagini (per Claude Code)

> Convenzione cartelle come da `README.md` del progetto Vite:
> sfondi e sprite in `public/assets/images/`, riferiti nel codice come
> `/assets/images/nomefile.jpg` (o `.png` per gli sprite trasparenti).
>
> **Tipo**: `sfondo` = immagine scena intera · `sprite` = elemento isolato
> con trasparenza, animato/mosso via CSS-JS · `icona` = piccola immagine per
> inventario/zaino · `closeup` = immagine ravvicinata per un pannello enigma.

### Prologo

| Scena/Elemento           | File           | Tipo   | Stato     |
| ------------------------ | -------------- | ------ | --------- |
| Camera da letto (sfondo) | `camera.jpg`   | sfondo | ✅ esiste |
| Title screen             | `title-bg.jpg` | sfondo | ✅ esiste |

### N1 — Piazza dell'Orologio

| Scena/Elemento                      | File                           | Tipo           | Stato                                                                                                      |
| ----------------------------------- | ------------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------- |
| Piazza (sfondo)                     | `piazza.jpg`                   | sfondo         | ✅ esiste                                                                                                  |
| Orologio — closeup per il minigioco | `orologio-quadrante.jpg`       | sfondo/closeup | 🔲 da rifare (prima era `enigma-orologio.jpg` con lancette disegnate fisse — va rigenerato SENZA lancette) |
| Lancetta delle ore (isolata)        | `orologio-lancetta-ore.png`    | sprite         | 🔲 da generare, sfondo trasparente, pivot alla base                                                        |
| Lancetta dei minuti (isolata)       | `orologio-lancetta-minuti.png` | sprite         | 🔲 da generare, sfondo trasparente, pivot alla base                                                        |
| Chiave (che cade dall'orologio)     | `chiave.png`                   | sprite/icona   | 🔲 da generare                                                                                             |

### N2 — Vicolo Saracinesca

| Scena/Elemento                                                             | File                                           | Tipo           | Stato                                                                                                                                                                        |
| -------------------------------------------------------------------------- | ---------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vicolo (sfondo)                                                            | `vicolo.jpg`                                   | sfondo         | ✅ esiste                                                                                                                                                                    |
| Saracinesca — closeup per il minigioco                                     | `saracinesca-meccanismo.jpg`                   | sfondo/closeup | 🔲 da rifare (prima era `enigma-ingranaggi.jpg` pensato per il vecchio enigma a sequenza — il nuovo meccanismo a rotazione 360° ha bisogno di un disco visibile e isolabile) |
| Disco rotante con perno                                                    | `saracinesca-disco.png`                        | sprite         | 🔲 da generare, sfondo trasparente, pivot al centro                                                                                                                          |
| Lancetta trovata (stesso oggetto di sopra, prima di essere "riconosciuta") | riusa `orologio-lancetta-ore.png` o icona a sé | sprite/icona   | 🔲 da decidere se è lo stesso sprite o un'icona semplificata per l'inventario                                                                                                |

### N3 — Piazza del Dio Nettuno _(location nuova, nessun asset esiste ancora)_

| Scena/Elemento                        | File                  | Tipo         | Stato                                                                                         |
| ------------------------------------- | --------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| Piazza del Dio Nettuno (sfondo)       | `piazza-nettuno.jpg`  | sfondo       | 🔲 da generare                                                                                |
| Statua/fontana — eventuale closeup    | `fontana-nettuno.jpg` | closeup      | 🔲 opzionale, solo se serve una vista ravvicinata                                             |
| Ingranaggio (nella fontana)           | `ingranaggio.png`     | sprite/icona | 🔲 da generare, sfondo trasparente                                                            |
| Bigliettino — immagine in primo piano | `bigliettino.jpg`     | closeup      | 🔲 da generare (foglietto con testo leggibile, o testo sovrapposto via CSS su un fondo carta) |

### N4 — Spiaggia degli Scogli _(location nuova, nessun asset esiste ancora)_

| Scena/Elemento                 | File           | Tipo   | Stato          |
| ------------------------------ | -------------- | ------ | -------------- |
| Spiaggia degli Scogli (sfondo) | `spiaggia.jpg` | sfondo | 🔲 da generare |

### Casa _(work in progress — nessun asset possibile finché la sezione non è scritta)_

| Scena/Elemento | File | Tipo | Stato                                 |
| -------------- | ---- | ---- | ------------------------------------- |
| —              | —    | —    | 🔲 in attesa del design della sezione |

### Oggetti — icone inventario (riepilogo)

| Oggetto     | File icona zaino  | Stato                                                  |
| ----------- | ----------------- | ------------------------------------------------------ |
| Ingranaggio | `ingranaggio.png` | 🔲 da generare (può coincidere con lo sprite di scena) |
| Lancetta    | `lancetta.png`    | 🔲 da generare                                         |
| Chiave      | `chiave.png`      | 🔲 da generare                                         |
| Dado        | `dado.png`        | 🔲 da generare                                         |

---

- **Riga vuota nel dialogo N4**: nell'appunto originale una battuta di "?"
  è lasciata senza testo, tra "ferma a contemplare il vuoto" e la risposta
  di Nox. Da scrivere — non l'ho inventata perché è un punto emotivamente
  delicato del dialogo che probabilmente vuoi scrivere tu.
- **Casa**: intera sezione da progettare — location del dado, eventuali
  enigmi, come si esce.
- **Telefono della nonna**: valutare se diventa un hotspot vero (con una sua
  scena/dialogo) o resta solo una battuta di passaggio prima della
  transizione in piazza.
- **Testo del bigliettino**: quello riportato è una bozza, liberissimo di
  riscriverlo.
