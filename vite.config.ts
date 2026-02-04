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
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React - loads first
          'vendor-react': ['react', 'react-dom'],
          // Heavy animation library - loads on demand
          'vendor-framer': ['framer-motion'],
          // 3D/WebGL libraries - loads only when needed
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          // GSAP animation - loads on demand
          'vendor-gsap': ['gsap'],
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
