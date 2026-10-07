"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, ChevronDown, Check } from "lucide-react";
import { WATCHES_DATA } from "@/lib/data/watches";
import { WatchCard } from "@/components/common/WatchCard";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { WatchProduct, MovementType, CaseMaterial } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

const COLLECTIONS = ["Astral", "Chronos", "Vanguard", "Heritage", "Nocturne"] as const;
const MOVEMENTS: MovementType[] = ["Automatic", "Chronograph", "Manual Wind"];
const MATERIALS: CaseMaterial[] = [
  "316L Stainless Steel",
  "Titanium Grade 5",
  "Rose Gold 18K",
  "Ceramic Matte",
  "Forged Carbon",
];

export function CatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedMovements, setSelectedMovements] = useState<MovementType[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<CaseMaterial[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [selectedWatch, setSelectedWatch] = useState<WatchProduct | null>(null);

  // Sync initial state from URL query parameters
  useEffect(() => {
    const colParam = searchParams.get("collection");
    if (colParam) {
      setSelectedCollections([colParam]);
    }
    const moveParam = searchParams.get("movement");
    if (moveParam && MOVEMENTS.includes(moveParam as MovementType)) {
      setSelectedMovements([moveParam as MovementType]);
    }
    const matParam = searchParams.get("material");
    if (matParam && MATERIALS.includes(matParam as CaseMaterial)) {
      setSelectedMaterials([matParam as CaseMaterial]);
    }
  }, [searchParams]);

  const toggleCollection = (c: string) => {
    setSelectedCollections((prev) =>
      prev.includes(c) ? prev.filter((item) => item !== c) : [...prev, c]
    );
  };

  const toggleMovement = (m: MovementType) => {
    setSelectedMovements((prev) =>
      prev.includes(m) ? prev.filter((item) => item !== m) : [...prev, m]
    );
  };

  const toggleMaterial = (mat: CaseMaterial) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((item) => item !== mat) : [...prev, mat]
    );
  };

  const resetAllFilters = () => {
    setSelectedCollections([]);
    setSelectedMovements([]);
    setSelectedMaterials([]);
    setMaxPrice(5000);
    setInStockOnly(false);
    setSortBy("featured");
    router.replace("/catalog");
  };

  const hasActiveFilters =
    selectedCollections.length > 0 ||
    selectedMovements.length > 0 ||
    selectedMaterials.length > 0 ||
    maxPrice < 5000 ||
    inStockOnly;

  const filteredWatches = useMemo(() => {
    return WATCHES_DATA.filter((watch) => {
      if (selectedCollections.length > 0 && !selectedCollections.includes(watch.collection)) {
        return false;
      }
      if (selectedMovements.length > 0 && !selectedMovements.includes(watch.specs.movement.type)) {
        return false;
      }
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(watch.specs.caseAndDial.material)) {
        return false;
      }
      if (watch.price > maxPrice) {
        return false;
      }
      if (inStockOnly && !watch.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCollections, selectedMovements, selectedMaterials, maxPrice, inStockOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Header Banner */}
      <div className="mb-10 text-center sm:text-left border-b border-[#1c1f2b] pb-8">
        <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400 block mb-2">
          Horological Collection
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          All Timepieces
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mt-2 font-light">
          Explore our certified chronometers, column-wheel chronographs, and titanium deep-sea diving instruments.
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#11131b] border border-[#212433] rounded-xl p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#1a1d29] border border-[#2c3042] text-xs font-semibold text-neutral-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>Refine Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>

          <span className="text-xs font-mono text-neutral-400">
            Showing <strong className="text-white">{filteredWatches.length}</strong> of {WATCHES_DATA.length} Timepieces
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-400 hidden sm:inline">Sort By:</label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-[#191b26] border border-[#272b3a] rounded-lg text-xs text-neutral-200 py-2 pl-3 pr-8 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block bg-[#11131c] border border-[#202331] rounded-2xl p-6 space-y-6 sticky top-28">
          <div className="flex items-center justify-between border-b border-[#1f2230] pb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                Faceted Filters
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-[11px] text-amber-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
              Collections
            </h4>
            <div className="space-y-2">
              {COLLECTIONS.map((col) => (
                <label
                  key={col}
                  onClick={() => toggleCollection(col)}
                  className="flex items-center justify-between text-xs text-neutral-400 hover:text-white cursor-pointer select-none"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        selectedCollections.includes(col)
                          ? "bg-amber-500 border-amber-500 text-black"
                          : "border-[#2b2f42] bg-[#171924]"
                      }`}
                    >
                      {selectedCollections.includes(col) && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span>{col}</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {WATCHES_DATA.filter((w) => w.collection === col).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Movement Types */}
          <div className="border-t border-[#1f2230] pt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
              Movement Caliber
            </h4>
            <div className="space-y-2">
              {MOVEMENTS.map((mov) => (
                <label
                  key={mov}
                  onClick={() => toggleMovement(mov)}
                  className="flex items-center justify-between text-xs text-neutral-400 hover:text-white cursor-pointer select-none"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        selectedMovements.includes(mov)
                          ? "bg-amber-500 border-amber-500 text-black"
                          : "border-[#2b2f42] bg-[#171924]"
                      }`}
                    >
                      {selectedMovements.includes(mov) && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span>{mov}</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {WATCHES_DATA.filter((w) => w.specs.movement.type === mov).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Case Metallurgy */}
          <div className="border-t border-[#1f2230] pt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-3">
              Case Metallurgy
            </h4>
            <div className="space-y-2">
              {MATERIALS.map((mat) => (
                <label
                  key={mat}
                  onClick={() => toggleMaterial(mat)}
                  className="flex items-center justify-between text-xs text-neutral-400 hover:text-white cursor-pointer select-none"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        selectedMaterials.includes(mat)
                          ? "bg-amber-500 border-amber-500 text-black"
                          : "border-[#2b2f42] bg-[#171924]"
                      }`}
                    >
                      {selectedMaterials.includes(mat) && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span className="truncate max-w-[150px]">{mat}</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {WATCHES_DATA.filter((w) => w.specs.caseAndDial.material === mat).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-t border-[#1f2230] pt-5">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                Max Price
              </h4>
              <span className="text-xs font-mono font-bold text-amber-300">
                {formatCurrency(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={2000}
              max={5000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-1">
              <span>$2,000</span>
              <span>$5,000</span>
            </div>
          </div>

          {/* In Stock Only Toggle */}
          <div className="border-t border-[#1f2230] pt-5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs text-neutral-300">In Stock Timepieces Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </label>
          </div>
        </aside>

        {/* Watches Grid */}
        <div className="lg:col-span-3">
          {filteredWatches.length === 0 ? (
            <div className="bg-[#11131c] border border-[#202330] rounded-2xl p-12 text-center">
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                No matching timepieces found
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mb-6">
                Try loosening your filters or resetting the criteria to explore the complete Oscilla horological vault.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWatches.map((watch) => (
                <WatchCard
                  key={watch.id}
                  watch={watch}
                  onQuickView={(w) => setSelectedWatch(w)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Slide-Out Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-start lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-[#10121b] border-r border-[#222536] p-6 flex flex-col h-full z-10 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1e212d] mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Filters
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Collections */}
            <div className="mb-5">
              <h4 className="text-xs uppercase font-semibold text-neutral-300 mb-2">Collection</h4>
              <div className="space-y-1.5">
                {COLLECTIONS.map((col) => (
                  <button
                    key={col}
                    onClick={() => toggleCollection(col)}
                    className={`w-full text-left p-2 rounded text-xs flex justify-between ${
                      selectedCollections.includes(col)
                        ? "bg-amber-500/20 text-amber-300 font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>{col}</span>
                    {selectedCollections.includes(col) && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Movements */}
            <div className="mb-5 border-t border-[#1e212d] pt-4">
              <h4 className="text-xs uppercase font-semibold text-neutral-300 mb-2">Movement</h4>
              <div className="space-y-1.5">
                {MOVEMENTS.map((mov) => (
                  <button
                    key={mov}
                    onClick={() => toggleMovement(mov)}
                    className={`w-full text-left p-2 rounded text-xs flex justify-between ${
                      selectedMovements.includes(mov)
                        ? "bg-amber-500/20 text-amber-300 font-semibold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span>{mov}</span>
                    {selectedMovements.includes(mov) && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-[#1e212d] flex gap-2">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 rounded-lg bg-[#1c1f2c] text-xs text-neutral-300"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-amber-500 text-xs font-semibold text-black"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Inspection Dialog */}
      <QuickViewModal
        watch={selectedWatch}
        onClose={() => setSelectedWatch(null)}
      />
    </div>
  );
}
