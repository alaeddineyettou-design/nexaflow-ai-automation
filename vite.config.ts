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
    // Ultra-Fast Build Configuration
    target: 'esnext',
    minify: 'esbuild', // Faster than terser
    sourcemap: false,
    rollupOptions: {
      output: {
        // Aggressive code splitting for maximum speed
        manualChunks: (id) => {
          // Core React - Priority loading
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core';
          }
          // Critical UI components - Small bundle
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-critical';
          }
          // Heavy animations - Separate bundle
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'animation-heavy';
          }
          // 3D components - Largest bundle
          if (id.includes('@splinetool') || id.includes('@react-three') || id.includes('three')) {
            return '3d-heavy';
          }
          // Chart libraries
          if (id.includes('recharts') || id.includes('chart')) {
            return 'chart-heavy';
          }
          // Utilities - Small bundle
          if (id.includes('clsx') || id.includes('tailwind') || id.includes('class-variance')) {
            return 'utils';
          }
          // Physics engines
          if (id.includes('cannon') || id.includes('rapier') || id.includes('physics')) {
            return 'physics';
          }
          // Audio libraries
          if (id.includes('howler') || id.includes('audio')) {
            return 'audio';
          }
          // Node modules default
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Optimize chunk loading
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
      external: [],
    },
    // Aggressive size limits for faster loading
    chunkSizeWarningLimit: 300,
    // Maximum performance optimizations
    cssCodeSplit: true,
    assetsInlineLimit: 8192, // Inline smaller assets
    reportCompressedSize: false, // Skip size reporting for faster builds
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
