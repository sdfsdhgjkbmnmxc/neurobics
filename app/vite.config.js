import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const mode = process.env.NODE_ENV;

export default defineConfig({
  base: mode === 'production' ? '/neurobics/' : './',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  define: {
    'process.env.NODE_ENV': `"${mode}"`
  }
});
