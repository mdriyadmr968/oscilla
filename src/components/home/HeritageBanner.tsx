"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeritageBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#11131c] to-[#0c0d14] border border-[#232737] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Background accent */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 block">
            The Philosophy of Oscilla
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            The Architecture of Time:{" "}
            <span className="gold-gradient-text block">Balanced to 1/100th of a Millimeter.</span>
          </h2>

          <p className="text-neutral-400 text-sm leading-relaxed font-light">
            Every Oscilla timepiece is born from a singular obsession: the harmonic frequency of the balance wheel. When a watch ticks, energy is released in discrete, balanced pulses. We honor this mechanical ballet with hand-chamfered bridges, anti-magnetic alloys, and sapphire crystal exhibition apertures.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300 pt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Multi-position temperature regulation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Côtes de Genève &amp; perlage hand-finishing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Grade 5 Titanium &amp; 316L solid metallurgy</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Numbered micro-batch collector serialization</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/heritage"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1a1d29] hover:bg-[#25293a] text-white text-xs uppercase tracking-widest font-semibold border border-white/10 transition-all group"
            >
              <span>Explore Atelier Craftsmanship</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
            </Link>
          </div>
        </div>

        {/* Right Visual Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1547996160-71dfabbce5fa?auto=format&fit=crop&w=1000&q=80"
              alt="Oscilla Mechanical Movement Inspection"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono flex justify-between items-center">
              <span>Oscillation: 4Hz / 28,800 A/h</span>
              <span className="text-amber-300">Regulated ±3s/day</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
