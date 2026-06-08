import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu — KD Genetics",
  description:
    "The full KD Genetics menu — flower, oils, hash, rosin, apparel. See the live lineup at the shop in Tanote Bay, Koh Tao.",
};

export default function MenuPage() {
  return <MenuClient />;
}
