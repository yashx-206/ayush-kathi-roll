import React from 'react';
import { Flame, ArrowUpRight, Phone, MapPin, Globe, MessageCircle } from 'lucide-react';
import { OUTLET_INFO } from '../data/menu';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#040406] border-t border-amber-900/30 text-stone-300 overflow-hidden">
      {/* Top Golden Light Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-stone-800">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border border-amber-500/40 bg-gradient-to-br from-red-950 to-amber-950 flex items-center justify-center">
                <Flame className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-heading text-xl font-black tracking-tight text-white uppercase block leading-none">
                  FOOD ADDA
                </span>
                <span className="text-[10px] tracking-[0.25em] text-amber-500/90 font-bold uppercase block mt-1">
                  Famous Roll in Palam · New Delhi
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              An immersive culinary campaign dedicated to the sacred art of the seasoned iron tawa. Famous across Southwest Delhi for authentic flaky rolls, momos, and cold refreshments since 2014.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${OUTLET_INFO.whatsapp}?text=${encodeURIComponent('Hi Food Adda, I want to order for home delivery.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 hover:border-emerald-500 text-emerald-400 text-xs font-black tracking-wider transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WHATSAPP ORDER</span>
              </a>
              <a
                href={`tel:${OUTLET_INFO.phone.replace(/\s/g, '')}`}
                className="px-3.5 py-1.5 rounded-lg bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-300 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{OUTLET_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif-cinematic text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-amber-300 transition-colors">
                  The Roll & Tawa Sear
                </a>
              </li>
              <li>
                <a href="#flavor" className="hover:text-amber-300 transition-colors">
                  Kinetic Flavor Science
                </a>
              </li>
              <li>
                <a href="#macro" className="hover:text-amber-300 transition-colors">
                  Macro Optical Inspection
                </a>
              </li>
              <li>
                <a href="#anatomy" className="hover:text-amber-300 transition-colors">
                  Anatomy of Perfection
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-300 transition-colors">
                  Palam Heritage & Philosophy
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-300 transition-colors">
                  100+ Menu & Cold Drinks
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-300 transition-colors">
                  Delivery Area & Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Delivery Kitchen */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif-cinematic text-xs font-bold uppercase tracking-[0.2em] text-amber-400">
              WhatsApp Delivery
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800">
                <span className="font-bold text-white block uppercase tracking-wider mb-1">
                  Delivery Kitchen · Palam
                </span>
                <span className="text-stone-400 leading-relaxed block">
                  {OUTLET_INFO.address}
                </span>
              </div>
              <a
                href={`https://wa.me/${OUTLET_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/80 flex items-center justify-between text-stone-400 hover:border-emerald-600 transition-colors"
              >
                <span>WhatsApp Orders</span>
                <span className="text-emerald-400 font-bold">{OUTLET_INFO.phone}</span>
              </a>
              <div className="p-3 rounded-xl bg-stone-900/40 border border-stone-800/80 flex items-center justify-between text-stone-400">
                <span>Timings: 11:30 AM – 11:30 PM</span>
                <span className="text-emerald-400 font-bold">Delivery Only</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <div>
            © {new Date().getFullYear()} Food Adda. Famous Roll in Palam, New Delhi. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#menu" className="hover:text-stone-300 transition-colors">
              Menu
            </a>
            <a href="#location" className="hover:text-stone-300 transition-colors">
              Delivery Area
            </a>
            <a href="#hero" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-semibold">
              <span>Back to Top</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
