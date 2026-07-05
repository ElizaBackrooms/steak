#!/usr/bin/env node
/**
 * Build 200 unique Steak Cut NFT images (no text) from 5 level bases.
 * Serial 1–5 = levels 1–5, then cycles (40 variants per level).
 *
 * Usage: node scripts/generate-nft-cuts.mjs
 */

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const BASES_DIR = path.join(ROOT, "assets", "bases");
const OUT_DIRS = [
  path.join(ROOT, "assets", "nft-cuts"),
  path.join(ROOT, "web", "public", "cuts", "serial"),
];

const SIZE = 1024;
const WORK = 1280;
const SUPPLY = 200;
const LEVEL_COUNT = 5;

const BASE_FILES = {
  1: "base-level-1-sirloin.png",
  2: "base-level-2-ribeye.png",
  3: "base-level-3-brisket.png",
  4: "base-level-4-porterhouse.png",
  5: "base-level-5-prime.png",
};

function levelForSerial(serial) {
  return ((serial - 1) % LEVEL_COUNT) + 1;
}

function variantIndex(serial) {
  return Math.floor((serial - 1) / LEVEL_COUNT);
}

function variantParams(variant) {
  const s = variant + 1;
  return {
    rotate: ((s * 17) % 11) - 5,
    flip: s % 4 === 0,
    brightness: 0.9 + ((s * 3) % 21) / 100,
    saturation: 0.88 + ((s * 5) % 25) / 100,
    hue: ((s * 11) % 31) - 15,
    zoom: 1.03 + ((s * 7) % 12) / 100,
    offsetX: ((s * 13) % 120) - 60,
    offsetY: ((s * 19) % 120) - 60,
    sharpen: 0.4 + ((s * 23) % 8) / 10,
  };
}

async function loadBase(level) {
  const file = path.join(BASES_DIR, BASE_FILES[level]);
  return sharp(file).resize(WORK, WORK, { fit: "cover" }).toBuffer();
}

async function renderVariant(baseBuffer, variant) {
  const p = variantParams(variant);
  let img = sharp(baseBuffer);

  if (p.flip) {
    img = img.flop();
  }

  const zoomed = Math.round(WORK * p.zoom);
  const maxLeft = Math.max(0, zoomed - SIZE);
  const maxTop = Math.max(0, zoomed - SIZE);
  const left = Math.min(maxLeft, Math.max(0, Math.round(maxLeft / 2 + p.offsetX)));
  const top = Math.min(maxTop, Math.max(0, Math.round(maxTop / 2 + p.offsetY)));

  return img
    .resize(zoomed, zoomed, { fit: "cover" })
    .extract({ left, top, width: SIZE, height: SIZE })
    .rotate(p.rotate, { background: { r: 12, g: 10, b: 9 } })
    .modulate({
      brightness: p.brightness,
      saturation: p.saturation,
      hue: p.hue,
    })
    .sharpen(p.sharpen)
    .jpeg({ quality: 92, mozjpeg: true })
    .toBuffer();
}

async function main() {
  const baseCache = new Map();

  for (const dir of OUT_DIRS) {
    await fs.mkdir(dir, { recursive: true });
    const existing = await fs.readdir(dir);
    await Promise.all(
      existing
        .filter((f) => f.endsWith(".png") || f.endsWith(".jpg"))
        .map((f) => fs.unlink(path.join(dir, f))),
    );
  }

  for (let serial = 1; serial <= SUPPLY; serial++) {
    const level = levelForSerial(serial);
    const variant = variantIndex(serial);

    if (!baseCache.has(level)) {
      baseCache.set(level, await loadBase(level));
    }

    const png = await renderVariant(baseCache.get(level), variant);
    const name = `${String(serial).padStart(3, "0")}.jpg`;

    await Promise.all(OUT_DIRS.map((dir) => fs.writeFile(path.join(dir, name), png)));

    if (serial % 20 === 0 || serial === SUPPLY) {
      console.log(`Generated ${serial}/${SUPPLY}`);
    }
  }

  console.log(`Done — ${SUPPLY} images in assets/nft-cuts/ and web/public/cuts/serial/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
