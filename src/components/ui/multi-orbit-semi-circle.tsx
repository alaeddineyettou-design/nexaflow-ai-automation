"use client";
import { useState, useEffect } from "react";
import { GradientText } from "./gradient-text";

const ICONS = [
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/gatsby-icon.svg",
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/github-icon.svg",
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/google-icon.svg",
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/sketch-icon.svg",
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/slack-icon.svg",
  "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/spotify-icon.svg",
];

interface SemiCircleOrbitProps {
  radius: number;
  centerX: number;
  centerY: number;
  count: number;
  iconSize: number;
}

function SemiCircleOrbit({ radius, centerX, centerY, count, iconSize }: SemiCircleOrbitProps) {
  return (
    <>
      {/* Semi-circle glow background */}
      <div className="absolute inset-0 flex justify-center">
        <div
          className="
            w-[1000px] h-[1000px] rounded-full 
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25),transparent_70%)]
            dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_70%)]
            blur-3xl 
            -mt-40 
            pointer-events-none
          "
          style={{ zIndex: 0 }}
        />
      </div>

      {/* Orbit icons */}
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / (count - 1)) * 180;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);
        const icon = ICONS[index % ICONS.length];

        // Tooltip positioning — above or below based on angle
        const tooltipAbove = angle > 90;

        return (
          <div
            key={index}
            className="absolute flex flex-col items-center group"
            style={{
              left: `${centerX + x - iconSize / 2}px`,
              top: `${centerY - y - iconSize / 2}px`,
              zIndex: 5,
            }}
          >
            <img
              src={icon}
              alt={`icon-${index}`}
              width={iconSize}
              height={iconSize}
              className="object-contain cursor-pointer transition-transform hover:scale-110"
              style={{ minWidth: iconSize, minHeight: iconSize }} // fix accidental shrink
            />

            {/* Tooltip */}
            <div
              className={`absolute ${
                tooltipAbove ? "bottom-[calc(100%+8px)]" : "top-[calc(100%+8px)]"
              } hidden group-hover:block w-28 rounded-lg bg-black px-2 py-1 text-xs text-white shadow-lg text-center`}
            >
              App {index + 1}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-black ${
                  tooltipAbove ? "top-full" : "bottom-full"
                }`}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default function MultiOrbitSemiCircle() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const baseWidth = Math.min(size.width * 0.8, 700);
  const centerX = baseWidth / 2;
  const centerY = baseWidth * 0.5;

  const iconSize =
    size.width < 480
      ? Math.max(24, baseWidth * 0.05)
      : size.width < 768
      ? Math.max(28, baseWidth * 0.06)
      : Math.max(32, baseWidth * 0.07);

  return (
    <section className="py-12 relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="relative flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
          Seamless Integrations
        </div>
        
        <div className="my-6">
          <GradientText
            colors={["#ffffff", "#cbd5e1", "#ffffff"]}
            animationSpeed={5}
            className="text-4xl font-bold lg:text-7xl"
          >
            Connect Everything
          </GradientText>
        </div>
        <div className="mb-8">
          <GradientText
            colors={["#c084fc", "#f472b6", "#c084fc"]}
            animationSpeed={4}
            className="text-3xl md:text-5xl font-bold"
          >
            You Already Use
          </GradientText>
        </div>
        
        <p className="mb-12 max-w-2xl text-gray-300 lg:text-xl">
          Integrate with over 1000+ popular apps and services. No complex setup required - just authenticate and start automating.
        </p>

        <div
          className="relative"
          style={{ width: baseWidth, height: baseWidth * 0.6 }}
        >
          <SemiCircleOrbit radius={baseWidth * 0.22} centerX={centerX} centerY={centerY} count={6} iconSize={iconSize} />
          <SemiCircleOrbit radius={baseWidth * 0.36} centerX={centerX} centerY={centerY} count={8} iconSize={iconSize} />
          <SemiCircleOrbit radius={baseWidth * 0.5} centerX={centerX} centerY={centerY} count={10} iconSize={iconSize} />
        </div>
      </div>
    </section>
  );
}
