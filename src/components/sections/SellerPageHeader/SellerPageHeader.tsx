import { SellerFooter, SellerHeading } from "@/components/organisms"
import { HttpTypes } from "@medusajs/types"

export const SellerPageHeader = ({
  header = false,
  seller,
  user,
}: {
  header?: boolean
  seller: any
  user: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="border rounded-sm p-4">
      {/* <img
        className="max-h-[250px] object-cover p-2 "
        src="https://cdn01.pinkoi.com/store/syitren-tw/banner/2/1200x245.avif"
      ></img> */}
      <SellerHeading header seller={seller} user={user} />
      {/* <p
        dangerouslySetInnerHTML={{
          __html: seller.description,
        }}
        className="label-md my-5"
      /> */}
      <SellerFooter seller={seller} />
    </div>
  )
}
