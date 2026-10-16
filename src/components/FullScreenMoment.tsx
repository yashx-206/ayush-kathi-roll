import React from 'react';
import { CINEMATIC_IMAGES } from '../assets/images';
import { SteamCanvas } from './SteamCanvas';
import { Flame } from 'lucide-react';

export const FullScreenMoment: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Full-bleed Background Image with cinematic slow push */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          loading="lazy"
          decoding="async"
          src={CINEMATIC_IMAGES.heroDish}
          alt="Freshly made food at Food Adda, Palam"
          className="w-full h-full object-cover opacity-40 scale-105 animate-slow-push"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]" />
      </div>

      {/* Procedural dense steam rising across viewport */}
      <SteamCanvas
        intensity={1.5}
        density="dense"
        sourceX={0.5}
        sourceY={0.6}
        className="z-10"
      />

      {/* Center Cinematic Typography */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-black/70 backdrop-blur-md mb-6">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.28em] uppercase text-amber-200">
            The Golden Rule of the Iron Tawa
          </span>
        </div>

        <h2 className="font-serif-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.08em] text-white uppercase leading-[1.05]">
          MADE HOT.{' '}
          <span className="text-gold-gradient block sm:inline">SERVED BOLD.</span>
        </h2>

        <p className="mt-6 text-sm sm:text-lg font-light text-stone-300 tracking-[0.16em] max-w-2xl mx-auto leading-relaxed">
          From the roaring cast-iron tawa to your hands in under two minutes. Crisp on the outside, succulent on the inside.
        </p>
      </div>
    </section>
  );
};
