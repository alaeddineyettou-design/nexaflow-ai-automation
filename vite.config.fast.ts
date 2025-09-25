import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild', // Faster than terser
    cssCodeSplit: true,
    sourcemap: false, // Disable for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Only essential chunks
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
        },
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    // Performance optimizations
    chunkSizeWarningLimit: 1000, // Increase limit
    reportCompressedSize: false, // Skip compression analysis
  },
  // Development optimizations  
  server: {
    hmr: true,
    host: true
  },
  // Exclude heavy dependencies temporarily
  optimizeDeps: {
    exclude: [
      '@splinetool/react-spline',
      '@splinetool/runtime',
      '@react-three/fiber', 
      '@react-three/drei',
      'three'
    ]
  }
})