"use client";

import { Branch } from "@/core/services/branches/types";
import {
  useCreateEmployee,
  useUpdateEmployee,
} from "@/core/services/employees/hooks";
import { Employee, CreateEmployee } from "@/core/services/employees/types";
import { Button, Modal, Select, TextInput } from "@istic-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddOrEditEmployeeModalProps {
  isOpen: boolean;
  selectedEmployee?: Employee;
  onClose: () => void;
  branches: Branch[];
}

export const AddOrEditEmployeeModal = ({
  isOpen,
  branches,
  selectedEmployee,
  onClose,
}: AddOrEditEmployeeModalProps) => {
  const { register, setValue, handleSubmit, reset, watch } =
    useForm<CreateEmployee>();
  const registerEmployeeMutation = useCreateEmployee();
  const editEmployeeMutation = useUpdateEmployee();
  const isEdit = !!selectedEmployee;
  const filialId = watch("filialId");

  async function handleRegisterEmployee(data: CreateEmployee) {
    const employeeData = {
      ...data,
      salario: Number(data.salario),
      cpf: data.cpf.replace(/\D/g, ""),
      endereco: {
        ...data.endereco,
        enderecoId: selectedEmployee?.endereco?.enderecoId || 0,
      },
      filialId: filialId,
    };
    if (isEdit && selectedEmployee?.id) {
      await editEmployeeMutation.mutateAsync({
        employeeId: selectedEmployee.id,
        data: employeeData,
      });
    } else {
      await registerEmployeeMutation.mutateAsync(employeeData);
    }
    handleOnClose();
  }

  const handleOnClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (isOpen && selectedEmployee) {
      setValue("nome", selectedEmployee.nome);
      setValue("cargo", selectedEmployee.cargo);
      setValue("salario", selectedEmployee.salario);
      setValue(
        "admissao",
        (selectedEmployee.admissao as unknown as string).split(
          "T"
        )[0] as unknown as Date
      );
      setValue("cpf", selectedEmployee.cpf);
      setValue("endereco.cep", selectedEmployee.endereco.cep);
      setValue("endereco.estado", selectedEmployee.endereco.estado);
      setValue("endereco.cidade", selectedEmployee.endereco.cidade);
      setValue("endereco.bairro", selectedEmployee.endereco.bairro);
      setValue("endereco.logradouro", selectedEmployee.endereco.logradouro);
      setValue("endereco.numero", selectedEmployee.endereco.numero);
      setValue("endereco.complemento", selectedEmployee.endereco.complemento);
      setValue("filialId", selectedEmployee.filial.filialId);
    } else {
      reset();
    }
  }, [selectedEmployee, setValue, reset, isOpen]);

  return (
    <Modal
      contentWidth={800}
      title={`${isEdit ? "Editar" : "Cadastrar"} Funcionário`}
      isOpen={isOpen}
      onClose={handleOnClose}
    >
      <form
        onSubmit={handleSubmit(handleRegisterEmployee)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <TextInput label="Nome" {...register("nome")} required />
            <TextInput label="CPF" {...register("cpf")} required />
          </div>
          <div className="flex flex-col gap-2">
            <TextInput
              label="Salário"
              type="number"
              {...register("salario")}
              required
            />
            <TextInput
              label="Admissão"
              type="date"
              {...register("admissao", { valueAsDate: true })}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextInput label="Cargo" {...register("cargo")} required />
          </div>
          <div className="flex flex-col gap-2">
            <Select
              label="Filial"
              placeholder="Selecione uma filial"
              required
              pickerHeight="40dvh"
              {...register("filialId")}
              options={branches.map((branch) => ({
                label: branch.nome,
                value: branch.filialId,
              }))}
              onSelect={(option) => {
                setValue("filialId", Number(option?.value));
              }}
              defaultValue={filialId}
            />{" "}
          </div>
        </div>

        <div className="mt-4 font-medium text-sm">Endereço</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <TextInput label="CEP" {...register("endereco.cep")} required />
            <TextInput
              label="Estado"
              {...register("endereco.estado")}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextInput
              label="Cidade"
              {...register("endereco.cidade")}
              required
            />
            <TextInput
              label="Bairro"
              {...register("endereco.bairro")}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <TextInput
              label="Logradouro"
              {...register("endereco.logradouro")}
              required
            />
          </div>
          <TextInput label="Número" {...register("endereco.numero")} required />
        </div>
        <TextInput label="Complemento" {...register("endereco.complemento")} />
        <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100">
          <Button
            size="md"
            variant="outline"
            label="Cancelar"
            onClick={handleOnClose}
          />
          <Button
            size="md"
            label={isEdit ? "Atualizar Funcionário" : "Cadastrar Funcionário"}
            isLoading={
              registerEmployeeMutation.isLoading ||
              editEmployeeMutation.isLoading
            }
            type="submit"
          />
        </div>
      </form>
    </Modal>
  );
};
