import { Icon } from "@istic-ui/react";

export const navigationItems = [
  {
    title: "",
    subItems: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: <Icon name="dashboard" />,
      },
      {
        label: "Atendimento",
        path: "/appointments",
        icon: <Icon name="file-list" />,
      },
      {
        label: "Clientes",
        path: "/clients",
        icon: <Icon name="user" />,
      },
      {
        label: "Serviços",
        path: "/services",
        icon: <Icon name="survey" />,
      },
      {
        label: "Funcionários",
        path: "/employees",
        icon: <Icon name="group" />,
      },
      {
        label: "Filiais",
        path: "/branches",
        icon: <Icon name="home" />,
      },
    ],
  },
];
