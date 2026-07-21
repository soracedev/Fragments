// One-off: downscale (<=1280px wide) + WebP q80 the full-screen backgrounds.
// Keeps originals in assets-src/, rewrites references, removes unused junk.
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = 'C:/Users/Amministratore/Desktop/ProgettiFE/fragments/fragments-project/fragments';
const IMG = path.join(ROOT, 'public/assets/images');
const SRC_BACKUP = path.join(ROOT, 'assets-src/images');

const MAX_W = 1280;
const Q_DEFAULT = 80;
const Q_HIGH = 90; // per immagini con testo/numeri leggibili

// Sfondi a schermo intero (relativi a public/assets/images). Sprite esclusi.
const BG = [
  'CittaFerma/piazza.png',
  'CittaFerma/piazza-2.png',
  'CittaFerma/piazza-3.png',
  'CittaFerma/piazza-nettuno.png',
  'CittaFerma/piazza-nettuno-2.png',
  'CittaFerma/vicolo.png',
  'CittaFerma/spiaggia.png',
  'CittaFerma/spiaggia-2.png',
  'CittaFerma/casa-soggiorno.png',
  'CittaFerma/casa-bagno.png',
  'CittaFerma/casa-bagno-2.png',
  'CittaFerma/closeup-specchio.png',
  'CittaFerma/closeup-specchio-numero.png',
  'CittaFerma/saracinesca-meccanismo.png',
  'CittaFerma/wallsafe.png',
  'casa/fuori-casa.png',
  'casa/closeup-auto.png',
  'casa/closeup-cancello.png',
  'casa/cortile-nonna.jpeg',
  'casa/closup-lavanderia.jpeg',
  'casa/closup-compressore.jpeg',
  'casa/interno-lavanderia.png',
  'casa/abbraccio-finale.png',
  'casaFamiliare/soggiorno.png',
  'casaFamiliare/camera-da-letto.png',
  'casaFamiliare/giardino.png',
  'casaFamiliare/closup-pc.png',
  'casaFamiliare/closup-stampante.png',
  'camera.png',
  'title-bg.png',
];

const HIGH_Q = new Set(['CittaFerma/closeup-specchio-numero.png']);

const JUNK = [
  'CittaFerma/piazza-nettuno_old.png',
  'camera_old.png',
  'casaFamiliare/camera-da-letto_old.png',
  'casa/abbraccio-finale-old.png',
  'title-bg_test.png',
  'casa/interno-lavanderia_old.jpeg',
  'old-d.png',
];

const REWRITE_FILES = [
  path.join(ROOT, 'index.html'),
];

async function robustUnlink(p) {
  for (let i = 0; i < 6; i++) {
    try { await fs.chmod(p, 0o666).catch(() => {}); await fs.unlink(p); return true; }
    catch (e) { if (e.code === 'ENOENT') return true; await new Promise(r => setTimeout(r, 400)); }
  }
  console.warn(`  ! could not unlink (locked): ${p}`);
  return false;
}

async function exists(p) { try { await fs.stat(p); return true; } catch { return false; } }

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

async function main() {
  // src JS/CSS files to rewrite too
  for (const f of await walk(path.join(ROOT, 'src'))) {
    if (/\.(js|css)$/.test(f)) REWRITE_FILES.push(f);
  }

  const replacements = []; // [fromExtless.ext, toWebp]
  let before = 0, after = 0;

  for (const rel of BG) {
    const abs = path.join(IMG, rel);
    const relWebp = rel.replace(/\.(png|jpe?g)$/i, '.webp');
    const absWebp = path.join(IMG, relWebp);
    const backup = path.join(SRC_BACKUP, rel);

    // Reference rewrite must happen regardless of resume state.
    replacements.push([`assets/images/${rel}`, `assets/images/${relWebp}`]);

    const hasOrig = await exists(abs);
    const hasWebp = await exists(absWebp);

    if (!hasOrig && hasWebp) { // already done on a previous run
      const stW = await fs.stat(absWebp); after += stW.size;
      console.log(`${rel.padEnd(42)} (già fatto)`);
      continue;
    }

    const st = await fs.stat(abs);
    before += st.size;

    // backup original (skip if already backed up)
    await fs.mkdir(path.dirname(backup), { recursive: true });
    if (!await exists(backup)) await fs.copyFile(abs, backup);

    const q = HIGH_Q.has(rel) ? Q_HIGH : Q_DEFAULT;
    if (!hasWebp) {
      await sharp(abs)
        .resize({ width: MAX_W, withoutEnlargement: true })
        .webp({ quality: q })
        .toFile(absWebp);
    }

    const stW = await fs.stat(absWebp);
    after += stW.size;
    await robustUnlink(abs); // remove original from public so APK shrinks

    console.log(`${rel.padEnd(42)} ${(st.size/1024|0).toString().padStart(5)}KB -> ${(stW.size/1024|0).toString().padStart(4)}KB  q${q}`);
  }

  // rewrite references
  let refCount = 0;
  for (const f of REWRITE_FILES) {
    let txt = await fs.readFile(f, 'utf8');
    let n = 0;
    for (const [from, to] of replacements) {
      const parts = txt.split(from);
      if (parts.length > 1) { n += parts.length - 1; txt = parts.join(to); }
    }
    if (n) { await fs.writeFile(f, txt); refCount += n; console.log(`refs: ${n} in ${path.relative(ROOT, f)}`); }
  }

  // delete junk
  let junkBytes = 0;
  for (const rel of JUNK) {
    const abs = path.join(IMG, rel);
    if (await exists(abs)) { const st = await fs.stat(abs); junkBytes += st.size; await robustUnlink(abs); console.log(`junk removed: ${rel}`); }
    else console.log(`junk missing (skip): ${rel}`);
  }

  console.log(`\nBackgrounds: ${(before/1048576).toFixed(1)}MB -> ${(after/1048576).toFixed(1)}MB`);
  console.log(`Junk removed: ${(junkBytes/1048576).toFixed(1)}MB`);
  console.log(`Total references rewritten: ${refCount}`);
}

main().catch(e => { console.error(e); process.exit(1); });
