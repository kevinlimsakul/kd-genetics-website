import { createHmac, timingSafeEqual } from "crypto";
import { TOUR_TIME } from "@/lib/tour";

// Guest-facing tour messages (emails + the WhatsApp confirmation text Kevin
// sends by hand) and the signed one-tap "Confirm" link in his alert email.
// LINE gets nothing automated: it can't message a typed LINE ID, and Kevin
// says LINE barely matters for tour guests (Oct 2026).

export type Lang = "en" | "th";

export const MAPS_URL = "https://maps.app.goo.gl/DwiYaDtvsqkoTsdS9";
export const KD_WHATSAPP = "https://wa.me/66988268290";

// Contact is stored as "WhatsApp: +66...", "Email: a@b.c" or "Line: id".
export function parseContact(contact: string) {
  const m = contact.match(/^(WhatsApp|Email|Line):\s*(.+)$/i);
  if (!m) return { method: "other" as const, value: contact.trim() };
  return {
    method: m[1].toLowerCase() as "whatsapp" | "email" | "line",
    value: m[2].trim(),
  };
}

// wa.me needs digits with country code. Local Thai numbers (08x...) get 66.
export function waNumber(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  else if (d.startsWith("0")) d = `66${d.slice(1)}`;
  return d.length >= 8 ? d : null;
}

export function tourDay(iso: string, lang: Lang) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

const time = (lang: Lang) => (lang === "th" ? "16:20 น." : TOUR_TIME);

export type TourBooking = {
  name: string;
  date: string;
  guests: number;
  tier: string; // e.g. "Standard — 1,250 THB"
  total: number;
};

const tierName = (tier: string) => tier.split(/\s[—:-]\s?/)[0].trim();

// ── Signed confirm link ────────────────────────────────────────────────────
// Keyed off the Airtable token so there's no extra env var to manage.
function sign(id: string, lang: Lang) {
  const key = process.env.TOUR_CONFIRM_SECRET ?? process.env.AIRTABLE_API_TOKEN ?? "";
  return createHmac("sha256", key).update(`${id}:${lang}`).digest("hex").slice(0, 32);
}

export function confirmUrl(origin: string, id: string, lang: Lang) {
  const q = new URLSearchParams({ id, lang, sig: sign(id, lang) });
  return `${origin}/api/tour-confirm?${q}`;
}

export function validSig(id: string, lang: Lang, sig: string) {
  const want = Buffer.from(sign(id, lang));
  const got = Buffer.from(sig);
  return want.length === got.length && timingSafeEqual(want, got);
}

// ── WhatsApp confirmation text (Kevin taps send) ───────────────────────────
export function whatsappConfirmText(b: TourBooking, lang: Lang) {
  const first = b.name.split(" ")[0];
  if (lang === "th") {
    return [
      `สวัสดีครับคุณ${first}! ยืนยันการจองฟาร์มทัวร์ KD Genetics แล้วครับ 🌱`,
      ``,
      `${tourDay(b.date, lang)} เวลา ${time(lang)}`,
      `${tierName(b.tier)} · ${b.guests} ท่าน · ${b.total.toLocaleString()} บาท`,
      ``,
      `เริ่มที่ร้าน KD Genetics อ่าวโตนด: ${MAPS_URL}`,
      `ชำระเงินสดหรือบัตรที่ร้านเมื่อมาถึง มีชาต้อนรับและของว่างรอคุณอยู่ครับ`,
      `ใส่รองเท้าที่เดินสบาย แล้วเจอกันครับ!`,
    ].join("\n");
  }
  return [
    `Hi ${first}! Your KD Genetics farm tour is confirmed 🌱`,
    ``,
    `${tourDay(b.date, lang)}, ${time(lang)}`,
    `${tierName(b.tier)} · ${b.guests} ${b.guests === 1 ? "guest" : "guests"} · ${b.total.toLocaleString()} THB`,
    ``,
    `We start at the KD Genetics shop in Tanote Bay: ${MAPS_URL}`,
    `Pay cash or card at the shop when you arrive. Welcome tea & a snack are waiting for you.`,
    `Wear comfortable shoes. See you there!`,
  ].join("\n");
}

