"use client";

import { useLanguage } from "@/lib/i18n";

export default function TourFeedbackHeader() {
  const { t } = useLanguage();
  return (
    <div className="text-center mb-10 space-y-4">
      <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
        {t("fb.eyebrow")}
      </span>
      <h1 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
        {t("fb.title")}
      </h1>
      <p className="text-[#6B6B6B] font-light leading-relaxed max-w-md mx-auto">{t("fb.sub")}</p>
    </div>
  );
}
