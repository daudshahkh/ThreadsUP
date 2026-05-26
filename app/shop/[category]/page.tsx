"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/SiteNav";

// 1. Import BOTH of your data files!
import { formatPrice, productCatalog } from "@/data/products";
import { studioCollections } from "@/data/collections";

export default function CategoryPage() {
  const params = useParams();
  const rawCategory = params.category as string;

  // The Magic Decoder
  let formattedCategory = "";
  if (rawCategory === "paws-and-pause") {
    formattedCategory = "Paws & Pause";
  } else {
    formattedCategory = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();
  }

  // 2. The Smart Data Router
  let filteredProducts: any[] = []; 

  if (rawCategory === "paws-and-pause") {
    // We add 'as any' here to tell TypeScript to relax its strict blueprint rules for a moment
    const targetCollection = studioCollections.find((col) => col.slug === "paws-and-pause") as any;
    
    // We fetch the 'products' array from your collection
    filteredProducts = targetCollection?.products || [];
  } else {
    // Otherwise, filter standard categories from products.ts
    filteredProducts = productCatalog.filter(
      (product) => product.category === formattedCategory
    );
  }

  const displayCategories: string[] = ["All", "Tops", "Bottoms", "Outerwear", "Paws & Pause"];

  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      
      <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M-10,20 C 30,50 80,-10 110,40 S 20,80 120,90" fill="transparent" stroke="#D0A85C" strokeWidth="0.2" />
        <path d="M110,40 C 80,60 10,30 -10,70" fill="transparent" stroke="#D0A85C" strokeWidth="0.1" strokeDasharray="1,1" />
      </svg>

      <SiteNav position="relative" />

      <div className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">{formattedCategory}</h1>
          <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">The Atelier Collection.</p>
        </motion.div>

        {/* Dynamic Filter Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 border-b border-dashed border-[#D0A85C]/30 pb-6 mb-12">
          {displayCategories.map((cat) => {
            const urlFormat = cat.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
            
            return (
              <Link
                key={cat}
                href={cat === "All" ? "/shop" : `/shop/${urlFormat}`}
                className={`text-xs uppercase tracking-widest transition-all duration-300 ${
                  formattedCategory === cat 
                  ? "text-[#D0A85C] border-b border-dashed border-[#D0A85C] pb-2" 
                  : "text-[#F6E9C8]/50 hover:text-[#D0A85C] pb-2 border-b border-dashed border-transparent hover:border-[#D0A85C]/50"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
                    <div className="w-full aspect-[4/5] overflow-hidden mb-6 bg-[#07110F] relative">
                      <img src={product.mainImage || product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
                      {product.hoverImage && (
                         <img src={product.hoverImage} alt={`${product.name} Lifestyle`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100" />
                      )}
                    </div>
                    <h3 className="font-serif text-[#F6E9C8] text-lg text-center group-hover:text-[#D0A85C] transition-colors duration-300">{product.name}</h3>
                    <p className="text-[#D0A85C]/80 font-light tracking-widest text-sm mt-2">{formatPrice(product.price)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[#F6E9C8]/50 font-serif text-xl">No {formattedCategory.toLowerCase()} available at this time.</p>
          </div>
        )}
      </div>
    </main>
  );
}