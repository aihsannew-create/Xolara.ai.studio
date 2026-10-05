/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShoppingBag, Settings, MessageCircle, Crown } from 'lucide-react';
import { WHATSAPP_DISPLAY, getDirectWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  isAdmin,
  onToggleAdmin,
  onSelectCategory,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark with animated gradient */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse inline-block" />
          <div className="flex flex-col text-left">
            <span className="font-cinzel text-xl sm:text-2xl font-black tracking-widest animate-brand-text leading-tight">
              XOLARA
            </span>
            <span className="text-[10px] text-amber-300/80 font-mono tracking-wider font-semibold -mt-0.5">
              Owner: AIHSAN
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links with hyperlink smooth glow animation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={() => {
              onSelectCategory('All');
              document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover-link-glow hover:text-white cursor-pointer transition-colors"
          >
            All Creations
          </button>
          <button
            onClick={() => {
              onSelectCategory('Saree');
              document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover-link-glow hover:text-white cursor-pointer transition-colors"
          >
            Sarees
          </button>
          <button
            onClick={() => {
              onSelectCategory('Lehenga');
              document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover-link-glow hover:text-white cursor-pointer transition-colors"
          >
            Lehengas
          </button>
          <button
            onClick={() => {
              onSelectCategory('Suit');
              document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover-link-glow hover:text-white cursor-pointer transition-colors"
          >
            Suits & Sets
          </button>
          <a
            href="#story"
            className="hover-link-glow hover:text-white cursor-pointer transition-colors"
          >
            The Atelier
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Direct WhatsApp Callout */}
          <a
            href={getDirectWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            title={`WhatsApp: ${WHATSAPP_DISPLAY}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order: {WHATSAPP_DISPLAY}</span>
          </a>

          {/* Cart Bag Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-amber-400/40 transition cursor-pointer"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white text-[11px] font-bold flex items-center justify-center shadow-lg shadow-rose-600/50">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Panel Toggle */}
          <button
            onClick={onToggleAdmin}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 ${
              isAdmin
                ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold shadow-md shadow-amber-400/30'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
            title="Manage products, edit & delete inventory"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isAdmin ? 'Exit Admin' : 'Admin Panel'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
