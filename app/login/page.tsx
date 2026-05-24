"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // MAGIC LINK SIMULATION (Can wire to Clerk next!)
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Email authentication coming in V2!");
      setIsSubmitting(false);
      setEmail("");
    }, 1500);
  };

  return (
    <main className="bg-[#0F2B24] text-[#F5E7C1] min-h-screen font-sans selection:bg-[#C5A46D] selection:text-[#0F2B24] relative overflow-hidden flex flex-col items-center justify-center px-4">
      
      {/* Background Thread */}
      <svg className="fixed inset-0 w-full h-full z-0 pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M-10,20 C 30,50 80,-10 110,40 S 20,80 120,90" fill="transparent" stroke="#C5A46D" strokeWidth="0.2" />
        <path d="M110,40 C 80,60 10,30 -10,70" fill="transparent" stroke="#C5A46D" strokeWidth="0.1" strokeDasharray="1,1" />
      </svg>

      {/* Back Navigation */}
      <a href="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 text-[#C5A46D] font-light tracking-widest text-xs uppercase hover:text-[#F5E7C1] transition-colors border-b border-dashed border-transparent hover:border-[#C5A46D]">
        ← Back to Atelier
      </a>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-[#0B0B0B]/80 backdrop-blur-md border border-dashed border-[#C5A46D] p-8 md:p-12 relative z-10 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <img src="/logo.png" alt="ThreadsUP Studio" className="w-20 mb-6 opacity-90" />
          <h1 className="text-3xl font-serif text-[#C5A46D] mb-2">Access the Atelier</h1>
          <p className="text-xs text-[#F5E7C1]/60 font-light tracking-widest uppercase">Sign in or create an account</p>
        </div>

        <div className="flex flex-col gap-6">
          
          {/* THE REAL GOOGLE AUTH BUTTON WRAPPER */}
          <SignInButton fallbackRedirectUrl="/">
            <button 
              className="w-full flex items-center justify-center gap-3 py-4 border border-[#C5A46D] bg-[#C5A46D] text-[#0F2B24] hover:bg-[#F5E7C1] hover:border-[#F5E7C1] transition-all duration-300 font-bold uppercase tracking-widest text-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>
          </SignInButton>

          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-grow border-b border-dashed border-[#C5A46D]/30"></div>
            <span className="text-[10px] text-[#F5E7C1]/50 uppercase tracking-widest">Or</span>
            <div className="h-[1px] flex-grow border-b border-dashed border-[#C5A46D]/30"></div>
          </div>

          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-[#0F2B24] border border-dashed border-[#C5A46D]/50 text-[#F5E7C1] placeholder:text-[#F5E7C1]/30 p-4 text-xs tracking-widest focus:outline-none focus:border-[#C5A46D] transition-colors"
              />
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 border border-dashed border-[#C5A46D] text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#0F2B24] transition-all duration-300 font-medium uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Send Magic Link"}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}