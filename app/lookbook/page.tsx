import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";

const frames = [
  ["Premium Oversized Tees", "/product-1.png", "Drop-shoulder structure with a washed handfeel."],
  ["Embroidered Streetwear", "/product-1-lifestyle.png", "Tonal detail, antique contrast, daily weight."],
  ["Layered Silhouettes", "/product-1-lifestyle.png", "Outerwear proportions built around movement."],
  ["Tailored Utility", "/product-1.png", "Clean volume with functional pocket language."],
];

export default function LookbookPage() {
  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav active="lookbook" />

      <section className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">Campaign Vol. 1</h1>
          <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">Luxury designs. Modern streetwear.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {frames.map(([title, image, caption], index) => (
            <article key={title} className={`relative group bg-[#0B1F1A] p-4 border border-[#D0A85C] border-dashed shadow-2xl ${index % 2 === 1 ? "md:mt-16" : ""}`}>
              <div className="w-full aspect-[4/5] overflow-hidden bg-[#07110F]">
                <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[#D0A85C] font-serif text-xl">{title}</h2>
                  <p className="text-[#F6E9C8]/60 text-xs tracking-widest uppercase mt-2">{caption}</p>
                </div>
                <Link href="/shop" className="text-[#D0A85C] text-[10px] uppercase tracking-widest border-b border-dashed border-[#D0A85C] pb-1 whitespace-nowrap">
                  Shop
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

