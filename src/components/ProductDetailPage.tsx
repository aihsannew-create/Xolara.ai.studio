/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { ProductCard } from './ProductCard';
import {
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
  Check,
  ShieldCheck,
  Ruler,
  Truck,
  PhoneCall,
  Crown,
} from 'lucide-react';
import { generateProductWhatsAppUrl, WHATSAPP_DISPLAY, getDirectWhatsAppUrl } from '../utils/whatsapp';
import { motion } from 'motion/react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onSelectOtherProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onBack,
  onSelectOtherProduct,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || 'Standard'
  );
  const [customerNote, setCustomerNote] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  // Filter other products ("niche baki product")
  const otherProducts = allProducts.filter((p) => p.id !== product.id);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const whatsappUrl = generateProductWhatsAppUrl(product, selectedSize, customerNote);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#08080c] text-zinc-100 flex flex-col font-sans"
    >
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 hover:text-white font-semibold text-xs sm:text-sm border border-zinc-700 hover:border-amber-400 transition cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>← Back to Collection / Piche Jayein</span>
        </motion.button>

        <div className="text-xs text-zinc-400 hidden md:flex items-center gap-2">
          <span>LIVE XOLARA</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-zinc-200 font-medium truncate max-w-xs">{product.name}</span>
        </div>

        <a
          href={getDirectWhatsAppUrl(`Namaste XOLARA! I'm looking at ${product.name} (₹${product.price}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold hover:bg-emerald-500/20 transition cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Help on WhatsApp:</span>
          <span>{WHATSAPP_DISPLAY}</span>
        </a>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-16">
        {/* MAIN BUY SECTION (Upar Buy Section - Full Animated Presentation) */}
        <section className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient Corner Aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-900/20 via-rose-600/15 to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Left Column: Full Uncut Image Showcase with Entrance Motion */}
            <motion.div
              initial={{ opacity: 0, x: -35, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-transparent min-h-[420px] sm:min-h-[580px]">
                <ProductVisual product={product} fitContain={true} className="h-full min-h-[420px] sm:min-h-[580px]" />
              </div>

              {/* Quality & Authenticity Guarantee */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <Crown className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-zinc-300 font-medium block">Pure Handloom</span>
                  <span className="text-[10px] text-zinc-500">Certified Silk</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <Ruler className="w-4 h-4 text-rose-400 mx-auto mb-1" />
                  <span className="text-zinc-300 font-medium block">Custom Fit</span>
                  <span className="text-[10px] text-zinc-500">Bespoke Tailoring</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <Truck className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="text-zinc-300 font-medium block">Safe Dispatch</span>
                  <span className="text-[10px] text-zinc-500">Pan-India Express</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Cascading Staggered Buy & Customization Box */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Category & Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="font-bold text-amber-400 uppercase tracking-widest text-xs px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/20">
                    {product.category}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-300">{product.fabric}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {product.inStock ? 'Ready in Atelier' : 'Custom Weaving'}
                  </span>
                </motion.div>

                {/* Animated Product Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.45 }}
                  className="text-3xl sm:text-4xl font-bold text-white font-cinzel tracking-tight leading-tight"
                >
                  {product.name}
                </motion.h1>

                {/* Pricing Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-wrap items-baseline gap-4 shadow-inner"
                >
                  <span className="text-4xl font-extrabold text-amber-300 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-zinc-500 line-through tabular-nums">
                      MRP: ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-bold text-rose-300 bg-rose-950/80 border border-rose-800/50 px-2.5 py-1 rounded-full">
                      SAVE ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} OFF
                    </span>
                  )}
                  <div className="w-full text-xs text-emerald-400 font-medium pt-1">
                    ✓ Includes All Taxes & Pan-India Free Insured Shipping
                  </div>
                </motion.div>

                {/* Product Story & Description */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32, duration: 0.4 }}
                  className="space-y-2"
                >
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Garment Description & Craftsmanship
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {product.description}
                  </p>
                </motion.div>

                {/* Specifications Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.38, duration: 0.4 }}
                  className="grid grid-cols-2 gap-3 text-xs"
                >
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <span className="text-zinc-400 block text-[11px]">Primary Fabric:</span>
                    <span className="text-white font-semibold">{product.fabric}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                    <span className="text-zinc-400 block text-[11px]">Color Palette:</span>
                    <span className="text-white font-semibold">{product.color}</span>
                  </div>
                </motion.div>

                {/* Size Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44, duration: 0.4 }}
                  className="space-y-2 pt-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-amber-400" />
                      Choose Your Size:
                    </span>
                    <span className="text-amber-400/90 text-xs font-medium">
                      Need custom size? Type below!
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-lg shadow-amber-400/20 scale-105'
                            : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Custom Measurement Note for WhatsApp */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="space-y-1.5 pt-1"
                >
                  <label className="text-xs font-semibold text-zinc-300 block">
                    Custom Stitching Measurements / Delivery Notes for WhatsApp:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chest 36 inch, Waist 30, Kurti Length 44 inch, urgently needed by 20th"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    className="w-full text-xs px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </motion.div>
              </div>

              {/* PRIMARY ACTION BUTTONS (Smooth entrance) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="space-y-3.5 pt-6 border-t border-zinc-800"
              >
                {/* 1. ORDER ON WHATSAPP */}
                <motion.a
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-base shadow-xl shadow-emerald-600/30 transition cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order on WhatsApp: {WHATSAPP_DISPLAY}</span>
                </motion.a>

                {/* 2. ADD TO BAG & BACK BUTTON ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
                  >
                    {addedToast ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Your Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <span>Add to Shopping Bag</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={onBack}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4 text-amber-400" />
                    <span>Back to Collection</span>
                  </motion.button>
                </div>

                {/* WhatsApp Direct Assistance Guarantee */}
                <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex items-center gap-3 text-xs text-zinc-400">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    Have questions about drape or sizing? Call / Chat with Master Stylist at{' '}
                    <strong className="text-white font-semibold">{WHATSAPP_DISPLAY}</strong>.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BOTTOM SECTION: "NICHE BAKI PRODUCT" (Scroll Animated Text & Cards) */}
        <section className="space-y-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-zinc-800"
          >
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                More From The Atelier
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
                Baki Products (Related Suits, Sarees & Lehengas)
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View Full Catalog</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {otherProducts.map((other, idx) => (
              <ProductCard
                key={other.id}
                product={other}
                index={idx}
                onQuickView={(p) => {
                  onSelectOtherProduct(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAddToCart={(p, size) => onAddToCart(p, size)}
              />
            ))}
          </div>
        </section>
      </main>
    </motion.div>
  );
};
