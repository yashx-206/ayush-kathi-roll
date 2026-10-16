import React, { useState, useEffect } from 'react';
import { AudioAmbience } from './AudioAmbience';
import { ShoppingBag, Menu as MenuIcon, X, Flame } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: () => void;
  orderCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder, orderCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Roll', href: '#hero' },
    { label: 'The Flavor', href: '#flavor' },
    { label: 'Macro Craft', href: '#macro' },
    { label: 'Anatomy', href: '#anatomy' },
    { label: '100+ Menu', href: '#menu' },
    { label: 'Delivery', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#060608]/92 backdrop-blur-xl border-b border-amber-900/30 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Mark: Food Adda - Famous Roll in Palam */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-amber-500/40 bg-gradient-to-br from-red-950/80 to-amber-950/80 flex items-center justify-center group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300 shadow-md">
            <Flame className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
          </div>
          <div>
            <span className="font-heading text-[15px] min-[400px]:text-base sm:text-xl font-black tracking-tight whitespace-nowrap text-white group-hover:text-amber-200 transition-colors uppercase block leading-none">
              FOOD ADDA
            </span>
            <span className="hidden sm:block text-[9px] sm:text-[10px] tracking-[0.25em] text-amber-400/90 font-bold uppercase mt-1">
              Famous Roll in Palam · New Delhi
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold tracking-[0.16em] uppercase text-stone-300 hover:text-amber-300 transition-colors duration-200 relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Audio Ambience & Order Drawer Button */}
        <div className="flex items-center gap-1.5 sm:gap-3.5 shrink-0">
          <AudioAmbience />

          <button
            onClick={onOpenOrder}
            aria-label="Open your WhatsApp order"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full whitespace-nowrap bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-black tracking-[0.12em] uppercase transition-all duration-300 shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Order<span className="hidden min-[400px]:inline"> Now</span></span>
            {orderCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-black text-amber-300 text-[10px] flex items-center justify-center font-bold">
                {orderCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-stone-300 hover:text-amber-300 cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0a0e]/95 backdrop-blur-2xl border-b border-amber-900/30 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold tracking-[0.18em] uppercase text-stone-300 hover:text-amber-300 py-1.5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
