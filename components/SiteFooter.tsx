import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#07110F] pt-16 pb-8 px-6 md:px-12 relative z-10 border-t border-dashed border-[#D0A85C]/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <img src="/logo.png" alt="ThreadsUP Studio Logo" className="w-24 mb-6 opacity-80" />
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {[
            ["Atelier", "/about"],
            ["Paws and Pause", "/collections/paws-and-pause"],
            ["Lookbook", "/lookbook"],
            ["Size Guide", "/size-guide"],
            ["FAQ", "/faq"],
            ["Wishlist", "/wishlist"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-[#F6E9C8]/50 hover:text-[#D0A85C] text-[10px] tracking-widest uppercase transition-colors border-b border-dashed border-transparent hover:border-[#D0A85C] pb-1">
              {label}
            </Link>
          ))}
        </div>
        <p className="text-[#F6E9C8]/40 text-xs tracking-widest uppercase">
          (c) 2026 THREADSUP STUDIO. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
