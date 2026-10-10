import React, { useState } from 'react';
import { CINEMATIC_IMAGES } from '../assets/images';
import { SteamCanvas } from './SteamCanvas';
import { PaneerCookingShot } from './PaneerCookingShot';
import { ZoomIn, Eye, Sparkles, Flame, Check, Video, Camera } from 'lucide-react';

interface MacroHotspot {
  id: string;
  name: string;
  desc: string;
  x: number;
  y: number;
  flavorProfile: string;
}

export const MacroSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'paneer-cooking' | 'macro-texture'>('paneer-cooking');
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [activeHotspot, setActiveHotspot] = useState<string>('paneer-crust');
  const [isSizzling, setIsSizzling] = useState<boolean>(true);

  // Hotspots for the Live Paneer Cooking Pan sequence
  const paneerCookingHotspots: MacroHotspot[] = [
    {
      id: 'paneer-crust',
      name: 'Charred Golden Searing Crust',
      desc: 'High-temperature contact with seasoned cast iron triggers natural Maillard browning, sealing in milky tenderness with a delicate smoky crunch.',
      x: 46,
      y: 48,
      flavorProfile: 'Caramelized Golden · Smoky Tawa · Crisp Exterior',
    },
    {
      id: 'oil-bubbles',
      name: 'Bubbling Spiced Oil & Ghee',
      desc: 'Cold-pressed mustard oil infused with crushed roasted ajwain and degi mirch actively simmering and enveloping the cooking paneer.',
      x: 62,
      y: 62,
      flavorProfile: 'Active Simmer · Aromatic Spice · Pungent Warmth',
    },
    {
      id: 'malai-core',
      name: 'Soft Whole-Milk Malai Core',
      desc: 'Freshly pressed buffalo milk paneer retains pristine moisture, melting luxuriously upon first bite without rubberiness.',
      x: 32,
      y: 38,
      flavorProfile: 'Velvety Soft · Creamy Sweetness · Melt-In-Mouth',
    },
    {
      id: 'herb-aromatics',
      name: 'Toasted Fenugreek & Herbs',
      desc: 'Crushed kasuri methi leaves and fresh cilantro ribbons sizzled in hot fat, releasing essential oils and rich herbal aroma.',
      x: 68,
      y: 32,
      flavorProfile: 'Herbaceous Bittersweet · Roasted Aroma · Earthy',
    },
  ];

  // Hotspots for Macro Glaze & Noodle/Paratha Texture
  const macroTextureHotspots: MacroHotspot[] = [
    {
      id: 'sauce',
      name: 'Glossy Tawa Masala Emulsion',
      desc: 'Infused with roasted Kashmiri degi mirch, slow-simmered onion-tomato reduction, and cold-pressed mustard oil clinging to every surface.',
      x: 48,
      y: 44,
      flavorProfile: 'Smoky Spiced · Rich Umami · Tandoori',
    },
    {
      id: 'peanuts',
      name: 'Toasted Crushed Golden Peanuts',
      desc: 'Double dry-roasted peanuts providing an addictive nutty counter-crunch against the tender charred morsels.',
      x: 64,
      y: 36,
      flavorProfile: 'Earthy Crunch · Toasted Nutty · Roasted',
    },
    {
      id: 'scallions',
      name: 'Crisp Green Scallion & Onion Ribbons',
      desc: 'Thinly cut scallions and vinegar-pickled onions tossed at the final second for refreshing peppery crispness and sharpness.',
      x: 35,
      y: 56,
      flavorProfile: 'Herbaceous Bite · Tangy Crisp · Zesty',
    },
    {
      id: 'paratha-flakes',
      name: 'Tensile Flaky Laccha Paratha Crust',
      desc: 'Multi-spiral dough rolled and browned on the heavy cast-iron tawa, retaining structural tensile chew without absorbing excess oil.',
      x: 52,
      y: 68,
      flavorProfile: 'Flaky Golden · Layered Chew · Buttery',
    },
  ];

  const currentHotspots = activeMode === 'paneer-cooking' ? paneerCookingHotspots : macroTextureHotspots;
  const currentSpot = currentHotspots.find((h) => h.id === activeHotspot) || currentHotspots[0];

  return (
    <section id="macro" className="relative py-28 sm:py-36 bg-[#040406] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 mb-3">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 03 · Macro Inspection</span>
          </div>
          <h2 className="font-serif-cinematic text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-white uppercase leading-tight">
            MACRO <span className="text-gold-gradient">CULINARY INSPECTION.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light tracking-wide leading-relaxed">
            Experience smooth side-to-side camera movement across actively cooking paneer cubes, subtle slow push-ins, and shallow depth of field.
          </p>

          {/* Camera View Switcher */}
          <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-stone-950/80 border border-stone-800 shadow-xl">
            <button
              onClick={() => {
                setActiveMode('paneer-cooking');
                setActiveHotspot('paneer-crust');
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeMode === 'paneer-cooking'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-950/50'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Sizzling Paneer in Pan</span>
            </button>

            <button
              onClick={() => {
                setActiveMode('macro-texture');
                setActiveHotspot('sauce');
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeMode === 'macro-texture'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-md shadow-amber-950/50'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Signature Texture & Sear</span>
            </button>
          </div>
        </div>

        {/* Macro Viewer Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Macro Canvas */}
          <div className="lg:col-span-8 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-900/50 bg-black aspect-[16/10] shadow-2xl group">
              {/* Camera views: the two shots dissolve into each other with a slow focus pull */}
              <div
                className="absolute inset-0"
                style={{
                  opacity: activeMode === 'paneer-cooking' ? 1 : 0,
                  filter: activeMode === 'paneer-cooking' ? 'blur(0px)' : 'blur(10px)',
                  // Fully stop drawing the hidden shot once its dissolve has finished
                  visibility: activeMode === 'paneer-cooking' ? 'visible' : 'hidden',
                  transition: activeMode === 'paneer-cooking'
                    ? 'opacity 1.6s ease-in-out, filter 1.6s ease-in-out, visibility 0s'
                    : 'opacity 1.6s ease-in-out, filter 1.6s ease-in-out, visibility 0s linear 1.6s',
                }}
              >
                <PaneerCookingShot
                  src={CINEMATIC_IMAGES.paneerCookingPan}
                  alt="Paneer searing and sizzling in cast iron pan"
                  effects={isSizzling}
                />
              </div>

              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  opacity: activeMode === 'macro-texture' ? 1 : 0,
                  filter: activeMode === 'macro-texture' ? 'blur(0px)' : 'blur(10px)',
                  // Fully stop drawing the hidden shot once its dissolve has finished
                  visibility: activeMode === 'macro-texture' ? 'visible' : 'hidden',
                  transition: activeMode === 'macro-texture'
                    ? 'opacity 1.6s ease-in-out, filter 1.6s ease-in-out, visibility 0s'
                    : 'opacity 1.6s ease-in-out, filter 1.6s ease-in-out, visibility 0s linear 1.6s',
                }}
              >
                <div
                  className="w-full h-full transition-transform duration-1000 ease-out origin-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img
                    src={CINEMATIC_IMAGES.macroTexture}
                    alt="Macro close-up of signature dish preparation"
                    className="w-full h-full object-cover animate-slow-push"
                  />
                </div>
              </div>

              {/* Realistic Cooking Sizzle & Heat Effects */}
              {isSizzling && (
                <>
                  {/* Atmospheric heat haze refraction layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/12 via-orange-950/10 to-transparent animate-heat-haze pointer-events-none" />

                  {/* Shallow depth of field vignetting & lens blur */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/15 pointer-events-none rounded-2xl" />
                  <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.65)] pointer-events-none rounded-2xl" />

                  {/* Procedural rising steam canvas (the paneer shot has its own steam from the pan) */}
                  {activeMode === 'macro-texture' && (
                    <SteamCanvas intensity={1.2} density="dense" sourceX={0.5} sourceY={0.55} className="z-10" />
                  )}
                </>
              )}

              {/* Hotspot Markers on the Image */}
              {currentHotspots.map((spot) => {
                const isSelected = activeHotspot === spot.id;
                return (
                  <button
                    key={spot.id}
                    onClick={() => setActiveHotspot(spot.id)}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    title={spot.name}
                    aria-label={spot.name}
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`absolute w-8 h-8 rounded-full animate-ping opacity-60 ${
                          isSelected ? 'bg-amber-400' : 'bg-white'
                        }`}
                      />
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xl ${
                          isSelected
                            ? 'bg-amber-500 border-white scale-125 text-black'
                            : 'bg-black/80 border-amber-400 text-amber-300 group-hover/pin:scale-110'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clean Controls below image (No image obscuration) */}
            <div className="mt-3 flex items-center justify-between px-2 text-xs">
              <div className="flex items-center gap-2">
                {activeMode === 'macro-texture' && (
                  <div className="flex items-center gap-2 bg-stone-900/80 px-3 py-1.5 rounded-lg border border-stone-800">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-stone-300 font-medium">Zoom:</span>
                    {[1.0, 1.2, 1.6].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setZoomLevel(lvl)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                          zoomLevel === lvl
                            ? 'bg-amber-500 text-black'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {lvl}x
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSizzling(!isSizzling)}
                  className="flex items-center gap-1.5 text-stone-400 hover:text-amber-300 transition-colors cursor-pointer text-xs"
                >
                  <Flame className={`w-3.5 h-3.5 ${isSizzling ? 'text-amber-400 animate-pulse' : 'text-stone-500'}`} />
                  <span>{isSizzling ? 'Heat Effects On' : 'Heat Effects Off'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Active Inspection Info Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-7 rounded-2xl bg-gradient-to-b from-stone-900/80 to-black/90 border border-amber-900/40 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {activeMode === 'paneer-cooking' ? 'Pan Searing Dynamics' : 'Selected Macro Focal Point'}
                </span>
              </div>

              <h3 className="font-serif-cinematic text-2xl font-bold text-white mb-2 leading-snug">
                {currentSpot.name}
              </h3>

              <div className="inline-block px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] font-medium text-amber-300 tracking-wider uppercase mb-4">
                {currentSpot.flavorProfile}
              </div>

              <p className="text-sm text-stone-300 leading-relaxed font-light mb-6">
                {currentSpot.desc}
              </p>

              <div className="pt-5 border-t border-stone-800 space-y-3">
                <div className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                  Inspect Key Cooking Focal Points:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {currentHotspots.map((h) => (
                    <button
                      key={h.id}
                      onClick={() => setActiveHotspot(h.id)}
                      className={`px-3 py-2 rounded-lg text-left text-xs transition-all border cursor-pointer ${
                        activeHotspot === h.id
                          ? 'border-amber-400 bg-amber-500/20 text-white font-semibold'
                          : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div className="truncate">{h.name.split(' ')[0]} {h.name.split(' ')[1] || ''}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Commercial Quality Seal */}
            <div className="p-5 rounded-xl border border-stone-800/80 bg-stone-950/40 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-stone-200 uppercase tracking-wider">
                  Authentic Cast-Iron Thermal Sear
                </div>
                <div className="text-stone-400 mt-0.5">
                  Natural caramelized browning achieved solely through high flame sear and hand-pressed tawa contact.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
