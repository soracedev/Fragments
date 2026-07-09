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

### Hub: La Camera da Letto

Nox si sveglia nella sua stanza. Tutto è fermo — l'orologio segna le 03:00
(l'ora delle streghe: soglia simbolica tra il mondo reale e il viaggio
interiore che sta per affrontare), non c'è vento, nessun suono. Il gatto
dorme beato sul letto. Tornando dall'hub dopo ogni mondo, la stanza si
"riscalda" progressivamente (feedback visivo via filtri CSS: `warm-0` →
`warm-3`). I dadi raccolti si accumulano in uno scrigno visibile.

### Mondo 1 — La Città Ferma (Nettuno)

**Tema**: sentirsi rimasta indietro, il fallimento, l'incapacità di progredire.
**Ambientazione**: Nettuno (città reale, significativa per loro).
**Manifestazione (NPC)**: una **figura misteriosa, ombra indistinta ed eterea**
(etichettata "?" nei dialoghi, senza nome) che ha smesso di provarci. Parla
con la sua voce reale nel registro rassegnato ("vabbè, tanto..."). Nox deve
rimettere in moto la città e convincerla (con i fatti, non a parole) che si
può ripartire.
**Dado**: trovato dentro l'orologio riparato, incastonato con precisione.

### Mondo 2 — La Solitudine

**Tema**: sentirsi sola/non amata anche quando qualcuno le è vicino.
**Manifestazione**: un personaggio che _è_ lei ma con superficie diversa (nome
diverso, aspetto diverso). Non ricorda/sente di aver perso qualcosa. Solo
piano piano, da dettagli che combaciano con la sua vita, la protagonista (e il
giocatore) capisce che sta aiutando se stessa.
**Dado**: donato dal personaggio-manifestazione dopo essere stato "visto".
**Stato**: struttura narrativa definita a grandi linee, puzzle specifici e
storyboard da scrivere. Da ripensare la parte "chi la vede fin dall'inizio",
in precedenza affidata alla volpe (ora rimossa) — va trovato un nuovo
veicolo per questo beat, potrebbe essere la stessa manifestazione o un
dettaglio ambientale.

### Mondo 3 — L'Impostora

**Tema**: sindrome dell'impostore. Il nemico finale è un'Ombra — una versione
di lei che usa la sua stessa autoironia come arma contro di sé.
**Meccanica chiave**: "trova le differenze" tra lei e il riflesso (specchi,
stanza degli specchi). Ogni differenza trovata zittisce una frase dell'Ombra.
Il climax non è sconfiggere l'Ombra ma farla coincidere — l'Ombra sparisce
non perché eliminata ma perché non ha più motivo di esistere.
**Dado**: estratto dalle mani dell'Ombra. L'Ombra lo mostrava come "prova"
di incapacità, ma esaminandolo da vicino i "difetti" sono la firma di un
pezzo artigianale — non errori, autenticità.
**Stato**: concept definito, dettagli puzzle e storyboard da scrivere.

### Finale

Tutti e 3 i dadi si combinano nella camera (puzzle combinazione tipo
lucchetto). Si apre una scatola/forziere con il **messaggio personale di Luca**
— fuori dalla finzione narrativa del gioco. L'ultimo enigma è il più semplice
(aprire la finestra, guardarsi allo specchio senza distorsioni) a simboleggiare
che il vero ultimo passo non è complesso, è solo _scegliere di farlo_.

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
7. **Trova le differenze** — tra lei e il riflesso (Mondo 3)
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
- Fondali Mondo 2 (5-6 scene, ambientazione da definire)
- Fondali Mondo 3 (5-6 scene, stanza degli specchi)
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
- [ ] Mondo 2: design completo, storyboard, puzzle, asset, codice
- [ ] Mondo 3: design completo, storyboard, puzzle, asset, codice
- [ ] Finale: combinazione dadi + messaggio personale
- [ ] Asset protagonista (sprite statici)
- [ ] Audio ambientale per scene di gioco
- [ ] Scene generate da JS (non hardcoded in index.html) per scalabilità
- [ ] APK via Capacitor (post-completamento contenuti)
- [ ] Luca deve riscrivere `INTRO_LINES` in prologue.js con testo personale
- [ ] Decidere incisione sull'orologio da tasca (data/iniziali significative)
- [ ] Decidere numeri/simboli sulle facce dei 3 dadi per la combinazione finale

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

- Completare Mondo 1 (negozio + resa finale)
- Design e storyboard Mondo 2
- Generare asset Mondo 2

**Settimana 2** (15 → 22 luglio):

- Implementare Mondo 2 completo
- Design e storyboard Mondo 3
- Generare asset Mondo 3

**Settimana 3** (22 → 29 luglio):

- Implementare Mondo 3 completo
- Finale (combinazione dadi + messaggio)
- Polish: audio, transizioni, testing su tablet

**Ultimi giorni**:

- Build APK con Capacitor
- Test finale sul tablet target
- Luca scrive il messaggio personale finale

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
