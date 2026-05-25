import Link from "next/link";
import { formatCollectionPrice, StudioCollection } from "@/data/collections";

export default function CollectionMarquee({ collection }: { collection: StudioCollection }) {
  const products = [...collection.products, ...collection.products];

  return (
    <section className="py-24 px-0 relative z-10 overflow-hidden border-y border-dashed border-[#D0A85C]/30 bg-[#07110F]/40">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[#F6E9C8]/60 text-xs tracking-widest uppercase mb-3">{collection.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-serif text-[#D0A85C]">{collection.name}</h2>
          </div>
          <div className="max-w-md">
            <p className="text-[#F6E9C8]/70 text-sm font-light leading-7 mb-5">{collection.description}</p>
            <Link href={`/collections/${collection.slug}`} className="text-[#D0A85C] text-[10px] uppercase tracking-widest border-b border-dashed border-[#D0A85C] pb-1">
              View Collection
            </Link>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max gap-5 animate-threadsup-marquee px-5">
          {products.map((product, index) => (
            <Link
              key={`${product.slug}-${index}`}
              href={`/collections/${collection.slug}/${product.slug}`}
              className="group w-[220px] md:w-[280px] lg:w-[340px] flex-shrink-0 bg-[#0B1F1A] p-3 border border-dashed border-[#D0A85C]/40 hover:border-[#D0A85C] transition-colors"
            >
              <div className="aspect-[4/5] bg-[#07110F] overflow-hidden relative">
                <img src={product.frontImage} alt={`${product.name} front`} className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-0 transition-opacity duration-700" />
                <img src={product.backImage} alt={`${product.name} back`} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-85 transition-opacity duration-700" />
              </div>
              <div className="pt-3 flex items-center justify-between gap-3">
                <h3 className="text-[#F6E9C8] group-hover:text-[#D0A85C] transition-colors font-serif text-sm truncate">{product.name}</h3>
                <p className="text-[#D0A85C]/80 text-[10px] tracking-widest whitespace-nowrap">{formatCollectionPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

