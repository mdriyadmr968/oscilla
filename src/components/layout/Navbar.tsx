"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X, Shield } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { useHydrated } from "@/lib/hooks/useHydrated";
import { SearchModal } from "./SearchModal";

export function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mounted = useHydrated();

  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const wishlistIds = useCartStore((state) => state.wishlistIds);

  const totalCartCount = mounted ? items.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const wishlistCount = mounted ? wishlistIds.length : 0;

  const navLinks = [
    { label: "All Timepieces", href: "/catalog" },
    { label: "Automatic", href: "/catalog?movement=Automatic" },
    { label: "Chronographs", href: "/catalog?movement=Chronograph" },
    { label: "Titanium & Carbon", href: "/catalog?material=Titanium Grade 5" },
    { label: "Atelier Heritage", href: "/heritage" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-center group text-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 group-hover:scale-110 transition-transform shadow-sm shadow-amber-400/50" />
              <span className="text-xl sm:text-2xl font-serif tracking-[0.28em] uppercase text-white font-semibold group-hover:text-amber-200 transition-colors">
                OSCILLA
              </span>
            </div>
            <span className="text-[9px] tracking-[0.4em] text-neutral-400 uppercase font-light -mt-0.5 group-hover:text-neutral-300 transition-colors">
              HAUTE HORLOGERIE
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-all font-medium py-1 border-b-2 ${
                    isActive
                      ? "text-amber-300 border-amber-400"
                      : "text-neutral-400 hover:text-white border-transparent hover:border-neutral-500"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-neutral-300 hover:text-amber-300 rounded-full hover:bg-white/5 transition-colors"
              title="Search timepieces"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/vault"
              className="relative p-2 text-neutral-300 hover:text-amber-300 rounded-full hover:bg-white/5 transition-colors hidden sm:inline-flex"
              title="Saved in Vault"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center font-mono">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Admin / Portal Shortcut */}
            <Link
              href="/admin"
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-white/5 transition-colors hidden xl:inline-flex"
              title="Concierge Portal"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-2 rounded-full bg-[#181a24] hover:bg-[#222533] border border-[#272b3b] text-neutral-100 transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-105 transition-transform" />
              <span className="text-xs font-mono font-medium hidden sm:inline">Vault</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-400 text-black text-xs font-bold flex items-center justify-center font-mono">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0e14] border-b border-[#212433] px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-widest text-neutral-300 hover:text-amber-300 py-1"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#1e212d] flex justify-between items-center text-xs text-neutral-400">
              <Link
                href="/vault"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 hover:text-white"
              >
                <Heart className="w-4 h-4 text-amber-400" />
                <span>Collector Vault ({wishlistCount})</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-1.5 hover:text-white"
              >
                <Shield className="w-4 h-4 text-neutral-400" />
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Dialog */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
