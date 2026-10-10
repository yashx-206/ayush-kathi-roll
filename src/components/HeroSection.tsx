import React, { useEffect, useRef } from 'react';
import { SteamCanvas } from './SteamCanvas';
import { CINEMATIC_IMAGES, LITE_MODE } from '../assets/images';
import { ChevronDown, Flame, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onStoryClick,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const dishRef = useRef<HTMLDivElement | null>(null);

  // Parallax is applied straight to the elements once per frame, without re-rendering the section
  useEffect(() => {
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      if (glowRef.current) glowRef.current.style.transform = `translate(${x * -6}px, ${y * -6}px)`;
      if (dishRef.current) {
        dishRef.current.style.transform = `perspective(1200px) rotateY(${x * 1.5}deg) rotateX(${y * -1.5}deg)`;
      }
    };
    const handleMouseMove = (e: MouseEvent) => {
      x = (e.clientX / window.innerWidth - 0.5) * 2;
      y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#060608] pt-24 pb-16"
    >
      {/* Cinematic Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-b from-amber-600/15 via-red-900/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Floating Spark particles in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full animate-particle opacity-60"
            style={{
              left: `${12 + ((i * 7) % 76)}%`,
              top: `${55 + ((i * 5) % 40)}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center text-center">
        {/* Subtle Brand Trust Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 max-w-full px-4 py-1.5 rounded-full border border-amber-500/30 bg-black/70 backdrop-blur-md mb-6 shadow-lg shadow-amber-950/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase text-amber-200">
            <span className="hidden sm:inline">Ayush Kathi Roll · </span>Famous Roll in Palam, New Delhi
          </span>
          <span className="hidden sm:inline text-amber-500/60">·</span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            4.3 (18,500+ Reviews)
          </span>
        </div>

        {/* Central Headlines */}
        <h1 className="font-serif-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.08em] text-white uppercase leading-[1.05] max-w-5xl">
          CRAFTED FOR THE{' '}
          <span className="text-gold-gradient block sm:inline">CRAVING.</span>
        </h1>

        <p className="mt-4 sm:mt-5 text-base sm:text-xl font-light text-stone-300 tracking-[0.14em] max-w-2xl text-balance">
          Bold flavors. Tawa-fired perfection.
        </p>

        {/* Cinematic Parallax Dish Showcase */}
        <div className="relative mt-8 sm:mt-12 w-full max-w-[580px] sm:max-w-[680px] aspect-[4/3] flex items-center justify-center">
          {/* Subtle under-plate contact shadow */}
          <div className="absolute bottom-4 w-[76%] h-14 bg-black/90 blur-2xl rounded-full pointer-events-none" />

          {/* Warm volumetric lighting glow behind the dish */}
          <div
            ref={glowRef}
            className="absolute inset-0 rounded-3xl transition-transform duration-1000 ease-out pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-t from-amber-600/20 via-red-950/10 to-transparent rounded-full blur-3xl" />
          </div>

          {/* Interactive Dish with Subtle Parallax */}
          <div
            ref={dishRef}
            className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-amber-900/30 group transition-transform duration-1000 ease-out"
            style={{ transform: 'perspective(1200px) rotateY(0deg) rotateX(0deg)' }}
          >
            {/* Endless slow camera push-in: two takes of the same shot dissolve into each other,
                so the camera only ever moves forward and never jumps back */}
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={CINEMATIC_IMAGES.heroDish}
                alt="Ayush Kathi Roll signature dish, hot off the tawa in Palam, New Delhi"
                fetchPriority="high"
                className={`absolute inset-0 w-full h-full object-cover ${LITE_MODE ? 'animate-slow-push' : 'animate-endless-push'}`}
              />
              {/* Phones use a single gliding take, which is far lighter than two dissolving ones */}
              {!LITE_MODE && <img
                src={CINEMATIC_IMAGES.heroDish}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover animate-endless-push"
                style={{ animationDelay: '-24s' }}
              />}
            </div>

            {/* Subtle heat haze shimmer & atmospheric optical warmth */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent animate-heat-haze pointer-events-none" />

            {/* Soft atmospheric drifting smoke haze */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent animate-smoke-drift pointer-events-none" />

            {/* Anamorphic lens light streak catching the smoke */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-300/15 to-transparent blur-xs pointer-events-none" />

            {/* Natural Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/85 via-transparent to-black/25 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/15 rounded-2xl pointer-events-none" />

            {/* Natural steam rising off the hot dish */}
            <SteamCanvas
              intensity={2.0}
              density="dense"
              sourceX={0.52}
              sourceY={0.55}
              smokeMode={true}
              essential
              className="z-20"
            />
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 z-20">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-[#070709] font-black text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-amber-950/60 hover:shadow-amber-500/30 active:scale-95 cursor-pointer"
          >
            EXPLORE THE DISH
          </button>

          <button
            onClick={onStoryClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-stone-600 hover:border-amber-400/80 bg-black/40 hover:bg-amber-950/30 text-stone-200 hover:text-amber-200 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 backdrop-blur-md cursor-pointer"
          >
            DISCOVER OUR STORY
          </button>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#flavor"
          className="mt-12 sm:mt-14 flex flex-col items-center gap-2 text-stone-400 hover:text-amber-300 transition-colors group cursor-pointer"
        >
          <span className="text-[10px] tracking-[0.28em] uppercase font-medium">Scroll to Immerse</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300 text-amber-400/80" />
        </a>
      </div>
    </section>
  );
};
