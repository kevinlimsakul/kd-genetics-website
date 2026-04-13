import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KD Genetics — Born on Koh Tao, Grown in Living Soil",
    template: "%s | KD Genetics",
  },
  description:
    "A family-run craft cannabis farm on Koh Tao, Thailand. Living soil cultivation, preserved genetics, farm tours, and education. Founded by Aram, Kevin, and Daniel.",
  keywords: [
    "KD Genetics",
    "Koh Tao cannabis",
    "living soil cannabis Thailand",
    "farm tour Koh Tao",
    "craft cannabis Thailand",
    "Thai genetics cannabis",
    "cannabis dispensary Koh Tao",
    "organic cannabis farm",
  ],
  authors: [{ name: "KD Genetics" }],
  creator: "KD Genetics",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "KD Genetics",
    title: "KD Genetics — Born on Koh Tao, Grown in Living Soil",
    description:
      "A family-run craft cannabis farm on Koh Tao, Thailand. Living soil cultivation, preserved genetics, farm tours, and education.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "KD Genetics — Koh Tao Living Soil Farm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KD Genetics — Born on Koh Tao, Grown in Living Soil",
    description:
      "A family-run craft cannabis farm on Koh Tao, Thailand. Living soil cultivation, preserved genetics, farm tours, and education.",
    images: ["/opengraph.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
