# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Fragments — Il Tempo Fermo**: a narrative point-and-click game (Italian language) built as a personal gift. Vanilla JS + Vite, no framework — this is a deliberate decision (see `docs/ProgettoCompleto.md` §4); do not introduce React or a game engine. Deploy target is web (Vercel) and eventually an Android APK via Capacitor.

## Commands

```bash
npm run dev          # dev server at http://localhost:5173
npm run build        # production build to dist/
npm run preview      # preview the production build
```

There are no tests or linters configured.

## Architecture

The game is a single HTML page (`index.html`) containing all scenes, puzzle overlays, and UI as static markup. Scenes are `<div class="scene" data-scene="...">` blocks toggled by the engine; hotspots are positioned `<button class="hotspot" data-action="...">` elements. JS modules attach behavior:

- `src/state.js` — the single shared game-state object `S` (scene, flags, inventory, dice, warmth) plus localStorage save/load. All modules import `S` from here; never keep local copies of state. Call `writeSave()` after mutating `S`.
- `src/engine.js` — reusable core, rarely changed: scene switching (`show`), hotspot visibility (`setHS`), narration (`say`), the dialogue queue (`speak`), dialogue-line builders (`P` = protagonist, `L` = Lei/Nettuno, `SG` = stage direction, `FX` = fox action), parallax, dust particles, warmth tinting (`setWarmth`).
- `src/worlds/*.js` — one module per world/chapter. Each defines an `ACTIONS` map from `data-action` names to handlers, a world-specific `refreshHotspots()` that shows/hides hotspots based on `S.flags`, and dialogue content. A single delegated click listener on `#stage` (in `mondo1.js`) dispatches hotspot clicks.
- `src/puzzles/*.js` — one module per puzzle type. Each exports `openX()` (show overlay) and `initX()` (wire listeners, called once from `main.js`). On solve: set flags, `addItem()`, `writeSave()`, then hand control back to the world.
- `src/inventory.js` — `ITEM_DB` object database + backpack UI. New collectible items are added to `ITEM_DB` and granted via `addItem(id)`.
- `src/main.js` — entry point: initializes every module, then title screen / continue / options.

Cross-module callbacks that would create circular imports go through `window.__refreshHotspots` and `window.__onClockDone` (puzzles → world bridge).

**To add a new world**: create `src/worlds/mondoN.js` (actions + dialogues + its own hotspot refresh), add scene markup/assets, register items in `ITEM_DB`, and init it from `main.js`.

## Design docs — read before writing content

`docs/` holds the authoritative design documents (in Italian):

- `ProgettoCompleto.md` — full project doc: narrative structure (3 worlds + finale), puzzle design principles, dependency chains, roadmap, and **§8 fixed design decisions** (e.g. the fox NEVER speaks — stage directions only; no motivational rhetoric in dialogue; linear between worlds with backtracking only inside a world; the final puzzle must be the easiest).
- `BibbiaPersonaggio.md` — character bible: the protagonist's voice and rhythm rules. All new dialogue must follow it.
- `Storyboard prologo mondo1.md` — beat-by-beat storyboard of what's implemented so far.

All in-game text is Italian. Match the existing tone: ironic/defensive protagonist, understated, no pathos.

## Assets

Backgrounds and closeups go in `public/assets/images/`, audio in `public/assets/audio/`; expected filenames are listed in `README.md`. Scene backgrounds are referenced from inline `style` attributes in `index.html`.
