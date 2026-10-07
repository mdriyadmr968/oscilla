import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#161824] border border-[#272a3b] text-amber-400 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-amber-400 block mb-2">
            Discontinuous Timeline • Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Timepiece Not Located
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-light leading-relaxed">
            The reference or archive entry you are attempting to inspect does not exist in the Oscilla ledger or has been transferred to private collections.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black font-semibold text-xs uppercase tracking-widest transition-all"
          >
            Return to Atelier Home
          </Link>
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-xl bg-[#171926] hover:bg-[#202332] text-neutral-200 border border-[#262a3b] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Browse Timepieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
