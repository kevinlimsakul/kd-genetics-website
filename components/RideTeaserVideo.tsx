"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Hero-style autoplay loop for the "Take the ride" teaser in the Visit section.
 *
 * Designed to be wired in BEFORE the .mp4 exists:
 *   - If `src` is provided AND the file is reachable, it plays the loop.
 *   - If the load fails (e.g. /ride-loop.mp4 isn't uploaded yet), it gracefully
 *     falls back to the poster image with a subtle Ken Burns motion + a small
 *     "video coming soon" caption.
 *
 * Drop /public/ride-loop.mp4 to activate the live video — no code changes.
 */
export default function RideTeaserVideo({
  src = "/ride-loop.mp4",
  poster,
  caption,
  placeholderText,
  className = "",
}: {
  src?: string;
  poster: string;
  caption?: string;
  placeholderText?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || videoFailed) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    const onCanPlay = () => tryPlay();
    v.addEventListener("canplay", onCanPlay);
    return () => v.removeEventListener("canplay", onCanPlay);
  }, [videoFailed]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <style jsx>{`
        @keyframes rideKB {
          0%   { transform: scale(1.05) translate3d(0, 0, 0); }
          100% { transform: scale(1.18) translate3d(-2%, -1%, 0); }
        }
        .ride-kb {
          animation: rideKB 14s ease-out infinite alternate;
        }
      `}</style>

      {videoFailed ? (
        <div className="absolute inset-0 ride-kb">
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
            priority={false}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disableRemotePlayback
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Soft bottom gradient for caption legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em]">
          {caption}
        </div>
      )}

      {/* "Coming soon" hint — only visible when video failed/missing */}
      {videoFailed && placeholderText && (
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md text-[#1E1E1E]/75 text-[9px] font-medium tracking-[0.2em] uppercase">
          {placeholderText}
        </div>
      )}
    </div>
  );
}
