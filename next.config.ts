import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Radix and Lucide named imports hit indexes that re-export more than any page
     * renders. Next already optimizes lucide-react by default; listing it
     * keeps the set explicit alongside Radix.
     */
    optimizePackageImports: ["radix-ui", "lucide-react"],
  },
};

export default nextConfig;
