import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

// AI Automation focused sections with verified high-quality tech backgrounds
const sections = [
  {
    id: "intelligent-workflows",
    leftLabel: "Smart Process",
    title: "AI WORKFLOWS",
    rightLabel: "Automation",
    background: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "data-analytics",
    leftLabel: "Real-time Insights", 
    title: "Data Analytics",
    rightLabel: "AI Powered",
    background: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "predictive-automation",
    leftLabel: "Machine Learning",
    title: "Smart Automation", 
    rightLabel: "Future Ready",
    background: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "seamless-integration",
    leftLabel: "Enterprise Grade",
    title: "System Integration",
    rightLabel: "Scalable",
    background: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "advanced-security",
    leftLabel: "Secure Systems",
    title: "AI Security",
    rightLabel: "Protected",
    background: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  }
];

export default function AIAutomationScrollShowcase() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <div className="ai-automation-scroll-showcase">
      <FullScreenScrollFX
        sections={sections}
        header={
          <>
            <div>Next Generation</div>
            <div>AI Automation</div>
          </>
        }
        footer={<div>Transform Your Business</div>}
        showProgress={true}
        durations={{ change: 0.8, snap: 1000 }}
        bgTransition="fade"
        parallaxAmount={6}
        colors={{
          text: "rgba(255,255,255,0.98)",
          overlay: "rgba(0,0,0,0.65)", 
          pageBg: "#0a0a0a",
          stageBg: "#000000",
        }}
        fontFamily='"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
        smoothScroll={true}
        apiRef={apiRef}
        ariaLabel="AI Automation Solutions Showcase"
        className="min-h-screen"
      />
    </div>
  );
}