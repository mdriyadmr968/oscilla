"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag, Check } from "lucide-react";
import { WatchProduct } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";
import { useCurrencyStore } from "@/lib/store/currencyStore";
import { useHydrated } from "@/lib/hooks/useHydrated";

interface WatchCardProps {
  watch: WatchProduct;
  onQuickView?: (watch: WatchProduct) => void;
}

export function WatchCard({ watch, onQuickView }: WatchCardProps) {
  const isInWishlist = useCartStore((state) => state.isInWishlist(watch.id));
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const mounted = useHydrated();

  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!watch.inStock) return;
    addItem(watch);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(watch.id);
  };

  return (
    <div className="group relative bg-[#10121a] border border-[#1e2230] hover:border-amber-500/40 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl hover:shadow-amber-500/5">
      {/* Visual Canvas */}
      <Link href={`/watches/${watch.slug}`} className="relative aspect-[4/5] w-full bg-[#090b10] overflow-hidden block">
        <Image
          src={watch.images.hero}
          alt={watch.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-transparent to-transparent opacity-80" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!watch.inStock ? (
            <span className="px-2.5 py-1 rounded bg-neutral-900/90 text-neutral-400 border border-neutral-700 text-[10px] uppercase tracking-wider font-semibold">
              Sold Out
            </span>
          ) : watch.isNewArrival ? (
            <span className="px-2.5 py-1 rounded bg-amber-500 text-black text-[10px] uppercase tracking-wider font-bold shadow-md">
              New Caliber
            </span>
          ) : watch.isFeatured ? (
            <span className="px-2.5 py-1 rounded bg-[#181c28]/90 text-amber-300 border border-amber-400/30 text-[10px] uppercase tracking-wider font-semibold backdrop-blur-sm">
              Featured
            </span>
          ) : null}
        </div>

        {/* Top Right Actions (Wishlist) */}
        <button
          onClick={handleWishlistClick}
          aria-label="Save to Vault"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isInWishlist
              ? "bg-amber-500 text-black shadow-lg"
              : "bg-black/40 text-neutral-300 hover:text-white hover:bg-black/70"
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Hover Bar */}
        {onQuickView && (
          <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(watch);
              }}
              className="flex-1 py-2 px-3 rounded-lg bg-black/80 hover:bg-black text-neutral-200 text-xs font-medium backdrop-blur-sm border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Quick Inspect</span>
            </button>
          </div>
        )}
      </Link>

      {/* Information Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Micro horology tags */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono mb-1.5">
            <span className="text-amber-400/90 uppercase tracking-wider">{watch.referenceNumber}</span>
            <span>{watch.specs.caseAndDial.diameterMm}mm • {watch.specs.movement.type}</span>
          </div>

          <Link href={`/watches/${watch.slug}`}>
            <h3 className="text-sm font-semibold text-neutral-100 group-hover:text-amber-300 transition-colors line-clamp-1">
              {watch.name}
            </h3>
          </Link>

          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
            {watch.specs.caseAndDial.material}
          </p>
        </div>

        {/* Price & Quick Add */}
        <div className="pt-3.5 mt-3 border-t border-[#1b1e2a] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-white font-mono">
              {mounted ? formatPrice(watch.price) : formatCurrency(watch.price)}
            </span>
            {watch.originalPrice && (
              <span className="text-xs text-neutral-500 line-through font-mono">
                {mounted ? formatPrice(watch.originalPrice) : formatCurrency(watch.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!watch.inStock}
            aria-label="Add to cart"
            className={`p-2 rounded-lg transition-all ${
              !watch.inStock
                ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                : justAdded
                ? "bg-emerald-500 text-black"
                : "bg-[#1c202d] hover:bg-amber-500 hover:text-black text-neutral-300"
            }`}
          >
            {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
