"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PulseBeams } from "./pulse-beams";

// Automation connection network - Center to branches like the image
const automationBeams = [
  // Data connection - Top Left
  {
    path: "M450 250L200 120",
    gradientConfig: {
      initial: { x1: "50%", x2: "50%", y1: "50%", y2: "50%" },
      animate: {
        x1: ["50%", "20%", "0%"],
        x2: ["50%", "20%", "0%"],
        y1: ["50%", "30%", "20%"],
        y2: ["50%", "30%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        repeatDelay: 1,
        delay: 0,
      },
    },
    connectionPoints: [
      { cx: 450, cy: 250, r: 6 },
      { cx: 200, cy: 120, r: 8 }
    ]
  },
  // Gmail connection - Top Right  
  {
    path: "M450 250L700 120",
    gradientConfig: {
      initial: { x1: "50%", x2: "50%", y1: "50%", y2: "50%" },
      animate: {
        x1: ["50%", "80%", "100%"],
        x2: ["50%", "80%", "100%"],
        y1: ["50%", "30%", "20%"],
        y2: ["50%", "30%", "20%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        repeatDelay: 1,
        delay: 0.5,
      },
    },
    connectionPoints: [
      { cx: 450, cy: 250, r: 6 },
      { cx: 700, cy: 120, r: 8 }
    ]
  },
  // Doc connection - Bottom Left
  {
    path: "M450 250L200 380",
    gradientConfig: {
      initial: { x1: "50%", x2: "50%", y1: "50%", y2: "50%" },
      animate: {
        x1: ["50%", "20%", "0%"],
        x2: ["50%", "20%", "0%"],
        y1: ["50%", "70%", "80%"],
        y2: ["50%", "70%", "80%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        repeatDelay: 1,
        delay: 1,
      },
    },
    connectionPoints: [
      { cx: 450, cy: 250, r: 6 },
      { cx: 200, cy: 380, r: 8 }
    ]
  },
  // Automation connection - Bottom Right
  {
    path: "M450 250L700 380",
    gradientConfig: {
      initial: { x1: "50%", x2: "50%", y1: "50%", y2: "50%" },
      animate: {
        x1: ["50%", "80%", "100%"],
        x2: ["50%", "80%", "100%"],
        y1: ["50%", "70%", "80%"],
        y2: ["50%", "70%", "80%"],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut",
        repeatDelay: 1,
        delay: 1.5,
      },
    },
    connectionPoints: [
      { cx: 450, cy: 250, r: 6 },
      { cx: 700, cy: 380, r: 8 }
    ]
  }
];

const customGradientColors = {
  start: "#60A5FA", // Blue-400
  middle: "#8B5CF6", // Violet-500  
  end: "#EC4899"  // Pink-500
};

interface AdvancedPulseBeamsSectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export const AdvancedPulseBeamsSection = ({ 
  title = "AI Automation Hub",
  subtitle = "Connect and automate your business tools seamlessly",
  children,
  className 
}: AdvancedPulseBeamsSectionProps) => {
  return (
    <section className={cn("relative", className)}>
      <PulseBeams
        beams={automationBeams}
        gradientColors={customGradientColors}
        className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen"
        width={900}
        height={500}
        baseColor="rgba(100, 116, 139, 0.4)"
        accentColor="rgba(59, 130, 246, 0.8)"
      >
        <div className="relative">
          {/* Central Connect Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-800/90 backdrop-blur-sm w-[200px] h-[80px] rounded-full border border-blue-500/30 shadow-2xl shadow-blue-500/20 cursor-pointer relative group"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(59,130,246,0.6)_0%,rgba(59,130,246,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex justify-center items-center h-full text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Connect
            </div>
          </motion.button>

          {/* Data Node - Top Left */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            whileInView={{ opacity: 1, x: -250, y: -130 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute top-0 left-0"
          >
            <AutomationNode 
              icon="📊"
              title="Data"
              subtitle="Analytics & Reports"
              color="from-blue-400 to-cyan-400"
            />
          </motion.div>

          {/* Gmail Node - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            whileInView={{ opacity: 1, x: 250, y: -130 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute top-0 right-0"
          >
            <AutomationNode 
              icon="�"
              title="Gmail"
              subtitle="Email Automation"
              color="from-red-400 to-pink-400"
            />
          </motion.div>

          {/* Doc Node - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: -50 }}
            whileInView={{ opacity: 1, x: -250, y: 130 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0"
          >
            <AutomationNode 
              icon="📄"
              title="Docs"
              subtitle="Document Processing"
              color="from-green-400 to-emerald-400"
            />
          </motion.div>

          {/* Automation Node - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: -50 }}
            whileInView={{ opacity: 1, x: 250, y: 130 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: true }}
            className="absolute bottom-0 right-0"
          >
            <AutomationNode 
              icon="🤖"
              title="AI Bot"
              subtitle="Smart Automation"
              color="from-purple-400 to-violet-400"
            />
          </motion.div>
        </div>
      </PulseBeams>
    </section>
  );
};

const AutomationNode = ({ icon, title, subtitle, color }: {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -5 }}
      className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 border border-slate-600/30 shadow-xl cursor-pointer group"
    >
      <div className="text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className={`text-lg font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r ${color}`}>
          {title}
        </h3>
        <p className="text-slate-400 text-xs">{subtitle}</p>
      </div>
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
    </motion.div>
  );
};