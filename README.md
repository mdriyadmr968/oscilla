# ⏱️ Oscilla — Haute Horlogerie & Precision Timepieces E-Commerce

<div align="center">

![Oscilla Banner](https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80)

**A high-performance luxury watch e-commerce application engineered with Next.js 16 App Router, TypeScript, Tailwind CSS 4, and Zustand.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.0-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

[Explore Catalog](http://localhost:3000/catalog) • [Atelier Heritage](http://localhost:3000/heritage) • [Collector Vault](http://localhost:3000/vault) • [Admin Console](http://localhost:3000/admin)

</div>

---

## 🏛️ Brand Concept & Ethos

**Oscilla** is an independent haute horlogerie boutique inspired by Geneva and Zürich watchmaking traditions. The name is rooted in the *oscillation* of the mechanical balance wheel—the beating heart regulating micro-joules of mechanical energy at 28,800 vibrations per hour (4 Hz).

Oscilla pairs high-beat mechanical calibers, column-wheel chronographs, and Grade 5 titanium divers with a clean, dark-luxury headless digital storefront.

---

## ✨ Flagship Capabilities

### 🔍 1. Interactive 360° Studio Loupe & BGW9 Night-Glow Inspector
* **Studio Light Mode:** Reveals brushed surfaces, mirror-polished anglage, and sunburst guilloché dials.
* **Super-LumiNova BGW9 Night Mode:** Simulates pitch-dark room conditions with glowing electric cyan luminescence.
* **Exhibition Sapphire Caseback View:** Displays the decorated movement rotor, jewels, and Côtes de Genève stripes.
* **Interactive 2.5x Loupe:** Precision magnifying glass crosshair following cursor coordinates for macro dial inspection.

### 📐 2. Interactive Wrist Scale Proportion Visualizer
* An interactive calibration slider from **14 cm (5.5") to 21 cm (8.3")** calculating wrist coverage percentages against case diameters (38mm – 42mm) to ensure balanced ergonomic fit before acquisition.

### 🛠️ 3. Factory Strap Customizer with Live Pricing
* Interchangeable factory straps:
  * Full Grain Italian Calfskin (`Standard`)
  * Solid Link 316L Steel Bracelet (`+$120`)
  * FKM Fluororubber Dive Strap (`+$50`)
  * Fluid Milanese Stainless Mesh (`+$90`)
  * Hand-stitched Genuine Alligator (`+$180`)
* Automatically recalibrates unit prices, subtotal, and cart records.

### 🌍 4. Global Multi-Currency Conversion Engine
* Toggle between **USD ($)**, **CHF (Swiss Francs)**, **EUR (€)**, **GBP (£)**, and **JPY (¥)**.
* Integrated throughout the storefront, catalog, cart, and checkout.

### 🎛️ 5. Multi-Faceted Horology Filtering & Search
* Faceted filtering by:
  * **Collection:** Astral, Chronos, Vanguard, Heritage, Nocturne
  * **Movement:** Automatic, Chronograph, Manual Wind
  * **Metallurgy:** Grade 5 Titanium, 316L Stainless Steel, 18K Rose Gold, Zirconium Ceramic, Forged Carbon
  * **Price Range:** Interactive slider with live filtering
  * **In-Stock Availability** & Multi-criteria sorting (Price, Rating, Featured)
* Instant modal search indexed across reference numbers (e.g., `OSC-801`), calibers, materials, and collections.

### 💼 6. Vault State Management & Promo Engine
* Slide-over `CartDrawer` with persistent Zustand storage.
* Free insured armored courier threshold progress meter.
* Validated promo code engine (`OSCILLA10` for 10% VIP, `FIRSTHOROLOGY` for 15% Welcome Acquisition).

### 💳 7. Dual-Mode Checkout & Digital Certificates
* **Live Stripe Integration:** Generates official Stripe hosted checkout sessions when secret keys are present.
* **Interactive Concierge Mode:** Zero-dependency fallback mode generating authentic order records for testing.
* **Embossed Digital Certificate of Authenticity:** Issues unique serialized certificates with 5-year international warranty registrations under `/order-success/[orderId]`.

### 🛡️ 8. Customer Vault & Atelier Admin Hub
* **Collector Vault (`/vault`):** Saved wishlist, active order archive, tracking lookups, and warranty service schedule.
* **Admin Hub (`/admin`):** Real-time inventory controller (stock increment/decrement), gross acquisition revenue KPIs, and armored courier fulfillment stage updates.

### 🚀 9. Enterprise SEO & Rich Metadata
* Schema.org JSON-LD `Product` and `Offer` structured data markup.
* Dynamic `sitemap.ts` and crawler policy `robots.ts`.
* Next.js OpenGraph dynamic metadata across all timepiece slugs.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16.4](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **UI & Styling** | [Tailwind CSS 4](https://tailwindcss.com/) with custom glassmorphism & typography |
| **Component Icons** | [Lucide React](https://lucide.dev/) |
| **State Management** | [Zustand 5](https://github.com/pmndrs/zustand) with `localStorage` persistence |
| **Payment Gateway** | [Stripe SDK](https://stripe.com/) (Live API + Concierge Fallback) |
| **Email Service** | [Resend](https://resend.com/) + Console simulation fallback |
| **ORM / Database** | [Prisma](https://www.prisma.io/) schema ready for PostgreSQL / Supabase |

---

## 📂 Project Directory Structure

```text
C:\Projects\oscilla\
├── prisma/
│   └── schema.prisma                # PostgreSQL Prisma database schema
├── public/                          # Static SVGs and branding assets
├── src/
│   ├── app/
│   │   ├── admin/                   # Atelier Admin Hub & fulfillment console
│   │   ├── api/checkout/stripe/     # Stripe Checkout session API route
│   │   ├── catalog/                 # Faceted watch collection archive
│   │   ├── checkout/                # Secure acquisition checkout page
│   │   ├── heritage/                # Horological craft & metallurgy story
│   │   ├── order-success/[orderId]/ # Digital certificate & courier schedule
│   │   ├── vault/                   # Collector vault, wishlist & warranties
│   │   ├── watches/[slug]/          # Dynamic Product Detail Pages (PDP)
│   │   ├── globals.css              # Dark luxury theme & typography
│   │   ├── layout.tsx               # Root layout (Announcement, Navbar, Footer)
│   │   ├── not-found.tsx            # Custom luxury 404 page
│   │   ├── page.tsx                 # Atelier storefront homepage
│   │   ├── robots.ts                # Search engine crawler policies
│   │   └── sitemap.ts               # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── cart/CartDrawer.tsx      # Slide-out persistent cart drawer
│   │   ├── catalog/CatalogClient.tsx# Filter sidebar, sorting, and grid
│   │   ├── checkout/                # Checkout and success components
│   │   ├── common/                  # WatchCard & QuickView modal
│   │   ├── home/                    # Hero, Collections, Featured, Heritage
│   │   ├── layout/                  # Navbar, AnnouncementBar, Footer, Search
│   │   ├── pdp/                     # Studio Inspector, Wrist Visualizer, PDP
│   │   └── vault/VaultClient.tsx    # Customer wishlist and orders
│   └── lib/
│       ├── data/watches.ts          # Seed catalog of watches and straps
│       ├── hooks/useHydrated.ts     # React 19 SSR hydration safety hook
│       ├── services/emailService.ts # Transactional receipt & certificate email
│       ├── store/cartStore.ts       # Cart, wishlist, and orders Zustand store
│       ├── store/currencyStore.ts   # Multi-currency switcher & converter
│       ├── stripe.ts                # Safe Stripe initialization wrapper
│       ├── types.ts                 # Full TypeScript definitions
│       └── utils.ts                 # Formatting and class utility helpers
├── .env.example                     # Environment variables reference template
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js:** `v20.x` or `v22.x`+ (Developed with Node `v24`)
* **Package Manager:** `npm` (or `pnpm` / `bun`)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/mdriyadmr968/oscilla.git
cd oscilla
npm install
```

### 3. Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

> **Note:** Oscilla runs in **Interactive Concierge Mode** by default. No API keys are required to test the storefront, place test orders, or issue certificates. To connect live services, supply keys in `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/oscilla"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
RESEND_API_KEY="re_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Running Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 5. Running Production Build & Verification
```bash
npm run lint      # Runs ESLint static analysis (0 errors, 0 warnings)
npm run build     # Compiles optimized production bundle with Turbopack
npm run start     # Starts production server
```

---

## 🧪 Testing User Flows

1. **Customizing a Timepiece:**
   * Visit `/catalog`, pick a watch (e.g. *Oscilla Astral Automatic*).
   * Open the **Wrist Size Visualizer** to test proportion for a 17.5 cm wrist.
   * Switch the **Studio Loupe** to *BGW9 Night Lume* to test cyan luminescence.
   * Select the *Solid Link Steel Bracelet (+$120)* and click **Acquire Timepiece**.
2. **Applying VIP Promo:**
   * Open the cart drawer, enter promo code `OSCILLA10` for 10% off.
3. **Completing Acquisition:**
   * Proceed to `/checkout`, enter delivery details, and click **Authorize Acquisition**.
   * View the embossed **Digital Certificate of Authenticity** and tracking schedule on `/order-success/[orderId]`.
4. **Inspecting Collector Vault:**
   * Visit `/vault` to view registered certificates and active orders.
5. **Managing Orders via Admin Hub:**
   * Visit `/admin` to view revenue KPIs, modify stock levels, and update fulfillment stages.

---

## 📄 License
Released under the [MIT License](LICENSE). &copy; 2026 Oscilla Horlogerie S.A.
