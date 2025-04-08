"use client";
import {
  AddOrEditEmployeeModal,
  ExcludeEmployeeModal,
} from "@/components/employees";
import { PageContainer } from "@/components/_common/PageContainer";
import { useGetAllEmployees } from "@/core/services/employees/hooks";
import { Employee } from "@/core/services/employees/types";
import {
  ActionIcon,
  Button,
  DropdownMenu,
  Loader,
  Table,
  TableColumn,
} from "@istic-ui/react";
import React, { useState } from "react";
import { useGetAllBranches } from "@/core/services/branches/hooks";

const Employees = () => {
  const employees = useGetAllEmployees();
  const branches = useGetAllBranches();
  const [modalType, setModalType] = useState<string>();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();
  const openModal = (type: string, employee?: Employee) => {
    setModalType(type);
    setSelectedEmployee(employee);
  };
  const closeModal = () => {
    setModalType(undefined);
    setSelectedEmployee(undefined);
    employees.refetch();
  };

  const columns: TableColumn<Employee>[] = [
    {
      index: "nome",
      label: "Nome",
    },
    {
      index: "cargo",
      label: "Cargo",
    },
    {
      index: "salario",
      label: "Salário",
      render: (data) => `R$ ${data.salario.toFixed(2).replace(".", ",")}`,
    },
    {
      index: "admissao",
      label: "Admissão",
      render: (data) => {
        const date = new Date(data.admissao);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
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
              name={`more-details-${data.nome}-${data.cpf}`}
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
        title={"Funcionários"}
        subtitle={"Gerencie todos os seus funcionários"}
        actionButton={
          <Button
            isLoading={employees.isLoading}
            size="sm"
            iconProps={{ iconName: "add", iconPosition: "left" }}
            label="Novo Funcionário"
            onClick={() => setModalType("edit")}
          />
        }
      >
        {employees.isLoading && (
          <div className="w-full h-[80dvh] flex items-center justify-center">
            <Loader width="bold" size="xl" color="border-brand-500" />
          </div>
        )}
        {employees.isError && (
          <p>Ocorreu um erro ao carregar os funcionários</p>
        )}
        {!employees.isLoading && !employees.isError && (
          <Table<Employee>
            minHeight="calc(100vh - 125px)"
            columns={columns}
            data={employees.data?.result || []}
            emptyValues={{
              title: "Ainda não há funcionários cadastrados",
              subTitle: "Clique em 'Novo Funcionário' para criar um novo.",
            }}
          />
        )}
      </PageContainer>

      <AddOrEditEmployeeModal
        selectedEmployee={selectedEmployee}
        isOpen={modalType === "edit"}
        branches={branches.data?.filiais || []}
        onClose={closeModal}
      />
      <ExcludeEmployeeModal
        isOpen={modalType === "exclude"}
        id={selectedEmployee?.id}
        onClose={closeModal}
      />
    </>
  );
};

export default Employees;
