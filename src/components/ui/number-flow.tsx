'use client';

import { useState, useEffect } from 'react';
import NumberFlow, { type Value, type Trend, type Format } from "@number-flow/react";

interface NumberFlowAnimatedProps {
  value: Value;
  className?: string;
  format?: Format;
  trend?: Trend;
  willChange?: boolean;
}

function NumberFlowAnimated({ 
  value, 
  className = "", 
  format,
  trend,
  willChange = true
}: NumberFlowAnimatedProps) {
  const [displayValue, setDisplayValue] = useState<Value>(0);

  useEffect(() => {
    // Animate to the new value
    const timer = setTimeout(() => {
      setDisplayValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <NumberFlow 
      value={displayValue}
      className={className}
      trend={trend}
      willChange={willChange}
      format={format}
      transformTiming={{
        duration: 750,
        easing: 'ease-out'
      }}
    />
  );
}

export default NumberFlowAnimated;