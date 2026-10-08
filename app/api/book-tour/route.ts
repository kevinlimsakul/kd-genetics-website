import { NextRequest, NextResponse } from "next/server";
import { TOUR_CAPACITY, bookedGuestsByDate } from "@/lib/tour";

// Values must match the "Package" single-select options in Airtable EXACTLY
// (incl. the em dash). The API token can't create new options, so drift here
// got every booking rejected in Aug 2026 (INVALID_MULTIPLE_CHOICE_OPTIONS).
// Since Oct 2026 a mismatch no longer loses the booking: we retry without
// Package and write it into Notes instead (see below).
const PACKAGES = {
  standard: { label: "Standard — 1,200 THB", price: 1200 },
  vip: { label: "VIP — 2,500 THB", price: 2500 },
} as const;

// Where the booking came from (QR poster, homepage, tour page). Stored in
// Notes because the Airtable "Source" select only has Website/Phone/Agent/Walk-in.
const SOURCES: Record<string, string> = {
  qr: "QR code",
  home: "Homepage",
  page: "Tour page",
};

export async function POST(req: NextRequest) {
  const { name, contact, date, people, package: pkg, notes, source } =
    await req.json();

  const guests = Number(people);
  if (!name?.trim() || !contact?.trim() || !date || !(guests >= 1)) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_TOUR_BASE_ID;
  const tableName = (process.env.AIRTABLE_TOUR_TABLE_NAME ?? "Bookings Website").trim();

  if (!token || !baseId) {
    return NextResponse.json(
      { error: "Airtable credentials not configured." },
      { status: 500 }
    );
  }

  // Re-check capacity at submit time (the form's counts can be minutes old).
  // If Airtable can't be read, accept the request; Kevin confirms by hand anyway.
  const booked = await bookedGuestsByDate();
  if (booked) {
    const left = Math.max(0, TOUR_CAPACITY - (booked[date] ?? 0));
    if (guests > left) {
      return NextResponse.json({ error: "Not enough spots.", left }, { status: 409 });
    }
  }

  const tier = pkg === "vip" ? PACKAGES.vip : PACKAGES.standard;
  const total = tier.price * guests;
  const via = SOURCES[source] ?? SOURCES.page;
  const fullNotes = [`via ${via}`, notes?.trim()].filter(Boolean).join("\n");

  const fields: Record<string, unknown> = {
    Name: name.trim(),
    Package: tier.label,
    "Tour Date": date,
    "Number of Guests": guests,
    Contact: contact.trim(),
    Status: "New",
    Source: "Website",
    "Total Amount (THB)": total,
    Notes: fullNotes,
    "Submitted At": new Date().toISOString().slice(0, 10),
  };
  const save = (f: Record<string, unknown>) =>
    fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: f }),
    });

  let res = await save(fields);
  if (!res.ok) {
    const err = await res.text();
    console.error("Airtable error:", err);
    // Package label not (yet) an option in Airtable, e.g. after a price
    // change: save the booking anyway, package goes into Notes instead.
    if (err.includes("INVALID_MULTIPLE_CHOICE_OPTIONS")) {
      const { Package: _pkg, ...rest } = fields;
      res = await save({ ...rest, Notes: `${tier.label}\n${fullNotes}` });
      if (!res.ok) console.error("Airtable retry error:", await res.text());
    }
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to save booking." }, { status: 502 });
    }
  }

  await sendBookingNotificationEmail({
    name: name.trim(),
    contact: contact.trim(),
    date,
    guests,
    tier: tier.label,
    total,
    via,
    notes: notes?.trim(),
  });

  return NextResponse.json({ ok: true });
}

// Instant alert to Kevin so a request never sits unseen in Airtable. Reuses
// the shop's Resend setup. Failure here never fails the booking.
async function sendBookingNotificationEmail(b: {
  name: string;
  contact: string;
  date: string;
  guests: number;
  tier: string;
  total: number;
  via: string;
  notes?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  const from = process.env.TOUR_NOTIFY_FROM ?? "KD Farm Tour <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn("[book-tour] Email alert skipped — set RESEND_API_KEY + ORDER_NOTIFY_EMAIL.");
    return;
  }

  const day = new Date(`${b.date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const text = [
    `New farm tour request`,
    ``,
    `  ${b.name}`,
    `  ${b.contact}`,
    ``,
    `  Date     ${day} (${b.date})`,
    `  Guests   ${b.guests}`,
    `  Package  ${b.tier}`,
    `  Total    ฿${b.total.toLocaleString()} (pay on arrival)`,
    `  Via      ${b.via}`,
    b.notes ? `\nGuest note\n  ${b.notes}` : null,
    ``,
    `Confirm the date with the guest, then set Status = Confirmed in Airtable.`,
  ]
    .filter((l) => l !== null)
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
        subject: `Tour request · ${day} · ${b.guests} pax · ${b.name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[book-tour] Resend send failed:", await res.text());
    }
  } catch (err) {
    console.error("[book-tour] Resend send threw:", err);
  }
}
