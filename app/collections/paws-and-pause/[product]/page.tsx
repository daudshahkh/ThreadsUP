"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";
import { formatCollectionPrice, getCollectionBySlug, getCollectionProduct } from "@/data/collections";
import { useCartStore } from "@/store/cartStore";

const sizes = ["S", "M", "L", "XL"];

export default function PawsProductPage() {
  const params = useParams();
  const productSlug = params.product as string;
  const collection = getCollectionBySlug("paws-and-pause");
  const product = getCollectionProduct("paws-and-pause", productSlug);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");
  const { addItem } = useCartStore();

  if (!collection || !product) {
    return (
      <main className="bg-[#0B1F1A] text-[#D0A85C] min-h-screen flex items-center justify-center font-serif text-2xl">
        Product not found.
      </main>
    );
  }

  const activeSrc = activeImage === "front" ? product.frontImage : product.backImage;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSelectedSize("L");
    }

    addItem({
      productId: `paws-${product.slug}`,
      name: product.name,
      price: formatCollectionPrice(product.price),
      size: selectedSize || "L",
      image: product.frontImage,
    });
  };

  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav />

      <div className="relative z-10 flex-grow flex items-center justify-center py-12 px-4 w-full">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-start">
          <div className="flex flex-col gap-4 w-full mx-auto md:ml-auto" style={{ maxWidth: "420px" }}>
            <div className="group w-full aspect-[4/5] bg-[#07110F] border border-dashed border-[#D0A85C] p-1.5 shadow-xl relative overflow-hidden">
              <img src={activeSrc} alt={`${product.name} ${activeImage}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-0 transition-opacity duration-700" />
              <img src={activeImage === "front" ? product.backImage : product.frontImage} alt={`${product.name} alternate view`} className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] object-cover opacity-0 group-hover:opacity-90 transition-opacity duration-700" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["front", product.frontImage],
                ["back", product.backImage],
              ].map(([view, image]) => (
                <button
                  key={view}
                  onClick={() => setActiveImage(view as "front" | "back")}
                  className={`p-1 border border-dashed transition-colors ${activeImage === view ? "border-[#D0A85C]" : "border-[#D0A85C]/30 hover:border-[#D0A85C]"}`}
                >
                  <span className="sr-only">View {view}</span>
                  <img src={image} alt={`${product.name} ${view}`} className="w-full aspect-[4/5] object-cover bg-[#07110F] opacity-80" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full mx-auto md:mr-auto" style={{ maxWidth: "430px" }}>
            <p className="text-[#F6E9C8]/60 text-xs tracking-widest uppercase mb-4">{collection.name}</p>
            <h1 className="text-4xl font-serif text-[#D0A85C] mb-2">{product.name}</h1>
            <p className="text-lg font-light text-[#F6E9C8] tracking-wider mb-5">{formatCollectionPrice(product.price)}</p>
            <div className="w-full h-[1px] border-b border-dashed border-[#D0A85C]/30 mb-5" />
            <p className="text-sm text-[#F6E9C8]/80 font-light leading-relaxed mb-6">{product.description}</p>

            <ul className="mb-6 space-y-2">
              {["Oversized streetwear fit", "Front and back printed artwork", "Soft cotton handfeel", "Part of Paws and Pause"].map((detail) => (
                <li key={detail} className="flex items-center text-xs font-light text-[#D0A85C] tracking-wide">
                  <span className="mr-3 text-[8px]">*</span> {detail}
                </li>
              ))}
            </ul>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-widest text-[#F6E9C8]">Select Size</span>
                <Link href="/size-guide" className="text-[10px] text-[#D0A85C] uppercase tracking-widest hover:underline decoration-dashed underline-offset-4">Size Guide</Link>
              </div>
              <div className="flex gap-2 flex-wrap">
                {sizes.map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`w-10 h-10 flex items-center justify-center border border-dashed transition-all duration-300 font-serif text-sm ${selectedSize === size ? "border-[#D0A85C] bg-[#D0A85C] text-[#0B1F1A]" : "border-[#D0A85C]/50 text-[#D0A85C] hover:border-[#D0A85C] hover:bg-[#123229]"}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleAddToCart} className="flex-1 py-3 border border-dashed border-[#D0A85C] bg-[#07110F] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-[10px] uppercase shadow-[0_4px_14px_rgba(0,0,0,0.3)]">
                Add to Bag
              </button>
              <Link href="/collections/paws-and-pause" className="flex-1 py-3 text-center border border-dashed border-[#D0A85C] bg-[#0B1F1A] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-[10px] uppercase shadow-[0_4px_14px_rgba(0,0,0,0.3)]">
                Back to Drop
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

