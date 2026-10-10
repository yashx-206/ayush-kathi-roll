import React, { useState } from 'react';
import { MenuItem, OUTLET_INFO } from '../data/menu';
import { CINEMATIC_IMAGES } from '../assets/images';
import { X, Check, ShoppingBag, MessageCircle, Trash2, Bike } from 'lucide-react';

export interface CartLine {
  item: MenuItem;
  quantity: number;
}

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartLine[];
  onChangeQuantity: (itemId: string, quantity: number) => void;
  onBrowseMenu: () => void;
  onOrderSuccess: (orderSummary: string) => void;
}

/** Builds the wa.me link for a message to the outlet's WhatsApp number */
export const whatsappLink = (message: string) =>
  `https://wa.me/${OUTLET_INFO.whatsapp}?text=${encodeURIComponent(message)}`;

/** Opens WhatsApp in a new tab, or in this tab if the browser blocks new tabs */
export const openWhatsApp = (message: string) => {
  const url = whatsappLink(message);
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url;
};

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onChangeQuantity,
  onBrowseMenu,
  onOrderSuccess,
}) => {
  const [spiceLevel, setSpiceLevel] = useState<'Mild' | 'Signature Tawa' | 'Fiery Mirch'>('Signature Tawa');
  const [parathaCrispness, setParathaCrispness] = useState<'Extra Flaky Crisp' | 'Soft Layered'>('Extra Flaky Crisp');
  const [customerName, setCustomerName] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const totalPrice = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0);
  const addressMissing = deliveryAddress.trim().length < 8;
  // Spice and paratha choices only matter when the order has food, not just drinks
  const hasFood = cart.some((line) => line.item.category !== 'Cold Drinks & Beverages');

  const handleConfirmWhatsApp = () => {
    if (cart.length === 0) return;
    if (addressMissing) {
      setShowErrors(true);
      return;
    }

    const lines = cart
      .map((line, i) => `${i + 1}. ${line.quantity} x ${line.item.name} - ₹${line.item.price * line.quantity}`)
      .join('\n');
    const message =
      `*NEW DELIVERY ORDER - AYUSH KATHI ROLL*\n\n` +
      `${lines}\n\n` +
      `*Total: ₹${totalPrice}* (${itemCount} item${itemCount > 1 ? 's' : ''})\n\n` +
      (hasFood ? `Spice level: ${spiceLevel}\nParatha: ${parathaCrispness}\n` : '') +
      (customerName.trim() ? `Name: ${customerName.trim()}\n` : '') +
      `Delivery address: ${deliveryAddress.trim()}\n` +
      (note.trim() ? `Note: ${note.trim()}\n` : '') +
      `\nPlease confirm my order. Thank you!`;

    openWhatsApp(message);
    setOrderComplete(true);

    setTimeout(() => {
      onOrderSuccess(`${itemCount} item${itemCount > 1 ? 's' : ''} · ₹${totalPrice}`);
      setOrderComplete(false);
      setShowErrors(false);
      setNote('');
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Your WhatsApp order">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#09090d] border-l border-amber-900/40 text-stone-200 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif-cinematic text-lg font-bold text-white uppercase tracking-wider">
                Your WhatsApp Order
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close order"
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Delivery-only notice */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 text-xs text-emerald-200">
              <Bike className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Home delivery only. Your order goes straight to our kitchen on WhatsApp ({OUTLET_INFO.phone}).
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-col items-center text-center gap-4 py-8">
                <img
                  loading="lazy"
                  decoding="async"
                  src={CINEMATIC_IMAGES.macroTexture}
                  alt="Freshly made kathi roll"
                  className="w-20 h-20 rounded-xl object-cover border border-amber-500/30"
                />
                <p className="text-sm text-stone-300">Your order is empty. Add dishes from the menu to start.</p>
                <button
                  onClick={onBrowseMenu}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Browse the Menu
                </button>
              </div>
            ) : (
              <>
                {/* Order items */}
                <div className="space-y-2.5">
                  {cart.map((line) => (
                    <div
                      key={line.item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-black/60 border border-stone-800"
                    >
                      <div className="min-w-0">
                        <div className="font-serif-cinematic text-sm font-bold text-white leading-snug">
                          {line.item.name}
                        </div>
                        <div className="text-[11px] text-amber-400 font-semibold mt-0.5">
                          ₹{line.item.price} each · ₹{line.item.price * line.quantity}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          aria-label={line.quantity === 1 ? `Remove ${line.item.name}` : `One less ${line.item.name}`}
                          onClick={() => onChangeQuantity(line.item.id, line.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-stone-800 bg-black hover:border-stone-700 flex items-center justify-center text-base font-bold text-stone-300 cursor-pointer"
                        >
                          {line.quantity === 1 ? <Trash2 className="w-3.5 h-3.5" /> : '-'}
                        </button>
                        <span className="font-serif-cinematic text-base font-bold text-white w-6 text-center">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`One more ${line.item.name}`}
                          onClick={() => onChangeQuantity(line.item.id, line.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-stone-800 bg-black hover:border-stone-700 flex items-center justify-center text-base font-bold text-stone-300 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={onBrowseMenu}
                    className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                  >
                    + Add more dishes
                  </button>
                </div>

                {hasFood && (
                <>
                {/* Spice Level */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                    Spice Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Mild', 'Signature Tawa', 'Fiery Mirch'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setSpiceLevel(lvl)}
                        className={`py-2 px-2 text-center rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                          spiceLevel === lvl
                            ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                            : 'border-stone-800 bg-black/50 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paratha Crispness */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2.5">
                    Paratha (for rolls)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Extra Flaky Crisp', 'Soft Layered'] as const).map((bite) => (
                      <button
                        key={bite}
                        type="button"
                        onClick={() => setParathaCrispness(bite)}
                        className={`py-2 px-3 text-center rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                          parathaCrispness === bite
                            ? 'border-amber-400 bg-amber-500/20 text-white font-bold'
                            : 'border-stone-800 bg-black/50 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                        }`}
                      >
                        {bite}
                      </button>
                    ))}
                  </div>
                </div>

                </>
                )}

                {/* Customer details */}
                <div className="space-y-3">
                  <div>
                    <label htmlFor="order-name" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="order-name"
                      type="text"
                      autoComplete="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rahul"
                      className="w-full px-3 py-2.5 rounded-lg bg-black border border-stone-800 focus:border-amber-400 text-sm text-white focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label htmlFor="order-address" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Delivery Address <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      id="order-address"
                      rows={2}
                      autoComplete="street-address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="House no., street, area and landmark"
                      className={`w-full px-3 py-2.5 rounded-lg bg-black border text-sm text-white focus:outline-hidden resize-none ${
                        showErrors && addressMissing ? 'border-red-500' : 'border-stone-800 focus:border-amber-400'
                      }`}
                    />
                    {showErrors && addressMissing && (
                      <p className="mt-1 text-[11px] text-red-400">Please enter your full delivery address.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="order-note" className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                      Note for the Kitchen
                    </label>
                    <input
                      id="order-note"
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="e.g. No onion, extra chutney"
                      className="w-full px-3 py-2.5 rounded-lg bg-black border border-stone-800 focus:border-amber-400 text-sm text-white focus:outline-hidden"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer & Order Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-black/80 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400">Total Price:</span>
                  <div className="text-[11px] text-stone-500">
                    {itemCount} item{itemCount > 1 ? 's' : ''} · delivery charges, if any, confirmed on WhatsApp
                  </div>
                </div>
                <div className="font-serif-cinematic text-3xl font-black text-amber-400">
                  ₹{totalPrice}
                </div>
              </div>

              <button
                onClick={handleConfirmWhatsApp}
                disabled={orderComplete}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-emerald-950/60 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                {orderComplete ? (
                  <>
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                    <span>Opening WhatsApp…</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>Send Order on WhatsApp · ₹{totalPrice}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
