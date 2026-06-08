"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowLeft, Leaf, Flame, Droplet, Sparkles, Shirt, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const sections = [
  { id: "flower", icon: <Leaf className="h-5 w-5" />, titleKey: "menu.section.flower.title" as const, lineKey: "menu.section.flower.line" as const },
  { id: "oils", icon: <Droplet className="h-5 w-5" />, titleKey: "menu.section.oils.title" as const, lineKey: "menu.section.oils.line" as const },
  { id: "hash", icon: <Flame className="h-5 w-5" />, titleKey: "menu.section.hash.title" as const, lineKey: "menu.section.hash.line" as const },
  { id: "rosin", icon: <Sparkles className="h-5 w-5" />, titleKey: "menu.section.rosin.title" as const, lineKey: "menu.section.rosin.line" as const },
  { id: "apparel", icon: <Shirt className="h-5 w-5" />, titleKey: "menu.section.apparel.title" as const, lineKey: "menu.section.apparel.line" as const },
];

export default function MenuClient() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav homeHref="/preview" />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.2em] mb-10"
          >
            <ArrowLeft className="h-3 w-3" /> {t("menu.back")}
          </Link>

          <div className="space-y-4 mb-16">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              {t("menu.eyebrow")}
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-[#1E1E1E] leading-tight">
              {t("menu.heading")}
            </h1>
            <p className="text-[#6B6B6B] text-base font-light max-w-xl">
              {t("menu.sub")}
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="bg-white/60 border border-black/5 rounded-2xl p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-5">
                  <div className="text-[#5A6A4F] mt-0.5 shrink-0">{s.icon}</div>
                  <div className="flex-1 space-y-2">
                    <h2 className="font-display text-2xl md:text-3xl text-[#1E1E1E]">
                      {t(s.titleKey)}
                    </h2>
                    <p className="text-[#6B6B6B] text-sm font-light leading-relaxed">
                      {t(s.lineKey)}
                    </p>
                    <p className="text-[#6B6B6B]/60 text-[11px] font-light italic pt-2">
                      {t("menu.section.note")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/66988268290"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-8 h-12 text-sm font-medium transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              {t("menu.cta.whatsapp")}
            </a>
            <Link
              href="/preview#visit"
              className="inline-flex items-center gap-2 border border-[#1E1E1E]/15 hover:border-[#5A6A4F] text-[#1E1E1E] rounded-full px-8 h-12 text-sm font-medium transition-all"
            >
              {t("menu.cta.visit")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
