"use client";

import Image from "next/image";
import { useLightbox } from "./Lightbox";

type Photo = {
  label: string;
  img: string;
  fit?: "cover" | "contain";
  position?: string; // CSS object-position value, e.g. "center top" or "50% 20%"
};

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const { open, lightbox } = useLightbox(photos);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
        {photos.map((tile, i) => (
          <button
            key={tile.label}
            type="button"
            onClick={() => open(i)}
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
                style={tile.position ? { objectPosition: tile.position } : undefined}
              />
            </div>
            <p className="text-[#6B6B6B] text-[11px] font-light text-center px-2 leading-snug">
              {tile.label}
            </p>
          </button>
        ))}
      </div>

      {lightbox}
    </>
  );
}
