import { StarRating } from "@/components/atoms"
import { SellerAvatar } from "@/components/cells/SellerAvatar/SellerAvatar"
import { SellerProps } from "@/types/seller"
import { SellerReview } from "../SellerReview/SellerReview"

export const SellerInfo = ({
  seller,
  header = false,
}: {
  seller: SellerProps
  header?: boolean
}) => {
  const { photo, name, reviews, description } = seller

  const reviewCount = reviews
    ? reviews?.filter((rev) => rev !== null).length
    : 0

  const rating =
    reviews && reviews.length > 0
      ? reviews
          .filter((rev) => rev !== null)
          .reduce((sum, r) => sum + r?.rating || 0, 0) / reviewCount
      : 0

  return (
    <>
      <div className="flex gap-4 w-full flex-col">
        {!!seller.banner && <img src={seller.banner}></img>}

        <div className="flex gap-4 w-full">
          <div
            style={{ flex: "0 0 100px" }}
            className="relative h-[100px] rounded-sm aspect-square"
          >
            <SellerAvatar photo={photo} size={100} alt={name} />

            <div className="flex justify-center">
              {!!seller.ig && (
                <a href={seller.ig} target="_blank">
                  <i className="fa-brands fa-instagram text-2xl"></i>
                </a>
              )}
            </div>
          </div>
          <div className="grow">
            <h3 className="heading-sm text-primary flex gap-2">{name}</h3>
            <div className="flex items-center gap-2 border-b pb-4">
              <StarRating starSize={16} rate={rating || 0} />
              <span className="text-md text-secondary">
                {reviewCount} reviews
              </span>
            </div>
            <div className="mt-4">
              <p
                dangerouslySetInnerHTML={{
                  __html: seller.description,
                }}
                className="label-sm my-5"
              />

              {!header &&
                reviews
                  ?.filter((rev) => rev !== null)
                  .slice(-3)
                  .map((review) => (
                    <SellerReview key={review.id} review={review} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
