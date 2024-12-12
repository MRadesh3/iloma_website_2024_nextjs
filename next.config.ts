import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ilomatechnology.ilserver.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
