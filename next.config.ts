import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "doclynx-backend.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
