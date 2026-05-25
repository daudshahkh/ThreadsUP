"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "../store/cartStore";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem } = useCartStore();

  const subtotal = items.reduce((total, item) => {
    const numericPrice = parseFloat(item.price.replace("$", ""));
    return total + numericPrice;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeCart} className="fixed inset-0 bg-[#07110F]/80 backdrop-blur-sm z-[100]" />

          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0B1F1A] border-l border-dashed border-[#D0A85C] shadow-2xl z-[101] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-dashed border-[#D0A85C]/30">
              <h2 className="text-2xl font-serif text-[#D0A85C]">Atelier Bag</h2>
              <button onClick={closeCart} className="text-[#F6E9C8] hover:text-[#D0A85C] transition-colors" aria-label="Close cart">
                x
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-50">
                  <p className="text-[#F6E9C8] tracking-widest text-xs uppercase">Your bag is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.cartItemId} className="flex gap-4 items-center bg-[#07110F] p-3 border border-dashed border-[#D0A85C]/30">
                    <div className="w-20 h-24 bg-[#0B1F1A] flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="flex-grow flex flex-col">
                      <h3 className="text-[#F6E9C8] font-serif text-sm">{item.name}</h3>
                      <p className="text-[#F6E9C8]/50 text-xs uppercase tracking-widest mt-1">Size: {item.size}</p>
                      <p className="text-[#D0A85C] text-sm mt-2">{item.price}</p>
                    </div>
                    <button onClick={() => removeItem(item.cartItemId)} className="text-[#F6E9C8]/30 hover:text-[#D0A85C] px-2" aria-label={`Remove ${item.name}`}>
                      x
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-[#07110F] border-t border-dashed border-[#D0A85C]/50">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#F6E9C8]/70 uppercase tracking-widest text-xs">Subtotal</span>
                <span className="text-[#D0A85C] font-serif text-xl">${subtotal.toFixed(2)}</span>
              </div>
              <button disabled={items.length === 0} className="w-full py-4 bg-[#D0A85C] text-[#0B1F1A] font-bold uppercase tracking-widest text-xs hover:bg-[#F6E9C8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(208,168,92,0.2)]">
                Secure Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

