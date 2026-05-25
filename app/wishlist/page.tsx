"use client";

import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";
import { formatPrice, productCatalog } from "@/data/products";

export default function WishlistPage() {
  const saved = productCatalog.slice(0, 3);

  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav />

      <section className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">Saved Pieces</h1>
          <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">A quiet shortlist for your next fit.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {saved.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="block group">
              <div className="flex flex-col items-center bg-[#07110F]/40 p-4 border border-[#D0A85C]/20 border-dashed hover:bg-[#123229] hover:border-[#D0A85C] transition-all duration-500 shadow-lg">
                <div className="w-full aspect-[4/5] overflow-hidden mb-6 bg-[#07110F] relative">
                  <img src={product.mainImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
                  <img src={product.hoverImage} alt={`${product.name} Lifestyle`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-700 scale-105 group-hover:scale-100" />
                </div>
                <h2 className="font-serif text-[#F6E9C8] text-lg text-center group-hover:text-[#D0A85C] transition-colors duration-300">{product.name}</h2>
                <p className="text-[#D0A85C]/80 font-light tracking-widest text-sm mt-2">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

