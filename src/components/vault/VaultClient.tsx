"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Package,
  Award,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { WATCHES_DATA } from "@/lib/data/watches";
import { formatCurrency } from "@/lib/utils";

export function VaultClient() {
  const [activeTab, setActiveTab] = useState<"wishlist" | "orders" | "warranty">("wishlist");
  const mounted = useHydrated();

  const wishlistIds = useCartStore((state) => state.wishlistIds);
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);
  const orders = useCartStore((state) => state.orders);

  const activeWishlistIds = mounted ? wishlistIds : [];
  const activeOrders = mounted ? orders : [];
  const wishlistWatches = WATCHES_DATA.filter((w) => activeWishlistIds.includes(w.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header */}
      <div className="border-b border-[#1c1f2b] pb-8 mb-8">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400 block mb-2">
          Private Client Portal
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Collector Vault &amp; Ledger
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mt-2 font-light">
          Manage your saved horological timepieces, active atelier orders, registered warranty credentials, and serial certificates.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#1f2231] pb-4">
        {[
          { id: "wishlist", label: `Saved Wishlist (${wishlistWatches.length})`, icon: Heart },
          { id: "orders", label: `Acquisition Orders (${activeOrders.length})`, icon: Package },
          { id: "warranty", label: "Registered Caliber Warranties", icon: Award },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                isActive
                  ? "bg-amber-500 text-black shadow-md font-bold"
                  : "bg-[#141622] text-neutral-400 hover:text-white hover:bg-[#1d202e]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Saved Wishlist */}
      {activeTab === "wishlist" && (
        <div>
          {wishlistWatches.length === 0 ? (
            <div className="bg-[#10121b] border border-[#212534] rounded-2xl p-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#171926] text-neutral-500 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                Your Vault Wishlist is Empty
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Click the heart icon on any timepiece in our catalog to save it to your confidential collector vault.
              </p>
              <Link
                href="/catalog"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Browse Timepieces
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistWatches.map((watch) => (
                <div
                  key={watch.id}
                  className="p-4 rounded-xl bg-[#11131c] border border-[#202432] flex flex-col justify-between group"
                >
                  <Link href={`/watches/${watch.slug}`} className="block">
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-black mb-3">
                      <Image
                        src={watch.images.hero}
                        alt={watch.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[10px] text-amber-400 font-mono uppercase block">
                      {watch.referenceNumber}
                    </span>
                    <h4 className="text-sm font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                      {watch.name}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      {watch.specs.caseAndDial.material} • {watch.specs.movement.type}
                    </p>
                  </Link>

                  <div className="pt-4 mt-3 border-t border-[#1c1f2b] flex items-center justify-between">
                    <span className="text-base font-bold font-mono text-white">
                      {formatCurrency(watch.price)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleWishlist(watch.id)}
                        className="p-2 rounded-lg bg-[#191b26] text-neutral-400 hover:text-rose-400 text-xs transition-colors"
                        title="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current text-rose-500" />
                      </button>
                      <button
                        onClick={() => addItem(watch)}
                        disabled={!watch.inStock}
                        className="px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Acquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          {activeOrders.length === 0 ? (
            <div className="bg-[#10121b] border border-[#212534] rounded-2xl p-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#171926] text-neutral-500 flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                No Acquisitions on Record
              </h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                When you ratify a timepiece acquisition through our secure checkout, your order history and tracking will appear here.
              </p>
              <Link
                href="/catalog"
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Acquire a Timepiece
              </Link>
            </div>
          ) : (
            activeOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-[#11131c] border border-[#202432] space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1c1f2b] pb-4 gap-2">
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-mono block">
                      Order Reference
                    </span>
                    <span className="text-base font-bold font-mono text-white">
                      {order.id}
                    </span>
                    <span className="text-xs text-neutral-500 ml-2">
                      ({new Date(order.createdAt).toLocaleDateString()})
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Payment {order.paymentStatus}
                    </span>
                    <Link
                      href={`/order-success/${order.id}`}
                      className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:underline font-mono"
                    >
                      <span>Digital Certificate</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#0c0d14] border border-[#1b1e2b]"
                    >
                      <div className="relative w-14 h-14 bg-black rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.watch.images.hero} alt={item.watch.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <div className="font-semibold text-white truncate">{item.watch.name}</div>
                        <div className="text-[11px] text-neutral-400">{item.selectedStrap}</div>
                        <div className="text-neutral-500 text-[10px] font-mono">
                          Ref: {item.watch.referenceNumber} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right font-mono font-bold text-white text-xs">
                        {formatCurrency(item.watch.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tracking & Courier */}
                <div className="pt-3 border-t border-[#1c1f2b] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 gap-2">
                  <div>
                    <span>Armored Courier: </span>
                    <strong className="text-white font-mono">{order.courierName}</strong>
                    <span className="ml-2 font-mono text-amber-300">({order.trackingNumber})</span>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">
                    Total: {formatCurrency(order.total)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Registered Warranties */}
      {activeTab === "warranty" && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#11131c] border border-[#202432] space-y-4">
            <div className="flex items-center gap-3 border-b border-[#1c1f2b] pb-4">
              <Award className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-base font-serif font-bold text-white">
                  Oscilla 5-Year International Atelier Coverage
                </h3>
                <p className="text-xs text-neutral-400">
                  Global horological servicing network across Geneva, Zürich, New York, and Tokyo.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0c0d14] border border-[#1b1e2a] space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold block">Year 01 - 03</span>
                <h4 className="text-xs font-semibold text-white">Complimentary Pressure Test</h4>
                <p className="text-[11px] text-neutral-400">
                  Gasket lubrication and ultrasonic case cleaning at 36 months to ensure water resistance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0d14] border border-[#1b1e2a] space-y-2">
                <span className="text-xs font-mono text-amber-400 uppercase font-bold block">Year 04 - 05</span>
                <h4 className="text-xs font-semibold text-white">Caliber Timing Calibration</h4>
                <p className="text-[11px] text-neutral-400">
                  Precision escapement demagnetization and rate adjustment to maintain ±3s/day tolerance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0d14] border border-[#1b1e2a] space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase font-bold block">Lifetime</span>
                <h4 className="text-xs font-semibold text-white">Origin Registry Proof</h4>
                <p className="text-[11px] text-neutral-400">
                  Permanent authentication record in the Oscilla ledger safeguarding provenance for future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
