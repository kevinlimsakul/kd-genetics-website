"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import HeroVideo from "@/components/HeroVideo";
import SlideshowGallery from "@/components/SlideshowGallery";
import SlowdownCarousel from "@/components/SlowdownCarousel";
import { useLanguage } from "@/lib/i18n";
import {
  Leaf,
  Sun,
  MapPin,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Award,
  Instagram,
} from "lucide-react";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 2C6.553 2 2.083 6.47 2.083 11.974c0 1.764.46 3.484 1.336 5.001L2 22l5.13-1.345a9.93 9.93 0 0 0 4.93 1.256h.004c5.504 0 9.974-4.47 9.974-9.973 0-2.665-1.037-5.171-2.92-7.054A9.916 9.916 0 0 0 12.057 2zm0 18.185h-.004a8.28 8.28 0 0 1-4.21-1.151l-.302-.179-3.13.82.835-3.052-.197-.314a8.262 8.262 0 0 1-1.266-4.387c0-4.566 3.717-8.283 8.28-8.283 2.211 0 4.29.864 5.851 2.428a8.232 8.232 0 0 1 2.421 5.858c-.002 4.566-3.719 8.26-8.278 8.26z" />
    </svg>
  );
}

function LineIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

const pressSources = [
  {
    name: "High Times",
    titleKey: "press.article.hightimes.title",
    url: "https://hightimes.com/grow/the-keeper-of-thai-weed/",
  },
  {
    name: "South China Morning Post",
    titleKey: "press.article.scmp.title",
    url: "https://www.scmp.com/week-asia/economics/article/3129135/thailands-father-cannabis-wants-small-time-growers-be-part",
  },
  {
    name: "The Nation Thailand",
    titleKey: "press.article.nation.title",
    url: "https://www.nationthailand.com/in-focus/40014835",
  },
] as const;

