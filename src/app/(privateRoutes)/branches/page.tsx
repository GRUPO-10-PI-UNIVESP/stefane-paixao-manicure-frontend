"use client";
import {
  AddOrEditBranchModal,
  ExcludeBranchModal,
} from "@/components/branches";
import { PageContainer } from "@/components/_common/PageContainer";
import { useGetAllBranches } from "@/core/services/branches/hooks";
import { Branch } from "@/core/services/branches/types";
import {
  ActionIcon,
  Button,
  DropdownMenu,
  Loader,
  Table,
  TableColumn,
} from "@istic-ui/react";
import React, { useState } from "react";

const Branches = () => {
  const branches = useGetAllBranches();
  const [modalType, setModalType] = useState<string>();
  const [selectedBranch, setSelectedBranch] = useState<Branch>();
  const openModal = (type: string, branch?: Branch) => {
    setModalType(type);
    setSelectedBranch(branch);
  };
  const closeModal = () => {
    setModalType(undefined);
    setSelectedBranch(undefined);
    branches.refetch();
  };

  const columns: TableColumn<Branch>[] = [
    {
      index: "nome",
      label: "Nome",
    },
    {
      index: "address",
      label: "Endereço",
      render: ({ endereco }) =>
        endereco ? (
          <p>
            {`${endereco.logradouro}, ${endereco.numero} - ${endereco.bairro}`}
          </p>
        ) : (
          <p>Endereço não informado</p>
        ),
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
          mainItem={
            <ActionIcon
              name={`more-details-${data.nome}`}
              aria-label="Mais detalhes"
              variant="subtle"
              iconName="more-2"
            />
          }
        />
      ),
    },
  ];
  return (
    <>
      <PageContainer
        title={"Filiais"}
        subtitle={"Gerencie todas as suas filiais"}
        actionButton={
          <Button
            isLoading={branches.isLoading}
            size="sm"
            iconProps={{ iconName: "add", iconPosition: "left" }}
            label="Nova Filial"
            onClick={() => setModalType("edit")}
          />
        }
      >
        {branches.isLoading && (
          <div className="w-full h-[80dvh] flex items-center justify-center">
            <Loader width="bold" size="xl" color="border-brand-500" />
          </div>
        )}
        {branches.isError && <p>Ocorreu um erro ao carregar as filiais</p>}
        {!branches.isLoading && !branches.isError && (
          <Table<Branch>
            minHeight="calc(100vh - 125px)"
            columns={columns}
            data={branches.data?.filiais || []}
            emptyValues={{
              title: "Ainda não há filiais cadastrados",
              subTitle: "Clique em 'Nova Filial' para criar uma nova.",
            }}
          />
        )}
      </PageContainer>

      <AddOrEditBranchModal
        selectedBranch={selectedBranch}
        isOpen={modalType === "edit"}
        onClose={closeModal}
      />
      <ExcludeBranchModal
        isOpen={modalType === "exclude"}
        id={selectedBranch?.filialId || ""}
        onClose={closeModal}
      />
    </>
  );
};

export default Branches;
