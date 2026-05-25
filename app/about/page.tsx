import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";

const values = [
  ["01", "Material Weight", "Structured cotton, dense fleece, and washed finishes built for repeat wear."],
  ["02", "Tailoring Culture", "Streetwear shapes with measured proportions, clean drape, and considered seams."],
  ["03", "Quiet Detail", "Tonal marks, dashed stitch language, and hardware that supports the garment."],
];

export default function AboutPage() {
  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav active="atelier" />

      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">
          <div>
            <p className="text-[#F6E9C8]/60 text-xs tracking-widest uppercase mb-5">The Atelier</p>
            <h1 className="text-5xl md:text-7xl font-serif text-[#D0A85C] mb-8">Threads with intention.</h1>
            <p className="text-[#F6E9C8]/80 font-light leading-8 max-w-2xl">
              THREADSUP STUDIO blends tailoring discipline with modern streetwear: garments that feel substantial, move easily, and carry detail without shouting.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="px-8 py-3 bg-[#0B1F1A] border border-dashed border-[#D0A85C] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)] text-center">
                Shop Collection
              </Link>
              <Link href="/lookbook" className="px-8 py-3 bg-[#0B1F1A] border border-dashed border-[#D0A85C] text-[#D0A85C] hover:bg-[#D0A85C] hover:text-[#0B1F1A] transition-colors duration-300 tracking-widest text-xs uppercase shadow-[0_4px_14px_rgba(0,0,0,0.5)] text-center">
                View Lookbook
              </Link>
            </div>
          </div>

          <div className="bg-[#0B1F1A] p-4 border border-[#D0A85C] border-dashed shadow-2xl">
            <div className="aspect-[4/5] bg-[#07110F] overflow-hidden">
              <img src="/product-1-lifestyle.png" alt="ThreadsUP Studio garment detail" className="w-full h-full object-cover opacity-85" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 md:px-12 lg:px-24 py-20 bg-[#07110F]/40 border-y border-dashed border-[#D0A85C]/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex items-center gap-4">
            <h2 className="text-3xl font-serif text-[#D0A85C]">Studio Codes</h2>
            <div className="flex-grow h-[1px] border-b border-dashed border-[#D0A85C] opacity-30" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(([number, title, body]) => (
              <article key={title} className="bg-[#0B1F1A] p-6 border border-dashed border-[#D0A85C]/40">
                <p className="text-[#D0A85C]/60 text-xs tracking-widest mb-6">{number}</p>
                <h3 className="text-[#D0A85C] font-serif text-xl mb-4">{title}</h3>
                <p className="text-[#F6E9C8]/70 text-sm font-light leading-7">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

