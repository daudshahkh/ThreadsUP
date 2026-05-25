import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";

const faqs = [
  ["When will my order ship?", "Ready pieces usually ship within 3-5 business days. Made-to-order or limited pieces may take longer depending on production timing."],
  ["Do you accept returns?", "Unworn garments with tags intact can be reviewed for return eligibility. Final sale and customized pieces are not eligible."],
  ["How should I choose my size?", "The garments are cut with relaxed proportions. Use the size guide for garment measurements, then compare against a piece you already like wearing."],
  ["Will sold-out products return?", "Core silhouettes may restock. Campaign pieces are produced in smaller runs and may not return once the batch closes."],
  ["Where are product images managed?", "Product records and image URLs can be managed from your synced Supabase database once the storefront is wired fully to the catalog."],
];

export default function FaqPage() {
  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav />

      <section className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">Questions</h1>
          <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">Orders, sizing, and studio policies.</p>
        </div>

        <div className="flex flex-col gap-5">
          {faqs.map(([question, answer]) => (
            <article key={question} className="bg-[#07110F]/50 border border-dashed border-[#D0A85C]/40 p-6">
              <h2 className="text-[#D0A85C] font-serif text-xl mb-3">{question}</h2>
              <p className="text-[#F6E9C8]/70 text-sm font-light leading-7">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

