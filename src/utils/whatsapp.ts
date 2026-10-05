/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartItem, Product } from '../types';

export const WHATSAPP_NUMBER = '9905847357';
export const WHATSAPP_COUNTRY_CODE = '91';
export const WHATSAPP_DISPLAY = '+91 9905847357';

export function getDirectWhatsAppUrl(customMessage?: string): string {
  const defaultText = `Namaste XOLARA! 🌟 I would like to inquire about your luxury ethnic wear collection (Sarees, Lehengas & Suits).`;
  const text = customMessage || defaultText;
  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function generateProductWhatsAppUrl(product: Product, selectedSize?: string, customerNote?: string): string {
  const sizeText = selectedSize || product.sizes[0] || 'Standard';
  const text = `*New Order Inquiry — XOLARA* 👑
----------------------------------
*Product:* ${product.name}
*Category:* ${product.category}
*Price:* ₹${product.price.toLocaleString('en-IN')} ${product.originalPrice ? `(MRP: ₹${product.originalPrice.toLocaleString('en-IN')})` : ''}
*Size Selected:* ${sizeText}
*Fabric:* ${product.fabric}
*Color:* ${product.color}
${customerNote ? `*Special Request:* ${customerNote}\n` : ''}----------------------------------
Hello, please let me know availability, dispatch timeline, and payment options for this piece!`;

  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function generateCartWhatsAppUrl(
  customer: { name: string; phone: string; address: string; city: string; notes?: string },
  items: CartItem[],
  totalAmount: number
): string {
  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}*
   • Size: ${item.selectedSize} | Qty: ${item.quantity}
   • Price: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n\n');

  const text = `*👑 XOLARA — OFFICIAL BAG ORDER*
==================================
*Customer Details:*
• Name: ${customer.name}
• Contact: ${customer.phone}
• Delivery Address: ${customer.address}, ${customer.city}
${customer.notes ? `• Note: ${customer.notes}\n` : ''}
==================================
*Order Items (${items.reduce((acc, i) => acc + i.quantity, 0)} pcs):*

${itemsList}

==================================
*Grand Total Amount: ₹${totalAmount.toLocaleString('en-IN')}*
*(Free Express Insured Shipping Included)*
==================================
Please confirm this order and share payment instructions (UPI / Bank Transfer / COD).`;

  return `https://wa.me/${WHATSAPP_COUNTRY_CODE}${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
