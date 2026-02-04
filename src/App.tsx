import { useState, Suspense, useRef, useEffect, lazy } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import { Toaster } from './components/ui/sonner';

// Lazy loaded components - only load when needed
const AnimatedShaderHero = lazy(() => import('./components/ui/animated-shader-hero'));
const ContactDemo = lazy(() => import('./components/ContactDemo').then(m => ({ default: m.ContactDemo })));
const Footerdemo = lazy(() => import('./components/ui/footer-section').then(m => ({ default: m.Footerdemo })));
const AIAutomationFeatures = lazy(() => import('./components/AIAutomationFeatures'));
const AIAutomationDatabaseDemo = lazy(() => import('./components/AIAutomationDatabaseDemo'));
const Pricing = lazy(() => import('./components/Pricing'));
const OriginalChatWidget = lazy(() => import('./components/OriginalChatWidget'));

// Performance: Preloader removed for faster initial load

// Ultra-Fast Auto-Loading Component with Optimized Performance
const AutoLoadSection = ({
  children,
  fallback,
  rootMargin = "50px",
  priority = false
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  priority?: boolean;
}) => {

  const [isLoaded, setIsLoaded] = useState(priority); // Priority sections load immediately
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) return; // Skip observer for priority sections

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          // No delay for faster loading
          setIsLoaded(true);
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isLoaded, rootMargin, priority]);

  const defaultFallback = (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-4">
          <div className="h-4 bg-slate-800/20 rounded w-1/4 mx-auto"></div>
          <div className="h-32 bg-slate-800/10 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={ref}>
      {isLoaded ? children : (fallback || defaultFallback)}
    </div>
  );
};

// Ultra-Light Loading Spinner
const LoadingSpinner = () => (
  <div className="flex justify-center py-8">
    <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

// Lightweight hero fallback for instant display
const HeroFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="text-center space-y-4">
      <h1 className="text-5xl md:text-7xl font-bold text-white">NEXAFLOW AI</h1>
      <p className="text-xl text-white/70">Loading...</p>
    </div>
  </div>
);

function App() {
  const [showChat, setShowChat] = useState(false);

  // Defer chat widget loading by 3 seconds for faster initial render
  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950">
        <Navigation />

        {/* Hero Section - Lazy loaded with instant fallback */}
        <section id="home">
          <Suspense fallback={<HeroFallback />}>
            <AnimatedShaderHero
              headline={{ line1: "NEXAFLOW AI", line2: "Automation" }}
              subtitle="Transform your business with intelligent automation - Lightning Fast!"
            />
          </Suspense>
        </section>

        {/* Database Section */}
        <section id="database">
          <AutoLoadSection rootMargin="400px">
            <Suspense fallback={<LoadingSpinner />}>
              <AIAutomationDatabaseDemo />
            </Suspense>
          </AutoLoadSection>
        </section>

        {/* Features Section */}
        <section id="features">
          <AutoLoadSection rootMargin="400px">
            <Suspense fallback={<LoadingSpinner />}>
              <AIAutomationFeatures />
            </Suspense>
          </AutoLoadSection>
        </section>


        {/* Pricing Section */}
        <section id="pricing">
          <AutoLoadSection rootMargin="400px">
            <Suspense fallback={<LoadingSpinner />}>
              <Pricing />
            </Suspense>
          </AutoLoadSection>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <AutoLoadSection rootMargin="400px">
            <Suspense fallback={<LoadingSpinner />}>
              <ContactDemo />
            </Suspense>
          </AutoLoadSection>
        </section>

        {/* Footer */}
        <AutoLoadSection rootMargin="300px">
          <Suspense fallback={<div />}>
            <Footerdemo />
          </Suspense>
        </AutoLoadSection>

        <Toaster />

        {/* Chat Widget - Deferred loading for performance */}
        {showChat && (
          <Suspense fallback={null}>
            <OriginalChatWidget />
          </Suspense>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;