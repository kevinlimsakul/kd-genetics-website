import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import TourBookingForm from "@/components/TourBookingForm";
import ContactForm from "@/components/ContactForm";
import AnimatedCounter from "@/components/AnimatedCounter";
import PhotoGallery from "@/components/PhotoGallery";
import {
  Leaf,
  Sun,
  Star,
  Users,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Award,
  Flame,
  Sprout,
} from "lucide-react";

export const metadata: Metadata = {
  title: "KD Genetics: Sun-Grown. Family-Grown. Island-Grown.",
  description:
    "A family-run craft cannabis farm on Koh Tao. Organic living soil, sun-grown, small batch. Home of Papa KD — first Thai winner of the Jack Herer Cup (2019). Farm tours and dispensary in Tanote Bay.",
};

/* ────────────────────────────────────────────────────────────────────────
 *  Data — single source of truth for section content
 * ──────────────────────────────────────────────────────────────────────── */

const numbers = [
  { value: 7,   suffix: "",  label: "Rai of family-owned land" },
  { value: 3,   suffix: "",  label: "Generations on this land" },
  { value: 2019, suffix: "", label: "Jack Herer Cup — first Thai winner" },
  { value: 1,   suffix: "",  label: "Licensed cannabis farm on Koh Tao" },
  { value: 100, suffix: "%", label: "Organic living soil" },
  { value: 7,   suffix: "",  label: "People on the team" },
];

const nextGeneration = [
  {
    name: "Kevin",
    role: "Vision & Operations",
    bio: "Papa's son. Carries the legacy forward — structure, direction, the next chapter.",
    img: "/founder-kevin-may2026.jpg",
  },
  {
    name: "Daniel",
    role: "Cultivation & Horticulture",
    bio: "Kevin's closest friend since day one. Horticultural scientist. Hands on every plant.",
    img: "/founder-daniel-2026.jpg",
  },
];

const tourSteps = [
  { step: "01", icon: <MapPin className="h-4 w-4" />, title: "Intro at the shop", desc: "Welcome, context, and a first look at KD Genetics." },
  { step: "02", icon: <Clock  className="h-4 w-4" />, title: "Farm history walk", desc: "The story of the founders, the terrace, and the island." },
  { step: "03", icon: <Leaf   className="h-4 w-4" />, title: "Seed-to-harvest demonstration", desc: "Follow the full lifecycle from seed selection to harvest." },
  { step: "04", icon: <Sun    className="h-4 w-4" />, title: "Living soil, compost & ecosystem", desc: "Worm bins, microbes, companion planting, natural cycles." },
  { step: "05", icon: <Star   className="h-4 w-4" />, title: "Terpenes & quality education", desc: "Understanding what makes craft cannabis different." },
];

const kdOutdoorStrains = [
  { name: "KD Landrace #3", img: "/strain-kd-landrace.jpg" },
  { name: "KD Cherry",      img: "/strain-kd-cherry.jpg" },
  { name: "KD Black Tiger", img: "/strain-kd-black-tiger.jpg" },
  { name: "KD Blacktip",    img: "/strain-kd-blacktip.jpg" },
  { name: "Cheese Cookies", img: "/strain-cheese-cookies.jpg" },
  { name: "Hella Jelly #2", img: "/strain-hella-jelly.jpg" },
];

const termsookIndoorStrains = [
  { name: "Lemon Orange",   img: "/strain-lemon-orange.jpg" },
  { name: "Alien Mints",    img: "/strain-alien-mints.jpg" },
  { name: "God Z",          img: "/strain-god-z.jpg" },
  { name: "Banana Conda",   img: "/strain-banana-conda.jpg" },
  { name: "Kiwi",           img: "/strain-kiwi.jpg" },
  { name: "Unicorn Poop",   img: "/strain-unicorn-poop.jpg" },
];

const beyondFlower = [
  { title: "Oils",    line: "Mr. KD's craft cannabis oils.",     img: "/oil-hero.jpg",       href: "/menu#oils" },
  { title: "Hash",    line: "Hand-washed, pressed on the farm.", img: "/hash-hero.jpg",      href: "/menu#hash" },
  { title: "Rosin",   line: "Solventless, small batch.",         img: "/hash-hero.jpg",      href: "/menu#rosin" },
  { title: "Apparel", line: "What we wear on the farm.",         img: "/apparel-papa-black.jpg",  href: "#apparel" },
];

