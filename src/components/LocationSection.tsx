import React from 'react';
import { OUTLET_INFO } from '../data/menu';
import { MapPin, Clock, Phone, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="relative py-28 sm:py-36 bg-[#040406] overflow-hidden border-t border-amber-900/30">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-600/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.3em] uppercase text-amber-400 mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Famous Roll in Palam · WhatsApp Home Delivery</span>
          </div>
          <h2 className="font-serif-cinematic text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.06em] text-white uppercase leading-tight">
            DELIVERY & <span className="text-gold-gradient">WHATSAPP ORDERING.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-300 font-light tracking-wide leading-relaxed">
            We are a delivery-only kitchen in Palam. Send your order on WhatsApp and we bring it hot off the tawa to your door across Palam and nearby Southwest Delhi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Address & Outlet Info Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-stone-900/70 to-black/90 border border-amber-900/40 shadow-xl space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cinematic text-xl font-bold text-white uppercase mb-1">
                    Our Delivery Kitchen
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {OUTLET_INFO.address}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Palam+Railway+Road+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cinematic text-xl font-bold text-white uppercase mb-1">
                    Operating Hours
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {OUTLET_INFO.timings}<br />
                    WhatsApp orders taken from 11:30 AM to 11:30 PM
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-stone-800 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-cinematic text-xl font-bold text-white uppercase mb-1">
                    Order on WhatsApp
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    WhatsApp: <a href={`https://wa.me/${OUTLET_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">{OUTLET_INFO.phone}</a><br />
                    Phone: <a href={`tel:${OUTLET_INFO.phone.replace(/\s/g, '')}`} className="text-white hover:text-amber-300 font-bold">{OUTLET_INFO.phone}</a><br />
                    Home delivery only, no dine-in or takeaway.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${OUTLET_INFO.phone.replace(/\s/g, '')}`}
                className="py-3 px-4 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-white text-xs font-bold text-center flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Us</span>
              </a>

              <a
                href={`https://wa.me/${OUTLET_INFO.whatsapp}?text=${encodeURIComponent('Hi Food Adda, I want to order for home delivery.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl bg-black min-h-[360px] relative flex items-center justify-center">
            <iframe
              title="Food Adda delivery area map, Palam, New Delhi"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.235552399583!2d77.078216!3d28.590514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b32d2077e69%3A0xc0d71dc9e4ea0ef!2sPalam%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
