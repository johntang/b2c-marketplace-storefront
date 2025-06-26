import { SingleProductMeasurement } from "@/types/product";

export const ProdutMeasurementRow = ({
  measurement,
}: {
  measurement: SingleProductMeasurement;
}) => {
  const { label, value } = measurement;
  return (
    <div className="border rounded-sm grid grid-cols-2 text-center label-md">
      <div className="border-r py-3">{label}</div>
      <div className="border-r py-3">{value}</div>
    </div>
  );
};
