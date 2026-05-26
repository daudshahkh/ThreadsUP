"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/SiteNav";
import { formatPrice, productCatalog } from "@/data/products";
import { studioCollections } from "@/data/collections";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const lowerQuery = query.toLowerCase();

  // 1. Search the standard product catalog
  const standardResults = productCatalog.filter(
    (p) => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery)
  );

  // 2. Search the Paws & Pause collection catalog and ADAPT the data to match
  let collectionResults: any[] = [];
  studioCollections.forEach((collection) => {
    const items = (collection as any).products || (collection as any).items || [];
    items.forEach((p: any) => {
      if (p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery)) {
        collectionResults.push({
          ...p,
          id: p.slug, // Adapt slug to ID
          mainImage: p.frontImage, // Adapt image naming
          hoverImage: p.backImage,
        });
      }
    });
  });

  // Combine both searches into one massive master list
  const finalResults = [...standardResults, ...collectionResults];

  return (
    <div className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">Search Results</h1>
        <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">
          {finalResults.length} {finalResults.length === 1 ? "result" : "results"} for "{query}"
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        <AnimatePresence>
          {finalResults.map((product, index) => (
            <motion.div key={product.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Link href={`/product/${product.id}`} className="block group">
                <div className="flex flex-col items-center bg-[#07110F]/40 p-4 border border-[#D0A85C]/20 border-dashed hover:bg-[#123229] hover:border-[#D0A85C] transition-all duration-500 shadow-lg">
                  <div className="w-full aspect-[4/5] overflow-hidden mb-6 bg-[#07110F] relative">
                    <img src={product.mainImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
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

      {finalResults.length === 0 && (
        <div className="text-center py-24 border border-dashed border-[#D0A85C]/30 bg-[#07110F]/50 mt-10">
          <p className="text-[#F6E9C8]/50 font-serif text-xl mb-4">No pieces match your search.</p>
          <Link href="/shop" className="text-[10px] text-[#D0A85C] uppercase tracking-widest border-b border-dashed border-[#D0A85C] hover:text-[#F6E9C8] transition-colors pb-1">Return to Collection</Link>
        </div>
      )}
    </div>
  );
}

// Wrap the main page in a Suspense boundary (Next.js requirement for useSearchParams)
export default function SearchPage() {
  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <SiteNav position="relative" />
      <Suspense fallback={<div className="text-center py-32 text-[#D0A85C] font-serif text-2xl">Searching archive...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}