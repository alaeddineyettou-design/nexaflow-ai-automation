import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/webhook': {
        target: 'https://n8n.srv962505.hstgr.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook/, '/webhook'),
        secure: true,
      },
    },
  },
  build: {
    // Simple and reliable build
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
    // تحسين المكتبات الثقيلة
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@splinetool/react-spline',
      'gsap',
    ],
  },
});
