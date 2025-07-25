import {
  ProductListingActiveFilters,
  ProductListingHeader,
  ProductSidebar,
  ProductsList,
  ProductsPagination,
} from "@/components/organisms";
import { PRODUCT_LIMIT } from "@/const";
import { SELLER_HANDLE } from "@/lib/config";
import { listProductsWithSort } from "@/lib/data/products";
import { getSellerByHandle } from "@/lib/data/seller";
import { SellerProps } from "@/types/seller";

export const ProductListing = async ({
  category_id,
  collection_id,
  seller_id,
  latest,
  showSidebar = false,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
  page,
}: {
  category_id?: string;
  collection_id?: string;
  seller_id?: string;
  latest?: boolean;
  showSidebar?: boolean;
  locale?: string;
  page?: number;
}) => {
  let seller: SellerProps | null = null;

  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE);
  }

  const queryParams: { limit: number; created_at?: { $gt: Date } } = {
    limit: PRODUCT_LIMIT,
  };

  // @ts-ignore
  if (latest) {
    queryParams.created_at = {
      $gt: new Date(new Date().getTime() - 86400 * 30 * 1000),
    };
  }

  const { response } = await listProductsWithSort({
    seller_id: seller?.id ?? seller_id,
    category_id,
    latest,
    collection_id,
    countryCode: locale,
    sortBy: "created_at",
    queryParams: queryParams,
    page: page,
  });

  const { products, count } = await response;

  const pages = Math.ceil(count / PRODUCT_LIMIT) || 1;

  return (
    <div className="py-4">
      <ProductListingHeader total={count} />
      <div className="hidden md:block">
        <ProductListingActiveFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-4">
        {showSidebar && <ProductSidebar />}
        <section className={showSidebar ? "col-span-3" : "col-span-4"}>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <ProductsList products={products} />
          </div>
          <ProductsPagination pages={pages} />
        </section>
      </div>
    </div>
  );
};
