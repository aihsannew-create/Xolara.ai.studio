/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onSearchSubmit: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onSearchSubmit,
}) => {
  const [localInput, setLocalInput] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localInput);
    onSearchSubmit(localInput);
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories: ProductCategory[] = ['All', 'Suit', 'Saree', 'Lehenga', 'Gown'];

  return (
    <section className="relative overflow-hidden bg-transparent text-white pt-6 pb-6 border-b border-white/10">
      {/* Dynamic Black-Yellow-Red-Purple Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-purple-900/35 via-rose-700/25 to-amber-500/25 blur-[100px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        {/* XOLARA Brand & Owner Credit */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs font-bold text-amber-400 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
            <span className="tracking-widest uppercase">EXCLUSIVE COLLECTION 2026</span>
          </div>

          <h1 className="font-cinzel text-5xl sm:text-7xl font-black tracking-widest uppercase">
            <span className="animate-brand-text drop-shadow-[0_4px_30px_rgba(245,158,11,0.35)]">
              XOLARA
            </span>
          </h1>

          <div className="text-xs sm:text-sm font-semibold tracking-widest text-amber-300 uppercase font-mono pt-1">
            Owner: AIHSAN
          </div>
        </div>

        {/* PROMINENT SEARCH BAR & BUTTON */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative flex items-center bg-black/50 backdrop-blur-xl border-2 border-white/15 focus-within:border-amber-400/80 rounded-2xl p-1.5 shadow-2xl transition">
            <Search className="w-5 h-5 text-amber-400 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search suits, sarees, lehengas, silk, velvet..."
              value={localInput}
              onChange={(e) => {
                setLocalInput(e.target.value);
                onSearchChange(e.target.value);
              }}
              className="w-full bg-transparent px-3 py-3 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 sm:px-7 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* Quick Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-xl border transition cursor-pointer backdrop-blur-md ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-zinc-950 border-amber-300 font-bold shadow-lg shadow-amber-400/20'
                  : 'bg-black/40 text-zinc-300 border-white/10 hover:border-amber-400/50 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Creations' : `${cat}s`}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
