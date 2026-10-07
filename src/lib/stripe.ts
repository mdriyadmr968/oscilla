import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

export const isStripeConfigured = (): boolean => {
  return (
    Boolean(stripeSecretKey) &&
    stripeSecretKey.startsWith("sk_") &&
    !stripeSecretKey.includes("sample")
  );
};

export const stripe = isStripeConfigured()
  ? new Stripe(stripeSecretKey, {
      apiVersion: "2026-02-28" as Stripe.LatestApiVersion,
    })
  : null;
