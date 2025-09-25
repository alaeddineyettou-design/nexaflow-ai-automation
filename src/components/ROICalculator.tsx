import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';

const ROICalculator: React.FC = () => {
  const [hours, setHours] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [results, setResults] = useState({
    weeklySavings: 0,
    monthlySavings: 0,
    annualSavings: 0,
    roiPercent: 0
  });

  useEffect(() => {
    const weeklyHours = hours * 0.8; // 80% automation efficiency
    const weeklySavings = weeklyHours * hourlyRate;
    const monthlySavings = weeklySavings * 4;
    const annualSavings = weeklySavings * 52;
    const implementationCost = 10000; // Average implementation cost
    const roi = ((annualSavings - implementationCost) / implementationCost * 100);

    setResults({
      weeklySavings: Math.round(weeklySavings),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      roiPercent: Math.round(roi)
    });
  }, [hours, hourlyRate]);

  return (
    <section id="calculator" className="py-20 px-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Calculate Your ROI
          </h2>
          <p className="text-xl text-gray-400">
            See how much you can save with automation
          </p>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">ROI Calculator</h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <label className="block text-white font-semibold mb-4">
                  Hours spent on manual tasks per week: <span className="text-blue-400">{hours} hours</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>5 hours</span>
                  <span>40 hours</span>
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-4">
                  Average hourly rate: <span className="text-blue-400">${hourlyRate}/hour</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="200"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>$20/hour</span>
                  <span>$200/hour</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
                <h4 className="text-xl font-bold text-emerald-400">Potential Savings</h4>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Weekly Savings:</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    ${results.weeklySavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Monthly Savings:</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    ${results.monthlySavings.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Annual Savings:</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    ${results.annualSavings.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-emerald-400/30 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">ROI (First Year):</span>
                    <span className="text-3xl font-black text-emerald-400">
                      {results.roiPercent}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;