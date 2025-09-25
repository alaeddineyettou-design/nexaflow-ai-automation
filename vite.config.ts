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
    // تحسين البناء للإنتاج
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        // تقسيم الكود بذكاء
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', '@radix-ui/react-slot', '@radix-ui/react-tooltip'],
          '3d-vendor': ['@splinetool/react-spline', '@splinetool/runtime'],
          'animation-vendor': ['gsap', '@studio-freight/lenis'],
          'chart-vendor': ['recharts'],
        },
      },
    },
    // تحسين حجم المكتبات
    chunkSizeWarningLimit: 1000,
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
