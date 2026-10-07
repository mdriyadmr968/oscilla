import { Metadata } from "next";
import { AdminClient } from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Atelier Management Console — Oscilla Horlogerie",
  description: "Administrative console for managing watch allocations, stock, and armored courier fulfillment.",
};

export default function AdminPage() {
  return <AdminClient />;
}
