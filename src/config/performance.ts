/**
 * Performance Configuration for NEXAFLOW AI Platform
 * Optimized for fast loading with heavy 3D content
 */

export const performanceConfig = {
  // Lazy loading thresholds
  intersectionThreshold: 0.1,
  rootMargin: '50px',
  
  // 3D Scene optimization
  spline: {
    // Load 3D scenes only when in viewport
    lazyLoad: true,
    // Reduce quality on mobile
    adaptiveQuality: true,
    // Cache scenes in memory
    cacheScenes: true,
    // Preload critical scenes
    preloadScenes: [
      'https://prod.spline.design/16rsYnJk7RTDMt6X/scene.splinecode',
      'https://prod.spline.design/AI-5YRO3W3gKC26/scene.splinecode'
    ]
  },
  
  // Animation optimization
  animations: {
    // Reduce motion for performance
    respectsReducedMotion: true,
    // Use GPU acceleration
    useGPU: true,
    // Throttle animations on slow devices
    throttleOnSlowDevices: true
  },
  
  // Image optimization
  images: {
    // Use WebP format when supported
    preferWebP: true,
    // Lazy load images
    lazyLoad: true,
    // Image quality settings
    quality: {
      high: 90,
      medium: 75,
      low: 60
    }
  },
  
  // Chunk size limits
  chunks: {
    maxSize: 500, // KB
    minSize: 20,  // KB
    // Critical chunks to load first
    critical: ['react-core', 'navigation', 'hero']
  }
};

export default performanceConfig;