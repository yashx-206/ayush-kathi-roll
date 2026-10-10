import React, { useState } from 'react';
import { CINEMATIC_IMAGES } from '../assets/images';
import { SteamCanvas } from './SteamCanvas';
import { Sparkles, Utensils, Award } from 'lucide-react';

interface IngredientItem {
  id: string;
  title: string;
  tagline: string;
  provenance: string;
  tastingNotes: string;
  pinX: number;
  pinY: number;
}

export const IngredientsSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<string>('roll');

  const ingredients: IngredientItem[] = [
    {
      id: 'vegetables',
      title: 'CRISP GREENS & PICKLED ONIONS',
      tagline: 'Farm-picked onions soaked in cider vinegar with freshly cracked peppers',
      provenance: 'Sliced fresh every 2 hours in our Palam kitchen',
      tastingNotes: 'Crisp acidic crunch that pierces through rich tandoori spices',
      pinX: 30,
      pinY: 34,
    },
    {
      id: 'garlic-peanuts',
      title: 'ROASTED GARLIC & PEANUTS',
      tagline: 'Dry-roasted golden peanuts and crispy garlic slivers',
      provenance: 'Slow-toasted in small batches over low fire',
      tastingNotes: 'Deep nutty warmth, buttery roasted crunch, aromatic lift',
      pinX: 72,
      pinY: 42,
    },
    {
      id: 'mint-herbs',
      title: 'FRESH MINT CHUTNEY RIBBONS',
      tagline: 'Stone-crushed fresh pudina, coriander leaves, and green chillies',
      provenance: 'Hand-blended daily without any added food color or starch',
      tastingNotes: 'Zesty cooling herbal finish that balances high tawa heat',
      pinX: 60,
      pinY: 66,
    },
    {
      id: 'sauce',
      title: '24-HR SECRET TANDOORI SAUCE',
      tagline: 'Double-cooked onion-tomato reduction with roasted kasuri methi',
      provenance: 'Simmered slow in heavy copper vessels in our Palam kitchen',
      tastingNotes: 'Deep roasted smoky umami, fragrant cardamom and fenugreek notes',
      pinX: 42,
      pinY: 48,
    },
    {
      id: 'roll',
      title: 'PERFECTLY TAWA-TOSSED ROLL',
      tagline: 'Hand-rolled multi-layered flaky laccha paratha with tensile bite',
      provenance: 'Freshly stretched dough cooked directly on seasoned iron tawa',
      tastingNotes: 'Ultra-crispy golden outer crust, tender buttery inner crumb',
      pinX: 52,
      pinY: 55,
    },
  ];

  const active = ingredients.find((i) => i.id === selectedIngredient) || ingredients[0];

  return (
    <section id="anatomy" className="relative py-28 sm:py-36 bg-[#060608] overflow-hidden">
      {/* Cinematic subtle glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 mb-3">
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 04 · Interactive Anatomy</span>
          </div>
          <h2 className="font-serif-cinematic text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-white uppercase leading-tight">
            THE ANATOMY OF <span className="text-gold-gradient">PERFECTION.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light tracking-wide leading-relaxed">
            Select any ingredient pin to reveal its sourcing, preparation discipline, and flavor contribution to Ayush Kathi Roll's legendary recipe.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Dish with Pins */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-900/40 bg-black aspect-square max-w-[540px] mx-auto shadow-2xl group">
              <div className="w-full h-full overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src={CINEMATIC_IMAGES.overheadShowcase}
                  alt="Overhead view of Ayush Kathi Roll dishes"
                  className="w-full h-full object-cover animate-slow-push transition-transform duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Vignette */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/70 pointer-events-none" />

              {/* Natural steam rising from center */}
              <SteamCanvas
                intensity={1.0}
                density="medium"
                sourceX={0.5}
                sourceY={0.52}
                className="z-10"
              />

              {/* Interactive Callout Pins */}
              {ingredients.map((item) => {
                const isSelected = selectedIngredient === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedIngredient(item.id)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group/pin"
                    style={{ left: `${item.pinX}%`, top: `${item.pinY}%` }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-7 h-7 rounded-full animate-ping opacity-75 ${
                          isSelected ? 'bg-amber-400' : 'bg-stone-400/50'
                        }`}
                      />
                      <div
                        className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border flex items-center gap-1.5 shadow-xl ${
                          isSelected
                            ? 'bg-amber-400 text-black border-white scale-110 shadow-amber-500/40'
                            : 'bg-black/85 text-stone-200 border-amber-500/40 hover:border-amber-400 hover:text-white'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>{item.title.split(' ')[0]}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Ingredient Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-stone-900/90 via-black to-black border border-amber-900/40 shadow-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Component Profile</span>
              </div>

              <h3 className="font-serif-cinematic text-2xl sm:text-3xl font-bold text-white mb-2 uppercase">
                {active.title}
              </h3>

              <p className="text-sm font-medium text-amber-300 mb-6 leading-relaxed">
                {active.tagline}
              </p>

              <div className="space-y-4 pt-4 border-t border-stone-800">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1">
                    Provenance & Sourcing
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                    {active.provenance}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1">
                    Tasting Profile & Texture
                  </div>
                  <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed font-light">
                    {active.tastingNotes}
                  </p>
                </div>
              </div>

              {/* Selector Pills */}
              <div className="mt-8 pt-6 border-t border-stone-800/80">
                <div className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3">
                  All 5 Core Elements
                </div>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ing) => (
                    <button
                      key={ing.id}
                      onClick={() => setSelectedIngredient(ing.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedIngredient === ing.id
                          ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                          : 'bg-stone-900/80 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                      }`}
                    >
                      {ing.title.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Culinary Note */}
            <div className="p-5 rounded-xl border border-amber-900/30 bg-amber-950/15 flex items-start gap-4">
              <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-300 leading-relaxed">
                <strong className="text-white uppercase tracking-wider block mb-0.5">
                  Synchronized Live Assembly
                </strong>
                All five components meet on the red-hot tawa in a synchronized 45-second flash toss to lock in crispness, steam, and unadulterated crunch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
