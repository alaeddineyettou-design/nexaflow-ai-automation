import React, { useRef, useEffect, useState } from 'react';
import { useAudioEffects, BackgroundMusic, VisualEffects, createSoundParticle, SoundParticle } from './audio-visual-effects';

interface Professional3DHeroVideoProps {
  className?: string;
}

const Professional3DHeroVideo: React.FC<Professional3DHeroVideoProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [currentPhase, setCurrentPhase] = useState<'opening' | 'middle' | 'closing'>('opening');

  const audioManager = useAudioEffects();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for 4K quality
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    
    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    
    ctx.scale(pixelRatio, pixelRatio);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Animation phases timing (30 seconds total)
    const PHASE_DURATIONS = {
      opening: 5000,   // 0-5 seconds
      middle: 15000,   // 5-20 seconds 
      closing: 10000   // 20-30 seconds
    };

    // Network nodes for opening animation
    const networkNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      connections: number[];
      pulse: number;
      size: number;
    }> = [];

    // Initialize network nodes
    for (let i = 0; i < 25; i++) {
      networkNodes.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        size: Math.random() * 8 + 4
      });
    }

    // Create connections between nearby nodes
    networkNodes.forEach((node, i) => {
      networkNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 150 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    // Workflow automation elements
    const workflowElements = [
      { 
        type: 'gear',
        x: centerX - 200,
        y: centerY - 100,
        rotation: 0,
        size: 60,
        color: '#4FC3F7',
        label: 'n8n Workflows'
      },
      {
        type: 'circuit',
        x: centerX + 150,
        y: centerY - 50,
        rotation: 0,
        size: 80,
        color: '#81C784',
        label: 'AI Processing'
      },
      {
        type: 'interface',
        x: centerX - 50,
        y: centerY + 120,
        rotation: 0,
        size: 70,
        color: '#FFB74D',
        label: 'Zapier Integration'
      }
    ];

    // Enhanced data particles with sound
    const dataParticles: SoundParticle[] = [];

    // Professional color gradients
    const createProfessionalGradient = (ctx: CanvasRenderingContext2D, type: 'blue' | 'silver' | 'white') => {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(rect.width, rect.height));
      
      switch (type) {
        case 'blue':
          gradient.addColorStop(0, 'rgba(79, 195, 247, 0.3)');
          gradient.addColorStop(0.5, 'rgba(33, 150, 243, 0.1)');
          gradient.addColorStop(1, 'rgba(13, 71, 161, 0.05)');
          break;
        case 'silver':
          gradient.addColorStop(0, 'rgba(224, 224, 224, 0.2)');
          gradient.addColorStop(0.5, 'rgba(158, 158, 158, 0.1)');
          gradient.addColorStop(1, 'rgba(97, 97, 97, 0.05)');
          break;
        case 'white':
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          gradient.addColorStop(0.5, 'rgba(250, 250, 250, 0.05)');
          gradient.addColorStop(1, 'rgba(245, 245, 245, 0.02)');
          break;
      }
      
      return gradient;
    };

    // Draw gear (n8n workflows)
    const drawGear = (x: number, y: number, size: number, rotation: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      // Outer gear teeth
      ctx.beginPath();
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const outerRadius = size;
        const innerRadius = size * 0.7;
        
        if (i % 2 === 0) {
          ctx.lineTo(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius);
        } else {
          ctx.lineTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
        }
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = color + '80';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Inner circle
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = '#1a1a1a';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      ctx.restore();
    };

    // Draw circuit board pattern
    const drawCircuit = (x: number, y: number, size: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Circuit lines
      const lines = [
        { x1: -size/2, y1: -size/3, x2: size/2, y2: -size/3 },
        { x1: -size/3, y1: -size/2, x2: -size/3, y2: size/2 },
        { x1: size/3, y1: -size/2, x2: size/3, y2: size/2 },
        { x1: -size/2, y1: size/3, x2: size/2, y2: size/3 }
      ];
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });
      
      // Circuit nodes
      const nodes = [
        { x: -size/3, y: -size/3 },
        { x: size/3, y: -size/3 },
        { x: -size/3, y: size/3 },
        { x: size/3, y: size/3 },
        { x: 0, y: 0 }
      ];
      
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Glow effect
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12);
        glowGradient.addColorStop(0, color + '80');
        glowGradient.addColorStop(1, color + '00');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.restore();
    };

    // Draw digital interface
    const drawInterface = (x: number, y: number, size: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      
      // Main interface panel
      const gradient = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
      gradient.addColorStop(0, color + '40');
      gradient.addColorStop(0.5, color + '20');
      gradient.addColorStop(1, color + '40');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-size/2, -size/2, size, size);
      
      // Interface border
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(-size/2, -size/2, size, size);
      
      // Interface elements
      const bars = [
        { x: -size/3, y: -size/4, width: size/6, height: size/8 },
        { x: -size/6, y: -size/4, width: size/6, height: size/6 },
        { x: 0, y: -size/4, width: size/6, height: size/10 },
        { x: size/6, y: -size/4, width: size/6, height: size/4 }
      ];
      
      bars.forEach((bar) => {
        const barGradient = ctx.createLinearGradient(bar.x, bar.y, bar.x, bar.y + bar.height);
        barGradient.addColorStop(0, color);
        barGradient.addColorStop(1, color + '60');
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
      });
      
      // Interface text simulation
      ctx.fillStyle = color;
      ctx.font = 'bold 8px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AUTOMATION', 0, size/4);
      ctx.fillText('ACTIVE', 0, size/3);
      
      ctx.restore();
    };

    // Main animation loop
    const animate = (timestamp: number) => {
      const elapsed = timestamp % 30000; // 30 second loop

      // Determine current phase
      let phase: 'opening' | 'middle' | 'closing';
      if (elapsed < PHASE_DURATIONS.opening) {
        phase = 'opening';
      } else if (elapsed < PHASE_DURATIONS.opening + PHASE_DURATIONS.middle) {
        phase = 'middle';
      } else {
        phase = 'closing';
      }
      
      if (phase !== currentPhase) {
        setCurrentPhase(phase);
      }

      // Clear canvas with professional background
      const bgGradient = createProfessionalGradient(ctx, 'blue');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Enhanced animated grid with cryptocurrency aesthetics
      VisualEffects.drawAnimatedGrid(ctx, rect.width, rect.height, timestamp, '#4FC3F7');

      // Phase-specific animations
      if (phase === 'opening') {
        // Opening: Dynamic interconnected nodes and data flow
        
        // Update and draw network nodes
        networkNodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          node.pulse += 0.1;
          
          // Bounce off edges
          if (node.x < 0 || node.x > rect.width) node.vx *= -1;
          if (node.y < 0 || node.y > rect.height) node.vy *= -1;
          
          // Draw connections
          node.connections.forEach(connectionIndex => {
            const connectedNode = networkNodes[connectionIndex];
            if (connectedNode) {
              const gradient = ctx.createLinearGradient(
                node.x, node.y, connectedNode.x, connectedNode.y
              );
              gradient.addColorStop(0, '#4FC3F7');
              gradient.addColorStop(0.5, '#81C784');
              gradient.addColorStop(1, '#FFB74D');
              
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 2;
              ctx.lineCap = 'round';
              
              // Animated data flow along connections
              const flowOffset = (timestamp * 0.002) % 1;
              ctx.setLineDash([10, 10]);
              ctx.lineDashOffset = -flowOffset * 20;
              
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(connectedNode.x, connectedNode.y);
              ctx.stroke();
              
              ctx.setLineDash([]);
            }
          });
          
          // Draw node
          const pulseSize = node.size + Math.sin(node.pulse) * 3;
          const nodeGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize);
          nodeGradient.addColorStop(0, '#4FC3F7');
          nodeGradient.addColorStop(0.7, '#81C784');
          nodeGradient.addColorStop(1, '#4FC3F700');
          
          ctx.fillStyle = nodeGradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Node core
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
          ctx.fill();
        });
        
        // Logo placeholder (subtle in background)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('AI AUTOMATION', centerX, centerY + 200);
        
      } else if (phase === 'middle') {
        // Middle: Workflow automation with gears, circuits, interfaces
        const phaseProgress = (elapsed - PHASE_DURATIONS.opening) / PHASE_DURATIONS.middle;
        
        // Animate workflow elements
        workflowElements.forEach((element, i) => {
          element.rotation += 0.02 * (i + 1);
          
          switch (element.type) {
            case 'gear':
              drawGear(element.x, element.y, element.size, element.rotation, element.color);
              break;
            case 'circuit':
              drawCircuit(element.x, element.y, element.size, element.color);
              break;
            case 'interface':
              drawInterface(element.x, element.y, element.size, element.color);
              break;
          }
          
          // Element label
          ctx.fillStyle = element.color;
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(element.label, element.x, element.y + element.size + 30);
          
          // Create sound particles from elements
          if (Math.random() < 0.1) {
            dataParticles.push(createSoundParticle(element.x, element.y, audioManager));
          }
        });
        
        // Update and draw data particles
        for (let i = dataParticles.length - 1; i >= 0; i--) {
          const particle = dataParticles[i];
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life--;
          
          // Add to trail
          particle.trail.push({ x: particle.x, y: particle.y });
          if (particle.trail.length > 10) {
            particle.trail.shift();
          }
          
          if (particle.life <= 0) {
            dataParticles.splice(i, 1);
            continue;
          }
          
          // Draw trail
          particle.trail.forEach((point, j) => {
            const alpha = (j / particle.trail.length) * (particle.life / particle.maxLife);
            ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.arc(point.x, point.y, particle.size * alpha, 0, Math.PI * 2);
            ctx.fill();
          });
        }
        
        // Key phrases animation
        const phrases = ['AI Assistant', 'Workflow Automation', 'Data Analysis', 'Business Solutions'];
        const phraseIndex = Math.floor(phaseProgress * phrases.length) % phrases.length;
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(phrases[phraseIndex], centerX, centerY - 250);
        
      } else {
        // Closing: Efficiency showcase and call to action
        const phaseProgress = (elapsed - PHASE_DURATIONS.opening - PHASE_DURATIONS.middle) / PHASE_DURATIONS.closing;
        
        // Efficiency visualization
        const efficiency = Math.sin(phaseProgress * Math.PI * 4) * 0.5 + 0.5;
        
        // Efficiency bar
        const barWidth = 400;
        const barHeight = 30;
        const barX = centerX - barWidth / 2;
        const barY = centerY - 50;
        
        // Background bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        
        // Efficiency fill
        const fillGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
        fillGradient.addColorStop(0, '#4FC3F7');
        fillGradient.addColorStop(0.5, '#81C784');
        fillGradient.addColorStop(1, '#FFB74D');
        
        ctx.fillStyle = fillGradient;
        ctx.fillRect(barX, barY, barWidth * efficiency, barHeight);
        
        // Efficiency percentage
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.floor(efficiency * 100)}% Efficiency`, centerX, barY - 20);
        
        // Time savings visualization
        const timeSaved = Math.floor(efficiency * 40);
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Save ${timeSaved} hours per week`, centerX, barY + 60);
        
        // Call to action (animated)
        const ctaAlpha = Math.sin(phaseProgress * Math.PI * 2) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${ctaAlpha})`;
        ctx.font = 'bold 36px Arial';
        ctx.fillText('Transform Your Business', centerX, centerY + 150);
        ctx.font = 'bold 28px Arial';
        ctx.fillText('with AI and Automation', centerX, centerY + 190);
        
        // Action button simulation
        const buttonWidth = 300;
        const buttonHeight = 60;
        const buttonX = centerX - buttonWidth / 2;
        const buttonY = centerY + 220;
        
        const buttonGradient = ctx.createLinearGradient(buttonX, buttonY, buttonX, buttonY + buttonHeight);
        buttonGradient.addColorStop(0, '#4FC3F7');
        buttonGradient.addColorStop(1, '#2196F3');
        
        ctx.fillStyle = buttonGradient;
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Arial';
        ctx.fillText('GET STARTED NOW', centerX, buttonY + 38);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentPhase]);

    return (
    <div ref={containerRef} className={`relative w-full h-screen overflow-hidden ${className}`}>
      <BackgroundMusic phase={currentPhase} />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(135deg, #0d47a1 0%, #1976d2 50%, #42a5f5 100%)',
        }}
      />      {/* Phase indicator */}
      <div className="absolute top-8 right-8 bg-black/70 backdrop-blur-sm rounded-lg p-4">
        <div className="text-white text-sm font-bold mb-2">Video Phase:</div>
        <div className="text-blue-400 text-xs uppercase tracking-wider">
          {currentPhase === 'opening' && '🚀 Opening: AI Networks'}
          {currentPhase === 'middle' && '⚙️ Middle: Workflow Automation'}
          {currentPhase === 'closing' && '✨ Closing: Transform Business'}
        </div>
        <div className="w-32 h-1 bg-gray-700 rounded-full mt-2">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full transition-all duration-1000"
            style={{ 
              width: currentPhase === 'opening' ? '33%' : 
                     currentPhase === 'middle' ? '66%' : '100%' 
            }}
          />
        </div>
      </div>

      {/* Professional badges */}
      <div className="absolute top-8 left-8 space-y-3">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          🎬 4K QUALITY ANIMATION
        </div>
        <div className="bg-gradient-to-r from-green-500 to-blue-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          🤖 PROFESSIONAL AI SHOWCASE
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          ⚡ INTERACTIVE 3D EXPERIENCE
        </div>
      </div>

      {/* Interactive sound effects controls */}
      <div className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-sm rounded-lg p-3">
        <div className="text-white text-xs mb-2">🔊 Interactive Audio:</div>
        <div className="text-blue-300 text-xs mb-1">Futuristic Soundtrack Active</div>
        <div className="text-green-300 text-xs mb-2">Data Flow SFX Enabled</div>
        <div className="space-y-1">
          <button 
            onClick={() => audioManager.play('data-flow')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs px-2 py-1 rounded transition-colors"
          >
            🌊 Data Flow
          </button>
          <button 
            onClick={() => audioManager.play('automation')}
            className="w-full bg-green-600 hover:bg-green-500 text-white text-xs px-2 py-1 rounded transition-colors"
          >
            ⚙️ Automation
          </button>
          <button 
            onClick={() => audioManager.play('efficiency')}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white text-xs px-2 py-1 rounded transition-colors"
          >
            ✨ Efficiency
          </button>
        </div>
      </div>

      {/* Technical specs */}
      <div className="absolute bottom-8 right-8 bg-black/70 backdrop-blur-sm rounded-lg p-3">
        <div className="text-white text-xs font-bold mb-1">🎯 Technical Specs:</div>
        <div className="text-blue-300 text-xs">Resolution: 4K Ready</div>
        <div className="text-green-300 text-xs">Frame Rate: 60 FPS</div>
        <div className="text-yellow-300 text-xs">Duration: 30 Seconds Loop</div>
      </div>
    </div>
  );
};

export default Professional3DHeroVideo;