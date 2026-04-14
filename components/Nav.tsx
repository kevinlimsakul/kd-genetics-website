"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavProps {
  activePage?: "home" | "products" | "shop";
}

export default function Nav({ activePage = "home" }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // On the home page, track whether we've scrolled past the hero
  const isHome = activePage === "home";

  useEffect(() => {
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.7 : 20;
      setScrolled(window.scrollY > threshold);
    };
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const scrollTo = (id: string) => {
    if (activePage !== "home") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // When on home and not yet scrolled past hero: glass over image → white text
  const isGlass = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#F6F4EF]/97 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-white/5 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className="mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-sm transition-all group-hover:scale-105 ${isGlass ? "bg-white border border-white/40" : "bg-white/10 border border-white/20"}`}>
              <Image
                src="/kd-logo.png"
                alt="KD Genetics"
                width={40}
                height={40}
                className="w-full h-full object-contain p-0.5"
                priority
              />
            </div>
            <span className={`font-display text-lg leading-none font-medium transition-colors duration-500 ${isGlass ? "text-white" : "text-[#1E1E1E]"}`}>
              KD Genetics
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 text-[13px] font-medium transition-colors duration-500 ${isGlass ? "text-white/80" : "text-[#1E1E1E]/70"}`}>
            <button
              onClick={() => scrollTo("story")}
              className={`transition-colors cursor-pointer ${isGlass ? "hover:text-white" : "hover:text-[#1E1E1E]"}`}
            >
              Story
            </button>
            <button
              onClick={() => scrollTo("philosophy")}
              className={`transition-colors cursor-pointer ${isGlass ? "hover:text-white" : "hover:text-[#1E1E1E]"}`}
            >
              Philosophy
            </button>
            <Link
              href="/products"
              className={`transition-colors ${
                activePage === "products"
                  ? isGlass ? "text-white border-b border-white pb-0.5" : "text-[#1E1E1E] border-b border-[#1E1E1E] pb-0.5"
                  : isGlass ? "hover:text-white" : "hover:text-[#1E1E1E]"
              }`}
            >
              Experience
            </Link>
            <Link
              href="/shop"
              className={`transition-colors ${
                activePage === "shop"
                  ? isGlass ? "text-white border-b border-white pb-0.5" : "text-[#1E1E1E] border-b border-[#1E1E1E] pb-0.5"
                  : isGlass ? "hover:text-white" : "hover:text-[#1E1E1E]"
              }`}
            >
              Shop
            </Link>
            <button
              onClick={() => scrollTo("gallery")}
              className={`transition-colors cursor-pointer ${isGlass ? "hover:text-white" : "hover:text-[#1E1E1E]"}`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollTo("visit")}
              className={`transition-colors cursor-pointer ${isGlass ? "hover:text-white" : "hover:text-[#1E1E1E]"}`}
            >
              Visit
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className={`transition-colors cursor-pointer ${isGlass ? "hover:text-white" : "hover:text-[#1E1E1E]"}`}
            >
              Contact
            </button>
            <button
              onClick={() => scrollTo("tour")}
              className={`ml-2 rounded-full px-6 h-9 text-xs font-semibold tracking-wide transition-all border ${
                isGlass
                  ? "border-white/40 text-white hover:bg-white hover:text-[#1E1E1E]"
                  : "border-[#5A6A4F] text-[#5A6A4F] hover:bg-[#5A6A4F] hover:text-white"
              }`}
            >
              Book Tour
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px transition-all duration-300 ${isGlass ? "bg-white" : "bg-[#1E1E1E]"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${isGlass ? "bg-white" : "bg-[#1E1E1E]"} ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px transition-all duration-300 ${isGlass ? "bg-white" : "bg-[#1E1E1E]"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#F6F4EF] border-t border-black/5 px-8 py-6 space-y-5">
            {[
              { label: "Story", action: () => scrollTo("story") },
              { label: "Philosophy", action: () => scrollTo("philosophy") },
              { label: "Gallery", action: () => scrollTo("gallery") },
              { label: "Visit", action: () => scrollTo("visit") },
              { label: "Contact", action: () => scrollTo("contact") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="block w-full text-left text-primary/70 hover:text-primary text-sm font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/products"
              className="block text-primary/70 hover:text-primary text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Experience
            </Link>
            <Link
              href="/shop"
              className="block text-primary/70 hover:text-primary text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </Link>
            <button
              onClick={() => scrollTo("tour")}
              className="w-full border border-accent text-accent hover:bg-accent hover:text-white rounded-full px-6 h-10 text-xs font-semibold tracking-wide transition-all mt-2"
            >
              Book Tour
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
