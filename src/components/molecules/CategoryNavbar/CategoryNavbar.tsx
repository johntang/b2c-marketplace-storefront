"use client";
import { HttpTypes } from "@medusajs/types";
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { CollapseIcon } from "@/icons";

export const CategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[];
  onClose?: (state: boolean) => void;
}) => {
  const { category }: { category: string } = useParams();

  const decoddedCategory = decodeURIComponent(category ?? "");

  return (
    <nav className="flex md:items-center flex-col md:flex-row">
      <LocalizedClientLink
        href="/categories"
        onClick={() => (onClose ? onClose(false) : null)}
        className={cn(
          "label-md uppercase px-4 my-3 md:my-0 mx-1 flex items-center justify-between md:hover:border-b md:hover:border-primary",
          category !== undefined &&
            !decoddedCategory &&
            "md:border-b md:border-primary"
        )}
      >
        所有商品
      </LocalizedClientLink>
      {categories?.map(({ id, handle, name }) => (
        <LocalizedClientLink
          key={id}
          href={`/categories/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn(
            "label-md uppercase px-4 mx-1 my-3 md:my-0 flex items-center justify-between md:hover:border-b md:hover:border-primary",
            handle === decoddedCategory && "md:border-b md:border-primary"
          )}
        >
          {name}
          <CollapseIcon size={18} className="-rotate-90 md:hidden" />
        </LocalizedClientLink>
      ))}
    </nav>
  );
};
