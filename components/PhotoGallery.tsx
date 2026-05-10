"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type Photo = {
  label: string;
  img: string;
  fit?: "cover" | "contain";
};

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () =>
      setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        {photos.map((tile, i) => (
          <button
            key={tile.label}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="space-y-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A6A4F] rounded-xl"
            aria-label={`Open ${tile.label}`}
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EAE6DE]/40 cursor-zoom-in">
              <Image
                src={tile.img}
                alt={tile.label}
                width={1400}
                height={1050}
                className={`w-full h-full ${
                  tile.fit === "contain" ? "object-contain" : "object-cover"
                } transition-transform duration-500 group-hover:scale-[1.03]`}
              />
            </div>
            <p className="text-[#6B6B6B] text-[11px] font-light text-center px-2 leading-snug">
              {tile.label}
            </p>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={photos[openIndex].label}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/90 hover:text-white text-2xl w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-3xl w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-3xl w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative max-w-6xl w-full flex flex-col items-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[openIndex].img}
              alt={photos[openIndex].label}
              width={2400}
              height={1800}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
              priority
            />
            <p className="text-white/80 text-sm font-light text-center mt-4">
              {photos[openIndex].label}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
