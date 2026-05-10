"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type LightboxPhoto = {
  label: string;
  img: string;
};

/**
 * Hook + overlay for click-to-enlarge image viewers.
 *
 * Usage:
 *   const { open, lightbox } = useLightbox(photos);
 *   <button onClick={() => open(i)}>...</button>
 *   {lightbox}
 */
export function useLightbox(photos: LightboxPhoto[]) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i + 1) % photos.length
      ),
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

  const lightbox =
    openIndex === null ? null : (
      <LightboxOverlay
        photos={photos}
        index={openIndex}
        onClose={close}
        onNext={next}
        onPrev={prev}
      />
    );

  return { open: (i: number) => setOpenIndex(i), lightbox };
}

function LightboxOverlay({
  photos,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  photos: LightboxPhoto[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const photo = photos[index];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={photo.label}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
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
              onPrev();
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
              onNext();
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
          src={photo.img}
          alt={photo.label}
          width={2400}
          height={1800}
          className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
          priority
        />
        <p className="text-white/80 text-sm font-light text-center mt-4">
          {photo.label}
        </p>
      </div>
    </div>
  );
}
