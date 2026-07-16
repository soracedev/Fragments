# Fragments — Il Tempo Fermo

## Documento di Progetto Completo

> Questo file è la **memoria totale del progetto**. Contiene ogni decisione
> presa, lo stato attuale, cosa manca, e come procedere. Caricalo all'inizio
> di ogni nuova sessione di lavoro con Claude (chat o Claude Code).
>
> Ultimo aggiornamento: 8 luglio 2026

---

## 1. Concept

**Fragments** è un **punto-e-clicca investigativo a scene fisse** ispirato a
_Another Code: Two Memories_ (DS, 2005). È un **regalo di anniversario** per
la ragazza dello sviluppatore (Desy). Il gioco è una metafora interattiva dei
suoi blocchi emotivi reali: sentirsi ferma, non vista, impostora. Il messaggio
del gioco — "non sei bloccata, non sei invisibile, non sei incapace" — passa
interamente per la meccanica e la metafora, **mai per prediche esplicite**.

**Protagonista**: Nox, una versione di lei, che parla con la **sua voce reale**
(analizzata da storico WhatsApp — vedi Bibbia Personaggio).

**Nessun animale-guida**: la volpe è stata rimossa dal design. Nox si orienta
da sola, tramite osservazione delle scene e dialogo con le figure che incontra
— nessun elemento esterno le indica la strada.

**Dadi di resina**: collezionabili, uno per mondo. Riferimento al fatto che
Desy fa dadi in resina artigianali e soffre di sindrome dell'impostore
riguardo alla loro qualità. Ogni dado trovato è una prova tangibile della
sua abilità. Alla fine si combinano per aprire un messaggio personale di Luca.

---

## 2. Struttura narrativa

> **Aggiornamento strutturale importante**: il gioco ha **due mondi**, non
> tre. Non esiste un "Mondo 3" separato — l'arco della sindrome
> dell'impostore attraversa tutto il gioco tramite una figura persistente
> (vedi sotto) e si risolve nel finale del Mondo 2, non in un capitolo a sé.

### Hub: La Camera da Letto

Nox si sveglia nella sua stanza. Tutto è fermo — l'orologio segna le 03:00
(l'ora delle streghe: soglia simbolica tra il mondo reale e il viaggio
interiore che sta per affrontare), non c'è vento, nessun suono. Il gatto
dorme beato sul letto. Tornando dall'hub dopo il Mondo 1, la stanza si
"riscalda" progressivamente (feedback visivo via filtri CSS: `warm-0` →
`warm-3`). I dadi raccolti si accumulano in uno scrigno visibile.

**Comportamento a due stadi della porta** ("Fuori casa"): la prima volta
che Nox esce, la porta la porta in realtà a Nettuno (Mondo 1) — non lo sa,
il giocatore nemmeno. Solo dopo aver chiuso il Mondo 2, la stessa porta
porta davvero fuori, a una scena reale ancora da progettare.

### La Figura misteriosa — presenza costante (non più una manifestazione per mondo)

**Cambiamento rispetto al design originale**: non ci sono tre manifestazioni
diverse, una per mondo. C'è **una Figura 1**, sempre la stessa (etichettata
"?" nei dialoghi, mai un nome), che accompagna Nox dall'inizio alla fine
del gioco — svalutandola, sminuendola, demoralizzandola. È di fatto la voce
della sindrome dell'impostore, incarnata, non relegata a un capitolo finale.
Il suo registro si evolve col mondo in cui appare:

- **A Nettuno**: rassegnazione, il tema del "tanto è inutile provarci"
- **A Casa Familiare**: si sposta sulla relazione — "non mi ha mai amato
  davvero", dubbi sul rapporto con l'altro
- **Nella Stanza dei Dadi (finale)**: l'attacco più diretto, unisce
  entrambi i temi — incapacità personale e non essere amata abbastanza

Si sono già incontrate (a Nettuno prima, poi di nuovo a Casa Familiare) — la
Figura 1 lo ricorda, non è un incontro isolato per mondo.

### Mondo 1 — La Città Ferma (Nettuno)

**Tema**: sentirsi rimasta indietro, il fallimento, l'incapacità di progredire.
**Ambientazione**: Nettuno (città reale, significativa per loro). Stile
visivo: illustrazione digitale stilizzata (coerente con tutto il resto del
mondo onirico).
**Dado ottenuto**: **D4** — trovato dentro una cassaforte a muro in una
sezione "Casa" raggiungibile dalla piazza (Soggiorno + Bagno, con un enigma
di specchio appannato che rivela il codice della cassaforte).
**Stato**: storyboard completo (v3/v4/v5), mancano solo asset grafici e
implementazione codice.

