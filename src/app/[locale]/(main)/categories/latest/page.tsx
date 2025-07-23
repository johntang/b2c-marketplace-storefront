import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton";
import { Suspense } from "react";

import { Breadcrumbs } from "@/components/atoms";
import SellerHero from "@/components/molecules/SellerHero/SellerHero";
import { AlgoliaProductsListing, ProductListing } from "@/components/sections";
import { SELLER_HANDLE } from "@/lib/config";
import { getSellerByHandle } from "@/lib/data/seller";

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

async function Category({
  params,
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
  params: Promise<{
    category: string;
    locale: string;
  }>;
}) {
  const { category: handle, locale } = await params;

  const { page } = await searchParams;

  const breadcrumbsItems = [
    {
      path: "/categories",
      label: "所有商品",
    },
    {
      path: "/categories/latest",
      label: "最新商品",
    },
  ];

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

      <h1 className="heading-lg uppercase">最新商品</h1>

      <Suspense fallback={<ProductListingSkeleton />}>
        {!ALGOLIA_ID || !ALGOLIA_SEARCH_KEY ? (
          <ProductListing
            page={page ? parseInt(page) : 1}
            locale={locale}
            latest
          />
        ) : (
          <AlgoliaProductsListing latest locale={locale} />
        )}
      </Suspense>
    </main>
  );
}

export default Category;
