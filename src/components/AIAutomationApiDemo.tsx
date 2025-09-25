"use client";

import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

export default function AIAutomationApiDemo() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Text content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Seamless AI 
                <span className="block text-blue-600 dark:text-blue-400">
                  API Integration
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Connect your business systems effortlessly with our intelligent automation platform
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Smart Data Synchronization
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Automatically sync data between multiple platforms with AI-powered mapping and validation
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Real-time Processing
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Process API requests instantly with our high-performance automation engine
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Secure & Scalable
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Enterprise-grade security with unlimited scaling capabilities for growing businesses
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
                Start API Integration
              </button>
            </div>
          </div>
          
          {/* Right side: Database API component */}
          <div className="flex justify-center">
            <DatabaseWithRestApi 
              circleText="API"
              title="AI Automation API Integration"
              buttonTexts={{
                first: "NexaFlow",
                second: "ai_workflows"
              }}
              badgeTexts={{
                first: "GET",
                second: "POST", 
                third: "PUT",
                fourth: "DELETE"
              }}
              lightColor="#3B82F6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}