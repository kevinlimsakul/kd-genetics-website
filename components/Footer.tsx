"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const socialIconClass =
  "w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-all";

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.057 2C6.553 2 2.083 6.47 2.083 11.974c0 1.764.46 3.484 1.336 5.001L2 22l5.13-1.345a9.93 9.93 0 0 0 4.93 1.256h.004c5.504 0 9.974-4.47 9.974-9.973 0-2.665-1.037-5.171-2.92-7.054A9.916 9.916 0 0 0 12.057 2zm0 18.185h-.004a8.28 8.28 0 0 1-4.21-1.151l-.302-.179-3.13.82.835-3.052-.197-.314a8.262 8.262 0 0 1-1.266-4.387c0-4.566 3.717-8.283 8.28-8.283 2.211 0 4.29.864 5.851 2.428a8.232 8.232 0 0 1 2.421 5.858c-.002 4.566-3.719 8.26-8.278 8.26z" />
    </svg>
  );
}

function LineIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

export default function Footer({ homeHref = "/" }: { homeHref?: string }) {
  const { t } = useLanguage();
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
              {t("footer.tagline")}
            </p>
            <p className="text-xs text-white/30 font-light leading-relaxed">
              {t("footer.about")}
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="mailto:kd.kohtao@gmail.com"
                className={socialIconClass}
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/kdgenetics"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/66988268290"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href="https://line.me/R/ti/p/%40kdgenetics"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="LINE Official Account"
              >
                <LineIcon />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              {t("footer.navigate")}
            </p>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link href={`${homeHref}#story`} className="hover:text-white transition-colors">
                  {t("footer.nav.story")}
                </Link>
              </li>
              <li>
                <Link href={`${homeHref}#gallery`} className="hover:text-white transition-colors">
                  {t("footer.nav.gallery")}
                </Link>
              </li>
              <li>
                <Link href={`${homeHref}#visit`} className="hover:text-white transition-colors">
                  {t("footer.nav.visit")}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  {t("footer.nav.shop")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Visit */}
          <div className="space-y-4">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
              {t("footer.visit.label")}
            </p>
            <div className="space-y-3 text-sm font-light">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-white/50 leading-relaxed">
                  {t("footer.visit.addr1")}
                  <br />
                  {t("footer.visit.addr2")}
                  <br />
                  {t("footer.visit.addr3")}
                </p>
              </div>
              <p className="text-white/50">{t("footer.visit.hours")}</p>
              <a
                href="https://wa.me/66988268290"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-colors font-medium text-sm"
              >
                {t("footer.visit.whatsapp")}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25 font-light">
            {t("footer.legal", { year: new Date().getFullYear() })}
          </p>
          <p className="text-[11px] text-white/20 font-light">
            {t("footer.location")}
          </p>
        </div>
      </div>
    </footer>
  );
}
