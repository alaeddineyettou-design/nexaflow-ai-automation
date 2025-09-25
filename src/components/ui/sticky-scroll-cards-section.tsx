import { useState, useEffect, useRef } from 'react';

// --- Data for AI Automation features ---
const features = [
  {
    title: "AI-Powered Email Automation 🚀",
    description: "Transform your email marketing with intelligent automation. Our AI analyzes customer behavior, personalizes content, and sends emails at optimal times. Achieve 300% higher open rates and 500% more conversions while saving 47 hours per week.",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 dark:from-purple-900 dark:via-blue-900 dark:to-indigo-900",
    textColor: "text-gray-800 dark:text-gray-100",
    metrics: "47hrs/week saved • 300% open rates • 500% conversions",
    icon: "📧"
  },
  {
    title: "Smart Lead Processing System ⚡",
    description: "Revolutionary AI system that processes unlimited leads automatically. Qualify prospects, score opportunities, and route to sales teams instantly. Handle 2000% more leads with the same staff - from 15 leads to 300+ weekly.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900 dark:via-teal-900 dark:to-cyan-900",
    textColor: "text-gray-800 dark:text-gray-100",
    metrics: "2000% lead increase • 300+ leads/week • Zero manual work",
    icon: "🎯"
  },
  {
    title: "Intelligent Report Generation 📊",
    description: "Generate comprehensive business reports in seconds, not hours. Our AI analyzes your data, creates insights, and produces detailed reports with 10x more accuracy. Transform 16-hour monthly tasks into 5-minute automated processes.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 dark:from-orange-900 dark:via-amber-900 dark:to-yellow-900",
    textColor: "text-gray-800 dark:text-gray-100",
    metrics: "16hrs → 5min • 10x more insights • $4K monthly savings",
    icon: "📈"
  },
  {
    title: "Complete Business Automation Suite 🏆",
    description: "Full-scale AI automation that eliminates entire departments. Our comprehensive suite handles customer service, data processing, scheduling, and operations automatically. Save $215K annually while increasing efficiency by 400%.",
    imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bgColor: "bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 dark:from-rose-900 dark:via-pink-900 dark:to-fuchsia-900",
    textColor: "text-gray-800 dark:text-gray-100",
    metrics: "$215K saved annually • 400% ROI • 3 positions eliminated",
    icon: "🤖"
  },
];

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
};

// --- Header Component ---
const AnimatedHeader = () => {
    const [headerRef, headerInView] = useScrollAnimation();
    const [pRef, pInView] = useScrollAnimation();

    return (
        <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full px-6 py-3 mb-6">
                <span className="text-2xl">🚀</span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">AI AUTOMATION REVOLUTION</span>
            </div>
            <h2 
                ref={headerRef as any}
                className={`text-5xl md:text-6xl font-bold transition-all duration-700 ease-out mb-6 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
                    Transform Your Business
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                    With AI Automation
                </span>
            </h2>
            <p 
                ref={pRef as any}
                className={`text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-all duration-700 ease-out delay-200 ${pInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transformStyle: 'preserve-3d' }}
            >
                🔥 Save <span className="font-bold text-emerald-500">47+ hours weekly</span> • Generate <span className="font-bold text-blue-500">$215K+ savings</span> • Increase efficiency by <span className="font-bold text-purple-500">2000%</span>
                <br />
                <span className="text-lg mt-2 block">Proven results with over 50+ businesses automated successfully</span>
            </p>
        </div>
    );
};

// This is the main component that orchestrates everything.
export function StickyFeatureSection() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="px-[5%] relative z-10">
        <div className="max-w-7xl mx-auto">
          <section className="py-24 md:py-32 flex flex-col items-center">
            
            <AnimatedHeader />

            {/* The container for the sticky cards */}
            <div className="w-full">
              {features.map((feature, index) => (
                <div
                    key={index}
                    className={`${feature.bgColor} grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 p-8 md:p-12 lg:p-16 rounded-3xl mb-16 sticky shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden`}
                    style={{ top: '120px' }}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                  
                  {/* Card Content */}
                  <div className="flex flex-col justify-center relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-4xl">{feature.icon}</span>
                      <div className="flex-1">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                          {feature.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className={`${feature.textColor} text-lg leading-relaxed mb-6`}>
                      {feature.description}
                    </p>
                    
                    {/* Metrics badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 rounded-2xl px-6 py-3 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
                      <span className="text-emerald-500 font-bold">✅</span>
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {feature.metrics}
                      </span>
                    </div>
                  </div>
                  
                  {/* Card Image */}
                  <div className="image-wrapper mt-8 lg:mt-0 relative z-10">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img 
                          src={feature.imageUrl} 
                          alt={feature.title}
                          loading="lazy"
                          className="w-full h-[300px] md:h-[400px] object-cover transform hover:scale-105 transition-transform duration-700"
                          onError={(e) => { 
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; 
                            target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=400&auto=format&fit=crop"; 
                          }}
                      />
                      {/* Image overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Section */}
            <div className="text-center mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white shadow-2xl w-full max-w-4xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                🎯 Ready to Automate Your Business?
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Join 50+ businesses saving $215K+ annually with our AI automation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                  🚀 Get Free Automation Analysis
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                  📞 Book Consultation Call
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}