import React from 'react';
import { CINEMATIC_IMAGES } from '../assets/images';
import { SteamCanvas } from './SteamCanvas';
import { Flame, Compass, Award, ShieldCheck } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-28 sm:py-36 bg-[#040406] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual of Roaring Tawa Flame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-900/40 bg-black aspect-[4/3] shadow-2xl group">
              <div className="w-full h-full overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src={CINEMATIC_IMAGES.flameAction}
                  alt="Roaring flame over seasoned iron plate at Ayush Kathi Roll"
                  className="w-full h-full object-cover animate-slow-push transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

              {/* Natural steam rising over flame */}
              <SteamCanvas
                intensity={1.2}
                density="medium"
                sourceX={0.48}
                sourceY={0.65}
                smokeMode={true}
                className="z-10"
              />
            </div>

            {/* Note below picture */}
            <div className="mt-4 p-4 rounded-xl bg-stone-950/60 border border-stone-800 flex items-center gap-3">
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <p className="text-xs text-stone-300">
                Heavy hand-forged circular cast-iron tawas seasoned to unlock authentic Delhi street caramelization.
              </p>
            </div>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Section 05 · The Palam Heritage</span>
            </div>

            <h2 className="font-serif-cinematic text-3xl sm:text-5xl font-bold tracking-[0.06em] text-white uppercase leading-[1.1]">
              NOT JUST A ROLL.{' '}
              <span className="text-gold-gradient block">AN OBSESSION.</span>
            </h2>

            <p className="text-base text-stone-300 leading-relaxed font-light">
              Founded in 2014 on Main Railway Road in Palam, <strong>Ayush Kathi Roll</strong> was built on an uncompromising philosophy: elevate authentic Delhi street food to an artisanal culinary science.
            </p>

            <p className="text-sm text-stone-400 leading-relaxed font-light">
              Every single roll is cooked strictly to order on our roaring heavy iron plates. No holding warmers. No industrial precooking. We roll out the multi-layered laccha paratha right before your eyes, sear the fresh malai paneer or succulent chicken in cold-pressed mustard oil, and crown it with stone-ground mint chutney at the exact peak of heat.
            </p>

            {/* Badges */}
            <div className="pt-6 border-t border-stone-800 grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Palam Original
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    10+ years of local mastery & 18,500+ reviews
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Strict Segregation
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    Dedicated 100% vegetarian tawas & utensils
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
