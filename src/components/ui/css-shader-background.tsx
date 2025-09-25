"use client"

import { cn } from "@/lib/utils"
import "@/styles/shader-animations.css"

interface CSSShaderBackgroundProps {
  className?: string
  children?: React.ReactNode
}

export default function CSSShaderBackground({ 
  className, 
  children
}: CSSShaderBackgroundProps) {
  return (
    <div className={cn("shader-background-container", className)}>
      {/* Animated gradient background */}
      <div className="shader-layer-1" />

      {/* Floating particles effect */}
      <div className="shader-layer-2" />

      {/* Moving wave pattern */}
      <div className="shader-layer-3" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}