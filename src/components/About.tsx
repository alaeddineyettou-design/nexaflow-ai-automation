import React from 'react';
import { Users, Award, Clock, Shield } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: <Award className="w-8 h-8" />, number: "5+", label: "Years Experience" },
    { icon: <Users className="w-8 h-8" />, number: "50+", label: "Happy Clients" },
    { icon: <Clock className="w-8 h-8" />, number: "24/7", label: "Support Available" },
    { icon: <Shield className="w-8 h-8" />, number: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <section id="about" className="py-20 px-6 bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Alaeddine & NexaFlow
          </h2>
          <p className="text-xl text-gray-400">
            Your trusted AI automation specialist based in Germany
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-6">
              Certified AI Automation Expert - Alaeddine
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hello! I'm Alaeddine, a certified AI automation specialist based in Germany with extensive experience in Make.com, n8n, and cutting-edge automation platforms. My mission is to empower businesses by eliminating repetitive tasks, optimizing workflows, and implementing intelligent solutions that drive real growth.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              With a proven track record of delivering successful automation projects across Europe and globally, I specialize in creating custom solutions that adapt to your business needs. From e-commerce automation to CRM integration and advanced AI workflows, I ensure every implementation delivers measurable ROI and long-term value.
            </p>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Currently Available for Projects</span>
              </div>
              <p className="text-slate-300">
                📧 <strong>Contact:</strong> alaeddine@automationsolutions.bond<br/>
                📞 <strong>Phone:</strong> +49 15560 957826<br/>
                🌍 <strong>Location:</strong> Germany & Global Services
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-8">
            <h4 className="text-2xl font-bold text-white mb-8 text-center">Why Choose Alaeddine?</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">Certified Expertise</h5>
                  <p className="text-gray-400">Professional certifications and proven track record in AI automation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">Client-Focused Approach</h5>
                  <p className="text-gray-400">Tailored solutions designed around your specific business needs</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-white mb-2">Ongoing Support</h5>
                  <p className="text-gray-400">Comprehensive training and 24/7 support to ensure success</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;