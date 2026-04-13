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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (activePage !== "home") {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F6F4EF]/97 backdrop-blur-md border-b border-black/5 shadow-sm"
            : "bg-[#F6F4EF]/95 backdrop-blur-md border-b border-black/5"
        }`}
      >
        <div className="mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-black/5 overflow-hidden bg-white flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/kd-logo.png"
                alt="KD Genetics"
                width={40}
                height={40}
                className="w-full h-full object-contain p-1"
                priority
              />
            </div>
            <span className="font-display text-lg text-primary leading-none font-medium">
              KD Genetics
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-primary/70">
            <button
              onClick={() => scrollTo("story")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Story
            </button>
            <button
              onClick={() => scrollTo("philosophy")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Philosophy
            </button>
            <Link
              href="/products"
              className={`transition-colors ${
                activePage === "products"
                  ? "text-primary border-b border-primary pb-0.5"
                  : "hover:text-primary"
              }`}
            >
              Experience
            </Link>
            <Link
              href="/shop"
              className={`transition-colors ${
                activePage === "shop"
                  ? "text-primary border-b border-primary pb-0.5"
                  : "hover:text-primary"
              }`}
            >
              Shop
            </Link>
            <button
              onClick={() => scrollTo("gallery")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollTo("visit")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Visit
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              onClick={() => scrollTo("tour")}
              className="ml-2 border border-accent text-accent hover:bg-accent hover:text-white rounded-full px-6 h-9 text-xs font-semibold tracking-wide transition-all"
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
              className={`block w-5 h-px bg-primary transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-primary transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-px bg-primary transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
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
