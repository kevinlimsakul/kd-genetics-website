"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/**
 * Single image that opens a fullscreen lightbox on click.
 * Same modal UX as PhotoGallery / StrainGrid, scoped to one photo.
 */
export default function LightboxImage({
  src,
  alt,
  caption,
  width = 2400,
  height = 1350,
  containerClassName = "",
  imageClassName = "w-full h-full object-cover",
  captionClassName = "text-center text-[#6B6B6B] text-sm font-light italic mt-3",
}: {
  src: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
  containerClassName?: string;
  imageClassName?: string;
  captionClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A6A4F] rounded-2xl"
        aria-label={`Enlarge: ${caption}`}
      >
        <div className={`${containerClassName} cursor-zoom-in`}>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={imageClassName}
          />
        </div>
        <p className={captionClassName}>{caption}</p>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={caption}
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

          <div
            className="relative max-w-6xl w-full flex flex-col items-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={2400}
              height={1800}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
              priority
            />
            <p className="text-white/80 text-sm font-light text-center mt-4">
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