const pressVideos = [
  { embedId: "_XQQ6GFbOyk", labelKey: "press.video.strainhunters" },
  { embedId: "ERj25Bqet94", labelKey: "press.video.vice" },
  { embedId: "dO_rMg47CDA", labelKey: "press.video.thaimedia" },
] as const;

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav activePage="home" homeHref="/" />

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
      <section id="visit" className="py-16 md:py-24 bg-[#F6F4EF]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-10 md:mb-12 max-w-xl mx-auto space-y-3">
            <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
              {t("visit.eyebrow")}
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-[#1E1E1E]">
              {t("visit.heading")}
            </h2>
            <p className="text-[#6B6B6B] text-sm md:text-base font-light">
              {t("visit.sub")}
            </p>
          </div>

          {/* Card — info on left, real Google Maps embed on right */}
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-[#1E1E1E]/10 bg-white shadow-sm">
            <div className="p-7 md:p-9 flex flex-col gap-6 justify-between">
              <div className="space-y-5">
                <div>
                  <p className="text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.25em] mb-1.5">
                    {t("visit.location.label")}
                  </p>
                  <p className="text-[#1E1E1E] text-base font-light leading-relaxed">
                    {t("visit.location.line1")}
                    <br />
                    40/5 Moo 3
                    <br />
                    {t("visit.location.line2")}
                    <br />
                    {t("visit.location.line3")}
                  </p>
                </div>
                <div>
                  <p className="text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.25em] mb-1.5">
                    {t("visit.hours.label")}
                  </p>
                  <p className="text-[#1E1E1E] text-base font-light">
                    {t("visit.hours.value")}
                  </p>
                </div>
                <div>
                  <p className="text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.25em] mb-2">
                    {t("visit.contact.label")}
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <a
                      href="https://wa.me/66988268290"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E1E1E] text-base font-light hover:text-[#5A6A4F] transition-colors inline-flex items-center gap-2.5"
                    >
                      <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                      {t("visit.contact.whatsapp")}
                    </a>
                    <a
                      href="https://line.me/R/ti/p/%40kdgenetics"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E1E1E] text-base font-light hover:text-[#5A6A4F] transition-colors inline-flex items-center gap-2.5"
                    >
                      <LineIcon className="h-4 w-4 text-[#06C755]" />
                      @kdgenetics
                    </a>
                    <a
                      href="https://www.instagram.com/kdgenetics_official/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1E1E1E] text-base font-light hover:text-[#5A6A4F] transition-colors inline-flex items-center gap-2.5"
                    >
                      <Instagram className="h-4 w-4 text-[#E1306C]" />
                      @kdgenetics
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://maps.app.goo.gl/?q=KD+Genetics+Tanote+Bay+Koh+Tao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-5 h-10 text-sm font-medium transition-all"
                >
                  <MapPin className="h-4 w-4" /> {t("visit.cta.directions")}
                </a>
                <a
                  href="https://wa.me/66988268290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#1E1E1E]/15 hover:border-[#5A6A4F] text-[#1E1E1E] rounded-full px-5 h-10 text-sm font-medium transition-all"
                >
                  <MessageSquare className="h-4 w-4" /> {t("visit.cta.message")}
                </a>
              </div>
            </div>

            <div className="min-h-[320px] md:min-h-[420px] bg-[#EAE6DE]/40 border-t md:border-t-0 md:border-l border-[#1E1E1E]/10">
              <iframe
                src="https://www.google.com/maps?q=KD+Genetics+Tanote+Bay+Koh+Tao&output=embed"
                title={t("visit.map.title")}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px] md:min-h-[420px] block"
                style={{ border: 0 }}
              />
            </div>
          </div>

          {/* Supporting photo strip — 3 thumbs, kept small and harmonious */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-5 md:mt-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
              <Image
                src="/papa-portrait.jpg"
                alt={t("visit.alt.papa")}
                width={4480}
                height={6720}
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
              <Image
                src="/shop-front.jpg"
                alt={t("visit.alt.front")}
                width={1400}
                height={1050}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40">
              <Image
                src="/shop-team.jpg"
                alt={t("visit.alt.team")}
                width={1800}
                height={1200}
                className="w-full h-full object-cover"
              />
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
              { src: "/farm-shoot-04.jpg",       alt: "KD Genetics farm, Tanote Bay",                     caption: t("gallery.cap.fert"), objectFit: "contain" },
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
                href="/shop"
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
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <SlowdownCarousel
              slides={[
                { src: "/slowdown-aerial.jpg",           alt: t("slowdown.slide.aerial.alt"),        caption: t("slowdown.slide.aerial.cap") },
                { src: "/slowdown-unit1-terrace.jpg",    alt: t("slowdown.slide.terrace.alt"),       caption: t("slowdown.slide.terrace.cap") },
                { src: "/slowdown-unit1-room.jpg",       alt: t("slowdown.slide.room.alt"),          caption: t("slowdown.slide.room.cap") },
                { src: "/slowdown-entrance.jpg",         alt: t("slowdown.slide.entrance.alt"),      caption: t("slowdown.slide.entrance.cap") },
                { src: "/slowdown-unit2-entrance.jpg",   alt: t("slowdown.slide.unit2entrance.alt"), caption: t("slowdown.slide.unit2entrance.cap") },
                { src: "/slowdown-unit2-outdoor.jpg",    alt: t("slowdown.slide.unit2outdoor.alt"),  caption: t("slowdown.slide.unit2outdoor.cap") },
              ]}
            />
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
      <section id="press" className="pt-14 md:pt-20 pb-14 md:pb-20 bg-[#EAE6DE]/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <p className="text-center text-[#5A6A4F] text-xs font-medium uppercase tracking-[0.3em] mb-10 md:mb-14">
            {t("press.heading")}
          </p>

          <div className="grid sm:grid-cols-3 gap-5 md:gap-7 mb-10 md:mb-14">
            {pressVideos.map((v) => (
              <a
                key={v.embedId}
                href={`https://www.youtube.com/watch?v=${v.embedId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg ring-1 ring-black/5 bg-black/5 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${v.embedId}/hqdefault.jpg`}
                    alt={t(v.labelKey)}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow group-hover:bg-white transition-colors">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M3 1.5l9 5.5-9 5.5V1.5z" fill="#1E1E1E" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="font-display text-base md:text-lg text-[#1E1E1E]/80 group-hover:text-[#1E1E1E] mt-3 leading-snug transition-colors">
                  {t(v.labelKey)}
                </p>
              </a>
            ))}
          </div>

          <div className="h-px bg-[#1E1E1E]/10 max-w-xs mx-auto mb-8 md:mb-10" />

          <div className="grid sm:grid-cols-3 gap-6 md:gap-7">
            {pressSources.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block text-center sm:text-left"
              >
                <p className="text-[#5A6A4F]/80 text-[10px] font-medium uppercase tracking-[0.25em] mb-2">
                  {p.name}
                </p>
                <p className="font-display text-base md:text-lg text-[#1E1E1E]/80 group-hover:text-[#1E1E1E] leading-snug transition-colors">
                  {t(p.titleKey)}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      <Footer homeHref="/" />
    </div>
  );
}