### Mondo 2 — Casa Familiare (La Solitudine)

**Tema**: sentirsi sola/non amata anche quando qualcuno le è vicino.
**Ambientazione**: la vera casa di Luca. Le foto reali servono solo come
riferimento/base — vengono rifatte in stile illustrato, coerente con
Nettuno. Nessun contrasto di linguaggio visivo tra i due mondi, lo stile
resta unico in tutto il gioco.
**Come ci si arriva**: dal "Fuori casa" del Mondo 1 (il cancello della
nonna), che invece di aprirsi sul giardino della nonna si apre — senza
preavviso — su Casa Familiare. Nox la riconosce immediatamente.
**Personaggi**: la Figura 1 (persistente, vedi sopra) più una **Figura 2**,
esclusiva di questo mondo — un riflesso distorto di Luca, silenzioso e
distante, che sembra ignorare Nox per quasi tutta la durata del mondo.
Rompe il silenzio una sola volta, alla scena del divano ("Sono così
belli", riferito al secondo dado) — il momento in cui l'accusa "non mi ha
mai amato davvero" viene silenziosamente smentita dai fatti, non da un
discorso.
**Dado ottenuto**: **D6** — donato da Figura 1 dopo la scena del divano.
**Finale del mondo — La Stanza dei Dadi**: risolto il resto della Casa,
Nox accede alla stanza dove di solito si preparano i dadi (dettaglio
reale: l'hobby di Desy). Qui la Figura 1 la affronta un'ultima volta con
l'attacco più diretto di tutto il gioco. Nox trova un portadadi (ha già
D4 e D6) e decide — da altruista — di completare il lavoro, creando i
cinque dadi rimanenti: **D8, D10, D12, D%, D20** (il set poliedrico
completo, sette dadi in tutto). Minigioco in 5 fasi che segue il processo
reale di lavorazione della resina (dosaggio, colata nello stampo,
pigmenti col contagocce, marmorizzazione con stuzzicadenti, pressure pot).
Al termine, Figura 1 — commossa dalla qualità del lavoro — si ricrede,
sorride, ringrazia Nox e la lascia andare. È qui che si risolve l'intero
arco dell'impostore, non in un mondo separato.
**Stato**: storyboard completo per la parte narrativa principale (Fuori
Casa, Soggiorno, Figura 2, Camera da letto, Giardino) — mancano
ambientazione delle stanze pre-divano e alcuni minigiochi intermedi minori.

### Finale — Cortile, Lavanderia, Epilogo

_(Dettaglio completo in `storyboard-finale.md`.)_ Dopo aver concluso sia
Nettuno sia Casa Familiare, il cancello porta al **Cortile della Nonna**
(luogo reale, non più onirico) e da lì alla **Lavanderia**, dove Nox
affronta per l'ultima volta Figura 1 ("LEI"). Qui, non a Nettuno né a
Casa Familiare, si risolve l'intero arco dell'impostore: un confronto
diretto, due minigiochi di creazione dei dadi rimanenti (D8, D10, D12, D%,
D20), e un dialogo finale che porta Nox e LEI ad accettarsi a vicenda.
Il gioco si chiude con un abbraccio, dissolvenza al nero, e la **dedica
personale di Luca a Desy** — testo continuo e scorrevole, senza limiti di
tempo. Nessun ritorno alla camera da letto, nessuna riflessione finale di
Nox: si passa direttamente dall'abbraccio al nero, dal nero alla dedica.

I sette dadi (D4, D6, D8, D10, D12, D%, D20) restano come collezione
visibile — un set completo di dadi da gioco reali, coerente con l'hobby di
Desy. _(Nota: il precedente concept "combinazione finale dei dadi tipo
lucchetto" può restare come idea opzionale se si vuole un gesto finale in
camera, ma non è più necessario strutturalmente — il vero climax emotivo è
già avvenuto nella Stanza dei Dadi.)_

---

## 3. Design dei puzzle (stile Another Code)

### Principi

- Ogni enigma produce qualcosa (oggetto, informazione, stato) che serve altrove
- Backtracking mirato: oggetto trovato nella scena 3 sblocca qualcosa nella scena 1
- Il backtracking è **interno al mondo** (non tra mondi diversi)
- Il giocatore non può tornare al mondo precedente finché non ha chiuso quello corrente
- I puzzle sono metafore del tema del mondo, non minigiochi astratti
- Difficoltà bassa/media — il gioco è un regalo, non una sfida

### Tipi di enigma implementati

1. **Sequenza ingranaggi** — clicca in ordine corretto (Mondo 1, saracinesca)
2. **Slider/allineamento** — allinea lancette a un'ora precisa (Mondo 1, orologio)

### Tipi di enigma pianificati (da implementare)

3. **Tuning/frequenza** — slider che pulisce un dato rumoroso, per "sintonizzarsi"
4. **Pattern matching / costellazione** — collega punti nell'ordine giusto
5. **Memory tematico** — accoppia frammenti per ricostruire un ricordo
6. **Luce/oscurità** — muovi un cerchio di luce per scoprire dettagli nascosti
7. **Trova le differenze** — tra lei e il riflesso _(concept originale del vecchio Mondo 3, ora non più necessario dato che l'arco dell'impostore si risolve nella Stanza dei Dadi — può restare in libreria per un mondo futuro, se mai se ne aggiungessero)_
8. **Riordino temporale** — frammenti da riordinare cronologicamente
9. **Simon Says / sequenza audio** — ripeti una sequenza (opzionale)

### Catena di dipendenze Mondo 1 (revisionata, v2)

```
P2 Piazza (arrivo) → Nox perplessa, nota la FIGURA su una panchina
  [GATE] nessun altro hotspot visibile finché non le parla
  ↓
N1 Piazza → dialogo con la FIGURA ("?") → orologio fermo, obiettivo dichiarato
  → Nox nota da sola il vicolo laterale
  ↓
N2 Vicolo → enigma ingranaggi → alza saracinesca → prendi LANCETTA
  ↓
N1 (ritorno) → usa LANCETTA sull'orologio → enigma orologio (03:00)
  → DADO #1 dentro il meccanismo
  → la FIGURA resiste ("va bene, tanto...")
  → si illumina una finestra lontana
  ↓
N4 Vecchio negozio (DA FARE) → tracce nella polvere → OROLOGIO DA TASCA
  ↓
N1 (ritorno finale) → mostra OROLOGIO DA TASCA alla FIGURA
  → lei cede, Nettuno "riparte", il mondo si scalda
  ↓
HUB → sveglia riparte, stanza si riscalda (warm-1)
```

---

## 4. Stack tecnico

**Decisione finale**: Vite + vanilla JS (HTML/CSS/JS puro, niente React).

**Perché non React**: il virtual DOM e il ciclo component lifecycle combattono
contro animazioni imperative, transizioni di scena e puzzle interattivi.

**Perché non Unity/Godot**: tempo di apprendimento incompatibile con la deadline
(~3.5 settimane), e il gioco non usa nessuna feature che richieda un engine
(zero fisica, zero 3D reale, zero collisioni dinamiche).

**Perché non RPG Maker MV/MZ**: il gioco non ha griglia, non ha combattimenti,
non ha movimento tile-based — userebbe lo 0% delle feature per cui RPG Maker
esiste, e richiederebbe plugin JS custom per tutto il resto.

**Deploy target**: APK nativo via Capacitor (Ionic), oppure PWA web. L'APK
risolve il problema dell'autoplay audio che i browser bloccano.

### Struttura file del progetto

```
fragments/
├── index.html              ← guscio HTML: solo UI fissa (HUD, dialoghi, title screen)
├── package.json            ← dipendenze (solo vite)
├── vite.config.js
├── src/
│   ├── main.js             ← entry point, title screen, opzioni, collega tutto
│   ├── engine.js           ← motore: scene, dialoghi, parallax, polvere, warmth
│   ├── state.js            ← stato di gioco + salvataggio localStorage
│   ├── inventory.js        ← sistema zaino con database oggetti
│   ├── style.css           ← tutti gli stili
│   ├── puzzles/
│   │   ├── clock.js        ← enigma orologio (slider → 03:00)
│   │   └── gears.js        ← enigma ingranaggi (sequenza click)
│   └── worlds/
│       ├── prologue.js     ← intro testuale + prima interazione camera
│       └── mondo1.js       ← Nettuno: azioni hotspot, dialoghi NPC, logica
└── public/
    └── assets/
        ├── images/         ← fondali e closeup (.jpg)
        └── audio/          ← musica (.mp3)
```

### Come aggiungere un nuovo mondo

1. Crea `src/worlds/mondo2.js` con le sue azioni hotspot e dialoghi
2. Le scene HTML possono essere iniettate dal modulo JS (non serve toccare index.html)
3. Aggiungi gli asset in `public/assets/images/`
4. Aggiungi nuovi oggetti in `src/inventory.js` → `ITEM_DB`
5. Importa e inizializza in `src/main.js`

---

## 5. Asset e workflow grafico

### Workflow (tutto da telefono/tablet)

1. **Midjourney** (via Discord mobile) per generare fondali e closeup
   - Usare `--sref` con un'immagine di riferimento per coerenza stilistica
   - Prompt separati per layer sfondo e elementi primo piano
2. **remove.bg** per sfondi trasparenti su elementi isolati
3. **freesound.org** per audio ambientale (vento, ticchettio, silenzio)
4. **Suno** per musica (già generata: Moon_Over_Ash.mp3 per title screen)

### Stile visivo confermato

Illustrazione digitale, palette desaturata, atmosfera onirica. Lo stile è
già definito dalle immagini generate: acquerello digitale con linee a inchiostro,
palette fredda/nebbiosa che si scalda col progresso del gioco.

### Asset esistenti (già generati)

| File originale                 | Nome nel progetto       | Scena                    |
| ------------------------------ | ----------------------- | ------------------------ |
| `1000069301.png`               | `title-bg.jpg`          | Sfondo title screen      |
| `Camera.png`                   | `camera.jpg`            | Camera da letto (hub)    |
| `PiazzaOrologio.png`           | `piazza.jpg`            | Piazza di Nettuno        |
| `PiazzaSaracinesca.png`        | `vicolo.jpg`            | Vicolo con saracinesca   |
| `CloseupEnigmaSaracinescs.png` | `enigma-ingranaggi.jpg` | Closeup meccanismo       |
| `EnigmaOrologio.png`           | `enigma-orologio.jpg`   | Closeup orologio Nettuno |
| `Moon_Over_Ash.mp3`            | `theme.mp3`             | Musica title screen      |

### Asset da generare

- Vecchio negozio illuminato (N4, Mondo 1)
- Protagonista (poche pose statiche: idle, esamina, reazione)
- Fondali Mondo 2 / Casa Familiare — foto come riferimento, rifatte in stile illustrato coerente con Nettuno (stanze pre-divano ancora da definire, + scena del divano, + Stanza dei Dadi)
- Musica per Mondo 1, 2, 3 (opzionale, può restare silenzioso/ambient)

---

## 6. Stato attuale di sviluppo

### Completato ✅

- [x] Title screen con musica, menu (Nuova Partita / Continua / Opzioni)
- [x] Intro testuale a comparsa con skip
- [x] Prologo: camera, dialoghi (da aggiornare con gatto + telefono madre, v. storyboard v2)
- [x] Mondo 1 parziale (v1 codice): piazza → vicolo → enigma ingranaggi → lancetta → enigma orologio → dado #1 → resistenza della figura → finestra illuminata
      _(nota: dialoghi e struttura da riallineare alla revisione narrativa v2 — vedi storyboard-prologo-mondo1-v2.md)_
- [x] Motore di gioco: scene manager, dialogue engine con nomi personaggi colorati, parallax, polvere sospesa
- [x] Sistema warmth (riscaldamento progressivo via CSS filter)
- [x] HUD con slot dadi
- [x] Inventario/zaino con database oggetti e vista dettaglio
- [x] Ingranaggi in CSS 3D (clip-path + perspective)
- [x] Salvataggio/caricamento con localStorage
- [x] Ristrutturazione a moduli Vite (file separati per motore, puzzle, mondi)

### Da fare 🔲

- [ ] Mondo 1: scena N4 (vecchio negozio) con puzzle tracce + orologio da tasca
- [ ] Mondo 1: resa finale della figura + ritorno all'hub
- [ ] Mondo 2 (Casa Familiare): stanze pre-divano da progettare (ambienti + minigiochi)
- [ ] Mondo 2: scena del divano — testo della battuta che fa ricredere Figura 1
- [ ] Mondo 2: Stanza dei Dadi — testo esatto della resa finale di Figura 1
- [ ] Mondo 2: minigioco creazione dadi (5 fasi) — decidere se ripetuto per ciascuno dei 5 dadi o in batch
- [x] Finale: dedica crediti — testo di Luca integrato in `storyboard-finale.md` (formato B, scorrevole)
- [ ] Finale: asset e implementazione della sequenza Cortile/Lavanderia
- [x] ~~Mondo 3~~ — non esiste più come mondo separato, arco assorbito nel finale del Mondo 2
- [ ] Asset protagonista (sprite statici)
- [ ] Audio ambientale per scene di gioco
- [ ] Scene generate da JS (non hardcoded in index.html) per scalabilità
- [ ] APK via Capacitor (post-completamento contenuti)
- [ ] Luca deve riscrivere `INTRO_LINES` in prologue.js con testo personale
- [ ] Decidere incisione sull'orologio da tasca (data/iniziali significative)
- [ ] Inventario da rifare: eliminare gli slot dadi multipli nell'HUD, sostituire con una singola "icona-zaino" più grande che apre il pannello inventario già esistente — tutti i dadi (D4, D6, D8, D10, D12, D%, D20) e ogni altro oggetto vivono lì dentro

---

## 7. Documenti companion

### Bibbia del Personaggio (`bibbia-personaggio.md`)

Contiene la voce di Desy distillata in regole usabili per i dialoghi:

- Ritmo (frasi corte, mediana 6 parole)
- Vocabolario-firma ("comunque", "tipo", "vabbè", "madò", "boh")
- Emoji con significato (😂💀🫠 = difesa; 😭🥺 = guardia abbassata; 🦊 = Luca)
- Due poli: deflessione ironica (70%) vs tenerezza scoperta (30%)
- Come scrivere la protagonista, le 3 manifestazioni, e cosa NON fare
- **NOTA**: la volpe 🦊 (rito reale tra Luca e Desy) è stata rimossa come
  elemento di gioco — resta solo un dettaglio biografico, non un personaggio

### Storyboard Prologo + Mondo 1 (`storyboard-prologo-mondo1.md`)

Script dialogico completo con:

- Mappa delle dipendenze (cosa sblocca cosa)
- Ogni battuta scritta nella voce del personaggio
- Note di regia (didascalie visive)
- Segnaposti da riempire (incisione orologio, faccia dado)
- Note aperte per la sessione successiva

---

## 8. Decisioni di design importanti (per non ripeterle)

1. **Lineare tra mondi, backtracking solo interno** — ogni mondo è un capitolo
   sigillato, non si torna indietro finché non lo chiudi
2. **Nessun animale-guida** — Nox si orienta da sola tramite osservazione
   e dialogo, senza elementi esterni che indicano la strada
3. **Niente retorica motivazionale** — il messaggio passa per metafora e azione.
   "Credi in te stessa!" ucciderebbe tutto il gioco
4. **La tenerezza va guadagnata** — la protagonista inizia in Polo A (ironica,
   difensiva) e arriva al Polo B (tenera) solo gradualmente
5. **Le manifestazioni parlano con la voce di Desy** — stesso ritmo, stesse
   espressioni, ma incastrate in un singolo registro (rassegnazione / invisibilità / autocritica)
6. **I dadi sono meccanici E simbolici** — servono sia durante il gioco che
   nella combinazione finale
7. **L'ultimo enigma è il più semplice** — messaggio: il vero ultimo passo
   non è difficile, è solo scegliere di farlo

---

## 9. Priorità per le prossime sessioni

**Settimana 1** (ora → 15 luglio):

- Completare Mondo 1 (negozio "Casa" nella piazza + resa finale di Figura 1)
- Design delle stanze pre-divano di Casa Familiare (Mondo 2) + relativi minigiochi
- Scrivere i testi ancora mancanti (battuta di Figura 1 dopo la scena del
  divano, resa finale nella Lavanderia)
- Generare i primi asset di Casa Familiare (foto come riferimento, rifatte in stile illustrato)

**Settimana 2** (15 → 22 luglio):

- Implementare Mondo 1 completo in codice
- Implementare le stanze pre-divano + scena del divano di Casa Familiare
- Decidere ed implementare il minigioco di creazione dadi (5 fasi × 5 dadi)
- Rifare l'inventario: icona-zaino unica, niente slot multipli

**Settimana 3** (22 → 29 luglio):

- Implementare la sequenza finale (Cortile, Lavanderia, abbraccio, dedica)
- Scrivere e integrare la dedica dei crediti
- Polish: audio, transizioni, testing su tablet

**Ultimi giorni**:

- Build APK con Capacitor
- Test finale sul tablet target
- Luca scrive/rifinisce la dedica finale

---

## 10. Come continuare con Claude Code

Carica questo file + la Bibbia del Personaggio + lo Storyboard all'inizio
di ogni sessione. Claude Code può:

1. **Leggere e modificare i file** del progetto direttamente
2. **Creare nuovi moduli** (es. `src/worlds/mondo2.js`, `src/puzzles/tuning.js`)
3. **Generare prompt Midjourney** per nuovi asset
4. **Scrivere dialoghi** seguendo la Bibbia del Personaggio
5. **Testare** con `npm run dev`

Comandi utili:

```bash
npm run dev          # avvia dev server su localhost:5173
npm run build        # build di produzione in dist/
npx cap sync         # sincronizza con progetto Android (quando pronto)
```
