/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Crown, MessageCircle, Star, Heart, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_DISPLAY, getDirectWhatsAppUrl } from '../utils/whatsapp';
import { motion } from 'motion/react';

export const BrandStory: React.FC = () => {
  const reviews = [
    {
      name: 'Ananya Singhania',
      city: 'Delhi',
      occasion: 'Bridal Reception',
      rating: 5,
      text: 'Ordered my bespoke velvet lehenga through XOLARA WhatsApp concierge. The team sent photos of the zardozi progress and tailored the blouse to millimeter perfection!',
    },
    {
      name: 'Ritu Mehra',
      city: 'Lucknow',
      occasion: 'Wedding Saree',
      rating: 5,
      text: 'The Banarasi silk weave is genuine handloom with pure gold zari. Delivered in 3 days with Silk Mark certificate. Exceptional luxury experience.',
    },
    {
      name: 'Dr. Kavita Verma',
      city: 'Bangalore',
      occasion: 'Diwali Gala',
      rating: 5,
      text: 'The plum Anarkali suit fits like a dream. Deep jewel tones, rich fall of fabric, and polite communication on 9905847357.',
    },
  ];

  return (
    <section id="story" className="py-20 bg-zinc-950 text-zinc-100 border-t border-zinc-900 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-amber-500/10 via-rose-600/15 to-purple-600/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        {/* Brand Philosophy with Scroll Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5" />
              The LIVE XOLARA Atelier
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white leading-tight">
              Where Royal Heritage Meets Contemporary Haute Couture
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Founded on the timeless traditions of master Indian karigars, <strong>LIVE XOLARA</strong> crafts
              wearable poetry for the modern woman. Every saree, bridal lehenga, and ceremonial suit is an
              ode to age-old weaving corridors — from the historic ghats of Varanasi to the royal courts of Awadh.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              We eliminate middlemen, connecting you directly to our design atelier via WhatsApp
              (<strong className="text-amber-300">{WHATSAPP_DISPLAY}</strong>). Experience one-on-one bridal styling,
              custom neckline adjustments, and tailored measurements before dispatch.
            </p>

            <div className="pt-2">
              <a
                href={getDirectWhatsAppUrl('Namaste XOLARA! 🌟 I would like to schedule a personal bridal consultation on WhatsApp.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Book Bridal Consultation: {WHATSAPP_DISPLAY}</span>
              </a>
            </div>
          </motion.div>

          {/* Craftsmanship Features Box with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-6"
          >
            <h3 className="text-xl font-bold text-white font-cinzel">The Pillars of XOLARA</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Genuine Handloom Silks</div>
                  <div className="text-zinc-400">Certified pure mulberry, katan, and chanderi silks woven on traditional pit looms.</div>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Authentic Zardozi & Mukaish</div>
                  <div className="text-zinc-400">Hand-embroidery taking up to 180 hours of meticulous hand-needlework per bridal set.</div>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Made-to-Measure Custom Fit</div>
                  <div className="text-zinc-400">Blouse padding, skirt cancan flare, sleeve lengths, and necklines tailored to your measurements.</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Client Reviews with Staggered Scroll Animation */}
        <div className="space-y-8 pt-8 border-t border-zinc-900">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-2"
          >
            <h3 className="text-2xl font-bold text-white font-cinzel">Client Affection</h3>
            <p className="text-xs text-zinc-400">Celebrated by brides, connoisseurs, and families across India</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-4 hover:border-amber-400/40 transition"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{rev.name}</div>
                    <div className="text-zinc-500">{rev.city} · {rev.occasion}</div>
                  </div>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
