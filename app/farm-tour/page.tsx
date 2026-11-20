import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FarmTourSection from "@/components/FarmTourSection";
import { TOUR_PRICES } from "@/lib/tour";

// Farm Tour lives on its own route (linked from the top nav) rather than on the
// homepage, so the landing page stays short. kdtours.tours is retired; this is
// the single home for the tour offer + booking.
//
// SEO (Nov 2026): title/description target "Koh Tao farm tour" and "things to
// do in Koh Tao"; JSON-LD TouristTrip with both packages as offers.
const TITLE = "Koh Tao Farm Tour: Walk a Family Cannabis Farm in Tanote Bay";
const DESCRIPTION =
  "One of the best things to do on Koh Tao: a guided 90-minute walk through the island's only working cannabis farm, with the family who grows it. Fridays at 4:20 pm or on request. Standard 1,250 THB, VIP 2,500 THB.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Koh Tao farm tour",
    "things to do Koh Tao",
    "Koh Tao cannabis farm",
    "Koh Tao activities",
    "Tanote Bay",
    "cannabis farm tour Thailand",
  ],
  alternates: { canonical: "/farm-tour" },
  openGraph: {
    type: "website",
    url: "https://kdgenetics.org/farm-tour",
    siteName: "KD Genetics",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/tour-hero.jpg",
        width: 2400,
        height: 1600,
        alt: "Papa KD walking the hillside cannabis garden above the sea on Koh Tao",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/tour-hero.jpg"],
  },
};

const TOUR_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TouristTrip",
      "@id": "https://kdgenetics.org/farm-tour#tour",
      name: "KD Genetics Farm Tour",
      description: DESCRIPTION,
      url: "https://kdgenetics.org/farm-tour",
      image: "https://kdgenetics.org/tour-hero.jpg",
      touristType: ["Nature lovers", "Sustainability", "Culture"],
      provider: { "@id": "https://kdgenetics.org/#store" },
      itinerary: {
        "@type": "ItemList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Welcome tea and founder story at the shop" },
          { "@type": "ListItem", position: 2, name: "Greenhouses and hillside garden above the sea" },
          { "@type": "ListItem", position: 3, name: "Seed to harvest: sun, compost, worms and chickens" },
          { "@type": "ListItem", position: 4, name: "Q&A with the family" },
        ],
      },
      offers: [
        {
          "@type": "Offer",
          name: "Standard",
          price: TOUR_PRICES.standard,
          priceCurrency: "THB",
          availability: "https://schema.org/InStock",
          url: "https://kdgenetics.org/farm-tour#tour-booking",
        },
        {
          "@type": "Offer",
          name: "VIP",
          price: TOUR_PRICES.vip,
          priceCurrency: "THB",
          availability: "https://schema.org/InStock",
          url: "https://kdgenetics.org/farm-tour#tour-booking",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "KD Genetics", item: "https://kdgenetics.org/" },
        { "@type": "ListItem", position: 2, name: "Farm Tour", item: "https://kdgenetics.org/farm-tour" },
      ],
    },
  ],
};

export default function FarmTourPage() {
  return (
    <div className="min-h-screen bg-[#F6F4EF]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(TOUR_STRUCTURED_DATA) }}
      />
      <Nav activePage="tour" homeHref="/" />
      <FarmTourSection />
      <Footer homeHref="/" />
    </div>
  );
}
