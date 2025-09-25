import React, { useRef, useEffect } from 'react';

interface AudioManager {
  play: (soundType: 'data-flow' | 'automation' | 'efficiency' | 'transition') => void;
  setVolume: (volume: number) => void;
  cleanup: () => void;
}

export const useAudioEffects = (): AudioManager => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize Web Audio API
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
      gainNodeRef.current.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createSynthSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const envelope = audioContextRef.current.createGain();

    oscillator.connect(envelope);
    envelope.connect(gainNodeRef.current);

    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    oscillator.type = type;

    // ADSR envelope
    envelope.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    envelope.gain.linearRampToValueAtTime(0.1, audioContextRef.current.currentTime + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.05, audioContextRef.current.currentTime + duration * 0.3);
    envelope.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  };

  const play = (soundType: 'data-flow' | 'automation' | 'efficiency' | 'transition') => {
    switch (soundType) {
      case 'data-flow':
        // High-pitched digital flow sounds
        createSynthSound(800 + Math.random() * 400, 0.1, 'square');
        setTimeout(() => createSynthSound(600 + Math.random() * 300, 0.08, 'sawtooth'), 50);
        break;
      
      case 'automation':
        // Mechanical gear sounds
        createSynthSound(200 + Math.random() * 100, 0.2, 'sawtooth');
        createSynthSound(150, 0.15, 'triangle');
        break;
      
      case 'efficiency':
        // Success/achievement sounds
        createSynthSound(523, 0.1, 'sine'); // C5
        setTimeout(() => createSynthSound(659, 0.1, 'sine'), 100); // E5
        setTimeout(() => createSynthSound(784, 0.15, 'sine'), 200); // G5
        break;
      
      case 'transition':
        // Swoosh/transition sounds
        createSynthSound(400, 0.3, 'sawtooth');
        setTimeout(() => createSynthSound(300, 0.2, 'sine'), 100);
        break;
    }
  };

  const setVolume = (volume: number) => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  };

  const cleanup = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  return { play, setVolume, cleanup };
};

// Background music component
export const BackgroundMusic: React.FC<{ phase: 'opening' | 'middle' | 'closing' }> = ({ phase }) => {
  const audioManager = useAudioEffects();

  useEffect(() => {
    const playBackgroundTone = () => {
      switch (phase) {
        case 'opening':
          // Mysterious, building atmosphere
          audioManager.play('data-flow');
          break;
        case 'middle':
          // Active, working sounds
          audioManager.play('automation');
          break;
        case 'closing':
          // Success, achievement
          audioManager.play('efficiency');
          break;
      }
    };

    // Play background tones periodically
    const interval = setInterval(playBackgroundTone, 2000 + Math.random() * 1000);

    return () => {
      clearInterval(interval);
      audioManager.cleanup();
    };
  }, [phase, audioManager]);

  return null;
};

// Particle system with sound integration
export interface SoundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  soundTrigger?: boolean;
  trail: Array<{x: number, y: number}>;
}

export const createSoundParticle = (
  x: number, 
  y: number, 
  audioManager: AudioManager
): SoundParticle => {
  // Trigger sound when particle is created
  audioManager.play('data-flow');
  
  return {
    x,
    y,
    vx: (Math.random() - 0.5) * 4,
    vy: (Math.random() - 0.5) * 4,
    life: 120,
    maxLife: 120,
    color: ['#4FC3F7', '#81C784', '#FFB74D', '#F48FB1'][Math.floor(Math.random() * 4)],
    size: Math.random() * 5 + 2,
    soundTrigger: true,
    trail: []
  };
};

// Enhanced visual effects
export const VisualEffects = {
  // Cryptocurrency-style glowing lines
  drawGlowingLine: (
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    intensity: number = 1
  ) => {
    // Main line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 * intensity;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 10 * intensity;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Outer glow
    ctx.strokeStyle = color + '40';
    ctx.lineWidth = 6 * intensity;
    ctx.stroke();
  },

  // Digital grid with animation
  drawAnimatedGrid: (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    time: number,
    color: string = '#4FC3F7'
  ) => {
    const gridSize = 50;
    const opacity = (Math.sin(time * 0.001) + 1) * 0.1 + 0.05;

    ctx.strokeStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.lineDashOffset = -time * 0.01;

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.setLineDash([]);
  },

  // Kinetic typography with sound
  drawKineticText: (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    time: number,
    audioManager: AudioManager
  ) => {
    const letters = text.split('');
    let currentX = x - (ctx.measureText(text).width / 2);

    letters.forEach((letter, i) => {
      const letterTime = time + i * 100;
      const shake = Math.sin(letterTime * 0.01) * 2;
      const scale = 1 + Math.sin(letterTime * 0.008) * 0.1;

      ctx.save();
      ctx.translate(currentX, y + shake);
      ctx.scale(scale, scale);

      // Letter glow
      ctx.shadowColor = '#4FC3F7';
      ctx.shadowBlur = 5;
      ctx.fillStyle = '#ffffff';
      ctx.fillText(letter, 0, 0);

      ctx.restore();

      currentX += ctx.measureText(letter).width;

      // Trigger sound for certain letters
      if (i % 3 === 0 && Math.random() < 0.1) {
        audioManager.play('transition');
      }
    });
  },

  // 3D cube rotation effect
  drawRotatingCube: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number,
    color: string
  ) => {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);

    // 3D cube vertices
    const vertices = [
      [-size, -size, -size],
      [size, -size, -size],
      [size, size, -size],
      [-size, size, -size],
      [-size, -size, size],
      [size, -size, size],
      [size, size, size],
      [-size, size, size]
    ];

    // Project 3D to 2D
    const projected = vertices.map(([vx, vy, vz]) => {
      const rotatedX = vx * cos - vz * sin;
      const rotatedZ = vx * sin + vz * cos;
      
      const scale = 200 / (200 + rotatedZ);
      return [x + rotatedX * scale, y + vy * scale];
    });

    // Draw cube faces
    const faces = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [0, 1, 5, 4],
      [2, 3, 7, 6],
      [0, 3, 7, 4],
      [1, 2, 6, 5]
    ];

    faces.forEach((face, i) => {
      ctx.beginPath();
      ctx.moveTo(projected[face[0]][0], projected[face[0]][1]);
      face.forEach(vertex => {
        ctx.lineTo(projected[vertex][0], projected[vertex][1]);
      });
      ctx.closePath();

      const faceColor = color + Math.floor(((i + 1) / faces.length) * 128).toString(16).padStart(2, '0');
      ctx.fillStyle = faceColor;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }
};

export default { useAudioEffects, BackgroundMusic, VisualEffects };