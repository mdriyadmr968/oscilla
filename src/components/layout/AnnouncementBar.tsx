"use client";

import { ShieldCheck, Truck, Sparkles, Globe } from "lucide-react";
import { useCurrencyStore, CURRENCY_CONFIGS, CurrencyCode } from "@/lib/store/currencyStore";
import { useHydrated } from "@/lib/hooks/useHydrated";

export function AnnouncementBar() {
  const currentCurrency = useCurrencyStore((state) => state.currentCurrency);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const mounted = useHydrated();

  return (
    <div className="w-full bg-[#0d0e14] border-b border-[#1f222e] text-[11px] font-medium tracking-widest uppercase text-neutral-400 py-1.5 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden lg:flex items-center gap-1.5 text-amber-300/80">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hand-Regulated Horology &amp; Chronometer Precision</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0 text-neutral-300">
          <Truck className="w-3.5 h-3.5 text-amber-400/90" />
          <span>Complimentary Insured Armored Courier</span>
        </div>

        {/* Currency Switcher & Warranty */}
        <div className="flex items-center gap-4 text-neutral-400">
          <div className="hidden sm:flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>5-Year Atelier Warranty</span>
          </div>

          <div className="flex items-center gap-1 border-l border-[#232737] pl-3">
            <Globe className="w-3 h-3 text-amber-400" />
            <select
              value={mounted ? currentCurrency : "USD"}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="bg-transparent text-[10px] text-amber-300 font-mono font-semibold focus:outline-none cursor-pointer uppercase"
              aria-label="Select Currency"
            >
              {Object.keys(CURRENCY_CONFIGS).map((code) => (
                <option key={code} value={code} className="bg-[#12141c] text-neutral-200">
                  {code} ({CURRENCY_CONFIGS[code as CurrencyCode].symbol.trim()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
