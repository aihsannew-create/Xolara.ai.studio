/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY, getDirectWhatsAppUrl } from '../utils/whatsapp';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside
      aria-label="Direct WhatsApp Ordering Concierge"
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-zinc-900/95 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Order directly on WhatsApp ({WHATSAPP_DISPLAY})
      </span>

      <a
        href={getDirectWhatsAppUrl('Namaste XOLARA! 🌟 I would like to place an order or inquire about your collection.')}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 transform hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label={`Chat with XOLARA on WhatsApp at ${WHATSAPP_DISPLAY}`}
      >
        <MessageCircle className="w-7 h-7 fill-white" />
        {/* Subtle Pulse Ping */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-25 animate-ping -z-10" />
      </a>
    </aside>
  );
};
