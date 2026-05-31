"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Fixed bottom-right button. Hidden until the user scrolls past ~600px,
// then fades in. Click smooth-scrolls back to the top.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#5A6A4F] text-white shadow-[0_8px_24px_-10px_rgba(90,106,79,0.5)] backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:bg-[#5A6A4F]/90 hover:scale-105 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}
