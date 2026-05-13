import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import TourBookingForm from "@/components/TourBookingForm";
import StrainGrid from "@/components/StrainGrid";
import HeroVideo from "@/components/HeroVideo";
import SlideshowGallery from "@/components/SlideshowGallery";
import TeamSection from "@/components/TeamSection";
import {
  Leaf,
  Sun,
  Users,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Award,
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

const kdOutdoorStrains = [
  { name: "KD Landrace #3", img: "/strain-kd-landrace.jpg" },
  { name: "KD Cherry",      img: "/strain-kd-cherry.jpg" },
  { name: "KD Black Tiger", img: "/strain-kd-black-tiger.jpg" },
  { name: "KD Blacktip",    img: "/strain-kd-blacktip.jpg" },
  { name: "Cheese Cookies", img: "/strain-cheese-cookies.jpg" },
  { name: "Hella Jelly #2", img: "/strain-hella-jelly.jpg" },
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
          <HeroVideo
            src="/hero-loop.mp4"
            poster="/hero-loop-poster.jpg"
            className="w-full h-full object-cover"
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
            <div className="flex justify-center">
              <a
                href="#tour"
                className="bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-10 h-14 text-sm font-medium transition-all shadow-sm flex items-center justify-center"
              >
                Book the Farm Tour
              </a>
            </div>

            <div className="flex justify-center">
              <div className="inline-flex flex-wrap justify-center items-center gap-x-7 gap-y-2 px-6 py-3 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium tracking-wider uppercase shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)]">
                <span className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-[#A8B89A]" /> Jack Herer Cup, First Thai Winner</span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/25" aria-hidden />
                <span className="flex items-center gap-2"><Leaf  className="w-3.5 h-3.5 text-[#A8B89A]" /> Grown with BioBizz</span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/25" aria-hidden />
                <span className="flex items-center gap-2"><Sun   className="w-3.5 h-3.5 text-[#A8B89A]" /> Sun-Grown on Koh Tao</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  2. PAPA KD — the face, opened by his quote
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
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/legalization-2022.jpg"
                    alt="Papa KD handing a cannabis plant to a Thai government official during the legalization push"
                    width={1200}
                    height={1200}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center 55%" }}
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
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
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
       *  5. FAMILY · FRIENDS · CREW — founders + crew under one header
       * ══════════════════════════════════════════════════════════════════ */}
      <TeamSection />

      {/* ══════════════════════════════════════════════════════════════════
       *  6. PHILOSOPHY — Living Soil + small-batch + sun-grown
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="philosophy" className="pt-16 pb-32 bg-[#F6F4EF]">
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
                desc: "Wormcastings we make, microbes, compost built slow over months. Not synthetic nutrients dropped in bags.",
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
      <section id="gallery" className="py-20 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-2">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              The Farm
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">
              Our land. Our work.
            </h2>
          </div>

          <SlideshowGallery
            slides={[
              { src: "/drone-hero.jpg",          alt: "Aerial view of KD Genetics farm and Tanote Bay",  caption: "Our land" },
              { src: "/historic-grow-site.jpg",  alt: "Papa KD on the historic hillside grow site",       caption: "Where it started" },
              { src: "/papa-portrait-2026.jpg",  alt: "Portrait of Papa KD on the farm",                  caption: "Papa KD" },
              { src: "/founder-kevin-2026.jpg",  alt: "Kevin, founder of KD Genetics, on the farm",       caption: "The founder" },
              { src: "/founder-daniel-2026.jpg", alt: "Daniel, Head of Cultivation, in the greenhouse",   caption: "Head of cultivation" },
              { src: "/founders-hammock.jpg",    alt: "The founders resting on the farm",                 caption: "Off the clock" },
              { src: "/farm-nursery.jpg",        alt: "Young cannabis plants in the nursery",             caption: "Young plants" },
              { src: "/farm-veg.jpg",            alt: "Cannabis plants in flower in the greenhouse",      caption: "Growing" },
              { src: "/living-soil-2026.jpg",    alt: "Living soil at the KD Genetics farm",              caption: "Living soil" },
              { src: "/sun-grown.jpg",           alt: "Sun-grown cannabis canopy on the farm",            caption: "Sun-grown" },
              { src: "/flower-macro-1.jpg",      alt: "Macro shot of a KD sun-grown bud",                 caption: "The flower" },
              { src: "/flower-macro-2.jpg",      alt: "Macro shot of a second KD sun-grown bud",          caption: "Up close" },
              { src: "/team-watering.jpg",       alt: "The team watering the cannabis plants",            caption: "Daily work" },
              { src: "/team-group-2026.jpg",     alt: "The full KD Genetics team",                        caption: "The team" },
              { src: "/biobizz-group.jpg",       alt: "BioBizz team visiting the farm",                   caption: "Friends of the farm" },
              { src: "/farm-cat.jpg",            alt: "The farm cat resting on a wall",                   caption: "The farm cat" },
              { src: "/apparel-dog.jpg",         alt: "The farm dog in the shop with Kevin",              caption: "The farm dog" },
              { src: "/drone-bay.jpg",           alt: "Drone view over Tanote Bay",                       caption: "Tanote Bay" },
              { src: "/shop-counter.jpg",        alt: "The KD Genetics shop counter",                     caption: "The counter" },
              { src: "/shop-mural.jpg",          alt: "The KD Genetics shop interior with mural",         caption: "The shop" },
            ]}
          />
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
          {/* Scrolling tour — three stops through the property */}
          <div className="mb-20">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#5A6A4F]/80 mb-12 text-center">
              What you&rsquo;ll experience
            </p>

            <div className="space-y-20 md:space-y-24 max-w-5xl mx-auto">

              {/* Stop 01 · The Shop */}
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-7">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src="/shop-exterior.jpg"
                      alt="KD Shop exterior, Tanote Bay"
                      width={1400}
                      height={1050}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 space-y-3">
                  <span className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em]">
                    Stop 01
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl text-white leading-tight">
                    Welcome at the Shop
                  </h4>
                  <p className="text-white/55 text-sm md:text-base font-light leading-relaxed">
                    We start with welcome tea and a quick introduction inside the KD Shop in Tanote Bay — just enough context — before the walk begins, leading out through the garden.
                  </p>
                </div>
              </div>

              {/* Stop 02 · Historic Grow Sites — image right */}
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-7 md:order-2">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src="/historic-grow-site.jpg"
                      alt="Papa KD on a historic hillside grow site, Tanote Bay"
                      width={1800}
                      height={1200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 md:order-1 space-y-3">
                  <span className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em]">
                    Stop 02
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl text-white leading-tight">
                    Historic Grow Sites
                  </h4>
                  <p className="text-white/55 text-sm md:text-base font-light leading-relaxed">
                    Father&rsquo;s old grow plots from the illegal years. Hidden hillside, ocean below, tucked under the forest canopy. Where the family&rsquo;s cannabis story started — and where some of the landrace genetics still grow today.
                  </p>
                </div>
              </div>

              {/* Stop 03 · The New Farm */}
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-7">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src="/farm-veg.jpg"
                      alt="The new KD Genetics farm — Daniel, Papa KD, and Kevin among the plants"
                      width={1400}
                      height={1050}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 space-y-3">
                  <span className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em]">
                    Stop 03
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl text-white leading-tight">
                    From Seed to Spliff
                  </h4>
                  <p className="text-white/55 text-sm md:text-base font-light leading-relaxed">
                    The legal farm today — living soil, sungrown plants, hands-on work. We walk it end-to-end together: from the soil and the seedlings, through the greenhouse and the flowering terrace, all the way to harvest, dry, and cure.
                  </p>
                  <p className="text-white/40 text-[11px] font-medium uppercase tracking-[0.2em] pt-1">
                    Soil · Nursery · Greenhouse · Terrace · Harvest
                  </p>
                </div>
              </div>

              {/* Stop 04 · Sit Together — image right */}
              <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-7 md:order-2">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src="/shop-mural.jpg"
                      alt="The KD Shop interior — chill area where the tour ends with Q&A and tasting"
                      width={1800}
                      height={1350}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-5 md:order-1 space-y-3">
                  <span className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em]">
                    Stop 04 · Open-ended
                  </span>
                  <h4 className="font-display text-2xl md:text-3xl text-white leading-tight">
                    Sit Together
                  </h4>
                  <p className="text-white/55 text-sm md:text-base font-light leading-relaxed">
                    The walk ends back at the shop. Open Q&amp;A, tasting if you want it, no clock. Some guests stay twenty minutes, some until sunset. Not mandatory — just the part we love most.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 items-stretch">
            <div className="p-10 bg-white/5 border border-white/10 rounded-2xl flex flex-col">
              <div className="space-y-1">
                <span className="text-white/30 text-[11px] font-medium uppercase tracking-[0.15em]">Standard</span>
                <h3 className="font-display text-2xl text-white">The Guided Tour</h3>
              </div>
              <p className="font-display text-3xl text-white mt-5">1,500 THB</p>
              <p className="text-white/30 text-[11px] font-light mt-1">90-minute guided experience</p>

              <ul className="space-y-2.5 mt-7 mb-8">
                <li className="flex items-start gap-2.5 text-white/80 text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>The full guided farm tour</span>
                </li>
                <li className="flex items-start gap-2.5 text-white/80 text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>Welcome cannabis tea &amp; cookies</span>
                </li>
                <li className="flex items-start gap-2.5 text-white/80 text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>Hand-rolled KD joint to take home</span>
                </li>
              </ul>

              <a
                href="#tour-booking"
                className="block w-full border border-white/20 text-white hover:bg-white/10 rounded-full h-12 text-sm font-medium mt-auto transition-all flex items-center justify-center"
              >
                Book Standard
              </a>
            </div>

            <div className="p-10 bg-white rounded-2xl border border-[#5A6A4F]/20 relative shadow-lg flex flex-col">
              <div className="absolute top-4 right-4 bg-[#5A6A4F]/10 text-[#5A6A4F] text-[9px] font-medium uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                Recommended
              </div>
              <div className="space-y-1">
                <span className="text-[#5A6A4F]/60 text-[11px] font-medium uppercase tracking-[0.15em]">VIP Package</span>
                <h3 className="font-display text-2xl text-[#1E1E1E]">VIP Experience</h3>
              </div>
              <p className="font-display text-3xl text-[#1E1E1E] mt-5">3,000 THB</p>
              <p className="text-[#6B6B6B] text-[11px] font-light mt-1">
                The full experience — take-home flower, our gear, and everything 10% off on top in the KD Shop.
              </p>

              <p className="text-[#5A6A4F] text-[10px] font-semibold uppercase tracking-[0.2em] mt-7 mb-4">
                Everything in Standard, plus
              </p>
              <ul className="space-y-2.5 mb-8">
                <li className="flex items-start gap-2.5 text-[#1E1E1E] text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>3g of sungrown KD flower</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#1E1E1E] text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>KD Genetics T-Shirt</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#1E1E1E] text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>Smoking starter kit — lighter, grinder, tips, papers, stickers</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#1E1E1E] text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>Cold-pressed juice from the shop</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#1E1E1E] text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>KD oil or tea sample</span>
                </li>
                <li className="flex items-start gap-2.5 text-[#1E1E1E] text-[13px] font-light leading-snug">
                  <CheckCircle2 className="h-4 w-4 text-[#5A6A4F] shrink-0 mt-0.5" />
                  <span>10% off everything in the KD Shop</span>
                </li>
              </ul>

              <a
                href="#tour-booking"
                className="block w-full bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full h-12 text-sm font-medium mt-auto transition-all flex items-center justify-center"
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
       *  9. THE LINEUP — KD Outdoor + Termsuk Indoor + Beyond Flower
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="products" className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              The Lineup
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              KD landraces and crosses.
            </h2>
            <p className="text-[#6B6B6B] text-base font-light">
              Sun-grown outdoor strains we&rsquo;ve bred and grown on the farm.
            </p>
          </div>

          <StrainGrid
            strains={kdOutdoorStrains}
            gridClassName="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 max-w-5xl mx-auto mb-16"
          />

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

          {/* One row, four colorways — white, black, gray, sand */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {[
              { label: "Family.",   img: "/apparel-three-of-us.jpg" },
              { label: "Founder.",  img: "/apparel-kevin-black.jpg" },
              { label: "Papa.",     img: "/apparel-papa-plant.jpg" },
              { label: "Tending.",  img: "/apparel-papa-graphic.jpg" },
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

            <div className="flex flex-col space-y-6 md:pl-8">
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

              <div className="flex flex-wrap gap-3">
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

              {/* Interactive map — fills the remaining right-column height */}
              <div className="flex-1 min-h-[260px] rounded-2xl overflow-hidden shadow-sm bg-[#EAE6DE]/30 mt-2">
                <iframe
                  src="https://www.google.com/maps?q=KD+Genetics+Tanote+Bay+Koh+Tao&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KD Genetics — Tanote Bay, Koh Tao"
                />
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
            {/* Left column — hero + small strip stacked */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src="/slowdown-hero.jpg"
                  alt="Slowdown Homestay — house tucked in the Tanote Bay jungle"
                  width={2000}
                  height={1500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { src: "/slowdown-terrace.jpg", alt: "The shared wooden terrace and hammock area" },
                  { src: "/slowdown-unit1.jpg",   alt: "Unit 1 — upstairs bedroom" },
                  { src: "/slowdown-unit2.jpg",   alt: "Unit 2 — downstairs bedroom" },
                ].map((p) => (
                  <div key={p.src} className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={900}
                      height={675}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — copy + glass CTA */}
            <div className="space-y-4">
              <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
                Stay & Experience
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E] leading-tight">
                Coming for the farm? Stay next door.
              </h2>
              <p className="text-[#6B6B6B] text-base font-light leading-relaxed">
                Our family also runs <strong className="font-medium">Slowdown Homestay</strong> —
                an eco-boutique stay, 30 meters from the farm. Same land. Different experience.
              </p>
              <a
                href="https://slowdownkohtao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 inline-flex items-center gap-2.5 rounded-full border border-[#5A6A4F]/25 bg-white/55 backdrop-blur-md px-7 h-12 text-sm font-medium text-[#3D4A35] shadow-[0_8px_24px_-12px_rgba(90,106,79,0.35)] hover:bg-white/75 hover:border-[#5A6A4F]/40 hover:shadow-[0_10px_28px_-10px_rgba(90,106,79,0.45)] transition-all"
              >
                Explore Slowdown
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  13. MEDIA — press + video
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="media" className="py-28 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-14 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              In the Media
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">
              The story so far.
            </h2>
          </div>

          {/* Watch — videos */}
          <p className="text-center text-[#5A6A4F]/70 text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Watch
          </p>
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[
              "_XQQ6GFbOyk",
              "ERj25Bqet94",
              "3B-IXIYD6EA",
            ].map((id) => (
              <div
                key={id}
                className="aspect-video rounded-2xl overflow-hidden bg-black/5 border border-black/5"
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
                  title="KD Genetics video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ))}
          </div>

          {/* Read — press */}
          <p className="text-center text-[#5A6A4F]/70 text-xs font-semibold uppercase tracking-[0.25em] mb-6">
            Read
          </p>
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
       *  14. REVIEWS — existing component
       * ══════════════════════════════════════════════════════════════════ */}
      <ReviewsSection />

      {/* ══════════════════════════════════════════════════════════════════
       *  FOOTER
       * ══════════════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}
