"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

// Same Google Maps link as MAPS_URL in lib/tour-messages.ts (that file is
// server-only because it uses crypto).
const MAPS_URL = "https://maps.app.goo.gl/DwiYaDtvsqkoTsdS9";

// Anonymous post-tour feedback. Guests arrive via the QR card at the end of
// the tour (/feedback) or Kevin's WhatsApp message the next morning
// (/feedback?d=YYYY-MM-DD&p=vip|standard&lang=th, which prefills date,
// package and language). Saved by /api/tour-feedback; no name or contact.
//
// The Google review link is shown to EVERY guest after submitting, whatever
// they rated. Showing it only to happy guests ("review gating") breaks
// Google's rules, and the profile already had a review block in Oct 2026.

// Keep in sync with PARTS in app/api/tour-feedback/route.ts.
const FEEDBACK_PARTS = ["welcome", "hillside", "sustainability", "growing", "session"] as const;
type Part = (typeof FEEDBACK_PARTS)[number];
type Rating = number | "skip" | null;

const todayBkk = () =>
  new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);

function Scale({
  value,
  onChange,
  max = 5,
  min = 1,
  skipLabel,
}: {
  value: Rating;
  onChange: (v: Rating) => void;
  max?: number;
  min?: number;
  skipLabel?: string;
}) {
  const nums = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const dense = nums.length > 6;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {nums.map((n) => {
        const on = value === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(on ? null : n)}
            aria-pressed={on}
            className={`${dense ? "h-9 w-[calc((100%-10*0.375rem)/11)] min-w-0 text-xs" : "h-10 w-10 text-sm"} rounded-full border transition-colors ${
              on
                ? "bg-[#5A6A4F] border-[#5A6A4F] text-white"
                : "border-black/10 text-[#1E1E1E] hover:border-[#5A6A4F]/60"
            }`}
          >
            {n}
          </button>
        );
      })}
      {skipLabel && (
        <button
          type="button"
          onClick={() => onChange(value === "skip" ? null : "skip")}
          aria-pressed={value === "skip"}
          className={`ml-1 h-10 px-3 rounded-full border text-xs transition-colors ${
            value === "skip"
              ? "bg-[#1E1E1E] border-[#1E1E1E] text-white"
              : "border-black/10 text-[#6B6B6B] hover:border-black/30"
          }`}
        >
          {skipLabel}
        </button>
      )}
    </div>
  );
}

const label = "text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]";
const field =
  "w-full border border-black/10 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#5A6A4F] transition-colors";

