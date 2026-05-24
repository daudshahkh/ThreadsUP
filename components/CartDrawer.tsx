"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cartStore";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem } = useCartStore();

  // Calculate Subtotal
  const subtotal = items.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.replace('$', ''));
    return total + numericPrice;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#0B0B0B]/80 backdrop-blur-sm z-[100]"
          />

          {/* The Slide-Out Drawer */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F2B24] border-l border-dashed border-[#C5A46D] shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-dashed border-[#C5A46D]/30">
              <h2 className="text-2xl font-serif text-[#C5A46D]">Atelier Bag</h2>
              <button onClick={closeCart} className="text-[#F5E7C1] hover:text-[#C5A46D] transition-colors">
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-50">
                  <p className="text-[#F5E7C1] tracking-widest text-xs uppercase">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 items-center bg-[#0B0B0B] p-3 border border-dashed border-[#C5A46D]/30">
                    <div className="w-20 h-24 bg-[#0F2B24] flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-[#F5E7C1] font-serif text-sm">{item.name}</h3>
                      <p className="text-[#F5E7C1]/50 text-xs uppercase tracking-widest mt-1">Size: {item.size}</p>
                      <p className="text-[#C5A46D] text-sm mt-2">{item.price}</p>
                    </div>
                    <button onClick={() => removeItem(item.cartItemId)} className="text-[#F5E7C1]/30 hover:text-[#C5A46D] px-2">
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            <div className="p-6 bg-[#0B0B0B] border-t border-dashed border-[#C5A46D]/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#F5E7C1]/70 uppercase tracking-widest text-xs">Subtotal</span>
                <span className="text-[#C5A46D] font-serif text-xl">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                disabled={items.length === 0}
                className="w-full py-4 bg-[#C5A46D] text-[#0F2B24] font-bold uppercase tracking-widest text-xs hover:bg-[#F5E7C1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(197,164,109,0.2)]"
              >
                Secure Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}