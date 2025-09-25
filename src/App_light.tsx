import { useState, useCallback, useRef } from 'react';
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

// Lightweight loading component
const LightLoadingSection = ({ title, description }: { title: string; description: string }) => (
  <section className="py-20 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      <p className="text-slate-300 mb-8">{description}</p>
      <div className="bg-slate-900/50 rounded-lg p-12 border border-slate-800">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded mb-4"></div>
          <div className="h-4 bg-slate-700 rounded mb-2"></div>
          <div className="h-4 bg-slate-700 rounded mb-2"></div>
          <div className="h-32 bg-slate-700 rounded"></div>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Load Interactive Content
        </button>
      </div>
    </div>
  </section>
);

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
  }, []);

  const handleStartChatting = useCallback(() => {
    window.open('https://cal.com/alae-automation/ai-automation-business', '_blank');
  }, []);

  if (showPreloader) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950">
        <Navigation />
        
        {/* Hero Section - Lightweight */}
        <AnimatedShaderHero />
        
        {/* Logo Carousel - Keep */}
        <LogoCarouselDemo />
        
        {/* AI Assistant - Lightweight Placeholder */}
        <LightLoadingSection 
          title="AI Assistant Showcase"
          description="Experience our advanced AI automation platform with interactive 3D demonstrations"
        />
        
        {/* Features */}
        <AIAutomationFeatures />
        
        {/* Database Demo */}
        <AIAutomationDatabaseDemo />
        
        {/* Automation Showcase - Lightweight Placeholder */}
        <LightLoadingSection 
          title="AI Automation in Action"
          description="See how our platform transforms business processes with intelligent automation"
        />
        
        {/* Display Cards */}
        <DisplayCards />
        
        {/* Interactive Features - Lightweight Placeholder */}
        <LightLoadingSection 
          title="Interactive Features"
          description="Explore our comprehensive suite of automation tools and capabilities"
        />
        
        {/* Pricing */}
        <Pricing />
        
        {/* Contact */}
        <ContactDemo />
        
        {/* Footer */}
        <Footerdemo />
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;