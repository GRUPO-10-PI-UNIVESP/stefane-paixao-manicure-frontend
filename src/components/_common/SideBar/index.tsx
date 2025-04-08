"use client";
import { navigationItems } from "@/core/utils/navigationRoutes";
import { ActionIcon, Button, Icon, SideBar, Text } from "@istic-ui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <SideBar
      width="250px"
      logo={
        <div>
          <Image
            src="/logo.png"
            className="w-[90px] h-[74px]"
            alt="Stefane Paixão Nail Designer Logo"
            height={444}
            width={90}
          />
        </div>
      }
      activeItem={path}
      items={navigationItems}
      footer={
        <div className="flex flex-col gap-8">
          <Button
            size="xs"
            variant="outline"
            label="Deslogar"
            iconProps={{
              iconName: "logout",
              iconPosition: "left",
            }}
            onClick={() => {
              document.cookie =
                "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
              router.push("/");
            }}
          />
          <Text color="text-brand-600" size="xs">
            © {new Date().getFullYear()} Stefane Paixão Nail Designer
          </Text>
        </div>
      }
    />
  );
};
