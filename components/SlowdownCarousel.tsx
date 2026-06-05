"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export type SlowdownSlide = {
  src: string;
  alt: string;
  caption?: string;
};

interface Props {
  slides: SlowdownSlide[];
  autoplayMs?: number;
  /** Tailwind aspect class — default 4/3 */
  aspectClass?: string;
}

const SWIPE_THRESHOLD = 50;

export default function SlowdownCarousel({
  slides,
  autoplayMs = 5500,
  aspectClass = "aspect-[4/3]",
}: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const goTo = useCallback((idx: number) => {
    setI(((idx % slides.length) + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  }, [slides.length]);

  const next = useCallback(() => goTo(i + 1), [goTo, i]);
  const prev = useCallback(() => goTo(i - 1), [goTo, i]);

  /* Autoplay — runs only when not paused */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setI((p) => (p + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, autoplayMs);
    return () => clearInterval(id);
  }, [paused, autoplayMs, slides.length]);

  /* Pause autoplay when carousel is off-screen */
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPaused((p) => (entry.isIntersecting ? false : true)),
      { threshold: 0.25 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  /* Keyboard arrows when the carousel root has focus or hover */
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (!node.matches(":hover") && !node.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* Touch swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => setPaused(false), 3500);
  };

  const current = slides[i];

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style jsx>{`
        @keyframes kdKenBurns {
          0%   { transform: scale(1.02) translate3d(0, 0, 0); }
          100% { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
        }
        @keyframes kdProgress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .kd-kb {
          animation: kdKenBurns ${Math.round((autoplayMs + 1100) / 100) / 10}s ease-out forwards;
        }
        .kd-progress-bar {
          transform-origin: left center;
          animation: kdProgress ${autoplayMs}ms linear forwards;
        }
      `}</style>

      <div
        className={`relative ${aspectClass} rounded-2xl overflow-hidden bg-[#EAE6DE]/40 group`}
        style={{ touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
        role="region"
        aria-label="Slowdown Homestay photo carousel"
        aria-roledescription="carousel"
      >
        {slides.map((s, idx) => {
          const active = idx === i;
          return (
            <div
              key={s.src}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                key={active ? `kb-${i}-${progressKey}` : `kb-static-${idx}`}
                className={`absolute inset-0 ${active && !paused ? "kd-kb" : ""}`}
                style={{ transform: active ? undefined : "scale(1.02)" }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                  priority={idx === 0}
                  draggable={false}
                />
              </div>
            </div>
          );
        })}

        {/* Prev arrow — always visible, comfortable tap target */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next arrow — always visible, comfortable tap target */}
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Caption pill — bottom-left */}
        {current.caption && (
          <div className="pointer-events-none absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em]">
            {current.caption}
          </div>
        )}

        {/* Counter — top-right, quiet */}
        <div className="pointer-events-none absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-white/85 text-[10px] font-medium tracking-[0.25em]">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {/* Autoplay progress bar — bottom edge */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[3px] bg-white/10">
          <div
            key={`prog-${i}-${progressKey}-${paused ? "p" : "r"}`}
            className={`h-full bg-white/70 ${paused ? "" : "kd-progress-bar"}`}
            style={paused ? { transform: "scaleX(0)" } : undefined}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {slides.map((s, idx) => (
          <button
            key={`dot-${s.src}`}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-[#5A6A4F]" : "w-1.5 bg-[#1E1E1E]/15 hover:bg-[#1E1E1E]/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
