/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/manan.dev",
  assetPrefix: "/manan.dev/",
  trailingSlash: true, // Crucial for GitHub Pages routing
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/manan.dev",
  },
};

export default nextConfig;