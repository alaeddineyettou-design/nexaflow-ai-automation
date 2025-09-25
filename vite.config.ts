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
        // تقسيم الكود بذكاء للسرعة القصوى
        manualChunks: {
          'react-core': ['react', 'react-dom'],
          'ui-light': ['@radix-ui/react-slot', '@radix-ui/react-tooltip'], 
          'animation-heavy': ['framer-motion', 'gsap'],
          '3d-heavy': ['@splinetool/react-spline', '@splinetool/runtime', '@react-three/fiber', '@react-three/drei'],
          'chart-heavy': ['recharts'],
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
      },
    },
    // تحسين حجم المكتبات
    chunkSizeWarningLimit: 500,
    // تحسينات إضافية للسرعة
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
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
