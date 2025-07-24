import { Button } from "@/components/atoms";
import { CartItems, CartSummary } from "@/components/organisms";
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import { retrieveCart } from "@/lib/data/cart";
import CartPromotionCode from "../CartReview/CartPromotionCode";

export const Cart = async () => {
  const cart = await retrieveCart();

  return (
    <>
      <div className="col-span-12 lg:col-span-8">
        <CartItems cart={cart} />
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="w-full mb-2 border rounded-sm p-4">
          <CartPromotionCode
            cart={
              cart
                ? {
                    ...cart,
                    promotions: cart.promotions?.map((promotion: any) => ({
                      ...promotion,
                      created_at: promotion.created_at ?? "",
                      updated_at: promotion.updated_at ?? "",
                      deleted_at: promotion.deleted_at ?? null,
                    })),
                  }
                : null
            }
          />
        </div>
        <div className="border rounded-sm p-4 h-fit">
          <CartSummary
            item_total={cart?.item_total || 0}
            shipping_total={cart?.shipping_total || 0}
            total={cart?.total || 0}
            currency_code={cart?.currency_code || ""}
            tax={cart?.tax_total || 0}
          />
          <LocalizedClientLink href="/checkout?step=address">
            <Button className="w-full py-3 flex justify-center items-center">
              前往付款
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </>
  );
};
