import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton"
import { Suspense } from "react"

import { Breadcrumbs } from "@/components/atoms"
import { AlgoliaProductsListing, ProductListing } from "@/components/sections"
import { getRegion } from "@/lib/data/regions"

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY

async function AllCategories({
  params,
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const { page } = await searchParams

  console.log(page)

  const breadcrumbsItems = [
    {
      path: "/",
      label: "所有商品",
    },
  ]

  const currency_code = (await getRegion(locale))?.currency_code || "hkd"

  return (
    <main className="container">
      <div className="hidden md:block mb-2">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <h1 className="heading-xl uppercase">所有商品</h1>

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
  )
}

export default AllCategories
