import { ProductDetails, ProductGallery } from "@/components/organisms";
import { listProducts } from "@/lib/data/products";
import { HomeProductSection } from "../HomeProductSection/HomeProductSection";
import { SELLER_HANDLE } from "@/lib/config";
import { notFound } from "next/navigation";
import {
  ProductDetailsMeasurements,
  ProductDetailsSeller,
  ProductDetailsShipping,
  ProductPageDetails,
} from "@/components/cells";
import { getTranslations } from "next-intl/server";

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

  console.log(prod);

  const commonT = await getTranslations("Common");

  if (!prod) return null;

  if (SELLER_HANDLE && SELLER_HANDLE !== prod.seller?.handle) {
    return notFound();
  }

  if (prod.seller?.store_status === "SUSPENDED") {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 md:px-2 lg:w-3/5">
          <ProductGallery images={prod?.images || []} />
          <div className="mb-2"></div>
        </div>
        <div className="md:w-1/2 md:px-2 lg:w-2/5">
          <ProductDetails product={prod} locale={locale} />

          <ProductPageDetails details={prod?.description || ""} />

          <ProductDetailsMeasurements
            measurements={[
              !!prod.origin_country
                ? { label: "產地", value: prod.origin_country ?? "" }
                : null,
              !!prod.weight
                ? {
                    label: commonT("weight"),
                    value: `${prod.weight ?? ""} ${commonT("gram")}`,
                  }
                : null,
            ]}
          />
          <ProductDetailsShipping />
          <ProductDetailsSeller seller={prod?.seller} />
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
