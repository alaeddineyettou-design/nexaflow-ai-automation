import { Suspense, lazy } from 'react';
import { memo } from 'react';

// Lazy load Spline with better error handling
const Spline = lazy(() => 
  import('@splinetool/react-spline').then(module => ({ default: module.default }))
);

interface OptimizedSplineProps {
  scene: string;
  className?: string;
  fallback?: React.ReactNode;
}

// Optimized Spline loader with performance improvements
export const OptimizedSpline = memo(({ scene, className = '', fallback }: OptimizedSplineProps) => {
  const defaultFallback = (
    <div className={`flex items-center justify-center bg-slate-900/50 rounded-lg ${className}`}>
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-slate-300 text-sm">Loading 3D Scene...</p>
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <Spline 
        scene={scene}
        className={className}
        // Performance optimizations
        style={{ 
          width: '100%', 
          height: '100%',
          willChange: 'transform'
        }}
      />
    </Suspense>
  );
});

OptimizedSpline.displayName = 'OptimizedSpline';