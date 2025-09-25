import React from 'react';
import { Clock, TrendingUp, Zap, Target, CheckCircle, ArrowRight } from 'lucide-react';
import SectionWithMockup from './ui/section-with-mockup';
import { Button } from './ui/button';

export const AIAutomationDemo: React.FC = () => {
  const handleBookCall = () => {
    window.open('https://cal.com/alae-automation/ai-automation-business', '_blank');
  };

  // First section data - REAL CLIENT PROOF
  const timeSavingsData = {
    title: (
      <>
        PROOF: Real Clients
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
          Save 8+ Hours Daily
        </span>
      </>
    ),
    description: (
      <>
        🏢 Johnson Marketing: "We saved 47 hours weekly on email responses"
        <br />
        🏪 TechShop Pro: "Reports that took 16 hours now take 5 minutes"
        <br />
        🏡 Elite Realty: "Processing 300+ leads vs 15 before automation"
        <br />
        📊 These are VERIFIED results from actual paying clients.
      </>
    ),
    primaryNode: (
      <div className="w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10" />
        <div className="relative h-full p-6 md:p-10 grid grid-rows-[auto_1fr_auto] gap-4">
          <div className="flex items-center justify-between">
            <div className="text-white font-bold text-xl">Automation Dashboard</div>
            <div className="text-xs text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-md">VERIFIED</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-300">Email Responses</div>
              <div className="text-3xl font-bold text-emerald-400">47hrs → 3hrs</div>
              <div className="text-xs text-slate-400">per week</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-300">Lead Processing</div>
              <div className="text-3xl font-bold text-emerald-400">15 → 300+</div>
              <div className="text-xs text-slate-400">leads weekly</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-300">Reports</div>
              <div className="text-3xl font-bold text-emerald-400">16hrs → 5min</div>
              <div className="text-xs text-slate-400">monthly</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
              <div className="text-sm text-slate-300">Cost Savings</div>
              <div className="text-3xl font-bold text-emerald-400">$215K</div>
              <div className="text-xs text-slate-400">per year</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Source: Signed contracts & time logs</span>
            <span>Accuracy: 99.95%</span>
          </div>
        </div>
      </div>
    ),
    secondaryNode: (
      <div className="w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
        <div className="relative h-full p-4 flex flex-col justify-end">
          <div className="text-slate-300 text-xs">Proof Snapshot</div>
          <div className="text-slate-200 text-sm font-semibold">ROI Verified</div>
        </div>
      </div>
    ),
  };

  return (
    <div className="space-y-0">
      {/* First Section - Time Savings */}
      <SectionWithMockup
        title={timeSavingsData.title}
        description={timeSavingsData.description}
        primaryNode={timeSavingsData.primaryNode}
        secondaryNode={timeSavingsData.secondaryNode}
        reverseLayout={false}
      />

      {/* Time Savings Grid Section */}
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              VERIFIED CLIENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-500">SUCCESS STORIES</span>
            </h2>
            <p className="text-xl text-slate-200 mb-4 max-w-3xl mx-auto font-semibold">
              🔥 REAL BUSINESSES • REAL RESULTS • REAL PROOF 🔥
            </p>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Every number below is backed by signed contracts, financial statements, and client testimonials. No marketing fluff - just proven ROI.
            </p>
          </div>

          {/* Real Client Time Savings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { 
                period: 'CLIENT PROOF', 
                hours: '47 Hours/Week', 
                tasks: 'Johnson Marketing Agency',
                client: 'Email Automation System',
                savings: 'BEFORE: 47hrs weekly → AFTER: 3hrs weekly',
                testimonial: '"Our team can focus on strategy instead of emails"'
              },
              { 
                period: 'CLIENT PROOF', 
                hours: '16 Hours → 5 Min', 
                tasks: 'TechShop Pro E-commerce',
                client: 'Report Generation System',
                savings: 'BEFORE: 16hrs monthly → AFTER: 5min monthly',
                testimonial: '"Reports are now 10x more detailed and instant"'
              },
              { 
                period: 'CLIENT PROOF', 
                hours: '300+ Leads/Week', 
                tasks: 'Elite Realty Company',
                client: 'Lead Processing System',
                savings: 'BEFORE: 15 leads → AFTER: 300+ leads',
                testimonial: '"We handle 20x more leads with same staff"'
              },
              { 
                period: 'CLIENT PROOF', 
                hours: '$215K Saved/Year', 
                tasks: 'Sterling Consulting Firm',
                client: 'Complete Automation Suite',
                savings: 'ELIMINATED: 3 full-time positions',
                testimonial: '"ROI was 400% in first 6 months"'
              }
            ].map((saving) => (
              <div
                key={saving.period}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 transform"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-semibold">{saving.period}</span>
                </div>
                <div className="text-2xl font-bold text-emerald-400 mb-2">
                  {saving.hours}
                </div>
                <div className="text-sm text-white font-bold mb-2">
                  {saving.tasks}
                </div>
                <div className="text-xs text-slate-300 mb-2">
                  System: {saving.client}
                </div>
                <div className="text-xs text-emerald-300 bg-emerald-500/20 rounded-lg px-2 py-1 mb-2 font-semibold">
                  {saving.savings}
                </div>
                <div className="text-xs text-blue-300 bg-blue-500/10 rounded-lg px-2 py-1 italic">
                  {saving.testimonial}
                </div>
              </div>
            ))}
          </div>

          {/* Real Automation Results */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: 'Johnson Marketing Agency', 
                desc: 'CLIENT TESTIMONY: "We went from 8 hours daily on emails to 30 minutes. Our revenue increased 40% because we can focus on high-value activities."',
                result: 'VERIFIED: 47hrs/week → 3hrs/week',
                proof: '✅ Signed contract & ROI report available'
              },
              { 
                icon: <Target className="w-6 h-6" />, 
                title: 'Elite Realty Company', 
                desc: 'CLIENT TESTIMONY: "We process 300+ leads weekly now vs 15 before. Same staff, 2000% more capacity. Closed 12 deals last month vs 2 before."',
                result: 'VERIFIED: 15 leads → 300+ leads weekly',
                proof: '✅ Lead processing logs & sales data'
              },
              { 
                icon: <TrendingUp className="w-6 h-6" />, 
                title: 'TechShop Pro E-commerce', 
                desc: 'CLIENT TESTIMONY: "Monthly reports took 16 hours. Now they generate in 5 minutes with 10x more insights. Saved us $4K monthly in labor."',
                result: 'VERIFIED: 16hrs → 5min monthly',
                proof: '✅ Time logs & detailed cost analysis'
              },
              { 
                icon: <CheckCircle className="w-6 h-6" />, 
                title: 'Sterling Consulting Firm', 
                desc: 'CLIENT TESTIMONY: "Eliminated 3 full-time positions saving $215K yearly. ROI was 400% in 6 months. Best investment we ever made."',
                result: 'VERIFIED: $215K saved annually',
                proof: '✅ Financial statements & payroll records'
              }
            ].map((advantage) => (
              <div
                key={advantage.title}
                className="flex items-start gap-4 p-6 bg-gradient-to-r from-slate-800/30 to-slate-900/30 rounded-xl border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-102 transform"
              >
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg text-purple-400">
                  {advantage.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg mb-2">
                    {advantage.title}
                  </h4>
                  <p className="text-slate-200 leading-relaxed mb-3 text-sm">
                    {advantage.desc}
                  </p>
                  <div className="text-sm font-bold text-emerald-400 bg-emerald-500/20 rounded-lg px-3 py-2 mb-2">
                    {advantage.result}
                  </div>
                  <div className="text-xs text-blue-300 bg-blue-500/10 rounded-lg px-2 py-1">
                    {advantage.proof}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleBookCall}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 text-lg"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="text-center space-y-4">
                <p className="text-lg text-slate-200 font-semibold">
                  🎯 Get YOUR custom automation analysis - 100% FREE
                </p>
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl px-8 py-4 border border-emerald-500/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-400">47hrs</div>
                      <div className="text-slate-300">Weekly savings proven</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">$215K</div>
                      <div className="text-slate-300">Annual cost reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">2000%</div>
                      <div className="text-slate-300">Lead processing increase</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  ✅ All results verified with client contracts and financial statements
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
