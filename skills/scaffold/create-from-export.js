#!/usr/bin/env node

/**
 * Creates a reveal.js presentation from a Slide Master export JSON.
 * Generates index.html (structure) + slides/slide-N-body.html (body content).
 * Usage: node create-from-export.js --input slide-package.json --output presentation/
 */

const fs = require('fs');
const path = require('path');

const BASE_ADDITIONS_PATH = path.join(__dirname, 'base-additions.css');

function parseArgs(args) {
  const options = { input: null, output: 'presentation', title: 'Presentation' };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--input' || args[i] === '-i') options.input = args[++i];
    else if (args[i] === '--output' || args[i] === '-o') options.output = args[++i];
    else if (args[i] === '--title') options.title = args[++i];
    else if (args[i] === '--help' || args[i] === '-h') { printHelp(); process.exit(0); }
  }
  return options;
}

function printHelp() {
  console.log(`
create-from-export.js - Generate reveal.js from Slide Master export

Usage: node create-from-export.js --input <file> --output <dir>

Options:
  --input, -i   Path to slide-package.json (required)
  --output, -o  Output directory (default: presentation/)
  --title       Presentation title (default: Presentation)
  --help, -h    Show this help
`);
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// --- Body height by layout ---
const BODY_HEIGHT = {
  'header-body-footer': 430,
  'two-column': 430,
  'title-only': 620,
  'blank-canvas': 576,
};

function buildBodyContent(slide) {
  const { layoutId, content } = slide;
  let bodyHtml = '';

  if (content.body) {
    bodyHtml = `<p>${escHtml(content.body)}</p>`;
  }
  if (content.content) {
    bodyHtml = `<p>${escHtml(content.content)}</p>`;
  }
  if (content.left || content.right) {
    bodyHtml = `<div>\n  ${content.left ? `<p>${escHtml(content.left)}</p>` : ''}\n</div>\n<div>\n  ${content.right ? `<p>${escHtml(content.right)}</p>` : ''}\n</div>`;
  }

  // Title-only: title/subtitle go in body
  if (content.title) {
    bodyHtml = '';
    if (content.headerTag) bodyHtml += `<span class="badge">${escHtml(content.headerTag)}</span>\n`;
    bodyHtml += `<h1>${escHtml(content.title)}</h1>\n`;
    if (content.subtitle) bodyHtml += `<p>${escHtml(content.subtitle)}</p>`;
  }

  return bodyHtml;
}

function buildBodyFile(slide, index) {
  const { layoutId } = slide;
  const height = BODY_HEIGHT[layoutId] || 430;
  const bodyContent = buildBodyContent(slide);

  return `<!-- Slide ${index + 1} body: ${layoutId} -->
<!-- 가용 높이: ~${height}px. 이 높이를 넘기지 마세요. -->
${bodyContent}`;
}

function buildSlideHtml(slide, index) {
  const { layoutId, layoutClass, content, narration } = slide;

  let headerHtml = '';
  let footerHtml = '';
  // Header content
  if (content.headerTag && layoutId !== 'title-only') {
    headerHtml += `      <span class="badge">${escHtml(content.headerTag)}</span>\n`;
  }
  if (content.headerTitle) {
    headerHtml += `      <h1>${escHtml(content.headerTitle)}</h1>\n`;
  }
  if (content.headerSubtitle) {
    headerHtml += `      <p>${escHtml(content.headerSubtitle)}</p>\n`;
  }

  // Footer content
  const footerParts = [];
  if (content.footerLeft) footerParts.push(`      <p>${escHtml(content.footerLeft)}</p>`);
  if (content.footerRight) footerParts.push(`      <p>${escHtml(content.footerRight)}</p>`);
  footerHtml = footerParts.join('\n');

  // Assemble based on layout
  let inner = '';

  if (layoutId === 'title-only' || layoutId === 'blank-canvas') {
    inner = `    <div class="slide-body">\n      <!--BODY:slide-${index + 1}-->\n    </div>`;
  } else {
    if (headerHtml) inner += `    <div class="slide-header">\n${headerHtml}    </div>\n`;
    inner += `    <div class="slide-body">\n      <!--BODY:slide-${index + 1}-->\n    </div>`;
    if (footerHtml) inner += `\n    <div class="slide-footer">\n${footerHtml}\n    </div>`;
  }

  return `  <!-- Slide ${index + 1}: ${layoutId} -->
  <section id="slide-${index + 1}">
    <div class="${layoutClass}">
      <div class="slide">
${inner}
      </div>
    </div>
    <aside class="notes"><!--NOTES:slide-${index + 1}--></aside>
  </section>`;
}

function buildHtml(exportData, title) {
  const slides = exportData.deck.slides;
  const slidesHtml = slides.map((s, i) => buildSlideHtml(s, i)).join('\n\n');

  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reset.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<link rel="stylesheet" href="styles.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

<div class="reveal">
  <div class="slides">

${slidesHtml}

  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/reveal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/reveal.js-plugins@latest/chart/plugin.js"></script>
<script>
const isExport = window.location.search.includes('export');
Reveal.initialize({
  width: 1280,
  height: 720,
  margin: 0,
  center: true,
  controls: true,
  progress: true,
  slideNumber: true,
  hash: true,
  transition: 'slide',
  plugins: [ RevealChart ],
  chart: {
    defaults: {
      color: 'var(--slide-color-text-muted)',
      borderColor: 'var(--slide-color-border)',
      devicePixelRatio: 2,
      ...(isExport ? { animation: false } : {})
    }
  }
});
</script>

</body>
</html>`;
}

function buildStyles(exportData) {
  let css = exportData.master.css || '';

  css += '\n\n/* === Reveal.js Overrides === */\n';
  css += '.reveal { background: var(--slide-color-background, #e8e4de); }\n';
  css += '.reveal .slides section { padding: 0; margin: 0; height: 100%; }\n';
  css += '.reveal .slide { border: none; border-radius: 0; }\n';

  try {
    const additions = fs.readFileSync(BASE_ADDITIONS_PATH, 'utf-8');
    css += '\n' + additions;
  } catch {
    // base-additions.css not found, skip
  }

  return css;
}

// --- Main ---
const options = parseArgs(process.argv.slice(2));

if (!options.input) {
  console.error('Error: --input is required. Use --help for usage.');
  process.exit(1);
}

const inputPath = path.resolve(options.input);
if (!fs.existsSync(inputPath)) {
  console.error(`Error: File not found: ${inputPath}`);
  process.exit(1);
}

let exportData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Support project file format { master: MasterConfig, deck: DeckConfig, css?: string }
if (exportData.master?.tokens && exportData.deck?.slides) {
  console.log('Detected project file format. Converting...');
  const projectCss = exportData.css || '';
  const deckSlides = exportData.deck.slides
    .filter(s => s.layoutId)
    .map(s => {
      const content = {};
      let narration;
      for (const [key, value] of Object.entries(s.slots || {})) {
        if (key === 'narration') narration = value;
        else content[key] = value;
      }
      return { id: s.id, layoutId: s.layoutId, layoutClass: `layout-${s.layoutId}`, content, narration };
    });
  exportData = {
    master: { css: projectCss },
    deck: { slides: deckSlides },
  };
}

// Validate
if (!exportData.master || !exportData.deck) {
  console.error('Error: Unrecognized format.');
  process.exit(1);
}

// Create output directories
const outputDir = path.resolve(options.output);
const slidesDir = path.join(outputDir, 'slides');
fs.mkdirSync(slidesDir, { recursive: true });

// Generate files
const html = buildHtml(exportData, options.title);
const styles = buildStyles(exportData);

fs.writeFileSync(path.join(outputDir, 'index.template.html'), html);
fs.writeFileSync(path.join(outputDir, 'styles.css'), styles);

// Generate body + notes files
const slides = exportData.deck.slides;
for (let i = 0; i < slides.length; i++) {
  const bodyContent = buildBodyFile(slides[i], i);
  fs.writeFileSync(path.join(slidesDir, `slide-${i + 1}-body.html`), bodyContent);
  fs.writeFileSync(path.join(slidesDir, `slide-${i + 1}-notes.html`), `<!-- Slide ${i + 1} notes -->\n`);
}

// Run assemble
const assemblePath = path.join(__dirname, 'assemble.js');
if (fs.existsSync(assemblePath)) {
  require('child_process').execSync(`node "${assemblePath}" --dir "${outputDir}"`, { stdio: 'inherit' });
}

console.log(`\n✓ Created ${slides.length} slides`);
console.log(`  ${path.join(outputDir, 'index.template.html')}`);
console.log(`  ${path.join(outputDir, 'styles.css')}`);
console.log(`  ${path.join(slidesDir, '*.html')} (${slides.length} body files)`);
console.log(`\nNext: /slide-master-reveal:fill to add content to slides/slide-N-body.html`);
console.log(`Then: /slide-master-reveal:check to detect overflow`);
