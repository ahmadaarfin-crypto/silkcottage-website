/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS, Product } from './data';
import { formatPrice, cn } from './lib/utils';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import QuickView from './components/QuickView';
import CartDrawer from './components/CartDrawer';

export type ViewState = 'home' | 'shop';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setQuickViewItem(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--color-sand)] text-[var(--color-ink)] selection:bg-[var(--color-gold)] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--color-sand)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 h-[70px] flex items-center justify-between">
          
          <button className="lg:hidden p-2 -ml-2" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-5 h-5 text-[var(--color-ink)]" />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-sans text-[var(--color-ink)]">
            <button onClick={() => setView('home')} className={cn("hover:text-[var(--color-gold)] transition-colors", view === 'home' && "text-[var(--color-gold)]")}>House of Silk</button>
            <button onClick={() => setView('shop')} className={cn("hover:text-[var(--color-gold)] transition-colors", view === 'shop' && "text-[var(--color-gold)]")}>Collections</button>
            <button className="hover:text-[var(--color-gold)] transition-colors">Our Weaver Story</button>
          </nav>

          {/* Logo */}
          <div 
            onClick={() => setView('home')}
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer text-[var(--color-ink)]"
          >
            <h1 className="font-serif text-2xl tracking-[0.3em] font-light italic uppercase">
              SILK COTTAGE
            </h1>
            <span className="text-[9px] text-center tracking-[0.5em] mt-[-4px] uppercase not-italic opacity-60 hidden md:block">
              Varanasi
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 flex items-center justify-center text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5 font-light" strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--color-maroon)] text-white text-[9px] font-bold flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {view === 'home' ? (
          <HomePage setView={setView} openQuickView={setQuickViewItem} />
        ) : (
          <ShopPage openQuickView={setQuickViewItem} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-ink)] text-white py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h2 className="font-serif text-2xl tracking-[0.3em] font-light italic uppercase">SILK COTTAGE</h2>
            <p className="text-white/60 text-xs tracking-wide leading-relaxed max-w-xs font-sans">
              Preserving the sacred art of Banarasi weaving. Direct from the heart of Varanasi to your wardrobe.
            </p>
          </div>
          <div className="flex flex-col md:items-center space-y-4">
             <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-sans">Collections</h3>
             <ul className="space-y-3 text-[11px] uppercase tracking-widest text-white/50 font-sans">
               <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Kora Silk</button></li>
               <li><button onClick={() => setView('shop')} className="hover:text-white transition-colors">Katan Brocade</button></li>
             </ul>
          </div>
          <div className="flex flex-col md:items-end space-y-4">
             <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)] font-sans">Contact</h3>
             <ul className="space-y-3 text-[11px] uppercase tracking-widest text-white/50 font-sans md:text-right">
               <li>Varanasi, Uttar Pradesh, India</li>
               <li>care@silkcottage.com</li>
               <li>08887937270</li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[var(--color-border)]/20 text-center text-[10px] text-white/40 tracking-[0.3em] uppercase font-sans">
          &copy; {new Date().getFullYear()} Silk Cottage Pvt. Ltd. All rights reserved.
        </div>
      </footer>

      {/* UI Overlays */}
      <AnimatePresence>
        {quickViewItem && (
          <QuickView product={quickViewItem} close={() => setQuickViewItem(null)} addToCart={addToCart} />
        )}
        {isCartOpen && (
          <CartDrawer cart={cart} close={() => setIsCartOpen(false)} remove={removeFromCart} total={cartTotal} />
        )}
      </AnimatePresence>
    </div>
  );
}
