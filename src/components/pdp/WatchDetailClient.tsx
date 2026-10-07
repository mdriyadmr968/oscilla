"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Check,
  Ruler,
  Star,
  Clock,
  Gauge,
  Layers,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";
import { WatchProduct, StrapMaterial } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { STRAP_OPTIONS, WATCHES_DATA } from "@/lib/data/watches";
import { useCartStore } from "@/lib/store/cartStore";
import { useCurrencyStore } from "@/lib/store/currencyStore";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { WristVisualizerModal } from "./WristVisualizerModal";
import { WatchCard } from "@/components/common/WatchCard";
import { WatchStudioInspector } from "./WatchStudioInspector";

interface WatchDetailClientProps {
  watch: WatchProduct;
}

export function WatchDetailClient({ watch }: WatchDetailClientProps) {
  const router = useRouter();
  const formatPrice = useCurrencyStore((state) => state.formatPrice);
  const mounted = useHydrated();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedStrap, setSelectedStrap] = useState<StrapMaterial>(
    watch.specs.strap.defaultMaterial
  );
  const [quantity, setQuantity] = useState(1);
  const [isVisualizerOpen, setIsVisualizerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"movement" | "case" | "strap" | "warranty">("movement");
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const isInWishlist = useCartStore((state) => state.isInWishlist(watch.id));
  const toggleWishlist = useCartStore((state) => state.toggleWishlist);

  // Calculate adjusted price based on strap choice
  const chosenStrapOption = STRAP_OPTIONS.find((s) => s.name === selectedStrap);
  const strapDelta = chosenStrapOption ? chosenStrapOption.priceDelta : 0;
  const unitPrice = watch.price + strapDelta;

  const handleAddToCart = () => {
    if (!watch.inStock) return;
    addItem(watch, selectedStrap, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleExpressCheckout = () => {
    if (!watch.inStock) return;
    addItem(watch, selectedStrap, quantity);
    router.push("/checkout");
  };

  const relatedWatches = WATCHES_DATA.filter((w) => w.id !== watch.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-400 mb-8 font-mono">
        <Link href="/" className="hover:text-white transition-colors">
          Atelier
        </Link>
        <ChevronRight className="w-3 h-3 text-neutral-600" />
        <Link href="/catalog" className="hover:text-white transition-colors">
          Timepieces
        </Link>
        <ChevronRight className="w-3 h-3 text-neutral-600" />
        <span className="text-amber-300 truncate max-w-[200px] sm:max-w-none">
          {watch.name}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
        {/* Left Column: Visual Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual */}
          <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#0d0e14] border border-[#212433] group">
            <Image
              src={watch.images.gallery[activeImage] || watch.images.hero}
              alt={watch.name}
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b10]/60 via-transparent to-transparent pointer-events-none" />

            {/* Quick Wishlist on image */}
            <button
              onClick={() => toggleWishlist(watch.id)}
              aria-label="Save to Vault"
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                isInWishlist
                  ? "bg-amber-500 text-black shadow-lg"
                  : "bg-black/50 text-white hover:bg-black/80"
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
            </button>

            {/* Micro Badge */}
            <div className="absolute bottom-4 left-4 p-2 px-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Layer Anti-Reflective Sapphire</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-3">
            {watch.images.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-black transition-all ${
                  activeImage === idx
                    ? "border-amber-400 opacity-100 shadow-md shadow-amber-500/10"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${watch.name} view ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Acquisition Dossier */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Identifiers */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-amber-400 tracking-widest uppercase font-bold">
                {watch.referenceNumber}
              </span>
              <span className="text-neutral-400 uppercase tracking-wider">
                {watch.collection} Series
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {watch.name}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light leading-relaxed">
              {watch.tagline}
            </p>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#1c1f2b]">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold font-mono text-white">
                {watch.rating.toFixed(1)}
              </span>
              <span className="text-xs text-neutral-500">
                ({watch.reviewCount} Certified Collector Reviews)
              </span>
            </div>
          </div>

          {/* Price & Allocation Status */}
          <div className="p-4 rounded-xl bg-[#12141c] border border-[#212534] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">
                Acquisition Value
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                  {mounted ? formatPrice(unitPrice) : formatCurrency(unitPrice)}
                </span>
                {watch.originalPrice && (
                  <span className="text-xs text-neutral-500 line-through font-mono">
                    {mounted ? formatPrice(watch.originalPrice) : formatCurrency(watch.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              {watch.inStock ? (
                <div className="flex flex-col items-end">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Allocation Available
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono mt-1">
                    {watch.stockCount} Pieces Remaining
                  </span>
                </div>
              ) : (
                <span className="px-2.5 py-1 rounded bg-neutral-800 text-neutral-400 text-xs font-semibold">
                  Allocation Exhausted
                </span>
              )}
            </div>
          </div>

          {/* Wrist Scale Visualizer Action */}
          <button
            onClick={() => setIsVisualizerOpen(true)}
            className="w-full p-3 rounded-xl bg-[#161824] hover:bg-[#1d202f] border border-[#262b3b] text-neutral-200 text-xs font-medium flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-amber-400" />
              <span>Interactive Wrist Size Visualizer ({watch.specs.caseAndDial.diameterMm}mm Case)</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Strap Selector Customizer */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-neutral-300 font-medium">
                Choose Factory Strap:
              </label>
              <span className="text-neutral-400 text-[11px]">
                {watch.specs.strap.lugWidthMm}mm Lug Width
              </span>
            </div>

            <div className="space-y-1.5">
              {STRAP_OPTIONS.map((strap) => (
                <button
                  key={strap.name}
                  type="button"
                  onClick={() => setSelectedStrap(strap.name)}
                  className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                    selectedStrap === strap.name
                      ? "bg-[#1c1f2e] border-amber-400 text-white shadow-sm"
                      : "bg-[#12141c] border-[#222533] text-neutral-400 hover:text-white"
                  }`}
                >
                  <div>
                    <span className="font-semibold block">{strap.name}</span>
                    <span className="text-[11px] text-neutral-500 font-light block">
                      {strap.description}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-300">
                    {strap.priceDelta > 0 ? `+${mounted ? formatPrice(strap.priceDelta) : formatCurrency(strap.priceDelta)}` : "Standard"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Controls */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#242838] rounded-xl bg-[#12141d] px-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-neutral-400 hover:text-white px-2 py-2"
                >
                  -
                </button>
                <span className="px-2 text-xs font-mono font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(watch.stockCount || 10, quantity + 1))}
                  className="text-neutral-400 hover:text-white px-2 py-2"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!watch.inStock}
                className={`flex-1 py-4 px-6 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all ${
                  !watch.inStock
                    ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                    : justAdded
                    ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                    : "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black shadow-xl shadow-amber-500/15"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Vault</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{watch.inStock ? "Acquire Timepiece" : "Allocation Closed"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Express Checkout Button */}
            {watch.inStock && (
              <button
                onClick={handleExpressCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1b1e2c] hover:bg-[#252a3d] text-white border border-[#2b3045] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Express Armored Checkout</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            )}
          </div>

          {/* Trust Assurances */}
          <div className="p-4 rounded-xl bg-[#0f1118] border border-[#1d202c] space-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Complimentary insured courier with biometric signature release.</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>5-Year International Atelier Warranty card with serial number registry.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 360 Studio Loupe & Lume Night-Glow Inspector */}
      <section className="mb-20">
        <WatchStudioInspector watch={watch} />
      </section>

      {/* Horological Dossier Accordion/Tabs */}
      <section className="mb-20 bg-[#10121b] border border-[#212534] rounded-2xl p-6 sm:p-10">
        <div className="border-b border-[#212433] pb-4 mb-8">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 block mb-1">
            Manufacture Specifications
          </span>
          <h2 className="text-2xl font-serif font-bold text-white">
            The Technical Dossier
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#1c1f2b] pb-4">
          {[
            { id: "movement", label: "Movement & Caliber", icon: Clock },
            { id: "case", label: "Case & Architecture", icon: Gauge },
            { id: "strap", label: "Strap & Ergonomics", icon: Layers },
            { id: "warranty", label: "Warranty & Delivery", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500 text-black shadow-md"
                    : "bg-[#161824] text-neutral-400 hover:text-white hover:bg-[#1e2230]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "movement" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Caliber Reference</span>
              <span className="text-sm font-bold text-white mt-1 block">
                {watch.specs.movement.caliber}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Oscillation Frequency</span>
              <span className="text-sm font-bold text-amber-300 mt-1 block font-mono">
                {watch.specs.movement.frequencyVph.toLocaleString()} VPH (4 Hz)
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Power Reserve</span>
              <span className="text-sm font-bold text-white mt-1 block font-mono">
                {watch.specs.movement.powerReserveHours} Hours Autonomous
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Synthetic Jewels</span>
              <span className="text-sm font-bold text-white mt-1 block font-mono">
                {watch.specs.movement.jewelsCount} Ruby Jewels
              </span>
            </div>
          </div>
        )}

        {activeTab === "case" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Case Material</span>
              <span className="text-sm font-bold text-white mt-1 block">
                {watch.specs.caseAndDial.material}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Diameter &amp; Thickness</span>
              <span className="text-sm font-bold text-white mt-1 block font-mono">
                {watch.specs.caseAndDial.diameterMm}mm &times; {watch.specs.caseAndDial.thicknessMm}mm
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Sapphire Crystal</span>
              <span className="text-sm font-bold text-white mt-1 block">
                {watch.specs.caseAndDial.crystal}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Water Resistance</span>
              <span className="text-sm font-bold text-emerald-400 mt-1 block font-mono">
                {watch.specs.caseAndDial.waterResistanceAtm} ATM ({watch.specs.caseAndDial.waterResistanceAtm * 10}m)
              </span>
            </div>
          </div>
        )}

        {activeTab === "strap" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Lug Span Width</span>
              <span className="text-sm font-bold text-white mt-1 block font-mono">
                {watch.specs.strap.lugWidthMm} mm
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Clasp Mechanism</span>
              <span className="text-sm font-bold text-white mt-1 block">
                {watch.specs.strap.claspType}
              </span>
            </div>
            <div className="p-4 rounded-xl bg-[#141622] border border-[#202331]">
              <span className="text-[11px] text-neutral-500 uppercase block font-mono">Interchangeability</span>
              <span className="text-sm font-bold text-amber-300 mt-1 block">
                Quick-Release Tool-Free Spring Bars
              </span>
            </div>
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="p-6 rounded-xl bg-[#141622] border border-[#202331] space-y-4 text-xs text-neutral-300 leading-relaxed">
            <p>
              Every timepiece leaving our atelier includes a registered international physical metal warranty card serialized to your specific movement number.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
              <li>Comprehensive 5-year coverage covering movement deviation beyond ISO 3159 chronometer parameters.</li>
              <li>Free pressure testing and gasket replacement at year 3.</li>
              <li>Fully insured, arm-to-arm transit with tamper-evident seal and biometric signature handoff.</li>
            </ul>
          </div>
        )}
      </section>

      {/* Related Horology Recommendations */}
      <section className="mb-10">
        <div className="mb-8">
          <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 block mb-1">
            Complementary Calibers
          </span>
          <h2 className="text-2xl font-serif font-bold text-white">
            From the Same Atelier
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedWatches.map((w) => (
            <WatchCard key={w.id} watch={w} />
          ))}
        </div>
      </section>

      {/* Wrist Visualizer Modal */}
      <WristVisualizerModal
        watch={watch}
        isOpen={isVisualizerOpen}
        onClose={() => setIsVisualizerOpen(false)}
      />
    </div>
  );
}
