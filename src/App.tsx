/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FlavorSection } from './components/FlavorSection';
import { MacroSection } from './components/MacroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { BrandStorySection } from './components/BrandStorySection';
import { MenuSection } from './components/MenuSection';
import { FullScreenMoment } from './components/FullScreenMoment';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { OrderDrawer, CartLine } from './components/OrderDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MenuItem } from './data/menu';
import { Check } from 'lucide-react';

export default function App() {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [addedItemId, setAddedItemId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const totalPrice = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);

  const toastTimer = useRef<number>(0);
  const showToast = (message: string) => {
    setToastMessage(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMessage(null), 3500);
  };

  // "Add" on a menu card puts one portion in the WhatsApp order
  const handleAddToOrder = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((line) => line.item.id === item.id);
      if (existing) {
        return prev.map((line) => (line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...prev, { item, quantity: 1 }];
    });
    setAddedItemId(item.id);
    window.setTimeout(() => setAddedItemId((id) => (id === item.id ? null : id)), 1200);
    showToast(`${item.name} added to your order`);
  };

  const handleChangeQuantity = (itemId: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.item.id !== itemId)
        : prev.map((line) => (line.item.id === itemId ? { ...line, quantity } : line))
    );
  };

  const handleOpenOrderGeneral = () => {
    setIsOrderOpen(true);
  };

  const handleOrderSuccess = (orderSummary: string) => {
    setCart([]);
    showToast(`Order sent on WhatsApp: ${orderSummary}`);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#060608] text-[#eae7e1] flex flex-col antialiased selection:bg-[#d97706]/30 selection:text-[#fef3c7]">
      {/* 1. Sticky Cinematic Top Bar */}
      <Navbar
        onOpenOrder={handleOpenOrderGeneral}
        orderCount={itemCount}
      />

      <main className="flex-1">
        {/* 2. Hero Section: Fullscreen 3D Parallax Dish & Procedural Steam */}
        <HeroSection
          onExploreClick={() => scrollToSection('macro')}
          onStoryClick={() => scrollToSection('story')}
        />

        {/* 3. Section 02 — The Flavor: 3 Kinetic Tawa Pillars */}
        <FlavorSection />

        {/* 4. Section 03 — Macro Culinary Inspection (Zoom, Hotspots, Sizzle) */}
        <MacroSection />

        {/* 5. Section 04 — Interactive Anatomy of the Dish / Roll */}
        <IngredientsSection />

        {/* 6. Section 05 — Brand Story & Palam Heritage Since 2014 */}
        <BrandStorySection />

        {/* 7. Section 06 — 100+ Menu Items & 22 Cold Drinks & Shakes */}
        <MenuSection
          onSelectItem={handleAddToOrder}
          addedItemId={addedItemId}
        />

        {/* 8. Section 07 — Full Screen Food Moment (Made Hot. Served Bold.) */}
        <FullScreenMoment />

        {/* 9. Section 08 — Delivery area, Google Map & WhatsApp ordering */}
        <LocationSection />
      </main>

      {/* 10. Minimalist Luxury Dark Footer */}
      <Footer />

      {/* WhatsApp Delivery Order Drawer */}
      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        cart={cart}
        onChangeQuantity={handleChangeQuantity}
        onBrowseMenu={() => {
          setIsOrderOpen(false);
          scrollToSection('menu');
        }}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating WhatsApp order button */}
      {!isOrderOpen && (
        <FloatingWhatsApp itemCount={itemCount} totalPrice={totalPrice} onOpenOrder={handleOpenOrderGeneral} />
      )}

      {/* Kitchen Toast Notification */}
      {toastMessage && !isOrderOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 left-4 sm:left-auto z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-black/90 border border-amber-500/50 text-white shadow-2xl backdrop-blur-xl">
          <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-amber-300 uppercase tracking-wider">Food Adda</div>
            <div className="text-stone-300">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
}
