"use client"

import { StickyFeatureSection } from "@/components/ui/sticky-scroll-cards-section";
import { Squares } from "@/components/ui/squares-background";
import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

const DemoOne = () => {
  return (
    <div className="w-full">
      <StickyFeatureSection />
    </div>
  );
}

export function SquaresDemo() {
  return (
    <div className="space-y-8">
      <div className="relative h-[400px] rounded-lg overflow-hidden bg-[#060606]">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333" 
          hoverFillColor="#222"
        />
      </div>
    </div>
  )
}

export function NavBarDemo() {
  const navItems = [
    { name: 'Home', url: '#', icon: Home },
    { name: 'About', url: '#', icon: User },
    { name: 'Projects', url: '#', icon: Briefcase },
    { name: 'Resume', url: '#', icon: FileText }
  ]

  return <NavBar items={navItems} />
}

export { DemoOne }