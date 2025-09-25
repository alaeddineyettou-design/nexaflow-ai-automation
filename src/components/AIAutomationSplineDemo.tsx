import React, { Suspense, useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';

interface AIAutomationSplineDemoProps {
  className?: string;
}

const AIAutomationSplineDemo: React.FC<AIAutomationSplineDemoProps> = ({ className = "" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate visibility
      const isElementVisible = rect.top < windowHeight && rect.bottom > 0;
      setIsVisible(isElementVisible);

      // Calculate scroll progress relative to this section
      if (isElementVisible) {
        const sectionHeight = rect.height;
        const visibleTop = Math.max(0, -rect.top);
        const progress = Math.min(visibleTop / sectionHeight, 1);
        setScrollProgress(progress);

        // Send scroll progress to Spline scene if available
        if (splineRef.current) {
          try {
            splineRef.current.setVariable('automationProgress', progress);
            splineRef.current.setVariable('aiLevel', progress * 100);
          } catch (error) {
            // Spline variables not available
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
      style={{ 
        background: 'transparent',
        backgroundImage: `
          radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
        `
      }}
    >
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* AI Automation Header */}
        <div 
          className="text-center mb-12"
          style={{
            transform: `translateY(${scrollProgress * -40}px)`,
            opacity: 1 - scrollProgress * 0.3
          }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-purple-300/30 rounded-full text-sm text-purple-300 mb-6">
            <span className="mr-2">🤖</span>
            AI-Powered Automation
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-300 via-blue-400 to-teal-300 bg-clip-text text-transparent mb-6 tracking-tight">
            Intelligence in Motion
          </h2>
          
          <p className="text-xl text-slate-300/80 max-w-3xl mx-auto font-light leading-relaxed">
            Experience how artificial intelligence transforms complex workflows into seamless automated processes
          </p>
        </div>

        {/* AI Automation Spline Viewer */}
        <div 
          className="relative w-full h-[85vh] flex items-center justify-center"
          style={{
            transform: `scale(${1 + scrollProgress * 0.15}) rotateY(${scrollProgress * 5}deg)`,
            opacity: isVisible ? 1 : 0.2,
            transition: 'opacity 0.4s ease-out'
          }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="relative">
                  <div 
                    className="w-20 h-20 rounded-full border-4 border-purple-400/20 border-t-purple-400 animate-spin mx-auto mb-4"
                    style={{ animationDuration: '1.5s' }}
                  ></div>
                  <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-blue-400/20 border-r-blue-400 animate-spin mx-auto"
                    style={{ animationDuration: '2s', animationDirection: 'reverse' }}
                  ></div>
                </div>
                <p className="text-slate-400/70 text-lg">Initializing AI automation...</p>
                <div className="mt-4 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          }>
            <div className="w-full h-full relative">
              <Spline
                ref={splineRef}
                scene="https://prod.spline.design/mOsYG5UokaH2ltI1/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
                onLoad={(spline) => {
                  splineRef.current = spline;
                  console.log('AI Automation Spline loaded and ready');
                  
                  // Initialize automation variables
                  try {
                    spline.setVariable('automationProgress', scrollProgress);
                    spline.setVariable('aiLevel', scrollProgress * 100);
                  } catch (error) {
                    console.log('Spline variables not available yet');
                  }
                }}
              />
            </div>
          </Suspense>
        </div>

        {/* AI Data Visualization */}
        <div 
          className="absolute top-1/4 right-8 z-20"
          style={{
            opacity: isVisible ? 0.8 : 0,
            transform: `translateX(${scrollProgress * -30}px)`,
            transition: 'opacity 0.6s ease-out'
          }}
        >
          <div className="bg-slate-900/40 backdrop-blur-md border border-purple-300/20 rounded-xl p-4 min-w-[200px]">
            <h4 className="text-purple-300 text-sm font-semibold mb-3">AI Automation Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Processing Speed</span>
                <span className="text-blue-300 text-xs font-mono">{Math.round(scrollProgress * 98 + 2)}%</span>
              </div>
              <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500"
                  style={{ width: `${scrollProgress * 98 + 2}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">AI Efficiency</span>
                <span className="text-teal-300 text-xs font-mono">{Math.round(scrollProgress * 95 + 5)}%</span>
              </div>
              <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-500"
                  style={{ width: `${scrollProgress * 95 + 5}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">Automation Level</span>
                <span className="text-purple-300 text-xs font-mono">{Math.round(scrollProgress * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 to-purple-400 transition-all duration-500"
                  style={{ width: `${scrollProgress * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Indicators */}
        <div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
          style={{
            opacity: isVisible ? 0.9 : 0,
            transition: 'opacity 0.5s ease-out'
          }}
        >
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-purple-300/20">
                <span className="text-purple-300 text-lg">🧠</span>
              </div>
              <span className="text-slate-400 text-xs">Neural Networks</span>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-blue-300/20">
                <span className="text-blue-300 text-lg">⚡</span>
              </div>
              <span className="text-slate-400 text-xs">Real-time Processing</span>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-teal-300/20">
                <span className="text-teal-300 text-lg">🔄</span>
              </div>
              <span className="text-slate-400 text-xs">Continuous Learning</span>
            </div>
          </div>
        </div>

        {/* Scroll Interaction Guide */}
        <div 
          className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20"
          style={{
            opacity: isVisible && scrollProgress < 0.3 ? 0.7 : 0,
            transform: `translateY(-50%) translateX(${scrollProgress * 30}px)`,
            transition: 'opacity 0.5s ease-out'
          }}
        >
          <div className="text-slate-400/70 text-sm font-light">
            <div className="mb-2 flex items-center">
              <span className="mr-2">🖱️</span>
              Scroll to activate AI
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400/50 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAutomationSplineDemo;