import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10px, -15px) scale(1.02); }
          50% { transform: translate(-5px, 10px) scale(0.98); }
          75% { transform: translate(-10px, -5px) scale(1.01); }
        }
      `}</style>
      
      {/* Clean Gradient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -2 }}>
        {/* Base smooth gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Subtle animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
              radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.06) 0%, transparent 60%),
              radial-gradient(circle at 50% 100%, rgba(14, 165, 233, 0.04) 0%, transparent 50%)
            `,
            animation: 'float 25s ease-in-out infinite'
          }}
        />
        
        {/* Gentle floating orbs */}
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>
    </>
  );
};

export default AnimatedBackground;