"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Show, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";

interface SiteNavProps {
  position?: string;
  active?: string;
}

export default function SiteNav({ position = "relative", active = "" }: SiteNavProps) {
  const { openCart, items } = useCartStore();
  
  // Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const executeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear it for next time
    }
  };

  return (
    <>
      <nav className={`${position} z-50 w-full p-6 md:px-10 flex justify-between items-center border-b border-dashed border-[#D0A85C]/30 bg-[#07110F]/50 backdrop-blur-md`}>
        {/* Logo */}
        <Link href="/" className="w-20 md:w-28 drop-shadow-xl hover:opacity-80 transition-opacity z-50">
          <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-full h-auto object-contain" />
        </Link>

        {/* Centered Desktop Navigation with Dropdown */}
        <div className="hidden lg:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2 h-full z-50">
          
          {/* Collection Dropdown Parent */}
          <div className="relative group flex items-center py-4 h-full">
            <Link 
              href="/shop" 
              className={`tracking-widest text-[10px] uppercase transition-colors border-b border-dashed pb-1 ${
                active === "collection" 
                ? "text-[#D0A85C] border-[#D0A85C]" 
                : "text-[#F6E9C8]/70 hover:text-[#D0A85C] border-transparent hover:border-[#D0A85C]"
              }`}
            >
              Collection
            </Link>
            
            {/* The Frosted Glass Dropdown Menu */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[80%] mt-0 w-48 bg-[#0B1F1A]/95 backdrop-blur-md border border-dashed border-[#D0A85C]/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col shadow-2xl">
              <Link href="/shop/tops" className="px-4 py-4 text-[10px] uppercase tracking-widest text-[#F6E9C8]/70 hover:text-[#D0A85C] hover:bg-[#123229]/50 border-b border-dashed border-[#D0A85C]/10 text-center transition-colors">Tops</Link>
              <Link href="/shop/bottoms" className="px-4 py-4 text-[10px] uppercase tracking-widest text-[#F6E9C8]/70 hover:text-[#D0A85C] hover:bg-[#123229]/50 border-b border-dashed border-[#D0A85C]/10 text-center transition-colors">Bottoms</Link>
              <Link href="/shop/outerwear" className="px-4 py-4 text-[10px] uppercase tracking-widest text-[#F6E9C8]/70 hover:text-[#D0A85C] hover:bg-[#123229]/50 border-b border-dashed border-[#D0A85C]/10 text-center transition-colors">Outerwear</Link>
              <Link href="/shop/paws-and-pause" className="px-4 py-4 text-[10px] uppercase tracking-widest text-[#D0A85C] hover:text-[#F6E9C8] hover:bg-[#D0A85C]/20 text-center transition-colors font-bold">Paws & Pause</Link>
            </div>
          </div>

          <Link href="/bundler" className="text-[#F6E9C8]/70 hover:text-[#D0A85C] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1">
            Curate a Fit
          </Link>
          <Link href="/#lookbook" className="text-[#F6E9C8]/70 hover:text-[#D0A85C] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1">
            Lookbook
          </Link>
        </div>

        {/* Right Side Actions (Search, Cart, Auth) */}
        <div className="flex items-center gap-6 md:gap-8 z-50">
          
          {/* Search Icon */}
          <button onClick={() => setIsSearchOpen(true)} className="text-[#D0A85C] hover:text-[#F6E9C8] transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Cart Button */}
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

      {/* Premium Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#07110F]/90 backdrop-blur-xl flex flex-col items-center justify-center p-6">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-10 text-[#D0A85C] hover:text-[#F6E9C8] text-2xl font-light tracking-widest uppercase text-[10px] tracking-[0.2em]">Close (ESC)</button>
            
            <form onSubmit={executeSearch} className="w-full max-w-2xl relative">
              <span className="text-[#D0A85C] tracking-widest text-[10px] uppercase mb-4 block">Search the Archive</span>
              <input 
                type="text" 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tees, Outerwear, Paws & Pause..." 
                className="w-full bg-transparent border-b-2 border-dashed border-[#D0A85C] text-[#F6E9C8] text-3xl md:text-5xl font-serif py-4 focus:outline-none focus:border-[#F6E9C8] transition-colors placeholder:text-[#D0A85C]/30"
              />
              <button type="submit" className="absolute right-0 bottom-4 text-[#D0A85C] hover:text-[#F6E9C8]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}