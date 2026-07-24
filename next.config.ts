import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Lets the router run navigations through the browser's View Transitions API
  // and enables React's <ViewTransition>. See components/animation/view-transition.
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neoline.markup.az",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withNextIntl(nextConfig);
