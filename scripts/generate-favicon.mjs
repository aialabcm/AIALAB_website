import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function generateFavicon() {
  const input = join(root, 'public', 'images', 'AIAl-Embleme.webp');
  
  // Generate 32x32 PNG for ICO
  const png32 = await sharp(input)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // Generate 16x16 PNG for ICO  
  const png16 = await sharp(input)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  // Build ICO file manually (ICO format)
  const ico = buildIco([png16, png32], [16, 32]);
  
  writeFileSync(join(root, 'src', 'app', 'favicon.ico'), ico);
  console.log('✅ favicon.ico generated successfully!');
  
  // Also generate apple-touch-icon (180x180)
  await sharp(input)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(join(root, 'src', 'app', 'apple-icon.png'));
  console.log('✅ apple-icon.png generated successfully!');

  // Generate icon.png (32x32) as well for modern browsers
  await sharp(input)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(join(root, 'src', 'app', 'icon.png'));
  console.log('✅ icon.png generated successfully!');
}

function buildIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;
  
  let offset = headerSize + dirSize;
  const entries = [];
  
  for (let i = 0; i < numImages; i++) {
    entries.push({
      size: sizes[i],
      data: pngBuffers[i],
      offset: offset,
    });
    offset += pngBuffers[i].length;
  }
  
  const totalSize = offset;
  const buffer = Buffer.alloc(totalSize);
  
  // ICO Header
  buffer.writeUInt16LE(0, 0);      // Reserved
  buffer.writeUInt16LE(1, 2);      // Type: ICO
  buffer.writeUInt16LE(numImages, 4); // Number of images
  
  // Directory entries
  for (let i = 0; i < numImages; i++) {
    const e = entries[i];
    const pos = headerSize + i * dirEntrySize;
    buffer.writeUInt8(e.size === 256 ? 0 : e.size, pos);     // Width
    buffer.writeUInt8(e.size === 256 ? 0 : e.size, pos + 1); // Height
    buffer.writeUInt8(0, pos + 2);           // Color palette
    buffer.writeUInt8(0, pos + 3);           // Reserved
    buffer.writeUInt16LE(1, pos + 4);        // Color planes
    buffer.writeUInt16LE(32, pos + 6);       // Bits per pixel
    buffer.writeUInt32LE(e.data.length, pos + 8);  // Data size
    buffer.writeUInt32LE(e.offset, pos + 12);      // Data offset
  }
  
  // Image data
  for (const e of entries) {
    e.data.copy(buffer, e.offset);
  }
  
  return buffer;
}

generateFavicon().catch(console.error);
