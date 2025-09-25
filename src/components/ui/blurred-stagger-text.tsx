"use client" 

import { motion } from "motion/react";
 
export const BlurredStagger = ({
  text = "we love hextaui.com ❤️",
  className = "text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold text-white",
  gradientColors,
  delay = 0,
}: {
  text: string;
  className?: string;
  gradientColors?: string;
  delay?: number;
}) => {
  const headingText = text;
 
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };
 
  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(20px)",
      y: 20,
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
    },
  };

  const textClassName = gradientColors 
    ? `block bg-gradient-to-r ${gradientColors} bg-clip-text text-transparent font-bold`
    : className;
 
  return (
    <>
      <div>
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.1, once: false }}
          className={textClassName}
        >
          {headingText.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterAnimation}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>
      </div>
    </>
  );
};