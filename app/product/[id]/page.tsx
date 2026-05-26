"use client";

import React, { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";
import { formatPrice, getProductById } from "@/data/products";
import { studioCollections } from "@/data/collections"; 
import { useCartStore } from "@/store/cartStore";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  // The Smart Data Resolver & Adapter
  let product: any = getProductById(productId);

  if (!product) {
    for (const collection of studioCollections) {
      const foundItem = (collection as any).products?.find((p: any) => p.slug === productId) || 
                        (collection as any).items?.find((p: any) => p.slug === productId);
      
      if (foundItem) {
        product = {
          ...foundItem,
          id: foundItem.slug,
          images: [foundItem.frontImage, foundItem.backImage].filter(Boolean),
          sizes: ["S", "M", "L", "XL"],
          details: ["Premium Heavyweight Cotton", "Oversized Drop-Shoulder Fit", "Machine Washable"]
        };
        break; 
      }
    }
  }

  const priceLabel = product ? formatPrice(product.price) : "";

  // Strictly set to null to guarantee the modal trigger
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Bag");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSelectSizeModalOpen, setIsSelectSizeModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<"cart" | "buy" | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const { addItem, openCart } = useCartStore();
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Scroll Listener for Sticky Bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const executeAddToCart = (sizeToUse: string) => {
    if (!product) return;
    addItem({ productId, name: product.name, price: priceLabel, size: sizeToUse, image: product.images[0] });
    setIsAdding(true);
    setButtonText("Stitching...");
    
    setTimeout(() => {
      setButtonText("Added *");
      setIsAdding(false);
      openCart(); 
      setTimeout(() => setButtonText("Add to Bag"), 2000);
    }, 800);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Absolute strict check: If there is no size, halt and open modal.
    if (!selectedSize) {
      setPendingAction("cart");
      setIsSelectSizeModalOpen(true);
      return;
    }
    executeAddToCart(selectedSize);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    // Absolute strict check: If there is no size, halt and open modal.
    if (!selectedSize) {
      setPendingAction("buy");
      setIsSelectSizeModalOpen(true);
      return;
    }
    alert("Proceeding to secure checkout...");
  };

  const handleModalSizeSelect = (size: string) => {
    setSelectedSize(size);
    setIsSelectSizeModalOpen(false);
    
    if (pendingAction === "cart") executeAddToCart(size);
    if (pendingAction === "buy") alert("Proceeding to secure checkout...");
    setPendingAction(null);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0B1F1A] text-[#D0A85C] flex items-center justify-center font-serif text-2xl">
        Product not found.
      </div>
    );
  }

  return (
    /* THE FIX: Wrapping the entire page in a key completely resets the memory cache every time you change products */
    <div key={productId} className="relative">
      
      {/* Sticky Bottom Action Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: 100 }} 
            animate={{ y: 0 }} 
            exit={{ y: 100 }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 w-full z-[90] bg-[#07110F]/95 backdrop-blur-xl border-t border-dashed border-[#D0A85C]/30 py-4 px-6 md:px-12 flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-14 bg-[#0B1F1A] border border-dashed border-[#D0A85C]/50 hidden sm:block overflow-hidden">
                <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-[#F6E9C8] font-serif text-sm md:text-base">{product.name}</h4>
                <p className="text-[#D0A85C] text-xs font-light tracking-widest">{priceLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#F6E9C8]/50 text-[10px] uppercase tracking-widest hidden md:block">
                {selectedSize ? `Size: ${selectedSize}` : "Select Size Above"}
              </span>
              <button 
                onClick={handleAddToCart} 
                disabled={isAdding || buttonText === "Added *"}
                className={`px-8 py-3 transition-colors duration-300 tracking-widest text-[10px] uppercase font-bold border border-dashed border-[#D0A85C] ${
                  buttonText === "Added *" ? "bg-[#D0A85C] text-[#0B1F1A]" : "bg-[#0B1F1A] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A]"
                }`}
              >
                {buttonText}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSelectSizeModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#07110F]/80 backdrop-blur-md" onClick={() => setIsSelectSizeModalOpen(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#0B1F1A] border border-dashed border-[#D0A85C] p-8 max-w-sm w-full shadow-2xl relative flex flex-col items-center">
              <button onClick={() => setIsSelectSizeModalOpen(false)} className="absolute top-4 right-4 text-[#D0A85C] hover:text-[#F6E9C8] text-xl">x</button>
              <h3 className="text-2xl font-serif text-[#D0A85C] mb-2 text-center">Select Your Size</h3>
              <p className="text-xs text-[#F6E9C8]/60 tracking-widest uppercase mb-6 text-center">Choose a size to continue</p>
              <div className="flex gap-3 flex-wrap justify-center w-full">
                {product.sizes.map((size: string) => (
                  <button 
                    key={size} 
                    onClick={() => handleModalSizeSelect(size)} 
                    className="w-14 h-14 flex items-center justify-center border border-dashed border-[#D0A85C]/50 text-[#D0A85C] hover:border-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-all duration-300 font-serif text-xl"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSizeGuideOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#07110F]/80 backdrop-blur-md" onClick={() => setIsSizeGuideOpen(false)}>
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-[#0B1F1A] border border-dashed border-[#D0A85C] p-8 max-w-lg w-full shadow-2xl relative">
              <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-4 right-4 text-[#D0A85C] hover:text-[#F6E9C8] text-xl">x</button>
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
                <p className="text-xs text-[#F6E9C8]/70 leading-relaxed">Machine wash cold with like colors. Do not bleach. Hang dry to preserve fabric weight and prevent embroidery distortion.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col pb-24">
        <ThreadBackground />
        <SiteNav active="collection" />

        <div className="flex-grow flex items-center justify-center relative z-10 py-10 px-4 w-full">
          <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
            <div className="flex flex-col gap-4 w-full mx-auto md:ml-auto" style={{ maxWidth: "360px" }}>
              <motion.div key={activeImageIndex} initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="w-full aspect-[4/5] bg-[#07110F] border border-dashed border-[#D0A85C] p-1.5 shadow-xl">
                <img src={product.images[activeImageIndex]} alt={`${product.name} Main View`} className="w-full h-full object-cover pointer-events-none" />
              </motion.div>

              <div ref={carouselRef} className="w-full overflow-hidden cursor-grab active:cursor-grabbing pb-4 relative">
                <motion.div drag="x" dragConstraints={carouselRef} dragElastic={0.2} dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }} className="flex gap-3 w-max">
                  {product.images.map((img: string, index: number) => (
                    <motion.div key={`${img}-${index}`} onClick={() => setActiveImageIndex(index)} className={`w-20 h-24 flex-shrink-0 relative p-1 transition-all duration-300 pointer-events-auto cursor-pointer ${activeImageIndex === index ? "border border-dashed border-[#D0A85C] opacity-100 shadow-[0_0_10px_rgba(208,168,92,0.3)]" : "border border-transparent opacity-50 hover:opacity-90"}`}>
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover bg-[#07110F] pointer-events-none" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="flex flex-col w-full mx-auto md:mr-auto" style={{ maxWidth: "400px" }}>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-3xl font-serif text-[#D0A85C] mb-1">{product.name}</h1>
                <p className="text-lg font-light text-[#F6E9C8] tracking-wider mb-5">{priceLabel}</p>
                <div className="w-full h-[1px] border-b border-dashed border-[#D0A85C]/30 mb-5" />
                <p className="text-sm text-[#F6E9C8]/80 font-light leading-relaxed mb-6">{product.description}</p>
                <ul className="mb-6 space-y-2">
                  {product.details.map((detail: string) => (
                    <li key={detail} className="flex items-center text-xs font-light text-[#D0A85C] tracking-wide">
                      <span className="mr-3 text-[8px]">*</span> {detail}
                    </li>
                  ))}
                </ul>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#F6E9C8]">Select Size</span>
                    <button onClick={() => setIsSizeGuideOpen(true)} className="text-[10px] text-[#D0A85C] uppercase tracking-widest hover:underline decoration-dashed underline-offset-4">Size Guide</button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size: string) => (
                      <button 
                        key={size} 
                        onClick={() => setSelectedSize(size)} 
                        className={`w-10 h-10 flex items-center justify-center border border-dashed transition-all duration-300 font-serif text-sm ${selectedSize === size ? "border-[#D0A85C] bg-[#D0A85C] text-[#0B1F1A]" : "border-[#D0A85C]/50 text-[#D0A85C] hover:border-[#D0A85C] hover:bg-[#123229]"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddToCart} disabled={isAdding || buttonText === "Added *"} className={`flex-1 py-3 border border-dashed border-[#D0A85C] transition-colors duration-300 tracking-widest text-[10px] uppercase shadow-[0_4px_14px_rgba(0,0,0,0.3)] ${buttonText === "Added *" ? "bg-[#D0A85C] text-[#0B1F1A]" : "bg-[#07110F] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A]"}`}>
                    {buttonText}
                  </button>
                  <button onClick={handleBuyNow} className="flex-1 py-3 border border-dashed border-[#D0A85C] bg-[#0B1F1A] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-[10px] uppercase shadow-[0_4px_14px_rgba(0,0,0,0.3)]">Buy Now</button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}