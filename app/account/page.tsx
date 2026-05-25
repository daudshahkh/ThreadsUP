"use client";

import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import ThreadBackground from "@/components/ThreadBackground";

const accountLinks = [
  ["Order History", "Track previous and upcoming studio orders."],
  ["Saved Addresses", "Keep delivery details ready for future drops."],
  ["Wishlist", "Return to the garments you are considering."],
];

export default function AccountPage() {
  return (
    <main className="bg-[#0B1F1A] text-[#F6E9C8] min-h-screen font-sans selection:bg-[#D0A85C] selection:text-[#0B1F1A] relative overflow-hidden flex flex-col">
      <ThreadBackground />
      <SiteNav />

      <section className="relative z-10 pt-16 pb-8 px-6 md:px-12 max-w-5xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-[#D0A85C] mb-4">Atelier Account</h1>
          <p className="text-[#F6E9C8]/70 text-xs tracking-widest uppercase">Orders, saved pieces, and profile access.</p>
        </div>

        <Show when="signed-out">
          <div className="bg-[#07110F]/80 backdrop-blur-md border border-dashed border-[#D0A85C] p-8 md:p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-serif text-[#D0A85C] mb-4">Access the Atelier</h2>
            <p className="text-[#F6E9C8]/70 text-sm font-light leading-7 max-w-xl mx-auto mb-8">
              Sign in to keep track of saved pieces, future orders, and account details.
            </p>
            <SignInButton fallbackRedirectUrl="/account">
              <button className="px-8 py-3 bg-[#D0A85C] text-[#0B1F1A] hover:bg-[#F6E9C8] transition-colors duration-300 tracking-widest text-xs uppercase font-bold">
                Continue with Google
              </button>
            </SignInButton>
          </div>
        </Show>

        <Show when="signed-in">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            <aside className="bg-[#07110F]/80 border border-dashed border-[#D0A85C] p-6 flex flex-col items-center text-center">
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-16 h-16 border border-dashed border-[#D0A85C]" } }} />
              <h2 className="text-[#D0A85C] font-serif text-2xl mt-6">Studio Profile</h2>
              <p className="text-[#F6E9C8]/50 text-xs tracking-widest uppercase mt-2">Signed in</p>
            </aside>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {accountLinks.map(([title, body]) => (
                <Link key={title} href={title === "Wishlist" ? "/wishlist" : "/account"} className="bg-[#07110F]/50 border border-dashed border-[#D0A85C]/40 p-6 hover:border-[#D0A85C] transition-colors">
                  <h3 className="text-[#D0A85C] font-serif text-xl mb-3">{title}</h3>
                  <p className="text-[#F6E9C8]/70 text-sm font-light leading-7">{body}</p>
                </Link>
              ))}
            </div>
          </div>
        </Show>
      </section>

      <SiteFooter />
    </main>
  );
}

