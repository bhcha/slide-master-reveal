#!/usr/bin/env node

/**
 * Assembles slide body + notes files into index.html from index.template.html.
 * Replaces <!--BODY:slide-N--> and <!--NOTES:slide-N--> markers.
 * Template is preserved so assemble can be re-run after editing.
 *
 * Usage: node assemble.js --dir <presentation-directory>
 */

const fs = require('fs');
const path = require('path');

function main() {
  const dirIdx = process.argv.indexOf('--dir');
  const dir = dirIdx !== -1 ? process.argv[dirIdx + 1] : process.argv[2];

  if (!dir) {
    console.error('Usage: node assemble.js --dir <presentation-directory>');
    process.exit(1);
  }

  const presDir = path.resolve(dir);
  const templatePath = path.join(presDir, 'index.template.html');
  const indexPath = path.join(presDir, 'index.html');
  const slidesDir = path.join(presDir, 'slides');

  if (!fs.existsSync(templatePath)) {
    console.error(`Error: index.template.html not found in ${presDir}`);
    process.exit(1);
  }

  let html = fs.readFileSync(templatePath, 'utf-8');
  let count = 0;

  // Replace <!--BODY:slide-N--> with content from slides/slide-N-body.html
  html = html.replace(/<!--BODY:slide-(\d+)-->/g, (match, num) => {
    const bodyFile = path.join(slidesDir, `slide-${num}-body.html`);
    if (!fs.existsSync(bodyFile)) {
      console.warn(`  Warning: ${bodyFile} not found, leaving empty`);
      return '';
    }

    let body = fs.readFileSync(bodyFile, 'utf-8');
    // Strip comment lines at the top (metadata for fill)
    body = body.replace(/^<!--.*?-->\n?/gm, '').trim();

    count++;
    return body;
  });

  // Replace <!--NOTES:slide-N--> with content from slides/slide-N-notes.html
  let notesCount = 0;
  html = html.replace(/<!--NOTES:slide-(\d+)-->/g, (match, num) => {
    const notesFile = path.join(slidesDir, `slide-${num}-notes.html`);
    if (!fs.existsSync(notesFile)) return '';

    let notes = fs.readFileSync(notesFile, 'utf-8');
    notes = notes.replace(/^<!--.*?-->\n?/gm, '').trim();

    if (notes) notesCount++;
    return notes;
  });

  fs.writeFileSync(indexPath, html);
  console.log(`✓ Assembled ${count} slide bodies + ${notesCount} notes into index.html`);
}

main();
