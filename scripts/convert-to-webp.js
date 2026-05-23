const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGE_EXTS = [".png", ".jpg", ".jpeg"];
const ROOT = path.resolve(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "assets", "source", "images");
const OUTPUT_DIR = path.join(ROOT, "public", "images");

/** @type {Record<string, number>} */
const QUALITY_BY_BASENAME = {
  "hero-bg": 88,
  logo: 80,
  "AIAl-Embleme": 80,
};

function qualityFor(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  return QUALITY_BY_BASENAME[base] ?? 80;
}

async function convertFile(sourcePath) {
  const rel = path.relative(SOURCE_DIR, sourcePath);
  const outPath = path.join(OUTPUT_DIR, rel.replace(/\.[^.]+$/i, ".webp"));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await sharp(sourcePath)
    .webp({ quality: qualityFor(sourcePath) })
    .toFile(outPath);
  console.log(
    `✔ ${path.relative(ROOT, sourcePath)} → ${path.relative(ROOT, outPath)} (q=${qualityFor(sourcePath)})`,
  );
}

function walk(dir) {
  const tasks = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      tasks.push(...walk(full));
    } else if (IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
      tasks.push(convertFile(full));
    }
  }
  return tasks;
}

async function main() {
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ Source directory missing: ${SOURCE_DIR}`);
    process.exit(1);
  }
  const tasks = walk(SOURCE_DIR);
  if (tasks.length === 0) {
    console.warn("No images found in assets/source/images/");
    return;
  }
  await Promise.all(tasks);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
