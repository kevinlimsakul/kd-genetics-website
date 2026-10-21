"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { REQUEST_TIMES, TOUR_TIME, TOUR_WEEKDAY } from "@/lib/tour";

// Month calendar for the tour form. Scheduled Fridays (the next 8, from
// upcomingTourDates) are highlighted with live spots; every other day from
// tomorrow up to MAX_DAYS_AHEAD can be requested at a time of the guest's
// choice, which Kevin then arranges by hand.

const MAX_DAYS_AHEAD = 90;
// Show "N spots left" only when a Friday is getting full. "10 spots left"
// on an empty tour reads as nobody's coming.
const LOW_SPOTS = 5;

// Today in Thai time as a UTC-midnight Date, so all maths stays in UTC.
const todayBkk = () => {
  const b = new Date(Date.now() + 7 * 3600 * 1000);
  return new Date(Date.UTC(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()));
};
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

// "1:00 pm" → "13:00 น." for the Thai view. Stored values stay English.
function thaiTime(t: string) {
  const m = t.match(/^(\d{1,2}):(\d{2}) (am|pm)$/);
  if (!m) return t;
  let h = Number(m[1]) % 12;
  if (m[3] === "pm") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]} น.`;
}

export default function TourCalendar({
  date,
  time,
  tourDates,
  leftOn,
  onChange,
}: {
  date: string;
  time: string;
  tourDates: string[];
  leftOn: (date: string) => number | null;
  onChange: (v: { date: string; time: string }) => void;
}) {
  const { t, lang } = useLanguage();
  const locale = lang === "th" ? "th-TH" : "en-GB";
  const today = todayBkk();
  const firstRequestDay = iso(addDays(today, 1));
  const lastDay = iso(addDays(today, MAX_DAYS_AHEAD));
  const scheduled = new Set(tourDates);

  const [month, setMonth] = useState(() => {
    const start = date ? new Date(`${date}T00:00:00Z`) : today;
    return new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  });
  const shiftMonth = (n: number) =>
    setMonth((m) => new Date(Date.UTC(m.getUTCFullYear(), m.getUTCMonth() + n, 1)));
  const canPrev = month > new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
  const canNext = iso(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 1))) <= lastDay;

  // Monday-first grid with leading blanks.
  const lead = (month.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0)).getUTCDate();
  const cells: (string | null)[] = [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      iso(new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), i + 1)))
    ),
  ];
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Date(Date.UTC(2024, 0, 1 + i)).toLocaleDateString(locale, { weekday: "narrow", timeZone: "UTC" })
  );

  const isScheduled = (d: string) => scheduled.has(d);
  const isFull = (d: string) => isScheduled(d) && leftOn(d) === 0;
  // A scheduled Friday is always pickable (other times can be requested even
  // when 4:20 is full); other days from tomorrow up to the horizon.
  const selectable = (d: string) => isScheduled(d) || (d >= firstRequestDay && d <= lastDay);

  const pickDay = (d: string) => {
    // Fridays pre-select the scheduled slot unless it's full.
    const keep = time && (time !== TOUR_TIME || (isScheduled(d) && !isFull(d))) ? time : "";
    onChange({ date: d, time: isScheduled(d) && !isFull(d) ? TOUR_TIME : keep });
  };

  const showTime = (v: string) =>
    v === "flexible" ? t("tour.cal.flexible") : lang === "th" ? thaiTime(v) : v;

  const chip = (active: boolean, disabled = false) =>
    `py-2 px-3 rounded-lg border text-[11px] font-medium transition-all ${
      disabled
        ? "border-black/5 text-[#1E1E1E]/25 line-through cursor-not-allowed"
        : active
          ? "bg-[#1E1E1E] text-white border-[#1E1E1E]"
          : "bg-transparent text-[#1E1E1E]/70 border-black/10 hover:border-[#1E1E1E]/30"
    }`;

  const friday = date && isScheduled(date);
  const left = date ? leftOn(date) : null;

  return (
    <div className="space-y-4">
      <div className="border border-black/10 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canPrev}
            aria-label={t("tour.cal.prev")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <p className="font-display text-lg">
            {month.toLocaleDateString(locale, { month: "long", year: "numeric", timeZone: "UTC" })}
          </p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            disabled={!canNext}
            aria-label={t("tour.cal.next")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdays.map((w, i) => (
            <div
              key={i}
              className={`text-[10px] uppercase pb-1 ${
                (i + 1) % 7 === TOUR_WEEKDAY ? "text-[#5A6A4F] font-semibold" : "text-[#6B6B6B]/60"
              }`}
            >
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`b${i}`} />;
            const can = selectable(d);
            const sched = isScheduled(d);
            const selected = d === date;
            const dayLeft = sched ? leftOn(d) : null;
            return (
              <button
                key={d}
                type="button"
                disabled={!can}
                onClick={() => pickDay(d)}
                aria-pressed={selected}
                aria-label={new Date(`${d}T00:00:00Z`).toLocaleDateString(locale, {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  timeZone: "UTC",
                })}
                className={`relative aspect-square rounded-lg text-sm transition-all flex flex-col items-center justify-center ${
                  selected
                    ? "bg-[#1E1E1E] text-white"
                    : sched
                      ? "bg-[#5A6A4F]/10 text-[#3F4B37] font-semibold hover:bg-[#5A6A4F]/20"
                      : can
                        ? "text-[#1E1E1E]/80 hover:bg-black/5"
                        : "text-[#1E1E1E]/20 cursor-not-allowed"
                }`}
              >
                {Number(d.slice(8))}
                {sched && (
                  <span
                    className={`absolute bottom-1 w-1 h-1 rounded-full ${
                      dayLeft === 0 ? "bg-red-400" : selected ? "bg-white" : "bg-[#5A6A4F]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-[#6B6B6B]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5A6A4F]" />
            {t("tour.cal.legend.friday")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full border border-[#6B6B6B]/50" />
            {t("tour.cal.legend.request")}
          </span>
        </div>
      </div>

      {date ? (
        <div className="space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]">
            {t("tour.cal.time")}
          </p>
          {friday && (
            <button
              type="button"
              disabled={isFull(date)}
              onClick={() => onChange({ date, time: TOUR_TIME })}
              className={`w-full ${chip(time === TOUR_TIME, isFull(date))} flex items-center justify-between`}
            >
              <span>
                {showTime(TOUR_TIME)} · {t("tour.cal.scheduled")}
              </span>
              <span className="opacity-70 no-underline">
                {isFull(date)
                  ? t("tour.form.spots.full")
                  : left !== null && left <= LOW_SPOTS
                    ? t("tour.form.spots.left").replace("{n}", String(left))
                    : ""}
              </span>
            </button>
          )}
          {friday && (
            <p className="text-[10px] text-[#6B6B6B]/70 pt-1">{t("tour.cal.orRequest")}</p>
          )}
          <div className="grid grid-cols-4 gap-2">
            {[...REQUEST_TIMES.filter((v) => !(friday && v === TOUR_TIME)), "flexible"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ date, time: v })}
                className={chip(time === v)}
              >
                {showTime(v)}
              </button>
            ))}
          </div>
          {time && !(friday && time === TOUR_TIME) && (
            <p className="text-[11px] text-[#6B6B6B]">{t("tour.form.custom.hint")}</p>
          )}
        </div>
      ) : (
        <p className="text-[11px] text-[#6B6B6B]">{t("tour.cal.pick")}</p>
      )}
    </div>
  );
}
