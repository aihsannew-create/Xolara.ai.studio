/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { ArrowLeft, MessageCircle, ShoppingBag, Check, ShieldCheck, Ruler, Truck, X } from 'lucide-react';
import { generateProductWhatsAppUrl, WHATSAPP_DISPLAY } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [customerNote, setCustomerNote] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'Standard');
      setCustomerNote('');
      setAddedToast(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const whatsappUrl = generateProductWhatsAppUrl(product, selectedSize, customerNote);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent Top Header Bar with Explicit Back Button */}
        <div className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 bg-zinc-900/95 border-b border-zinc-800/90 flex items-center justify-between backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 hover:text-white font-semibold text-xs sm:text-sm border border-zinc-700 hover:border-amber-400 transition cursor-pointer shadow-md"
            aria-label="Back to Products"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>← Back / Piche Jayein</span>
          </button>

          <div className="text-xs text-zinc-400 hidden sm:block">
            {product.category} · XOLARA Haute Couture
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Gallery Left */}
          <div className="relative min-h-[380px] md:min-h-[520px] bg-black">
            <ProductVisual product={product} className="h-full" />
          </div>

          {/* Details & Purchase Module Right */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Availability */}
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="font-bold text-amber-400 uppercase tracking-widest text-[11px]">
                  {product.category}
                </span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>{product.color}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-emerald-400 font-semibold">
                  {product.inStock ? 'Ready for WhatsApp Dispatch' : 'Made to Order'}
                </span>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-cinzel">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-2.5">
                  <span className="text-3xl font-extrabold text-amber-300 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through tabular-nums">
                      MRP: ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-800/40 px-2 py-0.5 rounded">
                      SAVE ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications Box */}
              <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Fabric & Weave:</span>
                  <span className="text-white font-medium">{product.fabric}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Color Palette:</span>
                  <span className="text-white font-medium">{product.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Dispatch Time:</span>
                  <span className="text-emerald-400 font-medium">Ships in 24 Hours</span>
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-amber-400" />
                    Select Size / Fit:
                  </span>
                  <span className="text-amber-400/90 text-[11px] font-medium">Custom tailoring supported</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md shadow-amber-400/20'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom WhatsApp Note Input */}
              <div className="space-y-1">
                <label className="text-xs text-zinc-400 block font-medium">
                  Custom Stitching Measurement or Note for WhatsApp:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kurti length 44 inch, Chest 38, or urgent delivery"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/60"
                />
              </div>
            </div>

            {/* CTAs: WhatsApp, Add to Bag, and Back Button */}
            <div className="space-y-3 pt-2">
              {/* WhatsApp Primary Order CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-xl shadow-emerald-600/30 transition transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Order on WhatsApp ({WHATSAPP_DISPLAY})</span>
              </a>

              {/* Add to Bag and Secondary Back Button */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400/50 text-white font-medium text-xs transition cursor-pointer"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium text-xs transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Back / Piche Jayein</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 pt-2 text-[11px] text-zinc-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  100% Pure Certified Silk
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-purple-400" />
                  Free Express Shipping
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
