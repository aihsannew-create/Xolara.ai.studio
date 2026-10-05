/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Product, CustomerOrder } from '../types';
import { ProductVisual } from './ProductVisual';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Package,
  ShoppingBag,
  RotateCcw,
  Search,
  Upload,
  Image as ImageIcon,
  MessageCircle,
  AlertCircle,
  Check,
  Lock,
  KeyRound,
  ArrowLeft,
  Shield,
} from 'lucide-react';
import { WHATSAPP_DISPLAY } from '../utils/whatsapp';

export const ADMIN_PASSWORD = '990584';

interface AdminPanelProps {
  products: Product[];
  orders: CustomerOrder[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onToggleStock: (id: string) => void;
  onResetDefaults: () => void;
  onClose: () => void;
  onLogout?: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  orders,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onToggleStock,
  onResetDefaults,
  onClose,
  onLogout,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'Saree' as Product['category'],
    price: 9999,
    originalPrice: 12999,
    description: '',
    fabric: '',
    color: '',
    sizes: 'Free Size (5.5m + Blouse)',
    inStock: true,
    image: '',
    badge: 'New Arrival',
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setUploadStatus('');
    setFormData({
      name: '',
      category: 'Suit',
      price: 8999,
      originalPrice: 11999,
      description: 'Handcrafted luxury ethnic wear with traditional zari needlework.',
      fabric: 'Pure Georgette & Silk',
      color: 'Ruby Red & Gold',
      sizes: 'S, M, L, XL, XXL',
      inStock: true,
      image: '',
      badge: 'New Arrival',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setUploadStatus('');
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || prod.price,
      description: prod.description,
      fabric: prod.fabric,
      color: prod.color,
      sizes: prod.sizes.join(', '),
      inStock: prod.inStock,
      image: prod.image || '',
      badge: prod.badge || '',
    });
    setIsModalOpen(true);
  };

