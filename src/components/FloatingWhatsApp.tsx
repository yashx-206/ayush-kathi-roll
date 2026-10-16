import React from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from './OrderDrawer';

interface FloatingWhatsAppProps {
  itemCount: number;
  totalPrice: number;
  onOpenOrder: () => void;
}

/**
 * Always-visible WhatsApp button (bottom right). With dishes in the order it becomes a
 * "View order" bar; otherwise it opens a WhatsApp chat with the kitchen.
 */
export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ itemCount, totalPrice, onOpenOrder }) => {
  const base =
    'fixed z-40 bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-2xl shadow-black/60 transition-all duration-300 active:scale-95 cursor-pointer';

  if (itemCount > 0) {
    return (
      <button onClick={onOpenOrder} className={`${base} pl-3.5 pr-4 py-3`} aria-label="View your WhatsApp order">
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
          View Order ({itemCount}) · ₹{totalPrice}
        </span>
      </button>
    );
  }

  return (
    <a
      href={whatsappLink('Hi Food Adda, I want to order for home delivery.')}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} p-3.5 sm:pr-5`}
      aria-label="Order on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Order on WhatsApp</span>
    </a>
  );
};
