import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop — KD Genetics Merchandise",
  description:
    "Shop KD Genetics merchandise — organic cotton T-shirts, caps, tote bags, and stickers. Crafted on Koh Tao with the spirit of the island.",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1E1E1E]">
      <Nav activePage="shop" />
      <ShopClient />
      <Footer />
    </div>
  );
}
