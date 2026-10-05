/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const HaveliHeroIntro: React.FC = () => {
  const { scrollY } = useScroll();

  // Intro text fades out and glides up smoothly as user starts scrolling to walk inside
  const textOpacity = useTransform(scrollY, [0, 240], [1, 0]);
  const textY = useTransform(scrollY, [0, 240], ['0px', '-45px']);

  return (
    <div className="relative w-full min-h-[55vh] flex flex-col items-center justify-center text-center px-4 pt-10 pb-4">
      {/* Exterior Welcome Banner (Visible at Top) */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="space-y-4 max-w-xl bg-black/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-amber-400/30 shadow-[0_0_50px_rgba(245,158,11,0.2)] select-none"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/80 border border-amber-500/40 text-xs font-bold text-amber-300">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
          <span>MODERN LUXURY BLACK MANSION</span>
        </div>

        <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
          Scroll kijiye aur modern luxury mansion ke darwaze kholkar andar aaiye —
          jahan room ke andar side-scroll hokar aate hain handcrafted suits, pure sarees aur bridal lehengas.
        </p>

        <div className="pt-2 flex flex-col items-center gap-2 text-xs font-bold text-amber-400 animate-bounce">
          <span>Scroll Down to Walk Inside</span>
          <ChevronDown className="w-5 h-5 text-amber-400" />
        </div>
      </motion.div>
    </div>
  );
};
