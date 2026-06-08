import { NextRequest, NextResponse } from "next/server";
import {
  type OrderPayload,
  formatItemsForAirtable,
  generateOrderRef,
} from "@/lib/order";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as OrderPayload;
  const { items, customer, subtotal, shipping, total, note } = body;

  if (!items?.length || !customer?.name || !customer?.phone || !customer?.address) {
    return NextResponse.json(
      { error: "Missing required order fields." },
      { status: 400 },
    );
  }

  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_ORDERS_BASE_ID;
  const tableName = (process.env.AIRTABLE_ORDERS_TABLE_NAME ?? "Shop Orders").trim();

  const ref = generateOrderRef();

  if (!token || !baseId) {
    // In dev/preview, let the order proceed to the payment page so the flow can be tested
    // end-to-end. The order is NOT persisted — it only lives in logs. In production this is
    // a hard error: missing env vars mean real orders would be lost.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[orders] Airtable env vars missing — order ${ref} not saved. ` +
          `Set AIRTABLE_ORDERS_BASE_ID (+ optional AIRTABLE_ORDERS_TABLE_NAME) to persist.`,
        { ref, customer, total, items },
      );
      await sendOrderNotificationEmail({ ref, customer, items, subtotal, shipping, total, note });
      return NextResponse.json({ ok: true, ref });
    }
    return NextResponse.json(
      { error: "Order destination not configured." },
      { status: 500 },
    );
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Order Ref": ref,
          "Submitted At": new Date().toISOString().slice(0, 10),
          "Customer Name": customer.name,
          "Customer Email": customer.email,
          "Customer Phone": customer.phone,
          "Shipping Address": customer.address,
          Items: formatItemsForAirtable(items),
          Subtotal: subtotal,
          Shipping: shipping,
          Total: total,
          Status: "New",
          Notes: note ?? "",
        },
      }),
    },
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Airtable order error:", err);
    return NextResponse.json({ error: "Failed to save order." }, { status: 502 });
  }

  await sendOrderNotificationEmail({ ref, customer, items, subtotal, shipping, total, note });

  return NextResponse.json({ ok: true, ref });
}

async function sendOrderNotificationEmail(args: {
  ref: string;
  customer: OrderPayload["customer"];
  items: OrderPayload["items"];
  subtotal: number;
  shipping: number;
  total: number;
  note?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  const from = process.env.ORDER_NOTIFY_FROM ?? "KD Genetics Orders <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn(
      `[orders] Email notification skipped for ${args.ref} — set RESEND_API_KEY + ORDER_NOTIFY_EMAIL to enable.`,
    );
    return;
  }

  const { ref, customer, items, subtotal, shipping, total, note } = args;
  const lines = [
    `New KD Merch order — ${ref}`,
    ``,
    `Customer`,
    `  ${customer.name}`,
    `  ${customer.phone}`,
    customer.email ? `  ${customer.email}` : null,
    ``,
    `Shipping address`,
    customer.address.split("\n").map((l) => `  ${l}`).join("\n"),
    ``,
    `Items`,
    formatItemsForAirtable(items)
      .split("\n")
      .map((l) => `  ${l}`)
      .join("\n"),
    ``,
    `Subtotal  ฿${subtotal.toLocaleString()}`,
    `Shipping  ฿${shipping.toLocaleString()}`,
    `Total     ฿${total.toLocaleString()}`,
    note ? `\nCustomer note\n  ${note}` : null,
    ``,
    `Waiting on payment — match the deposit by reference ${ref} once it lands.`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: customer.email || undefined,
        subject: `New order ${ref} · ฿${total.toLocaleString()} · ${customer.name}`,
        text: lines,
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`[orders] Resend send failed for ${ref}:`, err);
    }
  } catch (err) {
    console.error(`[orders] Resend send threw for ${ref}:`, err);
  }
}
