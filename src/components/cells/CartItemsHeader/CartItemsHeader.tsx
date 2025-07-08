import { Divider } from "@/components/atoms";
import { SingleProductSeller } from "@/types/product";
import { format } from "date-fns";
import { SellerAvatar } from "../SellerAvatar/SellerAvatar";
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import useCommonTranslation from "@/hooks/useCommonTranslation";

export const CartItemsHeader = ({
  seller,
}: {
  seller: SingleProductSeller;
}) => {
  const commonT = useCommonTranslation();
  return (
    <LocalizedClientLink href={`/sellers/${seller.handle}`}>
      <div className="border rounded-sm p-4 flex gap-4 items-center mb-3">
        <SellerAvatar photo={seller.photo} size={32} alt={seller.name} />

        <div className="lg:flex gap-2">
          <p className="uppercase heading-xs">{seller.name}</p>
          {seller.id !== "fleek" && (
            <div className="flex items-center gap-2">
              <Divider square />
              <p className="label-md text-secondary">
                {commonT("joined")}:{" "}
                {format(seller.created_at || "", "yyyy-MM-dd")}
              </p>
            </div>
          )}
        </div>
      </div>
    </LocalizedClientLink>
  );
};
