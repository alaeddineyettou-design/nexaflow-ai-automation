/**
 * Performance Monitoring and Analytics for CDN Integration
 */

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private loadTimes: Map<string, number> = new Map();
  private errors: Map<string, string[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Track asset load times
  startTimer(assetKey: string): void {
    this.loadTimes.set(`${assetKey}_start`, performance.now());
  }

  endTimer(assetKey: string): number {
    const startTime = this.loadTimes.get(`${assetKey}_start`);
    if (startTime) {
      const loadTime = performance.now() - startTime;
      this.loadTimes.set(assetKey, loadTime);
      console.log(`📊 ${assetKey} loaded in ${loadTime.toFixed(2)}ms`);
      return loadTime;
    }
    return 0;
  }

  // Track errors
  logError(assetKey: string, error: string): void {
    if (!this.errors.has(assetKey)) {
      this.errors.set(assetKey, []);
    }
    this.errors.get(assetKey)?.push(error);
    console.error(`❌ Error loading ${assetKey}:`, error);
  }

  // Get performance report
  getReport(): {
    averageLoadTime: number;
    totalAssets: number;
    errors: Record<string, string[]>;
    fastestAsset: string;
    slowestAsset: string;
  } {
    const loadTimes = Array.from(this.loadTimes.entries())
      .filter(([key]) => !key.includes('_start'));
    
    const times = loadTimes.map(([, time]) => time);
    const averageLoadTime = times.reduce((a, b) => a + b, 0) / times.length || 0;
    
    const fastest = loadTimes.reduce((min, current) => 
      current[1] < min[1] ? current : min, loadTimes[0]);
    const slowest = loadTimes.reduce((max, current) => 
      current[1] > max[1] ? current : max, loadTimes[0]);

    return {
      averageLoadTime,
      totalAssets: loadTimes.length,
      errors: Object.fromEntries(this.errors),
      fastestAsset: fastest?.[0] || 'none',
      slowestAsset: slowest?.[0] || 'none'
    };
  }

  // Export data for analytics
  exportData(): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      ...this.getReport()
    }, null, 2);
  }
}

// Global performance instance
export const perfMonitor = PerformanceMonitor.getInstance();

// Core Web Vitals tracking
export const trackWebVitals = (): void => {
  // First Contentful Paint
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      console.log('📊 FCP:', entry.startTime);
    }
  }).observe({ entryTypes: ['paint'] });

  // Largest Contentful Paint  
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('📊 LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Cumulative Layout Shift
  new PerformanceObserver((entryList) => {
    let clsValue = 0;
    for (const entry of entryList.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
    console.log('📊 CLS:', clsValue);
  }).observe({ entryTypes: ['layout-shift'] });
};