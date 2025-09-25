import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg"

interface BentoCardProps {
  title: string
  value: string | number
  subtitle?: string
  colors: string[]
  delay: number
}

const BentoCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-background dark:bg-background/50 rounded-lg border border-border/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-3 sm:p-5 md:p-8 text-foreground backdrop-blur-sm h-full flex flex-col justify-between"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3 
          className="text-sm sm:text-base md:text-lg text-foreground font-medium" 
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p 
            className="text-sm text-foreground/80 leading-relaxed" 
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}

const AIAutomationMetricsDemo: React.FC = () => {
  const [timeSaved, setTimeSaved] = useState(24.7)
  const [tasksAutomated, setTasksAutomated] = useState(1847)
  const [efficiency, setEfficiency] = useState(94.2)
  const [activeProcesses, setActiveProcesses] = useState(127)
  const [costSavings, setCostSavings] = useState(285000)

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSaved(prev => +(prev + Math.random() * 0.5).toFixed(1))
      setTasksAutomated(prev => prev + Math.floor(Math.random() * 3))
      setEfficiency(prev => +(Math.max(90, Math.min(99.9, prev + (Math.random() - 0.5) * 0.5))).toFixed(1))
      setActiveProcesses(prev => Math.max(100, Math.min(200, prev + Math.floor((Math.random() - 0.5) * 5))))
      setCostSavings(prev => prev + Math.floor(Math.random() * 1000))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-background h-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            AI Automation Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics showing the power of intelligent automation in transforming business operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-96">
          <div className="md:col-span-2 h-64 md:h-full">
            <BentoCard
              title="⏰ Time Saved Daily"
              value={`${timeSaved}h`}
              subtitle="AI automation eliminates repetitive tasks, saving your team hours every day for strategic work"
              colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
              delay={0.2}
            />
          </div>
          <div className="h-64 md:h-full">
            <BentoCard
              title="🤖 Tasks Automated"
              value={tasksAutomated.toLocaleString()}
              subtitle="Processes running autonomously"
              colors={["#60A5FA", "#34D399", "#93C5FD"]}
              delay={0.4}
            />
          </div>
          <div className="h-64 md:h-full">
            <BentoCard
              title="📈 Efficiency Rate"
              value={`${efficiency}%`}
              subtitle="Accuracy improvement vs manual processes"
              colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
              delay={0.6}
            />
          </div>
          <div className="md:col-span-2 h-64 md:h-full">
            <BentoCard
              title="⚡ Active AI Processes"
              value={activeProcesses}
              subtitle="Smart workflows optimizing operations across departments in real-time"
              colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
              delay={0.8}
            />
          </div>
          <div className="md:col-span-3 h-64 md:h-full">
            <BentoCard
              title="💰 Annual Cost Savings"
              value={`$${costSavings.toLocaleString()}`}
              subtitle="ROI achieved through reduced manual labor costs, eliminated errors, and 24/7 automated operations. AI works while you sleep, delivering consistent results and exponential productivity gains."
              colors={["#EC4899", "#F472B6", "#3B82F6"]}
              delay={1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { AIAutomationMetricsDemo }