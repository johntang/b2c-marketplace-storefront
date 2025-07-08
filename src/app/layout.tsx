import type { Metadata, ResolvingMetadata } from "next";
import { Funnel_Display } from "next/font/google";
import "./globals.css";
import { SELLER_HANDLE } from "@/lib/config";
import { SellerProps } from "@/types/seller";
import { getSellerByHandle } from "@/lib/data/seller";
import Script from "next/script";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;

  let seller: SellerProps | null = null;

  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE);
  }

  if (seller) {
    return {
      title: {
        template: `%s | ${
          process.env.NEXT_PUBLIC_SITE_NAME ||
          "Mercur B2C Demo - Marketplace Storefront"
        }`,
        default: seller.name,
      },
      description: seller.description,
      metadataBase: new URL(
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      ),
    };
  }

  return {
    title: {
      template: `%s | ${
        process.env.NEXT_PUBLIC_SITE_NAME ||
        "Mercur B2C Demo - Marketplace Storefront"
      }`,
      default:
        process.env.NEXT_PUBLIC_SITE_NAME ||
        "Mercur B2C Demo - Marketplace Storefront",
    },
    description:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "Mercur B2C Demo - Marketplace Storefront",
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    ),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }
  return (
    <html lang={locale} className="">
      <meta
        name="google-site-verification"
        content="zdftSZVyPppYF210kqs-N8N4iWYMt0c6qcZYYToO-FQ"
      />

      <Script src="/assets/fontawesome/js/brands.js" defer />
      <Script defer src="/assets/fontawesome/js/solid.js"></Script>
      <Script defer src="/assets/fontawesome/js/fontawesome.js"></Script>
      <body
        className={`${funnelDisplay.className} antialiased bg-primary text-secondary`}
      >
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
