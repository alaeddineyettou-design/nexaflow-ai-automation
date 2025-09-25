import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Zap, Target, CheckCircle, ArrowRight } from 'lucide-react';
import SectionWithMockup from './ui/section-with-mockup';
import { Button } from './ui/button';
import { AIAutomationDashboard } from './AIAutomationDashboard';
import { DashboardMockup } from './DashboardMockup';

export const AIAutomationShowcase: React.FC = () => {
  const handleBookCall = () => {
    window.open('https://cal.com/alae-automation/ai-automation-business', '_blank');
  };

  // Time saving data
  const timeSavings = [
    { period: 'Daily', hours: 4, tasks: 'Email responses, Data entry, Report generation' },
    { period: 'Weekly', hours: 28, tasks: 'Customer support, Invoice processing, Lead qualification' },
    { period: 'Monthly', hours: 120, tasks: 'Analytics reports, Content creation, Scheduling' },
    { period: 'Yearly', hours: 1440, tasks: 'Complete workflow automation, Strategic insights' }
  ];

  const advantages = [
    { icon: <Zap className="w-6 h-6" />, title: '10x Faster Processing', desc: 'Automate repetitive tasks instantly' },
    { icon: <Target className="w-6 h-6" />, title: '99.9% Accuracy', desc: 'Eliminate human error completely' },
    { icon: <TrendingUp className="w-6 h-6" />, title: '24/7 Operation', desc: 'Work while you sleep' },
    { icon: <CheckCircle className="w-6 h-6" />, title: 'Cost Reduction', desc: 'Save up to 70% on operational costs' }
  ];

  return (
    <div className="space-y-0">
      {/* First Section - Time Savings Calculator */}
      <SectionWithMockup
        title={
          <>
            See how much time
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              AI saves you
            </span>
          </>
        }
        description={
          <div className="space-y-6">
            <p className="text-[#868f97] text-sm md:text-[15px] leading-6">
              Our AI automation solutions eliminate hours of manual work every day. 
              See the exact time savings based on real client results.
            </p>
            
            {/* Time Savings Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {timeSavings.map((saving, index) => (
                <motion.div
                  key={saving.period}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-4 border border-slate-700/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span className="text-white font-semibold text-sm">{saving.period}</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">
                    {saving.hours}h
                  </div>
                  <div className="text-xs text-slate-400 leading-tight">
                    {saving.tasks}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button 
                onClick={handleBookCall}
                className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Calculate Your Savings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center"
        secondaryImageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center"
        reverseLayout={false}
      />

      {/* Second Section - AI Advantages */}
      <SectionWithMockup
        title={
          <>
            AI Automation
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Advantages
            </span>
          </>
        }
        description={
          <div className="space-y-6">
            <p className="text-[#868f97] text-sm md:text-[15px] leading-6">
              Transform your business operations with cutting-edge AI technology. 
              Here's why thousands of businesses choose our automation solutions.
            </p>
            
            {/* Advantages Grid */}
            <div className="space-y-4 mt-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-slate-800/30 to-slate-900/30 rounded-xl border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg text-purple-400">
                    {advantage.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {advantage.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {advantage.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-6 flex gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button 
                onClick={handleBookCall}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Automation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.open('https://wa.me/4915560957826', '_blank')}
                className="border-slate-600 text-slate-300 hover:bg-slate-800 px-6 py-3 rounded-xl"
              >
                Ask Questions
              </Button>
            </motion.div>
          </div>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&crop=center"
        secondaryImageSrc="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&crop=center"
        reverseLayout={true}
      />

      {/* Call to Action Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-500">automate</span> your success?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join over 500+ businesses that have already transformed their operations with our AI automation solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleBookCall}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-sm text-slate-400">
                🚀 Get your automation roadmap in 30 minutes
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
