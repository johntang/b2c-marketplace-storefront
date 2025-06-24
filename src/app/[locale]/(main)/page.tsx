import {
  AlgoliaTrendingListings,
  BannerSection,
  BlogSection,
  Hero,
  HomeCategories,
  HomePopularBrandsSection,
  HomeProductSection,
  ShopByStyleSection,
} from "@/components/sections"
import { SELLER_HANDLE } from "@/lib/config"
import { getSellerByHandle } from "@/lib/data/seller"
import { SellerProps } from "@/types/seller"

import type { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams, ...props }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let seller: SellerProps | null = null

  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE)
  }

  // if (seller) {
  //   return {
  //     title: {
  //       template: `%s | ${
  //         process.env.NEXT_PUBLIC_SITE_NAME ||
  //         "Mercur B2C Demo - Marketplace Storefront"
  //       }`,
  //       default: seller.name,
  //     },
  //     description: seller.description,
  //     metadataBase: new URL(
  //       process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  //     ),
  //   }
  // }

  return {
    title: seller?.name ?? "Home",
    description:
      seller?.description ??
      "Welcome to Mercur B2C Demo! Create a modern marketplace that you own and customize in every aspect with high-performance, fully customizable storefront.",
    openGraph: {
      title: seller?.name ?? "Home",
      description:
        seller?.description ??
        "Welcome to Mercur B2C Demo! Create a modern marketplace that you own and customize in every aspect with high-performance, fully customizable storefront.",
      url: process.env.NEXT_PUBLIC_BASE_URL,
      siteName: "Mercur B2C Demo - Marketplace Storefront",
      type: "website",
      images: [
        {
          url: seller?.photo ?? "/B2C_Storefront_Open_Graph.png",
          width: 1200,
          height: 630,
          alt: "Mercur B2C Demo - Marketplace Storefront",
        },
      ],
    },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-primary">
      {/* <Hero
        image="/images/hero/Image.jpg"
        heading="Snag your style in a flash"
        paragraph="Buy, sell, and discover pre-loved gems from the trendiest brands."
        buttons={[
          { label: "Buy now", path: "/categories" },
          {
            label: "Sell now",
            path:
              process.env.NEXT_PUBLIC_ALGOLIA_ID === "UO3C5Y8NHX"
                ? "https://vendor-sandbox.vercel.app/"
                : "https://vendor.mercurjs.com",
          },
        ]}
      /> */}
      <div className="px-4 lg:px-8 w-full">
        <HomeProductSection heading="trending listings" locale={locale} home />
      </div>
      {/* <HomePopularBrandsSection />*/}
      {/* <div className="px-4 lg:px-8 w-full">
        <HomeCategories heading="SHOP BY CATEGORY" />
      </div> */}
      {/* <BannerSection /> */}
      {/* <ShopByStyleSection /> */}
      {/* <BlogSection /> */}
    </main>
  )
}
