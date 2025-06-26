import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import footerLinks from "@/data/footerLinks";
import { SELLER_HANDLE } from "@/lib/config";
import { getSellerByHandle } from "@/lib/data/seller";
import { SellerProps } from "@/types/seller";
import Link from "next/link";

export async function Footer() {
  let seller: SellerProps | null = null;
  if (SELLER_HANDLE) {
    seller = await getSellerByHandle(SELLER_HANDLE);
  }

  return (
    <footer className="bg-primary container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-2">
        {/* Customer Services Column */}
        <div className="p-6 border rounded-sm">
          <h2 className="heading-sm text-primary mb-3 uppercase">幫助</h2>
          <nav className="space-y-3" aria-label="Customer services navigation">
            {footerLinks.customerServices.map(({ label, path }) => (
              <LocalizedClientLink
                key={label}
                href={path}
                className="block label-md"
              >
                {label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        {/* About Column */}
        <div className="p-6 border rounded-sm">
          <h2 className="heading-sm text-primary mb-3 uppercase">關於</h2>
          <nav className="space-y-3" aria-label="About navigation">
            {footerLinks.about.map(({ label, path }) => (
              <LocalizedClientLink
                key={label}
                href={path}
                className="block label-md"
              >
                {label}
              </LocalizedClientLink>
            ))}
          </nav>
        </div>

        {/* Connect Column */}
        <div className="p-6 border rounded-sm">
          <h2 className="heading-sm text-primary mb-3 uppercase">
            追蹤 {seller?.name || "STARRYAN"}
          </h2>
          <nav className="space-y-3" aria-label="Social media navigation">
            {footerLinks.connect.map(({ label, path }) => (
              <Link
                key={label}
                href={path}
                className="block label-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </Link>
            ))}
            {!!seller?.ig && (
              <Link
                href={seller?.ig}
                className="block label-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
            )}
          </nav>
        </div>
      </div>

      <div className="py-6 border rounded-sm ">
        <p className="text-md text-secondary text-center ">
          © {new Date().getFullYear()} {seller?.name ?? "StarrYan"}. All right
          reserved
        </p>
      </div>
    </footer>
  );
}
