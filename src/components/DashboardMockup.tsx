import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Calendar, Bell } from 'lucide-react';

export const DashboardMockup: React.FC = () => {
  const stockData = [
    { symbol: 'CART', company: 'Maplebear Inc.', price: '$36.22', change: '-$1.30', percent: '-3.46%', positive: false },
    { symbol: 'NVDA', company: 'NVIDIA Corporation', price: '$903.50', change: '+$79.96', percent: '+9.86%', positive: true },
    { symbol: 'AAPL', company: 'Apple Inc.', price: '$193.49', change: '+$11.33', percent: '+6.22%', positive: true },
    { symbol: 'RDDT', company: 'Reddit Inc.', price: '$51.44', change: '+5.15', percent: '+11.13%', positive: true },
    { symbol: 'QQQ', company: 'Invesco QQQ Trust', price: '$422.58', change: '+14.30', percent: '+3.50%', positive: true },
  ];

  const earningsData = [
    { symbol: 'NVDA', date: 'Q3 2023 earnings report' },
    { symbol: 'MSFT', date: 'Q3 2023 earnings report' },
    { symbol: 'AAPL', date: 'Q3 2023 earnings report' },
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-6 h-full overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-xl font-semibold mb-1">Watchlist performance</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Watchlist enthusiasts tune your enterprise, Microsoft teagues Apple's growth in market<br />
            value, thanks to Al's siren call. Apple battles turbulence, from iPhone price cuts in a wary<br />
            China, to pending antitrust skirmishes, yet tosses up with its pricy "Vision Pro" VR debut.<br />
            Tesla's Berlin hiccup juxtaposed with wage ratios promises, while Nvidia chips away<br />
            boundaries, deftly navigating geopolitical tech issues with its AI and GPU innovations.
          </p>
        </div>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div 
          className="bg-[#2a2a2a] rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-gray-400 text-sm mb-1">S&P 500</div>
          <div className="flex items-center gap-2">
            <span className="text-red-400 text-lg font-semibold">-0.07%</span>
            <TrendingDown className="w-4 h-4 text-red-400" />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-[#2a2a2a] rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-gray-400 text-sm mb-1">Your watchlist</div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-lg font-semibold">+2.16%</span>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
        </motion.div>
      </div>

      {/* Stock List */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-gray-400 text-xs">
          <span>Top movers</span>
          <span>Weekly performance</span>
        </div>
        
        {stockData.map((stock, index) => (
          <motion.div
            key={stock.symbol}
            className="flex items-center justify-between py-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                stock.symbol === 'CART' ? 'bg-orange-500' :
                stock.symbol === 'NVDA' ? 'bg-green-500' :
                stock.symbol === 'AAPL' ? 'bg-gray-500' :
                stock.symbol === 'RDDT' ? 'bg-orange-600' :
                'bg-blue-500'
              }`} />
              <div>
                <div className="text-white font-medium text-sm">{stock.symbol}</div>
                <div className="text-gray-400 text-xs">{stock.company}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-medium text-sm">{stock.price}</div>
              <div className={`text-xs ${stock.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stock.change} {stock.percent}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Earnings Announcements */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400 text-sm">Earnings announcements</span>
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">3</span>
        </div>
        
        <div className="space-y-2">
          {earningsData.map((earning, index) => (
            <motion.div
              key={earning.symbol}
              className="flex items-center justify-between py-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  earning.symbol === 'NVDA' ? 'bg-green-500' :
                  earning.symbol === 'MSFT' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`} />
                <span className="text-white text-sm font-medium">{earning.symbol}</span>
                <span className="text-gray-400 text-xs">{earning.date}</span>
              </div>
              <Bell className="w-3 h-3 text-gray-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stories Section */}
      <div className="border-t border-gray-700 pt-4 mt-4">
        <h4 className="text-gray-400 text-sm font-medium mb-3">Stories you're watching</h4>
        <p className="text-gray-500 text-xs leading-relaxed">
          We've curated and summarized the latest news for your top 5 stocks from your watchlist.
        </p>
      </div>
    </div>
  );
};
