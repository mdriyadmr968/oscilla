import { Metadata } from "next";
import { VaultClient } from "@/components/vault/VaultClient";

export const metadata: Metadata = {
  title: "Collector Vault & Ledger — Oscilla Horlogerie",
  description: "View saved timepieces, active acquisition orders, and digital certificates of origin.",
};

export default function VaultPage() {
  return <VaultClient />;
}
