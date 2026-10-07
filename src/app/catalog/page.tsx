import { Suspense } from "react";
import { Metadata } from "next";
import { CatalogClient } from "@/components/catalog/CatalogClient";

export const metadata: Metadata = {
  title: "All Timepieces — Oscilla Horological Catalog",
  description: "Browse the complete collection of Oscilla mechanical chronometers, chronographs, and titanium dive instruments.",
};

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            Accessing Horological Archive...
          </p>
        </div>
      }
    >
      <CatalogClient />
    </Suspense>
  );
}
