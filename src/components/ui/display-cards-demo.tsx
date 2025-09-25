"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Sparkles, TrendingUp, Zap, Users } from "lucide-react";
import { GradientDots } from "@/components/ui/gradient-dots";

const automationCards = [
  {
    icon: <TrendingUp className="size-4 text-green-300" />,
    title: "ROI Boost",
    description: "300% Average Return",
    date: "Live Metrics",
    iconClassName: "text-green-500",
    titleClassName: "text-green-500",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Zap className="size-4 text-yellow-300" />,
    title: "Time Saved",
    description: "40+ Hours Per Week",
    date: "Automated",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Users className="size-4 text-purple-300" />,
    title: "Active Users",
    description: "10K+ Businesses",
    date: "Growing Daily",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

export function DisplayCardsDemo() {
  return (
    <section className="relative py-24 md:py-48 pb-0 overflow-hidden -mb-px" style={{backgroundColor: "rgb(2, 6, 23)"}}>
      <GradientDots 
        duration={28} 
        colorCycleDuration={8}
        backgroundColor="rgb(2, 6, 23)"
        dotSize={6}
        spacing={14}
        className="opacity-25"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Success Metrics
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Real results from businesses that transformed with AI automation
          </p>
        </div>
        
        <div className="flex min-h-[400px] w-full items-center justify-center">
          <div className="w-full max-w-3xl">
            <DisplayCards cards={automationCards} />
          </div>
        </div>
      </div>
    </section>
  );
}