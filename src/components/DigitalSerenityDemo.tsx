import React from 'react';
import DigitalSerenity from './ui/digital-serenity-animated-landing-page';

const DigitalSerenityDemo: React.FC = () => {
  return (
    <div className="w-full">
      <DigitalSerenity />
      
      {/* Additional content below the serenity section */}
      <div className="bg-slate-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Digital Serenity Component
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-slate-600 mb-4">
              This component features:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li>Interactive mouse tracking with gradient effects</li>
              <li>Animated word-by-word text reveals</li>
              <li>SVG grid animations with staggered timing</li>
              <li>Click ripple effects</li>
              <li>Floating particle animations</li>
              <li>Responsive design for all screen sizes</li>
              <li>Elegant typography with custom animations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalSerenityDemo;