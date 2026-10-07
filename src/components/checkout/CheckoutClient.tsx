"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCurrency } from "@/lib/utils";
import { OrderCustomerInfo, OrderRecord } from "@/lib/types";

export function CheckoutClient() {
  const router = useRouter();
  const {
    items,
    promoCode,
    discountPercentage,
    clearCart,
    addOrder,
  } = useCartStore();

  const [shippingMethod, setShippingMethod] = useState<"standard" | "white_glove">("standard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "wire" | "concierge">("card");
  const [cardDetails, setCardDetails] = useState({
    number: "4242 •••• •••• 4242",
    expiry: "12/28",
    cvc: "888",
    nameOnCard: "",
  });

  const subtotal = items.reduce(
    (sum, item) => sum + (item.unitPrice || item.watch.price) * item.quantity,
    0
  );
  const discountAmount = subtotal * discountPercentage;
  const shippingFee = shippingMethod === "white_glove" ? 150 : 0;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Simulate luxury transaction settlement
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const orderId = `OSC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: OrderRecord = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: formData,
      items: [...items],
      subtotal,
      shippingFee,
      discount: discountAmount,
      total,
      paymentStatus: "paid",
      fulfillmentStatus: "preparing",
      courierName: shippingMethod === "white_glove" ? "Brink's Global Armored" : "FedEx Priority Armored",
      trackingNumber: `BRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    addOrder(newOrder);
    clearCart();
    setIsSubmitting(false);

    router.push(`/order-success/${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-white mb-3">
          Your Acquisition Vault Is Empty
        </h2>
        <p className="text-xs text-neutral-400 mb-8 max-w-md mx-auto">
          Please select a certified timepiece from our catalog before proceeding to checkout.
        </p>
        <Link
          href="/catalog"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-widest transition-all"
        >
          Explore Timepieces
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors font-mono"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Checkout Forms */}
        <div className="lg:col-span-7 space-y-8">
          <form onSubmit={handleSubmitOrder} className="space-y-8">
            {/* 1. Client Identity */}
            <div className="p-6 rounded-2xl bg-[#10121b] border border-[#212534] space-y-4">
              <div className="flex items-center justify-between border-b border-[#1c1f2b] pb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  1. Client Identity &amp; Contact
                </h3>
                <span className="text-[11px] text-amber-400 font-mono">Confidential Ledger</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Jean-Luc Delacroix"
                    className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="collector@domain.com"
                    className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                    Direct Telephone (for Courier Verification) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 2. Insured Delivery Destination */}
            <div className="p-6 rounded-2xl bg-[#10121b] border border-[#212534] space-y-4">
              <div className="flex items-center justify-between border-b border-[#1c1f2b] pb-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  2. Armored Delivery Destination
                </h3>
                <span className="text-[11px] text-neutral-400 font-mono">Biometric Signature</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="740 Park Avenue, Suite 14B"
                    className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                      State / Canton *
                    </label>
                    <input
                      type="text"
                      name="stateProvince"
                      required
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                      placeholder="NY"
                      className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10021"
                      className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="United States">United States</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Singapore">Singapore</option>
                  </select>
                </div>
              </div>

              {/* Shipping Method Choices */}
              <div className="pt-3 border-t border-[#1c1f2b] space-y-2.5">
                <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Select Transit Protocol:
                </label>

                <div
                  onClick={() => setShippingMethod("standard")}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === "standard"
                      ? "bg-[#181b28] border-amber-400 text-white"
                      : "bg-[#12141e] border-[#222533] text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-semibold">Priority Armored Transit</div>
                      <div className="text-[11px] text-neutral-500">2-3 Business Days • Tamper-evident seal</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">Complimentary</span>
                </div>

                <div
                  onClick={() => setShippingMethod("white_glove")}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === "white_glove"
                      ? "bg-[#181b28] border-amber-400 text-white"
                      : "bg-[#12141e] border-[#222533] text-neutral-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-semibold">White-Glove Private Courier</div>
                      <div className="text-[11px] text-neutral-500">Dedicated hand-courier &amp; appointment delivery</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-200">+$150 USD</span>
                </div>
              </div>
            </div>

            {/* 3. Payment Protocol */}
            <div className="p-6 rounded-2xl bg-[#10121b] border border-[#212534] space-y-4">
              <div className="flex items-center justify-between border-b border-[#1c1f2b] pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                    3. Secure Payment Settlement
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <Lock className="w-3 h-3" />
                  <span>256-Bit Encrypted</span>
                </div>
              </div>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "card", label: "Credit Card" },
                  { id: "wire", label: "Bank Wire" },
                  { id: "concierge", label: "Concierge Invoice" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPaymentMethod(t.id as typeof paymentMethod)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      paymentMethod === t.id
                        ? "bg-[#1d202e] border-amber-400 text-white"
                        : "bg-[#13151f] border-[#222635] text-neutral-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Card Inputs */}
              {paymentMethod === "card" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      placeholder="•••• •••• •••• ••••"
                      className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleCardChange}
                        placeholder="CVC"
                        maxLength={4}
                        className="w-full bg-[#161822] border border-[#242738] rounded-lg p-2.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "wire" && (
                <div className="p-4 rounded-xl bg-[#141622] border border-[#222636] text-xs text-neutral-300 space-y-1.5 font-mono">
                  <div className="text-amber-400 font-bold mb-1">SWIFT / IBAN Settlement Details:</div>
                  <div>Beneficiary: OSCILLA HORLOGERIE S.A.</div>
                  <div>Bank: Union de Banques Suisses (UBS Geneva)</div>
                  <div>Clearing: CH93 0024 0240 1234 5678 A</div>
                  <p className="text-[11px] text-neutral-500 font-sans pt-1">
                    Your allocation will be temporarily reserved for 48 hours pending wire receipt.
                  </p>
                </div>
              )}

              {paymentMethod === "concierge" && (
                <div className="p-4 rounded-xl bg-[#141622] border border-[#222636] text-xs text-neutral-300">
                  <p>
                    An Oscilla senior horological client advisor will contact you within 2 hours to coordinate custom payment splits, insured escrow, or private physical viewing.
                  </p>
                </div>
              )}
            </div>

            {/* Authorize Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:opacity-95 text-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Allocation &amp; Issuing Certificate...</span>
                </>
              ) : (
                <>
                  <span>Authorize Acquisition &bull; {formatCurrency(total)}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-[#10121b] border border-[#212534] rounded-2xl p-6 space-y-6 sticky top-28">
          <div className="border-b border-[#1c1f2b] pb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Acquisition Summary ({items.reduce((a, b) => a + b.quantity, 0)})
            </h3>
          </div>

          {/* Items */}
          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 text-xs">
                <div className="relative w-16 h-16 bg-black rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.watch.images.hero}
                    alt={item.watch.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-amber-400 font-mono uppercase">
                    {item.watch.referenceNumber}
                  </div>
                  <h4 className="font-semibold text-white truncate">{item.watch.name}</h4>
                  <p className="text-[11px] text-neutral-400 truncate">
                    {item.selectedStrap}
                  </p>
                  <div className="text-neutral-500 text-[11px]">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-white">
                  {formatCurrency((item.unitPrice || item.watch.price) * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Math */}
          <div className="border-t border-[#1c1f2b] pt-4 space-y-2 text-xs text-neutral-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-mono">{formatCurrency(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-amber-400">
                <span>VIP Privilege ({promoCode})</span>
                <span className="font-mono">-{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Transit &amp; Insurance</span>
              <span className="font-mono text-emerald-400">
                {shippingFee === 0 ? "Complimentary" : formatCurrency(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-base font-bold text-white border-t border-[#1c1f2b] pt-3">
              <span>Total Settlement</span>
              <span className="font-mono text-amber-300">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Trust Assurances */}
          <div className="p-4 rounded-xl bg-[#141622] border border-[#212533] space-y-2 text-[11px] text-neutral-400">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>5-Year Atelier Warranty Registered Automatically</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Includes Embossed Certificate of Authenticity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
