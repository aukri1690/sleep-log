import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
