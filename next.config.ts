import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // kdgenetics.org/tour is the URL printed on signs/posters and encoded in the
  // QR codes. It drops the guest straight onto prices + booking form, tagged
  // src=qr so poster bookings show up as "via QR code" in Airtable. Keep this
  // path stable forever: printed QR codes can't be updated.
  async redirects() {
    return [
      { source: "/tour", destination: "/farm-tour?src=qr#book", permanent: false },
    ];
  },
};

export default nextConfig;
