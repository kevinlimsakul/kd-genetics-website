import { NextRequest, NextResponse } from "next/server";

// Anonymous tour feedback from /feedback → Airtable "Tour Feedback" table
// (Farm Tours base). No name, contact or IP is stored. Ratings are 1–5;
// a missing rating means the guest marked that part as skipped.

const TABLE_ID = "tblpP49XYWk8CGJVg";

// Form key → Airtable column. Keep in sync with FEEDBACK_PARTS in
// components/TourFeedbackForm.tsx.
const PARTS: Record<string, string> = {
  welcome: "Welcome at the shop",
  hillside: "Hillside (where KD used to grow)",
  sustainability: "Sustainability",
  growing: "Growing (nursery to curing)",
  session: "Q&A, group pic & session",
};

const LENGTH: Record<string, string> = {
  short: "Too short",
  right: "Just right",
  long: "Too long",
};

const int = (v: unknown, min: number, max: number) => {
  const n = Number(v);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
};
const text = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 2000) : "");

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  // Honeypot: real guests never see this field.
  if (text(body.website)) return NextResponse.json({ ok: true });

  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_TOUR_BASE_ID;
  if (!token || !baseId) {
    return NextResponse.json({ error: "Not configured." }, { status: 500 });
  }

  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(body.date)) ? String(body.date) : null;
  const pkg = body.package === "vip" ? "VIP" : body.package === "standard" ? "Standard" : "";
  const ratings = (body.ratings ?? {}) as Record<string, unknown>;

  const fields: Record<string, unknown> = {
    Tour: [date ?? "No date", pkg || "Package unknown"].join(" · "),
    "Submitted At": new Date().toISOString().slice(0, 10),
    Package: pkg,
    Length: LENGTH[String(body.length)] ?? "",
    "Best moment": text(body.best),
    "What to change": text(body.change),
    "Anything else": text(body.other),
    Language: body.lang === "th" ? "Thai" : "English",
  };
  if (date) fields["Tour Date"] = date;
  for (const [key, col] of Object.entries(PARTS)) {
    const n = int(ratings[key], 1, 5);
    if (n !== null) fields[col] = n;
  }
  const value = int(body.value, 1, 5);
  if (value !== null) fields["Value for money"] = value;
  const takeHomes = pkg === "VIP" ? int(body.takeHomes, 1, 5) : null;
  if (takeHomes !== null) fields["VIP take-homes"] = takeHomes;
  const recommend = int(body.recommend, 0, 10);
  if (recommend !== null) fields["Recommend (0-10)"] = recommend;

  const res = await fetch(`https://api.airtable.com/v0/${baseId}/${TABLE_ID}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ fields, typecast: true }),
  });
  if (!res.ok) {
    console.error("[tour-feedback] Airtable error:", await res.text());
    return NextResponse.json({ error: "Could not save." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
