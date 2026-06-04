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

  if (!token || !baseId) {
    return NextResponse.json(
      { error: "Order destination not configured." },
      { status: 500 },
    );
  }

  const ref = generateOrderRef();

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

  return NextResponse.json({ ok: true, ref });
}
