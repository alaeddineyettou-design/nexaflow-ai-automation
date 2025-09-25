import React from 'react';
import { ShoppingCart, Users, TrendingUp, ExternalLink } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "E-commerce Integration",
      description: "Automated order processing, inventory management, and customer communications for a retail client. Reduced processing time by 75% and eliminated manual errors.",
      platform: "Make.com",
      roi: "380%",
      results: [
        "75% reduction in processing time",
        "Zero manual errors",
        "24/7 automated operations"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Marketing Automation",
      description: "Built comprehensive lead nurturing system connecting HubSpot, Slack, and Google Sheets. Increased qualified leads by 120% while reducing manual follow-up time.",
      platform: "n8n",
      roi: "450%",
      results: [
        "120% increase in qualified leads",
        "90% reduction in manual tasks",
        "Real-time lead scoring"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "HR Process Automation",
      description: "Streamlined onboarding, timesheet processing, and performance reviews. Saved HR team 15 hours weekly and improved employee satisfaction scores.",
      platform: "Make.com",
      roi: "320%",
      results: [
        "15 hours saved weekly",
        "50% faster onboarding",
        "Improved satisfaction scores"
      ]
    }
  ];

  return (
    <section id="portfolio" className="py-20 px-6 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-gray-400">
            Real results from real businesses
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-slate-800/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center text-white">
                    {project.icon}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold text-emerald-400 mb-4">{project.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex justify-between items-center mb-6 p-4 bg-slate-700/50 rounded-xl">
                  <div>
                    <span className="text-blue-400 font-semibold">Platform:</span>
                    <span className="text-white ml-2">{project.platform}</span>
                  </div>
                  <div>
                    <span className="text-blue-400 font-semibold">ROI:</span>
                    <span className="text-emerald-400 font-bold ml-2">{project.roi}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Key Results:</h4>
                  {project.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center text-gray-300">
                      <span className="text-emerald-400 mr-3 font-bold">✓</span>
                      {result}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;