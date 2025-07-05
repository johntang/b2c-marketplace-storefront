import { ProductPageAccordion } from "@/components/molecules";
import { useFormatter } from "next-intl";

import moment from "moment";

export const ProductDetailsShipping = () => {
  const format = useFormatter();

  const sevenDays = moment().add("7", "day");

  const tenDays = moment().add("10", "day");

  return (
    <ProductPageAccordion heading="其他資訊" defaultOpen={false}>
      <div className="product-details">
        <ul>
          <li>
            自選物流 | 現在下單預估{" "}
            {format.dateTimeRange(sevenDays.toDate(), tenDays.toDate(), {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            到貨，實際到貨日可能因付款時間與物流延遲影響
          </li>
          {/* <li>
            We offer a 30-day return policy. If you are not completely satisfied
            with your purchase, you can return the chair for a full refund or
            exchange, provided it is in its original condition and packaging.
          </li> */}
        </ul>
      </div>
    </ProductPageAccordion>
  );
};
