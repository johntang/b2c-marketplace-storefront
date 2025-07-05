"use client";

import { Divider, LogoutButton, NavigationItem } from "@/components/atoms";
import { Dropdown } from "@/components/molecules";
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink";
import { ProfileIcon } from "@/icons";
import { HttpTypes } from "@medusajs/types";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const UserDropdown = ({
  user,
}: {
  user: HttpTypes.StoreCustomer | null;
}) => {
  const [open, setOpen] = useState(false);

  const t = useTranslations("UserDropdown");

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
    >
      <LocalizedClientLink href="/user" className="relative">
        <ProfileIcon size={20} />
      </LocalizedClientLink>
      <Dropdown show={open}>
        {user ? (
          <div className="p-1">
            <div className="lg:w-[200px]">
              <h3 className="uppercase heading-xs border-b p-4">
                Your account
              </h3>
            </div>
            <NavigationItem href="/user/orders">Orders</NavigationItem>
            <NavigationItem href="/user/addresses">Addresses</NavigationItem>
            <NavigationItem href="/user/reviews">Reviews</NavigationItem>
            <NavigationItem href="/user/wishlist">Wishlist</NavigationItem>
            <Divider />
            <NavigationItem href="/user/settings">Settings</NavigationItem>
            <LogoutButton />
          </div>
        ) : (
          <div className="p-1">
            <NavigationItem href="/user">{t("login")}</NavigationItem>
            <NavigationItem href="/user/register">
              {t("register")}
            </NavigationItem>
          </div>
        )}
      </Dropdown>
    </div>
  );
};
