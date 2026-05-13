"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLightbox } from "./Lightbox";

type Slide = { src: string; alt: string; caption?: string };

interface Props {
  slides: Slide[];
  autoplayMs?: number;
}

export default function SlideshowGallery({ slides, autoplayMs = 5500 }: Props) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
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

  const current = slides[i];

  return (
    <div
      className="max-w-6xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Hero stage — crossfading slides */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAE6DE]/40 group">
        {slides.map((s, idx) => (
          <button
            key={s.src}
            type="button"
            onClick={() => open(idx)}
            aria-label={`Open ${s.alt}`}
            aria-hidden={idx !== i}
            tabIndex={idx === i ? 0 : -1}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out cursor-zoom-in ${
              idx === i ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
              priority={idx === 0}
            />
          </button>
        ))}

        {/* Caption pill */}
        {current.caption && (
          <div className="pointer-events-none absolute bottom-5 left-5 z-20 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium uppercase tracking-[0.2em]">
            {current.caption}
          </div>
        )}

        {/* Counter */}
        <div className="pointer-events-none absolute top-5 right-5 z-20 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md text-white/90 text-[10px] font-medium tracking-[0.25em]">
          {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {/* Arrows — fade in on hover */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/25 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/25 flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
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
            />
          </button>
        ))}
      </div>

      {lightbox}
    </div>
  );
}
