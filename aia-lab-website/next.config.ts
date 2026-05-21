import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
