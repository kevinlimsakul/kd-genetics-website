import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import TourBookingForm from "@/components/TourBookingForm";
import ContactForm from "@/components/ContactForm";
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
} from "lucide-react";

export const metadata: Metadata = {
  title: "KD Genetics: Born on Koh Tao, Grown in Living Soil",
  description:
    "A family-run craft cannabis farm on Koh Tao, Thailand. Living soil cultivation, preserved genetics, farm tours, and education. Founded by Aram, Kevin, and Daniel.",
};

const founders = [
  {
    name: "Aram",
    aka: "KD Legend",
    role: "The Cultivator",
    desc: "Decades of quiet work preserving genetics, sharing seeds, and building awareness across Thailand, long before the law caught up with the culture.",
    img: "/founder-kd.png",
  },
  {
    name: "Kevin",
    aka: "Next Generation",
    role: "Vision & Direction",
    desc: "Aram's son. Carries forward his father's legacy while shaping the future direction of KD Genetics, with structure, long-term vision, and the energy of a new generation.",
    img: "/founder-kevin-v3.png",
  },
  {
    name: "Daniel",
    aka: "Day One",
    role: "Cultivation & Horticulture",
    desc: "Kevin's closest friend and a passionate cultivator who studied horticultural science. Brings deep plant knowledge, scientific understanding, and hands-on growing expertise to the farm.",
    img: "/founder-daniel.png",
  },
];

const offerings = [
  {
    title: "Craft Flowers",
    desc: "Sun-grown and indoor cultivars from our living soil garden.",
    scrollTarget: "visit",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: "Oils & Extracts",
    desc: "Handmade extracts rooted in traditional craft.",
    scrollTarget: "visit",
    icon: <Sun className="h-5 w-5" />,
  },
  {
    title: "Merchandise",
    desc: "KD Genetics apparel and branded essentials designed on Koh Tao.",
    scrollTarget: "visit",
    icon: <Star className="h-5 w-5" />,
  },
  {
    title: "Farm Tour",
    desc: "A guided walk through soil, story, and craft.",
    scrollTarget: "tour",
    icon: <Clock className="h-5 w-5" />,
  },
];

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
    title: "Living soil, compost & ecosystem",
    desc: "Worm bins, microbes, companion planting, and natural cycles.",
  },
  {
    step: "05",
    icon: <Star className="h-4 w-4" />,
    title: "Terpenes & quality education",
    desc: "Understanding what makes craft cannabis different.",
  },
];

const mediaArticles = [
  {
    title: "The Keeper of Thai Weed",
    source: "High Times",
    excerpt:
      "A deep portrait of Aram Limsakul, the man who spent decades preserving Thailand's native cannabis genetics through prohibition, and emerged as one of the country's most important cultivators.",
    link: "https://hightimes.com/grow/the-keeper-of-thai-weed/",
  },
  {
    title:
      "Thailand's 'Father of Cannabis' Wants Small-Time Growers to Be Part of the Industry",
    source: "South China Morning Post",
    excerpt:
      "Aram Limsakul has developed cannabis varieties and is sought for advice on using cannabis. A feature on the man behind KD Genetics.",
    link: "https://www.scmp.com/week-asia/economics/article/3129135/thailands-father-cannabis-wants-small-time-growers-be-part",
  },
  {
    title: "Relax Law on Cannabis Seeds for Better Product, Thai Advocate Says",
    source: "The Nation Thailand",
    excerpt:
      "Marijuana advocate Aram Limsakul calls on the government to relax laws so cannabis growers could collect stock seeds for genetic development of local strains.",
    link: "https://www.nationthailand.com/in-focus/40014835",
  },
];

