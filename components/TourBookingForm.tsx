"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { TOUR_CAPACITY, TOUR_PRICES, TOUR_TIME, upcomingTourDates } from "@/lib/tour";
import { PAYMENT_DETAILS } from "@/lib/order";
import TourCalendar from "@/components/TourCalendar";

type Status = "idle" | "loading" | "success" | "error" | "full" | "noDate";
type ContactMethod = "whatsapp" | "line" | "email";
type Payment = "shop" | "bank";

const METHODS: {
  value: ContactMethod;
  labelKey:
    | "tour.form.method.whatsapp"
    | "tour.form.method.line"
    | "tour.form.method.email";
}[] = [
  { value: "whatsapp", labelKey: "tour.form.method.whatsapp" },
  { value: "line", labelKey: "tour.form.method.line" },
  { value: "email", labelKey: "tour.form.method.email" },
];

const CONTACT_FIELD = {
  whatsapp: {
    labelKey: "tour.form.contact.whatsapp.label",
    phKey: "tour.form.contact.whatsapp.ph",
    type: "text",
  },
  line: {
    labelKey: "tour.form.contact.line.label",
    phKey: "tour.form.contact.line.ph",
    type: "text",
  },
  email: {
    labelKey: "tour.form.contact.email.label",
    phKey: "tour.form.contact.email.ph",
    type: "email",
  },
} as const;

const METHOD_LABEL: Record<ContactMethod, string> = {
  whatsapp: "WhatsApp",
  line: "Line",
  email: "Email",
};

// Today as YYYY-MM-DD in Thai time, the earliest day a custom tour can be.
const todayBkk = () => new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);

export type BookingSource = "qr" | "home" | "page";

const WHATSAPP = "https://wa.me/66988268290";

// Anything other than a scheduled Friday at TOUR_TIME is a request Kevin
// arranges by hand (another day, or another time on a Friday).


