import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Speed up compilation and rendering by optimizing heavy imports
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "date-fns",
      "@anthropic-ai/sdk",
    ],
  },
  poweredByHeader: false,
  // Fast compilation logging
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
