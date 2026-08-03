import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FarmTourSection from "@/components/FarmTourSection";

// Farm Tour lives on its own route (linked from the top nav) rather than on the
// homepage, so the landing page stays short. kdtours.tours is retired; this is
// the single home for the tour offer + booking.
export const metadata: Metadata = {
  title: "Farm Tour — KD Genetics",
  description:
    "A guided farm tour on Koh Tao's only operating cannabis farm. Seed to harvest, organic cultivation, terpene education. Standard and VIP packages, by appointment.",
};

export default function FarmTourPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      <Nav activePage="tour" homeHref="/" />
      <FarmTourSection />
      <Footer homeHref="/" />
    </div>
  );
}
