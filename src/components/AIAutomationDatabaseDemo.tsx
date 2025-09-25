"use client";

import { motion } from "framer-motion";
import { GradientText } from "@/components/ui/gradient-text";
import { GLSLHills } from "@/components/ui/glsl-hills";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

const AIAutomationDatabaseDemo = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
      {/* GLSL Hills Background */}
      <div className="absolute inset-0 z-0">
        <GLSLHills />
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 z-[1]" />
      
      {/* Content */}
      <div className="relative z-10 space-y-8 pointer-events-none text-center max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <GradientText 
              className="text-4xl md:text-6xl font-bold relative z-10"
              colors={["#8B5CF6", "#3B82F6", "#06B6D4"]}
            >
              AI-Powered Database Automation
            </GradientText>
            {/* Glow effect behind text */}
            <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 z-0" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your business with intelligent database management that learns, adapts, 
            and optimizes automatically to help your clients make better decisions.
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="pointer-events-auto flex justify-center relative"
        >
          {/* Floating background elements */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full blur-2xl"
          />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <DatabaseWithRestApi
              title="AI Workflow Automation System"
              circleText="AI"
              lightColor="#8B5CF6"
              badgeTexts={{
                first: "AI-LEARN",
                second: "AI-ADAPT", 
                third: "AI-OPTIMIZE",
                fourth: "AI-AUTOMATE"
              }}
              buttonTexts={{
                first: "Smart Workflows",
                second: "AI_Engine"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAutomationDatabaseDemo;
