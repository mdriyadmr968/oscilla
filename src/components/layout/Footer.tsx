"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Clock, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#07080b] border-t border-[#1a1c25] text-neutral-400 text-xs">
      {/* Heritage Trust Columns */}
      <div className="border-b border-[#161822] py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#12141d] border border-[#232736] flex items-center justify-center text-amber-400 flex-shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
                Chronometer Certified
              </h4>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Each mechanical movement undergoes rigorous 15-day multi-position regulation ensuring precision tolerance.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#12141d] border border-[#232736] flex items-center justify-center text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
                5-Year Atelier Warranty
              </h4>
              <p className="text-neutral-500 text-xs leading-relaxed">
                Full coverage against mechanical deviations, water ingress, and comprehensive caliber servicing support.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#12141d] border border-[#232736] flex items-center justify-center text-amber-400 flex-shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-1">
                Armored Insured Courier
              </h4>
              <p className="text-neutral-500 text-xs leading-relaxed">
                White-glove armored transit with biometric signature verification and worldwide customs insurance included.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Intro */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200" />
              <span className="text-xl font-serif tracking-[0.25em] text-white uppercase font-bold">
                OSCILLA
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Oscilla is an independent haute horlogerie atelier dedicated to mechanical equilibrium, sculptural case design, and chronometric precision.
            </p>
            <div className="pt-2 text-[11px] text-neutral-500 font-mono">
              GENÈVE • ZÜRICH • NEW YORK • TOKYO
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold uppercase tracking-wider text-xs">
              Collections
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalog?collection=Astral" className="hover:text-amber-300 transition-colors">
                  Astral Automatics
                </Link>
              </li>
              <li>
                <Link href="/catalog?collection=Chronos" className="hover:text-amber-300 transition-colors">
                  Chronos Flyback
                </Link>
              </li>
              <li>
                <Link href="/catalog?collection=Vanguard" className="hover:text-amber-300 transition-colors">
                  Vanguard Divers
                </Link>
              </li>
              <li>
                <Link href="/catalog?collection=Heritage" className="hover:text-amber-300 transition-colors">
                  Heritage Dress
                </Link>
              </li>
              <li>
                <Link href="/catalog?collection=Nocturne" className="hover:text-amber-300 transition-colors">
                  Nocturne Ceramic
                </Link>
              </li>
            </ul>
          </div>

          {/* Horology Concierge */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold uppercase tracking-wider text-xs">
              Concierge
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/vault" className="hover:text-amber-300 transition-colors">
                  Collector Vault &amp; Wishlist
                </Link>
              </li>
              <li>
                <Link href="/heritage" className="hover:text-amber-300 transition-colors">
                  Caliber Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-amber-300 transition-colors">
                  Strap Customization
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-300 transition-colors">
                  Admin &amp; Fulfillment
                </Link>
              </li>
            </ul>
          </div>

          {/* VIP Gazette Newsletter */}
          <div className="space-y-3">
            <h5 className="text-white font-semibold uppercase tracking-wider text-xs">
              The Gazette
            </h5>
            <p className="text-xs text-neutral-500">
              Receive confidential notices for numbered micro-batch allocations and private preview releases.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>You are registered in the private allocation ledger.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter collector email..."
                    required
                    className="w-full bg-[#141620] border border-[#232737] rounded-l-lg px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-r-lg transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-neutral-600 block">
                  Strictly confidential. No spam, ever.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#141621] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-600">
          <div>
            &copy; 2026 Oscilla Horlogerie S.A. All rights reserved.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Protocol</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Acquisition</span>
            <span className="hover:text-neutral-400 cursor-pointer">Certificate Verification</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
