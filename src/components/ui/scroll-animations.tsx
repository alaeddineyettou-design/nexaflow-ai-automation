import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export const ScrollFadeIn = ({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0, 
  duration = 0.6 
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxScroll = ({ children, className = '', speed = 0.5 }: ParallaxScrollProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScrollProgressProps {
  className?: string;
}

export const ScrollProgress = ({ className = '' }: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transform-gpu z-50 shadow-lg ${className}`}
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
    />
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}

export const ScrollReveal = ({ children, className = '', threshold = 0.1 }: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "-50px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggeredFadeInProps {
  children: React.ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export const StaggeredFadeIn = ({ 
  children, 
  className = '', 
  staggerDelay = 0.1 
}: StaggeredFadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
