"use client";
import {
  Card,
  Divider,
  LogoutButton,
  NavigationItem,
} from "@/components/atoms";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "訂單",
    href: "/user/orders",
  },
  {
    label: "地址",
    href: "/user/addresses",
  },
  // {
  //   label: "Reviews",
  //   href: "/user/reviews",
  // },
  // {
  //   label: "Wishlist",
  //   href: "/user/wishlist",
  // },
];

export const UserNavigation = () => {
  const path = usePathname();

  return (
    <Card className="h-min">
      {navigationItems.map((item) => (
        <NavigationItem
          key={item.label}
          href={item.href}
          active={path === item.href}
        >
          {item.label}
        </NavigationItem>
      ))}
      <Divider className="my-2" />
      <NavigationItem
        href={"/user/settings"}
        active={path === "/user/settings"}
      >
        設定
      </NavigationItem>
      <LogoutButton className="w-full text-left" />
    </Card>
  );
};
