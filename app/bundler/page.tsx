"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";

// Reusing our prototype database
const products = [
  { id: "1", name: "Heavy-Gauge Washed Tee", price: 45.00, category: "Tops", image: "/product-1.png", sizes: ["S", "M", "L", "XL"] },
  { id: "4", name: "Oversized Studio Crewneck", price: 75.00, category: "Tops", image: "/product-1.png", sizes: ["S", "M", "L", "XL"] },
  { id: "3", name: "Tailored Cargo Pants", price: 65.00, category: "Bottoms", image: "/product-3.webp", sizes: ["30", "32", "34", "36"] },
  { id: "6", name: "Pleated Wide-Leg Trousers", price: 80.00, category: "Bottoms", image: "/product-3.webp", sizes: ["30", "32", "34", "36"] },
  { id: "2", name: "Forest Hoodie", price: 85.00, category: "Outerwear", image: "/product-2.jpg", sizes: ["S", "M", "L", "XL"] },
  { id: "5", name: "Utility Vest", price: 110.00, category: "Outerwear", image: "/product-2.jpg", sizes: ["S", "M", "L", "XL"] }
];

export default function BundlerPage() {
  const { openCart, items, addItem } = useCartStore();
  
  // State for the three slots
  const [selectedTop, setSelectedTop] = useState<any | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<any | null>(null);
  const [selectedOuterwear, setSelectedOuterwear] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = (selectedTop?.price || 0) + (selectedBottom?.price || 0) + (selectedOuterwear?.price || 0);
  const isFullBundle = selectedTop && selectedBottom && selectedOuterwear;
  const discount = isFullBundle ? subtotal * 0.15 : 0; // 15% off if all 3 are selected
  const finalPrice = subtotal - discount;

  const handleAddBundle = () => {
    // Basic validation: Ensure they picked sizes for what they selected
    // For this prototype, we'll auto-assign a size if they didn't pick one for simplicity, 
    // but in V2 we'd add size dropdowns to the slots.
    setIsProcessing(true);
    
    if (selectedTop) addItem({ productId: selectedTop.id, name: selectedTop.name, price: `$${selectedTop.price.toFixed(2)}`, size: "L", image: selectedTop.image });
    if (selectedBottom) addItem({ productId: selectedBottom.id, name: selectedBottom.name, price: `$${selectedBottom.price.toFixed(2)}`, size: "32", image: selectedBottom.image });
    if (selectedOuterwear) addItem({ productId: selectedOuterwear.id, name: selectedOuterwear.name, price: `$${selectedOuterwear.price.toFixed(2)}`, size: "L", image: selectedOuterwear.image });

    setTimeout(() => {
      setIsProcessing(false);
      openCart();
    }, 800);
  };

  const renderSelectionRow = (category: string, currentSelection: any, setSelection: any) => {
    const categoryProducts = products.filter(p => p.category === category);
    
    return (
      <div className="mb-12">
        <h3 className="text-[#C5A46D] font-serif text-xl mb-4 border-b border-dashed border-[#C5A46D]/30 pb-2">
          Select {category}
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
          {categoryProducts.map((product) => {
            const isSelected = currentSelection?.id === product.id;
            return (
              <motion.button
                key={product.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelection(isSelected ? null : product)}
                className={`snap-start flex-shrink-0 w-40 flex flex-col items-center bg-[#0B0B0B] p-2 border border-dashed transition-all duration-300 ${
                  isSelected ? "border-[#C5A46D] shadow-[0_0_15px_rgba(197,164,109,0.3)] opacity-100" : "border-transparent opacity-60 hover:opacity-100 hover:border-[#C5A46D]/50"
                }`}
              >
                <div className="w-full aspect-[4/5] bg-[#0F2B24] mb-3 overflow-hidden relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#C5A46D] text-[#0F2B24] flex items-center justify-center text-xs font-bold">✓</div>
                  )}
                </div>
                <p className="text-[10px] text-[#F5E7C1] text-center font-serif leading-tight">{product.name}</p>
                <p className="text-[10px] text-[#C5A46D] tracking-widest mt-1">${product.price.toFixed(2)}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="bg-[#0F2B24] text-[#F5E7C1] min-h-screen font-sans selection:bg-[#C5A46D] selection:text-[#0F2B24] relative overflow-x-hidden flex flex-col">
      <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M-10,20 C 30,50 80,-10 110,40 S 20,80 120,90" fill="transparent" stroke="#C5A46D" strokeWidth="0.2" />
      </svg>

      {/* Navbar Reused */}
      <nav className="relative z-20 p-6 md:px-10 flex justify-between items-center border-b border-dashed border-[#C5A46D]/30 bg-[#0B0B0B]/50 backdrop-blur-md">
        <a href="/" className="w-20 md:w-28 drop-shadow-xl hover:opacity-80 transition-opacity"><img src="/logo.png" alt="Logo" className="w-full h-auto object-contain" /></a>
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
          <a href="/shop" className="text-[#F5E7C1]/70 hover:text-[#C5A46D] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#C5A46D] pb-1">Collection</a>
          <a href="/bundler" className="text-[#C5A46D] tracking-widest text-[10px] uppercase border-b border-dashed border-[#C5A46D] pb-1">Curate a Fit</a>
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <button onClick={openCart} className="relative text-[#C5A46D] hover:text-[#F5E7C1] transition-colors group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A46D] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#C5A46D] text-[#0F2B24] text-[9px] items-center justify-center font-bold">{items.length}</span>
              </span>
            )}
          </button>
          <div className="h-4 w-[1px] bg-[#C5A46D]/30 hidden sm:block"></div>
          <Show when="signed-out"><a href="/login" className="text-[#C5A46D] font-light tracking-widest text-[10px] uppercase hover:text-[#F5E7C1] transition-colors border-b border-dashed border-transparent hover:border-[#C5A46D] pb-1">Sign In</a></Show>
          <Show when="signed-in"><UserButton appearance={{ elements: { userButtonAvatarBox: "w-7 h-7 border border-dashed border-[#C5A46D]" } }} /></Show>
        </div>
      </nav>

      <div className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* LEFT COL: Product Selectors */}
        <div className="flex-1 lg:pr-8 lg:border-r border-dashed border-[#C5A46D]/30">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl font-serif text-[#C5A46D] mb-2">Build Your Silhouette</h1>
            <p className="text-[#F5E7C1]/70 text-xs tracking-widest uppercase">Curate 3 pieces for a 15% Atelier Discount.</p>
          </motion.div>

          {renderSelectionRow("Tops", selectedTop, setSelectedTop)}
          {renderSelectionRow("Bottoms", selectedBottom, setSelectedBottom)}
          {renderSelectionRow("Outerwear", selectedOuterwear, setSelectedOuterwear)}
        </div>

        {/* RIGHT COL: Sticky Bundle Summary */}
        <div className="w-full lg:w-[400px] flex-shrink-0 relative">
          <div className="sticky top-12 bg-[#0B0B0B]/80 backdrop-blur-md border border-dashed border-[#C5A46D] p-8 shadow-2xl">
            <h2 className="text-2xl font-serif text-[#C5A46D] mb-6 text-center">The Curated Fit</h2>
            
            {/* Visual Slots */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                { label: "Base Layer", item: selectedTop },
                { label: "Trousers", item: selectedBottom },
                { label: "Outerwear", item: selectedOuterwear }
              ].map((slot, idx) => (
                <div key={idx} className="flex items-center gap-4 border border-dashed border-[#C5A46D]/30 p-2 bg-[#0F2B24]">
                  <div className="w-16 h-20 bg-[#0B0B0B] border border-dashed border-[#C5A46D]/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    {slot.item ? (
                      <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={slot.item.image} alt="slot" className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <span className="text-[#F5E7C1]/30 text-xs font-serif">?</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#C5A46D]">{slot.label}</p>
                    <p className="text-xs text-[#F5E7C1] font-serif mt-1">{slot.item ? slot.item.name : "Select an item"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-[#C5A46D]/30 pt-6 mb-6">
              <div className="flex justify-between text-xs text-[#F5E7C1]/70 mb-2 tracking-widest uppercase">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#C5A46D] mb-4 tracking-widest uppercase">
                <span>Silhouette Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end border-t border-dashed border-[#C5A46D]/30 pt-4">
                <span className="text-[10px] text-[#F5E7C1]/50 uppercase tracking-widest">Total</span>
                <span className="text-2xl font-serif text-[#C5A46D]">${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleAddBundle}
              disabled={subtotal === 0 || isProcessing}
              className="w-full py-4 border border-[#C5A46D] text-[#0F2B24] bg-[#C5A46D] hover:bg-[#F5E7C1] hover:border-[#F5E7C1] transition-all duration-300 font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(197,164,109,0.2)]"
            >
              {isProcessing ? "Curating..." : "Add Fit to Atelier Bag"}
            </button>
            
            {!isFullBundle && subtotal > 0 && (
              <p className="text-center text-[10px] text-[#C5A46D] mt-4 tracking-widest uppercase animate-pulse">
                Add {3 - [selectedTop, selectedBottom, selectedOuterwear].filter(Boolean).length} more items to unlock 15% off.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}