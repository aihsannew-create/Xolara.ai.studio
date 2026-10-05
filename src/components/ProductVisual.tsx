/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, Crown } from 'lucide-react';

interface ProductVisualProps {
  product: Product;
  className?: string;
  showBadge?: boolean;
  fitContain?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  className = '',
  showBadge = true,
  fitContain = false,
}) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Category specific jewel tones & embroidery motif styles
  const getTheme = () => {
    switch (product.category) {
      case 'Lehenga':
        return {
          bg: 'from-black/30 via-rose-950/30 to-purple-950/40 backdrop-blur-md',
          accent: '#e11d48',
          label: 'Regal Bridal Kalidar',
        };
      case 'Saree':
        return {
          bg: 'from-black/30 via-purple-950/30 to-amber-950/30 backdrop-blur-md',
          accent: '#c084fc',
          label: 'Handloom Pure Silk',
        };
      case 'Suit':
        return {
          bg: 'from-black/30 via-amber-950/25 to-rose-950/30 backdrop-blur-md',
          accent: '#f59e0b',
          label: 'Couture Sharara & Anarkali',
        };
      default:
        return {
          bg: 'from-black/30 via-zinc-900/30 to-purple-950/35 backdrop-blur-md',
          accent: '#f43f5e',
          label: 'Indo-Western Couture',
        };
    }
  };

  const theme = getTheme();

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-b ${theme.bg} flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Decorative Gold & Jewel Borders */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 z-20" />
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-amber-400 z-20" />

      {/* Actual Product Photo */}
      {product.image && !imgError ? (
        <div className="relative w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full transition-transform duration-700 ${
              fitContain ? 'object-contain bg-black/90' : 'object-cover object-top group-hover:scale-105'
            } ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Subtle Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        </div>
      ) : null}

      {/* Styled Haute Couture Artwork Fallback (shown if no image or while loading or on error) */}
      {(!product.image || imgError || !imgLoaded) && (
        <div
          className={`${
            product.image && !imgError && !imgLoaded ? 'absolute inset-0' : 'relative'
          } w-full h-full flex flex-col items-center justify-center text-center p-6`}
        >
          {/* Ambient Lighting Aura */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.3),rgba(225,29,72,0.25),rgba(147,51,234,0.35),transparent_70%)] pointer-events-none" />

          {/* Royal Seal */}
          <div className="w-14 h-14 rounded-full border border-amber-400/40 bg-black/60 backdrop-blur-md flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)] relative z-10">
            <Crown className="w-7 h-7 text-amber-400" />
          </div>

          {/* Silhouette Vector */}
          <div className="relative my-2 w-32 h-44 flex items-center justify-center z-10">
            {product.category === 'Saree' && (
              <svg viewBox="0 0 100 140" className="w-full h-full text-amber-300 drop-shadow-[0_4px_12px_rgba(192,132,252,0.4)]" fill="none">
                <path d="M20,10 C40,5 60,5 80,10 C85,35 75,70 85,130 C55,135 45,135 15,130 C25,70 15,35 20,10 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" />
                <path d="M30,12 Q65,45 80,120" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3 3" />
                <path d="M25,25 Q55,55 75,125" stroke="#e11d48" strokeWidth="1.5" />
                <circle cx="50" cy="70" r="18" stroke="#c084fc" strokeWidth="1" strokeDasharray="2 2" />
              </svg>
            )}

            {product.category === 'Lehenga' && (
              <svg viewBox="0 0 100 140" className="w-full h-full text-rose-400 drop-shadow-[0_4px_12px_rgba(245,158,11,0.4)]" fill="none">
                <path d="M35,15 L65,15 L62,38 L38,38 Z" fill="#fbbf24" fillOpacity="0.3" stroke="#fbbf24" strokeWidth="1.5" />
                <path d="M32,15 Q20,60 10,125" stroke="#c084fc" strokeWidth="1.8" />
                <path d="M36,44 L64,44 L92,130 C65,136 35,136 8,130 Z" fill="#e11d48" fillOpacity="0.25" stroke="#f43f5e" strokeWidth="1.5" />
                <path d="M12,122 C37,128 63,128 88,122 L91,129 C65,136 35,136 9,129 Z" fill="#f59e0b" fillOpacity="0.8" />
              </svg>
            )}

            {product.category === 'Suit' && (
              <svg viewBox="0 0 100 140" className="w-full h-full text-purple-300 drop-shadow-[0_4px_12px_rgba(225,29,72,0.4)]" fill="none">
                <path d="M32,15 L68,15 L64,88 L36,88 Z" fill="#9333ea" fillOpacity="0.3" stroke="#c084fc" strokeWidth="1.5" />
                <path d="M50,15 L50,45" stroke="#fbbf24" strokeWidth="1.5" />
                <path d="M36,89 L24,132 L46,132 L49,89 Z" fill="#f59e0b" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="1.2" />
                <path d="M51,89 L54,132 L76,132 L64,89 Z" fill="#f59e0b" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="1.2" />
                <path d="M26,18 Q12,70 18,125" stroke="#f43f5e" strokeWidth="1.8" />
              </svg>
            )}

            {product.category === 'Gown' && (
              <svg viewBox="0 0 100 140" className="w-full h-full text-amber-300" fill="none">
                <path d="M38,15 L62,15 L60,50 L88,132 C60,136 40,136 12,132 L40,50 Z" fill="#7c3aed" fillOpacity="0.25" stroke="#fbbf24" strokeWidth="1.5" />
                <path d="M38,50 Q50,75 62,50" stroke="#e11d48" strokeWidth="1.5" />
              </svg>
            )}
          </div>

          <div className="mt-1 space-y-1 z-10">
            <span className="text-[11px] tracking-widest uppercase font-semibold text-amber-300 font-cinzel">
              XOLARA ATELIER
            </span>
            <div className="text-xs text-zinc-300">{theme.label}</div>
          </div>
        </div>
      )}

      {/* Badge Top Left */}
      {showBadge && product.badge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 rounded bg-black/85 backdrop-blur-md text-amber-300 border border-amber-400/30 shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {product.badge}
          </span>
        </div>
      )}

      {/* Out of Stock Overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <span className="px-3.5 py-1.5 rounded-lg bg-rose-950/90 border border-rose-500/50 text-rose-300 text-xs font-semibold tracking-wider uppercase">
            Sold Out / In Weaving
          </span>
        </div>
      )}
    </div>
  );
};
