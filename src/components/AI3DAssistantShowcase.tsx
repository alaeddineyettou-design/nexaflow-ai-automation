'use client'

import { SimpleSpline } from "@/components/ui/simple-spline";
import { Spotlight } from "@/components/ui/spotlight"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { BlurredStagger } from "@/components/ui/blurred-stagger-text"
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface AI3DAssistantShowcaseProps {
  onStartChatting?: () => void;
}

export function AI3DAssistantShowcase({ onStartChatting }: AI3DAssistantShowcaseProps) {
  const handleStartChatting = () => {
    if (onStartChatting) {
      onStartChatting();
    } else {
      // Fallback to original behavior if no callback provided
      window.open('https://cal.com/alae-automation/ai-automation-business', '_blank');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            Meet Your AI Automation Assistant
          </div>
          
          <BlurredStagger text="Talk to AI," />
          <BlurredStagger 
            text="Build Automations" 
            gradientColors="from-blue-400 to-purple-400"
            delay={1.0}
          />
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mt-6">
            Experience the future of business automation. Our intelligent 3D assistant understands your needs and creates powerful workflows through natural conversation.
          </p>
        </motion.div>

        {/* Main 3D Interactive Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 relative"
        >
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex h-[600px] relative z-10">
            {/* Left content */}
            <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                  "Hi! I'm your AI Assistant"
                </h3>
                
                <div className="space-y-4 mb-8">
                  <p className="text-slate-300 text-lg">
                    Streamline complex business processes with intelligent automation
                  </p>
                  <p className="text-slate-300 text-lg">
                    Connect and integrate over 1000+ applications seamlessly
                  </p>
                  <p className="text-slate-300 text-lg">
                    Define your automation requirements through natural language
                  </p>
                  <p className="text-slate-300 text-lg">
                    Deploy enterprise-grade solutions in minutes, not hours
                  </p>
                </div>

                <div className="flex gap-4">
                  <RainbowButton 
                    onClick={handleStartChatting}
                    className="px-6 py-3"
                  >
                    Start Chatting
                  </RainbowButton>
                  
                  <RainbowButton 
                    className="px-6 py-3"
                  >
                    Watch Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </RainbowButton>
                </div>
              </motion.div>
            </div>

            {/* Right content - 3D Scene */}
            <div className="flex-1 relative">
              <SimpleSpline 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
              
              {/* Overlay text bubble */}
              <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 max-w-xs">
                <p className="text-white text-sm font-medium">
                  "Connect CRM to email marketing automation"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}