"use client";

import { motion } from 'framer-motion';
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import StackFeatureSection from './stack-feature-section';
import ThreeShaderBackground from './three-shader-background';

export function InteractiveImageAccordion() {
  return (
    <ThreeShaderBackground className="w-full py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <BlurredStagger text="AI Automation" />
            <BlurredStagger 
              text="Solutions" 
              gradientColors="from-purple-600 via-blue-600 to-cyan-600"
              delay={1.0}
            />
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your business with intelligent automation that works 24/7. 
              Choose the AI solution that fits your needs and watch your efficiency soar.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="mt-20"
          >
            <StackFeatureSection />
          </motion.div>
        </div>
      </div>
    </ThreeShaderBackground>
  );
}

export default InteractiveImageAccordion;