export default function TourFeedbackForm() {
  const { t, lang, setLang } = useLanguage();
  const [date, setDate] = useState(todayBkk());
  const [pkg, setPkg] = useState<"standard" | "vip" | "">("");
  const [ratings, setRatings] = useState<Record<Part, Rating>>({
    welcome: null,
    hillside: null,
    sustainability: null,
    growing: null,
    session: null,
  });
  const [length, setLength] = useState("");
  const [value, setValue] = useState<Rating>(null);
  const [takeHomes, setTakeHomes] = useState<Rating>(null);
  const [recommend, setRecommend] = useState<Rating>(null);
  const [best, setBest] = useState("");
  const [change, setChange] = useState("");
  const [other, setOther] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  // Prefill from the WhatsApp link.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const d = q.get("d");
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) setDate(d);
    const p = q.get("p");
    if (p === "vip" || p === "standard") setPkg(p);
    if (q.get("lang") === "th") setLang("th");
  }, [setLang]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const num = (r: Rating) => (typeof r === "number" ? r : null);
    try {
      const res = await fetch("/api/tour-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          package: pkg,
          ratings: Object.fromEntries(FEEDBACK_PARTS.map((p) => [p, num(ratings[p])])),
          length,
          value: num(value),
          takeHomes: num(takeHomes),
          recommend: num(recommend),
          best,
          change,
          other,
          lang,
          website: honey,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center space-y-5">
        <h2 className="font-display text-4xl text-[#1E1E1E]">{t("fb.thanks.title")}</h2>
        <p className="text-[#6B6B6B] font-light leading-relaxed">{t("fb.thanks.body")}</p>
        <div className="mx-auto h-px w-12 bg-black/10" />
        <p className="text-sm text-[#6B6B6B] font-light leading-relaxed">{t("fb.review.body")}</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-[#5A6A4F]/40 text-[#5A6A4F] hover:bg-[#5A6A4F] hover:text-white h-11 px-6 text-sm font-medium transition-colors"
        >
          {t("fb.review.cta")}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-9">
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="fb-date" className={label}>
            {t("fb.label.date")}
          </label>
          <input
            id="fb-date"
            type="date"
            value={date}
            max={todayBkk()}
            onChange={(e) => setDate(e.target.value)}
            className={`${field} h-12 py-0`}
          />
        </div>
        <div className="space-y-2">
          <span className={label}>{t("fb.label.package")}</span>
          <div className="grid grid-cols-2 gap-1.5">
            {(["standard", "vip"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPkg(pkg === p ? "" : p)}
                aria-pressed={pkg === p}
                className={`h-12 rounded-lg border text-sm transition-colors ${
                  pkg === p
                    ? "bg-[#1E1E1E] border-[#1E1E1E] text-white"
                    : "border-black/10 text-[#1E1E1E] hover:border-black/30"
                }`}
              >
                {t(p === "vip" ? "fb.pkg.vip" : "fb.pkg.standard")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-5">
        <div>
          <h2 className="font-display text-2xl text-[#1E1E1E]">{t("fb.parts.heading")}</h2>
          <p className="text-xs text-[#6B6B6B] font-light mt-1 leading-relaxed">{t("fb.parts.hint")}</p>
        </div>
        {FEEDBACK_PARTS.map((p, i) => (
          <div key={p} className="space-y-2.5 pt-4 border-t border-black/[0.06] first:border-0 first:pt-0">
            <p className="text-sm text-[#1E1E1E]">
              <span className="text-[#5A6A4F] mr-2 font-display">{i + 1}.</span>
              {t(`fb.part.${p}` as TranslationKey)}
            </p>
            <Scale
              value={ratings[p]}
              onChange={(v) => setRatings((r) => ({ ...r, [p]: v }))}
              skipLabel={t("fb.skipped")}
            />
          </div>
        ))}
      </section>

      <section className="space-y-7 pt-2 border-t border-black/[0.06]">
        <div className="space-y-2.5 pt-6">
          <p className={label}>{t("fb.length.label")}</p>
          <div className="grid grid-cols-3 gap-1.5">
            {(["short", "right", "long"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLength(length === l ? "" : l)}
                aria-pressed={length === l}
                className={`h-11 rounded-full border text-sm transition-colors ${
                  length === l
                    ? "bg-[#5A6A4F] border-[#5A6A4F] text-white"
                    : "border-black/10 text-[#1E1E1E] hover:border-[#5A6A4F]/60"
                }`}
              >
                {t(`fb.length.${l}` as TranslationKey)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <p className={label}>{t("fb.value.label")}</p>
          <Scale value={value} onChange={setValue} />
          <p className="text-[11px] text-[#6B6B6B]/80 font-light">{t("fb.value.hint")}</p>
        </div>

        {pkg === "vip" && (
          <div className="space-y-2.5">
            <p className={label}>{t("fb.takeHomes.label")}</p>
            <Scale value={takeHomes} onChange={setTakeHomes} />
          </div>
        )}

        <div className="space-y-2.5">
          <p className={label}>{t("fb.recommend.label")}</p>
          <Scale value={recommend} onChange={setRecommend} min={0} max={10} />
          <div className="flex justify-between text-[11px] text-[#6B6B6B]/80 font-light">
            <span>{t("fb.recommend.low")}</span>
            <span>{t("fb.recommend.high")}</span>
          </div>
        </div>
      </section>

      <section className="space-y-6 pt-6 border-t border-black/[0.06]">
        {(
          [
            ["best", best, setBest],
            ["change", change, setChange],
            ["other", other, setOther],
          ] as const
        ).map(([k, v, set]) => (
          <div key={k} className="space-y-2">
            <label htmlFor={`fb-${k}`} className={label}>
              {t(`fb.${k}.label` as TranslationKey)}{" "}
              <span className="normal-case tracking-normal font-normal">{t("fb.optional")}</span>
            </label>
            <textarea
              id={`fb-${k}`}
              rows={3}
              value={v}
              onChange={(e) => set(e.target.value)}
              placeholder={t(`fb.${k}.ph` as TranslationKey)}
              className={`${field} resize-none`}
            />
          </div>
        ))}
      </section>

      {status === "error" && <p className="text-xs text-red-500 text-center">{t("fb.error")}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full h-14 rounded-full bg-[#1E1E1E] text-white text-base font-medium hover:bg-[#5A6A4F] transition-colors disabled:opacity-60"
      >
        {status === "sending" ? t("fb.sending") : t("fb.submit")}
      </button>
    </form>
  );
}
