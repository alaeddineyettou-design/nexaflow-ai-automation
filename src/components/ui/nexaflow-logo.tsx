import React from 'react';

interface NexaFlowLogoProps {
  className?: string;
  size?: number;
  variant?: 'default' | 'light' | 'dark';
}

export const NexaFlowLogo: React.FC<NexaFlowLogoProps> = ({ 
  className = "", 
  size = 32,
  variant = 'default'
}) => {
  // تحديد الألوان حسب المتغير
  const getColors = () => {
    switch (variant) {
      case 'light':
        return {
          primary: '#1e40af', // أزرق داكن
          secondary: '#0891b2', // تيل
          accent: '#3b82f6', // أزرق متوسط
          highlight: '#e0f2fe' // أزرق فاتح جداً
        };
      case 'dark':
        return {
          primary: '#60a5fa', // أزرق فاتح
          secondary: '#22d3ee', // سماوي فاتح
          accent: '#3b82f6', // أزرق متوسط
          highlight: '#1e293b' // رمادي داكن
        };
      default:
        return {
          primary: '#2563eb', // أزرق
          secondary: '#0891b2', // تيل
          accent: '#1d4ed8', // أزرق داكن
          highlight: '#ffffff' // أبيض
        };
    }
  };

  const colors = getColors();

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 128 128" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* تدرجات لونية متقدمة */}
        <linearGradient id={`primaryGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="50%" stopColor={colors.secondary} />
          <stop offset="100%" stopColor={colors.accent} />
        </linearGradient>
        
        <linearGradient id={`flowGradient-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.secondary} stopOpacity="0.1" />
          <stop offset="50%" stopColor={colors.primary} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.1" />
        </linearGradient>

        {/* فلاتر للتأثيرات */}
        <filter id={`glow-${variant}`}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* نمط النقاط للتكرار */}
        <pattern id={`dots-${variant}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1" fill={colors.primary} opacity="0.3"/>
        </pattern>
      </defs>
      
      {/* خلفية دائرية مع تأثير نقاط */}
      <circle 
        cx="64" 
        cy="64" 
        r="60" 
        fill={`url(#dots-${variant})`}
        opacity="0.1"
      />
      
      {/* الشكل الرئيسي - رمز التدفق والاتصال */}
      <g transform="translate(64,64)">
        
        {/* العنصر المركزي - نواة الاتصال */}
        <circle 
          cx="0" 
          cy="0" 
          r="8" 
          fill={`url(#primaryGradient-${variant})`}
          filter={`url(#glow-${variant})`}
        />
        
        {/* خطوط التدفق الرئيسية */}
        <g>
          {/* خط التدفق الأفقي */}
          <rect 
            x="-35" 
            y="-3" 
            width="70" 
            height="6" 
            rx="3"
            fill={`url(#flowGradient-${variant})`}
          />
          
          {/* خط التدفق القطري */}
          <rect 
            x="-25" 
            y="-25" 
            width="50" 
            height="4" 
            rx="2"
            fill={colors.secondary}
            opacity="0.7"
            transform="rotate(45)"
          />
          
          {/* خط التدفق القطري المعاكس */}
          <rect 
            x="-25" 
            y="-25" 
            width="50" 
            height="4" 
            rx="2"
            fill={colors.secondary}
            opacity="0.7"
            transform="rotate(-45)"
          />
        </g>
        
        {/* نقاط الاتصال في الأطراف */}
        <g>
          {/* نقطة يسار */}
          <circle cx="-30" cy="0" r="4" fill={colors.primary}>
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
          </circle>
          
          {/* نقطة يمين */}
          <circle cx="30" cy="0" r="4" fill={colors.primary}>
            <animate attributeName="r" values="4;6;4" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          
          {/* نقطة أعلى */}
          <circle cx="0" cy="-20" r="3" fill={colors.secondary}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          
          {/* نقطة أسفل */}
          <circle cx="0" cy="20" r="3" fill={colors.secondary}>
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" begin="0.7s" repeatCount="indefinite"/>
          </circle>
        </g>
        
        {/* أسهم التدفق */}
        <g opacity="0.6">
          {/* سهم يمين */}
          <path 
            d="M25,-2 L35,0 L25,2 Z" 
            fill={colors.primary}
          >
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              values="0,0; 5,0; 0,0" 
              dur="1.5s" 
              repeatCount="indefinite"
            />
          </path>
          
          {/* سهم يسار */}
          <path 
            d="M-25,-2 L-35,0 L-25,2 Z" 
            fill={colors.primary}
            transform="rotate(180)"
          >
            <animateTransform 
              attributeName="transform" 
              type="translate" 
              values="0,0; -5,0; 0,0" 
              dur="1.5s" 
              begin="0.5s"
              repeatCount="indefinite"
            />
          </path>
        </g>
        
        {/* خطوط الطاقة المتحركة */}
        <g opacity="0.4">
          <line x1="-20" y1="0" x2="20" y2="0" stroke={colors.accent} strokeWidth="1">
            <animate attributeName="stroke-dasharray" values="0,40; 20,20; 40,0" dur="2s" repeatCount="indefinite"/>
          </line>
        </g>
        
      </g>
      
      {/* تأثير الهالة الخارجية */}
      <circle 
        cx="64" 
        cy="64" 
        r="55" 
        fill="none" 
        stroke={colors.primary} 
        strokeWidth="1" 
        opacity="0.2"
      >
        <animate attributeName="r" values="55;58;55" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.2;0.1;0.2" dur="3s" repeatCount="indefinite"/>
      </circle>
      
    </svg>
  );
};

export default NexaFlowLogo;