import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg"
import NumberFlowAnimated from "@/components/ui/number-flow"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  colors: string[]
  delay: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
  className = "",
  prefix = "",
  suffix = "",
  decimals
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.03} blur="medium" />
      <div className="relative z-10 p-6 h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              {title}
            </h3>
            <p className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1">
              {prefix}
              {typeof value === 'number' ? (
                <NumberFlowAnimated
                  value={value}
                  className="inline-block"
                  format={decimals !== undefined ? {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                  } : value > 1000 ? {
                    notation: 'compact',
                    compactDisplay: 'short'
                  } : undefined}
                />
              ) : (
                value
              )}
              {suffix}
            </p>
          </div>
          {subtitle && (
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-4">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const BusinessMetricsDashboard: React.FC = () => {
  const [totalRevenue, setTotalRevenue] = useState(1234977)
  const [newUsers, setNewUsers] = useState(1236)
  const [conversionRate, setConversionRate] = useState(3.4)
  const [activeProjects, setActiveProjects] = useState(40)
  const [satisfaction, setSatisfaction] = useState(4.8)

  // Realistic updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalRevenue(prev => prev + Math.floor(Math.random() * 500))
      setNewUsers(prev => prev + Math.floor(Math.random() * 3))
      setConversionRate(prev => +(Math.max(3.0, Math.min(5.0, prev + (Math.random() - 0.5) * 0.1))).toFixed(2))
      setActiveProjects(prev => Math.max(35, Math.min(50, prev + Math.floor((Math.random() - 0.5) * 2))))
      setSatisfaction(prev => +(Math.max(4.5, Math.min(5.0, prev + (Math.random() - 0.5) * 0.05))).toFixed(1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Business Performance
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Real-time analytics and insights to track your business growth and success
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Revenue - Large Card */}
          <MetricCard
            title="Total Revenue"
            value={totalRevenue}
            prefix="$"
            subtitle="15% increase from last month"
            colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
            delay={0.1}
            className="md:col-span-2 h-48"
          />
          
          {/* New Users */}
          <MetricCard
            title="New Users"
            value={newUsers}
            subtitle="Daily signups"
            colors={["#10B981", "#34D399", "#6EE7B7"]}
            delay={0.2}
            className="h-48"
          />
          
          {/* Conversion Rate */}
          <MetricCard
            title="Conversion Rate"
            value={conversionRate}
            suffix="%"
            decimals={1}
            subtitle="0.5% increase from last week"
            colors={["#F59E0B", "#FBBF24", "#FCD34D"]}
            delay={0.3}
            className="h-48"
          />
          
          {/* Active Projects - Large Card */}
          <MetricCard
            title="Active Projects"
            value={activeProjects}
            subtitle="8 completed this month"
            colors={["#8B5CF6", "#A78BFA", "#C4B5FD"]}
            delay={0.4}
            className="md:col-span-2 h-48"
          />
          
          {/* Customer Satisfaction - Full Width */}
          <MetricCard
            title="Customer Satisfaction"
            value={satisfaction}
            suffix="/5"
            decimals={1}
            subtitle="Based on 1,000+ reviews from verified customers across all product categories"
            colors={["#EC4899", "#F472B6", "#FBCFE8"]}
            delay={0.5}
            className="md:col-span-3 h-48"
          />
        </div>
      </div>
    </section>
  )
}

export { BusinessMetricsDashboard }