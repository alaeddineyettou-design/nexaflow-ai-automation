import { Suspense, lazy, useEffect, useState } from 'react';
import { memo } from 'react';
import { getAssetURL, getLoadingPriority, AssetConfig } from '../../config/assets';

// Lazy load Spline with better error handling
const Spline = lazy(() => 
  import('@splinetool/react-spline').then(module => ({ default: module.default }))
);

interface OptimizedSplineProps {
  sceneKey: keyof typeof AssetConfig.SPLINE_SCENES;
  className?: string;
  fallback?: React.ReactNode;
  lazy?: boolean;
  priority?: 'critical' | 'high' | 'low';
}

// Optimized Spline loader with CDN and smart loading
export const OptimizedSpline = memo(({ 
  sceneKey, 
  className = '', 
  fallback, 
  lazy = true,
  priority 
}: OptimizedSplineProps) => {
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [hasError, setHasError] = useState(false);
  
  const sceneUrl = getAssetURL(sceneKey);
  const loadPriority = priority || getLoadingPriority(sceneKey);
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoad) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' } // Start loading 100px before entering viewport
    );
    
    const element = document.querySelector(`[data-spline="${sceneKey}"]`);
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, [lazy, shouldLoad, sceneKey]);

  const defaultFallback = (
    <div 
      className={`flex items-center justify-center bg-slate-900/50 rounded-lg ${className}`}
      data-spline={sceneKey}
    >
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-slate-300 text-sm">
          {loadPriority === 'critical' ? 'Loading Critical 3D Scene...' : 'Loading 3D Scene...'}
        </p>
        <p className="text-slate-400 text-xs">{sceneKey}</p>
      </div>
    </div>
  );

  const errorFallback = (
    <div className={`flex items-center justify-center bg-slate-800/50 rounded-lg ${className}`}>
      <div className="text-center space-y-2">
        <div className="text-red-400">⚠️ Failed to load 3D scene</div>
        <button 
          onClick={() => {
            setHasError(false);
            setShouldLoad(true);
          }}
          className="text-blue-400 text-sm hover:underline"
        >
          Try again
        </button>
      </div>
    </div>
  );

  if (hasError) {
    return errorFallback;
  }

  if (!shouldLoad) {
    return fallback || defaultFallback;
  }

  return (
    <div data-spline={sceneKey} className={className}>
      <Suspense fallback={fallback || defaultFallback}>
        <Spline 
          scene={sceneUrl}
          className="w-full h-full"
          onLoad={() => console.log(`✅ Loaded: ${sceneKey}`)}
          onError={() => {
            console.error(`❌ Failed to load: ${sceneKey}`);
            setHasError(true);
          }}
          style={{ 
            width: '100%', 
            height: '100%',
            willChange: 'transform'
          }}
        />
      </Suspense>
    </div>
  );
});

OptimizedSpline.displayName = 'OptimizedSpline';