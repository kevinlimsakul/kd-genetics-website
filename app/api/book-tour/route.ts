import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, contact, date, people, package: pkg, notes } = await req.json();

  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_TOUR_BASE_ID;
  const tableName = (process.env.AIRTABLE_TOUR_TABLE_NAME ?? "Bookings Website").trim();

  if (!token || !baseId) {
    return NextResponse.json(
      { error: "Airtable credentials not configured." },
      { status: 500 }
    );
  }

  const packageLabel =
    pkg === "vip" ? "VIP — 3,000 THB" : "Standard — 1,500 THB";

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
          Name: name,
          Package: packageLabel,
          "Tour Date": date,
          "Number of Guests": Number(people),
          Contact: contact,
          Status: "New",
          Notes: notes ?? "",
          "Submitted At": new Date().toISOString().slice(0, 10),
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("Airtable error:", err);
    return NextResponse.json({ error: "Failed to save booking." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
