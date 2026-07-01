import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg'];
const ROOT = path.resolve(__dirname, '..');
const TARGET_DIR = path.join(ROOT, 'public', 'images');

const QUALITY_BY_BASENAME = {
  'hero-bg': 88,
  logo: 80,
  'AIAl-Embleme': 80,
  'about-hero-studio': 82,
};

function qualityFor(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  return QUALITY_BY_BASENAME[base] ?? 80;
}

async function convertFile(sourcePath) {
  const ext = path.extname(sourcePath);
  const outPath = sourcePath.substring(0, sourcePath.length - ext.length) + '.webp';
  
  // If the webp file already exists, skip it
  if (fs.existsSync(outPath)) {
    return;
  }
  
  try {
    await sharp(sourcePath)
      .webp({ quality: qualityFor(sourcePath) })
      .toFile(outPath);
      
    console.log(`✔ Converted: ${path.relative(ROOT, sourcePath)} → ${path.relative(ROOT, outPath)} (q=${qualityFor(sourcePath)})`);
  } catch (err) {
    console.error(`❌ Failed to convert ${sourcePath}:`, err.message);
  }
}

function walk(dir) {
  const tasks = [];
  if (!fs.existsSync(dir)) return tasks;
  
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
  console.log(`Scanning public/images directory: ${TARGET_DIR}`);
  const tasks = walk(TARGET_DIR);
  if (tasks.length === 0) {
    console.log('No new images to convert in public/images/');
    return;
  }
  console.log(`Found ${tasks.length} candidate images. Checking and converting...`);
  await Promise.all(tasks);
  console.log('All image conversions checked/finished!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
