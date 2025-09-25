import { useState, useCallback, Suspense, useRef, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import AnimatedShaderHero from './components/ui/animated-shader-hero';
import Preloader from './components/ui/preloader';
import { Toaster } from './components/ui/sonner';

// Direct imports - Stable and reliable
import { LogoCarouselDemo } from './components/LogoCarouselDemo';
import { ContactDemo } from './components/ContactDemo';
import { Footerdemo } from './components/ui/footer-section';
import AIAutomationFeatures from './components/AIAutomationFeatures';
import AIAutomationDatabaseDemo from './components/AIAutomationDatabaseDemo';
import Pricing from './components/Pricing';
import DisplayCards from './components/ui/display-cards';
import { ChatWidgetRef } from './components/AdvancedChatWidget';

// Import existing lazy components from utils
import {
  LazyAI3DAssistantShowcase,
  LazyAIAutomationScrollShowcase,
  LazyInteractiveAccordionDemo,
  LazyCombinedFeaturedSection,
  LazyAdvancedChatWidget
} from './utils/lazyComponents';

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

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  const chatWidgetRef = useRef<ChatWidgetRef>(null);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleStartChatting = useCallback(() => {
    if (chatWidgetRef.current) {
      chatWidgetRef.current.openChat();
    } else {
      window.open('https://cal.com/alae-automation/ai-automation-business', '_blank');
    }
  }, []);

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        
        {/* Hero Section - Ultra Fast & Lightweight */}
        <section id="home">
          <AnimatedShaderHero 
            headline={{ line1: "NEXAFLOW AI", line2: "Automation" }}
            subtitle="Transform your business with intelligent automation - Lightning Fast!"
          />
          
          {/* Logo Carousel - Priority Loading */}
          <AutoLoadSection priority={true}>
            <Suspense fallback={<LoadingSpinner />}>
              <LogoCarouselDemo />
            </Suspense>
          </AutoLoadSection>
          
          {/* AI Assistant - Delayed Loading */}
          <AutoLoadSection rootMargin="300px">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAI3DAssistantShowcase onStartChatting={handleStartChatting} />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Database Section */}
        <section id="database">
          <AutoLoadSection rootMargin="200px">
            <Suspense fallback={<LoadingSpinner />}>
              <AIAutomationDatabaseDemo />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Features Section */}
        <section id="features">
          <AutoLoadSection rootMargin="150px">
            <Suspense fallback={<LoadingSpinner />}>
              <AIAutomationFeatures />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Showcase Section */}
        <section id="showcase">
          {/* Automation Showcase */}
          <AutoLoadSection rootMargin="200px">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAIAutomationScrollShowcase />
            </Suspense>
          </AutoLoadSection>
          
          {/* Display Cards */}
          <AutoLoadSection rootMargin="150px">
            <Suspense fallback={<LoadingSpinner />}>
              <DisplayCards />
            </Suspense>
          </AutoLoadSection>
          
          {/* Interactive Features */}
          <AutoLoadSection rootMargin="200px">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyInteractiveAccordionDemo />
              <LazyCombinedFeaturedSection />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing">
          <AutoLoadSection rootMargin="100px">
            <Suspense fallback={<LoadingSpinner />}>
              <Pricing />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Contact Section */}
        <section id="contact">
          <AutoLoadSection rootMargin="100px">
            <Suspense fallback={<LoadingSpinner />}>
              <ContactDemo />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Footer */}
        <AutoLoadSection rootMargin="50px">
          <Suspense fallback={<div />}>
            <Footerdemo />
          </Suspense>
        </AutoLoadSection>
        
        {/* Advanced Chat Widget - Auto Loading */}
        <AutoLoadSection rootMargin="50px">
          <Suspense fallback={<div />}>
            <LazyAdvancedChatWidget ref={chatWidgetRef} />
          </Suspense>
        </AutoLoadSection>
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;