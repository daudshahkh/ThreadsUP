"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";
import { formatPrice, Product, ProductCategory, productCatalog } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

export default function BundlerPage() {
  const { openCart, addItem } = useCartStore();
  const [selectedTop, setSelectedTop] = useState<Product | null>(null);
  const [selectedBottom, setSelectedBottom] = useState<Product | null>(null);
  const [selectedOuterwear, setSelectedOuterwear] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = (selectedTop?.price || 0) + (selectedBottom?.price || 0) + (selectedOuterwear?.price || 0);
  const isFullBundle = selectedTop && selectedBottom && selectedOuterwear;
  const discount = isFullBundle ? subtotal * 0.15 : 0;
  const finalPrice = subtotal - discount;

  const handleAddBundle = () => {
    setIsProcessing(true);

    if (selectedTop) addItem({ productId: selectedTop.id, name: selectedTop.name, price: formatPrice(selectedTop.price), size: "L", image: selectedTop.mainImage });
    if (selectedBottom) addItem({ productId: selectedBottom.id, name: selectedBottom.name, price: formatPrice(selectedBottom.price), size: "32", image: selectedBottom.mainImage });
    if (selectedOuterwear) addItem({ productId: selectedOuterwear.id, name: selectedOuterwear.name, price: formatPrice(selectedOuterwear.price), size: "L", image: selectedOuterwear.mainImage });

    setTimeout(() => {
      setIsProcessing(false);
      openCart();
    }, 800);
  };

  const renderSelectionRow = (category: ProductCategory, currentSelection: Product | null, setSelection: (product: Product | null) => void) => {
    const categoryProducts = productCatalog.filter((product) => product.category === category);

    return (
      <div className="mb-12">
        <h3 className="text-[#D0A85C] font-serif text-xl mb-4 border-b border-dashed border-[#D0A85C]/30 pb-2">
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
                className={`snap-start flex-shrink-0 w-40 flex flex-col items-center bg-[#07110F] p-2 border border-dashed transition-all duration-300 ${
                  isSelected ? "border-[#D0A85C] shadow-[0_0_15px_rgba(208,168,92,0.3)] opacity-100" : "border-transparent opacity-60 hover:opacity-100 hover:border-[#D0A85C]/50"
                }`}
              >
                <div className="w-full aspect-[4/5] bg-[#0B1F1A] mb-3 overflow-hidden relative">
                  <img src={product.mainImage} alt={product.name} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#D0A85C] text-[#0B1F1A] flex items-center justify-center text-xs font-bold">*</div>
                  )}
                </div>
                <p className="text-[10px] text-[#F6E9C8] text-center font-serif leading-tight">{product.name}</p>
                <p className="text-[10px] text-[#D0A85C] tracking-widest mt-1">{formatPrice(product.price)}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-x-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav active="bundler" />

      <div className="relative z-10 flex-grow max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 lg:pr-8 lg:border-r border-dashed border-[#D0A85C]/30">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-4xl font-serif text-[#D0A85C] mb-2">Build Your Silhouette</h1>
            <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">Curate 3 pieces for a 15% Atelier Discount.</p>
          </motion.div>

          {renderSelectionRow("Tops", selectedTop, setSelectedTop)}
          {renderSelectionRow("Bottoms", selectedBottom, setSelectedBottom)}
          {renderSelectionRow("Outerwear", selectedOuterwear, setSelectedOuterwear)}
        </div>

        <div className="w-full lg:w-[400px] flex-shrink-0 relative">
          <div className="sticky top-12 bg-[#07110F]/80 backdrop-blur-md border border-dashed border-[#D0A85C] p-8 shadow-2xl">
            <h2 className="text-2xl font-serif text-[#D0A85C] mb-6 text-center">The Curated Fit</h2>

            <div className="flex flex-col gap-4 mb-8">
              {[
                { label: "Base Layer", item: selectedTop },
                { label: "Trousers", item: selectedBottom },
                { label: "Outerwear", item: selectedOuterwear },
              ].map((slot) => (
                <div key={slot.label} className="flex items-center gap-4 border border-dashed border-[#D0A85C]/30 p-2 bg-[#0B1F1A]">
                  <div className="w-16 h-20 bg-[#07110F] border border-dashed border-[#D0A85C]/20 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    {slot.item ? (
                      <motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} src={slot.item.mainImage} alt={slot.item.name} className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <span className="text-[#F6E9C8]/30 text-xs font-serif">?</span>
                    )}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#D0A85C]">{slot.label}</p>
                    <p className="text-xs text-[#F6E9C8] font-serif mt-1">{slot.item ? slot.item.name : "Select an item"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-dashed border-[#D0A85C]/30 pt-6 mb-6">
              <div className="flex justify-between text-xs text-[#F6E9C8]/70 mb-2 tracking-widest uppercase">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#D0A85C] mb-4 tracking-widest uppercase">
                <span>Silhouette Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
              <div className="flex justify-between items-end border-t border-dashed border-[#D0A85C]/30 pt-4">
                <span className="text-[10px] text-[#F6E9C8]/50 uppercase tracking-widest">Total</span>
                <span className="text-2xl font-serif text-[#D0A85C]">{formatPrice(finalPrice)}</span>
              </div>
            </div>

            <button
              onClick={handleAddBundle}
              disabled={subtotal === 0 || isProcessing}
              className="w-full py-4 border border-[#D0A85C] text-[#0B1F1A] bg-[#D0A85C] hover:bg-[#F6E9C8] hover:border-[#F6E9C8] transition-all duration-300 font-bold uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(208,168,92,0.2)]"
            >
              {isProcessing ? "Curating..." : "Add Fit to Atelier Bag"}
            </button>

            {!isFullBundle && subtotal > 0 && (
              <p className="text-center text-[10px] text-[#D0A85C] mt-4 tracking-widest uppercase animate-pulse">
                Add {3 - [selectedTop, selectedBottom, selectedOuterwear].filter(Boolean).length} more items to unlock 15% off.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

