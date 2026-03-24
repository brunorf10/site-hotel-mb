/**
 * Script de Otimização de Imagens — Hotel Maria Bastos
 * 
 * Uso: node scripts/optimize-images.mjs
 * 
 * Lê as imagens originais de public/images/ e gera versões otimizadas:
 * - WebP comprimido
 * - 3 tamanhos: desktop, tablet, mobile
 * - Corte automático de acordo com o aspect ratio da seção
 * 
 * Estrutura de saída: public/images/optimized/
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_BASE = 'public/images';
const OUTPUT_BASE = 'public/images/optimized';

// Configurações de qualidade
const WEBP_QUALITY = 80;
const JPG_QUALITY = 85;

// Definição de tamanhos por breakpoint
const SIZES = {
  desktop: { suffix: 'lg', maxWidth: 1920 },
  tablet:  { suffix: 'md', maxWidth: 1024 },
  mobile:  { suffix: 'sm', maxWidth: 640 },
};

// Configuração por seção do site
const SECTION_CONFIG = {
  hero: {
    aspectRatio: 16 / 9,
    sizes: {
      desktop: { width: 1920, height: 1080 },
      tablet:  { width: 1024, height: 576 },
      mobile:  { width: 640, height: 860 },  // Mobile é mais alto (quase full-screen)
    },
  },
  apartamentos: {
    principal: {
      aspectRatio: 16 / 9,
      sizes: {
        desktop: { width: 1200, height: 675 },
        tablet:  { width: 800, height: 450 },
        mobile:  { width: 640, height: 360 },
      },
    },
    thumbnail: {
      aspectRatio: 1,
      sizes: {
        desktop: { width: 300, height: 300 },
        tablet:  { width: 200, height: 200 },
        mobile:  { width: 150, height: 150 },
      },
    },
  },
  eventos: {
    banner: {
      aspectRatio: 16 / 9,
      sizes: {
        desktop: { width: 1920, height: 1080 },
        tablet:  { width: 1024, height: 576 },
        mobile:  { width: 640, height: 360 },
      },
    },
    card: {
      aspectRatio: 3 / 4,
      sizes: {
        desktop: { width: 600, height: 800 },
        tablet:  { width: 400, height: 533 },
        mobile:  { width: 640, height: 450 },  // Mobile muda para landscape
      },
    },
  },
  galeria: {
    // Galeria mantém proporção original, só redimensiona
    sizes: {
      desktop: { maxWidth: 800 },
      tablet:  { maxWidth: 600 },
      mobile:  { maxWidth: 400 },
    },
  },
  restaurante: {
    sizes: {
      desktop: { width: 800, height: 600 },
      tablet:  { width: 600, height: 450 },
      mobile:  { width: 400, height: 300 },
    },
  },
};

// ─── Funções auxiliares ─────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => 
    /\.(jpg|jpeg|png|webp|tiff|bmp|dng|heic|heif|arw)$/i.test(f)
  );
}

function getBaseName(filename) {
  return path.parse(filename).name;
}

// Rastreamento global de arquivos com erro
const skippedFiles = [];

async function processImage(inputPath, outputDir, config, baseName) {
  const results = [];

  for (const [breakpoint, sizeConfig] of Object.entries(config)) {
    const outputName = `${baseName}-${SIZES[breakpoint]?.suffix || breakpoint}`;
    
    let pipeline = sharp(inputPath).rotate(); // .rotate() aplica orientação EXIF automaticamente
    const metadata = await sharp(inputPath).metadata();

    if (sizeConfig.width && sizeConfig.height) {
      // Crop para aspect ratio específico + resize
      pipeline = pipeline.resize(sizeConfig.width, sizeConfig.height, {
        fit: 'cover',
        position: 'center',
      });
    } else if (sizeConfig.maxWidth) {
      // Só redimensiona mantendo proporção
      if (metadata.width > sizeConfig.maxWidth) {
        pipeline = pipeline.resize(sizeConfig.maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }
    }

    // Gerar WebP
    const webpOutput = path.join(outputDir, `${outputName}.webp`);
    await pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(webpOutput);
    results.push(webpOutput);

    // Gerar JPG fallback
    const jpgOutput = path.join(outputDir, `${outputName}.jpg`);
    await pipeline.clone().jpeg({ quality: JPG_QUALITY, progressive: true }).toFile(jpgOutput);
    results.push(jpgOutput);
  }

  return results;
}

// Wrapper com try/catch para processar imagem com tolerância a erros
async function safeProcessImage(inputPath, outputDir, config, baseName, context) {
  try {
    return await processImage(inputPath, outputDir, config, baseName);
  } catch (err) {
    const ext = path.extname(inputPath).toUpperCase();
    console.log(`    ⚠️  PULADO: ${context} — formato ${ext} não suportado pelo sharp`);
    console.log(`       Erro: ${err.message.split('\n')[0]}`);
    skippedFiles.push({ file: context, format: ext, error: err.message.split('\n')[0] });
    return [];
  }
}

// ─── Processamento por seção ────────────────────────────────────────

async function processHero() {
  const dir = path.join(INPUT_BASE, 'hero');
  const files = getImageFiles(dir);
  if (files.length === 0) { console.log('⏭️  hero/ — nenhuma imagem encontrada'); return; }

  const outDir = path.join(OUTPUT_BASE, 'hero');
  ensureDir(outDir);

  for (const file of files) {
    const baseName = getBaseName(file);
    console.log(`  🖼️  hero/${file}`);
    await safeProcessImage(
      path.join(dir, file),
      outDir,
      SECTION_CONFIG.hero.sizes,
      baseName,
      `hero/${file}`
    );
  }
  console.log('✅ hero/ processado');
}

async function processApartamentos() {
  const baseDir = path.join(INPUT_BASE, 'apartamentos');
  const categories = ['simples', 'duplo', 'casal', 'triplo', 'master', 'master-luxo', 'acessibilidade'];

  for (const cat of categories) {
    const dir = path.join(baseDir, cat);
    const files = getImageFiles(dir);
    if (files.length === 0) { console.log(`⏭️  apartamentos/${cat}/ — nenhuma imagem`); continue; }

    const outDir = path.join(OUTPUT_BASE, 'apartamentos', cat);
    ensureDir(outDir);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const baseName = getBaseName(file);
      console.log(`  🖼️  apartamentos/${cat}/${file}`);

      // Primeira imagem = principal (16:9), restantes = thumbnails (1:1 + 16:9)
      const config = i === 0
        ? SECTION_CONFIG.apartamentos.principal.sizes
        : SECTION_CONFIG.apartamentos.principal.sizes;

      await safeProcessImage(path.join(dir, file), outDir, config, baseName, `apartamentos/${cat}/${file}`);

      // Gerar thumbnail quadrado para todas as imagens
      const thumbDir = path.join(outDir, 'thumbs');
      ensureDir(thumbDir);
      await safeProcessImage(
        path.join(dir, file),
        thumbDir,
        SECTION_CONFIG.apartamentos.thumbnail.sizes,
        baseName,
        `apartamentos/${cat}/${file} (thumb)`
      );
    }
    console.log(`✅ apartamentos/${cat}/ processado`);
  }
}

async function processEventos() {
  const dir = path.join(INPUT_BASE, 'eventos');
  const files = getImageFiles(dir);
  if (files.length === 0) { console.log('⏭️  eventos/ — nenhuma imagem encontrada'); return; }

  const outDir = path.join(OUTPUT_BASE, 'eventos');
  ensureDir(outDir);

  for (const file of files) {
    const baseName = getBaseName(file);
    console.log(`  🖼️  eventos/${file}`);

    // Banner de eventos (se nome contiver "banner")
    const isBanner = baseName.toLowerCase().includes('banner');
    const config = isBanner
      ? SECTION_CONFIG.eventos.banner.sizes
      : SECTION_CONFIG.eventos.card.sizes;

    await safeProcessImage(path.join(dir, file), outDir, config, baseName, `eventos/${file}`);
  }
  console.log('✅ eventos/ processado');
}

async function processGaleria() {
  const dir = path.join(INPUT_BASE, 'galeria');
  const files = getImageFiles(dir);
  if (files.length === 0) { console.log('⏭️  galeria/ — nenhuma imagem encontrada'); return; }

  const outDir = path.join(OUTPUT_BASE, 'galeria');
  ensureDir(outDir);

  for (const file of files) {
    const baseName = getBaseName(file);
    console.log(`  🖼️  galeria/${file}`);
    await safeProcessImage(path.join(dir, file), outDir, SECTION_CONFIG.galeria.sizes, baseName, `galeria/${file}`);
  }
  console.log('✅ galeria/ processado');
}

async function processRestaurante() {
  const dir = path.join(INPUT_BASE, 'restaurante');
  const files = getImageFiles(dir);
  if (files.length === 0) { console.log('⏭️  restaurante/ — nenhuma imagem encontrada'); return; }

  const outDir = path.join(OUTPUT_BASE, 'restaurante');
  ensureDir(outDir);

  for (const file of files) {
    const baseName = getBaseName(file);
    console.log(`  🖼️  restaurante/${file}`);
    await safeProcessImage(path.join(dir, file), outDir, SECTION_CONFIG.restaurante.sizes, baseName, `restaurante/${file}`);
  }
  console.log('✅ restaurante/ processado');
}

// ─── Execução ──────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   📸 Otimizador de Imagens — Hotel Maria Bastos  ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');

  // Limpar pasta de saída antes de reprocessar
  if (fs.existsSync(OUTPUT_BASE)) {
    fs.rmSync(OUTPUT_BASE, { recursive: true, force: true });
    console.log('🗑️  Pasta optimized/ limpa\n');
  }
  ensureDir(OUTPUT_BASE);

  const startTime = Date.now();

  console.log('── Hero ──────────────────────────────────');
  await processHero();
  console.log('');

  console.log('── Apartamentos ──────────────────────────');
  await processApartamentos();
  console.log('');

  console.log('── Eventos ───────────────────────────────');
  await processEventos();
  console.log('');

  console.log('── Galeria ───────────────────────────────');
  await processGaleria();
  console.log('');

  console.log('── Restaurante ───────────────────────────');
  await processRestaurante();
  console.log('');

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`🎉 Tudo pronto! Tempo: ${elapsed}s`);
  console.log(`📁 Imagens otimizadas em: ${OUTPUT_BASE}/`);
  
  if (skippedFiles.length > 0) {
    console.log('');
    console.log('⚠️  Arquivos pulados (formato não suportado):');
    for (const s of skippedFiles) {
      console.log(`   - ${s.file} (${s.format})`);
    }
    console.log('');
    console.log('💡 Converta esses arquivos para JPG ou PNG e rode novamente.');
  }
  console.log('');
}

main().catch(console.error);
