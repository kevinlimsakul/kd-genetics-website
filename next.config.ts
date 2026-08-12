import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Farm Tour is hidden until booking is ready. The page + booking form still
  // live at app/farm-tour + components/FarmTourSection.tsx; this temporary
  // redirect just keeps customers off the non-functional booking (nav link is
  // also removed). Delete this redirect to bring the tour back online.
  async redirects() {
    return [
      { source: "/farm-tour", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
