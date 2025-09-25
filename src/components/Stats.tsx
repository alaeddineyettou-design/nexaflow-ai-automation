import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Users, Zap } from 'lucide-react';
import NumberFlowAnimated from '@/components/ui/number-flow';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('stats');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      value: 300,
      suffix: '%',
      label: 'Average ROI Increase',
      description: 'Companies see 3x return on investment within 6 months',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Clock,
      value: 40,
      suffix: '+',
      label: 'Hours Saved Per Week',
      description: 'Teams reclaim full work weeks through automation',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      value: 10,
      suffix: 'K+',
      label: 'Active Users',
      description: 'Trusted by professionals across 50+ countries',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      value: 99.9,
      suffix: '%',
      label: 'Uptime Guarantee',
      description: 'Enterprise-grade reliability you can count on',
      color: 'from-orange-500 to-red-500'
    }
  ];



  return (
    <section id="stats" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Proven Results That
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Speak for Themselves
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of businesses already transforming their operations with measurable results.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 text-center hover:border-slate-700/50 transition-all duration-500 backdrop-blur-sm"
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Stat Value */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-3">
                  <NumberFlowAnimated 
                    value={isVisible ? stat.value : 0} 
                    className="inline-block"
                  />
                  {stat.suffix}
                </div>

                {/* Stat Label */}
                <h3 className="text-xl font-semibold text-slate-300 mb-3">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Customer Success Story */}
        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Alaeddine - Automation Expert</h4>
                  <p className="text-slate-400 text-sm">Certified AI Automation Specialist</p>
                </div>
              </div>
              <blockquote className="text-xl text-slate-300 italic mb-6">
                "I specialize in transforming business operations through intelligent automation. Based in Germany, I help companies worldwide eliminate manual processes and achieve remarkable efficiency gains with proven AI automation solutions."
              </blockquote>
              <div className="flex flex-col space-y-2 text-slate-400">
                <div className="flex items-center gap-2">
                  <span>📧 alaeddine@automationsolutions.bond</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞 +49 15560 957826</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌍 Germany & Global Services</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  <NumberFlowAnimated 
                    value={isVisible ? 90 : 0} 
                    className="inline-block"
                  />%
                </div>
                <div className="text-slate-400 text-sm">Time Savings Achieved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  <NumberFlowAnimated 
                    value={isVisible ? 5 : 0} 
                    className="inline-block"
                  />+
                </div>
                <div className="text-slate-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  <NumberFlowAnimated 
                    value={isVisible ? 24 : 0} 
                    className="inline-block"
                  />/7
                </div>
                <div className="text-slate-400 text-sm">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  <NumberFlowAnimated 
                    value={isVisible ? 100 : 0} 
                    className="inline-block"
                  />%
                </div>
                <div className="text-slate-400 text-sm">Professional Quality</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;