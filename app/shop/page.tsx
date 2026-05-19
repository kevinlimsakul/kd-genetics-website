import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "Shop — KD Genetics T-Shirts",
  description:
    "Shop KD Genetics tees — four cotton T-shirt designs hand-printed on Koh Tao. The Tanote Bay map, the KD seal, the Koh Tao wordmark.",
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
