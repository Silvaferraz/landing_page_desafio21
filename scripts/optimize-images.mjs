import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

const QUALITY = 80;

const imagesToResize = {
  'selenaRossi.webp': 1200,
  'selenaRossi2.webp': 600,
  'rafaelFalk.webp': 600,
  'instagram.webp': 56,
  'logo_selenaRossi.webp': 180,
  'hero-bg-lines.webp': 1920,
  'hero-bg-lines1.webp': 1920,
  'logo1.webp': 1600,
};

const imagesToCompress = [
  'logo_rafaelFalk.webp',
  'logo6.webp',
  'whatsapp.webp',
  'icone1.webp',
  'icone2.webp',
  'icone3.webp',
  'icone4.webp',
  'hero-avatar-1.jpg',
  'hero-avatar-2.jpg',
  'hero-avatar-3.jpg',
];

const missingImages = [
  {
    name: 'favicon-32x32.png',
    source: 'favicon.svg',
    width: 32,
    height: 32,
  },
  {
    name: 'apple-touch-icon.png',
    source: 'favicon.svg',
    width: 180,
    height: 180,
  },
  {
    name: 'og-image.jpg',
    source: 'logo1.webp',
    width: 1200,
    height: 630,
  },
];

let totalSaved = 0;
let totalOriginal = 0;

async function getFileSize(filePath) {
  try {
    const stat = await fs.promises.stat(filePath);
    return stat.size;
  } catch {
    return 0;
  }
}

async function optimizeImage(filename, maxWidth) {
  const inputPath = path.join(IMAGES_DIR, filename);
  const ext = path.extname(filename).toLowerCase();
  const originalSize = await getFileSize(inputPath);
  if (originalSize === 0) {
    console.log(`  [SKIP] ${filename} - not found`);
    return;
  }

  totalOriginal += originalSize;

  const inputBuffer = await fs.promises.readFile(inputPath);
  let pipeline = sharp(inputBuffer);

  const metadata = await pipeline.metadata();

  if (maxWidth && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const outputFormat = ext === '.jpg' ? 'jpeg' : 'webp';

  if (outputFormat === 'jpeg') {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  } else {
    pipeline = pipeline.webp({ quality: QUALITY });
  }

  const outputBuffer = await pipeline.toBuffer();

  const tmpDir = path.join(__dirname, '..', 'tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
  const tmpPath = path.join(tmpDir, filename);
  fs.writeFileSync(tmpPath, outputBuffer);

  let success = false;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      execSync(`Remove-Item -LiteralPath "${inputPath}" -Force -ErrorAction Stop; Copy-Item -LiteralPath "${tmpPath}" -Destination "${inputPath}" -Force`, { shell: 'powershell', timeout: 10000 });
      success = true;
      break;
    } catch {
      if (attempt < 4) {
        execSync(`Start-Sleep -Milliseconds 1000`, { shell: 'powershell' });
      }
    }
  }

  if (!success) {
    console.log(`  [FAIL] ${filename} - could not replace file (locked)`);
    return;
  }

  fs.unlinkSync(tmpPath);

  const newSize = await getFileSize(inputPath);
  const saved = originalSize - newSize;
  totalSaved += saved;
  const pct = ((saved / originalSize) * 100).toFixed(1);
  console.log(
    `  [OK] ${filename} - ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${pct}% reduction)`
  );
}

async function generateMissingImage(config) {
  const ext = path.extname(config.name);
  const isJpg = ext === '.jpg' || ext === '.jpeg';
  const outputPath = path.join(PUBLIC_DIR, config.name);

  if (fs.existsSync(outputPath)) {
    console.log(`  [SKIP] ${config.name} - already exists`);
    return;
  }

  let sourcePath = path.join(IMAGES_DIR, config.source);
  if (!fs.existsSync(sourcePath)) {
    sourcePath = path.join(PUBLIC_DIR, config.source);
  }
  if (!fs.existsSync(sourcePath)) {
    console.log(`  [SKIP] ${config.name} - source not found`);
    return;
  }

  const sourceSize = await getFileSize(sourcePath);
  totalOriginal += sourceSize;

  let pipeline = sharp(sourcePath).resize(config.width, config.height, {
    fit: 'contain',
    background: isJpg ? { r: 255, g: 255, b: 255, alpha: 1 } : { r: 0, g: 0, b: 0, alpha: 0 },
  });

  if (isJpg) {
    pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });
  } else {
    pipeline = pipeline.png();
  }

  await pipeline.toFile(outputPath);

  const newSize = await getFileSize(outputPath);
  const saved = Math.max(0, sourceSize - newSize);
  totalSaved += saved;
  console.log(`  [GEN] ${config.name} - created (${formatBytes(newSize)})`);
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function main() {
  console.log('=== Image Optimization ===\n');

  console.log('1. Resizing + compressing large images...');
  for (const [filename, maxWidth] of Object.entries(imagesToResize)) {
    await optimizeImage(filename, maxWidth);
  }

  console.log('\n2. Compressing remaining images...');
  for (const filename of imagesToCompress) {
    await optimizeImage(filename);
  }

  console.log('\n3. Generating missing images...');
  for (const img of missingImages) {
    await generateMissingImage(img);
  }

  const finalSaved = totalOriginal - (totalOriginal - totalSaved);
  console.log(`\n=== Summary ===`);
  console.log(`Total original size: ${formatBytes(totalOriginal)}`);
  console.log(`Total saved: ${formatBytes(totalSaved)} (${((totalSaved / totalOriginal) * 100).toFixed(1)}% reduction)`);
}

main().catch(console.error);
