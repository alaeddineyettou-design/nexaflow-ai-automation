"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";
import { Brain, Zap, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import StackFeatureSection from './stack-feature-section';
import ThreeShaderBackground from './three-shader-background';

const accordionItems = [
  {
    id: 1,
    title: 'AI Decision Engine',
    subtitle: 'Smart Business Intelligence',
    description: 'Automate complex business decisions with AI that learns from your data patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop',
    icon: Brain,
    color: 'from-purple-500 to-blue-500',
    benefits: ['24/7 Decision Making', 'Predictive Analytics', 'Risk Assessment']
  },
  {
    id: 2,
    title: 'Process Automation',
    subtitle: 'Workflow Optimization',
    description: 'Transform manual processes into intelligent automated workflows.',
    imageUrl: 'https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=80&w=1974&auto=format&fit=crop',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    benefits: ['Save 8+ Hours Daily', 'Error Reduction', 'Cost Optimization']
  },
  {
    id: 3,
    title: 'AI Customer Service',
    subtitle: 'Intelligent Support',
    description: 'Deploy smart chatbots that understand context and solve problems 24/7.',
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=2070&auto=format&fit=crop',
    icon: Bot,
    color: 'from-cyan-500 to-teal-500',
    benefits: ['Instant Responses', 'Multi-Language Support', 'Human-like Interactions']
  }
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
  index: number;
}

const AccordionItem = ({ item, isActive, onMouseEnter, index }: AccordionItemProps) => {
  const Icon = item.icon;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-out",
        "group border border-white/10 backdrop-blur-sm",
        isActive ? "flex-[3] shadow-2xl" : "flex-[0.5] hover:flex-[0.8]"
      )}
      onMouseEnter={onMouseEnter}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        minHeight: '500px',
        maxWidth: isActive ? '500px' : '120px'
      }}
    >
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${item.imageUrl})` }}
          animate={{
            scale: isActive ? 1.1 : 1.2,
            filter: isActive ? 'brightness(0.7)' : 'brightness(0.4)'
          }}
          transition={{ duration: 0.7 }}
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t",
          `${item.color} opacity-80`
        )} />
      </div>

      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="mb-4 p-3 rounded-full bg-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          <motion.h3
            className="text-white font-bold text-lg mb-2 text-center"
            animate={{
              writingMode: isActive ? 'horizontal-tb' : 'vertical-rl',
              textOrientation: isActive ? 'mixed' : 'mixed'
            }}
            transition={{ duration: 0.5 }}
          >
            {item.title}
          </motion.h3>
        </div>

        <motion.div
          className="flex-1 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isActive ? 1 : 0,
            display: isActive ? 'flex' : 'none'
          }}
          transition={{ duration: 0.5, delay: isActive ? 0.3 : 0 }}
        >
          <div className="space-y-4">
            <div>
              <p className="text-blue-200 text-sm font-medium mb-2">{item.subtitle}</p>
              <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
            </div>

            <div className="space-y-2">
              {item.benefits.map((benefit, idx) => (
                <motion.div
                  key={benefit}
                  className="flex items-center space-x-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-white/80 text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }}
            className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4 min-h-[540px]"
          >
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                item={item}
                isActive={index === activeIndex}
                onMouseEnter={() => handleItemHover(index)}
                index={index}
              />
            ))}
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
