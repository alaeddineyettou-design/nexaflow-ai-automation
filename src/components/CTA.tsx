import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { StarBorder } from '@/components/ui/star-border';

const CTA: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-6 bg-slate-900/60 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full mb-8">
          <Zap className="w-10 h-10 text-blue-400 animate-pulse" />
        </div>

        {/* Title */}
        <h2 className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
          Ready to Transform Your Business?
        </h2>

        {/* Description */}
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Join thousands of companies already leveraging next-generation automation. 
          Start your journey to unprecedented efficiency and growth today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <StarBorder 
            onClick={() => scrollToSection('contact')}
            className="group"
            color="hsl(59, 100%, 63%)"
            speed="4s"
          >
            <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold px-8 py-4 rounded-[20px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 relative overflow-hidden">
              <span className="relative z-10">Start Free Consultation</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            </div>
          </StarBorder>
          
          <StarBorder 
            onClick={() => scrollToSection('features')}
            className="group"
            color="hsl(195, 100%, 63%)"
            speed="5s"
          >
            <div className="border-2 border-blue-400/50 text-white font-semibold px-8 py-4 rounded-[20px] transition-all duration-300 hover:bg-blue-400/10 hover:border-cyan-400 hover:-translate-y-1">
              Explore Platform
            </div>
          </StarBorder>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-blue-500/20">
          <p className="text-slate-400 mb-4">Trusted by industry leaders</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-2xl">🏢</div>
            <div className="text-2xl">🚀</div>
            <div className="text-2xl">💼</div>
            <div className="text-2xl">🌟</div>
            <div className="text-2xl">⚡</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;