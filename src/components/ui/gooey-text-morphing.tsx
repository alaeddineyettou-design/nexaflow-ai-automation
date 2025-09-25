"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1.5,
  cooldownTime = 2,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    let animationId: number;
    let startTime = Date.now();
    let isTransitioning = false;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      if (!isTransitioning && elapsed >= cooldownTime) {
        // Start transition
        isTransitioning = true;
        startTime = Date.now();
        
        if (text1Ref.current && text2Ref.current) {
          // Set next text
          const nextIndex = (currentIndex + 1) % texts.length;
          text2Ref.current.textContent = texts[nextIndex];
          text2Ref.current.style.opacity = "0%";
          text1Ref.current.style.opacity = "100%";
        }
      } else if (isTransitioning && elapsed <= morphTime) {
        // During transition with smooth easing
        const progress = elapsed / morphTime;
        // Smooth easing function
        const easedProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
          
        if (text1Ref.current && text2Ref.current) {
          text1Ref.current.style.opacity = `${(1 - easedProgress) * 100}%`;
          text2Ref.current.style.opacity = `${easedProgress * 100}%`;
          
          // Subtle blur effect
          const blur = Math.sin(easedProgress * Math.PI) * 2;
          text1Ref.current.style.filter = `blur(${blur}px)`;
          text2Ref.current.style.filter = `blur(${blur}px)`;
          
          // Slight scale effect for smoothness
          const scale1 = 1 - (easedProgress * 0.02);
          const scale2 = 1 - ((1 - easedProgress) * 0.02);
          text1Ref.current.style.transform = `scale(${scale1})`;
          text2Ref.current.style.transform = `scale(${scale2})`;
        }
      } else if (isTransitioning && elapsed > morphTime) {
        // End transition smoothly
        isTransitioning = false;
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        startTime = Date.now();
        
        if (text1Ref.current && text2Ref.current) {
          // Swap texts cleanly
          const temp = text1Ref.current.textContent;
          text1Ref.current.textContent = text2Ref.current.textContent;
          text2Ref.current.textContent = temp;
          
          // Reset all styles
          text1Ref.current.style.opacity = "100%";
          text2Ref.current.style.opacity = "0%";
          text1Ref.current.style.filter = "";
          text2Ref.current.style.filter = "";
          text1Ref.current.style.transform = "";
          text2Ref.current.style.transform = "";
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };

    // Initialize
    if (text1Ref.current && text2Ref.current) {
      text1Ref.current.textContent = texts[0];
      text2Ref.current.textContent = texts[1] || texts[0];
      text1Ref.current.style.opacity = "100%";
      text2Ref.current.style.opacity = "0%";
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [texts, morphTime, cooldownTime, currentIndex]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="relative flex items-center justify-center w-full h-[120px] md:h-[160px] lg:h-[200px]"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inset-0 flex items-center justify-center select-none text-center font-bold whitespace-nowrap",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inset-0 flex items-center justify-center select-none text-center font-bold whitespace-nowrap",
            textClassName
          )}
        />
        {/* Ghost element for consistent spacing */}
        <span className={cn(
          "invisible select-none text-center font-bold whitespace-nowrap",
          textClassName
        )}>
          {texts[0]}
        </span>
      </div>
    </div>
  );
}