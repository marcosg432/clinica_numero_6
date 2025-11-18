import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Base path vazio para funcionar na raiz do public_html
  base: '/',
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    // Garantir que os assets sejam gerados corretamente
    outDir: 'dist',
    assetsDir: 'assets',
    // Otimizações para produção
    minify: 'terser',
    sourcemap: false
  }
});


