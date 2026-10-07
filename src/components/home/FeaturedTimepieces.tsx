"use client";

import { useState } from "react";
import { WATCHES_DATA } from "@/lib/data/watches";
import { WatchCard } from "@/components/common/WatchCard";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { WatchProduct } from "@/lib/types";

export function FeaturedTimepieces() {
  const [selectedWatch, setSelectedWatch] = useState<WatchProduct | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "automatic" | "chronograph">("all");

  const filtered = WATCHES_DATA.filter((w) => {
    if (activeTab === "automatic") return w.specs.movement.type === "Automatic";
    if (activeTab === "chronograph") return w.specs.movement.type === "Chronograph";
    return true;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div>
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 block mb-2">
            Haute Selection
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Distinguished Timepieces
          </h2>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-[#12141c] border border-[#202433] rounded-xl mt-4 sm:mt-0">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === "all"
                ? "bg-amber-500 text-black shadow-sm font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            All Pieces
          </button>
          <button
            onClick={() => setActiveTab("automatic")}
            className={`px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === "automatic"
                ? "bg-amber-500 text-black shadow-sm font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Automatic
          </button>
          <button
            onClick={() => setActiveTab("chronograph")}
            className={`px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider font-medium transition-all ${
              activeTab === "chronograph"
                ? "bg-amber-500 text-black shadow-sm font-semibold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Chronograph
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((watch) => (
          <WatchCard
            key={watch.id}
            watch={watch}
            onQuickView={(w) => setSelectedWatch(w)}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
      />
    </section>
  );
}
