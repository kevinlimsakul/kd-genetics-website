import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import TourBookingForm from "@/components/TourBookingForm";

// Farm Tour, consolidated onto kdgenetics.org (kdtours.tours retired, Stripe
// dropped). Photo-forward and deliberately short. Booking = request-to-book via
// the Airtable form; payment is on arrival (cash / card at the shop), NO public
// QR. Photos are from the Huw shoot. NOTE: never call the grow "living soil" —
// it's organic soil + BioBizz nutrients (hybrid); say organic / grown by hand.

const moments = [
  {
    img: "/tour-shop.jpg",
    title: "It starts at the shop",
    desc: "Meet the team and see the full KD menu before we head up the hill.",
  },
  {
    img: "/tour-farm.jpg",
    title: "Walk the farm",
    desc: "Through the greenhouses and the sea-view garden. Seed to harvest, terpenes, and how it is really grown.",
  },
  {
    img: "/tour-sesh.jpg",
    title: "Sit with the family",
    desc: "End with a relaxed session and stories from Papa KD, the healer who started it all.",
  },
];

const standardIncludes = [
  "90-minute guided tour",
  "Shop intro & founder story",
  "Greenhouses & hillside garden",
  "Seed-to-harvest & terpene walk",
  "Q&A with the team",
];

const vipExtras = [
  "KD Genetics t-shirt",
  "3g sun-grown flower",
  "KD cannabis oil",
  "Cold-pressed juice",
  "Smoke starter kit",
  "10% off flowers in the shop",
];

export default function FarmTourSection() {
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
              Tanote Bay, Koh Tao
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white leading-[1.08]">
              A morning on the only working cannabis farm on Koh Tao.
            </h1>
            <p className="text-white/70 text-lg font-light leading-relaxed max-w-xl">
              Ninety minutes with the family who grows it. Small groups, by
              appointment.
            </p>
            <a
              href="#tour-booking"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#1E1E1E] px-7 py-3.5 text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Request to book
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-[#F6F4EF] py-24 md:py-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center space-y-6">
          <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
            The Farm Tour
          </span>
          <p className="text-xl md:text-2xl text-[#1E1E1E] font-light leading-relaxed">
            KD Genetics is the last cannabis farm still growing on Koh Tao. The
            tour is a guided walk through it with the people who built it, from
            the shop up to the hillside garden above the sea. Organic,
            small-batch, grown by hand.
          </p>
        </div>
      </section>

      {/* Moments */}
      <section className="bg-[#F6F4EF] pb-24 md:pb-32">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {moments.map((m) => (
              <div key={m.title} className="space-y-5">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={m.img}
                    alt={m.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl text-[#1E1E1E]">
                    {m.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm font-light leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family band */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <Image
          src="/tour-family.jpg"
          alt="Three generations of the KD Genetics family at harvest"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <p className="relative z-10 container mx-auto px-6 lg:px-12 pb-12 font-display text-2xl md:text-3xl text-white">
          Three generations, grown by hand.
        </p>
      </section>

      {/* Pricing */}
      <section className="bg-[#1E1E1E] text-white py-24 md:py-32" data-nav-dark>
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <div className="text-center mb-14 space-y-3">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              Two ways to join
            </span>
            <h2 className="font-display text-3xl md:text-4xl">Choose your tour</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Standard */}
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-5">
              <div className="space-y-1">
                <span className="text-white/40 text-[11px] font-medium uppercase tracking-[0.15em]">
                  Standard
                </span>
                <p className="font-display text-3xl">1,500 THB</p>
                <p className="text-white/40 text-[11px] font-light">
                  90-minute guided experience
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/10">
                {standardIncludes.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-sm text-white/60 font-light"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#5A6A4F]/50 mt-0.5 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {/* VIP */}
            <div className="p-8 bg-white/[0.07] border border-[#5A6A4F]/40 rounded-2xl space-y-5 relative">
              <span className="absolute top-5 right-5 text-[#5A6A4F] text-[9px] font-medium uppercase tracking-[0.15em] bg-[#5A6A4F]/15 rounded-full px-3 py-1">
                Best value
              </span>
              <div className="space-y-1">
                <span className="text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.15em]">
                  VIP
                </span>
                <p className="font-display text-3xl">3,000 THB</p>
                <p className="text-white/40 text-[11px] font-light">
                  Everything in Standard, plus 4,190 THB of take-homes
                </p>
              </div>
              <ul className="space-y-2.5 pt-4 border-t border-white/10">
                {vipExtras.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-sm text-white/60 font-light"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#5A6A4F]/50 mt-0.5 shrink-0" />
                    {t}
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
            No prepayment needed. Pay{" "}
            <span className="text-white">cash or by credit card at the shop</span>{" "}
            when you arrive. We confirm your date on WhatsApp within a few hours.
          </p>
        </div>
      </section>
    </div>
  );
}
