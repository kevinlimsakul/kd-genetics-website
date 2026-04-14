import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "KD Genetics | Coming Soon",
  description: "Premium organic craft cannabis from Koh Tao, Thailand. Something special is coming.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1E1E1E] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[#1E1E1E]" />

      <div className="relative z-10 space-y-8 max-w-lg">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white flex items-center justify-center">
            <Image
              src="/kd-logo.png"
              alt="KD Genetics"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Brand name */}
        <div className="space-y-2">
          <h1 className="font-display text-4xl md:text-5xl text-white font-light tracking-wide">
            KD Genetics
          </h1>
          <p className="text-[#5A6A4F] text-[11px] uppercase tracking-[0.3em] font-medium">
            Koh Tao, Thailand
          </p>
        </div>

        {/* Message */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <p className="text-white/60 text-base font-light leading-relaxed">
            Something is growing here.
          </p>
          <p className="text-white/30 text-sm font-light">
            Our new home is almost ready. Come back soon.
          </p>
        </div>

        {/* Contact */}
        <p className="text-white/20 text-xs font-light pt-4">
          In the meantime, reach us on WhatsApp or Instagram{" "}
          <span className="text-[#5A6A4F]">@kdgenetics</span>
        </p>
      </div>
    </main>
  );
}
