import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "Innovation",
    title: <>AI Automation</>,
    rightLabel: "Future",
    background: "https://images.pexels.com/photos/3289156/pexels-photo-3289156.jpeg?cs=srgb&dl=pexels-alexfu-3289156.jpg&fm=jpg",
  },
  {
    leftLabel: "Efficiency",
    title: <>Smart Solutions</>,
    rightLabel: "Growth",
    background: "https://images.pexels.com/photos/163790/at-night-under-a-lantern-guy-night-city-163790.jpeg",
  },
  {
    leftLabel: "Transform",
    title: <>Business Success</>,
    rightLabel: "Scale",
    background: "https://images.pexels.com/photos/9817/pexels-photo-9817.jpeg",
  },
  {
    leftLabel: "Optimize",
    title: <>Professional</>,
    rightLabel: "Excellence",
    background: "https://images.pexels.com/photos/939807/pexels-photo-939807.jpeg",
  },
];

export default function FullScreenScrollDemo() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <>
      <FullScreenScrollFX
        sections={sections}
        header={
          <>
            <div>Professional</div>
            <div>Business</div>
          </>
        }
        footer={<div>Excellence</div>}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
        colors={{
          text: "rgba(245,245,245,0.92)",
          overlay: "rgba(0,0,0,0.4)",
          pageBg: "#ffffff",
          stageBg: "#000000",
        }}
        apiRef={apiRef}
      />
    </>
  );
}
