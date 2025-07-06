import {
  ProductPageAccordion,
  ProdutMeasurementRow,
} from "@/components/molecules";
import { SingleProductMeasurement } from "@/types/product";

export const ProductDetailsMeasurements = ({
  measurements,
}: {
  measurements: (SingleProductMeasurement | null)[];
}) => {
  return (
    <ProductPageAccordion heading="商品資訊" defaultOpen={false}>
      {measurements
        .filter((item) => !!item)
        .map((item) => (
          <ProdutMeasurementRow key={item.label} measurement={item} />
        ))}
    </ProductPageAccordion>
  );
};
