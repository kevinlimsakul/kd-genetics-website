"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import TourBookingForm from "@/components/TourBookingForm";
import { useLanguage } from "@/lib/i18n";

// Compact Farm Tour block for the homepage. The full story lives on
// /farm-tour (Kevin rejected the whole page on the homepage as too much
// scrolling); here it's photo + two prices + the booking form, collapsed
// behind one button so the section stays short until someone wants to book.
export default function HomeTourSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

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
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-black/10 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#6B6B6B]">
                  {t("tour.tier.standard")}
                </p>
                <p className="font-display text-2xl text-[#1E1E1E]">1,250 THB</p>
              </div>
              <div className="rounded-xl border border-[#5A6A4F]/40 bg-[#5A6A4F]/5 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#5A6A4F]">
                  {t("tour.tier.vip")}
                </p>
                <p className="font-display text-2xl text-[#1E1E1E]">2,500 THB</p>
              </div>
            </div>
            <p className="text-[#6B6B6B] text-sm font-light">{t("home.tour.pay")}</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {!open && (
                <button
                  onClick={() => setOpen(true)}
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

        {open && <TourBookingForm source="home" className="max-w-md mx-auto mt-14" />}
      </div>
    </section>
  );
}
