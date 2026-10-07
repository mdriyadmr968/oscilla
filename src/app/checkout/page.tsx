import { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Acquisition Checkout — Oscilla",
  description: "Finalize your haute horlogerie acquisition with insured armored delivery.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
