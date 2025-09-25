import { useState, useCallback, Suspense, useRef } from 'react';
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

// Smart Progressive Loading Component
const SmartLoadingSection = ({ 
  title, 
  description, 
  onLoadContent,
  isLoaded,
  loadingComponent 
}: { 
  title: string; 
  description: string; 
  onLoadContent: () => void;
  isLoaded: boolean;
  loadingComponent?: React.ReactNode;
}) => {
  if (isLoaded && loadingComponent) {
    return <>{loadingComponent}</>;
  }

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
        <p className="text-slate-300 mb-8">{description}</p>
        <div className="bg-slate-900/50 rounded-lg p-12 border border-slate-800 hover:border-slate-700 transition-colors">
          <div className="space-y-4">
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-gradient-to-r from-slate-700 to-slate-600 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto"></div>
              <div className="h-40 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 rounded-lg"></div>
            </div>
            <button 
              onClick={onLoadContent}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Load Interactive Content
            </button>
            <p className="text-xs text-slate-500 mt-2">
              Click to load advanced features without slowing down the main site
            </p>
          </div>
        </div>
      </div>
    </section>
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
  const [loadedSections, setLoadedSections] = useState({
    ai3dAssistant: false,
    automationShowcase: false,
    interactiveFeatures: false,
    advancedChat: false
  });
  
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

  const loadSection = useCallback((section: keyof typeof loadedSections) => {
    setLoadedSections(prev => ({ ...prev, [section]: true }));
  }, []);

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        
        {/* Hero Section - Ultra Fast & Lightweight */}
        <AnimatedShaderHero 
          headline={{ line1: "NEXAFLOW AI", line2: "Automation" }}
          subtitle="Transform your business with intelligent automation - Lightning Fast!"
        />
        
        {/* Logo Carousel - Keep */}
        <LogoCarouselDemo />
        
        {/* AI Assistant - Smart Loading */}
        <SmartLoadingSection 
          title="AI Assistant Showcase"
          description="Experience our advanced AI automation platform with interactive 3D demonstrations"
          isLoaded={loadedSections.ai3dAssistant}
          onLoadContent={() => loadSection('ai3dAssistant')}
          loadingComponent={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAI3DAssistantShowcase onStartChatting={handleStartChatting} />
            </Suspense>
          }
        />
        
        {/* Features */}
        <AIAutomationFeatures />
        
        {/* Database Demo */}
        <AIAutomationDatabaseDemo />
        
        {/* Automation Showcase - Smart Loading */}
        <SmartLoadingSection 
          title="AI Automation in Action"
          description="See how our platform transforms business processes with intelligent automation"
          isLoaded={loadedSections.automationShowcase}
          onLoadContent={() => loadSection('automationShowcase')}
          loadingComponent={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAIAutomationScrollShowcase />
            </Suspense>
          }
        />
        
        {/* Display Cards */}
        <DisplayCards />
        
        {/* Interactive Features - Smart Loading */}
        <SmartLoadingSection 
          title="Interactive Features"
          description="Explore our comprehensive suite of automation tools and capabilities"
          isLoaded={loadedSections.interactiveFeatures}
          onLoadContent={() => loadSection('interactiveFeatures')}
          loadingComponent={
            <Suspense fallback={<LoadingSpinner />}>
              <LazyInteractiveAccordionDemo />
              <LazyCombinedFeaturedSection />
            </Suspense>
          }
        />
        
        {/* Pricing */}
        <Pricing />
        
        {/* Contact */}
        <ContactDemo />
        
        {/* Footer */}
        <Footerdemo />
        
        {/* Advanced Chat Widget - Smart Loading */}
        {loadedSections.advancedChat && (
          <Suspense fallback={<div />}>
            <LazyAdvancedChatWidget ref={chatWidgetRef} />
          </Suspense>
        )}
        
        {/* Load Chat Button */}
        {!loadedSections.advancedChat && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => loadSection('advancedChat')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
            >
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        )}
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;