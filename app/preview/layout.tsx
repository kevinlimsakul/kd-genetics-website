import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KD Genetics: Sun-Grown. Family-Grown. Island-Grown.",
  description:
    "A family-run craft cannabis farm on Koh Tao. All organic, sun-grown, small batch. Home of Papa KD, winner of the Jack Herer Cup (2019). Dispensary in Tanote Bay.",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
