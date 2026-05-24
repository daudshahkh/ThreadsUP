"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";

export default function ThreadsUpStudioLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Heavy-Gauge Washed Tee",
      price: "$45.00",
      mainImage: "/product-1.png",         
      hoverImage: "/product-1-lifestyle.png" 
    },
    {
      id: 2,
      name: "Forest Hoodie",
      price: "$85.00",
      mainImage: "/product-2.jpg",        
      hoverImage: "/product-2-lifestyle.png"
    },
    {
      id: 3,
      name: "Tailored Cargo Pants",
      price: "$65.00",
      mainImage: "/product-3.webp",
      hoverImage: "/product-3-lifestyle.jpg"
    }
  ];

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
            className="fixed inset-0 z-[100] bg-[#0F2B24] flex flex-col items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-32 md:w-48 relative"
            >
              <img src="/logo.png" alt="Loading..." className="w-full h-auto" />
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-[1px] border-b border-dashed border-[#C5A46D] mt-4"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#0B0B0B]/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} 
              className="bg-[#0F2B24] border border-dashed border-[#C5A46D] p-8 max-w-lg w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-[#C5A46D] hover:text-[#F5E7C1] text-xl"
              >
                ✕
              </button>
              
              <h3 className="text-2xl font-serif text-[#C5A46D] mb-4 text-center">Fit & Care Guide</h3>
              <div className="w-full h-[1px] border-b border-dashed border-[#C5A46D]/30 mb-6"></div>
              
              <h4 className="text-[#F5E7C1] tracking-widest uppercase text-xs mb-3 text-center">Oversized / Drop-Shoulder Fit</h4>
              
              <table className="w-full text-left text-sm text-[#F5E7C1]/80 mb-6">
                <thead>
                  <tr className="border-b border-[#C5A46D]/20 text-[#C5A46D]">
                    <th className="py-2 font-normal">Size</th>
                    <th className="py-2 font-normal">Chest (in)</th>
                    <th className="py-2 font-normal">Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">S</td><td>44</td><td>28</td></tr>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">M</td><td>46</td><td>29</td></tr>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">L</td><td>48</td><td>30</td></tr>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">XL</td><td>50</td><td>31</td></tr>
                </tbody>
              </table>

              <div className="bg-[#0B0B0B] p-4 border border-dashed border-[#C5A46D]/30">
                <h4 className="text-[#C5A46D] tracking-widest uppercase text-xs mb-2">Care Instructions</h4>
                <p className="text-xs text-[#F5E7C1]/70 leading-relaxed">
                  Machine wash cold with like colors. Do not bleach. Hang dry to preserve fabric weight and prevent embroidery distortion. Iron inside-out on low heat if necessary.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-[#0F2B24] text-[#F5E7C1] min-h-screen font-sans selection:bg-[#C5A46D] selection:text-[#0F2B24] overflow-x-hidden relative">
        
        <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-60" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M-10,20 C 30,50 80,-10 110,40 S 20,80 120,90" fill="transparent" stroke="#C5A46D" strokeWidth="0.2" />
          <path d="M110,40 C 80,60 10,30 -10,70" fill="transparent" stroke="#C5A46D" strokeWidth="0.1" strokeDasharray="1,1" />
        </svg>

        <header className="absolute top-0 right-0 p-6 md:p-10 z-50">
          <Show when="signed-out">
            <a href="/login" className="text-[#C5A46D] font-light tracking-widest text-xs uppercase hover:text-[#F5E7C1] transition-colors border-b border-dashed border-transparent hover:border-[#C5A46D]">
              Sign In
            </a>
          </Show>
          <Show when="signed-in">
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-10 h-10 border border-dashed border-[#C5A46D]" } }} />
          </Show>
        </header>

        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 pt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.5 }} 
            className="w-48 md:w-64 mb-6 drop-shadow-2xl relative z-20"
          >
            <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-full h-auto object-contain" />
          </motion.div>

          <div className="relative z-20 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 1.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#C5A46D] tracking-tight mb-2 drop-shadow-lg"
            >
              THREADS THAT SPEAK.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.1 }}
              className="text-sm md:text-lg text-[#F5E7C1] font-light tracking-widest uppercase mb-10"
            >
              Luxury Designs. Modern Streetwear.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#collection" className="px-8 py-3 bg-[#0F2B24] border border-dashed border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0F2B24] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                Shop Collection
              </a>
              <a href="#lookbook" className="px-8 py-3 bg-[#0F2B24] border border-dashed border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0F2B24] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)]">
                View Lookbook
              </a>
            </motion.div>
          </div>
        </section>

        <section id="lookbook" className="py-24 px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex items-center gap-4">
              <h2 className="text-3xl font-serif text-[#C5A46D]">Campaign Vol. 1</h2>
              <div className="flex-grow h-[1px] border-b border-dashed border-[#C5A46D] opacity-30"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div whileHover={{ scale: 0.98 }} className="relative group bg-[#0F2B24] p-4 border border-[#C5A46D] border-dashed shadow-2xl">
                <div className="w-full h-[350px] overflow-hidden bg-[#0B0B0B]">
                  <img src="/lookbook-1.jpg" alt="Lookbook 1" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="mt-4 text-[#C5A46D] font-serif text-lg text-center">Premium Oversized Tees</p>
              </motion.div>

              <motion.div whileHover={{ scale: 0.98 }} className="relative group bg-[#0F2B24] p-4 border border-[#C5A46D] border-dashed shadow-2xl md:mt-16">
                <div className="w-full h-[350px] overflow-hidden bg-[#0B0B0B]">
                  <img src="/lookbook-2.jpg" alt="Lookbook 2" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <p className="mt-4 text-[#C5A46D] font-serif text-lg text-center">Embroidered Streetwear</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="collection" className="py-24 px-6 md:px-12 lg:px-24 bg-[#0B0B0B]/40 backdrop-blur-sm relative z-10 border-y border-dashed border-[#C5A46D]/30">
          <div className="max-w-6xl mx-auto">
             <div className="mb-12 flex items-center gap-4">
              <div className="flex-grow h-[1px] border-b border-dashed border-[#C5A46D] opacity-30"></div>
              <h2 className="text-3xl font-serif text-[#C5A46D]">Minimal Collection</h2>
              <div className="flex-grow h-[1px] border-b border-dashed border-[#C5A46D] opacity-30"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <a href={`/product/${product.id}`} key={product.id} className="block group">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center bg-[#0F2B24] p-3 border border-[#C5A46D] border-dashed hover:bg-[#153A31] transition-colors duration-500"
                  >
                    <div className="w-full h-[250px] overflow-hidden mb-4 bg-[#0B0B0B] relative cursor-pointer">
                      <img 
                        src={product.mainImage} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-0 transition-opacity duration-700" 
                      />
                      <img 
                        src={product.hoverImage} 
                        alt={`${product.name} Lifestyle`} 
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-80 transition-opacity duration-700" 
                      />
                    </div>
                    
                    <h3 className="font-serif text-[#F5E7C1] text-sm text-center">{product.name}</h3>
                    <p className="text-[#C5A46D] font-light tracking-wider text-xs mt-1">{product.price}</p>
                    
                    <button 
                      onClick={(e) => {
                        e.preventDefault(); 
                        setIsModalOpen(true);
                      }}
                      className="mt-4 text-[#F5E7C1]/50 hover:text-[#C5A46D] text-[10px] uppercase tracking-widest border-b border-dashed border-transparent hover:border-[#C5A46D] transition-all duration-300 relative z-20"
                    >
                      Size & Care Guide
                    </button>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto border border-[#C5A46D] border-dashed p-10 bg-[#0F2B24]/80 backdrop-blur-md"
          >
            <h2 className="text-4xl font-serif text-[#C5A46D] mb-6">Crafted To Be Worn Daily.</h2>
            <p className="text-sm text-[#F5E7C1]/80 font-light leading-relaxed">
              THREADSUP STUDIO blends unparalleled craftsmanship, rich tailoring culture, and modern streetwear into wearable identity pieces. Every stitch is an intentional statement.
            </p>
          </motion.div>
        </section>

        <footer className="bg-[#0B0B0B] pt-16 pb-8 px-6 md:px-12 relative z-10 border-t border-dashed border-[#C5A46D]/50">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-24 mb-6 opacity-80" />
            <p className="text-[#F5E7C1]/40 text-xs tracking-widest uppercase">
              © 2026 THREADSUP STUDIO. All Rights Reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}