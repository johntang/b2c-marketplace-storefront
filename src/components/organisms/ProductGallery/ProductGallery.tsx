import { GalleryCarousel } from "@/components/organisms";
import { HttpTypes } from "@medusajs/types";

export const ProductGallery = ({
  images,
}: {
  images: HttpTypes.StoreProduct["images"];
}) => {
  return (
    <div className="mb-2">
      <GalleryCarousel images={images} />
    </div>
  );
};
