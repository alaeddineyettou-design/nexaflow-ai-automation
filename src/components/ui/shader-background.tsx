"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

// Custom shader material with smooth animations
const WaveShaderMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorA: new THREE.Color("#8B5CF6"), // Purple
    uColorB: new THREE.Color("#3B82F6"), // Blue
    uMouse: new THREE.Vector2(0, 0),
    uResolution: new THREE.Vector2(1, 1),
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // Fractal noise for more complex texture
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      
      for (int i = 0; i < 4; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    // Smooth interpolation
    float smoothNoise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      vec2 u = f * f * (3.0 - 2.0 * f);
      
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }
    
    void main() {
      vec2 st = vUv;
      
      // Create flowing waves
      float wave1 = sin(st.x * 8.0 + uTime * 2.0) * 0.1;
      float wave2 = sin(st.y * 6.0 + uTime * 1.5) * 0.1;
      float wave3 = sin((st.x + st.y) * 4.0 + uTime * 3.0) * 0.05;
      
      // Add mouse interaction
      vec2 mouseInfluence = (uMouse - 0.5) * 0.2;
      st += mouseInfluence;
      
      // Combine waves
      float waves = wave1 + wave2 + wave3;
      
      float noiseValue = smoothNoise(st * 3.0 + uTime * 0.5);
      float fbmNoise = fbm(st * 2.0 + uTime * 0.3);
      float combinedNoise = mix(noiseValue, fbmNoise, 0.6);
      
      // Mix colors based on waves and noise
      float mixFactor = (waves + combinedNoise + 1.0) * 0.5;
      mixFactor = smoothstep(0.2, 0.8, mixFactor);
      
      vec3 color = mix(uColorA, uColorB, mixFactor);
      
      float glow = 1.0 - distance(st, vec2(0.5)) * 1.2;
      glow = smoothstep(0.0, 1.0, glow);
      glow += combinedNoise * 0.1;
      
      color += glow * 0.1;
      
      // Add time-based brightness variation
      float brightness = 0.8 + sin(uTime * 0.8) * 0.1;
      color *= brightness;
      
      // Reduce overall opacity for background use
      gl_FragColor = vec4(color, 0.3);
    }
  `,
)

// Extend Three.js with our custom material
extend({ WaveShaderMaterial })

// TypeScript declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      waveShaderMaterial: any
    }
  }
}

function ShaderPlane({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<any>(null)

  // Mouse position state relative to container
  const mouse = useRef({ x: 0, y: 0 })

  // Handle mouse movement relative to the container
  const handleMouseMove = (event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouse.current.x = (event.clientX - rect.left) / rect.width
      mouse.current.y = 1 - (event.clientY - rect.top) / rect.height
    }
  }

  // Set up mouse listener
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [containerRef])

  useFrame((state) => {
    if (materialRef.current) {
      // Update time uniform for animation
      materialRef.current.uTime = state.clock.elapsedTime

      // Smooth mouse interpolation
      materialRef.current.uMouse.lerp(new THREE.Vector2(mouse.current.x, mouse.current.y), 0.05)

      // Update resolution based on container size
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        materialRef.current.uResolution.set(rect.width, rect.height)
      }
    }
  })

  return (
    <mesh ref={meshRef} scale={[4, 4, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <waveShaderMaterial ref={materialRef} key={WaveShaderMaterial.key} transparent />
    </mesh>
  )
}

interface ShaderBackgroundProps {
  className?: string
  children?: React.ReactNode
  intensity?: number
}

export default function ShaderBackground({ 
  className, 
  children, 
  intensity = 0.3
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Shader Canvas Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 2], fov: 75 }} 
          className="absolute inset-0"
          style={{ opacity: intensity }}
        >
          <ShaderPlane containerRef={containerRef} />
        </Canvas>
      </div>

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}