"use client";

import { LeadsTable } from "@/components/ui/leads-data-table";

export default function AIAutomationLeadsDemo() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-Time Lead Intelligence
            <span className="block text-blue-600 dark:text-blue-400">
              Powered by AI Automation
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Track, analyze, and engage with your leads using our intelligent automation dashboard. 
            See real conversion data from businesses actively using our AI automation platform since 2024.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Conversion Rate</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">$520K</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Pipeline</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">156</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active Leads</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">2.3x</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">ROI Increase</div>
          </div>
        </div>

        {/* Main Table */}
        <LeadsTable />
      </div>
    </section>
  );
}