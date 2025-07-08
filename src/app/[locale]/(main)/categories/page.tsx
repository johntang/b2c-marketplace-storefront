import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/atoms";
import { AlgoliaProductsListing, ProductListing } from "@/components/sections";
import { getRegion } from "@/lib/data/regions";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import SellerHero from "@/components/molecules/SellerHero/SellerHero";
import { getSellerByHandle } from "@/lib/data/seller";
import { SELLER_HANDLE } from "@/lib/config";

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

async function AllCategories({
  params,
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const { page } = await searchParams;

  const breadcrumbsItems = [
    {
      path: "/",
      label: "所有商品",
    },
  ];

  const currency_code = (await getRegion(locale))?.currency_code || "hkd";

  const t = await getTranslations("Category");

  let seller;

  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE);
  }

  return (
    <main className="container">
      {!!seller && <SellerHero sellerInfo={seller} />}
      <div className="hidden md:block mb-2">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <h1 className="heading-lg uppercase">{t("all-category-title")}</h1>

      <Suspense fallback={<ProductListingSkeleton />}>
        {!ALGOLIA_ID || !ALGOLIA_SEARCH_KEY ? (
          <ProductListing
            // showSidebar
            page={page ? parseInt(page) : 1}
            locale={locale}
            // seller_id="sel_01JY5V9J9V6KFCJCJBD2G3RWSZ"
          />
        ) : (
          <AlgoliaProductsListing
            locale={locale}
            currency_code={currency_code}
          />
        )}
      </Suspense>
    </main>
  );
}

export default AllCategories;
