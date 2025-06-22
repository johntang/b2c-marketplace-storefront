import { ProductPageAccordion } from "@/components/molecules"

export const ProductPageDetails = ({ details }: { details: string }) => {
  return (
    <ProductPageAccordion heading="商品介紹" defaultOpen={false}>
      <div
        className="product-details whitespace-pre-line"
        dangerouslySetInnerHTML={{
          __html: details,
        }}
      />
    </ProductPageAccordion>
  )
}
