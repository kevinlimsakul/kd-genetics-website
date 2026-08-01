"use client";

import Image from "next/image";
import {
  MapPin,
  Clock,
  Leaf,
  Sun,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import TourBookingForm from "@/components/TourBookingForm";

// Farm Tour offer + booking, consolidated onto the KD Genetics homepage after
// kdtours.tours was retired (Stripe dropped, no separate domain needed). Cards
// mirror the approved preview-v1 design; the booking form posts to
// /api/book-tour (Airtable). Payment is on arrival (cash / card at the shop),
// with PromptPay as an optional prepay-to-reserve. NOTE: never call the grow
// "living soil" — it's organic soil + BioBizz nutrients (hybrid).

const tourSteps = [
  {
    step: "01",
    icon: <MapPin className="h-4 w-4" />,
    title: "Intro at the shop",
    desc: "Welcome, context, and a first look at KD Genetics.",
  },
  {
    step: "02",
    icon: <Clock className="h-4 w-4" />,
    title: "Farm history walk",
    desc: "The story of the founders, the terrace, and the island.",
  },
  {
    step: "03",
    icon: <Leaf className="h-4 w-4" />,
    title: "Seed-to-harvest demonstration",
    desc: "Follow the full lifecycle from seed selection to harvest.",
  },
  {
    step: "04",
    icon: <Sun className="h-4 w-4" />,
    title: "Organic soil, compost & ecosystem",
    desc: "Worm bins, microbes, companion planting, and natural cycles.",
  },
  {
    step: "05",
    icon: <Star className="h-4 w-4" />,
    title: "Terpenes & quality education",
    desc: "Understanding what makes craft cannabis different.",
  },
];

const standardIncludes = [
  "Full guided farm tour",
  "Founder story & legacy walk",
  "Organic soil & ecosystem tour",
  "Terpene education session",
  "Q&A with the team",
];

const vipIncludes = [
  { item: "Guided Farm Tour", value: "1,500 THB" },
  { item: "KD Genetics T-Shirt", value: "800 THB" },
  { item: "3g Free Sun Grown", value: "750 THB" },
  { item: "Smoke Starter Kit", value: "300 THB" },
  { item: "Cold-Pressed Juice", value: "140 THB" },
  { item: "KD Cannabis Oil", value: "700 THB" },
  { item: "10% Discount on Flowers", value: "incl." },
];

export default function FarmTourSection() {
  return (
    <section
      id="tour"
      data-nav-dark
      className="py-32 bg-[#1E1E1E] text-white overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="text-center mb-20 max-w-3xl mx-auto space-y-6">
          <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
            Educational Experience
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            The Farm Tour
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed">
            This is not a standard farm walk. It&apos;s a guided immersion into
            organic cultivation, genetics, and Koh Tao&apos;s cannabis heritage.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
            <Users className="h-3.5 w-3.5 text-[#5A6A4F]" />
            <span className="text-[11px] text-white/70 font-medium uppercase tracking-[0.1em]">
              Max 10 guests per tour
            </span>
          </div>
        </div>

        {/* Tour Steps */}
        <div className="mb-24 max-w-3xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#5A6A4F]/70 mb-10 text-center">
            What you&apos;ll experience
          </p>
          <div className="space-y-0">
            {tourSteps.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-6 py-6 border-b border-white/5 last:border-0"
              >
                <div className="text-[#5A6A4F]/30 text-[11px] font-medium mt-1 w-6 shrink-0">
                  {item.step}
                </div>
                <div className="text-[#5A6A4F]/50 mt-0.5 shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-white/40 text-sm font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tour Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Standard */}
          <div className="p-10 bg-white/5 border border-white/10 rounded-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-white/30 text-[11px] font-medium uppercase tracking-[0.15em]">
                Standard
              </span>
              <h3 className="font-display text-2xl text-white">
                The Guided Tour
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-white font-display text-3xl">1,500 THB</p>
              <p className="text-white/30 text-[11px] font-light">
                90-minute guided experience
              </p>
            </div>
            <ul className="space-y-3 pt-4 border-t border-white/5">
              {standardIncludes.map((text, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-white/50 font-light"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F]/40 mt-0.5 shrink-0" />{" "}
                  {text}
                </li>
              ))}
            </ul>
            <a
              href="#tour-booking"
              className="block w-full border border-white/20 text-white hover:bg-white/5 rounded-full h-12 text-sm font-medium mt-4 transition-all flex items-center justify-center"
            >
              Book Standard Tour
            </a>
          </div>

          {/* VIP */}
          <div className="p-10 bg-white rounded-2xl border border-[#5A6A4F]/20 relative space-y-6 shadow-lg">
            <div className="absolute top-4 right-4 bg-[#5A6A4F]/10 text-[#5A6A4F] text-[9px] font-medium uppercase tracking-[0.15em] px-3 py-1 rounded-full">
              Recommended
            </div>
            <div className="space-y-2">
              <span className="text-[#5A6A4F]/60 text-[11px] font-medium uppercase tracking-[0.15em]">
                VIP Package
              </span>
              <h3 className="font-display text-2xl text-[#1E1E1E]">
                The Full Immersion
              </h3>
            </div>
            <div className="space-y-1">
              <p className="text-[#1E1E1E] font-display text-3xl">3,000 THB</p>
              <p className="text-[#6B6B6B] text-[11px] font-light">
                Everything in Standard, plus:
              </p>
            </div>
            <div className="pt-4 border-t border-black/5 space-y-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#5A6A4F]/60">
                What&apos;s Included
              </p>
              <div className="space-y-2">
                {vipIncludes.map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-[13px] py-1.5 border-b border-black/[0.03] last:border-0"
                  >
                    <span className="text-[#1E1E1E]/70 font-light flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#5A6A4F]/40 shrink-0" />{" "}
                      {row.item}
                    </span>
                    <span className="text-[#6B6B6B]/50 text-[11px] font-light">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-black/5 text-center space-y-1">
              <div className="flex items-center justify-center gap-3">
                <span className="text-[#6B6B6B]/40 text-lg line-through font-display">
                  4,190 THB
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[#5A6A4F]/30" />
                <span className="font-display text-2xl text-[#5A6A4F]">
                  3,000 THB
                </span>
              </div>
            </div>
            <a
              href="#tour-booking"
              className="block w-full bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full h-12 text-sm font-medium transition-all flex items-center justify-center"
            >
              Book VIP Package
            </a>
            <p className="text-[10px] text-[#6B6B6B]/40 font-light text-center leading-relaxed">
              10% discount applies to outdoor & indoor flowers only.
            </p>
          </div>
        </div>

        {/* Tour Booking Form (posts to /api/book-tour → Airtable) */}
        <TourBookingForm />

        {/* Payment: on arrival by default, PromptPay optional prepay */}
        <div className="mt-16 max-w-2xl mx-auto text-center space-y-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#5A6A4F]/70">
            How you pay
          </p>
          <p className="text-white/60 text-sm font-light leading-relaxed">
            Most guests pay on arrival, in{" "}
            <span className="text-white">cash or by credit card at the shop</span>
            . Prefer to lock your date in advance? Prepay by PromptPay (Thai QR)
            and send us the slip.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/promptpay-qr.jpg"
              alt="PromptPay QR for KD Koh Tao"
              width={220}
              height={370}
              className="w-40 rounded-xl border border-white/10"
            />
            <p className="text-white/40 text-xs font-light">
              KD KOH TAO · PromptPay 084556801318025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
