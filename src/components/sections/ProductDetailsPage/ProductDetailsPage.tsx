import { ProductDetails, ProductGallery } from "@/components/organisms";
import { listProducts } from "@/lib/data/products";
import { HomeProductSection } from "../HomeProductSection/HomeProductSection";
import NotFound from "@/app/not-found";
import { SELLER_HANDLE } from "@/lib/config";
import { notFound } from "next/navigation";

export const ProductDetailsPage = async ({
  handle,
  locale,
}: {
  handle: string;
  locale: string;
}) => {
  const prod = await listProducts({
    countryCode: locale,
    queryParams: { handle },
  }).then(({ response }) => response.products[0]);

  if (!prod) return null;

  if (SELLER_HANDLE && SELLER_HANDLE !== prod.seller?.handle) {
    return notFound();
  }

  if (prod.seller?.store_status === "SUSPENDED") {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col md:flex-row lg:gap-12">
        <div className="md:w-1/2 md:px-2">
          <ProductGallery images={prod?.images || []} />
        </div>
        <div className="md:w-1/2 md:px-2">
          <ProductDetails product={prod} locale={locale} />
        </div>
      </div>
      <div className="my-8">
        <HomeProductSection
          heading="更多商品"
          products={prod.seller?.products}
          seller_handle={prod.seller?.handle}
          locale={locale}
        />
      </div>
    </>
  );
};
