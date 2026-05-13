import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, MapPin } from "lucide-react";

export default function Footer({ homeHref = "/" }: { homeHref?: string }) {
  return (
    <footer className="bg-[#1E1E1E] text-white/60 py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src="/kd-logo.png"
                  alt="KD Genetics"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain p-0"
                />
              </div>
              <span className="font-display text-lg text-white font-medium">
                KD Genetics
              </span>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs text-white/50">
              Born on Koh Tao. Grown in living soil. Built by family.
            </p>
            <p className="text-xs text-white/30 font-light leading-relaxed">
              A family-run craft cannabis farm and dispensary in Tanote Bay, Koh
              Tao, Thailand.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com/kdgenetics"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/kdgenetics"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Navigate
            </p>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href={`${homeHref}#story`} className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href={`${homeHref}#philosophy`}
                  className="hover:text-white transition-colors"
                >
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href={`${homeHref}#tour`} className="hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href={`${homeHref}#visit`} className="hover:text-white transition-colors">
                  Visit Us
                </Link>
              </li>
              <li>
                <Link href={`${homeHref}#tour`} className="hover:text-white transition-colors">
                  Book a Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              Visit
            </p>
            <div className="space-y-3 text-sm font-light">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-white/50 leading-relaxed">
                  40/5 Moo 3, Tanote Bay,
                  <br />
                  Koh Tao, Surat Thani
                  <br />
                  Thailand 84360
                </p>
              </div>
              <p className="text-white/50">Mon–Sun: 10:00–19:00</p>
              <a
                href="https://wa.me/66988268290"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors font-medium text-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 font-light">
            © {new Date().getFullYear()} KD Genetics. All rights reserved. · 21+
            only · For adults only
          </p>
          <p className="text-[11px] text-white/20 font-light">
            Koh Tao, Surat Thani, Thailand
          </p>
        </div>
      </div>
    </footer>
  );
}
