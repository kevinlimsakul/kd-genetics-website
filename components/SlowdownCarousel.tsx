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
  autoplayMs = 4500,
  aspectClass = "aspect-[4/3]",
}: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(
    () => setI((p) => (p + 1) % slides.length),
    [slides.length],
  );
  const prev = useCallback(
    () => setI((p) => (p - 1 + slides.length) % slides.length),
    [slides.length],
  );

  /* Autoplay — runs only when not paused */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [next, paused, autoplayMs]);

  /* Pause autoplay when carousel is off-screen — saves work + keeps state
     fresh when the user scrolls back. */
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
      <div
        className={`relative ${aspectClass} rounded-2xl overflow-hidden bg-[#EAE6DE]/40 group`}
        style={{ touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((s, idx) => (
          <div
            key={s.src}
            aria-hidden={idx !== i}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
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
        ))}

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
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {slides.map((s, idx) => (
          <button
            key={`dot-${s.src}`}
            type="button"
            onClick={() => setI(idx)}
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
