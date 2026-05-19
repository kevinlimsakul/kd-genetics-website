"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

type Slide = { src: string; alt: string };

interface Props {
  /** Big claim. Keep it short — it should land in one breath. */
  headline?: string;
  /** Quiet line under the claim. */
  subline?: string;
  cta?: { label: string; href: string };
  slides?: Slide[];
  /** ms each slide holds before crossfading */
  intervalMs?: number;
}

const DEFAULT_SLIDES: Slide[] = [
  { src: "/flower-macro-1.jpg", alt: "KD Genetics flower, macro" },
  { src: "/sun-grown.jpg", alt: "Sun-grown cannabis on Koh Tao" },
  { src: "/flower-hero.jpg", alt: "Fresh KD harvest" },
  { src: "/farm-flowering.jpg", alt: "Plants in flower at the farm" },
  { src: "/flower-macro-2.jpg", alt: "Trichome detail" },
];

export default function StatementSlideshow({
  headline = "Know what you're smoking.",
  subline = "All organic. Small batch. Sun-grown by hand on Koh Tao.",
  cta = { label: "Visit the Shop", href: "#visit" },
  slides = DEFAULT_SLIDES,
  intervalMs = 5000,
}: Props) {
  const [i, setI] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const next = useCallback(
    () => setI((p) => (p + 1) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (reduced.current || slides.length < 2) return;
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [next, intervalMs, slides.length]);

  return (
    <section
      aria-label={headline}
      data-nav-dark
      className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-[#1E1E1E]"
    >
      {/* Crossfading background */}
      {slides.map((s, idx) => (
        <div
          key={s.src}
          aria-hidden={idx !== i}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            className={`object-cover ${
              reduced.current ? "" : "kd-kenburns"
            } ${idx === i ? "kd-kenburns-on" : ""}`}
          />
        </div>
      ))}

      {/* Legibility wash — keeps it premium, not a hype billboard */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/65" />

      {/* Claim */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h2 className="font-display text-white leading-[0.95] text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
          {headline}
        </h2>
        {subline && (
          <p className="mt-7 max-w-xl text-white/85 text-base md:text-lg font-light leading-relaxed">
            {subline}
          </p>
        )}
        {cta && (
          <a
            href={cta.href}
            className="group mt-10 inline-flex items-center gap-3 border border-white/40 text-white rounded-full px-9 h-14 text-sm font-medium uppercase tracking-[0.18em] backdrop-blur-sm transition-all hover:bg-white hover:text-[#1E1E1E]"
          >
            {cta.label}
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        )}

        {/* Progress dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-8 flex gap-2.5">
            {slides.map((s, idx) => (
              <button
                key={`dot-${s.src}`}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Show slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-7 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .kd-kenburns { transform: scale(1.04); transition: transform 7s ease-out; }
        .kd-kenburns-on { transform: scale(1.12); }
      `}</style>
    </section>
  );
}
