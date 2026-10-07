"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, ArrowRight } from "lucide-react";
import { WATCHES_DATA } from "@/lib/data/watches";
import { formatCurrency } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredWatches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return WATCHES_DATA.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.referenceNumber.toLowerCase().includes(q) ||
        w.specs.movement.caliber.toLowerCase().includes(q) ||
        w.specs.caseAndDial.material.toLowerCase().includes(q) ||
        w.collection.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#11131a] border border-[#272b38] rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 py-3.5 border-b border-[#222533]">
          <Search className="w-5 h-5 text-amber-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by model, reference (e.g. OSC-801), caliber, or material..."
            className="w-full bg-transparent text-sm md:text-base text-neutral-100 placeholder-neutral-500 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {query.trim() === "" ? (
            <div className="py-8 text-center text-neutral-500 text-sm">
              <p>Type to search the Oscilla Horological Archive.</p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
                {["Chronograph", "Titanium", "Automatic", "Rose Gold", "Astral"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded bg-[#181a24] text-neutral-400 hover:text-amber-300 hover:border-amber-400/40 border border-transparent transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredWatches.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 text-sm">
              No timepieces found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filteredWatches.map((watch) => (
              <Link
                key={watch.id}
                href={`/watches/${watch.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 rounded-lg bg-[#161822] hover:bg-[#1d202d] border border-transparent hover:border-amber-500/30 transition-all group"
              >
                <div className="relative w-14 h-14 bg-black rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={watch.images.hero}
                    alt={watch.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">
                      {watch.referenceNumber}
                    </span>
                    <span className="text-xs text-neutral-500">•</span>
                    <span className="text-xs text-neutral-400">{watch.specs.movement.type}</span>
                  </div>
                  <h4 className="text-sm font-medium text-neutral-100 truncate group-hover:text-amber-300 transition-colors">
                    {watch.name}
                  </h4>
                  <p className="text-xs text-neutral-500 truncate">
                    {watch.specs.caseAndDial.material} • {watch.specs.caseAndDial.diameterMm}mm
                  </p>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-200">
                    {formatCurrency(watch.price)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
