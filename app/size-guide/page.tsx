import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";

const tables = [
  {
    title: "Oversized Tees",
    note: "Drop-shoulder fit",
    rows: [
      ["S", "44", "28"],
      ["M", "46", "29"],
      ["L", "48", "30"],
      ["XL", "50", "31"],
    ],
  },
  {
    title: "Hoodies & Outerwear",
    note: "Relaxed layer fit",
    rows: [
      ["S", "46", "27"],
      ["M", "48", "28"],
      ["L", "50", "29"],
      ["XL", "52", "30"],
    ],
  },
  {
    title: "Trousers",
    note: "Relaxed straight fit",
    rows: [
      ["30", "30", "40"],
      ["32", "32", "41"],
      ["34", "34", "42"],
      ["36", "36", "43"],
    ],
  },
];

export default function SizeGuidePage() {
  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav />

      <section className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">Fit & Care Guide</h1>
          <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">Measurements are listed in inches.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {tables.map((table) => (
            <article key={table.title} className="bg-[#0B1F1A] border border-dashed border-[#D0A85C] p-6 shadow-2xl">
              <h2 className="text-2xl font-serif text-[#D0A85C] mb-2">{table.title}</h2>
              <p className="text-[#F6E9C8]/60 text-[10px] uppercase tracking-widest mb-6">{table.note}</p>
              <table className="w-full text-left text-sm text-[#F6E9C8]/80">
                <thead>
                  <tr className="border-b border-[#D0A85C]/20 text-[#D0A85C]">
                    <th className="py-2 font-normal">Size</th>
                    <th className="py-2 font-normal">{table.title === "Trousers" ? "Waist" : "Chest"}</th>
                    <th className="py-2 font-normal">{table.title === "Trousers" ? "Length" : "Length"}</th>
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map(([size, width, length]) => (
                    <tr key={size} className="border-b border-[#D0A85C]/10">
                      <td className="py-2">{size}</td>
                      <td>{width}</td>
                      <td>{length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          ))}
        </div>

        <div className="bg-[#07110F]/70 border border-dashed border-[#D0A85C]/50 p-6 md:p-8">
          <h2 className="text-[#D0A85C] font-serif text-2xl mb-4">Care Notes</h2>
          <p className="text-[#F6E9C8]/70 text-sm font-light leading-7">
            Machine wash cold with like colors. Do not bleach. Hang dry to preserve fabric weight and prevent embroidery distortion. Iron inside-out on low heat when needed.
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

