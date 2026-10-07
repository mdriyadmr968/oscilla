"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Tag } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { STRAP_OPTIONS } from "@/lib/data/watches";
import { StrapMaterial } from "@/lib/types";

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    updateStrap,
    promoCode,
    discountPercentage,
    applyPromoCode,
    removePromoCode,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.watch.price * item.quantity, 0);
  const discountAmount = subtotal * discountPercentage;
  const total = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = useCartStore.getState().applyPromoCode(promoInput);
    if (res.success) {
      setPromoFeedback({ message: res.message, isError: false });
      setPromoInput("");
    } else {
      setPromoFeedback({ message: res.message, isError: true });
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#0f1017] border-l border-[#202330] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-[#1c1f2b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold text-white tracking-wide uppercase">
              Curated Vault ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#1a1c26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Armored Freight Progress */}
        <div className="px-5 py-3 bg-[#13151f] border-b border-[#1c1f2b] text-xs">
          <div className="flex justify-between items-center text-neutral-300 mb-1.5">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-amber-300 font-medium">Complimentary Insured Freight Qualified</span>
              ) : (
                <span>Add {formatCurrency(freeShippingThreshold - subtotal)} for Free Armored Delivery</span>
              )}
            </span>
            <span className="text-neutral-400 font-mono">{Math.round(progressToFreeShipping)}%</span>
          </div>
          <div className="w-full bg-[#1e212f] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#171923] flex items-center justify-center mb-4 text-neutral-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-medium text-neutral-200 mb-1">Your vault is empty</h4>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                Explore our catalog of hand-assembled chronographs, divers, and high-beat automatics.
              </p>
              <Link
                href="/catalog"
                onClick={closeCart}
                className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs tracking-wider uppercase transition-all"
              >
                Explore Timepieces
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#141620] border border-[#212433] flex gap-3.5"
              >
                <div className="relative w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.watch.images.hero}
                    alt={item.watch.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400">
                        {item.watch.referenceNumber}
                      </span>
                      <h4 className="text-xs font-semibold text-neutral-100 truncate">
                        {item.watch.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Strap selection dropdown */}
                  <div className="mt-1.5">
                    <label className="text-[10px] text-neutral-500 block mb-0.5">Fitted Strap:</label>
                    <select
                      value={item.selectedStrap}
                      onChange={(e) => updateStrap(item.id, e.target.value as StrapMaterial)}
                      className="w-full bg-[#1b1e2a] border border-[#272b3a] rounded text-[11px] text-neutral-200 py-0.5 px-1.5 focus:outline-none focus:border-amber-400"
                    >
                      {STRAP_OPTIONS.map((opt) => (
                        <option key={opt.name} value={opt.name}>
                          {opt.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border border-[#262939] rounded bg-[#10121a]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono text-neutral-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-neutral-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-semibold text-neutral-200">
                      {formatCurrency(item.watch.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-[#12141c] border-t border-[#1e212f] space-y-3.5">
            {/* Promo code input */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between p-2 rounded bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Code &ldquo;{promoCode}&rdquo; ({(discountPercentage * 100).toFixed(0)}% Off)</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-neutral-400 hover:text-white underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePromoSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (e.g. OSCILLA10)"
                    className="flex-1 bg-[#1a1c27] border border-[#272a39] rounded-lg px-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#252838] hover:bg-[#31354a] text-neutral-200 text-xs font-medium rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoFeedback && !promoCode && (
                <p className={`text-[11px] mt-1 ${promoFeedback.isError ? "text-rose-400" : "text-emerald-400"}`}>
                  {promoFeedback.message}
                </p>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-400 border-t border-[#1e212f] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-neutral-200 font-mono">{formatCurrency(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Collector Privilege Discount</span>
                  <span className="font-mono">-{formatCurrency(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Armored Courier Delivery</span>
                <span className="text-emerald-400 font-medium">Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-[#1e212f]">
                <span>Total Due</span>
                <span className="font-mono text-amber-300">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 transition-all"
            >
              <span>Proceed to Secure Acquisition</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
