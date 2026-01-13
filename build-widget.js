import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Setup Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const tempCssPath = path.join(srcDir, 'temp_build_config.css'); 
const outputCssPath = path.join(srcDir, 'widget-styles.css');

console.log('🚀 Starting Final Build...');

// 2. Generate CSS Input (WITHOUT the Font Import)
// We remove the font import here so Tailwind doesn't process it and push it down.
const perfectCss = `
@import "tailwindcss";
@source "${srcDir}";

@theme {
  --color-primary: #0176D3;
  --color-primary-hover: #0B5CAB;
  --color-gray-light: #F3F3F3;
  --color-gray-border: #E5E5E5;
  --color-gray-text: #6B7280;
  --font-family-sans: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

:host {
  --color-primary: #0176D3;
  --font-family-sans: 'Inter', sans-serif;
  font-family: var(--font-family-sans);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* MANUAL RESET */
#widget-root {
  @apply antialiased;
  width: 100%;
  height: 100%;
  color: #111827;
}

img, svg, video { display: block; vertical-align: middle; }

button, input, textarea, select {
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  padding: 0;
  text-transform: none;
  background-color: transparent;
  border-width: 0;
}

*:focus { outline: none; }

/* Scrollbars */
.chat-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.1) transparent; }
.chat-scrollbar::-webkit-scrollbar { width: 6px; }
.chat-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
.chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
`;

fs.writeFileSync(tempCssPath, perfectCss);

// 3. Run Tailwind Compiler
console.log('🎨 Compiling Styles...');
try {
  execSync(`npx @tailwindcss/cli -i "${tempCssPath}" -o "${outputCssPath}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('❌ Tailwind failed:', e);
  if (fs.existsSync(tempCssPath)) fs.unlinkSync(tempCssPath);
  process.exit(1);
}

// 4. FIX FONT IMPORT (The Magic Step)
// Now that the CSS is generated, we read it and prepend the import to Line 1.
console.log('🔧 Fixing Font Import placement...');
if (fs.existsSync(outputCssPath)) {
  let generatedCss = fs.readFileSync(outputCssPath, 'utf8');
  
  // The Google Fonts URL
  const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`;
  
  // Prepend it to the file content
  generatedCss = fontImport + '\n' + generatedCss;
  
  // Save it back
  fs.writeFileSync(outputCssPath, generatedCss);
  console.log('✅ Font Import moved to Line 1.');
}

// 5. Cleanup & Build
if (fs.existsSync(tempCssPath)) fs.unlinkSync(tempCssPath);

console.log('📦 Bundling with Vite...');
try {
  const configFile = path.join(__dirname, 'vite.config.widget.js');
  execSync(`npx vite build --config "${configFile}"`, { stdio: 'inherit' });
  console.log('🎉 Build Complete!');
} catch (e) {
  console.error('❌ Vite failed:', e);
  process.exit(1);
}