// ── Guest emails ───────────────────────────────────────────────────────────
type Email = { subject: string; text: string; html: string };

function wrap(lines: string[], cta?: { href: string; label: string }) {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const body = lines
    .map((l) => (l === "" ? "<br>" : `<p style="margin:0 0 6px">${esc(l)}</p>`))
    .join("");
  const button = cta
    ? `<p style="margin:24px 0"><a href="${cta.href}" style="background:#5A6A4F;color:#fff;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px">${esc(cta.label)}</a></p>`
    : "";
  return `<div style="font-family:Georgia,serif;color:#1E1E1E;font-size:15px;line-height:1.6;max-width:520px">${body}${button}<p style="color:#6B6B6B;font-size:13px;margin-top:28px">KD Genetics · Tanote Bay, Koh Tao · kdgenetics.org</p></div>`;
}

export function requestReceivedEmail(b: TourBooking, lang: Lang): Email {
  const first = b.name.split(" ")[0];
  const lines =
    lang === "th"
      ? [
          `สวัสดีคุณ${first}`,
          ``,
          `เราได้รับคำขอจองฟาร์มทัวร์ของคุณแล้ว:`,
          `${tourDay(b.date, lang)} เวลา ${time(lang)}`,
          `${tierName(b.tier)} · ${b.guests} ท่าน · ${b.total.toLocaleString()} บาท`,
          ``,
          `ยังไม่ใช่การยืนยัน เราจะส่งอีเมลยืนยันภายในไม่กี่ชั่วโมง`,
          `ไม่ต้องชำระล่วงหน้า ชำระเงินสดหรือบัตรที่ร้านเมื่อมาถึง`,
          ``,
          `มีคำถาม? ทักเราทาง WhatsApp ได้เลย`,
        ]
      : [
          `Hi ${first},`,
          ``,
          `Thanks! We've got your farm tour request:`,
          `${tourDay(b.date, lang)}, ${time(lang)}`,
          `${tierName(b.tier)} · ${b.guests} ${b.guests === 1 ? "guest" : "guests"} · ${b.total.toLocaleString()} THB`,
          ``,
          `This isn't a confirmation yet. We'll email you again within a few hours to confirm.`,
          `No prepayment: pay cash or card at the shop when you arrive.`,
          ``,
          `Questions? Message us on WhatsApp.`,
        ];
  return {
    subject:
      lang === "th"
        ? `ได้รับคำขอจองฟาร์มทัวร์แล้ว · ${tourDay(b.date, lang)}`
        : `We got your farm tour request · ${tourDay(b.date, lang)}`,
    text: lines.join("\n") + `\n${KD_WHATSAPP}`,
    html: wrap(lines, { href: KD_WHATSAPP, label: "WhatsApp KD Genetics" }),
  };
}

export function confirmedEmail(b: TourBooking, lang: Lang): Email {
  const lines = whatsappConfirmText(b, lang).split("\n");
  return {
    subject:
      lang === "th"
        ? `ยืนยันฟาร์มทัวร์แล้ว · ${tourDay(b.date, lang)} ${time(lang)}`
        : `Your farm tour is confirmed · ${tourDay(b.date, lang)}, ${time(lang)}`,
    text: lines.join("\n"),
    html: wrap(lines.map((l) => l.replace(`: ${MAPS_URL}`, "")), {
      href: MAPS_URL,
      label: lang === "th" ? "เส้นทางไปร้าน" : "Directions to the shop",
    }),
  };
}

// Sends via Resend from the verified kdgenetics.org sender. Returns false
// (and logs) when TOUR_GUEST_FROM isn't set yet: resend.dev's test sender
// can only deliver to the account owner, not to guests.
export async function sendGuestEmail(to: string, email: Email) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.TOUR_GUEST_FROM;
  if (!apiKey || !from) {
    console.warn("[tour] Guest email skipped: set TOUR_GUEST_FROM (verified kdgenetics.org sender).");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], ...email }),
    });
    if (!res.ok) console.error("[tour] Guest email failed:", await res.text());
    return res.ok;
  } catch (err) {
    console.error("[tour] Guest email threw:", err);
    return false;
  }
}
