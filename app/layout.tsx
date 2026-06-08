import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/lib/i18n";

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
  metadataBase: new URL("https://kdgenetics.org"),
  title: {
    default: "KD Genetics — Organic Cannabis Farm & Dispensary, Koh Tao",
    template: "%s | KD Genetics",
  },
  description:
    "Organic cannabis grown by hand on a family farm in Tanote Bay, Koh Tao. Sun-grown small batches, Jack Herer Cup 2019. Walk-in dispensary, open daily 10:00–19:00.",
  keywords: [
    "KD Genetics",
    "Koh Tao cannabis",
    "Koh Tao dispensary",
    "Tanote Bay cannabis",
    "organic cannabis Thailand",
    "craft cannabis Thailand",
    "sun grown cannabis",
    "Thai cannabis farm",
    "weed Koh Tao",
    "ganja Koh Tao",
    "Jack Herer Cup Thailand",
  ],
  authors: [{ name: "KD Genetics" }],
  creator: "KD Genetics",
  publisher: "KD Genetics",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["th_TH"],
    siteName: "KD Genetics",
    url: "https://kdgenetics.org",
    title: "KD Genetics — Organic Cannabis Farm & Dispensary, Koh Tao",
    description:
      "Organic cannabis grown by hand in Tanote Bay, Koh Tao. Sun-grown small batches, Jack Herer Cup 2019. Walk-in dispensary, daily 10:00–19:00.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "KD Genetics — Organic cannabis farm in Tanote Bay, Koh Tao",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KD Genetics — Organic Cannabis Farm & Dispensary, Koh Tao",
    description:
      "Organic cannabis grown by hand in Tanote Bay, Koh Tao. Sun-grown small batches, Jack Herer Cup 2019.",
    images: ["/opengraph.jpg"],
  },
  icons: {
    icon: "/kd-logo.png",
    shortcut: "/kd-logo.png",
    apple: "/kd-logo.png",
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#5A6A4F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <LanguageProvider>
          {children}
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
