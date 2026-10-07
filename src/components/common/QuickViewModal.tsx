"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag, Check, ShieldCheck, ArrowRight, Gauge, Clock, Layers } from "lucide-react";
import { WatchProduct, StrapMaterial } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";
import { STRAP_OPTIONS } from "@/lib/data/watches";

interface QuickViewModalProps {
  watch: WatchProduct | null;
  onClose: () => void;
}

export function QuickViewModal({ watch, onClose }: QuickViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedStrap, setSelectedStrap] = useState<StrapMaterial | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);

  if (!watch) return null;

  const currentStrap = selectedStrap || watch.specs.strap.defaultMaterial;

  const handleAddToCart = () => {
    addItem(watch, currentStrap, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div className="relative w-full max-w-4xl bg-[#10121b] border border-[#232737] rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full bg-black/40 hover:bg-black/80 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Canvas & Thumbnails */}
        <div className="w-full md:w-1/2 p-6 flex flex-col bg-[#0a0b10] border-b md:border-b-0 md:border-r border-[#1d202d]">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-black mb-4">
            <Image
              src={watch.images.gallery[selectedImage] || watch.images.hero}
              alt={watch.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {watch.images.gallery.length > 1 && (
            <div className="flex gap-2">
              {watch.images.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? "border-amber-400" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Watch Details */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold">
                {watch.referenceNumber}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-xs text-neutral-400 uppercase tracking-wider">
                {watch.collection} Collection
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              {watch.name}
            </h2>

            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              {watch.description}
            </p>

            {/* Quick Horology Key Specs */}
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#151722] border border-[#212433] mb-5">
              <div className="flex flex-col items-center text-center">
                <Clock className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] text-neutral-400 uppercase">Movement</span>
                <span className="text-xs font-semibold text-white truncate max-w-full">
                  {watch.specs.movement.type}
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Gauge className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] text-neutral-400 uppercase">Diameter</span>
                <span className="text-xs font-semibold text-white">
                  {watch.specs.caseAndDial.diameterMm} mm
                </span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Layers className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[10px] text-neutral-400 uppercase">Reserve</span>
                <span className="text-xs font-semibold text-white">
                  {watch.specs.movement.powerReserveHours} Hours
                </span>
              </div>
            </div>

            {/* Strap Selection */}
            <div className="mb-5">
              <label className="text-xs font-medium text-neutral-300 block mb-2">
                Configure Factory Strap:
              </label>
              <div className="space-y-1.5">
                {STRAP_OPTIONS.slice(0, 3).map((strap) => (
                  <button
                    key={strap.name}
                    type="button"
                    onClick={() => setSelectedStrap(strap.name)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                      currentStrap === strap.name
                        ? "bg-[#1c1f2d] border-amber-400 text-white"
                        : "bg-[#13151f] border-[#222534] text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>{strap.name}</span>
                    <span className="font-mono text-neutral-400">
                      {strap.priceDelta > 0 ? `+${formatCurrency(strap.priceDelta)}` : "Included"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-4 border-t border-[#1d202d] space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-neutral-500 uppercase block font-mono">Acquisition Price</span>
                <span className="text-2xl font-bold text-white font-mono">
                  {formatCurrency(watch.price)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>5-Yr Atelier Guarantee</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={!watch.inStock}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  !watch.inStock
                    ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                    : justAdded
                    ? "bg-emerald-500 text-black"
                    : "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black shadow-lg shadow-amber-500/10"
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
                    <span>{watch.inStock ? "Acquire Timepiece" : "Currently Unavailable"}</span>
                  </>
                )}
              </button>

              <Link
                href={`/watches/${watch.slug}`}
                onClick={onClose}
                className="py-3 px-3.5 rounded-xl bg-[#1b1e2b] hover:bg-[#25293b] text-neutral-200 text-xs font-semibold flex items-center justify-center transition-colors"
                title="View Full Specifications"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
