"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import TourBookingForm from "@/components/TourBookingForm";
import { useLanguage } from "@/lib/i18n";
import { standardKeys, vipExtras } from "@/lib/tour-tiers";

type Tier = "standard" | "vip";

// Compact Farm Tour block for the homepage. The full story lives on
// /farm-tour (Kevin rejected the whole page on the homepage as too much
// scrolling). The two price tiles open an inline panel with what's included
// (same content as the /farm-tour cards); "Book" there opens the booking form
// with that package preselected.
export default function HomeTourSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [tier, setTier] = useState<Tier | null>(null);
  const [pkg, setPkg] = useState<Tier>("standard");

  const toggle = (next: Tier) => setTier((cur) => (cur === next ? null : next));

  const book = (p: Tier) => {
    setPkg(p);
    setOpen(true);
    // Wait for the form to mount, then bring it into view.
    setTimeout(() => {
      document.getElementById("tour-booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const tiles: { id: Tier; price: string }[] = [
    { id: "standard", price: "1,250 THB" },
    { id: "vip", price: "2,500 THB" },
  ];

  // Keep the last opened tier's content while the panel animates closed.
  const [shown, setShown] = useState<Tier>("standard");
  if (tier && tier !== shown) setShown(tier);

  return (
    <section id="tour" className="py-20 md:py-32 bg-[#F6F4EF] scroll-mt-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
              <Image
                src="/tour-hero.jpg"
                alt="Papa KD walking the hillside cannabis garden above the sea on Koh Tao"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 space-y-6">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              {t("home.tour.eyebrow")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
              {t("home.tour.heading")}
            </h2>
            <p className="text-[#6B6B6B] text-base md:text-lg font-light leading-relaxed">
              {t("home.tour.body")}
            </p>

            {/* Tier tiles: tap to reveal what's included */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {tiles.map(({ id, price }) => {
                  const active = tier === id;
                  const isVip = id === "vip";
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggle(id)}
                      aria-expanded={active}
                      aria-controls="tour-tier-panel"
                      className={`group relative text-left rounded-xl border px-4 py-3 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A6A4F]/50 ${
                        active
                          ? "border-[#5A6A4F] bg-[#5A6A4F] text-white shadow-[0_10px_30px_-12px_rgba(90,106,79,0.6)]"
                          : isVip
                          ? "border-[#5A6A4F]/40 bg-[#5A6A4F]/5 hover:border-[#5A6A4F]/70 hover:bg-[#5A6A4F]/10"
                          : "border-black/10 hover:border-black/25 hover:bg-white/60"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] uppercase tracking-[0.15em] ${
                            active ? "text-white/70" : isVip ? "text-[#5A6A4F]" : "text-[#6B6B6B]"
                          }`}
                        >
                          {t(id === "vip" ? "tour.tier.vip" : "tour.tier.standard")}
                        </span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${
                            active ? "rotate-180 text-white/70" : "text-[#1E1E1E]/30 group-hover:text-[#1E1E1E]/60"
                          }`}
                        />
                      </span>
                      <span
                        className={`block font-display text-2xl ${active ? "text-white" : "text-[#1E1E1E]"}`}
                      >
                        {price}
                      </span>
                      {isVip && (
                        <span
                          className={`absolute -top-2.5 right-3 rounded-full px-2.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.15em] ${
                            active ? "bg-[#F6F4EF] text-[#5A6A4F]" : "bg-[#5A6A4F] text-white"
                          }`}
                        >
                          {t("tour.vip.badge")}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {!tier && (
                <p className="text-[11px] tracking-wide text-[#6B6B6B]/70 font-light">
                  {t("home.tour.tap")}
                </p>
              )}

              {/* Expanding details panel */}
              <div
                id="tour-tier-panel"
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                  tier ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
                aria-hidden={!tier}
              >
                <div className="overflow-hidden">
                  <div className="mt-1 rounded-2xl bg-white border border-black/[0.06] shadow-[0_20px_50px_-25px_rgba(30,30,30,0.25)] p-6">
                    <div className="flex items-baseline justify-between gap-4 pb-4 border-b border-black/[0.07]">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#5A6A4F]">
                          {t(shown === "vip" ? "tour.tier.vip" : "tour.tier.standard")}
                        </p>
                        <p className="text-[12px] text-[#6B6B6B] font-light mt-1">
                          {t(shown === "vip" ? "tour.tier.vip.dur" : "tour.tier.standard.dur")}
                        </p>
                      </div>
                      <p className="font-display text-2xl text-[#1E1E1E] shrink-0">
                        {shown === "vip" ? "2,500" : "1,250"}
                        <span className="text-sm text-[#6B6B6B] ml-1">THB</span>
                      </p>
                    </div>

                    <ul className="pt-4 space-y-2.5">
                      {shown === "standard"
                        ? standardKeys.map((k) => (
                            <li key={k} className="flex items-start gap-3 text-sm text-[#3A3A3A] font-light">
                              <CheckCircle2 className="h-4 w-4 text-[#5A6A4F]/60 mt-0.5 shrink-0" />
                              {t(k)}
                            </li>
                          ))
                        : vipExtras.map((x) => (
                            <li
                              key={x.key}
                              className="flex items-start justify-between gap-3 text-sm text-[#3A3A3A] font-light"
                            >
                              <span className="flex items-start gap-3">
                                <CheckCircle2 className="h-4 w-4 text-[#5A6A4F]/60 mt-0.5 shrink-0" />
                                <span>
                                  {t(x.key)}
                                  {"note" in x && (
                                    <span className="block mt-1 text-[11px] italic text-[#6B6B6B]/70 tracking-wide">
                                      {t(x.note)}
                                    </span>
                                  )}
                                </span>
                              </span>
                              {x.value && (
                                <span className="text-[#6B6B6B]/50 line-through text-xs shrink-0 mt-0.5">
                                  {x.value}
                                </span>
                              )}
                            </li>
                          ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => book(shown)}
                      tabIndex={tier ? 0 : -1}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#1E1E1E] text-white hover:bg-[#5A6A4F] rounded-full h-11 text-sm font-medium transition-colors"
                    >
                      {t("home.tour.bookTier").replace(
                        "{tier}",
                        t(shown === "vip" ? "tour.tier.vip" : "tour.tier.standard")
                      )}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[#6B6B6B] text-sm font-light">{t("home.tour.pay")}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {!open && (
                <button
                  onClick={() => book(tier ?? "standard")}
                  className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-8 h-12 text-sm font-medium transition-all"
                >
                  {t("tour.cta.book")}
                </button>
              )}
              <a
                href="/farm-tour"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1E1E1E]/70 hover:text-[#1E1E1E] transition-colors"
              >
                {t("home.tour.more")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {open && (
          <TourBookingForm source="home" initialPackage={pkg} className="max-w-md mx-auto mt-14" />
        )}
      </div>
    </section>
  );
}
