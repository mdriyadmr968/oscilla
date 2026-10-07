import { OrderRecord } from "../types";
import { formatCurrency } from "../utils";

export interface EmailDispatchResult {
  success: boolean;
  mode: "resend_live" | "simulated_console";
  messageId: string;
}

export async function dispatchOrderReceipt(order: OrderRecord): Promise<EmailDispatchResult> {
  const resendApiKey = process.env.RESEND_API_KEY || "";
  const isResendConfigured = Boolean(resendApiKey) && !resendApiKey.includes("sample");

  // Construct luxury HTML email template
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #222534; color: #ffffff;">
          <strong>${item.watch.name}</strong><br/>
          <span style="font-size: 11px; color: #d4af37;">Ref: ${item.watch.referenceNumber}</span><br/>
          <span style="font-size: 11px; color: #888899;">Fitted Strap: ${item.selectedStrap}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #222534; color: #ffffff; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #222534; color: #d4af37; text-align: right; font-family: monospace;">
          ${formatCurrency((item.unitPrice || item.watch.price) * item.quantity)}
        </td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #090a0d; color: #f4f4f6; font-family: Arial, sans-serif; padding: 30px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #11131c; border: 1px solid #262939; border-radius: 12px; padding: 24px;">
          <div style="text-align: center; border-bottom: 1px solid #1f2231; padding-bottom: 16px;">
            <h1 style="color: #ffffff; letter-spacing: 4px; margin: 0; font-family: Georgia, serif;">OSCILLA</h1>
            <p style="color: #d4af37; font-size: 10px; letter-spacing: 2px; margin: 4px 0 0;">HAUTE HORLOGERIE &bull; GENÈVE</p>
          </div>
          <div style="padding: 20px 0;">
            <p>Dear ${order.customer.fullName},</p>
            <p>Your timepiece allocation has been officially registered in the Oscilla ledger under <strong>Order Ref: ${order.id}</strong>.</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <thead>
                <tr style="color: #888899; font-size: 11px; text-transform: uppercase;">
                  <th style="text-align: left; padding: 8px;">Timepiece</th>
                  <th style="text-align: center; padding: 8px;">Qty</th>
                  <th style="text-align: right; padding: 8px;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            <div style="margin-top: 20px; padding-top: 12px; border-top: 1px solid #222534; text-align: right;">
              <p style="margin: 4px 0; font-size: 12px; color: #888899;">Armored Transit: Free</p>
              <p style="margin: 4px 0; font-size: 16px; color: #d4af37; font-weight: bold;">Total Settlement: ${formatCurrency(order.total)}</p>
            </div>
            <div style="margin-top: 24px; padding: 12px; background-color: #171926; border-radius: 8px; font-size: 11px; color: #a0a0b0;">
              <strong>Armored Courier:</strong> ${order.courierName} (${order.trackingNumber})<br/>
              <strong>Warranty Coverage:</strong> 5-Year International Atelier Guarantee Registered
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  if (isResendConfigured) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "concierge@oscilla.store",
          to: order.customer.email,
          subject: `Acquisition Ratified: Order ${order.id} & Digital Certificate — Oscilla`,
          html: emailHtml,
        }),
      });
      const data = await response.json();
      return {
        success: response.ok,
        mode: "resend_live",
        messageId: data.id || `resend-${Date.now()}`,
      };
    } catch {
      // Fallback gracefully to simulated console mode
    }
  }

  // Simulated mode (useful for demo & local development)
  console.info(`[Oscilla Concierge Email] Simulated dispatch for Order ${order.id} to ${order.customer.email}`);
  return {
    success: true,
    mode: "simulated_console",
    messageId: `sim-${order.id}`,
  };
}
