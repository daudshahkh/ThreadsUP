"use client";

import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";

interface SiteNavProps {
  position?: "absolute" | "relative";
  active?: "collection" | "bundler" | "lookbook" | "atelier";
}

export default function SiteNav({ position = "relative", active }: SiteNavProps) {
  const { openCart, items } = useCartStore();

  const baseLink =
    "text-[#F6E9C8]/70 hover:text-[#D0A85C] tracking-widest text-[10px] uppercase transition-colors border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1";
  const activeLink = "text-[#D0A85C] tracking-widest text-[10px] uppercase border-b border-dashed border-[#D0A85C] pb-1";

  return (
    <nav
      className={`${position} top-0 left-0 w-full z-50 p-6 md:px-10 flex justify-between items-center border-b border-dashed border-[#D0A85C]/30 bg-[#07110F]/50 backdrop-blur-md`}
    >
      <Link href="/" className="w-20 md:w-28 drop-shadow-xl hover:opacity-80 transition-opacity">
        <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-full h-auto object-contain" />
      </Link>

      <div className="hidden lg:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
        <Link href="/shop" className={active === "collection" ? activeLink : baseLink}>
          Collection
        </Link>
        <Link href="/bundler" className={active === "bundler" ? activeLink : baseLink}>
          Curate a Fit
        </Link>
        <Link href="/lookbook" className={active === "lookbook" ? activeLink : baseLink}>
          Lookbook
        </Link>
        <Link href="/about" className={active === "atelier" ? activeLink : baseLink}>
          Atelier
        </Link>
      </div>

      <div className="flex items-center gap-6 md:gap-8">
        <button onClick={openCart} className="relative text-[#D0A85C] hover:text-[#F6E9C8] transition-colors group" aria-label="Open cart">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {items.length > 0 && (
            <span className="absolute -top-1.5 -right-2 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0A85C] opacity-40" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D0A85C] text-[#0B1F1A] text-[9px] items-center justify-center font-bold">
                {items.length}
              </span>
            </span>
          )}
        </button>

        <div className="h-4 w-[1px] bg-[#D0A85C]/30 hidden sm:block" />

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
  );
}

