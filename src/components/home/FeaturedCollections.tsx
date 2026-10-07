"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
  {
    title: "Astral Automatics",
    category: "High-Beat 28,800 VPH",
    slug: "Astral",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Sunburst guilloché dials paired with exhibition sapphire casebacks.",
  },
  {
    title: "Chronos Flybacks",
    category: "Column-Wheel Precision",
    slug: "Chronos",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    description: "Instant mechanical reset pushers engineered for motorsport timing.",
  },
  {
    title: "Vanguard Divers",
    category: "Grade 5 Titanium & 300M",
    slug: "Vanguard",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80",
    description: "Helium release valves, ceramic bezels, and saltwater-proof ergonomics.",
  },
  {
    title: "Heritage Ultra-Thin",
    category: "18K Gold Manual Ritual",
    slug: "Heritage",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    description: "Razor-slim 7.8mm cases with blued steel feuille hands.",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 block mb-2">
            Curated Families
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            The Oscilla Collections
          </h2>
        </div>
        <Link
          href="/catalog"
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-300 font-medium transition-colors group"
        >
          <span>View All Series</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COLLECTIONS.map((col) => (
          <Link
            key={col.title}
            href={`/catalog?collection=${col.slug}`}
            className="group relative h-96 rounded-2xl overflow-hidden bg-[#10121a] border border-[#1e212d] hover:border-amber-400/50 transition-all flex flex-col justify-end p-6"
          >
            <Image
              src={col.image}
              alt={col.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="relative z-10 space-y-1.5">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block">
                {col.category}
              </span>
              <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors">
                {col.title}
              </h3>
              <p className="text-xs text-neutral-400 font-light line-clamp-2">
                {col.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-amber-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore Calibers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
