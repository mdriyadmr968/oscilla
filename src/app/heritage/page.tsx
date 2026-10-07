import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Activity, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Atelier Heritage & Chronometer Craft — Oscilla",
  description: "Discover the craftsmanship, regulation protocols, and metallurgy behind Oscilla haute horlogerie timepieces.",
};

export default function HeritagePage() {
  return (
    <div className="w-full flex flex-col py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400 block">
          Genève Horlogerie
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
          The Art of Mechanical Equilibrium
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
          In an era of disposable digital electronics, Oscilla preserves the timeless ritual of micro-mechanical kinetics. Each balance wheel oscillates at 28,800 beats per hour, releasing micro-joules of tension with peerless symmetry.
        </p>
      </div>

      {/* Pillar 1: Regulation Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a26] border border-[#262c3e] text-xs font-mono text-amber-300">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span>Phase 01: 15-Day Chronometric Regulation</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">
            Regulated in 5 Positions Across 3 Temperatures
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Before any caliber is encased, our watchmakers submit the un-cased movement to continuous chronometric testing. By measuring positional delta across dial up, dial down, crown left, crown right, and crown up orientations, we tune the Glucydur balance wheel and Nivachron balance spring to maintain chronometer tolerances of -2/+4 seconds per day.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#11131c] border border-[#202433]">
              <span className="text-2xl font-bold font-mono text-white">4.0 Hz</span>
              <span className="text-xs text-neutral-500 block mt-1">High-Beat Frequency</span>
            </div>
            <div className="p-4 rounded-xl bg-[#11131c] border border-[#202433]">
              <span className="text-2xl font-bold font-mono text-amber-300">ISO 3159</span>
              <span className="text-xs text-neutral-500 block mt-1">Precision Standard</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-[#212534] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
              alt="Caliber Regulation"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-300">
              Oscilla Micro-Metrology Laboratory
            </div>
          </div>
        </div>
      </div>

      {/* Pillar 2: Metallurgy Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-[#212534] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1200&q=80"
              alt="Titanium and Stainless Steel Finishing"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-xs font-mono text-neutral-300">
              Grade 5 Titanium &amp; Forged Carbon Composite Flanks
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171a26] border border-[#262c3e] text-xs font-mono text-amber-300">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Phase 02: Advanced Metallurgy</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">
            Sculpted Aerospace Titanium &amp; Mirror-Bevelled Steel
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            We machine cases from forged titanium alloy Ti-6Al-4V (Grade 5), offering twice the tensile strength of aluminum with skin-neutral biocompatibility and corrosion immunity in oceanic depths. For dress calibers, we utilize low-carbon 316L medical stainless steel hand-polished with diamond paste for mirror reflections.
          </p>
          <div className="p-4 rounded-xl bg-[#11131c] border border-[#202433] space-y-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Zirconium Ceramic Bezels</span>
            </div>
            <p className="text-neutral-400 text-xs">
              Diamond-machined numerals filled with platinum or Super-LumiNova BGW9, immune to UV fading or environmental oxidation.
            </p>
          </div>
        </div>
      </div>

      {/* Pillar 3: Finishing & Anglage */}
      <div className="bg-[#10121b] border border-[#202433] rounded-3xl p-8 sm:p-12 mb-20 text-center max-w-4xl mx-auto space-y-6">
        <span className="text-xs uppercase font-mono tracking-[0.25em] text-amber-400 block">
          Haute Finition
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Hand-Chamfered Anglage &amp; Côtes de Genève
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          Even the components visible only through the sapphire caseback are finished by hand. The bridges feature circular perlage, hand-drawn linear graining, and mirror-polished chamfers that bounce light across every gear train rotation.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/catalog"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black font-semibold text-xs uppercase tracking-widest transition-all"
          >
            Explore Available Allocations
          </Link>
          <Link
            href="/vault"
            className="px-6 py-3.5 rounded-xl bg-[#171924] hover:bg-[#202332] text-neutral-200 border border-[#262b3b] font-medium text-xs uppercase tracking-widest transition-all"
          >
            Access Collector Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