  // Image File Upload Handler with Canvas Compression
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus('Processing photo...');

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        // Compress and resize image to avoid localStorage quota issues
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1000;
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
          setUploadStatus('Photo uploaded successfully! ✓');
        }
      };
      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray = formData.sizes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      onEditProduct({
        ...editingProduct,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        description: formData.description,
        fabric: formData.fabric,
        color: formData.color,
        sizes: sizesArray.length > 0 ? sizesArray : ['Standard'],
        inStock: formData.inStock,
        image: formData.image || undefined,
        badge: formData.badge || undefined,
      });
    } else {
      onAddProduct({
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        description: formData.description,
        fabric: formData.fabric,
        color: formData.color,
        sizes: sizesArray.length > 0 ? sizesArray : ['Standard'],
        inStock: formData.inStock,
        image: formData.image || undefined,
        badge: formData.badge || undefined,
      });
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.color.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === ADMIN_PASSWORD) {
      setIsUnlocked(true);
      setPinError(false);
      setEnteredPin('');
    } else {
      setPinError(true);
    }
  };

  // IF NOT UNLOCKED: SHOW SECURITY PASSWORD SCREEN (Guaranteed password barrier every time!)
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-black text-zinc-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated Mix Aura (Black - Yellow - Red - Purple) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-purple-900/40 via-rose-700/30 to-amber-500/25 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-zinc-950/95 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold font-cinzel text-white">
              LIVE XOLARA Admin Access
            </h2>
            <p className="text-xs text-zinc-400">
              Admin panel me access karne ke liye apna 6-digit secret password daliye:
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 block text-center">
                Enter Password / Security Code:
              </label>
              <div className="relative max-w-xs mx-auto">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  autoFocus
                  required
                  placeholder="******"
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  className={`w-full text-center tracking-[0.5em] text-lg font-mono font-bold py-3 pl-10 pr-4 bg-zinc-900 border rounded-2xl text-white placeholder-zinc-600 focus:outline-none transition ${
                    pinError
                      ? 'border-rose-500 ring-2 ring-rose-500/30'
                      : 'border-zinc-700 focus:border-amber-400'
                  }`}
                />
              </div>

              {pinError && (
                <div className="text-rose-400 text-xs font-semibold flex items-center justify-center gap-1.5 pt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Galat Password! Kripya sahi 6-digit code daliye.</span>
                </div>
              )}
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Owner Confidential Login</span>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Storefront</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                Unlock Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Bar for Admin */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                Owner Dashboard
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-emerald-400 font-semibold">Security Verified</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-white">
              LIVE XOLARA Inventory & Product Management
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Control all ethnic products: Upload photos, edit prices, delete items, and manage WhatsApp orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetDefaults}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              title="Reset inventory to default catalog"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Catalog
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs shadow-md transition cursor-pointer"
            >
              Back to Storefront
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-rose-900/50 hover:bg-rose-950 text-rose-300 hover:text-white text-xs font-semibold transition cursor-pointer"
                title="Lock admin session"
              >
                Lock Admin
              </button>
            )}
          </div>
        </div>

        {/* Inventory Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">Total Catalog Items</div>
            <div className="text-2xl font-bold text-white tabular-nums mt-1">
              {products.length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">Active In-Stock</div>
            <div className="text-2xl font-bold text-emerald-400 tabular-nums mt-1">
              {products.filter((p) => p.inStock).length}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">Categories</div>
            <div className="text-2xl font-bold text-amber-400 tabular-nums mt-1">
              Suits, Sarees, Lehengas
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
            <div className="text-xs text-zinc-400">WhatsApp Inquiries Logged</div>
            <div className="text-2xl font-bold text-purple-400 tabular-nums mt-1">
              {orders.length}
            </div>
          </div>
        </div>

        {/* Tabs: Products vs Orders */}
        <div className="flex items-center gap-2 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'products'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Customer WhatsApp Orders ({orders.length})
          </button>
        </div>

        {/* Tab 1: Products Table with Photo Column & Edit Controls */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              {/* Search & Filter */}
              <div className="flex flex-1 gap-2 w-full sm:w-auto">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search by name, fabric, color..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/50"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="text-xs px-3 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300 focus:outline-none focus:border-amber-400/50"
                >
                  <option value="All">All Categories</option>
                  <option value="Suit">Suits</option>
                  <option value="Saree">Sarees</option>
                  <option value="Lehenga">Lehengas</option>
                  <option value="Gown">Gowns</option>
                </select>
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleOpenAdd}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Ethnic Creation
              </button>
            </div>

            {/* Products Table with Direct Product Image Column */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider text-[10px] border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-4 w-16 text-center">Photo</th>
                    <th className="py-3 px-4">Item Details</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (INR)</th>
                    <th className="py-3 px-4">Fabric & Color</th>
                    <th className="py-3 px-4">Sizes</th>
                    <th className="py-3 px-4 text-center">Stock</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-zinc-800/30 transition">
                      {/* Product Thumbnail Photo */}
                      <td className="py-3 px-4">
                        <div className="w-14 h-16 rounded-xl overflow-hidden bg-black border border-zinc-800 shadow relative shrink-0">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-amber-400">
                              <ImageIcon className="w-6 h-6 opacity-60" />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white text-sm flex items-center gap-2">
                          <span>{p.name}</span>
                          {p.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 border border-amber-400/20">
                              {p.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {p.description}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-amber-400">
                        {p.category}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-zinc-200 tabular-nums">
                        ₹{p.price.toLocaleString('en-IN')}
                        {p.originalPrice && (
                          <span className="block text-[10px] text-zinc-500 line-through">
                            MRP: ₹{p.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-zinc-300">
                        <div>{p.fabric}</div>
                        <div className="text-zinc-500 text-[10px]">{p.color}</div>
                      </td>

                      <td className="py-3.5 px-4 text-zinc-400">
                        {p.sizes.join(', ')}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => onToggleStock(p.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition cursor-pointer ${
                            p.inStock
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                          title="Click to toggle availability"
                        >
                          {p.inStock ? (
                            <>
                              <CheckCircle className="w-3 h-3" /> In Stock
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3" /> Sold Out
                            </>
                          )}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 hover:text-white transition cursor-pointer border border-zinc-700 hover:border-amber-400"
                            title="Edit Product Details & Photo"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-2 rounded-xl bg-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 transition cursor-pointer border border-zinc-700"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-zinc-500">
                        No products match your search or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Customer Orders Log */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="text-xs text-zinc-400">
              Orders submitted via the shopping bag are automatically directed to your WhatsApp
              (<strong className="text-amber-400">{WHATSAPP_DISPLAY}</strong>) and logged below:
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center border border-zinc-800 rounded-2xl bg-zinc-900/30 space-y-2">
                <ShoppingBag className="w-8 h-8 mx-auto text-zinc-600" />
                <div className="text-sm font-semibold text-zinc-300">No orders received yet</div>
                <div className="text-xs text-zinc-500">
                  When customers click &quot;Place Order via WhatsApp&quot;, their order will show here.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800/80 gap-2">
                      <div>
                        <span className="font-mono text-xs font-bold text-amber-400">
                          {ord.id}
                        </span>
                        <span className="text-zinc-600 mx-2">·</span>
                        <span className="text-xs text-zinc-400">{ord.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {ord.status}
                        </span>
                        <a
                          href={`https://wa.me/91${ord.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Chat with Customer
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-semibold text-zinc-200">Customer Details:</div>
                        <div className="text-white text-sm font-medium mt-0.5">
                          {ord.customerName}
                        </div>
                        <div className="text-zinc-400">Phone: {ord.phone}</div>
                        <div className="text-zinc-400">
                          Address: {ord.address}, {ord.city}
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold text-zinc-200">Items Ordered:</div>
                        <ul className="mt-1 space-y-1">
                          {ord.items.map((it, idx) => (
                            <li key={idx} className="flex justify-between text-zinc-300">
                              <span>
                                {it.productName} ({it.size}) × {it.quantity}
                              </span>
                              <span className="tabular-nums font-semibold">
                                ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2 mt-2 border-t border-zinc-800 flex justify-between font-bold text-sm text-white">
                          <span>Total Amount:</span>
                          <span className="text-amber-400 tabular-nums">
                            ₹{ord.totalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL: Add / Edit Product WITH DIRECT PHOTO PREVIEW & FILE UPLOAD */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl my-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-white font-cinzel">
                    {editingProduct ? 'Edit Product Details & Photo' : 'Add New Ethnic Product'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {editingProduct
                      ? 'Neeche di gayi image dekhkar pta laga sakte hain konsa product edit ho rha h.'
                      : 'Naya suit, saree ya lehenga image upload karke add karein.'}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* DIRECT PRODUCT IMAGE PREVIEW CARD (Especially for Edit!) */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-24 h-32 rounded-xl overflow-hidden bg-black border-2 border-amber-400/40 relative shrink-0 shadow-lg">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Product Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 bg-zinc-950 p-2 text-center text-[10px]">
                      <ImageIcon className="w-6 h-6 mb-1 text-zinc-500" />
                      <span>No Photo Uploaded</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    {editingProduct ? '✓ Currently Editing This Piece' : '✓ New Piece Preview'}
                  </div>
                  <h4 className="font-bold text-white text-base">
                    {formData.name || 'Product Title Yahan Likhein'}
                  </h4>
                  <div className="text-xs text-zinc-300">
                    Category: <span className="text-amber-300 font-semibold">{formData.category}</span> · Price: <span className="text-emerald-400 font-bold">₹{formData.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Fabric: {formData.fabric || 'Fabric type'} · Color: {formData.color || 'Color'}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
                {/* IMAGE UPLOAD SECTION */}
                <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-zinc-200 font-semibold flex items-center gap-1.5">
                      <Upload className="w-4 h-4 text-amber-400" />
                      Upload Product Photo (From Phone / PC) *
                    </label>
                    {uploadStatus && (
                      <span className="text-xs text-emerald-400 font-medium">{uploadStatus}</span>
                    )}
                  </div>

                  {/* Hidden native file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileUpload}
                    className="hidden"
                  />

                  {/* Upload Button */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 hover:text-white font-semibold flex items-center justify-center gap-2 border border-zinc-700 hover:border-amber-400 transition cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Choose Photo from Gallery / Device</span>
                    </button>

                    {formData.image && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: '' });
                          setUploadStatus('');
                        }}
                        className="py-3 px-3 rounded-xl bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 border border-zinc-800 text-xs transition cursor-pointer"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>

                  {/* Or image URL input as fallback */}
                  <div>
                    <label className="text-zinc-400 text-[11px] block mb-1">
                      Ya image ka web URL direct paste karein:
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://... (or use upload button above)"
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Royal Maroon Zardozi Bridal Lehenga"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-zinc-300 font-medium block mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Product['category'],
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="Suit">Suit</option>
                      <option value="Saree">Saree</option>
                      <option value="Lehenga">Lehenga</option>
                      <option value="Gown">Gown</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-300 font-medium block mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-300 font-medium block mb-1">
                      MRP / Original Price (₹)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, originalPrice: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-300 font-medium block mb-1">
                      Fabric & Weave *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fabric}
                      onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                      placeholder="e.g. Pure Katan Silk, Velvet, Georgette"
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-300 font-medium block mb-1">
                      Color Description *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="e.g. Ruby Red, Imperial Purple, Golden Yellow"
                      className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    Sizes (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="e.g. S, M, L, XL, Custom Stitching"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Details about craftsmanship, embroidery, styling..."
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-300 font-medium block mb-1">
                    Badge Label (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Bestseller, Handloom, Limited"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="inStockCheck"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <label htmlFor="inStockCheck" className="text-zinc-200 font-medium">
                    Available in Stock / Ready for WhatsApp Orders
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold shadow-lg transition cursor-pointer"
                  >
                    {editingProduct ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
