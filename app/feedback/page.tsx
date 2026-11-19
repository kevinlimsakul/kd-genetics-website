import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import TourFeedbackHeader from "@/components/TourFeedbackHeader";
import TourFeedbackForm from "@/components/TourFeedbackForm";

// Anonymous post-tour feedback. Reached via the QR card at the end of the
// tour or Kevin's WhatsApp message; not linked in the nav, not indexed.
export const metadata: Metadata = {
  title: { absolute: "Tour Feedback | KD Genetics" },
  description: "Tell us how your KD Genetics farm tour went. Anonymous, two minutes.",
  alternates: { canonical: "/feedback" },
  robots: { index: false, follow: false },
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      <Nav activePage="tour" homeHref="/" />
      <main className="container mx-auto px-4 sm:px-6 max-w-xl pt-32 pb-24">
        <TourFeedbackHeader />
        <TourFeedbackForm />
      </main>
      <Footer homeHref="/" />
    </div>
  );
}
