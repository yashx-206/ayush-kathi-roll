import React, { useEffect, useRef } from 'react';
import { SteamCanvas } from './SteamCanvas';
import { LITE_MODE } from '../assets/images';

interface PaneerCookingShotProps {
  src: string;
  alt: string;
  effects?: boolean; // sizzle, steam, heat shimmer and oil movement
}

// One camera pass (left to right, pushing in). The camera then glides back just as slowly.
const PASS_SECONDS = 26;

// The photo is 1376x768 and is shown with object-cover inside a 16:10 frame,
// so horizontal positions are mapped from photo space into frame space.
const PHOTO_ASPECT = 1376 / 768;
const FRAME_ASPECT = 16 / 10;
const X_SCALE = PHOTO_ASPECT / FRAME_ASPECT;
const toFrameX = (photoX: number) => photoX * X_SCALE - (X_SCALE - 1) / 2;

// Where hot oil meets the paneer in the photo (x, y, spread), used for sizzle bubbles
const SIZZLE_ZONES: [number, number, number, number][] = [
  [0.47, 0.69, 0.1, 0.03], // front cube base
  [0.3, 0.6, 0.09, 0.025], // left cube base
  [0.36, 0.64, 0.07, 0.03], // oil pool
  [0.72, 0.61, 0.09, 0.025], // right cube base
  [0.58, 0.66, 0.08, 0.025],
];

const smooth = (p: number) => (1 - Math.cos(p * Math.PI * 2)) / 2;

/**
 * Live paneer cooking shot: slow side-to-side camera pan that moves closer,
 * shallow depth of field, natural browning as the camera pushes in,
 * sizzling oil and rising steam. Everything is built from the real photo.
 */
