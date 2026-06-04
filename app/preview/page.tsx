"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import HeroVideo from "@/components/HeroVideo";
import SlideshowGallery from "@/components/SlideshowGallery";
import { useLanguage } from "@/lib/i18n";
import {
  Leaf,
  Sun,
  MapPin,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Award,
} from "lucide-react";

const pressSources = [
  { name: "High Times", url: "https://hightimes.com/grow/the-keeper-of-thai-weed/" },
  { name: "South China Morning Post", url: "https://www.scmp.com/week-asia/economics/article/3129135/thailands-father-cannabis-wants-small-time-growers-be-part" },
  { name: "The Nation Thailand", url: "https://www.nationthailand.com/in-focus/40014835" },
];

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav activePage="home" homeHref="/preview" />

      {/* ══════════════════════════════════════════════════════════════════
       *  1. HERO
       * ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center justify-center pt-16 md:pt-20 text-center px-5 md:px-6">
        <div className="absolute inset-0 z-0">
          <HeroVideo
            src="/hero-loop.mp4"
            poster="/hero-loop-poster.jpg"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F6F4EF]" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-8 md:space-y-12 mt-8 md:mt-10">
          <div className="space-y-5 md:space-y-6">
            <div className="inline-block px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em]">
              {t("hero.location")}
            </div>
            <h1 className="font-display text-[2.65rem] sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white drop-shadow-lg">
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
              <br />
              {t("hero.titleLine3")}
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-2">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="flex justify-center w-full sm:w-auto px-2">
              <a
                href="#visit"
                className="w-full sm:w-auto bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-8 md:px-10 h-14 text-sm font-medium transition-all shadow-sm flex items-center justify-center"
              >
                {t("hero.cta")}
              </a>
            </div>

            <div className="flex justify-center px-2">
              <div className="inline-flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-7 gap-y-2 px-4 sm:px-6 py-3 rounded-full bg-black/35 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-[11px] font-medium tracking-wider uppercase shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)]">
                <span className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-[#A8B89A]" /> {t("hero.pill.jackHerer")}</span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/25" aria-hidden />
                <span className="flex items-center gap-2"><Leaf className="w-3.5 h-3.5 text-[#A8B89A]" /> {t("hero.pill.biobizz")}</span>
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/25" aria-hidden />
                <span className="flex items-center gap-2"><Sun className="w-3.5 h-3.5 text-[#A8B89A]" /> {t("hero.pill.sunGrown")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  2. VISIT
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="visit" className="py-20 md:py-32 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              {t("visit.eyebrow")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
              {t("visit.heading")}
            </h2>
            <p className="text-[#6B6B6B] text-base font-light">
              {t("visit.sub")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src="/shop-mural.jpg"
                  alt={t("visit.alt.mural")}
                  width={1800}
                  height={1350}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/shop-exterior.jpg"
                    alt={t("visit.alt.exterior")}
                    width={1400}
                    height={1050}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/drone-bay.jpg"
                    alt={t("visit.alt.drone")}
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
                  {t("visit.location.label")}
                </p>
                <p className="text-[#1E1E1E] text-lg font-light leading-relaxed">
                  {t("visit.location.line1")}
                  <br />
                  {t("visit.location.line2")}
                  <br />
                  {t("visit.location.line3")}
                </p>
              </div>
              <div>
                <p className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em] mb-2">
                  {t("visit.hours.label")}
                </p>
                <p className="text-[#1E1E1E] text-lg font-light">
                  {t("visit.hours.value")}
                </p>
              </div>
              <div>
                <p className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.25em] mb-2">
                  {t("visit.contact.label")}
                </p>
                <a
                  href="https://wa.me/66988268290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E1E1E] text-lg font-light hover:text-[#5A6A4F] transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  {t("visit.contact.whatsapp")}
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/?q=KD+Genetics+Tanote+Bay+Koh+Tao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-6 h-11 text-sm font-medium transition-all"
                >
                  <MapPin className="h-4 w-4" /> {t("visit.cta.directions")}
                </a>
                <a
                  href="https://wa.me/66988268290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#1E1E1E]/15 hover:border-[#5A6A4F] text-[#1E1E1E] rounded-full px-6 h-11 text-sm font-medium transition-all"
                >
                  <MessageSquare className="h-4 w-4" /> {t("visit.cta.message")}
                </a>
              </div>

              <div className="flex-1 min-h-[320px] md:min-h-[260px] rounded-2xl overflow-hidden shadow-sm bg-[#EAE6DE]/30 mt-2">
                <iframe
                  src="https://www.google.com/maps?q=KD+Genetics+Tanote+Bay+Koh+Tao&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t("visit.map.title")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  3. PAPA KD
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="papa" className="py-20 md:py-32 bg-[#EAE6DE]/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-24 space-y-4">
            <p className="font-display text-2xl sm:text-3xl md:text-5xl text-[#1E1E1E] leading-[1.25] md:leading-[1.2]">
              &ldquo;{t("papa.quoteLine1")}
              <br />
              {t("papa.quoteLine2")}&rdquo;
            </p>
            <p className="text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.25em]">
              {t("papa.quoteAttrib")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src="/papa-portrait-2026.jpg"
                  alt={t("papa.alt")}
                  width={1600}
                  height={2000}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="space-y-6">
              <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
                {t("papa.eyebrow")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
                {t("papa.heading")}
              </h2>
              <div className="space-y-4 text-[#4A4A4A] text-base font-light leading-relaxed">
                <p>{t("papa.body1")}</p>
                <p>
                  {t("papa.body2.before")}
                  <strong className="font-medium">{t("papa.body2.year1")}</strong>
                  {t("papa.body2.middle")}
                  <strong className="font-medium">{t("papa.body2.year2")}</strong>
                  {t("papa.body2.after")}
                </p>
                <p className="italic text-[#6B6B6B]">{t("papa.body3")}</p>
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5A6A4F]/10 text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.15em] rounded-full">
                  <Award className="h-3 w-3" /> {t("papa.tag.cup")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5A6A4F]/10 text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.15em] rounded-full">
                  <Leaf className="h-3 w-3" /> {t("papa.tag.pioneer")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  4. THE STORY
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="story" className="py-16 md:py-28 bg-[#F6F4EF] relative">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              {t("story.eyebrow")}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
              {t("story.heading")}
            </h2>
          </div>

          <div className="space-y-12 md:space-y-20 text-[#4A4A4A] text-base font-light leading-[1.75] md:leading-[1.8]">

            {/* Beat 1: The terrace, 2015 */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/terrace-2015.jpg"
                    alt={t("story.beat1.alt")}
                    width={1400}
                    height={1050}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7 space-y-5">
                <p>{t("story.beat1.p1")}</p>
                <p>{t("story.beat1.p2")}</p>
                <p className="text-[#1E1E1E]">{t("story.beat1.p3")}</p>
              </div>
            </div>

            {/* Beat 2: Coming home */}
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-5 md:order-2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                  <Image
                    src="/three-of-us-2025.jpg"
                    alt={t("story.beat2.alt")}
                    width={1800}
                    height={1200}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-7 md:order-1 space-y-5">
                <p>{t("story.beat2.p1")}</p>
                <p>{t("story.beat2.p2")}</p>
                <p className="text-[#1E1E1E]">{t("story.beat2.p3")}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  5. GALLERY
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-14 md:py-20 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10 max-w-2xl mx-auto space-y-2">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              {t("gallery.eyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">
              {t("gallery.heading")}
            </h2>
          </div>

          <SlideshowGallery
            slides={[
              { src: "/drone-hero.jpg",          alt: "Aerial view of KD Genetics farm and Tanote Bay",  caption: t("gallery.cap.drone") },
              { src: "/tanote-bay-aerial.jpg",   alt: "Aerial view of Tanote Bay, Koh Tao",               caption: t("gallery.cap.bay") },
              { src: "/historic-grow-site.jpg",  alt: "Papa KD on the historic hillside grow site",       caption: t("gallery.cap.historic") },
              { src: "/farm-nursery.jpg",        alt: "Young cannabis plants in the nursery",             caption: t("gallery.cap.nursery") },
              { src: "/farm-veg.jpg",            alt: "Cannabis plants in flower in the greenhouse",      caption: t("gallery.cap.veg"), objectFit: "contain" },
              { src: "/sun-grown.jpg",           alt: "Sun-grown cannabis canopy on the farm",            caption: t("gallery.cap.sungrown") },
              { src: "/farm-chicken.jpg",        alt: "A hen on her nest at the farm",                    caption: t("gallery.cap.chicken"), objectFit: "contain" },
              { src: "/farm-cat.jpg",            alt: "The farm cat resting on a wall",                   caption: t("gallery.cap.cat"), objectFit: "contain" },
              { src: "/apparel-dog.jpg",         alt: "The farm dog in the shop with Kevin",              caption: t("gallery.cap.dog"), objectFit: "contain" },
              { src: "/farm-shoot-01.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.mila") },
              { src: "/farm-shoot-02.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.willy"), objectFit: "contain" },
              { src: "/farm-shoot-03.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.peter"), objectFit: "contain" },
              { src: "/farm-shoot-04.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.fert") },
              { src: "/farm-shoot-05.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.mural"), objectFit: "contain" },
              { src: "/farm-shoot-06.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.shop") },
              { src: "/farm-shoot-07.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.fame"), objectFit: "contain" },
              { src: "/farm-shoot-08.jpg",       alt: "Papa KD on the farm",                              caption: t("gallery.cap.legend"), objectFit: "contain" },
              { src: "/farm-shoot-09.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.water"), objectFit: "contain" },
            ]}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  6. FARM TOUR
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="tour" data-nav-dark className="py-20 md:py-32 bg-[#1E1E1E] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="md:col-span-7">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src="/historic-grow-site.jpg"
                  alt={t("tour.alt")}
                  width={1800}
                  height={1350}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5 space-y-6">
              <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
                {t("tour.eyebrow")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
                {t("tour.heading")}
              </h2>
              <p className="text-white/65 text-base md:text-lg font-light leading-relaxed">
                {t("tour.body")}
              </p>
              <a
                href="https://kdtours.tours"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-8 h-12 text-sm font-medium transition-all"
              >
                {t("tour.cta")}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  7. KD MERCH
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="apparel" className="py-20 md:py-32 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="md:col-span-7 md:order-2">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
                <Image
                  src="/apparel-three-of-us.jpg"
                  alt={t("merch.alt")}
                  width={2400}
                  height={1600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-5 md:order-1 space-y-6">
              <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
                {t("merch.eyebrow")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
                {t("merch.heading")}
              </h2>
              <p className="text-[#6B6B6B] text-base md:text-lg font-light leading-relaxed">
                {t("merch.body")}
              </p>
              <a
                href="https://kdtours.tours"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-8 h-12 text-sm font-medium transition-all"
              >
                {t("merch.cta")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  8. SLOWDOWN
       * ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#F6F4EF] border-y border-black/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DE]/40">
              <Image
                src="/slowdown-hero.jpg"
                alt={t("slowdown.alt")}
                width={2000}
                height={1500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
                {t("slowdown.eyebrow")}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E] leading-tight">
                {t("slowdown.heading")}
              </h2>
              <p className="text-[#6B6B6B] text-base font-light leading-relaxed">
                {t("slowdown.body.before")}
                <strong className="font-medium">{t("slowdown.body.name")}</strong>
                {t("slowdown.body.after")}
              </p>
              <a
                href="https://slowdownkohtao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex items-center gap-2.5 rounded-full border border-[#5A6A4F]/25 bg-white/55 backdrop-blur-md px-7 h-12 text-sm font-medium text-[#3D4A35] shadow-[0_8px_24px_-12px_rgba(90,106,79,0.35)] hover:bg-white/75 hover:border-[#5A6A4F]/40 transition-all"
              >
                {t("slowdown.cta")}
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
       *  9. PROOF — press strip + reviews
       * ══════════════════════════════════════════════════════════════════ */}
      <section id="press" className="pt-14 md:pt-20 pb-4 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <p className="text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.3em] mb-6">
            {t("press.heading")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-1">
            {pressSources.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-base md:text-xl text-[#1E1E1E]/65 hover:text-[#1E1E1E] transition-colors py-2 px-2 -mx-2"
              >
                {p.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      <Footer homeHref="/preview" />
    </div>
  );
}
