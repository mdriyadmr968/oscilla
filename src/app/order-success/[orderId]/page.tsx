import { Suspense } from "react";
import { Metadata } from "next";
import { OrderSuccessClient } from "@/components/checkout/OrderSuccessClient";

interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Acquisition Ratified & Certificate — Oscilla Horlogerie",
  description: "Official certificate of origin and armored delivery tracking for your Oscilla timepiece.",
};

async function OrderSuccessContent({ params }: PageProps) {
  const { orderId } = await params;
  return <OrderSuccessClient orderId={orderId} />;
}

export default function OrderSuccessPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            Accessing Swiss Certification Ledger...
          </p>
        </div>
      }
    >
      <OrderSuccessContent params={params} />
    </Suspense>
  );
}
