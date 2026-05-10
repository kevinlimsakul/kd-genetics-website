"use client";

import { useEffect, useRef } from "react";

/**
 * Hero video that reliably autoplays muted across browsers.
 *
 * React's SSR sometimes drops the `muted` attribute on <video>, which makes
 * Safari refuse to autoplay. We force `muted` after mount and trigger play()
 * explicitly, retrying once after canplay if the first attempt is rejected.
 */
export default function HeroVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

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

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disableRemotePlayback
      className={className}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
