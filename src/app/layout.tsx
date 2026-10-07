import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscilla — Haute Horlogerie & Precision Mechanical Timepieces",
  description: "Independent Swiss-inspired watch atelier crafting certified chronometers, column-wheel chronographs, and titanium divers.",
  keywords: ["Oscilla", "Luxury Watches", "Mechanical Chronometer", "Haute Horlogerie", "Automatic Watch", "Titanium Diver"],
  openGraph: {
    title: "Oscilla — Haute Horlogerie",
    description: "Mechanical equilibrium, sculptural case design, and chronometric precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090a0d] text-[#f4f4f6]">
        <AnnouncementBar />
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