const mediaVideos = [
  {
    title:
      "Strain Hunters Thailand: The Strain Hunters team visits Koh Tao and meets KD.",
    embedId: "_XQQ6GFbOyk",
  },
  {
    title:
      "Vice Feature: KD cooks a traditional Thai curry infused with cannabis.",
    embedId: "ERj25Bqet94",
  },
  {
    title:
      "Thai Media Interview: Local journalists speak with KD about cannabis culture.",
    embedId: "dO_rMg47CDA",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav activePage="home" homeHref="/preview" />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 text-center px-6">
        <div className="absolute inset-0 z-0">
          <Image
            src="/koh-tao-farm.png"
            alt="KD Genetics Koh Tao Farm"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F6F4EF]" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-12 mt-10">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-[10px] font-medium uppercase tracking-[0.2em]">
              Koh Tao, Thailand
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-white drop-shadow-lg">
              Born on Koh Tao.
              <br />
              Grown in Living Soil.
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              A family legacy of craft cultivation, preserved genetics, and
              education, built as a calm space in nature.
            </p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#tour"
                className="bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-10 h-14 text-sm font-medium transition-all shadow-sm flex items-center justify-center"
              >
                Book the Farm Tour
              </a>
              <a
                href="#story"
                className="border border-white/30 text-white hover:bg-white/10 rounded-full px-10 h-14 text-sm font-medium backdrop-blur-sm transition-all flex items-center justify-center"
              >
                Explore Our Story
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white/80 text-[11px] font-medium tracking-wider uppercase">
              <span className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-[#5A6A4F]" /> Family-Run Farm
              </span>
              <span className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#5A6A4F]" /> Living Soil +
                Permaculture
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#5A6A4F]" /> Education
                First
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" className="py-40 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-28 max-w-2xl mx-auto space-y-5">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              Our Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              From a Terrace Dream to KD Genetics
            </h2>
          </div>

          <div className="space-y-36">
            {/* Beat 01 */}
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div className="space-y-6">
                <span className="text-[#5A6A4F]/60 text-[11px] font-medium uppercase tracking-[0.15em]">
                  01
                </span>
                <h3 className="font-display text-3xl text-[#1E1E1E]">
                  2016: The Terrace
                </h3>
                <div className="text-[#6B6B6B] leading-[1.85] text-base space-y-4">
                  <p>
                    In 2016, KD&apos;s son Kevin and his best friend Daniel were
                    visiting Papa KD on Koh Tao. Sitting on the small terrace in
                    front of KD&apos;s house, they were sharing a joint and
                    talking about cannabis and the future.
                  </p>
                  <p>
                    At that time cannabis in Thailand was still illegal and
                    surrounded by stigma. None of us were thinking about building
                    a company back then. It was simply a teenage dream when we
                    said with a grin on our faces: &quot;One day weed will be
                    legal here and we will all be here, growing and smoking
                    together.&quot;
                  </p>
                  <p>That moment planted the seed.</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-black/5 shadow-sm">
                  <Image
                    src="/founders-hammock.jpg"
                    alt="The terrace where the dream began"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#1E1E1E]/40 text-[11px] font-light italic">
                  The small terrace where the first dream was spoken out loud.
                </p>
              </div>
            </div>

            {/* Beat 02 */}
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div className="order-2 lg:order-1 space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-black/5 shadow-sm">
                  <Image
                    src="/kd-legalization.jpg"
                    alt="KD at the cannabis legalization movement"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[#1E1E1E]/40 text-[11px] font-light italic">
                  KD carried the plant, the knowledge, and the culture through
                  difficult years.
                </p>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <span className="text-[#5A6A4F]/60 text-[11px] font-medium uppercase tracking-[0.15em]">
                  02
                </span>
                <h3 className="font-display text-3xl text-[#1E1E1E]">
                  Before Legalisation
                </h3>
                <p className="text-[#6B6B6B] leading-[1.85] text-base">
                  KD had already spent many years working with cannabis. Over
                  the decades he shared seeds, produced traditional cannabis
                  oils, and helped keep knowledge about the plant alive in
                  Thailand during times when it was pushed underground. He also
                  spoke openly in support of the plant and played a real role in
                  the legalization movement.
                </p>
              </div>
            </div>

            {/* Beat 03 */}
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <span className="text-[#5A6A4F]/60 text-[11px] font-medium uppercase tracking-[0.15em]">
                03
              </span>
              <h3 className="font-display text-3xl text-[#1E1E1E]">
                When Things Began to Change
              </h3>
              <div className="text-[#6B6B6B] leading-[1.85] text-base space-y-4">
                <p>
                  When Thailand finally began to change its cannabis laws, the
                  conversation we had years earlier suddenly felt possible.
                  Instead of just talking about it, we decided to actually build
                  something together.
                </p>
                <p>KD Genetics grew out of that decision.</p>
              </div>
              <div className="mt-10 space-y-3">
                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-black/5 shadow-sm">
                  <Image
                    src="/kd-change-v2.jpg"
                    alt="KD working in the garden as things began to change"
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <p className="text-[#1E1E1E]/40 text-[11px] font-light italic">
                  What started as a dream slowly turned into something real.
                </p>
              </div>
            </div>

            {/* Beat 04 */}
            <div className="space-y-10">
              <div className="grid lg:grid-cols-5 gap-14 lg:gap-20 items-start">
                <div className="lg:col-span-2 space-y-6 lg:pt-4">
                  <span className="text-[#5A6A4F]/60 text-[11px] font-medium uppercase tracking-[0.15em]">
                    04
                  </span>
                  <h3 className="font-display text-3xl text-[#1E1E1E]">
                    What We Are Building Today
                  </h3>
                </div>
                <div className="lg:col-span-3 text-[#6B6B6B] leading-[1.85] text-base space-y-4">
                  <p>
                    Today the farm is run by family and close friends. Kevin
                    focuses on building the vision and experience around the
                    project, while Daniel, who studied horticulture and has
                    been passionate about cultivation for years, brings
                    scientific knowledge and hands-on growing expertise to the
                    farm.
                  </p>
                  <p>
                    Our goal is simple: grow clean cannabis in living soil,
                    preserve interesting genetics, and create a place where
                    people can enjoy and learn about the plant.
                  </p>
                  <p>
                    KD Genetics is still small and evolving. What matters most
                    to us is doing things honestly: growing with care, sharing
                    knowledge, and continuing the work that started long before
                    cannabis became legal.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-black/5 shadow-sm">
                  <Image
                    src="/founders-today.jpg"
                    alt="Daniel, KD and Kevin at the farm today"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover object-[center_32%]"
                  />
                </div>
                <p className="text-[#1E1E1E]/40 text-[11px] font-light italic">
                  Built slowly, honestly, and with care.
                </p>
              </div>
            </div>
          </div>

          {/* Story tagline */}
          <div className="mt-36 pt-20 border-t border-black/5 max-w-2xl mx-auto text-center space-y-2">
            {["Born on Koh Tao.", "Grown in living soil.", "Built by family."].map(
              (line) => (
                <p
                  key={line}
                  className="font-display text-2xl md:text-[28px] text-[#1E1E1E] leading-relaxed tracking-wide"
                >
                  {line}
                </p>
              )
            )}
          </div>

        </div>
      </section>

      {/* ── BIOBIZZ PARTNERSHIP ── */}
      <section data-nav-dark className="bg-[#2A2820] py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Label */}
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.3em] text-[#5A6A4F] mb-16">
            Our Growing Partner
          </p>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left — logos */}
            <div className="flex flex-col items-center gap-10 w-full">
              <a
                href="https://www.biobizz.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit BioBizz — opens in a new tab"
                className="block w-full max-w-[22rem] cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
              >
                <div className="rounded-[2.25rem] bg-[#F6F4EF] px-4 py-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/grown-with-biobizz.png"
                    alt="Grown with BioBizz — From Dutch Origins"
                    width={2400}
                    height={1245}
                    quality={100}
                    unoptimized
                    className="w-full h-auto object-contain"
                  />
                </div>
              </a>
              <a
                href="https://www.biobizz.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit BioBizz — opens in a new tab"
                className="block w-full max-w-[22rem] cursor-pointer transition-opacity hover:opacity-80"
              >
                <Image
                  src="/biobizz-logo-wide.png"
                  alt="BioBizz World Wide Organics"
                  width={800}
                  height={450}
                  className="w-full h-auto object-contain brightness-0 invert"
                />
              </a>
            </div>

            {/* Right — copy */}
            <div className="space-y-6">
              <h3 className="font-display text-3xl md:text-4xl text-white leading-snug">
                Rooted in the same values.
              </h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                BioBizz started as a small, family-driven company in the Netherlands with one conviction: that organic soil is the foundation of everything. Decades later, that conviction still runs through every product they make — and through every plant we grow.
              </p>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                As our official organic partner, BioBizz sponsors KD Genetics with their full range of soils and nutrients. No synthetics. No shortcuts. Just living soil, the way it should be.
              </p>
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-6">
                {[
                  { label: "100% Organic", sub: "Certified inputs" },
                  { label: "Dutch Origins", sub: "Est. 1992" },
                  { label: "Living Soil", sub: "Our grow method" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/30 text-xs font-light">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDERS ── */}
      <section id="founders" className="py-32 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              The Founders
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Built by Three
            </h2>
            <p className="text-[#6B6B6B] text-base font-light max-w-lg mx-auto leading-relaxed">
              A father, his son, and his son&apos;s closest friend, united by a
              shared respect for the plant and the island that raised them.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {founders.map((founder, i) => (
              <div key={i} className="text-center space-y-6 group">
                <div className="aspect-square rounded-full overflow-hidden border border-black/5 bg-[#EAE6DE]/30 mx-auto max-w-[240px]">
                  <Image
                    src={founder.img}
                    alt={founder.name}
                    width={240}
                    height={240}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-xl text-[#1E1E1E]">
                    {founder.name}
                  </h3>
                  <p className="text-[#5A6A4F]/70 text-[10px] font-medium uppercase tracking-[0.15em]">
                    {founder.role}
                  </p>
                  <p className="text-[#6B6B6B] text-sm font-light leading-relaxed max-w-xs mx-auto">
                    {founder.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ── */}
      <section id="philosophy" className="py-16 border-t border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8">
            {[
              { icon: <Leaf className="h-4 w-4" />, text: "Living Soil Cultivation" },
              { icon: <Sun className="h-4 w-4" />, text: "Permaculture Mindset" },
              { icon: <Star className="h-4 w-4" />, text: "Founder-Grown" },
              { icon: <Users className="h-4 w-4" />, text: "Education & Culture" },
              { icon: <CheckCircle2 className="h-4 w-4" />, text: "Trusted Partners" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="text-[#5A6A4F]/50">{item.icon}</div>
                <span className="text-[13px] text-[#6B6B6B] tracking-wide">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SPACE ── */}
      <section id="space" className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              The Space
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Where It All Grows
            </h2>
            <p className="text-[#6B6B6B] text-base font-light max-w-lg mx-auto leading-relaxed">
              A living soil farm overlooking Tanote Bay, with fruit trees, compost
              beds, herbs, and craft cannabis growing side by side in nature.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 group">
              <Image
                src="/koh-tao-farm.png"
                alt="KD Genetics farm overview"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-black/5 group">
              <Image
                src="/kd-garden.jpg"
                alt="The garden and terrace"
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                src: "/flower-macro-1.jpg",
                alt: "Living soil detail",
                caption: "Living soil ecosystem",
              },
              {
                src: "/flower-macro-2.jpg",
                alt: "Terpene expression",
                caption: "Craft flower close-up",
              },
              {
                src: "/farm-cat.jpg",
                alt: "The farm cat",
                caption: "The farm cat",
              },
            ].map((img, i) => (
              <div key={i} className="space-y-3 group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-black/5">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-[#6B6B6B]/60 text-[12px] font-light text-center">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-[#6B6B6B] text-base leading-[1.8] font-light">
              The farm sits just two minutes from Tanote Bay Beach, surrounded
              by fruit trees, herbs, and compost beds. Everything here is
              designed to work with nature, not against it. No shortcuts, no
              chemicals, no industrial growing.
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] text-[#6B6B6B]/60 font-medium uppercase tracking-wider pt-4">
              <span className="flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-[#5A6A4F]/50" /> Organic
                Living Soil
              </span>
              <span className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-[#5A6A4F]/50" /> Permaculture
                Design
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#5A6A4F]/50" /> Open to
                Visitors
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFERINGS ── */}
      <section id="products" className="py-32 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 text-center mb-20 space-y-4">
          <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
            Products & Experiences
          </h2>
          <p className="text-[#6B6B6B] text-base font-light max-w-lg mx-auto leading-relaxed">
            Craft flowers, handmade extracts, KD Genetics merchandise, and
            guided farm experiences, all rooted in living soil.
          </p>
        </div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl">
          {offerings.map((item, i) => (
            <div
              key={i}
              className="bg-white/60 border border-black/5 rounded-xl p-8 space-y-5 hover:shadow-sm transition-shadow"
            >
              <div className="text-[#5A6A4F]/50">{item.icon}</div>
              <h3 className="font-display text-lg text-[#1E1E1E]">
                {item.title}
              </h3>
              <p className="text-[#6B6B6B] text-sm leading-relaxed font-light">
                {item.desc}
              </p>
              <a
                href={`#${item.scrollTarget}`}
                className="text-[#5A6A4F]/70 hover:text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.15em] transition-colors"
              >
                Learn more
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── FARM TOUR ── */}
      <section id="tour" data-nav-dark className="py-32 bg-[#1E1E1E] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-20 max-w-3xl mx-auto space-y-6">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              Educational Experience
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              The Farm Tour
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              This is not a standard farm walk. It&apos;s a guided immersion
              into living soil, genetics, and Koh Tao&apos;s cannabis heritage.
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
                {[
                  "Full guided farm tour",
                  "Founder story & legacy walk",
                  "Living soil & ecosystem tour",
                  "Terpene education session",
                  "Q&A with the team",
                ].map((text, i) => (
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
                  {[
                    { item: "Guided Farm Tour", value: "1,500 THB" },
                    { item: "KD Genetics T-Shirt", value: "800 THB" },
                    { item: "3g Free Sun Grown", value: "900 THB" },
                    { item: "Smoke Starter Kit", value: "300 THB" },
                    { item: "Homemade Iced Tea", value: "130 THB" },
                    { item: "Oil & Tea Sample", value: "500 THB" },
                    { item: "10% Discount on Flowers", value: "incl." },
                  ].map((row, i) => (
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
                    4,830 THB
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

          {/* Tour Booking Form */}
          <TourBookingForm />
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── MEDIA ── */}
      <section id="media" className="py-32 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              Press & Features
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Media & Credibility
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {mediaVideos.map((video, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-video rounded-xl overflow-hidden border border-black/5 shadow-sm bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <p className="text-sm text-[#6B6B6B] font-light leading-relaxed">
                  {video.title}
                </p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {mediaArticles.map((article, i) => (
              <div
                key={i}
                className="bg-white/60 border border-black/5 rounded-xl p-8 space-y-4"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#5A6A4F]/60">
                  {article.source}
                </p>
                <h4 className="font-display text-lg text-[#1E1E1E] leading-snug">
                  {article.title}
                </h4>
                <p className="text-[#6B6B6B] text-sm font-light leading-relaxed">
                  {article.excerpt}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5A6A4F]/70 hover:text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.15em] transition-colors inline-flex items-center gap-1.5"
                >
                  Read Article{" "}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-[#6B6B6B]/50 text-sm font-light">
            More features and interviews will be added over time.
          </p>
        </div>
      </section>

      {/* ── VISIT ── */}
      <section id="visit" className="py-32 bg-[#EAE6DE]/20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
                Visit Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
                The Shop
              </h2>
              <p className="text-[#6B6B6B] text-lg font-light leading-relaxed">
                A peaceful, secluded space in Tanote Bay — designed for those
                who value quality, nature, and culture.
              </p>
            </div>

            <div className="space-y-8 bg-white/40 p-8 rounded-2xl border border-black/5">
              <div className="flex items-start gap-4">
                <div className="bg-[#1E1E1E]/5 p-3 rounded-lg">
                  <MapPin className="h-4 w-4 text-[#1E1E1E]/60" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B] mb-1">
                    Address
                  </p>
                  <p className="text-[#1E1E1E]/80 text-sm">
                    40/5 Moo 3, Tanote Bay, Koh Tao, Surat Thani, Thailand 84360
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-[#1E1E1E]/5 p-3 rounded-lg">
                  <Clock className="h-4 w-4 text-[#1E1E1E]/60" />
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B] mb-1">
                    Opening Hours
                  </p>
                  <p className="text-[#1E1E1E]/80 text-sm">
                    Monday – Sunday:{" "}
                    <span className="font-medium">10:00 – 19:00</span>
                  </p>
                  <p className="text-[#6B6B6B]/50 text-[11px] mt-2">
                    21+ only · ID required
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.app.goo.gl/DwiYaDtvsqkoTsdS9"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1E1E1E] text-white rounded-full px-8 h-12 font-medium flex items-center justify-center gap-2 group hover:bg-[#1E1E1E]/90 transition-all"
              >
                Get Directions{" "}
                <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://wa.me/66988268290"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#1E1E1E]/20 text-[#1E1E1E] hover:bg-[#1E1E1E]/5 rounded-full px-8 h-12 font-medium flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="h-3.5 w-3.5" /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-[#EAE6DE]/30 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6!2d100.058!3d10.098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS0QgR2VuZXRpY3M!5e0!3m2!1sen!2sth!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KD Genetics Location"
            />
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              Gallery
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Life at the Farm
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { src: "/koh-tao-farm.png", alt: "The farm", className: "col-span-2 row-span-2" },
              { src: "/flower-macro-1.jpg", alt: "Craft flower" },
              { src: "/flower-macro-2.jpg", alt: "Terpene close-up" },
              { src: "/kd-garden.jpg", alt: "Garden" },
              { src: "/farm-cat.jpg", alt: "Farm cat" },
              { src: "/founders-today.jpg", alt: "The founders" },
              { src: "/kd-change-v2.jpg", alt: "KD at work" },
              { src: "/founder-kd.png", alt: "Aram" },
            ].map((img, i) => (
              <div
                key={i}
                className={`rounded-xl overflow-hidden border border-black/5 group ${img.className || ""}`}
              >
                <div className="aspect-square w-full h-full relative">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 bg-[#EAE6DE]/20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              Contact Us
            </h2>
            <p className="text-[#6B6B6B] text-base font-light max-w-lg mx-auto leading-relaxed">
              Questions about visiting, tours, or our products? We&apos;d love
              to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                {[
                  {
                    icon: <MessageSquare className="h-4 w-4" />,
                    label: "WhatsApp",
                    value: "+66 98 826 8290",
                    href: "https://wa.me/66988268290",
                  },
                  {
                    icon: <MapPin className="h-4 w-4" />,
                    label: "Location",
                    value: "Tanote Bay, Koh Tao",
                    href: "https://maps.app.goo.gl/DwiYaDtvsqkoTsdS9",
                  },
                  {
                    icon: <Clock className="h-4 w-4" />,
                    label: "Hours",
                    value: "Mon–Sun: 10:00–19:00",
                    href: null,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-[#1E1E1E]/5 p-3 rounded-lg text-[#1E1E1E]/60">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B] mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1E1E1E]/80 text-sm hover:text-[#5A6A4F] transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#1E1E1E]/80 text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer homeHref="/preview" />
    </div>
  );
}
