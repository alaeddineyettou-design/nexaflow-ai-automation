import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/webhook': {
        target: 'https://tradeloop.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook/, '/webhook'),
        secure: true,
      },
    },
  },
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor chunks based on actual imports
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            // Don't force three.js into separate chunk - let Vite handle it
          }
        },
      },
    },
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
