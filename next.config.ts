import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpiler le client Prisma généré
  transpilePackages: ["@prisma/client"],
  // Résoudre les extensions .js vers .ts pour Prisma 7
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
      ".cjs": [".cts", ".cjs"],
    };
    return config;
  },
};

export default nextConfig;
