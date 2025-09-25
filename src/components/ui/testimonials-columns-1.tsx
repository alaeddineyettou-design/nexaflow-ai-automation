"use client";
import React from "react";
import { motion } from "framer-motion";
import { GradientDots } from "./gradient-dots";
import { BlurredStagger } from "@/components/ui/blurred-stagger-text";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-6 rounded-2xl bg-slate-900/50 border border-blue-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/10 max-w-xs w-full hover:border-cyan-400/30 transition-all duration-300" key={i}>
                  <div className="text-slate-300 text-sm leading-relaxed mb-4">{text}</div>
                  <div className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full border-2 border-blue-500/30"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-white">{name}</div>
                      <div className="leading-5 text-blue-400 tracking-tight text-xs">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "AutoFlow transformed our business operations completely. We've automated 80% of our manual processes and saved 45 hours per week. The AI-powered workflows are incredibly intuitive.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Chen",
    role: "Operations Director, TechCorp",
  },
  {
    text: "The implementation was seamless. Within 2 weeks, our entire team was using AutoFlow to streamline customer onboarding, invoice processing, and inventory management. ROI was immediate.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Marcus Rodriguez",
    role: "CTO, InnovateLab",
  },
  {
    text: "AutoFlow's AI automation has revolutionized our customer support. Response times decreased by 75% while maintaining quality. The predictive analytics help us prevent issues before they occur.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emma Thompson",
    role: "Customer Success Manager",
  },
  {
    text: "As a growing startup, AutoFlow scaled with us perfectly. The drag-and-drop workflow builder let our non-technical team create complex automations. We've 10x'd our productivity.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Kim",
    role: "CEO, StartupHQ",
  },
  {
    text: "The security features are enterprise-grade. SOC 2 compliance, end-to-end encryption, and detailed audit trails give us complete confidence in handling sensitive data.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Rachel Martinez",
    role: "Security Officer, FinanceFirst",
  },
  {
    text: "AutoFlow's integrations are phenomenal. We connected 15+ tools in minutes. The real-time sync ensures data consistency across all platforms. It's like having a digital workforce.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "James Wilson",
    role: "IT Director, GlobalTech",
  },
  {
    text: "The analytics dashboard provides incredible insights. We can see bottlenecks, optimize workflows, and make data-driven decisions. Our efficiency improved by 300%.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Lisa Anderson",
    role: "Business Analyst, MetricsCorp",
  },
  {
    text: "AutoFlow's AI learns from our patterns and suggests optimizations. It's like having a business consultant that never sleeps. The cost savings have been substantial.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Michael Chang",
    role: "Operations Manager, ScaleCo",
  },
  {
    text: "The support team is exceptional. 24/7 availability, detailed documentation, and proactive guidance. They genuinely care about our success and growth.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Jennifer Park",
    role: "Project Manager, BuildRight",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section className="pt-0 pb-20 relative overflow-hidden -mt-px" style={{backgroundColor: "rgb(2, 6, 23)"}}>
      {/* Animated Gradient Dots Background */}
      <GradientDots 
        duration={28} 
        colorCycleDuration={8}
        backgroundColor="rgb(2, 6, 23)"
        dotSize={6}
        spacing={14}
        className="opacity-25"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6">
            ⭐ Testimonials
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <BlurredStagger 
              text="What Our Users" 
              gradientColors="from-white via-slate-100 to-slate-300"
              className="block text-4xl md:text-6xl font-bold tracking-wide text-white"
            />
            <br />
            <BlurredStagger 
              text="Are Saying" 
              gradientColors="from-blue-400 via-cyan-400 to-blue-300"
              delay={1.0}
              className="block text-4xl md:text-6xl font-bold tracking-wide text-blue-400"
            />
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of businesses that have transformed their operations with AutoFlow's AI-powered automation platform.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
