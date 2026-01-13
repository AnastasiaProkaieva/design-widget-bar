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

console.log('🚀 Starting Design-Fidelity Build...');

// 2. Generate CSS with "Deep" Tailwind Variables
// We explicitly define the variables that Tailwind normally puts on 'body'
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

/* 
   CRITICAL: TAILWIND VARIABLE INITIALIZATION 
   These variables are required for Gradients, Opacity, and Shadows to work.
   We apply them to :host and * to ensure they exist everywhere in Shadow DOM.
*/
:host, * {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  
  /* Defaults */
  --tw-border-opacity: 1;
  --tw-bg-opacity: 1;
  --tw-text-opacity: 1;
}

/* Host Typography */
:host {
  --color-primary: #0176D3;
  --font-family-sans: 'Inter', sans-serif;
  font-family: var(--font-family-sans);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Manual Reset for Shadow DOM */
#widget-root {
  @apply antialiased;
  width: 100%;
  height: 100%;
  color: #111827;
}

img, svg, video { display: block; vertical-align: middle; }

/* 
   Button Reset
   NOTE: We removed 'border-width: 0' because it conflicts with Tailwind border classes.
   We only remove the default style.
*/
button, input, textarea, select {
  font-family: inherit;
  font-size: 100%;
  margin: 0;
  padding: 0;
  text-transform: none;
  background-color: transparent;
  /* border-width: 0;  <-- REMOVED THIS to allow 'border' class to work */
  border-style: solid; /* Default to solid so border-width works */
  border-color: currentColor;
}

/* Remove default appearance but keep border capabilities */
button, [type='button'], [type='submit'] {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

*:focus { outline: none; }

/* Scrollbars */
.chat-scrollbar { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.1) transparent; }
.chat-scrollbar::-webkit-scrollbar { width: 6px; }
.chat-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }
.chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
`;

fs.writeFileSync(tempCssPath, perfectCss);

// 3. Compile
console.log('🎨 Compiling Styles...');
try {
  execSync(`npx @tailwindcss/cli -i "${tempCssPath}" -o "${outputCssPath}"`, { stdio: 'inherit' });
} catch (e) {
  console.error('❌ Tailwind failed:', e);
  if (fs.existsSync(tempCssPath)) fs.unlinkSync(tempCssPath);
  process.exit(1);
}

// 4. Inject Font Import (Line 1 Fix)
console.log('🔧 Injecting Fonts...');
if (fs.existsSync(outputCssPath)) {
  let generatedCss = fs.readFileSync(outputCssPath, 'utf8');
  const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`;
  generatedCss = fontImport + '\n' + generatedCss;
  fs.writeFileSync(outputCssPath, generatedCss);
}

// 5. Cleanup & Bundle
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
