import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "KD Genetics | Coming Soon",
  description: "Premium organic craft cannabis from Koh Tao, Thailand. Something special is coming.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">

      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <Image
          src="/flower-macro-1.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.13]"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,#0D0D0D_80%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Logo — circular seal, clipped tight */}
        <div className="w-[110px] h-[110px] rounded-full overflow-hidden mb-10">
          <Image
            src="/kd-logo.png"
            alt="KD Genetics"
            width={110}
            height={110}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Location tag */}
        <p className="text-[#5A6A4F] text-[9px] uppercase tracking-[0.55em] mb-7">
          Koh Tao &nbsp;·&nbsp; Thailand
        </p>

        {/* Brand name */}
        <h1 className="font-display text-[54px] md:text-[76px] text-white font-light leading-none tracking-wide mb-8">
          KD Genetics
        </h1>

        {/* Divider */}
        <div className="flex items-center gap-3 w-44 mb-9">
          <div className="flex-1 h-px bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#5A6A4F]" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Copy */}
        <p className="text-white/40 text-[15px] font-light tracking-wider leading-loose mb-2">
          Something is growing here.
        </p>
        <p className="text-white/20 text-sm font-light tracking-wide mb-16">
          Our new home is almost ready.
        </p>

        {/* Social */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/15 text-[9px] uppercase tracking-[0.4em]">
            Follow the journey
          </p>
          <p className="text-[#5A6A4F] text-xs tracking-[0.25em] font-medium">
            @kdgenetics
          </p>
        </div>

      </div>
    </main>
  );
}
