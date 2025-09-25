import { useState, useCallback, useRef, Suspense, useEffect } from 'react';
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
import { trackWebVitals, perfMonitor } from './lib/performance-monitor';

// Lazy imports للمكونات الثقيلة - يحافظ على جميع الوظائف
import {
  LazyAI3DAssistantShowcase,
  LazyAIAutomationScrollShowcase,
  LazyInteractiveAccordionDemo,
  LazyCombinedFeaturedSection,
  LazyAdvancedChatWidget
} from './utils/lazyComponents';

// Loading component للمكونات الثقيلة
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const chatWidgetRef = useRef<ChatWidgetRef>(null);

  // Initialize performance monitoring
  useEffect(() => {
    try {
      trackWebVitals();
      console.log('🚀 Performance monitoring initialized');
      
      // Log performance report after 10 seconds
      setTimeout(() => {
        try {
          const report = perfMonitor.getReport();
          console.log('📊 Performance Report:', report);
        } catch (error) {
          console.warn('Performance report error:', error);
        }
      }, 10000);
    } catch (error) {
      console.warn('Performance monitoring error:', error);
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    try {
      perfMonitor.endTimer('initial_load');
    } catch (error) {
      console.warn('Performance timer error:', error);
    }
  }, []);

  const handleStartChatting = useCallback(() => {
    if (chatWidgetRef.current) {
      chatWidgetRef.current.openChat();
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="min-h-screen bg-slate-950 text-white transition-colors duration-300">
        <div className="relative z-40 transition-all duration-300">
          <Navigation />
        </div>
        
        <main className="relative">
          {/* Hero Section */}
          <section id="home" className="relative min-h-screen flex items-center justify-center">
            <AnimatedShaderHero 
              headline={{
                line1: "Launch Your",
                line2: "Workflow Into Orbit"
              }}
              subtitle="Supercharge productivity with AI-powered automation and integrations built for the next generation of teams — fast, seamless, and limitless."
              buttons={{
                primary: {
                  text: "Get Started for Free",
                  onClick: () => {
                    const contactElement = document.getElementById('contact');
                    if (contactElement) {
                      contactElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                },
                secondary: {
                  text: "Explore Features", 
                  onClick: () => {
                    const featuresSection = document.getElementById('features');
                    if (featuresSection) {
                      featuresSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }
              }}
            />
          </section>

          {/* Trusted By Section */}
          <section id="trusted" className="relative">
            <LogoCarouselDemo />
          </section>

          {/* AI Automation Features */}
          <section id="features" className="relative">
            <AIAutomationFeatures />
          </section>

          {/* Display Cards - Automation Services */}
          <section id="services" className="relative py-20 bg-gradient-to-b from-slate-950 via-blue-950/20 to-slate-950">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Your ROI Success Story
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Transform time into money with proven automation strategies that deliver measurable results
                </p>
              </div>
              <DisplayCards />
            </div>
          </section>

          {/* Combined Featured Section - Analytics Dashboard */}
          <section id="analytics" className="relative">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyCombinedFeaturedSection />
            </Suspense>
          </section>

          {/* AI 3D Assistant Showcase */}
          <section id="ai-assistant" className="relative">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAI3DAssistantShowcase onStartChatting={handleStartChatting} />
            </Suspense>
          </section>

          {/* AI Automation Database Demo */}
          <section id="database" className="relative">
            <AIAutomationDatabaseDemo />
          </section>

          {/* AI Automation Scroll Showcase */}
          <section id="showcase" className="relative">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyAIAutomationScrollShowcase />
            </Suspense>
          </section>

          {/* Interactive Accordion Demo */}
          <section id="accordion" className="relative">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyInteractiveAccordionDemo />
            </Suspense>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="relative">
            <Pricing />
          </section>

          {/* Contact Demo Section */}
          <section id="contact" className="relative">
            <ContactDemo />
          </section>

          {/* Footer */}
          <footer id="footer" className="relative">
            <Footerdemo />
          </footer>
        </main>
        
        {/* Advanced Chat Widget */}
        <Suspense fallback={null}>
          <LazyAdvancedChatWidget 
            ref={chatWidgetRef}
            clientId="nexaflow"
            clientName="Nexaflow AI Automation"
            primaryColor="#3b82f6"
            secondaryColor="#8b5cf6"
            welcomeMessage="Hello! I'm your AI automation assistant. How can I help you automate your business?"
            title="AI Automation Assistant"
            placeholder="Type your message here to discuss automation solutions..."
            position="bottom-right"
          />
        </Suspense>
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;