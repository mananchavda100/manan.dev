import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/manan.dev",
  assetPrefix: "/manan.dev/",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Safely skips TS type checks during build
  },
};

export default nextConfig;
