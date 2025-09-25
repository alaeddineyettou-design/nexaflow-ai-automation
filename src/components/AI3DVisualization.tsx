import React, { useRef, useEffect, useState } from 'react';

interface AIAutomationVisualizationProps {
  className?: string;
}

const AIAutomationVisualization: React.FC<AIAutomationVisualizationProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = Math.min(window.innerWidth, 800);
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;

    // AI Workflow Steps - Revolutionary Automation Pipeline
    const workflowSteps = [
      { name: 'Data Intake', icon: '📊', color: '#ff6b35', description: 'Smart data collection from multiple sources' },
      { name: 'AI Processing', icon: '🧠', color: '#ff8c42', description: 'Machine learning analysis and pattern recognition' },
      { name: 'Decision Making', icon: '⚡', color: '#ffd23f', description: 'Intelligent decision algorithms' },
      { name: 'n8n Execution', icon: '🔗', color: '#f7931e', description: 'Automated workflow execution' },
      { name: 'Make.com Integration', icon: '🚀', color: '#ff6b35', description: 'Multi-platform automation' },
      { name: 'Output Delivery', icon: '✨', color: '#ff8c42', description: 'Results delivered across channels' }
    ];

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;
    }> = [];

    // Create AI Data Particles
    const createParticle = (x: number, y: number, color: string) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 100,
        maxLife: 100,
        color,
        size: Math.random() * 3 + 1
      };
    };

    // Revolutionary AI Automation Visualization
    const drawAIAutomationFlow = (time: number) => {
      // Clear canvas with gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, size/2);
      gradient.addColorStop(0, 'rgba(255, 107, 53, 0.1)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // Current active step
      const activeStep = Math.floor((time * 0.001) % workflowSteps.length);
      setCurrentStep(activeStep);

      // Draw workflow steps in a flowing pattern
      workflowSteps.forEach((step, index) => {
        const angle = (index / workflowSteps.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 120 + Math.sin(time * 0.002 + index) * 20;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Draw connection lines with data flow
        if (index === activeStep) {
          ctx.strokeStyle = step.color;
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -time * 0.01;
          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw step nodes
        const isActive = index === activeStep;
        const nodeSize = isActive ? 25 + Math.sin(time * 0.01) * 5 : 20;
        
        // Glow effect for active step
        if (isActive) {
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, nodeSize * 2);
          glowGradient.addColorStop(0, step.color + '80');
          glowGradient.addColorStop(1, step.color + '00');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(x, y, nodeSize * 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.fillStyle = isActive ? step.color : step.color + '80';
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Icon in center
        ctx.fillStyle = '#ffffff';
        ctx.font = `${nodeSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(step.icon, x, y);

        // Step label
        ctx.fillStyle = isActive ? '#ffffff' : '#cccccc';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(step.name, x, y + nodeSize + 20);

        // Create particles from active step
        if (isActive && Math.random() < 0.3) {
          particles.push(createParticle(x, y, step.color));
        }
      });

      // Central AI Brain
      const brainSize = 40 + Math.sin(time * 0.005) * 8;
      const brainGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, brainSize);
      brainGradient.addColorStop(0, '#ff6b35');
      brainGradient.addColorStop(0.7, '#ff8c42');
      brainGradient.addColorStop(1, '#ffd23f00');
      
      ctx.fillStyle = brainGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, brainSize, 0, Math.PI * 2);
      ctx.fill();

      // AI Core
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🤖', centerX, centerY);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
      }

      // Innovation Text Overlay
      const currentStepData = workflowSteps[activeStep];
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(20, size - 100, size - 40, 80);
      
      ctx.fillStyle = currentStepData.color;
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Active: ${currentStepData.name}`, 30, size - 75);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px Arial';
      ctx.fillText(currentStepData.description, 30, size - 55);
      
      ctx.fillStyle = '#ffcc00';
      ctx.font = 'bold 10px Arial';
      ctx.fillText('🚀 Revolutionary AI Automation - Never Before Seen Technology', 30, size - 35);
    };

    setIsLoaded(true);

    const animate = (time: number) => {
      drawAIAutomationFlow(time);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 53, 0.1) 0%, rgba(0, 0, 0, 0.8) 70%)',
          filter: 'contrast(1.2) brightness(1.1)'
        }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-orange-400 text-lg font-semibold animate-pulse">
            🚀 Loading Revolutionary AI System...
          </div>
        </div>
      )}
      
      {/* Innovation Badges */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
          🔥 WORLD'S FIRST
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
          ⚡ NEVER BEFORE SEEN
        </div>
      </div>

      {/* Current Step Indicator */}
      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
        <div className="text-orange-400 text-sm font-bold mb-1">Active Process:</div>
        <div className="text-white text-xs">Step {currentStep + 1} of 6</div>
        <div className="w-24 h-1 bg-gray-700 rounded-full mt-2">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Revolutionary Features */}
      <div className="absolute bottom-4 left-4 space-y-1">
        <div className="text-xs text-orange-300 font-semibold">💡 BREAKTHROUGH FEATURES:</div>
        <div className="text-xs text-yellow-300">🧠 Self-Learning AI Engine</div>
        <div className="text-xs text-orange-300">🔗 Seamless n8n Integration</div>
        <div className="text-xs text-yellow-300">⚡ Real-time Decision Making</div>
        <div className="text-xs text-orange-300">🚀 Make.com Superpowers</div>
      </div>
    </div>
  );
};

export default AIAutomationVisualization;