import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { CollapseIcon } from "@/icons"
import { SellerInfo } from "@/components/molecules"
import { SellerProps } from "@/types/seller"

export const ProductDetailsSeller = ({ seller }: { seller?: SellerProps }) => {
  if (!seller) return null

  return (
    <div className="border rounded-sm">
      <div className="p-4">
        <div className="flex justify-between">
          <SellerInfo seller={seller} />
          <LocalizedClientLink href={`/sellers/${seller.handle}`}>
            <CollapseIcon className="-rotate-90" />
          </LocalizedClientLink>
        </div>
      </div>
    </div>
  )
}
