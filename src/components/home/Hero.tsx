"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Activity } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#090a0d] via-[#0d0f15] to-[#090a0d] px-4 sm:px-6 lg:px-8 py-20">
      {/* Decorative Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Atelier Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161823] border border-[#262939] text-amber-300 text-xs uppercase tracking-[0.2em] font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The 2026 Chronometer Allocations</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-bold text-white tracking-tight leading-[1.08]">
            Mechanical Equilibrium{" "}
            <span className="block gold-gradient-text italic font-normal">
              In Purest Motion.
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
            Crafted for discerning collectors. Oscilla harmonizes high-frequency mechanical calibers with sculpted titanium, forged carbon, and mirror-bevelled 316L steel.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/15 transition-all group"
            >
              <span>Explore Timepieces</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/heritage"
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#141622] hover:bg-[#1e2130] text-neutral-200 border border-[#272b3b] font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Atelier Heritage</span>
            </Link>
          </div>

          {/* Micro Trust Proof */}
          <div className="pt-8 border-t border-[#1a1d29] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">28,800</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Vibrations / Hr</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300">68 Hrs</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Power Reserve</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">300 M</div>
              <div className="text-[11px] text-neutral-500 uppercase tracking-wider">Max Depth Cert.</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Spotlight Timepiece */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl p-2 bg-gradient-to-b from-[#242838] to-[#11131c] shadow-2xl border border-white/10 group">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
                alt="Oscilla Astral Automatic Timepiece"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Floating Caliber HUD Card */}
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl glass-panel text-white">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                    Flagship Piece • OSC-801-MID
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <Activity className="w-3 h-3" /> Regulated
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-white">
                  Oscilla Astral Automatic
                </h3>
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Caliber OSC-8800</span>
                  <span className="text-amber-300 font-bold">$2,450 USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
