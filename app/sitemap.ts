import type { MetadataRoute } from "next";

const SITE = "https://kdgenetics.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`,     lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/shop`, lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/menu`, lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
  ];
}
