import { SingleProductMeasurement } from "@/types/product";

export const ProdutMeasurementRow = ({
  measurement,
}: {
  measurement: SingleProductMeasurement;
}) => {
  const { label, value } = measurement;
  return (
    <div className="grid grid-cols-2 text-left label-md">
      <div className="py-3">{label}：</div>
      <div className="py-3">{value}</div>
    </div>
  );
};
