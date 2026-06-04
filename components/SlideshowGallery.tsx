"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLightbox } from "./Lightbox";

type Slide = {
  src: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
};

interface Props {
  slides: Slide[];
  autoplayMs?: number;
}

const SWIPE_THRESHOLD = 50;

export default function SlideshowGallery({ slides, autoplayMs = 5500 }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwipingRef = useRef(false);

  const lightboxPhotos = slides.map((s) => ({
    label: s.caption ?? s.alt,
    img: s.src,
  }));
  const { open, lightbox } = useLightbox(lightboxPhotos);

  const next = useCallback(
    () => setI((p) => (p + 1) % slides.length),
    [slides.length],
  );
  const prev = useCallback(
    () => setI((p) => (p - 1 + slides.length) % slides.length),
    [slides.length],
  );

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [next, paused, autoplayMs]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwipingRef.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    // Flag a horizontal swipe early so the tap-to-zoom click is suppressed
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      isSwipingRef.current = true;
    }
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
    // Resume autoplay after a brief pause
    setTimeout(() => setPaused(false), 4000);
  };

  const handleSlideClick = (idx: number) => {
    // If a swipe just happened, suppress the lightbox-open click
    if (isSwipingRef.current) {
      isSwipingRef.current = false;
      return;
    }
    open(idx);
  };

  const current = slides[i];

  return (
    <div
      className="max-w-6xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Hero stage — crossfading slides */}
      <div
        className="relative aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAE6DE]/40 group"
        style={{ touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide images — non-interactive, just visual */}
        {slides.map((s, idx) => {
          const fit = s.objectFit ?? "cover";
          const imgStyle: React.CSSProperties = {
            objectFit: fit,
            ...(s.objectPosition ? { objectPosition: s.objectPosition } : {}),
          };
          return (
            <div
              key={s.src}
              aria-hidden={idx !== i}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none ${
                idx === i ? "opacity-100 z-0" : "opacity-0 z-0"
              } ${fit === "contain" ? "bg-[#1a1a1a]" : ""}`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 1100px, 100vw"
                style={imgStyle}
                priority={idx === 0}
                draggable={false}
              />
            </div>
          );
        })}

        {/* Single tap target overlay — opens lightbox unless a swipe was detected */}
        <button
          type="button"
          onClick={() => handleSlideClick(i)}
          aria-label={`Open ${current.alt} fullscreen`}
          className="absolute inset-0 z-10 cursor-zoom-in"
          style={{ background: "transparent" }}
        />

        {/* Caption pill */}
        {current.caption && (
          <div className="pointer-events-none absolute bottom-4 left-4 sm:bottom-5 sm:left-5 z-20 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em]">
            {current.caption}
          </div>
        )}

        {/* Counter */}
        <div className="pointer-events-none absolute top-4 right-4 sm:top-5 sm:right-5 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-medium tracking-[0.25em]">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {/* Arrows — always visible on mobile, fade in on hover for desktop */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-black/35 sm:bg-white/15 backdrop-blur-md border border-white/30 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white/25 flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-black/35 sm:bg-white/15 backdrop-blur-md border border-white/30 text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:bg-white/25 flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Mobile: dots. Desktop: thumbnails. */}
      <div className="md:hidden mt-5 flex items-center justify-center gap-1.5 flex-wrap">
        {slides.map((s, idx) => (
          <button
            key={`dot-${s.src}`}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-6 bg-[#5A6A4F]" : "w-1.5 bg-[#1E1E1E]/15"
            }`}
          />
        ))}
      </div>

      <div className="hidden md:flex mt-5 flex-wrap justify-center gap-2">
        {slides.map((s, idx) => (
          <button
            key={`thumb-${s.src}`}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`relative w-16 h-12 md:w-20 md:h-14 rounded-md overflow-hidden transition-all ${
              idx === i
                ? "ring-2 ring-[#5A6A4F] scale-[1.04]"
                : "opacity-55 hover:opacity-100"
            }`}
          >
            <Image
              src={s.src}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
              style={s.objectPosition ? { objectPosition: s.objectPosition } : undefined}
            />
          </button>
        ))}
      </div>

      {lightbox}
    </div>
  );
}
