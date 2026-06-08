"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-[#F6F4EF] flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-md">
        <p className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
          {t("notFound.eyebrow")}
        </p>
        <h1 className="font-display text-5xl text-[#1E1E1E]">
          {t("notFound.heading")}
        </h1>
        <p className="text-[#6B6B6B] font-light leading-relaxed">
          {t("notFound.body")}
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#1E1E1E] text-white rounded-full px-10 h-12 text-sm font-medium hover:bg-[#1E1E1E]/90 transition-all"
        >
          {t("notFound.cta")}
        </Link>
      </div>
    </div>
  );
}
