"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Award, Printer, ArrowRight, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/utils";

interface OrderSuccessClientProps {
  orderId: string;
}

export function OrderSuccessClient({ orderId }: OrderSuccessClientProps) {
  const orders = useCartStore((state) => state.orders);

  const order = useMemo(() => {
    return orders.find((o) => o.id === orderId) || orders[0] || null;
  }, [orders, orderId]);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
      {/* Top Banner */}
      <div className="text-center space-y-3 mb-12">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400 block">
          Acquisition Ratified
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Welcome to the Oscilla Atelier Ledger
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto font-light">
          Your allocation has been secured. Your digital certificate of authenticity is registered in our Swiss registry under Order Ref:{" "}
          <strong className="text-white font-mono">{order?.id || orderId}</strong>.
        </p>
      </div>

      {/* Digital Certificate of Authenticity */}
      <div className="relative rounded-2xl bg-gradient-to-b from-[#191c28] to-[#10121a] border-2 border-amber-400/40 p-6 sm:p-10 shadow-2xl mb-12 overflow-hidden">
        {/* Certificate Watermark */}
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
          <Award className="w-48 h-48 text-amber-300" />
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-amber-400/20 pb-4 gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-mono block">
                Certificate of Origin &amp; Authenticity
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                Oscilla Horlogerie S.A.
              </h2>
            </div>
            <div className="text-left sm:text-right font-mono text-xs text-neutral-400">
              <div>Registration: <span className="text-amber-300">{order?.id || orderId}</span></div>
              <div>Status: <span className="text-emerald-400 font-semibold">Active Warranty (5-Year)</span></div>
            </div>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed font-light italic">
            &ldquo;This certifies that the timepieces detailed below have been hand-assembled, individually tested in multiple positions, and adjusted for chronometric precision conforming to the exacting standards of Haute Horlogerie.&rdquo;
          </p>

          {/* Timepieces in this Order */}
          <div className="space-y-3 pt-2">
            {order?.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-[#0c0d13] border border-white/5"
              >
                <div className="relative w-14 h-14 bg-black rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.watch.images.hero} alt={item.watch.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 text-xs">
                  <span className="font-mono text-amber-400 text-[10px] block">
                    REF: {item.watch.referenceNumber} • SERIAL: OSC-CAL-{(Math.random() * 10000).toFixed(0)}
                  </span>
                  <div className="font-bold text-white truncate">{item.watch.name}</div>
                  <div className="text-neutral-400 text-[11px]">
                    {item.selectedStrap} • {item.watch.specs.movement.caliber}
                  </div>
                </div>
                <div className="text-right font-mono text-xs font-bold text-amber-300">
                  {formatCurrency(item.watch.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-amber-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-neutral-400 gap-4">
            <div>
              <span className="block text-neutral-300 font-semibold">Consignee:</span>
              <span>{order?.customer.fullName || "Valued Collector"}</span>
              <span className="block">{order?.customer.city}, {order?.customer.country}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>International Warranty Registered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transit Timeline */}
      <div className="p-6 rounded-2xl bg-[#10121b] border border-[#212534] mb-10 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1c1f2b] pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Transit &amp; Armored Courier Schedule
            </h3>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            Carrier: {order?.courierName || "Brink's Global"} ({order?.trackingNumber || "Assigned"})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center sm:text-left pt-2">
          <div className="p-3 rounded-lg bg-[#151724] border border-[#232738]">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Phase 01</div>
            <div className="text-xs font-bold text-white mt-0.5">Payment Verified</div>
            <div className="text-[10px] text-emerald-400 mt-1">Completed</div>
          </div>
          <div className="p-3 rounded-lg bg-[#151724] border border-amber-500/30">
            <div className="text-[10px] font-mono text-amber-400 uppercase">Phase 02</div>
            <div className="text-xs font-bold text-white mt-0.5">Chronometer Check</div>
            <div className="text-[10px] text-amber-300 mt-1">In Progress</div>
          </div>
          <div className="p-3 rounded-lg bg-[#12141e] border border-[#1d202d] opacity-60">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Phase 03</div>
            <div className="text-xs font-bold text-neutral-300 mt-0.5">Armored Hand-Off</div>
            <div className="text-[10px] text-neutral-500 mt-1">Upcoming</div>
          </div>
          <div className="p-3 rounded-lg bg-[#12141e] border border-[#1d202d] opacity-60">
            <div className="text-[10px] font-mono text-neutral-500 uppercase">Phase 04</div>
            <div className="text-xs font-bold text-neutral-300 mt-0.5">Biometric Delivery</div>
            <div className="text-[10px] text-neutral-500 mt-1">Direct Signature</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={handlePrint}
          className="px-6 py-3 rounded-xl bg-[#171924] hover:bg-[#202332] text-neutral-200 border border-[#272b3c] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <Printer className="w-4 h-4 text-neutral-400" />
          <span>Print Acquisition Dossier</span>
        </button>

        <Link
          href="/vault"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-amber-500/10"
        >
          <span>View In Collector Vault</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
