import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),wasm(),topLevelAwait()],
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/webpay': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webpay/, ''),
      },
    },
  },
});