/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Crown } from 'lucide-react';

export const RealHaveliExperience: React.FC = () => {
  const [extError, setExtError] = useState(false);
  const [intError, setIntError] = useState(false);

  // Track window scroll progress for smooth transition from exterior to interior
  const { scrollY } = useScroll();

  // Scroll mapping:
  // 0px to 500px: We zoom into the real palace exterior facade
  // 150px to 450px: The grand carved palace doors swing open
  // 250px to 600px: The exterior fades out and we are fully inside the real luxury palace interior
  const exteriorScale = useTransform(scrollY, [0, 500], [1, 2.4]);
  const exteriorOpacity = useTransform(scrollY, [0, 300, 550], [1, 0.9, 0]);

  // Doors opening outward in 3D perspective
  const doorRotateLeft = useTransform(scrollY, [120, 420], [0, -85]);
  const doorRotateRight = useTransform(scrollY, [120, 420], [0, 85]);

  // Interior palace subtle parallax as user browses through products
  const interiorScale = useTransform(scrollY, [0, 600, 2000], [0.95, 1, 1.08]);
  const interiorY = useTransform(scrollY, [0, 2000], ['0%', '-5%']);

  // Real, photorealistic architectural photography of a royal Indian heritage palace
  const exteriorPhoto = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85';
  // Real, photorealistic interior of an opulent royal mansion hall with grand chandeliers
  const interiorPhoto = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85';

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none">
      {/* ============================================================== */}
      {/* 1. REAL PALACE INTERIOR (Continuous Background Behind All Products) */}
      {/* ============================================================== */}
      <motion.div
        style={{
          scale: interiorScale,
          y: interiorY,
        }}
        className="absolute inset-0 w-full h-full"
      >
        {!intError ? (
          <img
            src={interiorPhoto}
            alt="Royal Palace Interior"
            referrerPolicy="no-referrer"
            onError={() => setIntError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#160724] via-[#0d0417] to-[#05020a]" />
        )}

        {/* Ambient Royal Color Grading (Black - Amber Yellow - Ruby Red - Royal Purple) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-purple-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.18),rgba(225,29,72,0.12),rgba(147,51,234,0.15),transparent_70%)]" />

        {/* Warm Palace Chandelier Glow in Center */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-400/15 blur-[90px] rounded-full" />
      </motion.div>

      {/* ============================================================== */}
      {/* 2. REAL PALACE EXTERIOR & 3D DOORS (Zoom in & Open as you scroll) */}
      {/* ============================================================== */}
      <motion.div
        style={{
          scale: exteriorScale,
          opacity: exteriorOpacity,
        }}
        className="absolute inset-0 w-full h-full"
      >
        {!extError ? (
          <img
            src={exteriorPhoto}
            alt="Royal Palace Facade"
            referrerPolicy="no-referrer"
            onError={() => setExtError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.1]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#240c33] via-[#14061e] to-[#07020b]" />
        )}

        {/* Real Royal Palace Vignette & Warm Twilight Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

        {/* 3D Real Carved Palace Gateway Doors (Center of Exterior) */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-[40%] w-[320px] sm:w-[440px] h-[340px] sm:h-[460px] flex overflow-hidden perspective-[1200px]">
          {/* Left Door */}
          <motion.div
            style={{
              rotateY: doorRotateLeft,
              transformOrigin: 'left center',
            }}
            className="w-1/2 h-full bg-gradient-to-r from-[#2a1306] via-[#1a0a03] to-[#120702] border-2 border-amber-400/90 shadow-[0_0_30px_rgba(0,0,0,0.9)] relative flex flex-col justify-around p-3"
          >
            {/* Real Carved Wooden Door Panels */}
            <div className="w-full h-1/3 border-2 border-amber-500/40 rounded-xl bg-black/60 flex items-center justify-center shadow-inner">
              <Crown className="w-6 h-6 text-amber-400/80" />
            </div>
            <div className="w-full h-1/3 border-2 border-amber-500/40 rounded-xl bg-black/60 flex items-center justify-center shadow-inner">
              <div className="w-9 h-9 rounded-full border border-amber-400/60 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
              </div>
            </div>
            {/* Brass Heavy Handle */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-14 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg border border-amber-200/50" />
          </motion.div>

          {/* Right Door */}
          <motion.div
            style={{
              rotateY: doorRotateRight,
              transformOrigin: 'right center',
            }}
            className="w-1/2 h-full bg-gradient-to-l from-[#2a1306] via-[#1a0a03] to-[#120702] border-2 border-amber-400/90 shadow-[0_0_30px_rgba(0,0,0,0.9)] relative flex flex-col justify-around p-3"
          >
            {/* Real Carved Wooden Door Panels */}
            <div className="w-full h-1/3 border-2 border-amber-500/40 rounded-xl bg-black/60 flex items-center justify-center shadow-inner">
              <Crown className="w-6 h-6 text-amber-400/80" />
            </div>
            <div className="w-full h-1/3 border-2 border-amber-500/40 rounded-xl bg-black/60 flex items-center justify-center shadow-inner">
              <div className="w-9 h-9 rounded-full border border-amber-400/60 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-amber-400" />
              </div>
            </div>
            {/* Brass Heavy Handle */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-14 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 shadow-lg border border-amber-200/50" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
