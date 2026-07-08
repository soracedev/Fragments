# Fragments — Il Tempo Fermo

## Setup

```bash
npm install
npm run dev
```

Apri `http://localhost:5173` nel browser.

## Deploy

Collega la repo a [Vercel](https://vercel.com) — deploy automatico a ogni push.

## Struttura

```
├── index.html                 ← markup (scene, hotspot, UI)
├── src/
│   ├── main.js                ← entry point, title screen, opzioni
│   ├── engine.js              ← motore: scene, dialoghi, parallax
│   ├── state.js               ← stato di gioco + salvataggio
│   ├── inventory.js           ← sistema zaino
│   ├── style.css              ← tutti gli stili
│   ├── puzzles/
│   │   ├── clock.js           ← enigma orologio
│   │   └── gears.js           ← enigma ingranaggi
│   └── worlds/
│       ├── prologue.js        ← prologo + intro
│       └── mondo1.js          ← Nettuno (azioni, dialoghi, NPC)
└── public/
    └── assets/
        ├── images/            ← immagini di gioco (.png)
        └── audio/             ← musica (.mp3)
```

## Dove mettere gli asset

Le immagini vanno in `public/assets/images/` con questi nomi:

| File                    | Scena                           |
| ----------------------- | ------------------------------- |
| `title-bg.png`          | Sfondo title screen (Fragments) |
| `camera.png`            | Camera da letto (hub)           |
| `piazza.png`            | Piazza di Nettuno               |
| `vicolo.png`            | Vicolo con saracinesca          |
| `enigma-ingranaggi.png` | Closeup meccanismo saracinesca  |
| `enigma-orologio.png`   | Closeup orologio di Nettuno     |

L'audio va in `public/assets/audio/`:

| File        | Uso                 |
| ----------- | ------------------- |
| `theme.mp3` | Musica title screen |
