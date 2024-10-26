"use client";

import { ActionIcon, Button, Icon } from "@istic-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HamburgerMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const router = useRouter();
  const sideBarItems = [
    {
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
          label: "Atendimento",
          path: "/appointments",
          icon: <Icon name="file-list" />,
        },
      ],
    },
  ];

  return (
    <div className="w-full md:px-4:py-6 flex flex-col items-center justify-between text-center relative">
      <div className="bg-brand-50 w-full px-4 py-6 h-[80px] flex items-center justify-between text-center relative">
        <Image
          src="/logo.png"
          className="w-[90px] h-[74px]"
          alt="Stefane Paixão Nail Designer Logo"
          height={240}
          width={240}
        />
        <ActionIcon
          color="text-white"
          onClick={() => setIsOpened(!isOpened)}
          variant="subtle"
          iconName={"more-2"}
        />
      </div>
      {isOpened && (
        <div className="absolute top-full left-0 w-full flex flex-col gap-t-4 bg-white z-30">
          {sideBarItems.map((item, index) => (
            <div className="w-full" key={index}>
              {item.subItems.map((subItem, subIndex) => (
                <div key={subIndex}>
                  <Button
                    variant="light"
                    size="xs"
                    grow
                    iconProps={{
                      iconName: subItem.icon.props.name,
                      iconPosition: "left",
                    }}
                    label={subItem.label}
                    onClick={() => {
                      router.push(subItem.path);
                      setIsOpened(false);
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          <ActionIcon
            size="xs"
            variant="light"
            iconName="logout"
            onClick={() => {
              document.cookie =
                "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
              router.push("/");
            }}
          />
        </div>
      )}
    </div>
  );
};