export const PaneerCookingShot: React.FC<PaneerCookingShotProps> = ({ src, alt, effects = true }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<HTMLDivElement | null>(null);
  const browningRef = useRef<HTMLImageElement | null>(null);
  const glintRef = useRef<HTMLDivElement | null>(null);
  const defocusRef = useRef<HTMLImageElement | null>(null);
  const sizzleRef = useRef<HTMLCanvasElement | null>(null);
  const effectsRef = useRef(effects);
  effectsRef.current = effects;

  // Camera, focus and browning
  useEffect(() => {
    const root = rootRef.current;
    const camera = cameraRef.current;
    if (!root || !camera) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const apply = (seconds: number) => {
      // 0 -> 1 -> 0 with no visible stop at either end
      const p = smooth(seconds / (PASS_SECONDS * 2));
      const pan = -3.4 + p * 6.8; // percent of frame width
      const lift = -0.4 * Math.sin(p * Math.PI); // a slight crane arc mid-move
      const scale = 1.1 + p * 0.085;
      camera.style.transform = `translate3d(${pan}%, ${lift}%, 0) scale(${scale})`;

      // Gentle focus breathing: the background softens a little more as the camera moves in
      if (defocusRef.current) defocusRef.current.style.opacity = String(0.7 + p * 0.3);

      // The crust deepens as the camera moves closer
      if (browningRef.current) browningRef.current.style.opacity = String(0.1 + p * 0.5);

      // A slow light reflection sliding over the hot oil
      if (glintRef.current) {
        const gx = 30 + p * 38 + Math.sin(seconds * 0.5) * 4;
        const gy = 66 + Math.sin(seconds * 0.33) * 3;
        glintRef.current.style.left = `${toFrameX(gx / 100) * 100}%`;
        glintRef.current.style.top = `${gy}%`;
        glintRef.current.style.opacity = String(0.55 + Math.sin(seconds * 0.9) * 0.15);
      }
    };

    if (reduceMotion) {
      apply(PASS_SECONDS * 0.5);
      return;
    }

    const tick = (now: number) => {
      apply((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    };

    // Only animate while the shot is on screen
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(tick);
    });
    frame = requestAnimationFrame(tick);
    observer.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  // Sizzling oil: tiny bubbles forming and popping where oil meets the paneer, and rare fine spatter
  useEffect(() => {
    const canvas = sizzleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    type Bubble = { x: number; y: number; r: number; life: number; max: number; drop?: { vx: number; vy: number } };
    let bubbles: Bubble[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, width * dpr);
      canvas.height = Math.max(1, height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const spawn = (): Bubble => {
      const [zx, zy, sx, sy] = SIZZLE_ZONES[Math.floor(Math.random() * SIZZLE_ZONES.length)];
      const x = toFrameX(zx + (Math.random() - 0.5) * 2 * sx) * width;
      const y = (zy + (Math.random() - 0.5) * 2 * sy) * height;
      const scale = width / 900;
      if (Math.random() < 0.025) {
        return {
          x,
          y,
          r: (0.5 + Math.random() * 0.6) * scale,
          life: 0,
          max: 26 + Math.random() * 16,
          drop: { vx: (Math.random() - 0.5) * 1.4 * scale, vy: -(1.6 + Math.random() * 1.6) * scale },
        };
      }
      return { x, y, r: (0.8 + Math.random() * 2.2) * scale, life: 0, max: 14 + Math.random() * 30 };
    };

    // Drawn at 30fps (each step advances two 60fps frames): looks the same, half the work on phones and tablets
    let lastDraw = 0;
    const render = (now: number) => {
      if (now - lastDraw < 30) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastDraw = now;
      ctx.clearRect(0, 0, width, height);
      if (effectsRef.current) {
        const births = Math.random() < 0.5 ? 4 : 2;
        for (let i = 0; i < births && bubbles.length < (LITE_MODE ? 50 : 110); i++) bubbles.push(spawn());
      }

      ctx.globalCompositeOperation = 'lighter';
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life += 2;
        const t = b.life / b.max;

        if (b.drop) {
          b.x += b.drop.vx * 2;
          b.y += b.drop.vy * 2;
          b.drop.vy += 0.32 * (width / 900);
          const a = Math.sin(t * Math.PI) * 0.55;
          ctx.fillStyle = `rgba(255, 236, 196, ${a})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Bubble swells, catches the light, then pops
          const r = b.r * (0.5 + t * 0.7);
          const a = (t < 0.8 ? t / 0.8 : (1 - t) / 0.2) * 0.38;
          ctx.strokeStyle = `rgba(255, 226, 170, ${a})`;
          ctx.lineWidth = Math.max(0.5, r * 0.28);
          ctx.beginPath();
          ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 248, 230, ${a * 1.3})`;
          ctx.beginPath();
          ctx.arc(b.x - r * 0.35, b.y - r * 0.35, Math.max(0.4, r * 0.28), 0, Math.PI * 2);
          ctx.fill();
        }

        if (b.life >= b.max) bubbles.splice(i, 1);
      }
      ctx.globalCompositeOperation = 'source-over';
      frame = requestAnimationFrame(render);
    };

    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) frame = requestAnimationFrame(render);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      bubbles = [];
    };
  }, []);

  const layer = 'absolute inset-0 w-full h-full object-cover pointer-events-none select-none';
  const focusMask = 'radial-gradient(ellipse 46% 44% at 50% 50%, transparent 0%, transparent 55%, rgba(0,0,0,0.8) 88%, #000 100%)';
  const crustMask = 'radial-gradient(ellipse 44% 26% at 51% 44%, #000 45%, transparent 100%)';

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden">
      {/* Camera rig: everything inside moves together like one lens */}
      <div ref={cameraRef} className="absolute inset-0 origin-center will-change-transform" style={{ transform: 'translate3d(-3.4%, 0, 0) scale(1.1)' }}>
        <img src={src} alt={alt} className={layer} draggable={false} />

        {!LITE_MODE && (
          <>
          {/* Natural browning: a richer, deeper crust graded from the same photo */}
          <img
            ref={browningRef}
            src={src}
            alt=""
            aria-hidden="true"
            className={layer}
            style={{
              opacity: 0.1,
              filter: 'saturate(1.22) contrast(1.07) brightness(0.92) sepia(0.12)',
              WebkitMaskImage: crustMask,
              maskImage: crustMask,
            }}
          />
          </>
        )}

        {/* Moving light reflection on the oil */}
        {effects && (
          <div className="absolute inset-0 pointer-events-none mix-blend-screen">
            <div
              ref={glintRef}
              className="absolute w-[22%] h-[9%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255, 214, 150, 0.22), transparent 70%)' }}
            />
          </div>
        )}

        <canvas
          ref={sizzleRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ opacity: effects ? 1 : 0, transition: 'opacity 1.2s ease' }}
        />

        {effects && (
          <SteamCanvas intensity={0.9} density="medium" sourceX={0.56} sourceY={0.36} essential className="opacity-80" />
        )}

        {!LITE_MODE && (
          <>
          {/* Shallow depth of field: the cubes stay crisp, the pan rim and background fall softly out of focus */}
          <img
            ref={defocusRef}
            src={src}
            alt=""
            aria-hidden="true"
            className={layer}
            style={{ filter: 'blur(3px)', transform: 'scale(1.02)', WebkitMaskImage: focusMask, maskImage: focusMask, opacity: 0.9 }}
          />
          </>
        )}
      </div>
    </div>
  );
};
