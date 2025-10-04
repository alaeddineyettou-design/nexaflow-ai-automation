/**
 * Asset URLs Configuration for CDN Integration
 * This replaces heavy local assets with CDN URLs
 */

export const AssetConfig = {
  // CDN Base URL - Active Netlify CDN
  CDN_BASE_URL: 'https://comfy-salamander-c473dc.netlify.app',
  
  // 3D Spline Scenes - Optimized External URLs
  SPLINE_SCENES: {
    // Primary scenes - critical for user experience (immediate load)
    AI_ASSISTANT_SHOWCASE: 'https://prod.spline.design/16rsYnJk7RTDMt6X/scene.splinecode',
    AUTOMATION_WORKFLOW: 'https://prod.spline.design/mOsYG5UokaH2ltI1/scene.splinecode',
    DASHBOARD_ANALYTICS: 'https://prod.spline.design/orYUSO8TjzUdTJ9Q/scene.splinecode',
    
    // Secondary scenes - lazy loaded for performance
    DIGITAL_SERENITY: 'https://prod.spline.design/pQeHHoqnhAG2JOK7/scene.splinecode',
    CONTACT_DEMO: 'https://prod.spline.design/XJ-wvEGxABcTIrDn/scene.splinecode', 
    PORTFOLIO_SHOWCASE: 'https://prod.spline.design/D1HrYUfhCqLCzFiN/scene.splinecode',
    TESTIMONIALS_3D: 'https://prod.spline.design/P5JMHHqHUqrFKPm7/scene.splinecode',
    
    // Additional scenes for comprehensive showcase
    ADVANCED_CHAT_WIDGET: 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode',
    AI_3D_VISUALIZATION: 'https://prod.spline.design/AI-5YRO3W3gKC26/scene.splinecode',
    INTERACTIVE_DEMO: 'https://prod.spline.design/16rsYnJk7RTDMt6X/scene.splinecode'
  },
  
  // Image Assets
  IMAGES: {
    LOGO: '/public/nexaflow-logo.png', // Keep critical images local
    PROFILE: '/public/profile-image.jpg',
    HERO_BACKGROUND: `\${CDN_BASE_URL}/images/hero-background.webp`
  },
  
  // Loading strategies
  LOADING_STRATEGY: {
    // Critical assets - load immediately
    CRITICAL: ['AI_ASSISTANT_SHOWCASE', 'LOGO'],
    // Above fold - lazy load when in viewport
    ABOVE_FOLD: ['AUTOMATION_WORKFLOW', 'DASHBOARD_ANALYTICS'],
    // Below fold - load on demand
    BELOW_FOLD: ['DIGITAL_SERENITY', 'CONTACT_DEMO', 'PORTFOLIO_SHOWCASE', 'TESTIMONIALS_3D']
  },
  
  // Fallback configuration
  FALLBACKS: {
    LOADING_PLACEHOLDER: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgeDQ9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHJlY3QgZmlsbD0iIzBmMTcyYSIgeDQ9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg=='
  }
};

// Helper function to get asset URL
export const getAssetURL = (assetKey: keyof typeof AssetConfig.SPLINE_SCENES | keyof typeof AssetConfig.IMAGES): string => {
  if (assetKey in AssetConfig.SPLINE_SCENES) {
    return AssetConfig.SPLINE_SCENES[assetKey as keyof typeof AssetConfig.SPLINE_SCENES];
  }
  if (assetKey in AssetConfig.IMAGES) {
    return AssetConfig.IMAGES[assetKey as keyof typeof AssetConfig.IMAGES];
  }
  return AssetConfig.FALLBACKS.LOADING_PLACEHOLDER;
};

// Check if asset should be preloaded
export const shouldPreload = (assetKey: string): boolean => {
  return AssetConfig.LOADING_STRATEGY.CRITICAL.includes(assetKey);
};

// Check loading priority
export const getLoadingPriority = (assetKey: string): 'critical' | 'high' | 'low' => {
  if (AssetConfig.LOADING_STRATEGY.CRITICAL.includes(assetKey)) return 'critical';
  if (AssetConfig.LOADING_STRATEGY.ABOVE_FOLD.includes(assetKey)) return 'high';
  return 'low';
};

export default AssetConfig;