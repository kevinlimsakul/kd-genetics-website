import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopClient from "@/components/ShopClient";

export const metadata: Metadata = {
  title: "KD Merch — KD Genetics",
  description:
    "KD Genetics merch — four cotton tees hand-printed on Koh Tao plus the KD sticker pack. The Tanote Bay map, the KD seal, the Koh Tao wordmark.",
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
