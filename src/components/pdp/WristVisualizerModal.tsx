"use client";

import { useState } from "react";
import { X, Ruler, CheckCircle2 } from "lucide-react";
import { WatchProduct } from "@/lib/types";

interface WristVisualizerModalProps {
  watch: WatchProduct;
  isOpen: boolean;
  onClose: () => void;
}

export function WristVisualizerModal({ watch, isOpen, onClose }: WristVisualizerModalProps) {
  const [wristSizeCm, setWristSizeCm] = useState(17.5); // standard ~6.9 inch wrist

  if (!isOpen) return null;

  const wristSizeInches = (wristSizeCm / 2.54).toFixed(1);
  const diameter = watch.specs.caseAndDial.diameterMm;

  // Proportion calculation: ratio of watch diameter relative to wrist top surface width (approx 30% of circumference)
  const approxWristWidthMm = (wristSizeCm * 10 * 0.32);
  const ratioPercentage = Math.round((diameter / approxWristWidthMm) * 100);

  let fitVerdict = "Balanced Modern Proportion";
  let verdictColor = "text-emerald-400";

  if (ratioPercentage > 85) {
    fitVerdict = "Bold & Assertive Tool Presence";
    verdictColor = "text-amber-400";
  } else if (ratioPercentage < 65) {
    fitVerdict = "Classical Vintage Understated Fit";
    verdictColor = "text-blue-400";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#11131c] border border-[#262939] rounded-2xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#1f2230] mb-5">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold text-white tracking-wide uppercase">
              Wrist Scale Visualizer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Watch Specs Brief */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#161824] border border-[#232737] mb-6 text-xs font-mono">
          <div>
            <span className="text-neutral-500 block">Case Diameter</span>
            <span className="text-white font-bold">{diameter} mm</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Lug-to-Lug Span</span>
            <span className="text-white font-bold">{watch.specs.caseAndDial.lugToLugMm} mm</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Case Thickness</span>
            <span className="text-white font-bold">{watch.specs.caseAndDial.thicknessMm} mm</span>
          </div>
        </div>

        {/* Wrist Circumference Slider */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-xs">
            <label className="text-neutral-300 font-medium">Your Wrist Circumference:</label>
            <span className="text-amber-300 font-mono font-bold">
              {wristSizeCm} cm ({wristSizeInches}&Prime;)
            </span>
          </div>

          <input
            type="range"
            min={14}
            max={21}
            step={0.5}
            value={wristSizeCm}
            onChange={(e) => setWristSizeCm(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
            <span>Slim (14 cm / 5.5&Prime;)</span>
            <span>Standard (17.5 cm / 6.9&Prime;)</span>
            <span>Generous (21 cm / 8.3&Prime;)</span>
          </div>
        </div>

        {/* Dynamic Proportion Simulation */}
        <div className="p-4 rounded-xl bg-[#0d0e14] border border-[#1d202b] text-center space-y-3 mb-6">
          <div className="relative mx-auto h-24 w-full flex items-center justify-center">
            {/* Visual wrist representation */}
            <div
              className="h-16 rounded-full bg-[#1e2230] border border-[#2f354a] flex items-center justify-center transition-all duration-300 relative"
              style={{ width: `${Math.min(100, Math.max(50, wristSizeCm * 4.5))}%` }}
            >
              {/* Watch case scale */}
              <div
                className="h-20 rounded-full bg-gradient-to-tr from-amber-500/80 to-yellow-300 border-2 border-white flex items-center justify-center shadow-lg transition-all duration-300"
                style={{ width: `${Math.max(40, diameter * 1.6)}px` }}
              >
                <span className="text-[10px] font-bold text-black font-mono">
                  {diameter}mm
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1a1d29]">
            <span className="text-xs text-neutral-400 block mb-0.5">Estimated Wrist Span Coverage:</span>
            <div className={`text-sm font-semibold ${verdictColor}`}>
              {fitVerdict} (~{ratioPercentage}% coverage)
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-neutral-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            With a compact lug-to-lug of {watch.specs.caseAndDial.lugToLugMm}mm and curved downturned lugs, this case is engineered to hug wrists comfortably from 15cm to 20cm without overhang.
          </span>
        </div>
      </div>
    </div>
  );
}
