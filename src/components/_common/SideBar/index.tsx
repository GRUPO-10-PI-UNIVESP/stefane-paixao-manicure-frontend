"use client";
import { Icon, SideBar, Text } from "@istic-ui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const path = usePathname();
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
        <Text color="text-brand600" size="xs">
          © {new Date().getFullYear()} Stefane Paixão Nail Designer
        </Text>
      }
    />
  );
};
