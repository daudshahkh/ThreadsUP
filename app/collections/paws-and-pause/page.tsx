import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";
import { formatCollectionPrice, getCollectionBySlug } from "@/data/collections";

export default function PawsAndPausePage() {
  const collection = getCollectionBySlug("paws-and-pause");

  if (!collection) {
    return null;
  }

  const heroProduct = collection.products[0];

  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav />

      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 items-center">
          <div>
            <p className="text-[#F6E9C8]/60 text-xs tracking-widest uppercase mb-5">{collection.eyebrow}</p>
            <h1 className="text-5xl md:text-7xl font-serif text-[#D0A85C] mb-8">{collection.name}</h1>
            <p className="text-[#F6E9C8]/80 font-light leading-8 max-w-2xl mb-10">{collection.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#paws-products" className="px-8 py-3 bg-[#0B1F1A] border border-dashed border-[#D0A85C] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)] text-center">
                View Pieces
              </a>
              <Link href="/size-guide" className="px-8 py-3 bg-[#0B1F1A] border border-dashed border-[#D0A85C] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)] text-center">
                Size Guide
              </Link>
            </div>
          </div>

          {heroProduct && (
            <Link href={`/collections/${collection.slug}/${heroProduct.slug}`} className="group bg-[#0B1F1A] p-4 border border-[#D0A85C] border-dashed shadow-2xl">
              <div className="aspect-[4/5] bg-[#07110F] overflow-hidden relative">
                <img src={heroProduct.frontImage} alt={`${heroProduct.name} front`} className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-0 transition-opacity duration-700" />
                <img src={heroProduct.backImage} alt={`${heroProduct.name} back`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-85 transition-opacity duration-700" />
              </div>
              <p className="mt-4 text-[#D0A85C] font-serif text-lg text-center">{heroProduct.name}</p>
            </Link>
          )}
        </div>
      </section>

      <section id="paws-products" className="relative z-10 px-6 md:px-12 lg:px-24 py-20 bg-[#07110F]/40 border-y border-dashed border-[#D0A85C]/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex items-center gap-4">
            <h2 className="text-3xl font-serif text-[#D0A85C]">The Pieces</h2>
            <div className="flex-grow h-[1px] border-b border-dashed border-[#D0A85C] opacity-30" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.products.map((product) => (
              <Link key={product.slug} href={`/collections/${collection.slug}/${product.slug}`} className="group bg-[#0B1F1A] p-4 border border-dashed border-[#D0A85C]/40 hover:border-[#D0A85C] hover:bg-[#123229] transition-colors shadow-lg">
                <div className="aspect-[4/5] bg-[#07110F] overflow-hidden relative mb-5">
                  <img src={product.frontImage} alt={`${product.name} front`} className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-0 transition-opacity duration-700" />
                  <img src={product.backImage} alt={`${product.name} back`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-85 transition-opacity duration-700" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[#F6E9C8] text-lg group-hover:text-[#D0A85C] transition-colors">{product.name}</h3>
                    <p className="text-[#F6E9C8]/50 text-[10px] uppercase tracking-widest mt-2">Hover to view back</p>
                  </div>
                  <p className="text-[#D0A85C]/80 font-light tracking-widest text-sm whitespace-nowrap">{formatCollectionPrice(product.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

