"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

function GradualSpacing({
  text,
  duration = 0.6,
  delayMultiple = 0.02,
  framerProps = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  className,
}: GradualSpacingProps) {
  return (
    <div className="flex justify-center flex-wrap">
      <AnimatePresence>
        {text.split(" ").map((word, wordIndex) => (
          <div key={wordIndex} className="flex mr-2">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={framerProps}
                transition={{ 
                  duration, 
                  delay: (wordIndex * 3 + charIndex) * delayMultiple,
                  ease: "easeOut"
                }}
                className={cn("drop-shadow-sm", className)}
              >
                {char}
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { GradualSpacing };
