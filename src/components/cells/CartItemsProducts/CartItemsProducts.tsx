import Image from "next/image";
import { HttpTypes } from "@medusajs/types";
import { convertToLocale } from "@/lib/helpers/money";
import { DeleteCartItemButton } from "@/components/molecules";
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import { UpdateCartItemButton } from "@/components/molecules/UpdateCartItemButton/UpdateCartItemButton";

export const CartItemsProducts = ({
  products,
  currency_code,
  delete_item = true,
  change_quantity = true,
}: {
  products: HttpTypes.StoreCartLineItem[];
  currency_code: string;
  delete_item?: boolean;
  change_quantity?: boolean;
}) => {
  return (
    <div>
      {products.map((product) => {
        const { options } = product.variant ?? {};
        const original_total = convertToLocale({
          amount: (product.compare_at_unit_price || 0) * product.quantity,
          currency_code,
        });

        const total = convertToLocale({
          amount: product.total,
          currency_code,
        });

        return (
          <div
            key={product.id}
            className="border rounded-sm p-4 flex gap-2 mb-4"
          >
            <LocalizedClientLink href={`/products/${product.product_handle}`}>
              <div className="w-[100px] h-[100px] flex items-center justify-center">
                {product.thumbnail ? (
                  <Image
                    src={decodeURIComponent(product.thumbnail)}
                    alt="Product thumbnail"
                    width={100}
                    height={100}
                    className="rounded-xs w-[100px] h-[100px] object-contain"
                  />
                ) : (
                  <Image
                    src={"/images/placeholder.svg"}
                    alt="Product thumbnail"
                    width={50}
                    height={66}
                    className="rounded-xs w-[50px] h-[66px] object-contain opacity-30"
                  />
                )}
              </div>
            </LocalizedClientLink>

            <div className="w-full pl-2">
              <div className="flex justify-between lg:mb-2 items-center mb-4">
                <LocalizedClientLink
                  href={`/products/${product.product_handle}`}
                >
                  <div className="w-[100px] md:w-[200px] lg:w-[280px] lg:mb-0">
                    <p className="text-primary uppercase truncate font-bold m-0">
                      {product.product_title}
                    </p>
                  </div>
                </LocalizedClientLink>
                {delete_item && (
                  <div className="lg:flex">
                    <DeleteCartItemButton id={product.id} />
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end -mt-4 lg:mt-0">
                <div className="label-md text-secondary">
                  {options?.map(({ option, id, value }) => (
                    <p key={id}>
                      {option?.title}:{" "}
                      <span className="text-primary">{value}</span>
                    </p>
                  ))}
                  {change_quantity ? (
                    <UpdateCartItemButton
                      quantity={product.quantity}
                      lineItemId={product.id}
                    />
                  ) : (
                    <p>
                      Quantity:{" "}
                      <span className="text-primary">{product.quantity}</span>
                    </p>
                  )}
                </div>

                <div className="lg:text-right flex lg:block items-center gap-2 mt-4 lg:mt-0">
                  {product.compare_at_unit_price &&
                    total !== original_total && (
                      <p className="line-through text-secondary label-md">
                        {original_total}
                      </p>
                    )}
                  <p className="label-lg">{total}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
