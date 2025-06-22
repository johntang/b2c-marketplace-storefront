import { HttpTypes } from "@medusajs/types"
import { CategoryNavbar, NavbarSearch } from "@/components/molecules"

export const Navbar = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="border py-4 px-6">
      <div className="flex max-w-[1440px] mx-auto justify-between ">
        <div className="hidden md:flex items-center">
          <CategoryNavbar categories={categories} />
        </div>
        <NavbarSearch />
      </div>
    </div>
  )
}
