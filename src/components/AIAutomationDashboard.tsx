import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Bot, Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export const AIAutomationDashboard: React.FC = () => {
  const automationData = [
    { name: 'Email Processing', status: 'active', processed: '2,847', saved: '47.2h', efficiency: '+94%', positive: true },
    { name: 'Lead Qualification', status: 'active', processed: '1,234', saved: '28.5h', efficiency: '+87%', positive: true },
    { name: 'Report Generation', status: 'active', processed: '456', saved: '15.8h', efficiency: '+92%', positive: true },
    { name: 'Customer Support', status: 'active', processed: '3,421', saved: '62.1h', efficiency: '+89%', positive: true },
    { name: 'Data Entry', status: 'active', processed: '5,678', saved: '89.3h', efficiency: '+96%', positive: true },
  ];

  const tasksToday = [
    { task: 'Process invoices', status: 'completed' },
    { task: 'Generate sales report', status: 'completed' },
    { task: 'Update customer database', status: 'in-progress' },
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-6 h-full overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-xl font-semibold mb-1">AI Automation Performance</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your AI assistants are working around the clock, processing thousands of tasks<br />
            while you focus on strategic growth. Real-time insights show automated workflows<br />
            saving 240+ hours monthly across email processing, lead qualification, and customer<br />
            support. Smart algorithms continuously optimize performance for maximum efficiency.
          </p>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-2xl p-4 border border-emerald-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-gray-400 text-sm mb-1">Time Saved Today</div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-lg font-semibold">+8.7h</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-2xl p-4 border border-blue-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-gray-400 text-sm mb-1">Overall Efficiency</div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-lg font-semibold">+91.2%</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
        </motion.div>
      </div>

      {/* Automation List */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-gray-400 text-xs">
          <span>Active Automations</span>
          <span>Weekly Performance</span>
        </div>
        
        {automationData.map((automation, index) => (
          <motion.div
            key={automation.name}
            className="flex items-center justify-between py-2 hover:bg-slate-800/30 rounded-lg px-2 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                automation.name.includes('Email') ? 'bg-emerald-500' :
                automation.name.includes('Lead') ? 'bg-blue-500' :
                automation.name.includes('Report') ? 'bg-purple-500' :
                automation.name.includes('Customer') ? 'bg-orange-500' :
                'bg-cyan-500'
              }`} />
              <div>
                <div className="text-white font-medium text-sm">{automation.name}</div>
                <div className="text-gray-400 text-xs">{automation.processed} processed</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-medium text-sm">{automation.saved}</div>
              <div className="text-emerald-400 text-xs">
                {automation.efficiency}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Today's Tasks */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">AI Tasks Today</span>
          <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">3</span>
        </div>
        
        <div className="space-y-2">
          {tasksToday.map((task, index) => (
            <motion.div
              key={task.task}
              className="flex items-center justify-between py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  task.status === 'completed' ? 'bg-emerald-500' : 'bg-yellow-500'
                }`} />
                <span className="text-white text-sm font-medium">{task.task}</span>
              </div>
              {task.status === 'completed' ? (
                <CheckCircle className="w-3 h-3 text-emerald-500" />
              ) : (
                <AlertCircle className="w-3 h-3 text-yellow-500" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="border-t border-gray-700 pt-4 mt-4">
        <h4 className="text-gray-400 text-sm font-medium mb-3">AI Insights</h4>
        <p className="text-gray-500 text-xs leading-relaxed">
          Your automation systems are performing 15% above average. Consider expanding email automation to handle weekend inquiries.
        </p>
      </div>

      {/* Floating AI Icon */}
      <div className="absolute top-4 right-4">
        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className="w-4 h-4 text-white" />
        </motion.div>
      </div>
    </div>
  );
};
