import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import { Product } from "@/types/product"

export const HomeProductsCarousel = async ({
  locale,
  sellerProducts,
  home,
  sellerHandle,
}: {
  locale: string
  sellerProducts: Product[]
  home: boolean
  sellerHandle?: string
}) => {
  const {
    response: { products },
  } = await listProducts({
    countryCode: locale,
    queryParams: {
      limit: 4,
      order: "created_at",
    },
  })

  let filtered = products

  if (sellerHandle) {
    filtered = products.filter((prod) => prod.seller?.handle === sellerHandle)
  }

  if (!filtered.length && !sellerProducts.length) return null

  return (
    <div className="flex justify-center w-full">
      <Carousel
        align="start"
        items={filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      />
    </div>
  )
}
