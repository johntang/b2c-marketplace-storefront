import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  trailingSlash: false,
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // i18n: i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn01.pinkoi.com",
      },
      {
        protocol: "https",
        hostname: process.env.CLOUDFLARE_R2_DOMAIN ?? "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "mercur-connect.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "api.mercurjs.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "api-sandbox.mercurjs.com",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "s3.eu-central-1.amazonaws.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: `/${process.env.NEXT_PUBLIC_DEFAULT_REGION}`,
        permanent: true,
      },
    ];
  },
};

module.exports = withNextIntl(withMDX(nextConfig));
