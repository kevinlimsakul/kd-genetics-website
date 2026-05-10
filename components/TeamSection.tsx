"use client";

import Image from "next/image";
import { useLightbox } from "./Lightbox";

const teamMembers = [
  { img: "/team-1.jpg", name: "Wai" },
  { img: "/team-2.jpg", name: "Khant" },
  { img: "/team-wee.jpg", name: "Wee" },
  { img: "/team-che.jpg", name: "Che" },
];

const groupCaption =
  "The full crew, left to right — Khant, Mr KD, Daniel, Kevin, Wai, Wee, Che.";

export default function TeamSection() {
  // Lightbox set: group photo first, then the four portraits
  const photos = [
    { label: groupCaption, img: "/team-group-2026.jpg" },
    ...teamMembers.map((m) => ({ label: m.name, img: m.img })),
  ];
  const { open, lightbox } = useLightbox(photos);

  return (
    <section className="pt-32 pb-16 bg-[#F6F4EF]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 max-w-xl mx-auto space-y-3">
          <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
            The Team
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
            The hands on every plant.
          </h2>
          <p className="text-[#6B6B6B] text-base font-light">
            A small crew. Real people behind every bud.
          </p>
        </div>

        {/* Group hero — clickable */}
        <button
          type="button"
          onClick={() => open(0)}
          className="block w-full max-w-5xl mx-auto mb-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A6A4F] rounded-2xl"
          aria-label="Open full crew photo"
        >
          <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-[#EAE6DE]/40 cursor-zoom-in">
            <Image
              src="/team-group-2026.jpg"
              alt="The full KD Genetics crew — Khant, Mr KD, Daniel, Kevin, Wai, Wee, Che"
              width={2400}
              height={1600}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </button>
        <p className="text-center text-[#6B6B6B]/80 text-[11px] font-light italic max-w-3xl mx-auto mb-14">
          {groupCaption}
        </p>

        {/* Four staff portraits — Mr KD and the founders are featured elsewhere */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {teamMembers.map((p, i) => (
            <button
              key={p.img}
              type="button"
              onClick={() => open(i + 1)}
              className="space-y-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5A6A4F] rounded-xl"
              aria-label={`Open photo of ${p.name}`}
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#EAE6DE]/40 cursor-zoom-in">
                <Image
                  src={p.img}
                  alt={p.name}
                  width={1200}
                  height={1600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-center text-[#1E1E1E] text-sm font-medium">
                {p.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {lightbox}
    </section>
  );
}
