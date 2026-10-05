/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, CustomerOrder } from '../types';
import { X, Trash2, Plus, Minus, MessageCircle, ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
import { generateCartWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onSaveOrder: (order: CustomerOrder) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSaveOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Please fill in your Name, Phone Number, and Delivery Address to proceed.');
      return;
    }

    setIsSubmitting(true);

    const newOrder: CustomerOrder = {
      id: `XOL-${Date.now().toString().slice(-6)}`,
      customerName: customerName.trim(),
      phone: customerPhone.trim(),
      address: customerAddress.trim(),
      city: customerCity.trim() || 'India',
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        size: i.selectedSize,
        quantity: i.quantity,
        price: i.product.price,
      })),
      totalAmount,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'Received on WhatsApp',
    };

    // Save order in system for admin
    onSaveOrder(newOrder);

    // Format WhatsApp link
    const whatsappUrl = generateCartWhatsAppUrl(
      {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        city: customerCity || 'India',
        notes: customerNotes,
      },
      items,
      totalAmount
    );

    // Clear cart and redirect to WhatsApp
    onClearCart();
    setIsSubmitting(false);
    onClose();

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl relative z-10">
          {/* Header with Explicit Back / Piche Jayein Button */}
          <div className="px-5 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/70">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 hover:text-white font-medium text-xs border border-zinc-700 hover:border-amber-400 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>← Back / Piche Jayein</span>
            </button>

            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-sm text-white">Bag ({totalCount})</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-base font-semibold text-zinc-300">Your bag is empty</div>
                <p className="text-xs text-zinc-500 max-w-xs">
                  Browse our luxury sarees, bridal lehengas, and designer suits.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-amber-300 hover:border-amber-400 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-amber-400" />
                  <span>← Back to Collection (Piche Jayein)</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex gap-3.5 items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-amber-400 font-medium">
                        {item.product.category} · Size: {item.selectedSize}
                      </div>
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-xs font-bold text-zinc-200 mt-1 tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                        className="p-1 hover:text-amber-400 text-zinc-400 transition cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold px-1.5 text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                        className="p-1 hover:text-amber-400 text-zinc-400 transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="p-1.5 text-zinc-500 hover:text-rose-400 transition cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Customer Details Form if cart has items */}
            {items.length > 0 && (
              <form onSubmit={handleWhatsAppCheckout} id="cart-checkout-form" className="mt-6 pt-5 border-t border-zinc-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Delivery & Contact Information
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Your WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Delivery Address & Pincode *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat No, Street, Landmark, Pincode"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">City / State</label>
                  <input
                    type="text"
                    placeholder="e.g. Delhi, Mumbai, Lucknow"
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 block mb-1">Custom Notes / Measurements</label>
                  <input
                    type="text"
                    placeholder="e.g. Need urgent stitching before wedding"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Footer Subtotal & Actions */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-800/80 bg-zinc-950 space-y-3.5">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="tabular-nums font-semibold text-white">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-zinc-800/80">
                  <span>Grand Total:</span>
                  <span className="text-amber-400 tabular-nums text-lg">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit to WhatsApp */}
              <button
                type="submit"
                form="cart-checkout-form"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-emerald-600/30 transition cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Place Order via WhatsApp ({WHATSAPP_DISPLAY})</span>
              </button>

              {/* Clear Back Button at bottom of cart */}
              <button
                type="button"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-medium text-xs transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
                <span>← Back to Products / Piche Jayein</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Direct WhatsApp verified order with shop owner
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
