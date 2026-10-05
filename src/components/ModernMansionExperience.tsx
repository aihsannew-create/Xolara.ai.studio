/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Crown } from 'lucide-react';

export const ModernMansionExperience: React.FC = () => {
  const [extError, setExtError] = useState(false);
  const [intError, setIntError] = useState(false);

  // Track window scroll progress
  const { scrollY } = useScroll();

  // Scroll transforms:
  // 0px to 550px: Camera zooms smoothly towards the illuminated front entrance of the modern black villa
  const cameraScale = useTransform(scrollY, [0, 520], [1, 2.5]);
  const cameraY = useTransform(scrollY, [0, 520], ['0%', '12%']);
  const exteriorOpacity = useTransform(scrollY, [0, 320, 520], [1, 0.9, 0]);

  // Modern entrance double doors slide open smoothly to left and right
  const doorSlideLeft = useTransform(scrollY, [150, 440], ['0%', '-110%']);
  const doorSlideRight = useTransform(scrollY, [150, 440], ['0%', '110%']);

  // Interior villa parallax: as user scrolls down through the products, the interior moves gently
  const interiorScale = useTransform(scrollY, [0, 500, 2000], [0.94, 1, 1.08]);
  const interiorY = useTransform(scrollY, [0, 2000], ['0%', '-6%']);

  // Ultra-luxury modern architectural black villa matching the user's photo
  const exteriorPhoto = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85';
  // Ultra-luxury modern villa interior with floor-to-ceiling glass, warm amber lights, and marble
  const interiorPhoto = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85';

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden select-none">
      {/* ============================================================== */}
      {/* 1. MODERN VILLA INTERIOR (Continuous Real Background Inside)   */}
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
            alt="Modern Luxury Villa Interior"
            referrerPolicy="no-referrer"
            onError={() => setIntError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.42] contrast-[1.15]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#14081e] via-[#090310] to-[#040108]" />
        )}

        {/* Ambient Dark Luxury Grading (Matte Black, Amber Gold, Ruby Red, Purple Glow) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.22),rgba(225,29,72,0.14),rgba(147,51,234,0.18),transparent_70%)]" />

        {/* Warm Golden Glow from Ceiling Lights */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-400/15 blur-[100px] rounded-full pointer-events-none" />
      </motion.div>

      {/* ============================================================== */}
      {/* 2. MODERN BLACK VILLA EXTERIOR (Matching User's Photo)         */}
      {/* ============================================================== */}
      <motion.div
        style={{
          scale: cameraScale,
          y: cameraY,
          opacity: exteriorOpacity,
        }}
        className="absolute inset-0 w-full h-full"
      >
        {!extError ? (
          <img
            src={exteriorPhoto}
            alt="Modern Black Luxury Mansion"
            referrerPolicy="no-referrer"
            onError={() => setExtError(true)}
            className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.12]"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#1e0a29] via-[#0f0417] to-[#05010a]" />
        )}

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

        {/* ============================================================== */}
        {/* 3. SLIDING MODERN ENTRANCE DOORS (At the Front Steps)          */}
        {/* ============================================================== */}
        <div className="absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-[45%] w-[300px] sm:w-[400px] h-[320px] sm:h-[420px] flex overflow-hidden rounded-2xl border-2 border-amber-400/60 shadow-[0_0_50px_rgba(0,0,0,0.9)] bg-black/40 backdrop-blur-sm">
          {/* Left Sliding Glass & Matte-Black Door */}
          <motion.div
            style={{ x: doorSlideLeft }}
            className="w-1/2 h-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-black/80 border-r border-amber-400/50 flex flex-col justify-between p-4 relative shadow-2xl"
          >
            <div className="w-full h-1/4 border border-amber-400/30 rounded-xl bg-black/50 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400/80" />
            </div>
            {/* Illuminated Amber Vertical Handle */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-28 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
            <div className="text-[10px] tracking-widest text-amber-300/80 font-mono">XOLARA</div>
          </motion.div>

          {/* Right Sliding Glass & Matte-Black Door */}
          <motion.div
            style={{ x: doorSlideRight }}
            className="w-1/2 h-full bg-gradient-to-l from-zinc-950 via-zinc-900 to-black/80 border-l border-amber-400/50 flex flex-col justify-between p-4 relative shadow-2xl"
          >
            <div className="w-full h-1/4 border border-amber-400/30 rounded-xl bg-black/50 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-400/80" />
            </div>
            {/* Illuminated Amber Vertical Handle */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-28 rounded-full bg-gradient-to-b from-amber-300 via-amber-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
            <div className="text-[10px] tracking-widest text-amber-300/80 font-mono text-right">ATELIER</div>
          </motion.div>
        </div>

        {/* Illuminated Steps Below Entrance (Matching the User's Image) */}
        <div className="absolute top-[82%] left-1/2 -translate-x-1/2 w-48 sm:w-64 space-y-1.5 opacity-90">
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.8)] rounded-full" />
          <div className="h-1.5 w-4/5 mx-auto bg-gradient-to-r from-transparent via-amber-400/80 to-transparent shadow-[0_0_10px_rgba(245,158,11,0.6)] rounded-full" />
          <div className="h-1.5 w-3/5 mx-auto bg-gradient-to-r from-transparent via-amber-400/60 to-transparent shadow-[0_0_8px_rgba(245,158,11,0.4)] rounded-full" />
        </div>
      </motion.div>
    </div>
  );
};
