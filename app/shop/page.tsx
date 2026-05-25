"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";
import { categories, formatPrice, productCatalog } from "@/data/products";

export default function ShopPage() {
  const { openCart, items } = useCartStore();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? productCatalog 
    : productCatalog.filter(product => product.category === activeCategory);

  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      
      {/* Background Thread */}
      <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M-10,20 C 30,50 80,-10 110,40 S 20,80 120,90" fill="transparent" stroke="#D0A85C" strokeWidth="0.2" />
        <path d="M110,40 C 80,60 10,30 -10,70" fill="transparent" stroke="#D0A85C" strokeWidth="0.1" strokeDasharray="1,1" />
      </svg>

      {/* Navigation */}
      <nav className="relative z-20 p-6 md:px-10 flex justify-between items-center border-b border-dashed border-[#D0A85C]/30 bg-[#07110F]/50 backdrop-blur-md">
        <Link href="/" className="w-20 md:w-28 drop-shadow-xl hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-full h-auto object-contain" />
        </Link>
        
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/shop" className="text-[#F6E9C8]/70 hover:text-[#D0A85C] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1">
            Collection
          </Link>
          <Link href="/bundler" className="text-[#D0A85C] tracking-widest text-[10px] uppercase border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1">
            Curate a Fit
          </Link>
          <Link href="/lookbook" className="text-[#F6E9C8]/70 hover:text-[#D0A85C] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1">
            Lookbook
          </Link>
        </div>

        <div className="flex items-center gap-6 md:gap-8">
          <button onClick={openCart} className="relative text-[#D0A85C] hover:text-[#F6E9C8] transition-colors group">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0A85C] opacity-40"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D0A85C] text-[#0B1F1A] text-[9px] items-center justify-center font-bold">
                  {items.length}
                </span>
              </span>
            )}
          </button>
          
          <div className="h-4 w-[1px] bg-[#D0A85C]/30 hidden sm:block"></div>

          <Show when="signed-out">
            <Link href="/login" className="text-[#D0A85C] font-light tracking-widest text-[10px] uppercase hover:text-[#F6E9C8] transition-colors border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1">
              Sign In
            </Link>
          </Show>
          <Show when="signed-in">
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-7 h-7 border border-dashed border-[#D0A85C]" } }} />
          </Show>
        </div>
      </nav>

      {/* Shop Header & Filters */}
      <div className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">The Atelier Collection</h1>
          <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">Every thread intentionally placed.</p>
        </motion.div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-b border-dashed border-[#D0A85C]/30 pb-6 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`text-xs uppercase tracking-widest transition-all duration-300 ${
                activeCategory === category 
                ? "text-[#D0A85C] border-b border-dashed border-[#D0A85C] pb-2" 
                : "text-[#F6E9C8]/50 hover:text-[#D0A85C] pb-2 border-b border-dashed border-transparent hover:border-[#D0A85C]/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/product/${product.id}`} className="block group">
                  <div className="flex flex-col items-center bg-[#07110F]/40 p-4 border border-[#D0A85C]/20 border-dashed hover:bg-[#123229] hover:border-[#D0A85C] transition-all duration-500 shadow-lg">
                    
                    {/* Image Container with Hover Swap */}
                    <div className="w-full aspect-[4/5] overflow-hidden mb-6 bg-[#07110F] relative">
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-700" 
                      />
                      <img 
                        src={product.hoverImage} 
                        alt={`${product.name} Lifestyle`} 
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100" 
                      />
                      
                      {/* Floating Category Tag */}
                      <div className="absolute top-3 left-3 px-3 py-1 bg-[#0B1F1A]/90 backdrop-blur-sm border border-dashed border-[#D0A85C]/50">
                        <span className="text-[9px] text-[#D0A85C] uppercase tracking-widest">{product.category}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-serif text-[#F6E9C8] text-lg text-center group-hover:text-[#D0A85C] transition-colors duration-300">{product.name}</h3>
                    <p className="text-[#D0A85C]/80 font-light tracking-widest text-sm mt-2">{formatPrice(product.price)}</p>
                    
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#F6E9C8]/50 font-serif text-xl">No garments found in this collection.</p>
          </div>
        )}
      </div>
    </main>
  );
}
