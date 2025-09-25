
import { useState, useCallback } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import AnimatedShaderHero from './components/ui/animated-shader-hero';
import TrustedBySection from './components/TrustedBySection';
import { ContactDemo } from './components/ContactDemo';
import InteractiveAccordionDemo from './components/InteractiveAccordionDemo';
import { Footerdemo } from './components/ui/footer-section';
import Testimonials from './components/ui/testimonials-columns-1';
import AIAutomationScrollShowcase from './components/AIAutomationScrollShowcase';
import AIAutomationFeatures from './components/AIAutomationFeatures';
import AIAutomationDatabaseDemo from './components/AIAutomationDatabaseDemo';
import Pricing from './components/Pricing';
import Preloader from './components/ui/preloader';
import CombinedFeaturedSection from './components/ui/combined-featured-section';
import DisplayCards from './components/ui/display-cards';
import { AI3DAssistantShowcase } from './components/AI3DAssistantShowcase';
import { Toaster } from './components/ui/sonner';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false);
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
                  onClick: () => console.log('Explore Features clicked!')
                }
              }}
            />
          </section>

          {/* Trusted By Section */}
          <section id="trusted" className="relative">
            <TrustedBySection />
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
            <CombinedFeaturedSection />
          </section>

          {/* AI 3D Assistant Showcase */}
          <section id="ai-assistant" className="relative">
            <AI3DAssistantShowcase />
          </section>

          {/* AI Automation Database Demo */
          <section id="database" className="relative">
            <AIAutomationDatabaseDemo />
          </section>

          {/* AI Automation Scroll Showcase */}
          <section id="showcase" className="relative">
            <AIAutomationScrollShowcase />
          </section>

          {/* Interactive Accordion Demo */}
          <section id="accordion" className="relative">
            <InteractiveAccordionDemo />
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="relative">
            <Testimonials />
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
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;