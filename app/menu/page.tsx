import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowLeft, Leaf, Flame, Droplet, Sparkles, Shirt, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Menu — KD Genetics",
  description:
    "The full KD Genetics menu — flower, oils, hash, rosin, apparel. See the live lineup at the shop in Tanote Bay, Koh Tao.",
};

const sections = [
  {
    id: "flower",
    icon: <Leaf className="h-5 w-5" />,
    title: "Flower",
    line: "Sun-grown, living-soil cultivars from the KD farm and indoor friends.",
  },
  {
    id: "oils",
    icon: <Droplet className="h-5 w-5" />,
    title: "Oils",
    line: "Mr. KD's craft cannabis oils — traditional Thai extracts.",
  },
  {
    id: "hash",
    icon: <Flame className="h-5 w-5" />,
    title: "Hash",
    line: "Hand-washed and pressed on the farm. Small batch only.",
  },
  {
    id: "rosin",
    icon: <Sparkles className="h-5 w-5" />,
    title: "Rosin",
    line: "Solventless concentrate — heat and pressure, nothing else.",
  },
  {
    id: "apparel",
    icon: <Shirt className="h-5 w-5" />,
    title: "Apparel",
    line: "What we wear on the farm.",
  },
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav homeHref="/preview" />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 text-[#5A6A4F] text-[11px] font-medium uppercase tracking-[0.2em] mb-10"
          >
            <ArrowLeft className="h-3 w-3" /> Back to home
          </Link>

          <div className="space-y-4 mb-16">
            <span className="text-[#5A6A4F] font-medium text-[10px] uppercase tracking-[0.3em]">
              The Menu
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-[#1E1E1E] leading-tight">
              The full lineup.
            </h1>
            <p className="text-[#6B6B6B] text-base font-light max-w-xl">
              Live pricing and weekly availability lives at the shop.
              For deliveries, message us on WhatsApp.
            </p>
          </div>

          <div className="space-y-4">
            {sections.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="bg-white/60 border border-black/5 rounded-2xl p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-5">
                  <div className="text-[#5A6A4F] mt-0.5 shrink-0">{s.icon}</div>
                  <div className="flex-1 space-y-2">
                    <h2 className="font-display text-2xl md:text-3xl text-[#1E1E1E]">
                      {s.title}
                    </h2>
                    <p className="text-[#6B6B6B] text-sm font-light leading-relaxed">
                      {s.line}
                    </p>
                    <p className="text-[#6B6B6B]/60 text-[11px] font-light italic pt-2">
                      Detailed product page coming soon. WhatsApp us for what&rsquo;s in stock.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/66988268290"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5A6A4F] text-white hover:bg-[#5A6A4F]/90 rounded-full px-8 h-12 text-sm font-medium transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              Message us on WhatsApp
            </a>
            <Link
              href="/preview#visit"
              className="inline-flex items-center gap-2 border border-[#1E1E1E]/15 hover:border-[#5A6A4F] text-[#1E1E1E] rounded-full px-8 h-12 text-sm font-medium transition-all"
            >
              Visit the shop
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
