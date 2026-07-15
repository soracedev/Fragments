# Storyboard — Finale: Cortile, Lavanderia, Epilogo

> ✅ **IMPLEMENTATO** nella Passata 5 (vedi `TODO-passate.md`). I due
> minigiochi sono resi "quasi simbolici" per rispettare la decisione di
> design §8.7 ("l'ultimo enigma è il più semplice"). Restano [SEGNAPOSTO]:
> la riflessione di Nox al risveglio e la dedica dei crediti (testi di Luca).

### "Fragments" — protagonista: Nox

> Sequenza raggiunta dopo aver concluso sia Nettuno (Mondo 1) sia Casa
> Familiare (Mondo 2), tornando al cancello. È il vero climax del gioco:
> risolve la "Stanza dei Dadi" prevista nel documento master (ora
> localizzata fisicamente qui, nella lavanderia) e dà finalmente uno scopo
> alle **chiavi lavanderia** raccolte a Fuori Casa.

---

## 0 · Mappa

```
Cancello (dopo aver concluso Mondo 1 e Mondo 2) → CORTILE DELLA NONNA
 │  hotspot: Fuori Casa · porta ingresso (flavor text, nessuno in casa)
 │           · Ingresso Lavanderia
 │
 └─→ CLOSEUP LAVANDERIA
       hotspot: Porta (richiede CHIAVI LAVANDERIA) · torna al Cortile
       │
       └─→ INTERNO LAVANDERIA
             LEI è qui. Dialogo automatico all'ingresso.
             hotspot dopo il dialogo: Tavolino (minigioco 1) ·
                                       Compressore (minigioco 2, richiede
                                       minigioco 1 completato)
             completati entrambi → set di dadi completo (D8/D10/D12/D%/D20)
             → nuovo dialogo con LEI → abbraccio → dissolvenza al nero
             → schermata crediti con dedica
```

---

## 1 · Cortile della Nonna

**Hotspot:**

- **Fuori Casa** — torna indietro
- **Porta ingresso casa della nonna**:

  > **NOX**
  > Non sembra esserci nessuno a casa.

  _(Resta un vicolo cieco narrativo per ora — possibile gancio per il filo
  ancora aperto su "nonno", se in futuro volete dargli un seguito. Non
  necessario per chiudere il gioco.)_

- **Ingresso Lavanderia** → Closeup Lavanderia

## 2 · Closeup Lavanderia

**Porta — senza chiavi lavanderia:**

> **NOX**
> Mi servono le chiavi per entrare.

**Porta — con chiavi lavanderia** → Interno Lavanderia

**Hotspot**: torna al Cortile.

## 3 · Interno Lavanderia — confronto finale con LEI

