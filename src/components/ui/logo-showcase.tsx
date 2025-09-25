"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { 
  Zap, 
  Bot, 
  Workflow, 
  Settings, 
  Database, 
  Cloud,
  Cpu,
  GitBranch
} from "lucide-react"

interface LogoItem {
  name: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface LogoShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: LogoItem[]
  title?: string
  subtitle?: string
}

export function LogoShowcase({ 
  logos, 
  title = "Powered by Industry Leaders",
  subtitle = "We leverage the most advanced automation platforms",
  className, 
  ...props 
}: LogoShowcaseProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 font-semibold text-sm mb-4"
        >
          AUTOMATION PLATFORMS
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-slate-400"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.1, 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:shadow-lg",
              logo.bgColor,
              `group-hover:shadow-${logo.color.split('-')[1]}-500/50`
            )}>
              <div className={cn("transition-transform duration-300 group-hover:scale-110", logo.color)}>
                {logo.icon}
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors duration-300">
              {logo.name}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  )
}