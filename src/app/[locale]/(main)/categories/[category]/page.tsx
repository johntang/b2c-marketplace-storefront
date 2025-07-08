import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton";
import { getCategoryByHandle } from "@/lib/data/categories";
import { Suspense } from "react";

import type { Metadata } from "next";
import { generateCategoryMetadata } from "@/lib/helpers/seo";
import { Breadcrumbs } from "@/components/atoms";
import { AlgoliaProductsListing, ProductListing } from "@/components/sections";
import { notFound } from "next/navigation";
import NotFound from "@/app/not-found";
import { SELLER_HANDLE } from "@/lib/config";
import { getSellerByHandle } from "@/lib/data/seller";
import SellerHero from "@/components/molecules/SellerHero/SellerHero";

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID;
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  const cat = await getCategoryByHandle([decodeURIComponent(category)]);

  return generateCategoryMetadata(cat);
}

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

  const category = await getCategoryByHandle([decodeURIComponent(handle)]);

  if (!category) {
    return notFound();
  }

  const breadcrumbsItems = [
    {
      path: "/categories",
      label: "所有商品",
    },
    {
      path: category?.handle,
      label: category?.name,
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

      <h1 className="heading-lg uppercase">{category.name}</h1>

      <Suspense fallback={<ProductListingSkeleton />}>
        {!ALGOLIA_ID || !ALGOLIA_SEARCH_KEY ? (
          <ProductListing
            page={page ? parseInt(page) : 1}
            category_id={category.id}
            locale={locale}
          />
        ) : (
          <AlgoliaProductsListing category_id={category.id} locale={locale} />
        )}
      </Suspense>
    </main>
  );
}

export default Category;
