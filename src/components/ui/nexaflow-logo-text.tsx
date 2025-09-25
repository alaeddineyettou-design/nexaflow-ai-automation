import React from 'react';

interface NexaFlowLogoTextProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'light' | 'dark';
  showAnimation?: boolean;
}

export const NexaFlowLogoText: React.FC<NexaFlowLogoTextProps> = ({ 
  className = "", 
  size = 'md',
  variant = 'default',
  showAnimation = true
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-lg md:text-xl';
      case 'md': return 'text-xl md:text-2xl';
      case 'lg': return 'text-2xl md:text-3xl lg:text-4xl';
      case 'xl': return 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl';
      default: return 'text-xl md:text-2xl';
    }
  };

  const getColorClasses = () => {
    switch (variant) {
      case 'light':
        return 'from-blue-700 via-teal-600 to-blue-800';
      case 'dark':
        return 'from-blue-300 via-cyan-200 to-teal-300';
      default:
        return 'from-blue-600 via-teal-500 to-blue-700';
    }
  };

  return (
    <span 
      className={`
        ${getSizeClasses()} 
        font-bold 
        bg-gradient-to-r ${getColorClasses()} 
        bg-clip-text 
        text-transparent 
        tracking-tight 
        ${showAnimation ? 'animate-pulse' : ''} 
        ${className}
      `}
    >
      NEXAFLOW
    </span>
  );
};

export default NexaFlowLogoText;