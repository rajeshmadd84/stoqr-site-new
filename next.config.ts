import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/pilot",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
