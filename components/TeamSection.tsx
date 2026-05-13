"use client";

import Image from "next/image";
import { useLightbox } from "./Lightbox";

const founders = [
  {
    name: "Kevin",
    role: "Vision & Operations",
    bio: "Papa's son. Carries the legacy forward — structure, direction, the next chapter.",
    img: "/founder-kevin-may2026.jpg",
  },
  {
    name: "Daniel",
    role: "Cultivation & Horticulture",
    bio: "Kevin's closest friend since day one. Horticultural scientist. Hands on every plant.",
    img: "/founder-daniel-2026.jpg",
  },
];

const teamMembers = [
  { img: "/team-1.jpg", name: "Wai" },
  { img: "/team-2.jpg", name: "Khant" },
  { img: "/team-wee.jpg", name: "Wee" },
  { img: "/team-che.jpg", name: "Che" },
];

const groupCaption =
  "The full crew, left to right — Khant, Mr KD, Daniel, Kevin, Wai, Wee, Che.";

export default function TeamSection() {
  const photos = [
    { label: groupCaption, img: "/team-group-2026.jpg" },
    ...teamMembers.map((m) => ({ label: m.name, img: m.img })),
  ];
  const { open, lightbox } = useLightbox(photos);

  return (
    <section id="next-generation" className="py-32 bg-[#EAE6DE]/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20 max-w-xl mx-auto space-y-3">
          <span className="text-[#5A6A4F] font-medium text-xs uppercase tracking-[0.3em]">
            Family. Friends. Crew.
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E] leading-tight">
            Papa KD leads. We follow.
          </h2>
          <p className="text-[#6B6B6B] text-base font-light">
            The hands on every plant.
          </p>
        </div>

        {/* Founders — Kevin + Daniel */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-20">
          {founders.map((p) => (
            <div key={p.name} className="space-y-5 group text-center">
              <div className="aspect-square rounded-2xl overflow-hidden border border-black/5 bg-[#EAE6DE]/40 max-w-[340px] mx-auto">
                <Image
                  src={p.img}
                  alt={p.name}
                  width={340}
                  height={340}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl text-[#1E1E1E]">{p.name}</h3>
                <p className="text-[#5A6A4F]/70 text-xs font-medium uppercase tracking-[0.15em]">
                  {p.role}
                </p>
                <p className="text-[#6B6B6B] text-sm font-light leading-relaxed max-w-sm mx-auto">
                  {p.bio}
                </p>
              </div>
            </div>
          ))}
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

        {/* Four staff portraits */}
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
