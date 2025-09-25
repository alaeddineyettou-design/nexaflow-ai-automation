"use client";

import { StarBorder } from "@/components/ui/star-border";
import {
  FaReact, FaAws, FaDocker, FaNodeJs, FaGithub,
  FaGoogle, FaPython, FaJs, FaVuejs
} from "react-icons/fa";
import {
  SiNextdotjs, SiVercel, SiRedux, SiTypescript,
  SiTailwindcss, SiMongodb, SiPostgresql, SiOpenai
} from "react-icons/si";

const iconConfigs = [
  { Icon: FaReact, color: "#61DAFB", name: "React" },
  { Icon: SiNextdotjs, color: "#000000", name: "Next.js" },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { Icon: FaNodeJs, color: "#339933", name: "Node.js" },
  { Icon: FaPython, color: "#3776AB", name: "Python" },
  { Icon: FaJs, color: "#F7DF1E", name: "JavaScript" },
  { Icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind" },
  { Icon: SiRedux, color: "#764ABC", name: "Redux" },
  { Icon: FaVuejs, color: "#4FC08D", name: "Vue.js" },
  { Icon: SiMongodb, color: "#47A248", name: "MongoDB" },
  { Icon: SiPostgresql, color: "#336791", name: "PostgreSQL" },
  { Icon: FaAws, color: "#FF9900", name: "AWS" },
  { Icon: FaDocker, color: "#2496ED", name: "Docker" },
  { Icon: SiVercel, color: "#000000", name: "Vercel" },
  { Icon: FaGithub, color: "#181717", name: "GitHub" },
  { Icon: SiOpenai, color: "#412991", name: "OpenAI" },
  { Icon: FaGoogle, color: "#DB4437", name: "Google" },
];

export default function StackFeatureSection() {
  const orbitCount = 3;

  return (
    <section className="relative max-w-6xl mx-auto my-32 pl-10 flex items-center justify-between h-[30rem] border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden rounded-3xl">
      {/* Left side: Heading and Text */}
      <div className="w-1/2 z-10">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          Build your AI automation
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-6 max-w-lg">
          Transform your business with intelligent AI automation. Streamline processes, reduce costs, and boost efficiency with our cutting-edge automation solutions.
        </p>
        <div className="flex items-center gap-3">
          <StarBorder 
            as="button"
            color="hsl(0, 0%, 100%)"
            speed="4s"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-semibold transition-all duration-200 cursor-pointer"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Start AI Automation
          </StarBorder>
        </div>
      </div>

      {/* Right side: Orbit animation cropped to 1/4 */}
      <div className="relative w-1/2 h-full flex items-center justify-start overflow-hidden">
        <div className="relative w-[50rem] h-[50rem] translate-x-[50%] flex items-center justify-center">
          {/* Center Circle */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center z-10">
            <SiOpenai className="w-12 h-12 text-white" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + 8 * (orbitIdx + 1)}rem`; // equal spacing
            const angleStep = (2 * Math.PI) / Math.ceil(iconConfigs.length / orbitCount);

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-gray-400 dark:border-gray-500 opacity-50"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${12 + orbitIdx * 6}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * Math.ceil(iconConfigs.length / orbitCount), orbitIdx * Math.ceil(iconConfigs.length / orbitCount) + Math.ceil(iconConfigs.length / orbitCount))
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-300"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          animation: `spin ${12 + orbitIdx * 6}s linear infinite reverse`, // Counter-rotate
                        }}
                      >
                        <cfg.Icon className="w-6 h-6" style={{ color: cfg.color }} />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}