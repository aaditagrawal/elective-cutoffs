import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    /**
     * Barrel packages: `import { Select } from "radix-ui"` and Base UI /
     * Lucide named imports hit indexes that re-export far more than any page
     * renders. Next already optimizes lucide-react by default; listing it
     * keeps the set explicit alongside the two that are not in that list.
     */
    optimizePackageImports: ["radix-ui", "@base-ui/react", "lucide-react"],
  },
};

export default nextConfig;
