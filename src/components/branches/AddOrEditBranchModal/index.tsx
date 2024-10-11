"use branch";

import {
  useCreateBranch,
  useUpdateBranch,
} from "@/core/services/branches/hooks";
import { Branch } from "@/core/services/branches/types";
import { Button, Modal, TextInput } from "@istic-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddOrEditBranchModalProps {
  isOpen: boolean;
  selectedBranch?: Branch;
  onClose: () => void;
}
export const AddOrEditBranchModal = ({
  isOpen,
  selectedBranch,
  onClose,
}: AddOrEditBranchModalProps) => {
  const { register, setValue, handleSubmit, control } = useForm<Branch>();
  const registerBranchMutation = useCreateBranch();
  const editBranchMutation = useUpdateBranch();
  const isEdit = selectedBranch?.servicoId;

  async function handleRegisterBranch(data: Branch) {
    if (selectedBranch !== undefined) {
      await editBranchMutation.mutateAsync({
        servicoId: selectedBranch.servicoId,
        data: data,
      });
    } else {
      await registerBranchMutation.mutateAsync(data);
    }
    onClose();
  }

  useEffect(() => {
    if (selectedBranch !== undefined) {
      setValue("nomeServico", String(selectedBranch?.nomeServico));
      setValue("valorServico", selectedBranch?.valorServico);
    }
  }, [selectedBranch]);

  return (
    <Modal
      contentWidth={400}
      title={`${isEdit ? "Editar" : "Cadastrar"} Filial`}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <form onSubmit={handleSubmit((data) => handleRegisterBranch(data))}>
          <div className="flex flex-col w-full gap-4">
            <TextInput
              size="lg"
              label="Nome"
              placeholder="Adicione o nome do filial"
              {...register("nomeServico")}
              required
            />
            <TextInput
              size="lg"
              label="Valor"
              placeholder="Adicione o valor do filial"
              {...register("valorServico")}
              required
            />
          </div>

          <div className="w-full gap-2 flex flex-row items-center justify-end pt-6 border-t border-neutral100">
            <Button
              size="md"
              variant="outline"
              label="Cancelar"
              onClick={() => onClose()}
            />
            <Button
              size="md"
              label={`${isEdit ? "Atualizar" : "Cadastrar"} Filial`}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
