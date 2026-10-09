import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

const lab = "./.design-lab/lab/index.ts";
const labStub = "./.design-lab/stub.tsx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/:lang(en|de)/archive/:slug",
        destination: "/:lang/work/:slug",
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: { bodySizeLimit: "8mb" },
    optimizePackageImports: ["gsap", "@gsap/react", "react-icons", "lenis"],
  },
  turbopack: {
    resolveAlias: {
      "design-lab": existsSync(join(process.cwd(), lab)) ? lab : labStub,
    },
  },
};

export default nextConfig;
