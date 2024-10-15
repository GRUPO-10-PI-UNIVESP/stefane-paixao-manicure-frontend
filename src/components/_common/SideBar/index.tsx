"use client";
import { ActionIcon, Button, Icon, SideBar, Text } from "@istic-ui/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar = () => {
  const path = usePathname();
  const router = useRouter();
  const sideBarItems = [
    {
      title: "",
      subItems: [
        {
          label: "Clientes",
          path: "/clients",
          icon: <Icon name="dashboard" />,
        },
        {
          label: "Serviços",
          path: "/services",
          icon: <Icon name="survey" />,
        },
        {
          label: "Filiais",
          path: "/branches",
          icon: <Icon name="home" />,
        },
        {
          label: "Atendimento",
          path: "/appointments",
          icon: <Icon name="file-list" />,
        },
      ],
    },
  ];
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
      items={sideBarItems}
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
          <Text color="text-brand600" size="xs">
            © {new Date().getFullYear()} Stefane Paixão Nail Designer
          </Text>
        </div>
      }
    />
  );
};
