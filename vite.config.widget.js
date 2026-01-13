import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    outDir: 'dist-widget',
    lib: {
      entry: 'src/widget.jsx', // Points to the file created in Step 2
      name: 'AgentforceWidget',
      fileName: 'agentforce-widget',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    },
    cssCodeSplit: false,
    minify: 'esbuild',
    emptyOutDir: true
  }
})