import type { NextConfig } from "next";

import stylexOptions from "./stylex.config.cjs";
const stylexLoader = {
  loader: "babel-loader",
  options: {
    babelrc: false,
    configFile: false,
    plugins: [["@stylexjs/babel-plugin", stylexOptions]],
  },
};
const nextConfig: NextConfig = {
  turbopack: { rules: { "*.stylex.js": { loaders: [stylexLoader], as: "*.js" } } },
  webpack(config) {
    config.module.rules.push({ test: /\.stylex\.js$/, use: [stylexLoader] });
    return config;
  },
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
