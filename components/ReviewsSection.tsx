"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ExternalLink } from "lucide-react";

const reviews = [
  {
    text: "I had a great experience visiting KD Genetics in Tanote Bay. You can truly feel the passion and experience behind this place — it's not just a dispensary, but a long-standing organic cannabis farm with real history on the island. The team is welcoming and knowledgeable, happy to explain everything and answer questions.",
    author: "The Architect",
    location: "Local Guide",
    date: "February 2026",
  },
  {
    text: "Such a chill spot! Amazing owner and team — real professionals who know what they're doing. Perfect atmosphere to smoke, work, or hang out and play.",
    author: "Andrey Frolov",
    location: "Local Guide",
    date: "November 2025",
  },
  {
    text: "Visiting KD Genetics is an amazing experience. I have revisited many times since. KD himself is a wonderfully welcoming man who loves to educate visitors and show them around his garden. Kevin is also amazing and will welcome you back again and again. You truly feel at home when you visit. At no point do you feel rushed.",
    author: "Andy Hampshire",
    location: "Local Guide",
    date: "April 2025",
  },
  {
    text: "KD is the nicest and most knowledgeable person. My brother and I ran into his shop after going to the beach to snorkel and were blown away by the authentic cannabis and hospitality.",
    author: "Jace Marshall",
    location: "Google Review",
    date: "September 2025",
  },
  {
    text: "Really nice place to visit! They are incredibly passionate about growing, welcoming and we got a walk around the farm and the shop. Beautiful place overlooking Tanote Bay. Awesome to learn about the history and the cultural meaning.",
    author: "Håkan Theba",
    location: "Google Review",
    date: "November 2025",
  },
];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);

  const getVisible = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(reviews[(index + i) % reviews.length]);
    }
    return result;
  };

  const prev = () => setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  const visible = getVisible();

  return (
    <section id="reviews" className="py-36 bg-[#F6F4EF]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16 space-y-6">
          <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
            Google Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
            What Visitors Say
          </h2>
          <p className="text-[#6B6B6B] text-base font-light max-w-lg mx-auto leading-relaxed">
            Experiences shared by guests who visited KD Genetics on Koh Tao.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-[#C8A96A] text-[#C8A96A] h-4 w-4" />
              ))}
            </div>
            <span className="text-[#1E1E1E] font-display text-lg">5.0</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={prev}
            aria-label="Previous Review"
            className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-black/[0.08] flex items-center justify-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:scale-105 transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4 text-[#1E1E1E]" />
          </button>

          {/* Desktop: 3 reviews */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {visible.map((review, i) => (
              <div
                key={`${index}-${i}`}
                className="bg-white/50 border border-black/[0.04] p-8 rounded-2xl text-left space-y-5"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="fill-[#C8A96A] text-[#C8A96A] h-3.5 w-3.5" />
                  ))}
                </div>
                <p className="text-[#1E1E1E]/80 text-[15px] leading-[1.8] font-light">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="pt-5 border-t border-black/[0.04] space-y-2.5">
                  <p className="text-[#1E1E1E] text-sm font-medium">{review.author}</p>
                  <p className="text-[#6B6B6B]/50 text-[11px] font-light">
                    {review.location} · {review.date}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-[#6B6B6B]/40 bg-black/[0.02] border border-black/[0.04] px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="h-2.5 w-2.5" /> Verified Google Review
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: 1 review */}
          <div className="md:hidden px-10">
            <div className="bg-white/50 border border-black/[0.04] p-8 rounded-2xl text-left space-y-5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="fill-[#C8A96A] text-[#C8A96A] h-3.5 w-3.5" />
                ))}
              </div>
              <p className="text-[#1E1E1E]/80 text-[15px] leading-[1.8] font-light">
                &ldquo;{reviews[index].text}&rdquo;
              </p>
              <div className="pt-5 border-t border-black/[0.04] space-y-2.5">
                <p className="text-[#1E1E1E] text-sm font-medium">{reviews[index].author}</p>
                <p className="text-[#6B6B6B]/50 text-[11px] font-light">
                  {reviews[index].location} · {reviews[index].date}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Next Review"
            className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-black/[0.08] flex items-center justify-center cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.08)] hover:scale-105 transition-all duration-200"
          >
            <ChevronRight className="h-4 w-4 text-[#1E1E1E]" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === index ? "bg-[#1E1E1E]/50" : "bg-[#1E1E1E]/10"
              }`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://maps.app.goo.gl/DwiYaDtvsqkoTsdS9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#1E1E1E]/15 text-[#1E1E1E]/70 hover:text-[#5A6A4F] hover:border-[#5A6A4F]/20 rounded-full px-8 h-11 text-sm font-medium transition-colors"
          >
            Read More Reviews on Google <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
