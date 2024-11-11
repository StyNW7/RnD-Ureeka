"use client";
import React from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Shop",
    link: "/shop",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Clicker",
    link: "/clicker",
    icon: (
      <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
];
export default function FloatingNavDemo() {

  const DisableNavbarRoutes = ["/shop"];
  const pathname = usePathname() as string;

  if(DisableNavbarRoutes.includes(pathname)){
    return (
      <></>
    )
  } else{
    return (
      <div className="relative w-full">
        <FloatingNav navItems={navItems} />
      </div>
    );
  }

}