"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CollectionMarquee from "@/components/CollectionMarquee";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";
import { studioCollections } from "@/data/collections";
import { formatPrice, productCatalog } from "@/data/products";

export default function ThreadsUpStudioLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const products = productCatalog.slice(0, 3);
  const pawsAndPause = studioCollections.find((collection) => collection.slug === "paws-and-pause");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#0B1F1A] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, ease: "easeOut" }} className="w-32 md:w-48 relative">
              <img src="/logo.png" alt="Loading..." className="w-full h-auto" />
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="h-[1px] border-b border-dashed border-[#D0A85C] mt-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#07110F]/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#0B1F1A] border border-dashed border-[#D0A85C] p-8 max-w-lg w-full shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-[#D0A85C] hover:text-[#F6E9C8] text-xl">x</button>
              <h3 className="text-2xl font-serif text-[#D0A85C] mb-4 text-center">Fit & Care Guide</h3>
              <div className="w-full h-[1px] border-b border-dashed border-[#D0A85C]/30 mb-6" />
              <h4 className="text-[#F6E9C8] tracking-widest uppercase text-xs mb-3 text-center">Oversized / Drop-Shoulder Fit</h4>
              <table className="w-full text-left text-sm text-[#F6E9C8]/80 mb-6">
                <thead>
                  <tr className="border-b border-[#D0A85C]/20 text-[#D0A85C]">
                    <th className="py-2 font-normal">Size</th>
                    <th className="py-2 font-normal">Chest (in)</th>
                    <th className="py-2 font-normal">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["S", "44", "28"],
                    ["M", "46", "29"],
                    ["L", "48", "30"],
                    ["XL", "50", "31"],
                  ].map(([size, chest, length]) => (
                    <tr key={size} className="border-b border-[#D0A85C]/10">
                      <td className="py-2">{size}</td>
                      <td>{chest}</td>
                      <td>{length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-[#07110F] p-4 border border-dashed border-[#D0A85C]/30">
                <h4 className="text-[#D0A85C] tracking-widest uppercase text-xs mb-2">Care Instructions</h4>
                <p className="text-xs text-[#F6E9C8]/70 leading-relaxed">
                  Machine wash cold with like colors. Do not bleach. Hang dry to preserve fabric weight and prevent embroidery distortion. Iron inside-out on low heat if necessary.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] overflow-x-hidden relative">
        <ThreadBackground opacity="opacity-60" />
        <SiteNav position="absolute" />

        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 pt-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1.5 }} className="w-48 md:w-64 mb-6 drop-shadow-2xl relative z-20">
            <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-full h-auto object-contain" />
          </motion.div>

          <div className="relative z-20 flex flex-col items-center">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut", delay: 1.8 }} className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#D0A85C] tracking-tight mb-2 drop-shadow-lg">
              THREADS THAT SPEAK.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.1 }} className="text-sm md:text-lg text-[#F6E9C8] font-light tracking-widest uppercase mb-10">
              Luxury Designs. Modern Streetwear.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2.4 }} className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="px-8 py-3 bg-[#0B1F1A] border border-dashed border-[#D0A85C] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                Shop Collection
              </Link>
              <Link href="/lookbook" className="px-8 py-3 bg-[#0B1F1A] border border-dashed border-[#D0A85C] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                View Lookbook
              </Link>
            </motion.div>
          </div>
        </section>

        <section id="lookbook" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex items-center gap-4">
              <h2 className="text-3xl font-serif text-[#D0A85C]">Campaign Vol. 1</h2>
              <div className="flex-grow h-[1px] border-b border-dashed border-[#D0A85C] opacity-30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div whileHover={{ scale: 0.98 }} className="relative group bg-[#0B1F1A] p-4 border border-[#D0A85C] border-dashed shadow-2xl">
                <div className="w-full h-[350px] overflow-hidden bg-[#07110F]">
                  <img src="/product-1.png" alt="Lookbook 1" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="mt-4 text-[#D0A85C] font-serif text-lg text-center">Premium Oversized Tees</p>
              </motion.div>

              <motion.div whileHover={{ scale: 0.98 }} className="relative group bg-[#0B1F1A] p-4 border border-[#D0A85C] border-dashed shadow-2xl md:mt-16">
                <div className="w-full h-[350px] overflow-hidden bg-[#07110F]">
                  <img src="/product-1-lifestyle.png" alt="Lookbook 2" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="mt-4 text-[#D0A85C] font-serif text-lg text-center">Embroidered Streetwear</p>
              </motion.div>
            </div>
          </div>
        </section>

        {pawsAndPause && <CollectionMarquee collection={pawsAndPause} />}

        <section id="collection" className="py-24 px-6 md:px-12 lg:px-24 bg-[#07110F]/40 backdrop-blur-sm relative z-10 border-y border-dashed border-[#D0A85C]/30">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex items-center gap-4">
              <div className="flex-grow h-[1px] border-b border-dashed border-[#D0A85C] opacity-30" />
              <h2 className="text-3xl font-serif text-[#D0A85C]">Minimal Collection</h2>
              <div className="flex-grow h-[1px] border-b border-dashed border-[#D0A85C] opacity-30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex flex-col items-center bg-[#0B1F1A] p-3 border border-[#D0A85C] border-dashed hover:bg-[#123229] transition-colors duration-500 group">
                  <Link href={`/product/${product.id}`} className="block w-full">
                    <div className="w-full h-[250px] overflow-hidden mb-4 bg-[#07110F] relative cursor-pointer">
                      <img src={product.mainImage} alt={product.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
                      <img src={product.hoverImage} alt={`${product.name} Lifestyle`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-700" />
                    </div>
                    <h3 className="font-serif text-[#F6E9C8] text-sm text-center">{product.name}</h3>
                    <p className="text-[#D0A85C] font-light tracking-wider text-xs mt-1 text-center">{formatPrice(product.price)}</p>
                  </Link>

                  <button onClick={() => setIsModalOpen(true)} className="mt-4 text-[#F6E9C8]/50 hover:text-[#D0A85C] text-[10px] uppercase tracking-widest border-b border-dashed border-transparent hover:border-[#D0A85C] transition-all duration-300 relative z-20">
                    Size & Care Guide
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="max-w-2xl mx-auto border border-[#D0A85C] border-dashed p-10 bg-[#0B1F1A]/80 backdrop-blur-md">
            <h2 className="text-4xl font-serif text-[#D0A85C] mb-6">Crafted To Be Worn Daily.</h2>
            <p className="text-sm text-[#F6E9C8]/80 font-light leading-relaxed">
              THREADSUP STUDIO blends unparalleled craftsmanship, rich tailoring culture, and modern streetwear into wearable identity pieces. Every stitch is an intentional statement.
            </p>
          </motion.div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
