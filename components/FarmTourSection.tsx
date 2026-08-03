"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import TourBookingForm from "@/components/TourBookingForm";
import { useLanguage } from "@/lib/i18n";

// Farm Tour, consolidated onto kdgenetics.org (kdtours.tours retired, Stripe
// dropped). Photo-forward, bilingual via i18n (t()), deliberately short.
// Booking = request-to-book via the Airtable form; payment on arrival (cash /
// card at the shop), NO public QR. Photos from the Huw shoot. NOTE: never call
// the grow "living soil" — it's organic soil + BioBizz nutrients (hybrid).

const moments = [
  {
    img: "/tour-shop.jpg",
    titleKey: "tour.moment1.title",
    descKey: "tour.moment1.desc",
  },
  {
    img: "/tour-farm.jpg",
    titleKey: "tour.moment2.title",
    descKey: "tour.moment2.desc",
  },
  {
    img: "/tour-sesh.jpg",
    titleKey: "tour.moment3.title",
    descKey: "tour.moment3.desc",
  },
] as const;

const standardKeys = [
  "tour.std.1",
  "tour.std.2",
  "tour.std.3",
  "tour.std.4",
  "tour.std.5",
] as const;

// THB values shown struck through next to each VIP take-home. Prices are
// currency, not language, so they stay hardcoded. Sum = 2,690 (= "almost
// 3,000" in the subtitle). The 10% flower discount has no fixed value.
const vipExtras = [
  { key: "tour.vip.1", value: "800 THB" },
  { key: "tour.vip.2", value: "750 THB" },
  { key: "tour.vip.3", value: "700 THB" },
  { key: "tour.vip.4", value: "140 THB" },
  { key: "tour.vip.5", value: "300 THB" },
  { key: "tour.vip.6", value: null },
] as const;

export default function FarmTourSection() {
  const { t } = useLanguage();
  return (
    <div id="tour">
      {/* Hero */}
      <section
        data-nav-dark
        className="relative min-h-[85vh] flex items-end overflow-hidden"
      >
        <Image
          src="/tour-hero.jpg"
          alt="Papa KD walking the hillside cannabis garden above the sea on Koh Tao"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 md:pb-28">
          <div className="max-w-2xl space-y-6">
            <span className="text-white/80 font-medium text-[10px] uppercase tracking-[0.3em]">
              {t("tour.hero.eyebrow")}
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white leading-[1.08]">
              {t("tour.hero.title")}
            </h1>
            <p className="text-white/70 text-lg font-light leading-relaxed max-w-xl">
              {t("tour.hero.sub")}
            </p>
            <a
              href="#tour-booking"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#1E1E1E] px-7 py-3.5 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              {t("tour.cta.book")}
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#F6F4EF] py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center space-y-6">
          <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
            {t("tour.intro.eyebrow")}
          </span>
          <p className="text-xl md:text-2xl text-[#1E1E1E] font-light leading-relaxed">
            {t("tour.intro.body")}
          </p>
        </div>
      </section>

      {/* Moments */}
      <section className="bg-[#F6F4EF] pb-24 md:pb-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {moments.map((m) => (
              <div key={m.img} className="space-y-5">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={m.img}
                    alt={t(m.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl text-[#1E1E1E]">
                    {t(m.titleKey)}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm font-light leading-relaxed">
                    {t(m.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family band */}
      <section className="relative h-[82vh] min-h-[640px] flex items-end overflow-hidden">
        <Image
          src="/tour-family.jpg"
          alt="Two generations of the KD Genetics family at harvest"
          fill
          sizes="100vw"
          style={{ objectPosition: "50% 20%" }}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <p className="relative z-10 container mx-auto px-6 lg:px-12 pb-12 font-display text-2xl md:text-3xl text-white">
          {t("tour.family.caption")}
        </p>
      </section>

      {/* Pricing */}
      <section className="bg-[#1E1E1E] text-white py-24 md:py-32" data-nav-dark>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-14 space-y-3">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              {t("tour.pricing.eyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl">
              {t("tour.pricing.heading")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Standard */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-5">
              <div className="space-y-1">
                <span className="text-white/40 text-[11px] font-medium uppercase tracking-[0.15em]">
                  {t("tour.tier.standard")}
                </span>
                <p className="font-display text-3xl">1,500 THB</p>
                <p className="text-white/40 text-[11px] font-light">
                  {t("tour.tier.standard.dur")}
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/10">
                {standardKeys.map((k) => (
                  <li
                    key={k}
                    className="flex items-start gap-3 text-sm text-white/60 font-light"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#5A6A4F]/50 mt-0.5 shrink-0" />
                    {t(k)}
                  </li>
                ))}
              </ul>
            </div>
            {/* VIP */}
            <div className="p-8 bg-white/[0.07] border border-[#5A6A4F]/40 rounded-2xl space-y-5 relative">
              <span className="absolute top-5 right-5 text-[#5A6A4F] text-[9px] font-medium uppercase tracking-[0.15em] bg-[#5A6A4F]/15 rounded-full px-3 py-1">
                {t("tour.vip.badge")}
              </span>
              <div className="space-y-1">
                <span className="text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.15em]">
                  {t("tour.tier.vip")}
                </span>
                <p className="font-display text-3xl">3,000 THB</p>
                <p className="text-white/40 text-[11px] font-light">
                  {t("tour.tier.vip.dur")}
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/10">
                {vipExtras.map((x) => (
                  <li
                    key={x.key}
                    className="flex items-center justify-between gap-3 text-sm text-white/60 font-light"
                  >
                    <span className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#5A6A4F]/50 mt-0.5 shrink-0" />
                      {t(x.key)}
                    </span>
                    {x.value && (
                      <span className="text-white/30 line-through text-xs shrink-0">
                        {x.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking form */}
          <div className="mt-16">
            <TourBookingForm />
          </div>

          {/* Payment: on arrival, no public QR */}
          <p className="mt-10 text-center text-white/50 text-sm font-light leading-relaxed max-w-xl mx-auto">
            {t("tour.pay")}
          </p>
        </div>
      </section>
    </div>
  );
}
