import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const aiAutomationSections = [
  {
    id: "intelligence",
    leftLabel: "Intelligence",
    title: <>Artificial Intelligence</>,
    rightLabel: "Innovation",
    background: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
  },
  {
    id: "automation",
    leftLabel: "Automation",
    title: <>Smart Automation</>,
    rightLabel: "Efficiency",
    background: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
  },
  {
    id: "analytics",
    leftLabel: "Analytics",
    title: <>Data Analytics</>,
    rightLabel: "Insights",
    background: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
  },
  {
    id: "integration",
    leftLabel: "Integration",
    title: <>Integrated Solutions</>,
    rightLabel: "Growth",
    background: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
  },
  {
    id: "future",
    leftLabel: "Future",
    title: <>Future Technology</>,
    rightLabel: "Success",
    background: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80",
  },
];

export default function AIAutomationAdvanced() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <div className="relative">
      <FullScreenScrollFX
        sections={aiAutomationSections}
        header={
          <>
            <div>Business</div>
            <div>Future</div>
          </>
        }
        footer={<div>Advanced Technologies</div>}
        showProgress={true}
        durations={{ change: 0.9, snap: 1000 }}
        bgTransition="fade"
        parallaxAmount={6}
        colors={{
          text: "rgba(255,255,255,0.95)",
          overlay: "rgba(0,0,0,0.5)",
          pageBg: "#ffffff",
          stageBg: "#0f172a",
        }}
        fontFamily='"Cairo", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
        apiRef={apiRef}
        ariaLabel="عرض تقنيات الذكاء الاصطناعي والأتمتة"
      />
    </div>
  );
}
