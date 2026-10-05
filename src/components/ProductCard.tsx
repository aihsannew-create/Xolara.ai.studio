/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';
import { MessageCircle, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { generateProductWhatsAppUrl } from '../utils/whatsapp';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  onQuickView,
  onAddToCart,
}) => {
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: (index % 2 === 0 ? -45 : 45), scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-amber-400/70 transition-all duration-300 flex flex-col overflow-hidden shadow-2xl hover:shadow-[0_12px_40px_rgba(245,158,11,0.25)] relative"
    >
      {/* Visual / Image Section */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer bg-transparent"
        onClick={() => onQuickView(product)}
      >
        <ProductVisual product={product} className="h-full" />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-3.5 rounded-full bg-zinc-900/90 text-amber-300 hover:text-white hover:bg-black border border-amber-400/40 shadow-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-4"
          >
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Open & Buy</span>
          </motion.button>
        </div>

        {/* Discount Badge */}
        {discountPercent && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-600/90 text-white border border-rose-500/40 shadow">
              {discountPercent}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Content Section with animated text reveal */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Unboxed Metadata with · separator */}
          <div className="text-xs text-zinc-400 flex items-center gap-2">
            <span className="font-semibold text-amber-400 uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="truncate">{product.fabric}</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-medium text-base text-zinc-100 group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Price Row */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-white tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[11px] text-emerald-400 font-medium ml-auto flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Free Dispatch
            </span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          {/* Order on WhatsApp Button */}
          <a
            href={generateProductWhatsAppUrl(product, product.sizes[0])}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition cursor-pointer"
            title="Order this product directly on WhatsApp: 9905847357"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span className="truncate">WhatsApp</span>
          </a>

          {/* Add to Bag Button */}
          <button
            type="button"
            onClick={() => onAddToCart(product, product.sizes[0] || 'Standard')}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-amber-400/40 text-xs font-medium transition cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">Add to Bag</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
