import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "KD Genetics: Sun-Grown. Family-Grown. Island-Grown.",
  description:
    "A family-run craft cannabis farm on Koh Tao. All organic, sun-grown, small batch. Home of Papa KD, first Thai winner of the Jack Herer Cup (2019). Farm tours and dispensary in Tanote Bay.",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
