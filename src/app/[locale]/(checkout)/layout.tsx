import { Button } from "@/components/atoms";
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import { CollapseIcon } from "@/icons";
import { SELLER_HANDLE } from "@/lib/config";
import { getSellerByHandle } from "@/lib/data/seller";
import { SellerProps } from "@/types/seller";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let seller: SellerProps | null = null;
  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE);
  }

  return (
    <>
      <header className="sticky top-0 bg-white z-[1000] h-16">
        <div className="w-full lg:px-8 px-4 relative">
          <div className="absolute top-3">
            <LocalizedClientLink href="/cart">
              <Button variant="tonal" className="flex items-center gap-2">
                <CollapseIcon className="rotate-90" />
                <span className="hidden lg:block">回到購物車</span>
              </Button>
            </LocalizedClientLink>
          </div>
          <div className="flex items-center justify-center lg:pl-0 w-full h-16">
            <LocalizedClientLink href="/" className="text-2xl font-bold">
              {!!seller ? seller.name : "STARRYAN"}
            </LocalizedClientLink>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
