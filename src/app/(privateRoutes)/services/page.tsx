"use client";
import {
  AddOrEditServiceModal,
  ExcludeServiceModal,
} from "@/components/services";
import { PageContainer } from "@/components/_common/PageContainer";
import { useGetAllServices } from "@/core/services/services/hooks";
import { Service } from "@/core/services/services/types";
import {
  ActionIcon,
  Button,
  DropdownMenu,
  Loader,
  Table,
  TableColumn,
} from "@istic-ui/react";
import React, { useState } from "react";

const Services = () => {
  const services = useGetAllServices();
  const [modalType, setModalType] = useState<string>();
  const [selectedService, setSelectedService] = useState<Service>();
  const openModal = (type: string, service?: Service) => {
    setModalType(type);
    setSelectedService(service);
  };
  const closeModal = () => {
    setModalType(undefined);
    setSelectedService(undefined);
    services.refetch();
  };

  const columns: TableColumn<Service>[] = [
    {
      index: "nomeServico",
      label: "Nome",
    },
    {
      index: "valorServico",
      label: "Valor",
      render: ({ valorServico }) =>
        `R$ ${
          Number(valorServico)?.toFixed(2)?.toString()?.replace(".", ",") || 0
        }`,
    },
    {
      index: "actions",
      label: "",
      width: "40px",
      render: (data) => (
        <DropdownMenu
          items={[
            {
              id: "edit",
              iconName: "edit-box",
              label: "Editar",
              onClick: () => openModal("edit", data),
            },

            {
              id: "exclude",
              iconName: "trash",
              label: "Excluir",
              onClick: () => openModal("exclude", data),
            },
          ]}
          mainItem={<ActionIcon variant="subtle" iconName="more-2" />}
        />
      ),
    },
  ];
  return (
    <>
      <PageContainer
        title={"Serviços"}
        subtitle={"Gerencie todos os seus serviços"}
        actionButton={
          <Button
            isLoading={services.isLoading}
            size="sm"
            iconProps={{ iconName: "add", iconPosition: "left" }}
            label="Novo Servico"
            onClick={() => setModalType("edit")}
          />
        }
      >
        {services.isLoading && (
          <div className="w-full h-[80dvh] flex items-center justify-center">
            <Loader width="bold" size="xl" color="border-brand-500" />
          </div>
        )}
        {services.isError && <p>Ocorreu um erro ao carregar os clientes</p>}
        {!services.isLoading && !services.isError && (
          <Table<Service>
            minHeight="calc(100vh - 125px)"
            columns={columns}
            data={services.data || []}
            emptyValues={{
              title: "Ainda não há serviços cadastrados",
              subTitle: "Clique em 'Novo Servico' para criar um novo.",
            }}
          />
        )}
      </PageContainer>

      <AddOrEditServiceModal
        selectedService={selectedService}
        isOpen={modalType === "edit"}
        onClose={closeModal}
      />
      <ExcludeServiceModal
        isOpen={modalType === "exclude"}
        id={selectedService?.servicoId || ""}
        onClose={closeModal}
      />
    </>
  );
};

export default Services;