const team = [
  { img: "/team-1.jpg",   name: "Wai" },     // woman, hanging buds
  { img: "/team-2.jpg",   name: "Khant" },   // shop, jar + tweezers
  { img: "/team-wee.jpg", name: "Wee" },     // greenhouse watering
  { img: "/team-che.jpg", name: "Che" },     // soil prep with shovel
];

const mediaArticles = [
  {
    title: "The Keeper of Thai Weed",
    source: "High Times",
    excerpt:
      "A deep portrait of Aram Limsakul, the man who spent decades preserving Thailand's native cannabis genetics through prohibition.",
    link: "https://hightimes.com/grow/the-keeper-of-thai-weed/",
  },
  {
    title: "Thailand's 'Father of Cannabis' Wants Small-Time Growers to Be Part of the Industry",
    source: "South China Morning Post",
    excerpt:
      "Aram Limsakul has developed cannabis varieties and is sought for advice on using cannabis.",
    link: "https://www.scmp.com/week-asia/economics/article/3129135/thailands-father-cannabis-wants-small-time-growers-be-part",
  },
  {
    title: "Relax Law on Cannabis Seeds for Better Product, Thai Advocate Says",
    source: "The Nation Thailand",
    excerpt:
      "Marijuana advocate Aram Limsakul calls on the government to relax laws for genetic development of local strains.",
    link: "https://www.nationthailand.com/in-focus/40014835",
  },
];

