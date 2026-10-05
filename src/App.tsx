/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, CustomerOrder, ProductCategory } from './types';
import { INITIAL_PRODUCTS } from './data/initialProducts';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ModernMansionExperience } from './components/ModernMansionExperience';
import { Meteors } from './components/magicui/Meteors';
import { CartDrawer } from './components/CartDrawer';
import { AdminPanel } from './components/AdminPanel';
import { BrandStory } from './components/BrandStory';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Search, SlidersHorizontal, MessageCircle, Crown } from 'lucide-react';
import { WHATSAPP_DISPLAY, getDirectWhatsAppUrl } from './utils/whatsapp';

export default function App() {
  // Load products from localStorage or use initial set
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('xolara_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => {
            const init = INITIAL_PRODUCTS.find((ip) => ip.id === p.id);
            if (init && init.image && (!p.image || p.image.trim() === '')) {
              return { ...p, image: init.image };
            }
            return p;
          });
        }
      }
    } catch (e) {
      console.error('Failed to load products from storage', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Load orders history from localStorage
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem('xolara_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load orders', e);
    }
    return [];
  });

  // Load cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('xolara_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load cart', e);
    }
    return [];
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  // Admin access toggle (AdminPanel internally enforces password every time)
  const handleRequestAdminAccess = () => {
    setIsAdminMode((prev) => !prev);
    setActiveProduct(null);
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('xolara_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('xolara_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('xolara_cart', JSON.stringify(cart));
  }, [cart]);

  // BROWSER & PHONE HARDWARE BACK BUTTON INTEGRATION
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.productId) {
        const found = products.find((p) => p.id === e.state.productId);
        setActiveProduct(found || null);
      } else {
        // Returned to home catalog via phone back button
        setActiveProduct(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check on load if URL has hash like #product-xolara-101
    const currentHash = window.location.hash;
    if (currentHash && currentHash.startsWith('#product-')) {
      const prodId = currentHash.replace('#product-', '');
      const found = products.find((p) => p.id === prodId);
      if (found) {
        setActiveProduct(found);
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [products]);

  // Open Full Product Detail Page with Browser History Push
  const handleOpenProduct = (product: Product) => {
    setActiveProduct(product);
    window.history.pushState({ productId: product.id }, '', `#product-${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to Catalog (triggers window.history.back if we pushed state)
  const handleBackToCatalog = () => {
    if (window.location.hash.startsWith('#product-')) {
      window.history.back();
    } else {
      setActiveProduct(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleClearCart = () => setCart([]);

  const handleSaveOrder = (newOrder: CustomerOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Admin operations
  const handleAddProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `xolara-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleEditProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (activeProduct?.id === updated.id) {
      setActiveProduct(updated);
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (activeProduct?.id === id) {
      setActiveProduct(null);
    }
  };

  const handleToggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all products to default XOLARA catalog?')) {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('xolara_products', JSON.stringify(INITIAL_PRODUCTS));
    }
  };

  // Filter & Sort Products
  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.color.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#08080c] text-zinc-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white relative">
      {/* MagicUI Meteors Shooting Stars Animation (Across entire UI) */}
      <Meteors number={35} />

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdminMode}
        onToggleAdmin={handleRequestAdminAccess}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as ProductCategory);
          setActiveProduct(null);
        }}
      />

      {/* Main View Router */}
      {isAdminMode ? (
        <AdminPanel
          products={products}
          orders={orders}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onToggleStock={handleToggleStock}
          onResetDefaults={handleResetDefaults}
          onClose={() => setIsAdminMode(false)}
          onLogout={handleAdminLogout}
        />
      ) : activeProduct ? (
        /* FULL DEDICATED PRODUCT DETAIL PAGE (Upar Buy Section, Niche Baki Product + Phone Back Button) */
        <ProductDetailPage
          product={activeProduct}
          allProducts={products}
          onBack={handleBackToCatalog}
          onSelectOtherProduct={(p) => handleOpenProduct(p)}
          onAddToCart={(p, size) => handleAddToCart(p, size)}
        />
      ) : (
        /* MAIN STOREFRONT CATALOG VIEW - CLEAN, FAST, LUXURIOUS */
        <main className="flex-1 relative">
          {/* Photorealistic Modern Luxury Black Mansion Walkthrough Backdrop */}
          <ModernMansionExperience />

          {/* Hero Section: XOLARA, Owner: AIHSAN, Search Bar & Categories inside the Mansion */}
          <Hero
            searchQuery={searchQuery}
            onSearchChange={(q) => setSearchQuery(q)}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onSearchSubmit={(q) => setSearchQuery(q)}
          />

          {/* Collection Showcase Section */}
          <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6 relative z-10">
            {/* Minimal Header & Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-cinzel tracking-wider">
                  {selectedCategory === 'All' ? 'All Products' : `${selectedCategory}s`}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="text-xs text-zinc-400">
                  {filteredProducts.length} Pieces Available
                </span>
                {searchQuery && (
                  <span className="text-xs text-amber-400 font-medium">
                    (Matching &quot;{searchQuery}&quot;)
                  </span>
                )}
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-zinc-400">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-200 text-xs focus:outline-none focus:border-amber-400"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                    onQuickView={(p) => handleOpenProduct(p)}
                    onAddToCart={(p, size) => handleAddToCart(p, size)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4 rounded-3xl bg-zinc-900/20 border border-zinc-800/80">
                <Crown className="w-10 h-10 text-zinc-600 mx-auto" />
                <div className="text-base font-semibold text-zinc-300">
                  No creations found matching &quot;{searchQuery}&quot;
                </div>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  Try another search term or reset to view all bridal lehengas, pure sarees, and suits.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-amber-400 font-semibold hover:border-amber-400 cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>

          {/* Atelier Brand Story & Craftsmanship */}
          <BrandStory />
        </main>
      )}

      {/* Floating Direct WhatsApp CTA */}
      <WhatsAppFloatingButton />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onSaveOrder={handleSaveOrder}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-12 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-zinc-800/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <span className="font-cinzel text-xl font-bold tracking-widest text-white">
                  XOLARA
                </span>
              </div>
              <p className="text-zinc-500 max-w-md">
                Haute couture Indian ethnic wear. Handcrafted banarasi sarees, bridal lehengas,
                and designer suits tailored to perfection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>

              <button
                onClick={handleRequestAdminAccess}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
              >
                Owner / Admin Login
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
            <div>
              © 2026 XOLARA Haute Couture. All rights reserved. Handcrafted in India.
            </div>
            <div className="flex items-center gap-6">
              <span>Pure Silk Mark Certified</span>
              <span>Express Delivery</span>
              <span>Made-to-Measure Sizing</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
