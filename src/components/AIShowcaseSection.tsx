import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Zap, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { AIAutomationDashboard } from './AIAutomationDashboard';
import { DashboardMockup } from './DashboardMockup';

export const AIShowcaseSection: React.FC = () => {
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

  const containerVariants = {
    hidden: {},
    visible: {
       transition: {
          staggerChildren: 0.2,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.7, 
            ease: [0.25, 0.46, 0.45, 0.94] as any
        } 
    },
  };

  return (
    <div className="space-y-0">
      {/* First Section - Time Savings with AI Dashboard */}
      <section className="relative py-24 md:py-48 bg-black overflow-hidden">
        <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
          <motion.div
             className="grid grid-cols-1 gap-16 md:gap-8 w-full items-center md:grid-cols-2"
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
          >
            {/* Text Content */}
            <motion.div
              className="flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0"
              variants={itemVariants}
            >
              <div className="space-y-2 md:space-y-1">
                <h2 className="text-white text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                  See how much time
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    AI saves you
                  </span>
                </h2>
              </div>

              <p className="text-[#868f97] text-sm md:text-[15px] leading-6 mb-6">
                Our AI automation solutions eliminate hours of manual work every day. 
                See the exact time savings based on real client results.
              </p>
              
              {/* Time Savings Grid */}
              <div className="grid grid-cols-2 gap-4 w-full">
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
            </motion.div>

            {/* AI Dashboard Mockup */}
            <motion.div
              className="relative mt-10 md:mt-0 mx-auto w-full max-w-[300px] md:max-w-[471px]"
              variants={itemVariants}
            >
              {/* Decorative Background Element */}
              <motion.div
                 className="absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-[32px] z-0"
                 style={{
                    top: '10%',
                    left: '-20%',
                    transform: 'translateY(10%)',
                    filter: 'blur(2px)'
                }}
                initial={{ y: 0 }}
                whileInView={{ y: -30 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                  <DashboardMockup />
                </div>
              </motion.div>

              {/* Main AI Dashboard */}
              <motion.div
                className="relative w-full h-[405px] md:h-[637px] bg-[#ffffff0a] rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                initial={{ y: 0 }}
                whileInView={{ y: 30 }}
                 transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                 viewport={{ once: true, amount: 0.5 }}
              >
                <AIAutomationDashboard />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom gradient */}
        <div
          className="absolute w-full h-px bottom-0 left-0 z-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      </section>

      {/* Second Section - AI Advantages */}
      <section className="relative py-24 md:py-48 bg-black overflow-hidden">
        <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
          <motion.div
             className="grid grid-cols-1 gap-16 md:gap-8 w-full items-center md:grid-cols-2 md:grid-flow-col-dense"
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.2 }}
          >
            {/* Text Content */}
            <motion.div
              className="flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 md:col-start-2"
              variants={itemVariants}
            >
              <div className="space-y-2 md:space-y-1">
                <h2 className="text-white text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                  AI Automation
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                    Advantages
                  </span>
                </h2>
              </div>

              <p className="text-[#868f97] text-sm md:text-[15px] leading-6 mb-6">
                Transform your business operations with cutting-edge AI technology. 
                Here's why thousands of businesses choose our automation solutions.
              </p>
              
              {/* Advantages Grid */}
              <div className="space-y-4 w-full">
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
            </motion.div>

            {/* Performance Dashboard Mockup */}
            <motion.div
              className="relative mt-10 md:mt-0 mx-auto md:col-start-1 w-full max-w-[300px] md:max-w-[471px]"
              variants={itemVariants}
            >
              {/* Decorative Background Element */}
              <motion.div
                 className="absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-[#090909] rounded-[32px] z-0"
                 style={{
                    bottom: '10%',
                    right: '-20%',
                    transform: 'translate(0, 0)',
                    filter: 'blur(2px)'
                }}
                initial={{ y: 0 }}
                whileInView={{ y: -20 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="relative w-full h-full rounded-[32px] overflow-hidden">
                  <AIAutomationDashboard />
                </div>
              </motion.div>

              {/* Main Performance Dashboard */}
              <motion.div
                className="relative w-full h-[405px] md:h-[637px] bg-[#ffffff0a] rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
                initial={{ y: 0 }}
                whileInView={{ y: 20 }}
                 transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                 viewport={{ once: true, amount: 0.5 }}
              >
                <DashboardMockup />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative bottom gradient */}
        <div
          className="absolute w-full h-px bottom-0 left-0 z-0"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      </section>

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