/* ────────────────────────────────────────────────────────────────────────
 *  Page
 * ──────────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav activePage="home" homeHref="/preview" />

      {/* ══════════════════════════════════════════════════════════════════
       *  1. HERO — video-ready, headline B
       * ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 text-center px-6">
        <div className="absolute inset-0 z-0">
          <video
            src="/hero-loop.mp4"
            poster="/hero-loop-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F6F4EF]" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-12 mt-10">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-xs font-medium uppercase tracking-[0.2em]">
              Koh Tao, Thailand
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white drop-shadow-lg">
              Sun-Grown.
              <br />
              Family-Grown.
              <br />
              Island-Grown.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Organic living soil. Small batch. Grown by a family who stayed on the land.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#tour"
                className="bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-10 h-14 text-sm font-medium transition-all shadow-sm flex items-center justify-center"
              >
                Book the Farm Tour
              </a>
              <a
                href="#papa"
                className="border border-white/30 text-white hover:bg-white/10 rounded-full px-10 h-14 text-sm font-medium backdrop-blur-sm transition-all flex items-center justify-center"
              >
                Meet Papa KD
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/80 text-[11px] font-medium tracking-wider uppercase">
              <span className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-[#5A6A4F]" /> Jack Herer Cup, First Thai Winner</span>
              <span className="flex items-center gap-2"><Leaf  className="w-3.5 h-3.5 text-[#5A6A4F]" /> Certified Organic — BioBizz</span>
              <span className="flex items-center gap-2"><Sun   className="w-3.5 h-3.5 text-[#5A6A4F]" /> Sun-Grown on Koh Tao</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  2. NUMBERS — animated counters
       * ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              By the Numbers
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">
              Small by design.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-14 gap-x-8">
            {numbers.map((n) => (
              <div key={n.label} className="text-center space-y-2">
                <p className="font-display text-5xl md:text-6xl text-[#1E1E1E] leading-none">
                  <AnimatedCounter value={n.value} suffix={n.suffix} />
                </p>
                <p className="text-[#6B6B6B] text-xs font-light leading-snug max-w-[180px] mx-auto">
                  {n.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  4. PAPA KD — the face, opened by his quote
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="papa" className="py-32 bg-[#EAE6DE]/40">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Quote opener */}
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <p className="font-display text-3xl md:text-5xl text-[#1E1E1E] leading-[1.2]">
              &ldquo;Use cannabis wisely is well-being.
              <br />
              Greed and ignorance is your own karma, not ganja.&rdquo;
            </p>
            <p className="text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.25em]">
              — Papa KD
            </p>
          </div>

          {/* Portrait + story */}
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src="/papa-portrait-2026.jpg"
                  alt="Papa KD — Aram Limsakul"
                  width={1600}
                  height={2000}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
                The Face of KD
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
                Aram Limsakul — Papa KD
              </h2>
              <div className="space-y-4 text-[#4A4A4A] text-base font-light leading-relaxed">
                <p>
                  Calm, grounded, almost zen when he&rsquo;s with the plants.
                  Decades of quiet work with cannabis — a deep love and a real relationship with it, built over a lifetime.
                </p>
                <p>
                  He found what cannabis could do for him first. Then he wanted to share it —
                  his experience, his seeds, his oils — with people across Thailand,
                  while it was still criminal to do so. He stood against the criminalization of the plant
                  and was at the forefront of the Thai cannabis movement, playing a real role in the country&rsquo;s legalization.
                </p>
                <p>
                  In <strong className="font-medium">2017–18</strong>, he helped start
                  Thailand&rsquo;s first medical cannabis project in Mae Sariang. In{" "}
                  <strong className="font-medium">2019</strong>, he became the first
                  Thai grower to win the Jack Herer Cup.
                </p>
                <p className="italic text-[#6B6B6B]">
                  He&rsquo;s older now and lets us run the farm, but the way we grow is still his.
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5A6A4F]/10 text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.15em] rounded-full">
                  <Award className="h-3 w-3" /> Jack Herer Cup 2019
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5A6A4F]/10 text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.15em] rounded-full">
                  <Leaf className="h-3 w-3" /> Thai Cannabis Pioneer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  4.5 WHY WE CAME BACK — the handoff bridge
       * ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#F6F4EF] relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              Why We Came Back
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
              From a Terrace Dream to KD Genetics Today
            </h2>
          </div>

          <div className="space-y-16 md:space-y-20 text-[#4A4A4A] text-base font-light leading-[1.8]">

            {/* Beat 1: The terrace, 2015 */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/terrace-2015.jpg"
                    alt="Kevin and Daniel on the terrace, Tanote Bay, 2015"
                    width={1400}
                    height={1050}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7 space-y-5">
                <p>
                  2015. First trip to Thailand together, just out of high school. Daniel and I sat on the small terrace outside Papa&rsquo;s house, smoking his sungrown weed.
                </p>
                <p>
                  In Germany we knew cannabis only from a dealer&rsquo;s pack; in Thailand it was very strict and highly illegal as well.
                </p>
                <p>
                  We wished for better days for this wonderful plant and said: &ldquo;one day ganja will be legal here and we will come to grow weed with Papa KD.&rdquo;
                </p>
                <p className="text-[#1E1E1E]">
                  That moment planted the seed.
                </p>
              </div>
            </div>

            {/* Beat 2: Years apart, Papa's legalization work */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5 md:order-2">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/legalization-2022.jpg"
                    alt="Papa KD handing a cannabis plant to a Thai government official during the legalization push"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7 md:order-1 space-y-5">
                <p>
                  Ten years passed and everyone went their own way. While Daniel studied horticultural science in Berlin, I went into sports science, played football professionally and then coached it later in Bangkok.
                </p>
                <p>
                  KD continued to work with his plants, sharing seeds and his medicinal oils all over Thailand and quietly becoming an underground legend in the cannabis scene. His efforts played a vital role in the legalization process and led to cannabis becoming &lsquo;free&rsquo; for the people in 2022.
                </p>
              </div>
            </div>

            {/* Beat 3: Coming home, the farm today */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/three-of-us-2025.jpg"
                    alt="Daniel, Papa KD, and Kevin on the farm"
                    width={1800}
                    height={1200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7 space-y-5">
                <p>
                  November 2024. Papa&rsquo;s motorbike accident. Daniel happened to be visiting me when the call came. The shock collapsed the distance between one day and now. I left Bangkok in December. Daniel quit his master&rsquo;s and followed one month later. We came home.
                </p>
                <p className="text-[#1E1E1E]">
                  What we said on that terrace in 2015 is the farm running today. Same land. Same family. Next hands.
                </p>
                <Link
                  href="#next-generation"
                  className="inline-flex items-center gap-2 text-[#5A6A4F] text-sm font-medium pt-4 group"
                >
                  Meet the hands building it
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  5. THE NEW GENERATION — Kevin + Daniel, parity weight
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="next-generation" className="py-32 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              The Next Generation
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
              Papa KD leads. We follow.
              <br />
              Together we grow.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {nextGeneration.map((p) => (
              <div key={p.name} className="space-y-5 group text-center">
                <div className="aspect-square rounded-2xl overflow-hidden border border-black/5 bg-[#EAE6DE]/30 max-w-[340px] mx-auto">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={340}
                    height={340}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-[#1E1E1E]">{p.name}</h3>
                  <p className="text-[#5A6A4F]/70 text-xs font-medium uppercase tracking-[0.15em]">
                    {p.role}
                  </p>
                  <p className="text-[#6B6B6B] text-sm font-light leading-relaxed max-w-sm mx-auto">
                    {p.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  5.5 THE TEAM — environmental portraits, group at the top
       * ══════════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              The Team
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
              The hands on every plant.
            </h2>
            <p className="text-[#6B6B6B] text-base font-light">
              A small crew. Real people behind every bud.
            </p>
          </div>

          {/* Group hero */}
          <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-[#EAE6DE]/40 mb-3 max-w-5xl mx-auto">
            <Image
              src="/team-group-2026.jpg"
              alt="The full KD Genetics crew — Khant, Mr KD, Daniel, Kevin, Wai, Wee, Che"
              width={2400}
              height={1600}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-center text-[#6B6B6B]/80 text-[11px] font-light italic max-w-3xl mx-auto mb-14">
            The full crew, left to right — Khant, Mr KD, Daniel, Kevin, Wai, Wee, Che.
          </p>

          {/* Four staff portraits — Mr KD and the founders are featured elsewhere */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {team.map((p) => (
              <div key={p.img} className="space-y-2">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src={p.img}
                    alt={p.name}
                    width={1200}
                    height={1600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center text-[#1E1E1E] text-sm font-medium">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  6. PHILOSOPHY — Living Soil + small-batch + sun-grown
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="philosophy" className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20 max-w-2xl mx-auto space-y-4">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              How We Grow
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              The long way. On purpose.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Leaf className="h-5 w-5" />,
                title: "Organic living soil",
                desc: "Worms, microbes, compost built over years. Not synthetic nutrients dropped in bags.",
                img: "/living-soil-2026.jpg",
              },
              {
                icon: <Sun className="h-5 w-5" />,
                title: "Sun-grown outdoor",
                desc: "The Koh Tao sun does the work. Terroir-driven terpene expression you can't replicate indoors.",
                img: "/sun-grown.jpg",
              },
              {
                icon: <Sprout className="h-5 w-5" />,
                title: "Small batch",
                desc: "A family farm, not a facility. Every bud hand-checked, hand-trimmed, hand-cured.",
                img: "/small-batch.jpg",
              },
            ].map((p) => (
              <div key={p.title} className="space-y-5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={1600}
                    height={1200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="text-[#5A6A4F] mt-0.5 shrink-0">{p.icon}</div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl text-[#1E1E1E]">{p.title}</h3>
                    <p className="text-[#6B6B6B] text-sm font-light leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BioBizz partnership sub-block — editorial 2-up + photo strip */}
        <div data-nav-dark className="bg-[#2A2820] py-28 mt-8">
          <div className="container mx-auto px-6 max-w-5xl">
            <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[#A8B89A] mb-14">
              Our Growing Partner
            </p>

            {/* Top: stamp + text, balanced */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-20">
              <div className="flex justify-center md:justify-end">
                <a
                  href="https://www.biobizz.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full max-w-[26rem] cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
                >
                  <div className="rounded-[2rem] bg-[#F6F4EF] px-4 py-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                    <Image
                      src="/grown-with-biobizz.png"
                      alt="Grown with BioBizz"
                      width={2400}
                      height={1245}
                      quality={100}
                      unoptimized
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </a>
              </div>

              <div className="space-y-5 max-w-md">
                <h3 className="font-display text-3xl md:text-4xl text-white leading-snug">
                  Rooted in the same values.
                </h3>
                <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                  BioBizz started as a small, family-driven Dutch company with one conviction:
                  organic soil is the foundation of everything. As our official organic partner,
                  they sponsor KD Genetics with their full range of soils and nutrients —
                  no synthetics, no shortcuts.
                </p>
              </div>
            </div>

            {/* Photos — full-width 2-up strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/biobizz-group.jpg"
                  alt="BioBizz visit — Mr KD, the BioBizz team, Daniel, and Kevin on the farm"
                  width={1600}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/biobizz-frisbee.jpg"
                  alt="Powered by BioBizz — Mr KD with Luis"
                  width={1600}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  7. THE FARM — walk the land
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="the-farm" className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 max-w-2xl mx-auto space-y-4">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              The Farm
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Two minutes from Tanote Bay.
            </h2>
            <p className="text-[#6B6B6B] text-base font-light">
              Seven rai. One family&rsquo;s farm. Open to visitors.
            </p>
          </div>

          {/* Drone hero — full property */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAE6DE]/40 mb-6">
            <Image
              src="/drone-hero.jpg"
              alt="Aerial view of KD Genetics farm and Tanote Bay"
              width={2400}
              height={1350}
              className="w-full h-full object-cover"
            />
          </div>

          <PhotoGallery
            photos={[
              { label: "Nursery — young plants",            img: "/farm-nursery.jpg" },
              { label: "Harvest time",                      img: "/farm-veg.jpg" },
              { label: "Veg stage in the greenhouse",       img: "/farm-flowering.jpg" },
              { label: "The shop",                          img: "/farm-chill.jpg" },
              { label: "The farm from above",               img: "/drone-bay.jpg" },
              { label: "KD Shop exterior",                  img: "/shop-exterior.jpg" },
            ]}
          />

          {/* Interactive farm map — Phase 2, once Kevin drops drone footage of the property */}
          <div className="text-center mb-6 space-y-2">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              Walk the Farm Virtually
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-[#1E1E1E]">
              Interactive Farm Map
            </h3>
            <p className="text-[#6B6B6B]/80 text-sm font-light max-w-md mx-auto">
              Click hotspots — Shop, Chill Area, Nursery, Flowering Terrace, Chill Area —
              to see what each space looks like.
            </p>
          </div>
          <div className="aspect-[16/10] rounded-2xl border border-dashed border-[#5A6A4F]/25 bg-[#EAE6DE]/50 flex flex-col items-center justify-center p-8 text-center">
            <MapPin className="w-8 h-8 text-[#5A6A4F]/40 mb-3" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#5A6A4F]/60 mb-2">
              Coming Soon
            </span>
            <p className="text-sm font-light text-[#6B6B6B] max-w-md">
              Built from drone footage of the property — Kevin + Claude design pass.
              Clickable hotspots for Shop, Chill Area, Nursery, Veg, Flowering Terrace, Slowdown.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  8. FARM TOUR — primary CTA
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="tour" data-nav-dark className="py-32 bg-[#1E1E1E] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-5">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              Educational Experience
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Walk the Farm
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              The best way to understand KD is to walk the land.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2">
              <Users className="h-3.5 w-3.5 text-[#5A6A4F]" />
              <span className="text-[11px] text-white/70 font-medium uppercase tracking-[0.1em]">
                Max 10 guests per tour
              </span>
            </div>
          </div>

          {/* Farm tour loop video — glimpse of what visitors experience on the tour */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/property-aerial.jpg"
                alt="The KD Genetics property from above"
                width={2000}
                height={1497}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center text-white/40 text-[11px] font-light mt-4 italic">
              The land you&rsquo;ll walk — from above.
            </p>
          </div>

          <div className="mb-20 max-w-3xl mx-auto">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#5A6A4F]/70 mb-8 text-center">
              What you&rsquo;ll experience
            </p>
            <div className="space-y-0">
              {tourSteps.map((item, i) => (
                <div key={i} className="flex items-start gap-6 py-6 border-b border-white/5 last:border-0">
                  <div className="text-[#5A6A4F]/30 text-[11px] font-medium mt-1 w-6 shrink-0">{item.step}</div>
                  <div className="text-[#5A6A4F]/50 mt-0.5 shrink-0">{item.icon}</div>
                  <div className="space-y-1">
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-white/40 text-sm font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            <div className="p-10 bg-white/5 border border-white/10 rounded-2xl space-y-5">
              <div className="space-y-1">
                <span className="text-white/30 text-[11px] font-medium uppercase tracking-[0.15em]">Standard</span>
                <h3 className="font-display text-2xl text-white">The Guided Tour</h3>
              </div>
              <p className="font-display text-3xl text-white">1,500 THB</p>
              <p className="text-white/30 text-[11px] font-light">90-minute guided experience</p>
              <a
                href="#tour-booking"
                className="block w-full border border-white/20 text-white hover:bg-white/10 rounded-full h-12 text-sm font-medium mt-2 transition-all flex items-center justify-center"
              >
                Book Standard
              </a>
            </div>

            <div className="p-10 bg-white rounded-2xl border border-[#5A6A4F]/20 relative space-y-5 shadow-lg">
              <div className="absolute top-4 right-4 bg-[#5A6A4F]/10 text-[#5A6A4F] text-[9px] font-medium uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                Recommended
              </div>
              <div className="space-y-1">
                <span className="text-[#5A6A4F]/60 text-[11px] font-medium uppercase tracking-[0.15em]">VIP Package</span>
                <h3 className="font-display text-2xl text-[#1E1E1E]">VIP Experience</h3>
              </div>
              <p className="font-display text-3xl text-[#1E1E1E]">3,000 THB</p>
              <p className="text-[#6B6B6B] text-[11px] font-light">
                Private, extended time with Papa + tasting
              </p>
              <a
                href="#tour-booking"
                className="block w-full bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full h-12 text-sm font-medium mt-2 transition-all flex items-center justify-center"
              >
                Book VIP
              </a>
            </div>
          </div>

          {/* Existing tour booking form */}
          <div id="tour-booking" className="max-w-3xl mx-auto">
            <TourBookingForm />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  9. THE LINEUP — KD Outdoor + Termsook Indoor + Beyond Flower
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="products" className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              The Lineup
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Sun-grown outdoor. Premium indoor.
            </h2>
            <p className="text-[#6B6B6B] text-base font-light">
              KD landraces and crosses we&rsquo;ve bred — paired with curated indoor cultivars from Termsook Collective.
            </p>
          </div>

          {/* KD Outdoor strains */}
          <div className="mb-6 max-w-2xl mx-auto text-center space-y-1">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.25em]">
              KD Genetics — Sun-Grown Outdoor
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-10 mb-24">
            {kdOutdoorStrains.map((s) => (
              <Link key={s.name} href="/menu#flower" className="space-y-3 group">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1E1E1E]">
                  <Image
                    src={s.img}
                    alt={s.name}
                    width={900}
                    height={900}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-center text-[#1E1E1E] text-sm font-medium">{s.name}</p>
              </Link>
            ))}
          </div>

          {/* Termsook Collective indoor strains */}
          <div className="mb-6 max-w-2xl mx-auto text-center space-y-1">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.25em]">
              Termsook Collective — Indoor
            </span>
            <p className="text-[#6B6B6B]/80 text-[11px] font-light italic">
              Indoor-grown by our friends at Termsook Collective.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-10 mb-24">
            {termsookIndoorStrains.map((s) => (
              <Link key={s.name} href="/menu#flower" className="space-y-3 group">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1E1E1E]">
                  <Image
                    src={s.img}
                    alt={s.name}
                    width={900}
                    height={900}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-center text-[#1E1E1E] text-sm font-medium">{s.name}</p>
              </Link>
            ))}
          </div>

          {/* Beyond Flower */}
          <div className="text-center mb-10 max-w-xl mx-auto space-y-2">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              Beyond Flower
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-[#1E1E1E]">
              Oils, hash, rosin, apparel.
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {beyondFlower.map((c) => (
              <Link key={c.title} href={c.href} className="space-y-3 group">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src={c.img}
                    alt={c.title}
                    width={1400}
                    height={1400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <h4 className="font-display text-xl text-[#1E1E1E]">{c.title}</h4>
                  <p className="text-[#6B6B6B]/80 text-[11px] font-light leading-snug px-2">
                    {c.line}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-[#5A6A4F] text-sm font-medium group"
            >
              See the full menu
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  10. APPAREL — lifestyle, Khalifa-inspired
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="apparel" className="py-32 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              Apparel
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Wear what we wear.
            </h2>
          </div>

          {/* Worn on the farm */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { label: "Father.",          img: "/apparel-papa-black.jpg" },
              { label: "Founder.",         img: "/apparel-kevin-black.jpg" },
              { label: "Tending.",         img: "/apparel-papa-graphic.jpg" },
              { label: "Off the clock.",   img: "/apparel-kevin-graphic.jpg" },
            ].map((tile) => (
              <div key={tile.label} className="aspect-[3/4] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src={tile.img}
                  alt={tile.label}
                  width={1200}
                  height={1600}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* T-shirt flat lays — the lineup */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              "/tee-1-front.jpg",
              "/tee-2-front.jpg",
              "/tee-3-front.jpg",
              "/tee-4-front.jpg",
            ].map((img, i) => (
              <div key={img} className="aspect-square rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src={img}
                  alt={`KD Genetics tee ${i + 1}`}
                  width={1200}
                  height={1200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://wa.me/66988268290"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-8 h-12 text-sm font-medium transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              Shop Apparel via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  11. VISIT — the shop
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="visit" className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              Visit the Shop
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Tanote Bay, Koh Tao.
            </h2>
            <p className="text-[#6B6B6B] text-base font-light">
              Open daily. Walk in or ride up.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src="/shop-mural.jpg"
                  alt="The KD Genetics shop — interior with mural"
                  width={1800}
                  height={1350}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/shop-exterior.jpg"
                    alt="The shop from the outside"
                    width={1400}
                    height={1050}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/drone-bay.jpg"
                    alt="The farm from above — the shop sits in the cove below"
                    width={2000}
                    height={1500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 md:pl-8">
              <div>
                <p className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em] mb-2">
                  Location
                </p>
                <p className="text-[#1E1E1E] text-lg font-light leading-relaxed">
                  KD Genetics Farm + Shop
                  <br />
                  Tanote Bay, Koh Tao
                  <br />
                  Surat Thani, Thailand
                </p>
              </div>
              <div>
                <p className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em] mb-2">
                  Hours
                </p>
                <p className="text-[#1E1E1E] text-lg font-light">
                  Daily · 10:00 – 22:00
                </p>
              </div>
              <div>
                <p className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em] mb-2">
                  Contact
                </p>
                <a
                  href="https://wa.me/66988268290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E1E1E] text-lg font-light hover:text-[#5A6A4F] transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  +66 98 826 8290 (WhatsApp)
                </a>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="https://maps.app.goo.gl/?q=KD+Genetics+Tanote+Bay+Koh+Tao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-6 h-11 text-sm font-medium transition-all"
                >
                  <MapPin className="h-4 w-4" /> Get Directions
                </a>
                <a
                  href="https://wa.me/66988268290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#1E1E1E]/15 hover:border-[#5A6A4F] text-[#1E1E1E] rounded-full px-6 h-11 text-sm font-medium transition-all"
                >
                  <MessageSquare className="h-4 w-4" /> Message Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  12. SLOWDOWN HOMESTAY — sibling brand link
       * ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#EAE6DE]/30 border-y border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
              <Image
                src="/property-aerial.jpg"
                alt="Slow Down Homestay — nestled in the Tanote Bay jungle"
                width={2000}
                height={1497}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
                Stay & Experience
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E] leading-tight">
                Coming for the farm? Stay next door.
              </h2>
              <p className="text-[#6B6B6B] text-base font-light leading-relaxed">
                Our family also runs <strong className="font-medium">Slowdown Homestay</strong> —
                eco-boutique Airbnb, 30 meters from the farm. Same land. Different experience.
              </p>
              <a
                href="https://slowdownhomestay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#5A6A4F] text-sm font-medium group pt-2"
              >
                Explore Slowdown
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  13. REVIEWS — existing component
       * ══════════════════════════════════════════════════════════════════ */}
      <ReviewsSection />

      {/* ══════════════════════════════════════════════════════════════════
       *  14. MEDIA — press + video
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="media" className="py-28 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              In the Press
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">
              The story so far.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {mediaArticles.map((a) => (
              <a
                key={a.title}
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white/50 border border-black/5 hover:border-[#5A6A4F]/30 rounded-2xl p-6 transition-colors group"
              >
                <p className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.2em] mb-3">
                  {a.source}
                </p>
                <h3 className="font-display text-lg text-[#1E1E1E] leading-tight mb-3">
                  {a.title}
                </h3>
                <p className="text-[#6B6B6B] text-xs font-light leading-relaxed line-clamp-4">
                  {a.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-[#5A6A4F] text-[11px] font-medium mt-4 group-hover:gap-2 transition-all">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  15. CONTACT
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-28 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-10 space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              Stay in Touch
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">
              New drops. Quiet updates.
            </h2>
            <p className="text-[#6B6B6B] text-sm font-light">
              We&rsquo;ll only write when there&rsquo;s something real to say.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  FOOTER
       * ══════════════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
