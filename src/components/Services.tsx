import React from 'react';
import { Rocket, Wrench, BarChart3, Handshake, Target, TrendingUp } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Make.com Automation",
      description: "Visual workflow automation connecting 5,000+ apps without coding. Perfect for marketing, sales, and operations.",
      features: [
        "Custom scenario building",
        "Multi-step workflows", 
        "Real-time data sync",
        "Error handling & monitoring"
      ]
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "n8n Implementation",
      description: "Self-hosted, AI-powered automation with complete data control. Ideal for enterprises requiring custom solutions.",
      features: [
        "Self-hosted security",
        "AI agent integration",
        "Custom node development",
        "Advanced API connections"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Process Optimization",
      description: "Comprehensive analysis and redesign of your business processes for maximum efficiency and ROI.",
      features: [
        "Process audit & mapping",
        "Bottleneck identification",
        "ROI calculation",
        "Implementation roadmap"
      ]
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Integration Services",
      description: "Seamlessly connect all your business tools and platforms for unified operations.",
      features: [
        "CRM integration",
        "Email marketing sync",
        "E-commerce automation",
        "Database connections"
      ]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Marketing Automation",
      description: "Automate your entire marketing funnel from lead generation to customer retention.",
      features: [
        "Lead scoring & nurturing",
        "Email campaign automation",
        "Social media scheduling",
        "Analytics & reporting"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Sales Automation",
      description: "Streamline your sales process and close deals faster with intelligent automation.",
      features: [
        "Pipeline management",
        "Quote generation",
        "Follow-up sequences",
        "Commission tracking"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Automation Services
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive solutions to transform your business processes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-slate-900/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-400/50 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <span className="text-emerald-400 mr-3 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;