"use client";
import { AddOrEditClientModal, ExcludeClientModal } from "@/components/clients";
import { PageContainer } from "@/components/_common/PageContainer";
import { useGetAllClients } from "@/core/services/clients/hooks";
import { Client } from "@/core/services/clients/types";
import {
  ActionIcon,
  Button,
  DropdownMenu,
  Table,
  TableColumn,
} from "@stick-ui/lib";
import React, { useState } from "react";

const Clients = () => {
  const clients = useGetAllClients();
  const [modalType, setModalType] = useState<string>();
  const [selectedClient, setSelectedClient] = useState<Client>();
  const openModal = (type: string, client?: Client) => {
    setModalType(type);
    setSelectedClient(client);
  };
  const closeModal = () => {
    setModalType(undefined);
    setSelectedClient(undefined);
    clients.refetch();
  };

  const columns: TableColumn<Client>[] = [
    {
      index: "nomeCliente",
      label: "Nome",
    },
    { index: "numeroTelefone", label: "Telefone" },
    {
      index: "actions",
      label: "",
      width: "40px",
      render: (data) => (
        <DropdownMenu
          items={[
            {
              iconName: "edit-box",
              label: "Editar",
              onClick: () => openModal("edit", data),
            },

            {
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
        title={"Clientes"}
        subtitle={"Gerencie todos os seus clientes"}
        actionButton={
          <Button
            size="sm"
            iconProps={{ iconName: "add", iconPosition: "left" }}
            label="Novo Cliente"
            onClick={() => setModalType("edit")}
          />
        }
      >
        <Table<Client>
          columns={columns}
          data={clients.data || []}
          emptyValues={{
            title: "Ainda não há clientes cadastrados",
            subTitle: "Clique em 'Novo Cliente' para criar um novo.",
          }}
        />
      </PageContainer>

      <AddOrEditClientModal
        selectedClient={selectedClient}
        isOpen={modalType === "edit"}
        onClose={closeModal}
      />
      <ExcludeClientModal
        isOpen={modalType === "exclude"}
        id={selectedClient?.clienteId || ""}
        onClose={closeModal}
      />
    </>
  );
};

export default Clients;
