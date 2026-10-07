"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Sun, Moon, Eye, ZoomIn, Sparkles, Activity } from "lucide-react";
import { WatchProduct } from "@/lib/types";

interface WatchStudioInspectorProps {
  watch: WatchProduct;
}

export function WatchStudioInspector({ watch }: WatchStudioInspectorProps) {
  const [studioMode, setStudioMode] = useState<"day" | "lume" | "caseback">("day");
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  // Determine active visual
  const getActiveImage = () => {
    if (studioMode === "caseback") {
      return watch.images.gallery[2] || watch.images.gallery[1] || watch.images.hero;
    }
    return watch.images.gallery[0] || watch.images.hero;
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-[#0b0c13] border border-[#212535] shadow-2xl p-4 sm:p-6 space-y-4">
      {/* Studio Bar Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c1f2d] pb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-400" />
          <span className="text-xs uppercase font-mono tracking-widest text-white font-semibold">
            Oscilla Studio Loupe &bull; 360&deg; Inspection
          </span>
        </div>

        {/* View Mode Selectors */}
        <div className="flex items-center gap-1.5 p-1 bg-[#141622] rounded-xl border border-[#242738]">
          <button
            type="button"
            onClick={() => setStudioMode("day")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all ${
              studioMode === "day"
                ? "bg-amber-500 text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Sun className="w-3 h-3" />
            <span>Studio Light</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode("lume")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all ${
              studioMode === "lume"
                ? "bg-cyan-500 text-black font-bold shadow-sm shadow-cyan-500/30"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Moon className="w-3 h-3" />
            <span>BGW9 Night Lume</span>
          </button>

          <button
            type="button"
            onClick={() => setStudioMode("caseback")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all ${
              studioMode === "caseback"
                ? "bg-amber-500 text-black font-bold shadow-sm"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Activity className="w-3 h-3" />
            <span>Exhibition Caseback</span>
          </button>
        </div>

        {/* Zoom Toggle */}
        <button
          type="button"
          onClick={() => setIsZoomActive(!isZoomActive)}
          className={`px-3 py-1 rounded-lg text-[11px] font-mono border transition-all flex items-center gap-1.5 ${
            isZoomActive
              ? "bg-[#252839] border-amber-400 text-amber-300"
              : "bg-[#141622] border-[#222534] text-neutral-400 hover:text-white"
          }`}
        >
          <ZoomIn className="w-3 h-3" />
          <span>{isZoomActive ? "Loupe Active (2.5x)" : "Enable Loupe"}</span>
        </button>
      </div>

      {/* Visual Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-xl overflow-hidden cursor-crosshair transition-all duration-700 ${
          studioMode === "lume"
            ? "bg-[#03060a] ring-2 ring-cyan-500/20 shadow-inner"
            : "bg-[#08090e]"
        }`}
      >
        <Image
          src={getActiveImage()}
          alt={watch.name}
          fill
          className={`object-cover object-center transition-all duration-700 ${
            studioMode === "lume"
              ? "brightness-40 contrast-175 invert-[0.15] hue-rotate-180 drop-shadow-[0_0_20px_#06b6d4]"
              : "brightness-100"
          }`}
        />

        {/* Night Lume Ambient Simulation */}
        {studioMode === "lume" && (
          <div className="absolute inset-0 bg-cyan-950/40 mix-blend-color-dodge pointer-events-none flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" />
          </div>
        )}

        {/* Interactive Loupe Magnifier Lens */}
        {isZoomActive && (
          <div
            className="absolute w-44 h-44 rounded-full border-2 border-amber-400 shadow-2xl overflow-hidden pointer-events-none transform -translate-x-1/2 -translate-y-1/2 hidden md:block bg-black"
            style={{
              left: `${zoomPos.x}%`,
              top: `${zoomPos.y}%`,
            }}
          >
            <div
              className="absolute w-[250%] h-[250%]"
              style={{
                left: `-${zoomPos.x * 1.5}%`,
                top: `-${zoomPos.y * 1.5}%`,
              }}
            >
              <Image
                src={getActiveImage()}
                alt="Loupe Zoom"
                fill
                className={`object-cover ${
                  studioMode === "lume"
                    ? "brightness-50 contrast-175 drop-shadow-[0_0_25px_#06b6d4]"
                    : "brightness-110"
                }`}
              />
            </div>
            {/* Loupe Crosshair overlay */}
            <div className="absolute inset-0 border border-white/20 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-3 h-3 border border-amber-400/60 rounded-full" />
            </div>
          </div>
        )}

        {/* Mode HUD Overlay Note */}
        <div className="absolute bottom-3 left-3 p-2 px-3 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-amber-400" />
          {studioMode === "day" && <span>Simulated Studio Light &bull; Hand-Chamfered Lugs &bull; 40mm Architecture</span>}
          {studioMode === "lume" && <span className="text-cyan-300">Grade A Super-LumiNova BGW9 Glowing Cyan &bull; 8-Hour Luminescence</span>}
          {studioMode === "caseback" && <span className="text-amber-300">Caliber {watch.specs.movement.caliber} &bull; Côtes de Genève Stripes</span>}
        </div>
      </div>
    </div>
  );
}
