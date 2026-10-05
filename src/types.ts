/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductCategory = 'All' | 'Saree' | 'Lehenga' | 'Suit' | 'Gown';

export interface Product {
  id: string;
  name: string;
  category: 'Saree' | 'Lehenga' | 'Suit' | 'Gown';
  price: number;
  originalPrice?: number;
  description: string;
  fabric: string;
  color: string;
  sizes: string[];
  inStock: boolean;
  featured?: boolean;
  image?: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  date: string;
  status: 'Received on WhatsApp' | 'Processing' | 'Dispatched' | 'Delivered';
}
