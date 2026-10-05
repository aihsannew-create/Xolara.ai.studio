/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Crown, Sparkles, ChevronDown, Compass } from 'lucide-react';

export const RoyalAtelierHaveliWalkthrough: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress through the 250vh walkthrough track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 1. Camera Zoom / Forward Movement into the Mansion
  const cameraScale = useTransform(scrollYProgress, [0, 0.45, 0.85], [1, 2.6, 5]);
  const cameraY = useTransform(scrollYProgress, [0, 0.45, 0.85], ['0%', '10%', '20%']);

  // 2. Exterior Facade Opacity (Fades as you enter inside)
  const exteriorOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);

  // 3. Grand Palace Doors Opening (Rotate open left & right)
  const doorRotateLeft = useTransform(scrollYProgress, [0.15, 0.48], [0, -85]);
  const doorRotateRight = useTransform(scrollYProgress, [0.15, 0.48], [0, 85]);

  // 4. Velvet & Zari Curtains Parting
  const curtainLeftX = useTransform(scrollYProgress, [0.2, 0.55], ['0%', '-120%']);
  const curtainRightX = useTransform(scrollYProgress, [0.2, 0.55], ['0%', '120%']);

  // 5. Interior Royal Atelier Hall (Fades and scales in)
  const interiorOpacity = useTransform(scrollYProgress, [0.35, 0.6, 1], [0, 1, 1]);
  const interiorScale = useTransform(scrollYProgress, [0.4, 0.85, 1], [0.8, 1, 1.1]);

  // 6. Welcoming Intro Banner (Fades out quickly as you begin walking)
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], ['0px', '-40px']);

  // 7. Interior Arrival Badge (Appears when fully inside)
  const insideBadgeOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const insideBadgeY = useTransform(scrollYProgress, [0.55, 0.75], ['30px', '0px']);

  return (
    <div ref={containerRef} className="relative w-full h-[220vh] bg-black">
      {/* Sticky 100vh Viewport Stage */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Dynamic Black-Yellow-Red-Purple Ambient Aura */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#1a0826] to-[#08080c] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-900/30 via-rose-700/25 to-amber-500/25 blur-[120px] rounded-full pointer-events-none" />

        {/* ============================================================== */}
        {/* LAYER B: ROYAL ATELIER INTERIOR (Andar ka Royal Salon & Courtyard) */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: interiorOpacity, scale: interiorScale }}
          className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center z-10"
        >
          {/* Detailed Royal Palace Interior Illustration */}
          <svg viewBox="0 0 1440 900" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="interiorWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#180b26" />
                <stop offset="60%" stopColor="#10071a" />
                <stop offset="100%" stopColor="#08080c" />
              </linearGradient>

              <linearGradient id="goldGleam" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>

              <linearGradient id="chandelierGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#e11d48" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              <radialGradient id="chandelierAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
                <stop offset="40%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>

              <linearGradient id="marbleFloor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e102d" />
                <stop offset="40%" stopColor="#140a1e" />
                <stop offset="100%" stopColor="#050508" />
              </linearGradient>
            </defs>

            {/* Vaulted Ceiling with Royal Arches */}
            <rect width="1440" height="900" fill="url(#interiorWall)" />

            {/* Back Wall Royal Jharokha Windows with Night Stars */}
            <path d="M520,380 C520,240 600,180 720,180 C840,180 920,240 920,380 L920,540 L520,540 Z" fill="#2d1245" fillOpacity="0.5" stroke="url(#goldGleam)" strokeWidth="3" />
            <path d="M560,390 C560,280 620,220 720,220 C820,220 880,280 880,390 L880,530 L560,530 Z" fill="#0d0517" />
            {/* Stars & Crescent inside window */}
            <circle cx="700" cy="280" r="1.5" fill="#fef08a" />
            <circle cx="760" cy="310" r="2" fill="#fef08a" />
            <circle cx="650" cy="330" r="1.5" fill="#fef08a" />
            <circle cx="740" cy="260" r="1" fill="#fef08a" />

            {/* Left and Right Grand Carved Palace Pillars */}
            {/* Left Pillar */}
            <path d="M220,120 L300,120 L320,160 L280,180 L280,660 L320,680 L340,740 L180,740 L200,680 L240,660 L240,180 L200,160 Z" fill="#1f0d33" stroke="url(#goldGleam)" strokeWidth="2.5" />
            <line x1="260" y1="180" x2="260" y2="660" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
            {/* Left Archway */}
            <path d="M300,120 C420,130 520,220 520,380" fill="none" stroke="url(#goldGleam)" strokeWidth="4" />

            {/* Right Pillar */}
            <path d="M1220,120 L1140,120 L1120,160 L1160,180 L1160,660 L1120,680 L1100,740 L1260,740 L1240,680 L1200,660 L1200,180 L1240,160 Z" fill="#1f0d33" stroke="url(#goldGleam)" strokeWidth="2.5" />
            <line x1="1180" y1="180" x2="1180" y2="660" stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.4" />
            {/* Right Archway */}
            <path d="M1140,120 C1020,130 920,220 920,380" fill="none" stroke="url(#goldGleam)" strokeWidth="4" />

            {/* Central Ceiling Royal Arch Joining Both Sides */}
            <path d="M220,120 Q720,20 1220,120" fill="none" stroke="url(#goldGleam)" strokeWidth="5" />
            <path d="M300,140 Q720,60 1140,140" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeOpacity="0.7" />

            {/* Polished Marble Floor with Geometric Chevron Reflections */}
            <polygon points="0,680 1440,680 1440,900 0,900" fill="url(#marbleFloor)" />
            <line x1="720" y1="680" x2="720" y2="900" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.3" />
            <line x1="420" y1="680" x2="200" y2="900" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.25" />
            <line x1="1020" y1="680" x2="1240" y2="900" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.25" />

            {/* Grand Crystal Chandelier Glowing in Center */}
            <circle cx="720" cy="220" r="160" fill="url(#chandelierAura)" />
            {/* Chandelier hanging chains */}
            <line x1="720" y1="40" x2="720" y2="170" stroke="url(#goldGleam)" strokeWidth="3" />
            <path d="M660,170 Q720,200 780,170" stroke="url(#goldGleam)" strokeWidth="3.5" fill="none" />
            <path d="M630,200 Q720,240 810,200" stroke="url(#goldGleam)" strokeWidth="3" fill="none" />
            <path d="M600,230 Q720,280 840,230" stroke="url(#goldGleam)" strokeWidth="2.5" fill="none" />
            {/* Hanging crystal drops */}
            <polygon points="720,240 714,260 726,260" fill="#fef08a" />
            <polygon points="670,220 666,238 674,238" fill="#fef08a" />
            <polygon points="770,220 766,238 774,238" fill="#fef08a" />
            <polygon points="630,240 626,255 634,255" fill="#fef08a" />
            <polygon points="810,240 806,255 814,255" fill="#fef08a" />
            <circle cx="720" cy="205" r="8" fill="#fef08a" />
            <circle cx="670" cy="190" r="6" fill="#fef08a" />
            <circle cx="770" cy="190" r="6" fill="#fef08a" />
            <circle cx="630" cy="215" r="5" fill="#fef08a" />
            <circle cx="810" cy="215" r="5" fill="#fef08a" />

            {/* Mannequin / Garment Showcase Stands inside the Hall */}
            {/* Left: Royal Bridal Lehenga Display */}
            <g transform="translate(380, 430)">
              <ellipse cx="50" cy="240" rx="35" ry="10" fill="#f59e0b" fillOpacity="0.4" />
              <rect x="47" y="160" width="6" height="80" fill="url(#goldGleam)" />
              {/* Flared Kalidar silhouette */}
              <path d="M30,70 L70,70 L95,170 C70,180 30,180 5,170 Z" fill="#e11d48" stroke="#fbbf24" strokeWidth="2" />
              {/* Choli */}
              <path d="M35,30 L65,30 L62,65 L38,65 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
              {/* Tassel latkans & dupatta */}
              <path d="M30,30 Q15,90 20,150" stroke="#c084fc" strokeWidth="2.5" fill="none" />
            </g>

            {/* Right: Pure Zari Silk Saree Display */}
            <g transform="translate(960, 430)">
              <ellipse cx="50" cy="240" rx="35" ry="10" fill="#f59e0b" fillOpacity="0.4" />
              <rect x="47" y="160" width="6" height="80" fill="url(#goldGleam)" />
              {/* Saree drape silhouette */}
              <path d="M25,25 C45,15 65,15 75,25 C80,60 70,110 85,170 C55,180 40,180 15,170 C25,110 15,60 25,25 Z" fill="#7c3aed" stroke="#fbbf24" strokeWidth="2" />
              <path d="M35,28 Q65,70 78,160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <path d="M28,40 Q50,90 70,165" stroke="#e11d48" strokeWidth="2" fill="none" />
            </g>

            {/* Wall Torches with warm flames */}
            <g transform="translate(245, 340)">
              <rect x="0" y="0" width="10" height="25" fill="#f59e0b" />
              <ellipse cx="5" cy="-8" rx="8" ry="14" fill="#fbbf24" />
              <ellipse cx="5" cy="-8" rx="4" ry="8" fill="#e11d48" />
            </g>
            <g transform="translate(1185, 340)">
              <rect x="0" y="0" width="10" height="25" fill="#f59e0b" />
              <ellipse cx="5" cy="-8" rx="8" ry="14" fill="#fbbf24" />
              <ellipse cx="5" cy="-8" rx="4" ry="8" fill="#e11d48" />
            </g>
          </svg>

          {/* Golden Ambient Particles Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.22),transparent_70%)]" />
        </motion.div>

        {/* ============================================================== */}
        {/* LAYER A: EXTERIOR HAVELI FACADE & GRAND DOORS (Bahar ka Nazara) */}
        {/* ============================================================== */}
        <motion.div
          style={{
            scale: cameraScale,
            y: cameraY,
            opacity: exteriorOpacity,
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center z-20 pointer-events-none"
        >
          {/* Detailed Exterior Grand Haveli Facade */}
          <svg viewBox="0 0 1440 900" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nightSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#040208" />
                <stop offset="40%" stopColor="#1a062b" />
                <stop offset="80%" stopColor="#3b0730" />
                <stop offset="100%" stopColor="#0a0512" />
              </linearGradient>

              <linearGradient id="haveliStone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c113d" />
                <stop offset="60%" stopColor="#1e0a2b" />
                <stop offset="100%" stopColor="#12051c" />
              </linearGradient>

              <linearGradient id="goldCarving" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>

              <linearGradient id="warmCourtyardGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#e11d48" stopOpacity="0.4" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Night Sky with Stars & Amber Horizon */}
            <rect width="1440" height="900" fill="url(#nightSky)" />
            {/* Crescent Moon */}
            <path d="M1100,100 A25,25 0 0,0 1125,75 A20,20 0 1,1 1100,100 Z" fill="#fef08a" />

            {/* Haveli Exterior Architecture Silhouette */}
            {/* Domes & Chhatris on Top Roof */}
            {/* Left Dome */}
            <path d="M260,240 C260,160 320,120 370,100 C420,120 480,160 480,240 Z" fill="#240c33" stroke="url(#goldCarving)" strokeWidth="3" />
            <line x1="370" y1="70" x2="370" y2="100" stroke="url(#goldCarving)" strokeWidth="4" />
            <circle cx="370" cy="70" r="5" fill="#fef08a" />

            {/* Right Dome */}
            <path d="M960,240 C960,160 1020,120 1070,100 C1120,120 1180,160 1180,240 Z" fill="#240c33" stroke="url(#goldCarving)" strokeWidth="3" />
            <line x1="1070" y1="70" x2="1070" y2="100" stroke="url(#goldCarving)" strokeWidth="4" />
            <circle cx="1070" cy="70" r="5" fill="#fef08a" />

            {/* Center Grand Dome & Crown */}
            <path d="M580,220 C580,130 650,90 720,70 C790,90 860,130 860,220 Z" fill="#2c103d" stroke="url(#goldCarving)" strokeWidth="4" />
            <line x1="720" y1="35" x2="720" y2="70" stroke="url(#goldCarving)" strokeWidth="5" />
            <polygon points="720,25 710,40 730,40" fill="#fef08a" />

            {/* Grand Main Haveli Facade Wall */}
            <rect x="200" y="240" width="1040" height="660" fill="url(#haveliStone)" stroke="url(#goldCarving)" strokeWidth="3" />

            {/* Upper Jharokhas (Balconies with Carved Jali Screens) */}
            <g transform="translate(320, 280)">
              <path d="M0,80 C0,30 30,0 60,0 C90,0 120,30 120,80 L120,110 L0,110 Z" fill="#12051c" stroke="url(#goldCarving)" strokeWidth="2.5" />
              <line x1="30" y1="30" x2="30" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="60" y1="15" x2="60" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="90" y1="30" x2="90" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="-10" y="110" width="140" height="15" fill="#f59e0b" fillOpacity="0.4" />
            </g>

            <g transform="translate(1000, 280)">
              <path d="M0,80 C0,30 30,0 60,0 C90,0 120,30 120,80 L120,110 L0,110 Z" fill="#12051c" stroke="url(#goldCarving)" strokeWidth="2.5" />
              <line x1="30" y1="30" x2="30" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="60" y1="15" x2="60" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="90" y1="30" x2="90" y2="100" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
              <rect x="-10" y="110" width="140" height="15" fill="#f59e0b" fillOpacity="0.4" />
            </g>

            {/* Central Majestic Grand Portal Arch (The Gateway to XOLARA) */}
            <path d="M480,480 C480,310 580,240 720,240 C860,240 960,310 960,480 L960,900 L480,900 Z" fill="#08030e" stroke="url(#goldCarving)" strokeWidth="6" />

            {/* Multi-cusped Mughal Arch Trim */}
            <path d="M510,500 C510,340 600,280 720,280 C840,280 930,340 930,500" fill="none" stroke="#e11d48" strokeWidth="4" />
            <path d="M530,510 C530,360 610,300 720,300 C830,300 910,360 910,510" fill="none" stroke="#c084fc" strokeWidth="2.5" />

            {/* Carved Calligraphy Brand Plaque above Entrance */}
            <rect x="580" y="250" width="280" height="40" rx="8" fill="#170624" stroke="url(#goldCarving)" strokeWidth="2" />
            <text x="720" y="276" fill="#fef08a" fontSize="20" fontWeight="bold" fontFamily="Cinzel, serif" textAnchor="middle" letterSpacing="4">
              XOLARA ATELIER
            </text>

            {/* Warm Lanterns on Sides */}
            <g transform="translate(440, 520)">
              <rect x="0" y="0" width="20" height="30" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
              <polygon points="10,-12 0,0 20,0" fill="#f59e0b" />
              <circle cx="10" cy="15" r="5" fill="#fef08a" />
            </g>
            <g transform="translate(980, 520)">
              <rect x="0" y="0" width="20" height="30" rx="4" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
              <polygon points="10,-12 0,0 20,0" fill="#f59e0b" />
              <circle cx="10" cy="15" r="5" fill="#fef08a" />
            </g>
          </svg>

          {/* ============================================================== */}
          {/* THE 3D INTERACTIVE DOORS (Jo Scroll Karne par Khulte Hain) */}
          {/* ============================================================== */}
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-[20%] w-[340px] sm:w-[420px] h-[340px] sm:h-[430px] flex overflow-hidden perspective-[1200px]">
            {/* Left Door */}
            <motion.div
              style={{
                rotateY: doorRotateLeft,
                transformOrigin: 'left center',
              }}
              className="w-1/2 h-full bg-gradient-to-r from-amber-950 via-zinc-950 to-stone-900 border-2 border-amber-400/80 shadow-2xl relative flex flex-col justify-around p-3"
            >
              {/* Door Carving Panels */}
              <div className="w-full h-1/3 border border-amber-400/40 rounded-lg bg-black/40 flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div className="w-full h-1/3 border border-amber-400/40 rounded-lg bg-black/40 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-amber-400/50" />
              </div>
              {/* Heavy Golden Handle */}
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-12 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-md" />
            </motion.div>

            {/* Right Door */}
            <motion.div
              style={{
                rotateY: doorRotateRight,
                transformOrigin: 'right center',
              }}
              className="w-1/2 h-full bg-gradient-to-l from-amber-950 via-zinc-950 to-stone-900 border-2 border-amber-400/80 shadow-2xl relative flex flex-col justify-around p-3"
            >
              {/* Door Carving Panels */}
              <div className="w-full h-1/3 border border-amber-400/40 rounded-lg bg-black/40 flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400" />
              </div>
              <div className="w-full h-1/3 border border-amber-400/40 rounded-lg bg-black/40 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-amber-400/50" />
              </div>
              {/* Heavy Golden Handle */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-12 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 shadow-md" />
            </motion.div>

            {/* Red & Purple Embroidered Zari Curtains Behind Doors */}
            <motion.div
              style={{ x: curtainLeftX }}
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-rose-900 to-purple-950 border-r-2 border-amber-400 z-10 opacity-90 shadow-xl flex items-center justify-center"
            >
              <div className="w-full h-full border-y-4 border-amber-400/60" />
            </motion.div>
            <motion.div
              style={{ x: curtainRightX }}
              className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-rose-900 to-purple-950 border-l-2 border-amber-400 z-10 opacity-90 shadow-xl flex items-center justify-center"
            >
              <div className="w-full h-full border-y-4 border-amber-400/60" />
            </motion.div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* OVERLAY UI 1: INITIAL EXTERIOR HERO (Before Scrolling) */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none text-center px-4"
        >
          <div className="space-y-4 max-w-2xl bg-black/50 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-amber-400/30 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/40 text-xs font-bold text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
              <span>THE ROYAL HAVELI · LIVE ATELIER</span>
            </div>

            <h1 className="font-cinzel text-5xl sm:text-7xl font-black tracking-widest text-white uppercase drop-shadow-[0_4px_25px_rgba(245,158,11,0.4)]">
              <span className="animate-brand-text">LIVE XOLARA</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              Scroll kijiye aur shahi haveli ke darwaze kholkar andar aaiye — jahan aapko milega
              handcrafted royal suits, pure banarasi sarees, aur bridal lehengas ka live collection.
            </p>

            <div className="pt-2 flex flex-col items-center gap-2 text-xs font-semibold text-amber-400 animate-bounce">
              <span>Scroll down to walk inside the mansion</span>
              <ChevronDown className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* OVERLAY UI 2: ARRIVAL INSIDE THE ATELIER (After Walking In) */}
        {/* ============================================================== */}
        <motion.div
          style={{ opacity: insideBadgeOpacity, y: insideBadgeY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-black/75 backdrop-blur-xl border border-amber-400/60 text-xs sm:text-sm font-bold text-amber-300 shadow-2xl">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Welcome Inside The XOLARA Atelier · Continue Scrolling for Collection</span>
            <Sparkles className="w-4 h-4 text-rose-400" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
