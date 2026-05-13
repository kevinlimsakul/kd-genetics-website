"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export type Strain = { name: string; img: string };

export default function StrainGrid({
  strains,
  gridClassName,
}: {
  strains: Strain[];
  gridClassName: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % strains.length)),
    [strains.length]
  );
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + strains.length) % strains.length
      ),
    [strains.length]
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
      <div className={gridClassName}>
        {strains.map((s, i) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="space-y-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A6A4F] rounded-xl"
            aria-label={`Enlarge ${s.name}`}
          >
            <div className="aspect-square overflow-hidden cursor-zoom-in p-4 md:p-6 flex items-center justify-center">
              <Image
                src={s.img}
                alt={s.name}
                width={1200}
                height={1200}
                className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={strains[openIndex].name}
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

          {strains.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-white text-3xl w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                aria-label="Previous"
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
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative max-w-6xl w-full flex flex-col items-center cursor-default px-8 md:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={strains[openIndex].img}
              alt={strains[openIndex].name}
              width={2000}
              height={2000}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
