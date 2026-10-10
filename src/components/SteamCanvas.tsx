import React, { useEffect, useRef } from 'react';
import { LITE_MODE } from '../assets/images';

interface SteamCanvasProps {
  intensity?: number;
  density?: 'subtle' | 'medium' | 'dense';
  className?: string;
  sourceX?: number; // 0..1 relative to canvas width
  sourceY?: number; // 0..1 relative to canvas height
  smokeMode?: boolean;
  essential?: boolean; // kept on phones; decorative steam is skipped there to keep scrolling smooth
}

interface Wisp {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  growth: number;
  stretch: number;
  rotation: number;
  spin: number;
  alpha: number;
  life: number;
  maxLife: number;
  sprite: number;
  phase: number;
}

// Soft, uneven smoke textures are rendered once and reused, so each frame is only cheap image draws
let spriteCache: HTMLCanvasElement[] | null = null;

const buildSprites = (): HTMLCanvasElement[] => {
  if (spriteCache) return spriteCache;
  const sprites: HTMLCanvasElement[] = [];
  for (let s = 0; s < 4; s++) {
    const size = 160;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const g = c.getContext('2d');
    if (!g) continue;

    // Many faint overlapping blobs give the irregular, torn texture of real smoke
    // Thin curling strands built from small offset puffs, so the smoke reads as wisps, not fog
    let cx = size / 2 + (Math.random() - 0.5) * size * 0.1;
    let cy = size * 0.85;
    const bend = (Math.random() - 0.5) * 0.25;
    for (let i = 0; i < 34; i++) {
      cy -= size * 0.02;
      cx += Math.sin(i * 0.45 + s) * size * 0.012 + bend * size * 0.01;
      const x = cx + (Math.random() - 0.5) * size * 0.06;
      const y = cy + (Math.random() - 0.5) * size * 0.04;
      const r = size * (0.035 + Math.random() * 0.06) * (0.6 + i / 34);
      const grad = g.createRadialGradient(x, y, 0, x, y, r);
      const a = 0.14 + Math.random() * 0.14;
      grad.addColorStop(0, `rgba(242, 236, 228, ${a})`);
      grad.addColorStop(0.6, `rgba(230, 222, 212, ${a * 0.45})`);
      grad.addColorStop(1, 'rgba(220, 212, 202, 0)');
      g.fillStyle = grad;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }

    // Feather the outer edge so no circle outline is ever visible
    g.globalCompositeOperation = 'destination-in';
    const fade = g.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size / 2);
    fade.addColorStop(0, 'rgba(0,0,0,1)');
    fade.addColorStop(0.65, 'rgba(0,0,0,0.6)');
    fade.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = fade;
    g.fillRect(0, 0, size, size);
    sprites.push(c);
  }
  spriteCache = sprites;
  return sprites;
};

/**
 * Natural rising steam / smoke: thin wisps leave the food, slowly widen, curl in the air and dissolve.
 * Pauses itself whenever it is off screen.
 */
export const SteamCanvas: React.FC<SteamCanvasProps> = ({
  intensity = 1.0,
  density = 'medium',
  className = '',
  sourceX = 0.5,
  sourceY = 0.65,
  smokeMode = false,
  essential = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const sprites = buildSprites();
    // Above 1.6 intensity the steam gets fuller (more wisps) rather than more opaque
    const fullness = Math.max(1, intensity / 1.6);
    const maxWisps = Math.round((density === 'subtle' ? 14 : density === 'medium' ? 22 : 30) * fullness * (LITE_MODE ? 0.6 : 1));
    const strength = Math.min(intensity, 1.6) * Math.min(fullness, 1.25);
    let wisps: Wisp[] = [];
    let width = 0;
    let dpr = 0.5;
    let height = 0;
    let frame = 0;
    let running = false;
    let last = performance.now();
    let time = Math.random() * 100;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Smoke is soft by nature, so it is drawn at reduced resolution and scaled up: same look, far less work
      dpr = 0.5;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (): Wisp => {
      const unit = Math.min(width, height);
      const spread = smokeMode ? 0.22 : 0.16;
      return {
        x: width * sourceX + (Math.random() - 0.5) * width * spread,
        y: height * sourceY + (Math.random() - 0.5) * height * 0.06,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.28 + Math.random() * 0.32) * (unit / 400),
        size: unit * (0.03 + Math.random() * 0.035),
        growth: unit * (0.0006 + Math.random() * 0.0007),
        stretch: 1.15 + Math.random() * 0.4,
        rotation: (Math.random() - 0.5) * 0.6,
        spin: (Math.random() - 0.5) * 0.004,
        alpha: 0,
        life: 0,
        maxLife: 260 + Math.random() * 220,
        sprite: Math.floor(Math.random() * sprites.length),
        phase: Math.random() * Math.PI * 2,
      };
    };

    const step = (w: Wisp, dt: number) => {
      w.life += dt;
      const t = w.life / w.maxLife;
      // Gentle curling air currents that grow stronger as the wisp rises
      const curl = Math.sin(time * 0.6 + w.phase + w.y * 0.012) * 0.22 * (0.3 + t);
      w.x += (w.vx + curl) * dt;
      w.y += w.vy * dt * (1 - t * 0.35);
      w.size += w.growth * dt;
      w.stretch = Math.max(1, w.stretch - 0.001 * dt);
      w.rotation += w.spin * dt;
      // Quick soft appearance, long natural dissolve
      const fade = t < 0.15 ? t / 0.15 : Math.pow(1 - (t - 0.15) / 0.85, 1.6);
      w.alpha = Math.max(0, fade) * (smokeMode ? 0.4 : 0.3) * strength;
    };

    resize();
    for (let i = 0; i < maxWisps; i++) {
      const w = spawn();
      step(w, Math.random() * w.maxLife * 0.9);
      wisps.push(w);
    }

    const render = (now: number) => {
      // Slow-moving smoke looks identical at 30fps, and costs half as much to draw
      if (now - last < 30) {
        frame = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min(4, (now - last) / 16.67);
      last = now;
      time += 0.016 * dt;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Small screens (phones) get proportionally fewer wisps: same look, lighter on the battery
      const cap = Math.round(maxWisps * Math.max(0.55, Math.min(1, width / 640)));
      if (wisps.length < cap && Math.random() < 0.18 * fullness * dt) wisps.push(spawn());

      for (let i = wisps.length - 1; i >= 0; i--) {
        const w = wisps[i];
        step(w, dt);
        if (w.life >= w.maxLife || w.y + w.size < 0) {
          wisps.splice(i, 1);
          continue;
        }
        const sprite = sprites[w.sprite];
        if (!sprite) continue;
        const cos = Math.cos(w.rotation);
        const sin = Math.sin(w.rotation);
        ctx.setTransform(dpr * cos, dpr * sin, -dpr * sin * w.stretch, dpr * cos * w.stretch, dpr * w.x, dpr * w.y);
        ctx.globalAlpha = w.alpha;
        ctx.drawImage(sprite, -w.size, -w.size, w.size * 2, w.size * 2);
      }

      frame = requestAnimationFrame(render);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      rootMargin: '100px',
    });
    observer.observe(canvas);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      wisps = [];
    };
  }, [intensity, density, sourceX, sourceY, smokeMode]);

  if (LITE_MODE && !essential) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      style={{ zIndex: 12 }}
    />
  );
};
