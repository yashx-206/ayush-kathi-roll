import React, { useState, useMemo } from 'react';
import { FULL_MENU_ITEMS, MENU_CATEGORIES, MenuItem } from '../data/menu';
import { Sparkles, Plus, Flame, Search, X, Check, GlassWater } from 'lucide-react';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  addedItemId: string | null;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, addedItemId }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'egg'>('all');

  const filteredItems = useMemo(() => {
    return FULL_MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All Items' || item.category === selectedCategory;

      const matchesDietary =
        dietaryFilter === 'all' || item.dietary === dietaryFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  return (
    <section id="menu" className="relative py-28 sm:py-36 bg-[#060608] overflow-hidden border-t border-stone-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-600/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 06 · The 100+ Culinary Repertoire</span>
          </div>
          <h2 className="font-serif-cinematic text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-white uppercase leading-tight">
            SIGNATURE SELECTIONS & <span className="text-gold-gradient">COLD DRINKS.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light tracking-wide leading-relaxed">
            Explore 108 authentic preparations: tawa-charred kathi rolls, crispy momos, tawa burgers, and our extensive 22-item cold drink & shake lineup.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-stone-900/80 to-black/90 border border-stone-800 shadow-xl mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search the menu"
                placeholder="Search across 100+ items (e.g. Chicken Tikka, Paneer, Momos, Thums Up)..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-800 focus:border-amber-400 bg-black/60 focus:bg-stone-950 text-xs sm:text-sm text-stone-100 focus:outline-hidden transition-all placeholder:text-stone-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 shrink-0">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  dietaryFilter === 'all'
                    ? 'bg-amber-500 text-black shadow-xs'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                All Diets
              </button>

              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-900 text-emerald-400 hover:bg-stone-800 border border-emerald-900/40'
                }`}
              >
                <span className="veg-badge" />
                <span>Veg Only</span>
              </button>

              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-stone-900 text-red-400 hover:bg-stone-800 border border-red-900/40'
                }`}
              >
                <span className="non-veg-badge" />
                <span>Non-Veg</span>
              </button>

              <button
                onClick={() => setDietaryFilter('egg')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  dietaryFilter === 'egg'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-stone-900 text-amber-400 hover:bg-stone-800 border border-amber-900/40'
                }`}
              >
                <span className="egg-badge" />
                <span>Egg</span>
              </button>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-thin">
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 hover:text-white border border-stone-800'
                  }`}
                >
                  {cat === 'Cold Drinks & Beverages' ? '🥤 Cold Drinks & Shakes (22)' : cat}
                </button>
              );
            })}
          </div>

          {/* Counter info */}
          <div className="flex items-center justify-between text-xs text-stone-400 pt-1 border-t border-stone-800">
            <span>
              Showing <strong className="text-white font-bold">{filteredItems.length}</strong> items in{' '}
              <span className="text-amber-400 font-bold">{selectedCategory}</span>
            </span>
            {(searchQuery || dietaryFilter !== 'all' || selectedCategory !== 'All Items') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDietaryFilter('all');
                  setSelectedCategory('All Items');
                }}
                className="text-amber-400 font-bold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Menu Items Grid */}
        {/* Phones: two compact cards per row (dish name, price, order); tablets and desktop unchanged */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {filteredItems.map((item) => {
            const isAdded = addedItemId === item.id;
            return (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-gradient-to-b from-stone-900/60 to-black/90 border border-stone-800 hover:border-amber-500/50 p-3.5 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-amber-950/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-2">
                      {item.dietary === 'veg' && <span className="veg-badge" title="Pure Veg" />}
                      {item.dietary === 'non-veg' && <span className="non-veg-badge" title="Non-Veg" />}
                      {item.dietary === 'egg' && <span className="egg-badge" title="Egg" />}

                      <span className="hidden sm:inline text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    {item.tag && (
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-sm bg-amber-500/15 border border-amber-500/30 text-[8px] sm:text-[10px] font-bold text-amber-300 uppercase tracking-wider sm:tracking-widest">
                        {item.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-cinematic text-sm sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="hidden sm:block text-xs text-stone-400 font-light leading-relaxed mt-2 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-stone-800/80 flex items-center justify-between gap-2 sm:gap-3">
                  <div className="font-serif-cinematic text-base sm:text-xl font-black text-amber-400">
                    ₹{item.price}
                  </div>

                  <button
                    onClick={() => onSelectItem(item)}
                    aria-label={`Add ${item.name} to your order`}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-400 text-stone-200 hover:text-black'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span><span className="sm:hidden">Add</span><span className="hidden sm:inline">Add to Order</span></span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
