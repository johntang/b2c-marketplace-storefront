import {
  AlgoliaTrendingListings,
  BannerSection,
  BlogSection,
  Hero,
  HomeCategories,
  HomePopularBrandsSection,
  HomeProductSection,
  ShopByStyleSection,
} from "@/components/sections";
import { SELLER_HANDLE } from "@/lib/config";
import { getSellerByHandle } from "@/lib/data/seller";
import { SellerProps } from "@/types/seller";

import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams, ...props }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let seller: SellerProps | null = null;

  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE);
  }

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
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let seller: SellerProps | null = null;

  const t = await getTranslations("HomePage");

  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE);
  }

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-primary">
      <Hero
        image={seller?.banner}
        heading={seller?.name ?? "Starryan"}
        paragraph={seller?.description ?? "Everyone can be a Shiny Star"}
        buttons={[
          { label: "立即選購", path: "/categories" },
          // {
          //   label: "Sell now",
          //   path:
          //     process.env.NEXT_PUBLIC_ALGOLIA_ID === "UO3C5Y8NHX"
          //       ? "https://vendor-sandbox.vercel.app/"
          //       : "https://vendor.mercurjs.com",
          // },
        ]}
      />
      <div className="px-4 lg:px-8 w-full">
        <HomeProductSection heading={t("hotpick")} locale={locale} home />
      </div>
      {/* <HomePopularBrandsSection />*/}
      {/* <div className="px-4 lg:px-8 w-full">
        <HomeCategories heading="SHOP BY CATEGORY" />
      </div> */}
      {/* <BannerSection /> */}
      {/* <ShopByStyleSection /> */}
      {/* <BlogSection /> */}
    </main>
  );
}
