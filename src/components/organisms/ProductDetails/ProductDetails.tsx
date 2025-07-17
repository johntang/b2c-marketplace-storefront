import {
  ProductDetailsHeader,
  ProductDetailsMeasurements,
  ProductDetailsSeller,
  ProductDetailsShipping,
} from "@/components/cells";
import { retrieveCustomer } from "@/lib/data/customer";
import { getUserWishlists } from "@/lib/data/wishlist";
import { SellerProps } from "@/types/seller";
import { Wishlist } from "@/types/wishlist";
import { HttpTypes } from "@medusajs/types";
import { getTranslations } from "next-intl/server";

export const ProductDetails = async ({
  product,
  locale,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps };
  locale: string;
}) => {
  const user = await retrieveCustomer();

  let wishlist: Wishlist[] = [];
  if (user) {
    const response = await getUserWishlists();
    wishlist = response.wishlists;
  }

  return (
    <div className="flex flex-col gap-2 mb-2">
      <ProductDetailsHeader
        product={product}
        locale={locale}
        user={user}
        wishlist={wishlist}
      />
      {/* <div className="visible md:collasp">
        <ProductPageDetails details={product?.description || ""} />
      </div> */}

      {/* <ProductDetailsSellerReviews
        reviews={seller.reviews}
      /> */}
      {/* <ProductDetailsFooter
        tags={product?.tags || []}
        posted={product?.created_at}
      /> */}
    </div>
  );
};
