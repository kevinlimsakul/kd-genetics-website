"use client";

import { useLanguage } from "@/lib/i18n";
import type { Locale } from "@/lib/translations";

/* ── Flag SVGs (inline, no extra deps) ──────────────────────────────────── */

function FlagTH({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 9 6"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="9" height="6" fill="#ED1C24" />
      <rect width="9" height="4" y="1" fill="#FFFFFF" />
      <rect width="9" height="2" y="2" fill="#241D4F" />
    </svg>
  );
}

function FlagGB({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <clipPath id="kd-flag-gb-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <g clipPath="url(#kd-flag-gb-clip)">
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#FFFFFF"
          strokeWidth="6"
        />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#C8102E"
          strokeWidth="4"
          clipPath="url(#kd-flag-gb-clip)"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

/* ── Switcher ───────────────────────────────────────────────────────────── */

interface LanguageSwitcherProps {
  /** Color scheme — `glass` for overlays on dark hero, `solid` for light bg. */
  variant?: "glass" | "solid";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "solid",
  className = "",
}: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage();

  const isGlass = variant === "glass";

  const containerClass = isGlass
    ? "bg-white/10 border-white/20 backdrop-blur-md"
    : "bg-white border-black/10 shadow-sm";

  const itemBase =
    "inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full text-[11px] font-semibold tracking-wide transition-all cursor-pointer";

  const activeClass = isGlass
    ? "bg-white text-[#1E1E1E]"
    : "bg-[#5A6A4F] text-white";

  const inactiveClass = isGlass
    ? "text-white/80 hover:text-white"
    : "text-[#1E1E1E]/60 hover:text-[#1E1E1E]";

  const renderBtn = (locale: Locale) => {
    const active = lang === locale;
    const Flag = locale === "th" ? FlagTH : FlagGB;
    return (
      <button
        key={locale}
        type="button"
        onClick={() => setLang(locale)}
        aria-pressed={active}
        aria-label={t(locale === "th" ? "lang.switchTo.th" : "lang.switchTo.en")}
        className={`${itemBase} ${active ? activeClass : inactiveClass}`}
      >
        <span className="block w-4 h-3 rounded-[2px] overflow-hidden ring-1 ring-black/10 shrink-0">
          <Flag className="w-full h-full" />
        </span>
        <span>{t(locale === "th" ? "lang.label.th" : "lang.label.en")}</span>
      </button>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-full border ${containerClass} ${className}`}
      role="group"
      aria-label="Language"
    >
      {renderBtn("en")}
      {renderBtn("th")}
    </div>
  );
}
