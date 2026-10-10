import React, { useState } from 'react';
import { CINEMATIC_IMAGES } from '../assets/images';
import { SteamCanvas } from './SteamCanvas';
import { Flame, Sparkles, Wind } from 'lucide-react';

export const FlavorSection: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const flavorPillars = [
    {
      id: 'tawa-hei',
      title: 'The Tawa-Hei Searing Sear',
      subtitle: 'Heavy Cast Iron Kiss',
      desc: 'In milliseconds, the scorching iron plate vaporizes spiced marinade droplets, locking in deep smoky caramelization and juicy tenderness.',
      icon: Flame,
      stat: 'HIGH SEAR',
      statLabel: 'Tawa Heat',
    },
    {
      id: 'master-marinade',
      title: '24-Hour Master Reduction',
      subtitle: 'Traditional Delhi Spices',
      desc: 'Hanged thick curd, stone-ground ginger-garlic, Kashmiri degi mirch, cold-pressed mustard oil, and crushed roasted cumin simmered to a velvety glaze.',
      icon: Sparkles,
      stat: '24 HRS',
      statLabel: 'Aged Marinade',
    },
    {
      id: 'flaky-laccha',
      title: 'Flaky Multi-Layer Elasticity',
      subtitle: 'Hand-Stretched Laccha Dough',
      desc: 'Folded and spiral-layered with pure ghee for exceptional crispness on the outside and soft springy chew on the inside—never soggy, always golden.',
      icon: Wind,
      stat: '100%',
      statLabel: 'Hand-Rolled Layers',
    },
  ];

  return (
    <section id="flavor" className="relative py-28 sm:py-36 bg-[#08080c] overflow-hidden">
      {/* Background Texture Overlay with slow camera push */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <img
          loading="lazy"
          decoding="async"
          src={CINEMATIC_IMAGES.macroTexture}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover scale-110 grayscale animate-slow-push"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080c] via-transparent to-[#08080c]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 02 · Kinetic Street Food Science</span>
          </div>
          <h2 className="font-serif-cinematic text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-white uppercase leading-tight">
            FLAVOR THAT <span className="text-gold-gradient">MOVES.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light tracking-wide leading-relaxed">
            Where legendary Old Delhi tawa craft meets precision culinary passion in Palam. Every single roll is fired fresh to order on seasoned heavy cast iron plates.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {flavorPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = activeCard === idx;
            return (
              <div
                key={pillar.id}
                onClick={() => setActiveCard(idx)}
                className={`group relative rounded-2xl p-7 md:p-6 lg:p-10 transition-all duration-500 cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-b from-amber-950/40 via-stone-900/60 to-black/90 border-amber-500/60 shadow-2xl shadow-amber-950/50 scale-[1.02]'
                    : 'bg-black/50 border-stone-800/80 hover:border-amber-700/40 hover:bg-stone-950/70'
                }`}
              >
                <div
                  className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent blur-lg opacity-0 transition-opacity duration-500 pointer-events-none ${
                    isActive ? 'opacity-100' : 'group-hover:opacity-40'
                  }`}
                />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-serif-cinematic text-2xl font-bold text-amber-500/70">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-serif-cinematic text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-semibold tracking-wider text-amber-400/90 uppercase mb-4">
                      {pillar.subtitle}
                    </p>
                    <p className="text-sm text-stone-300 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-baseline justify-between">
                    <div>
                      <div className="font-serif-cinematic text-2xl font-black text-white">
                        {pillar.stat}
                      </div>
                      <div className="text-[10px] tracking-widest uppercase text-stone-400">
                        {pillar.statLabel}
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 opacity-70 group-hover:opacity-100">
                      {isActive ? 'Active Pillar' : 'Explore'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-2xl bg-black/60 border border-amber-900/30 backdrop-blur-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <SteamCanvas intensity={0.6} density="subtle" sourceX={0.2} sourceY={0.9} />
          <div className="max-w-2xl">
            <p className="font-serif-cinematic text-lg sm:text-xl text-stone-200 italic leading-relaxed">
              &ldquo;The secret to the famous roll is the dialogue between fire, cold spices, and the rhythmic roll of the wooden spatula over cast iron.&rdquo;
            </p>
            <span className="block mt-2 text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
              — Master Tawa Kitchen · Ayush Kathi Roll, Palam
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-950/30 text-amber-400 font-bold text-sm">
              2014
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white">Palam, New Delhi</div>
              <div className="text-[11px] text-stone-400">Famous Roll Destination</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