export default function TourBookingForm({
  source = "page",
  className = "max-w-md mx-auto mt-20",
}: {
  source?: BookingSource;
  className?: string;
}) {
  const { t, lang } = useLanguage();
  const tourDates = upcomingTourDates();
  const dateLabel = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString(lang === "th" ? "th-TH" : "en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: "UTC",
    });
  // QR codes on signs/posters land on /farm-tour?src=qr; that wins over the
  // placement default so we can see how many bookings the posters bring in.
  const [src, setSrc] = useState<BookingSource>(source);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("src") === "qr") setSrc("qr");
  }, []);
  // Live spots left per Friday (from Airtable via /api/tour-spots). null =
  // not loaded / unreadable: form still works, just without counts.
  const [spots, setSpots] = useState<Record<string, number | null> | null>(null);
  const loadSpots = () =>
    fetch("/api/tour-spots", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.spots) return;
        setSpots(
          Object.fromEntries(
            (d.spots as { date: string; left: number | null }[]).map((x) => [x.date, x.left])
          )
        );
      })
      .catch(() => {});
  useEffect(() => {
    loadSpots();
  }, []);
  const leftOn = (date: string) => spots?.[date] ?? null;
  const [fullLeft, setFullLeft] = useState(0);
  // Snapshot of the last submitted request, used to prefill WhatsApp.
  const [sent, setSent] = useState<typeof form | null>(null);
  // Set after a bank-transfer request: what to pay and the transfer reference.
  const [transfer, setTransfer] = useState<{ ref: string; total: number } | null>(null);
  const [form, setForm] = useState({
    name: "",
    contactMethod: "whatsapp" as ContactMethod,
    contact: "",
    date: "",
    people: "",
    package: "standard",
    payment: "shop" as Payment,
    time: "",
    notes: "",
  });
  const isCustom = (f: { date: string; time: string }) =>
    !!f.date && !(tourDates.includes(f.date) && f.time === TOUR_TIME);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.time) {
      setStatus("noDate");
      return;
    }
    setStatus("loading");

    try {
      const payload = {
        ...form,
        customTime: isCustom(form) ? (form.time === "flexible" ? "Flexible, any time" : form.time) : "",
        contact: `${METHOD_LABEL[form.contactMethod]}: ${form.contact}`,
        source: src,
        lang,
      };
      setSent(form);
      const res = await fetch("/api/book-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 409) {
        // Someone took the spots while this guest was filling in the form.
        const d = await res.json().catch(() => ({}));
        setFullLeft(Number(d.left) || 0);
        setStatus("full");
        loadSpots();
        return;
      }
      if (!res.ok) throw new Error("API error");

      const d = await res.json().catch(() => ({}));
      setTransfer(d.ref ? { ref: d.ref, total: Number(d.total) || 0 } : null);
      setStatus("success");
      loadSpots();
      setForm({
        name: "",
        contactMethod: "whatsapp",
        contact: "",
        date: "",
        people: "",
        package: "standard",
        payment: "shop",
        time: "",
        notes: "",
      });
    } catch {
      setStatus("error");
    }
  };

  // Prefilled WhatsApp message with the request details. Shown after success
  // (guest can ping us straight away) and on error (so a failed submit is
  // never a dead end, which is what happened in Aug 2026).
  const waLink = (f: typeof form | null) => {
    if (!f) return WHATSAPP;
    const pkg = f.package === "vip" ? "VIP" : "Standard";
    const when = isCustom(f)
      ? `${dateLabel(f.date)}, ${f.time === "flexible" ? "time flexible" : f.time} (on request)`
      : `${dateLabel(f.date)} ${TOUR_TIME}`;
    const msg = [
      `Hi KD! Farm tour request:`,
      `${pkg} tour, ${when}, ${f.people} ${Number(f.people) === 1 ? "person" : "people"}`,
      `Name: ${f.name}`,
      transfer ? `Bank transfer ref ${transfer.ref}, slip attached` : "",
      f.notes ? `Note: ${f.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      id="tour-booking"
      className={`${className} scroll-mt-24 bg-white text-[#1E1E1E] p-6 sm:p-10 rounded-2xl shadow-lg space-y-8`}
    >
      <div className="text-center">
        <h3 className="font-display text-2xl mb-2">{t("tour.form.heading")}</h3>
        <p className="text-sm text-[#6B6B6B]">{t("tour.form.sub")}</p>
      </div>

      {status === "success" ? (
        <div className="text-center space-y-4 py-8">
          <div className="text-3xl">✓</div>
          <h4 className="font-display text-xl">{t("tour.form.success.heading")}</h4>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            {t(transfer ? "tour.form.success.bodyBank" : "tour.form.success.body")}
          </p>
          {transfer && (
            <div className="text-left border border-black/10 rounded-xl p-5 bg-[#F6F4EF] space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                  {t("tour.form.bank.amount")}
                </span>
                <span className="font-display text-2xl">฿{transfer.total.toLocaleString()}</span>
              </div>
              <dl className="space-y-2">
                {[
                  [t("tour.form.bank.bank"), `${PAYMENT_DETAILS.bank.name}, ${PAYMENT_DETAILS.bank.branch}`],
                  [t("tour.form.bank.accountName"), PAYMENT_DETAILS.bank.accountName],
                  [t("tour.form.bank.accountNumber"), PAYMENT_DETAILS.bank.accountNumber],
                  ["SWIFT", PAYMENT_DETAILS.bank.swift],
                  [t("tour.form.bank.ref"), transfer.ref],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">{label}</dt>
                    <dd className="font-medium select-all">{value}</dd>
                  </div>
                ))}
              </dl>
              {sent && isCustom(sent) && (
                <p className="text-xs font-medium text-[#1E1E1E] leading-relaxed">
                  {t("tour.form.bank.waitCustom")}
                </p>
              )}
              <p className="text-xs text-[#6B6B6B] leading-relaxed">{t("tour.form.bank.note")}</p>
            </div>
          )}
          <a
            href={waLink(sent)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white px-6 h-11 text-sm font-medium hover:bg-[#25D366]/90 transition-colors"
          >
            {t(transfer ? "tour.form.whatsapp.slip" : "tour.form.whatsapp.success")}
          </a>
          <br />
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs underline text-[#6B6B6B]/70 hover:text-[#6B6B6B] transition-colors"
          >
            {t("tour.form.success.again")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.package")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "standard", labelKey: "tour.form.package.standard" as const },
                { value: "vip", labelKey: "tour.form.package.vip" as const },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, package: opt.value }))}
                  className={`py-2 px-3 rounded-lg border text-[11px] font-medium transition-all ${
                    form.package === opt.value
                      ? "bg-[#1E1E1E] text-white border-[#1E1E1E]"
                      : "bg-transparent text-[#1E1E1E]/60 border-black/10 hover:border-[#1E1E1E]/30"
                  }`}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.name")}
            </label>
            <input
              type="text"
              placeholder={t("tour.form.placeholder.name")}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.contactMethod")}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {METHODS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      contactMethod: opt.value,
                      contact: "",
                    }))
                  }
                  className={`py-2 px-3 rounded-lg border text-[11px] font-medium transition-all ${
                    form.contactMethod === opt.value
                      ? "bg-[#1E1E1E] text-white border-[#1E1E1E]"
                      : "bg-transparent text-[#1E1E1E]/60 border-black/10 hover:border-[#1E1E1E]/30"
                  }`}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t(CONTACT_FIELD[form.contactMethod].labelKey)}
            </label>
            <input
              type={CONTACT_FIELD[form.contactMethod].type}
              placeholder={t(CONTACT_FIELD[form.contactMethod].phKey)}
              value={form.contact}
              onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
              required
              className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.cal.label")}
            </label>
            <TourCalendar
              date={form.date}
              time={form.time}
              tourDates={tourDates}
              leftOn={leftOn}
              onChange={({ date, time }) => setForm((f) => ({ ...f, date, time }))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.people")}
            </label>
            <input
              type="number"
              min="1"
              max={isCustom(form) ? TOUR_CAPACITY : (leftOn(form.date) ?? TOUR_CAPACITY)}
              placeholder={t("tour.form.placeholder.people")}
              value={form.people}
              onChange={(e) => setForm((f) => ({ ...f, people: e.target.value }))}
              required
              className="w-full border border-black/10 rounded-lg h-12 px-4 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.payment")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "shop" as Payment, labelKey: "tour.form.payment.shop" as const },
                { value: "bank" as Payment, labelKey: "tour.form.payment.bank" as const },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, payment: opt.value }))}
                  className={`py-2 px-3 rounded-lg border text-[11px] font-medium transition-all ${
                    form.payment === opt.value
                      ? "bg-[#1E1E1E] text-white border-[#1E1E1E]"
                      : "bg-transparent text-[#1E1E1E]/60 border-black/10 hover:border-[#1E1E1E]/30"
                  }`}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-[#6B6B6B]">
              {form.payment === "bank" && Number(form.people) >= 1
                ? t("tour.form.payment.bankHint").replace(
                    "{amount}",
                    (TOUR_PRICES[form.package === "vip" ? "vip" : "standard"] * Number(form.people)).toLocaleString()
                  )
                : t(form.payment === "bank" ? "tour.form.payment.bankHintNoTotal" : "tour.form.payment.shopHint")}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
              {t("tour.form.label.notes")}{" "}
              <span className="normal-case tracking-normal font-normal">
                {t("tour.form.label.optional")}
              </span>
            </label>
            <textarea
              placeholder={t("tour.form.placeholder.notes")}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors resize-none"
            />
          </div>

          {status === "noDate" && (
            <p className="text-xs text-red-500 text-center">{t("tour.cal.missing")}</p>
          )}

          {status === "full" && (
            <p className="text-xs text-red-500 text-center">
              {fullLeft > 0
                ? t("tour.form.spots.tooMany").replace("{n}", String(fullLeft))
                : t("tour.form.spots.justFilled")}
            </p>
          )}

          {status === "error" && (
            <div className="text-center space-y-3">
              <p className="text-xs text-red-500">{t("tour.form.error")}</p>
              <a
                href={waLink(sent)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#25D366] text-white px-6 h-11 text-sm font-medium hover:bg-[#25D366]/90 transition-colors"
              >
                {t("tour.form.whatsapp.error")}
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full h-12 font-medium rounded-full mt-4 transition-all text-sm bg-[#1E1E1E] text-white hover:bg-[#1E1E1E]/90 disabled:opacity-50"
          >
            {status === "loading"
              ? t("tour.form.submit.sending")
              : t("tour.form.submit")}
          </button>
          <p className="text-[10px] text-center text-[#6B6B6B]/50 tracking-wide">
            {t("tour.form.limit")}
          </p>
        </form>
      )}
    </div>
  );
}
