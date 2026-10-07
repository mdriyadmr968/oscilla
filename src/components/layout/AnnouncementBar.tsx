"use client";

import { ShieldCheck, Truck, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#0d0e14] border-b border-[#1f222e] text-[11px] font-medium tracking-widest uppercase text-neutral-400 py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-1.5 text-amber-300/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hand-Regulated Horology &amp; Chronometer Precision</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 text-neutral-300">
          <Truck className="w-3.5 h-3.5 text-amber-400/90" />
          <span>Complimentary Insured Armored Courier On All Orders</span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>5-Year International Atelier Warranty</span>
        </div>
      </div>
    </div>
  );
}
