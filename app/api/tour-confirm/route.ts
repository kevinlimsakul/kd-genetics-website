import { NextRequest } from "next/server";
import {
  type Lang,
  type TourBooking,
  confirmedEmail,
  parseContact,
  sendGuestEmail,
  tourDay,
  validSig,
  waNumber,
  whatsappConfirmText,
} from "@/lib/tour-messages";

// One-tap confirm from Kevin's booking alert email. GET only shows the
// booking + a Confirm button: email scanners prefetch links, so the actual
// change happens on POST. Confirming sets Status = Confirmed in Airtable,
// then emails the guest, or hands Kevin a WhatsApp link with the
// confirmation already written (we never auto-send on WhatsApp: Meta bans
// cannabis businesses and that number is the shop's main line).

export const dynamic = "force-dynamic";

const airtable = () => {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_TOUR_BASE_ID;
  const table = (process.env.AIRTABLE_TOUR_TABLE_NAME ?? "Bookings Website").trim();
  return {
    url: (id: string) =>
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}/${id}`,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  };
};

type Fields = Record<string, unknown>;

async function loadRecord(id: string): Promise<Fields | null> {
  const a = airtable();
  const res = await fetch(a.url(id), { headers: a.headers, cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()).fields ?? {};
}

function toBooking(f: Fields): TourBooking {
  // Package may be empty if the Airtable option didn't match; the API then
  // wrote the label as the first line of Notes.
  const fromNotes = String(f.Notes ?? "").split("\n")[0];
  const tier = String(
    f.Package ?? (/^(Standard|VIP)/.test(fromNotes) ? fromNotes : "Standard")
  );
  return {
    name: String(f.Name ?? "there"),
    date: String(f["Tour Date"] ?? ""),
    guests: Number(f["Number of Guests"]) || 1,
    tier,
    total: Number(f["Total Amount (THB)"]) || 0,
  };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function page(title: string, body: string, status = 200) {
  return new Response(
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>
<style>body{font-family:-apple-system,system-ui,sans-serif;background:#F6F4EF;color:#1E1E1E;margin:0;padding:32px 16px}
main{max-width:460px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,.06)}
h1{font-size:22px;margin:0 0 16px}p{margin:6px 0;line-height:1.5}.muted{color:#6B6B6B;font-size:14px}
.btn{display:block;width:100%;box-sizing:border-box;text-align:center;border:0;border-radius:999px;padding:14px;font-size:16px;font-weight:600;margin-top:20px;text-decoration:none;cursor:pointer}
.go{background:#5A6A4F;color:#fff}.wa{background:#25D366;color:#fff}
textarea{width:100%;box-sizing:border-box;height:200px;margin-top:12px;font:14px/1.4 system-ui;padding:10px;border-radius:8px;border:1px solid #ddd}</style>
</head><body><main>${body}</main></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

function summary(f: Fields, b: TourBooking) {
  return `<p><strong>${esc(b.name)}</strong></p>
<p>${esc(tourDay(b.date, "en"))} · ${b.guests} ${b.guests === 1 ? "guest" : "guests"}</p>
<p>${esc(b.tier)} · ฿${b.total.toLocaleString()}</p>
<p class="muted">${esc(String(f.Contact ?? ""))} · Status: ${esc(String(f.Status ?? "New"))}</p>`;
}

function readParams(p: URLSearchParams | FormData) {
  const id = String(p.get("id") ?? "");
  const lang: Lang = p.get("lang") === "th" ? "th" : "en";
  const sig = String(p.get("sig") ?? "");
  return { id, lang, sig, ok: /^rec\w+$/.test(id) && validSig(id, lang, sig) };
}

export async function GET(req: NextRequest) {
  const { id, lang, sig, ok } = readParams(req.nextUrl.searchParams);
  if (!ok) return page("Invalid link", "<h1>Invalid or broken link</h1>", 400);
  const f = await loadRecord(id);
  if (!f) return page("Not found", "<h1>Booking not found</h1><p class=muted>Deleted in Airtable?</p>", 404);

  const b = toBooking(f);
  const already = f.Status === "Confirmed";
  return page(
    "Confirm tour booking",
    `<h1>${already ? "Already confirmed" : "Confirm this booking?"}</h1>${summary(f, b)}
<form method="post">
<input type="hidden" name="id" value="${esc(id)}"><input type="hidden" name="lang" value="${lang}"><input type="hidden" name="sig" value="${esc(sig)}">
<button class="btn go">${already ? "Send the confirmation again" : "Confirm booking"}</button>
</form>`
  );
}

export async function POST(req: NextRequest) {
  const { id, lang, ok } = readParams(await req.formData());
  if (!ok) return page("Invalid link", "<h1>Invalid or broken link</h1>", 400);
  const f = await loadRecord(id);
  if (!f) return page("Not found", "<h1>Booking not found</h1>", 404);

  if (f.Status !== "Confirmed") {
    const a = airtable();
    const res = await fetch(a.url(id), {
      method: "PATCH",
      headers: a.headers,
      body: JSON.stringify({ fields: { Status: "Confirmed" } }),
    });
    if (!res.ok) {
      console.error("[tour-confirm] Airtable update failed:", await res.text());
      return page("Error", "<h1>Couldn't update Airtable</h1><p>Nothing was sent. Try again.</p>", 502);
    }
    f.Status = "Confirmed";
  }

  const b = toBooking(f);
  const reach = parseContact(String(f.Contact ?? ""));
  const text = whatsappConfirmText(b, lang);
  let next: string;

  if (reach.method === "email") {
    const sent = await sendGuestEmail(reach.value, confirmedEmail(b, lang));
    next = sent
      ? `<p>✓ Confirmation email sent to <strong>${esc(reach.value)}</strong>.</p>`
      : `<p><strong>Email not sent</strong> (guest sender not set up yet). Copy this and send it from your inbox:</p><textarea readonly>${esc(text)}</textarea>`;
  } else if (reach.method === "whatsapp" && waNumber(reach.value)) {
    const href = `https://wa.me/${waNumber(reach.value)}?text=${encodeURIComponent(text)}`;
    next = `<p>Last step: tap below, WhatsApp opens with the confirmation written. Just hit send.</p>
<a class="btn wa" href="${esc(href)}">Send on WhatsApp</a>`;
  } else {
    next = `<p>Send this to the guest (${esc(String(f.Contact ?? ""))}):</p><textarea readonly>${esc(text)}</textarea>`;
  }

  return page("Booking confirmed", `<h1>✓ Confirmed in Airtable</h1>${summary(f, b)}<hr style="border:0;border-top:1px solid #eee;margin:18px 0">${next}`);
}
