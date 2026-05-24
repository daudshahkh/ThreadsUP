"use client";

import React, { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Bag");

  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSelectSizeModalOpen, setIsSelectSizeModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"cart" | "buy" | null>(null);

  const { addItem, openCart, items } = useCartStore();

  // PHYSICS REF: This tracks the edges of our draggable area
  const carouselRef = useRef(null);

  const products = {
    "1": {
      name: "Heavy-Gauge Washed Tee",
      price: "$45.00",
      description: "A staple for the modern wardrobe. This oversized, drop-shoulder silhouette is crafted from premium 240 GSM heavyweight cotton, providing a structured yet effortless drape. Pre-washed for a vintage feel with our signature tonal embroidery.",
      images: ["/product-1.png", "/product-1-lifestyle.png", "/product-1.png", "/product-1-lifestyle.png"], 
      sizes: ["S", "M", "L", "XL"],
      details: ["240 GSM Heavyweight Cotton", "Drop-Shoulder Fit", "Embroidered Logo", "Made to Endure"]
    },
    "2": {
      name: "Forest Hoodie",
      price: "$85.00",
      description: "Heavyweight luxury. Crafted with a dense loopback french terry, featuring custom antique gold-tone eyelets and a double-lined hood. The intricate threadwork on the sleeve represents hours of dedicated craftsmanship.",
      images: ["/product-2.jpg", "/product-2-lifestyle.png"],
      sizes: ["S", "M", "L", "XL", "XXL"],
      details: ["400 GSM French Terry", "Double-Lined Hood", "Gold-Tone Hardware", "Oversized Fit"]
    },
    "3": {
      name: "Tailored Cargo Pants",
      price: "$65.00",
      description: "Utilitarian design meets bespoke tailoring. Constructed from a durable yet soft cotton twill, featuring reinforced stitched seams, deep gusseted pockets, and an adjustable waist for the perfect modern drape.",
      images: ["/product-3.webp", "/product-3-lifestyle.jpg"],
      sizes: ["30", "32", "34", "36"],
      details: ["Premium Cotton Twill", "Reinforced Stitching", "Adjustable Waist", "Relaxed Straight Leg"]
    }
  };

  const product = products[productId as keyof typeof products];

  const executeAddToCart = (sizeToUse: string) => {
    addItem({ productId, name: product.name, price: product.price, size: sizeToUse, image: product.images[0] });
    setIsAdding(true);
    setButtonText("Stitching...");
    setTimeout(() => {
      setButtonText("Added ✦");
      setIsAdding(false);
      setTimeout(() => setButtonText("Add to Bag"), 2000);
    }, 800);
  };

  const handleAddToCart = () => {
    if (!selectedSize) { setPendingAction("cart"); setIsSelectSizeModalOpen(true); return; }
    executeAddToCart(selectedSize);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setPendingAction("buy"); setIsSelectSizeModalOpen(true); return; }
    alert("Proceeding to secure checkout...");
  };

  const handleModalSizeSelect = (size: string) => {
    setSelectedSize(size);
    setIsSelectSizeModalOpen(false);
    if (pendingAction === "cart") { executeAddToCart(size); } 
    else if (pendingAction === "buy") { alert("Proceeding to secure checkout..."); }
    setPendingAction(null);
  };

  if (!product) return <div className="min-h-screen bg-[#0F2B24] text-[#C5A46D] flex items-center justify-center font-serif text-2xl">Product not found.</div>;

  return (
    <>
      {/* Smart Select Size Modal */}
      <AnimatePresence>
        {isSelectSizeModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0B0B]/80 backdrop-blur-md" onClick={() => setIsSelectSizeModalOpen(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#0F2B24] border border-dashed border-[#C5A46D] p-8 max-w-sm w-full shadow-2xl relative flex flex-col items-center">
              <button onClick={() => setIsSelectSizeModalOpen(false)} className="absolute top-4 right-4 text-[#C5A46D] hover:text-[#F5E7C1] text-xl">✕</button>
              <h3 className="text-2xl font-serif text-[#C5A46D] mb-2 text-center">Select Your Size</h3>
              <p className="text-xs text-[#F5E7C1]/60 tracking-widest uppercase mb-6 text-center">Choose a size to continue</p>
              <div className="flex gap-3 flex-wrap justify-center w-full">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => handleModalSizeSelect(size)} className="w-14 h-14 flex items-center justify-center border border-dashed border-[#C5A46D]/50 text-[#C5A46D] hover:border-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0F2B24] transition-all duration-300 font-serif text-xl">{size}</button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fit & Care Guide Modal */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0B0B0B]/80 backdrop-blur-md" onClick={() => setIsSizeGuideOpen(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#0F2B24] border border-dashed border-[#C5A46D] p-8 max-w-lg w-full shadow-2xl relative">
              <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4 text-[#C5A46D] hover:text-[#F5E7C1] text-xl">✕</button>
              <h3 className="text-2xl font-serif text-[#C5A46D] mb-4 text-center">Fit & Care Guide</h3>
              <div className="w-full h-[1px] border-b border-dashed border-[#C5A46D]/30 mb-6"></div>
              <h4 className="text-[#F5E7C1] tracking-widest uppercase text-xs mb-3 text-center">Oversized / Drop-Shoulder Fit</h4>
              <table className="w-full text-left text-sm text-[#F5E7C1]/80 mb-6">
                <thead><tr className="border-b border-[#C5A46D]/20 text-[#C5A46D]"><th className="py-2 font-normal">Size</th><th className="py-2 font-normal">Chest (in)</th><th className="py-2 font-normal">Length (in)</th></tr></thead>
                <tbody>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">S</td><td>44</td><td>28</td></tr>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">M</td><td>46</td><td>29</td></tr>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">L</td><td>48</td><td>30</td></tr>
                  <tr className="border-b border-[#C5A46D]/10"><td className="py-2">XL</td><td>50</td><td>31</td></tr>
                </tbody>
              </table>
              <div className="bg-[#0B0B0B] p-4 border border-dashed border-[#C5A46D]/30">
                <h4 className="text-[#C5A46D] tracking-widest uppercase text-xs mb-2">Care Instructions</h4>
                <p className="text-xs text-[#F5E7C1]/70 leading-relaxed">Machine wash cold with like colors. Do not bleach. Hang dry to preserve fabric weight and prevent embroidery distortion.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-[#0F2B24] text-[#F5E7C1] min-h-screen font-sans selection:bg-[#C5A46D] selection:text-[#0F2B24] relative overflow-hidden flex flex-col">
        <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100"><path d="M-10,20 C 30,50 80,-10 110,40 S 20,80 120,90" fill="transparent" stroke="#C5A46D" strokeWidth="0.2" /></svg>

        <nav className="relative z-20 p-6 md:px-10 flex justify-between items-center border-b border-dashed border-[#C5A46D]/30 bg-[#0B0B0B]/50 backdrop-blur-md">
          <a href="/" className="w-20 md:w-28 drop-shadow-xl hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-full h-auto object-contain" />
          </a>
          <div className="hidden lg:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
            <a href="/shop" className="text-[#F5E7C1]/70 hover:text-[#C5A46D] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#C5A46D] pb-1">Collection</a>
            <a href="/#lookbook" className="text-[#F5E7C1]/70 hover:text-[#C5A46D] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#C5A46D] pb-1">Lookbook</a>
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

        <div className="flex-grow flex items-center justify-center relative z-10 py-10 px-4 w-full">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
            
            <div className="flex flex-col gap-4 w-full mx-auto md:ml-auto" style={{ maxWidth: '360px' }}>
              <motion.div key={activeImageIndex} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="w-full aspect-[4/5] bg-[#0B0B0B] border border-dashed border-[#C5A46D] p-1.5 shadow-xl">
                <img src={product.images[activeImageIndex]} alt={`${product.name} Main View`} className="w-full h-full object-cover pointer-events-none" />
              </motion.div>

              {/* --- NEW PHYSICS CAROUSEL --- */}
              <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-4 relative">
                <motion.div 
                  drag="x" 
                  dragConstraints={carouselRef}
                  dragElastic={0.2}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  className="flex gap-3 w-max"
                >
                  {product.images.map((img, index) => (
                    <motion.div 
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`w-20 h-24 flex-shrink-0 relative p-1 transition-all duration-300 pointer-events-auto ${
                        activeImageIndex === index ? "border border-dashed border-[#C5A46D] opacity-100 shadow-[0_0_10px_rgba(197,164,109,0.3)]" : "border border-transparent opacity-50 hover:opacity-90"
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover bg-[#0B0B0B] pointer-events-none" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col w-full mx-auto md:mr-auto" style={{ maxWidth: '400px' }}>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-3xl font-serif text-[#C5A46D] mb-1">{product.name}</h1>
                <p className="text-lg font-light text-[#F5E7C1] tracking-wider mb-5">{product.price}</p>
                <div className="w-full h-[1px] border-b border-dashed border-[#C5A46D]/30 mb-5"></div>
                <p className="text-sm text-[#F5E7C1]/80 font-light leading-relaxed mb-6">{product.description}</p>
                <ul className="mb-6 space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-xs font-light text-[#C5A46D] tracking-wide"><span className="mr-3 text-[8px]">✦</span> {detail}</li>
                  ))}
                </ul>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#F5E7C1]">Select Size</span>
                    <button onClick={(e) => { e.preventDefault(); setIsSizeGuideOpen(true); }} className="text-[10px] text-[#C5A46D] uppercase tracking-widest hover:underline decoration-dashed underline-offset-4">Size Guide</button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button key={size} onClick={() => setSelectedSize(size)} className={`w-10 h-10 flex items-center justify-center border border-dashed transition-all duration-300 font-serif text-sm ${selectedSize === size ? "border-[#C5A46D] bg-[#C5A46D] text-[#0F2B24]" : "border-[#C5A46D]/50 text-[#C5A46D] hover:border-[#C5A46D] hover:bg-[#153A31]"}`}>{size}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddToCart} disabled={isAdding || buttonText === "Added ✦"} className={`flex-1 py-3 border border-dashed border-[#C5A46D] transition-colors duration-300 tracking-widest text-[10px] uppercase shadow-[0_4px_14px_rgba(0,0,0,0.3)] ${buttonText === "Added ✦" ? "bg-[#C5A46D] text-[#0F2B24]" : "bg-[#0B0B0B] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0F2B24]"}`}>{buttonText}</button>
                  <button onClick={handleBuyNow} className="flex-1 py-3 border border-dashed border-[#C5A46D] bg-[#0F2B24] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0F2B24] transition-colors duration-300 tracking-widest text-[10px] uppercase shadow-[0_4px_14px_rgba(0,0,0,0.3)]">Buy Now</button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}