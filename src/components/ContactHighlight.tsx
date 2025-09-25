import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Mail, Zap, Bot, Rocket } from 'lucide-react';
import { HighlightGroup, HighlighterItem, Particles } from './ui/highlighter';
import { StarBorder } from './ui/star-border';

export const ContactHighlight: React.FC = () => {
  const handleCalBooking = () => {
    window.open('https://cal.com/alae-automation/ai-automation-business', '_blank');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/4915560957826', '_blank');
  };

  const handleEmail = () => {
    window.open('mailto:contact@alae-automation.com', '_blank');
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Particles */}
      <Particles
        className="absolute inset-0"
        quantity={50}
        staticity={50}
        ease={50}
        color="#8b5cf6"
      />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-purple-300 font-medium">Ready to Transform Your Business?</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-6">
            Let's Build Your AI Empire
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the automation revolution. Book a strategy call, message us directly, or send an email. 
            Your competitors won't wait – neither should you.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <HighlightGroup className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Cal.com Booking */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <HighlighterItem className="group">
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 h-full border border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl" />
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Strategy Call</h3>
                      <p className="text-purple-300">Book Your Free Consultation</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Get a personalized automation roadmap. We'll analyze your business and show you 
                    exactly how AI can 10x your results in 30 minutes.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Bot className="w-5 h-5 text-purple-400" />
                      <span>Custom AI Strategy</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Rocket className="w-5 h-5 text-purple-400" />
                      <span>ROI Projections</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Zap className="w-5 h-5 text-purple-400" />
                      <span>Implementation Plan</span>
                    </div>
                  </div>
                  
                  <StarBorder 
                    onClick={handleCalBooking}
                    className="w-full"
                    color="hsl(270, 100%, 63%)"
                    speed="4s"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25 w-full text-center">
                      Book Free Strategy Call
                    </div>
                  </StarBorder>

                </motion.div>
              </div>
            </HighlighterItem>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <HighlighterItem className="group">
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 h-full border border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl" />
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">WhatsApp</h3>
                      <p className="text-green-300">Instant Response</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Quick questions? Need immediate assistance? Message us directly on WhatsApp 
                    for the fastest response and real-time support.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Zap className="w-5 h-5 text-green-400" />
                      <span>Instant Replies</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Bot className="w-5 h-5 text-green-400" />
                      <span>24/7 Support</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <MessageCircle className="w-5 h-5 text-green-400" />
                      <span>Direct Line</span>
                    </div>
                  </div>
                  
                  <StarBorder 
                    onClick={handleWhatsApp}
                    className="w-full"
                    color="hsl(90, 100%, 63%)"
                    speed="5s"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25 w-full text-center">
                      Message on WhatsApp
                    </div>
                  </StarBorder>
                </motion.div>
              </div>
            </HighlighterItem>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <HighlighterItem className="group">
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 h-full border border-slate-700/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-3xl" />
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Email Us</h3>
                      <p className="text-blue-300">Professional Inquiry</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Prefer email? Send us a detailed message about your automation needs 
                    and we'll respond with a comprehensive solution proposal.
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <span>Detailed Proposals</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Bot className="w-5 h-5 text-blue-400" />
                      <span>Custom Solutions</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Rocket className="w-5 h-5 text-blue-400" />
                      <span>Project Estimates</span>
                    </div>
                  </div>
                  
                  <StarBorder 
                    onClick={handleEmail}
                    className="w-full"
                    color="hsl(195, 100%, 63%)"
                    speed="6s"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 w-full text-center">
                      Send Email
                    </div>
                  </StarBorder>
                </motion.div>
              </div>
            </HighlighterItem>
          </motion.div>
        </HighlightGroup>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl text-gray-300 mb-8">
            Don't let your competitors get ahead. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">
              The future of business is automated – and it starts today.
            </span>
          </p>
          
          <motion.div
            className="inline-flex items-center gap-2 text-purple-300"
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7] 
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Zap className="w-5 h-5" />
            <span className="font-medium">Choose your preferred contact method above</span>
            <Zap className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
