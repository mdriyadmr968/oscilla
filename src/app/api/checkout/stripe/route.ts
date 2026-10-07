import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { CartItem, OrderCustomerInfo } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customer, currency = "usd" } = body as {
      items: CartItem[];
      customer: OrderCustomerInfo;
      currency?: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // If real Stripe is configured, create live Stripe Checkout Session
    if (isStripeConfigured() && stripe) {
      const lineItems = items.map((item) => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: `${item.watch.name} (${item.watch.referenceNumber})`,
            description: `Fitted Strap: ${item.selectedStrap} • Caliber: ${item.watch.specs.movement.caliber}`,
            images: [item.watch.images.hero],
          },
          unit_amount: Math.round((item.unitPrice || item.watch.price) * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        customer_email: customer?.email,
        success_url: `${appUrl}/order-success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/checkout`,
        metadata: {
          customerName: customer?.fullName || "Valued Collector",
        },
      });

      return NextResponse.json({
        mode: "stripe_live",
        url: session.url,
        sessionId: session.id,
      });
    }

    // Default: Interactive Concierge Simulated Session
    const mockOrderId = `OSC-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    return NextResponse.json({
      mode: "concierge_simulated",
      orderId: mockOrderId,
      url: `${appUrl}/order-success/${mockOrderId}`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
