import { SellerProps } from "@/types/seller";

async function SellerHero({ sellerInfo }: { sellerInfo: SellerProps }) {
  return (
    <div className="w-full mb-4">
      <div className="relative">
        {!!sellerInfo.banner && (
          <img
            className="w-full max-h-[200px] object-contain rounded-sm"
            src={sellerInfo.banner}
          ></img>
        )}

        {!!sellerInfo.banner && (
          <img
            className="absolute h-[80px] w-[80px] bottom-[-40px] left-4 rounded-full"
            src={sellerInfo.photo}
          ></img>
        )}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-3">{sellerInfo.name}</h2>
    </div>
  );
}

export default SellerHero;