_(LEI è seduta sulla sedia. Il dialogo parte automaticamente all'ingresso.)_

> **NOX**
> E tu cosa ci fai qui? Allora sto veramente sognando?

> **LEI**
> Perché sei così ostinata? Nessuno può aiutarmi. Smettila.

> **NOX**
> Aiutando te sono già tornata a casa mia una volta. Posso capire come ti senti.

> **LEI**
> NO CHE NON PUOI CAPIRE!

> **LEI**
> Non riesco mai a farne una giusta. Sono una buona a nulla che ha solo
> buttato il suo tempo nel niente.

> **NOX**
> Non è vero. Guarda questi dadi — sono opera tua. A me sembrano bellissimi.

> **LEI**
> Sono imperfetti, inutili. Anche LUI mi vede così. Anche io mi vedo così.

> **NOX**
> Ti dimostrerò che ti sbagli. Finirò quello che hai iniziato.

> **LEI**
> È inutile. Non ci riuscirai mai.

_(Si sbloccano gli hotspot: Tavolino, Compressore.)_

**Tavolino — senza stampo completo:**

> **NOX**
> Penso mi serva prima qualcosa da poterci mettere dentro.

**Compressore — prima di aver completato il tavolino:** stesso
comportamento, bloccato/non disponibile finché il minigioco 1 non è
completato.

---

## 4 · Minigioco 1 — Tavolino (dosaggio + colore)

**Meccanica proposta** (riusa pattern già validati altrove nel gioco):

- **Due slider** per i componenti A e B della resina — il giocatore deve
  portarli a un rapporto corretto (stessa logica di precisione a due
  valori già usata per l'orologio a Nettuno, qui il target è un rapporto
  invece di un orario)
- **Contagocce cliccabile** per il colore — ogni click aggiunge una goccia,
  con feedback visivo immediato (la resina nello stampo cambia tonalità)
- Completato il dosaggio corretto + colore aggiunto → stampo pronto,
  sbloccato l'uso del Compressore

## 5 · Minigioco 2 — Compressore

**Meccanica proposta**: riuso diretto del **gauge da correggere** già
progettato per la stampante 3D di Casa Familiare — un indicatore di
pressione con zona verde, il giocatore clicca di tanto in tanto per
tenerlo lì, il progresso rallenta se esce dalla zona ma **non fallisce
mai**. Stessa filosofia di difficoltà bassa applicata ovunque nel gioco.

_(Nota: entrambi i minigiochi producono in un solo passaggio l'intero set
rimanente — D8, D10, D12, D%, D20 — non uno per volta ripetuto cinque
volte. Risolve la domanda che era rimasta aperta nel documento master su
"batch vs ripetizione".)_

---

## 6 · Dialogo finale con LEI

_(Nox torna da LEI con il set completo.)_

> **NOX**
> Guarda, questi sono i restanti dadi.

> **LEI**
> Sono imperfetti. Non valgono niente. Come me.

> **NOX**
> Non è vero. E lo sai anche tu, in fondo.

> **LEI**
> Non lo so più. Ho smesso di crederci da tempo.

> **NOX**
> Io no. Io ci credo ancora.

> **LEI**
> Perché continui a insistere con me?

> **NOX**
> Perché tu sei quella parte di me che ha smesso di crederci. Ma non sei
> un errore da correggere.

> **LEI**
> ...quindi sono solo questo? Un promemoria di tutto ciò che c'è di
> sbagliato?

> **NOX**
> No. Ti sei fatta carico di tutta la tristezza, delle ferite del passato.
> Hai accumulato le mie paure, le mie insicurezze — e io, nel frattempo,
> mi sono lasciata andare.

> **LEI**
> Quindi servo solo a questo. Sono un ostacolo. Qualcosa da eliminare.

> **NOX**
> No. Sei la motivazione che mi spinge ad andare avanti, a migliorare. Mi
> ricordi la parte più negativa di me — ma non devo vederti come un male.
> Sei un'impronta di ciò che sono.

> **NOX**
> Devo accettare la tua presenza. Capire che non si nasce già capaci di
> qualcosa — lo si diventa. Ed è anche grazie a te, se ci sto arrivando.

_(silenzio lungo)_

> **LEI**
> Anche se lo accettassi... non sparirò. Resterò comunque qui.

> **NOX**
> Lo so. E va bene così.

> **NOX**
> Non voglio farti sparire. Voglio solo che tu smetta di parlare più forte
> di tutto il resto.

> **LEI**
> E se un giorno tornassi a urlare come prima?

> **NOX**
> Allora ti ascolterò di nuovo. E ti risponderò di nuovo, come sto facendo
> ora.

> **LEI** _(la voce trema, per la prima volta senza difendersi)_
> Non so se sono pronta a crederci davvero.

> **NOX**
> Non serve crederci subito. Basta provarci. Un po' alla volta — come con
> l'orologio.

_(Nota di continuità: il richiamo all'orologio riporta al primissimo
incontro con LEI a Nettuno — un callback silenzioso, il giocatore che ha
fatto tutto il percorso lo riconosce da solo, non va spiegato.)_

_(LEI si alza dalla sedia. Si avvicina. Le due si abbracciano.)_

_(Dissolvenza al nero.)_

---

## 7 · Epilogo

Schermata nera. Dedica personale di Luca a Desy — testo suo, fuori dalla
finzione narrativa del gioco. _(Vedi anche la riflessione interna di Nox
al risveglio, ancora da scrivere, prevista subito prima di questa
schermata secondo il documento master — va deciso se resta un passaggio
separato o si fonde direttamente in questa schermata finale.)_

---

## 8 · Fili risolti da questo aggiornamento

- **Chiavi lavanderia**: avevano un uso non specificato — ora aprono
  esattamente questa sequenza
- **"Stanza dei Dadi"** (prevista nel documento master come luogo
  astratto del finale): ora ha una collocazione fisica precisa,
  l'Interno Lavanderia
- **Batch vs ripetizione del minigioco dadi**: risolto, è un unico
  passaggio che produce tutti e 5 i dadi rimanenti insieme

## 9 · Note aperte

- **Cartella asset**: da definire — segue la convenzione `CittaFerma`
  (sorella di `images/`) o `casaFamiliare` (annidata)? Servono nuovi nomi:
  `cortile-nonna.jpg`, `closeup-lavanderia.jpg`, `interno-lavanderia.jpg`,
  `closeup-compressore.jpg`, più gli sprite del minigioco resina
- **Filo "nonno"**: ancora senza seguito — la porta di casa della nonna
  resta un vicolo cieco puramente atmosferico
- **Riflessione di Nox al risveglio**: ancora da scrivere (segnalata anche
  nel documento del Mondo 2) — va capito se precede questa schermata o si
  fonde con essa
- ~~Continuazione del dialogo finale: bozza~~ — **confermato, sezione 6
  ora contiene il testo definitivo** (tema corretto: valore di sé,
  non perfezionismo). Unica riga di sintesi mia da rivalutare se non
  suona tua: _"Ed è anche grazie a te, se ci sto arrivando."_
