import { useState, useCallback, Suspense, useRef, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import AnimatedShaderHero from './components/ui/animated-shader-hero';
import { LogoCarouselDemo } from './components/LogoCarouselDemo';
import { ContactDemo } from './components/ContactDemo';
import { Footerdemo } from './components/ui/footer-section';
import AIAutomationFeatures from './components/AIAutomationFeatures';
import AIAutomationDatabaseDemo from './components/AIAutomationDatabaseDemo';
import Pricing from './components/Pricing';
import Preloader from './components/ui/preloader';
import DisplayCards from './components/ui/display-cards';
import { Toaster } from './components/ui/sonner';
import { ChatWidgetRef } from './components/AdvancedChatWidget';

// Lazy imports للمكونات الثقيلة مع الحفاظ على السرعة
import {
  LazyAI3DAssistantShowcase,
  LazyAIAutomationScrollShowcase,
  LazyInteractiveAccordionDemo,
  LazyCombinedFeaturedSection,
  LazyAdvancedChatWidget
} from './utils/lazyComponents';

// Professional Auto-Loading Component with Intersection Observer
const AutoLoadSection = ({ 
  children,
  fallback,
  rootMargin = "100px"
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
}) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          // Small delay to ensure smooth loading
          setTimeout(() => setIsLoaded(true), 200);
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isLoaded, rootMargin]);

  const defaultFallback = (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-800 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-slate-800 rounded w-2/3 mx-auto"></div>
          <div className="h-64 bg-slate-800 rounded"></div>
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

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="relative">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-b-2 border-blue-400 opacity-20"></div>
    </div>
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
          
          {/* Logo Carousel - Keep */}
          <LogoCarouselDemo />
          
          {/* AI Assistant - Auto Loading */}
          <AutoLoadSection rootMargin="200px">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAI3DAssistantShowcase onStartChatting={handleStartChatting} />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Database Section */}
        <section id="database">
          <AIAutomationDatabaseDemo />
        </section>
        
        {/* Features Section */}
        <section id="features">
          <AIAutomationFeatures />
        </section>
        
        {/* Showcase Section */}
        <section id="showcase">
          {/* Automation Showcase - Auto Loading */}
          <AutoLoadSection rootMargin="150px">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAIAutomationScrollShowcase />
            </Suspense>
          </AutoLoadSection>
          
          {/* Display Cards */}
          <DisplayCards />
          
          {/* Interactive Features - Auto Loading */}
          <AutoLoadSection rootMargin="100px">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyInteractiveAccordionDemo />
              <LazyCombinedFeaturedSection />
            </Suspense>
          </AutoLoadSection>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing">
          <Pricing />
        </section>
        
        {/* Contact Section */}
        <section id="contact">
          <ContactDemo />
        </section>
        
        {/* Footer */}
        <Footerdemo />
        
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