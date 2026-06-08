import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/preview", "/preview/", "/api/", "/order-confirmation"],
      },
    ],
    sitemap: "https://kdgenetics.org/sitemap.xml",
    host: "https://kdgenetics.org",
  };
}
