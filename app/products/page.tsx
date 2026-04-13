import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Leaf, Shirt, Droplets, Microscope, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience & Products",
  description:
    "Explore KD Genetics' product collection — craft cannabis flowers, herbal oils, cultivar library, apparel, and immersive farm experiences on Koh Tao, Thailand.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav activePage="products" />

      <div className="pt-32">
        {/* Header */}
        <section className="container mx-auto px-6 mb-24 max-w-5xl">
          <div className="max-w-3xl space-y-6">
            <span className="text-[#5A6A4F] font-bold text-[10px] uppercase tracking-[0.3em]">
              The Library
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-[#1E1E1E]">
              Crafted with Intent.
            </h1>
            <p className="text-xl text-[#6B6B6B] font-light leading-relaxed max-w-2xl">
              Our collection is a reflection of Koh Tao&apos;s unique ecosystem.
              From living soil genetics to mindful extracts and community-driven
              apparel, every piece tells a story of heritage and respect for the
              plant.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-6 space-y-32 mb-32 max-w-5xl">

          {/* A — Apparel */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-[#5A6A4F]">
                <Shirt className="h-6 w-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Category A
                </span>
              </div>
              <h2 className="font-display text-4xl text-[#1E1E1E]">
                Apparel & Merchandise
              </h2>
              <p className="text-[#6B6B6B] font-light leading-relaxed">
                More than just clothing, our merchandise is a symbol of our
                community. Featuring four distinct KD Genetics T-shirt designs
                and limited-edition pieces, each item is crafted to reflect our
                identity and the slow-paced island lifestyle we cherish.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[#5A6A4F] hover:text-[#5A6A4F]/80 text-sm font-medium transition-colors"
              >
                Browse the shop <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-[4/5] bg-[#EAE6DE]/40 rounded-2xl overflow-hidden relative group border border-black/5">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-8 left-8 text-[#1E1E1E]/40 text-[10px] font-bold uppercase tracking-widest">
                Identity · Community · Lifestyle
              </div>
            </div>
          </div>

          {/* B — Herbal Oils */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 aspect-[4/5] bg-[#EAE6DE]/30 rounded-2xl overflow-hidden relative border border-black/5">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Droplets className="h-32 w-32" />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="flex items-center gap-4 text-[#5A6A4F]">
                <Droplets className="h-6 w-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Category B
                </span>
              </div>
              <h2 className="font-display text-4xl text-[#1E1E1E]">
                Herbal Oils
              </h2>
              <p className="text-[#6B6B6B] font-light leading-relaxed">
                Our crafted cannabis oils are positioned for wellness and
                mindfulness. Rooted in traditional Thai knowledge and modern
                extraction cleanliness, these oils represent the bridge between
                heritage and health.
              </p>
              <div className="p-6 bg-[#5A6A4F]/5 border border-[#5A6A4F]/10 rounded-xl">
                <p className="text-sm text-[#1E1E1E]/80 italic font-medium">
                  &quot;Available at our Koh Tao location. Please contact us for
                  details.&quot;
                </p>
              </div>
            </div>
          </div>

          {/* C — Cultivar Library */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-[#5A6A4F]">
                <Microscope className="h-6 w-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Category C
                </span>
              </div>
              <h2 className="font-display text-4xl text-[#1E1E1E]">
                Cultivar Library
              </h2>
              <p className="text-[#6B6B6B] font-light leading-relaxed">
                An informational gallery of our selected flowers and small-batch
                extracts. Each cultivar is a testament to our living soil
                philosophy, preserved and developed to showcase the best of Thai
                genetics.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { src: "/flower-macro-1.jpg", alt: "Craft flower 1" },
                  { src: "/flower-macro-2.jpg", alt: "Craft flower 2" },
                  { src: "/strain-bud_1.jpg", alt: "Strain bud" },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl overflow-hidden border border-black/5"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="p-6 bg-[#1E1E1E]/5 border border-black/5 rounded-xl">
                <p className="text-sm text-[#1E1E1E]/60 italic">
                  &quot;Available in-store upon request. Subject to Thai
                  regulations.&quot;
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] bg-[#EAE6DE]/30 rounded-2xl overflow-hidden relative border border-black/5">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Leaf className="h-32 w-32" />
              </div>
            </div>
          </div>

          {/* D — Farm Experiences */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 aspect-[16/9] lg:aspect-square bg-[#1E1E1E] rounded-2xl overflow-hidden relative p-12 flex flex-col justify-end text-white">
              <Image
                src="/koh-tao-farm.png"
                alt="Farm experience"
                fill
                className="object-cover opacity-40"
              />
              <div className="relative space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">
                  Living Soil Philosophy
                </p>
                <h3 className="font-display text-3xl text-white">
                  Slow down and connect with nature.
                </h3>
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <div className="flex items-center gap-4 text-[#5A6A4F]">
                <MapPin className="h-6 w-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Category D
                </span>
              </div>
              <h2 className="font-display text-4xl text-[#1E1E1E]">
                Farm Experiences
              </h2>
              <p className="text-[#6B6B6B] font-light leading-relaxed">
                We invite you to step into our space and witness the full cycle
                of growth. Our Farm Tour is an educational journey through our
                permaculture gardens, where microbes, sunlight, and family
                tradition meet.
              </p>
              <a
                href="/#tour"
                className="inline-flex items-center gap-2 border border-[#1E1E1E]/20 hover:bg-[#1E1E1E]/5 rounded-full px-8 h-12 text-sm font-medium transition-all"
              >
                Book a Tour <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-[#EAE6DE]/30 border-t border-black/5">
          <div className="container mx-auto px-6 text-center space-y-12">
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl text-[#1E1E1E]">
                Experience it in Person
              </h2>
              <p className="text-[#6B6B6B] max-w-xl mx-auto font-light">
                Our products are exclusively available at our Koh Tao sanctuary.
                Visit us to explore the full collection and feel the living soil
                difference.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#visit"
                className="bg-[#1E1E1E] text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl hover:bg-[#1E1E1E]/90 transition-all flex items-center justify-center"
              >
                Visit the Space
              </a>
              <a
                href="/#contact"
                className="border border-black/10 rounded-full px-12 h-16 text-lg font-bold hover:bg-white transition-all flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
