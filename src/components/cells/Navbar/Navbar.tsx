import { HttpTypes } from "@medusajs/types";
import { CategoryNavbar, NavbarSearch } from "@/components/molecules";

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[];
}) => {
  return (
    <div className="border py-0 px-6">
      <div className="hidden md:flex max-w-[1440px] mx-auto justify-between min-h-16">
        <div className="hidden md:flex items-center">
          <CategoryNavbar categories={categories} />
        </div>
        {/* <NavbarSearch /> */}
      </div>
    </div>
  );
};
