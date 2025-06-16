import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // output: "export",
  // images: {
  //   unoptimized: true,
  // },
  experimental: {
    ppr: "incremental",
  }
  // i18n: {
  //   locales: ["en", "ar"],
  //   defaultLocale: "en",
  // }
};

const withIntl = createNextIntlPlugin("./app/i18n/request.ts");
export default withIntl(nextConfig);
