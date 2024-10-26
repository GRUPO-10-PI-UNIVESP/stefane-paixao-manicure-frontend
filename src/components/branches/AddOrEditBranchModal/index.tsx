"use branch";

import {
  useCreateBranch,
  useUpdateBranch,
} from "@/core/services/branches/hooks";
import { Branch } from "@/core/services/branches/types";
import { useViaCep } from "@/core/shared/viacep/hooks";
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
  const { getValues, register, setValue, handleSubmit, reset } =
    useForm<Branch>({
      defaultValues: {
        endereco: {
          cep: "",
          logradouro: "",
          numero: "",
          bairro: "",
          cidade: "",
          complemento: "",
          estado: "",
        },
      },
    });
  const registerBranchMutation = useCreateBranch();
  const editBranchMutation = useUpdateBranch();
  const isEdit = selectedBranch?.filialId;
  const viacep = useViaCep();
  async function handleRegisterBranch(data: Branch) {
    if (selectedBranch !== undefined) {
      await editBranchMutation.mutateAsync({
        filialId: selectedBranch.filialId,
        data: { ...data },
      });
    } else {
      await registerBranchMutation.mutateAsync({
        ...data,
      });
    }
    handleOnClose();
  }
  const handleOnClose = () => {
    onClose();
    setValue("nome", "");
    setValue("filialId", "");

    setValue("endereco.cep", "");
    setValue("endereco.logradouro", "");
    setValue("endereco.numero", "");
    setValue("endereco.bairro", "");
    setValue("endereco.cidade", "");
    setValue("endereco.estado", "");
    setValue("endereco.complemento", "");

    reset();
  };

  const handleViaCep = async (cep: string) => {
    if (cep.length !== 8) return;
    const response = await viacep.mutateAsync(cep);
    console.log(response);
    if (response) {
      setValue("endereco.cep", response?.cep);
      setValue("endereco.logradouro", response?.logradouro);
      setValue("endereco.bairro", response?.bairro);
      setValue("endereco.cidade", response?.localidade);
      setValue("endereco.estado", response?.uf);
    }
  };
  console.log(getValues());
  useEffect(() => {
    if (selectedBranch !== undefined) {
      setValue("nome", String(selectedBranch?.nome));
      setValue("filialId", String(selectedBranch?.filialId));
      setValue("endereco.cep", String(selectedBranch?.endereco.cep));
      setValue(
        "endereco.logradouro",
        String(selectedBranch?.endereco.logradouro)
      );
      setValue("endereco.numero", String(selectedBranch?.endereco.numero));
      setValue("endereco.bairro", String(selectedBranch?.endereco.bairro));
      setValue("endereco.cidade", String(selectedBranch?.endereco.cidade));
      setValue("endereco.estado", String(selectedBranch?.endereco.estado));
      setValue(
        "endereco.complemento",
        String(selectedBranch?.endereco.complemento)
      );
    } else {
      setValue("nome", "");
      setValue("filialId", "");

      setValue("endereco.cep", "");
      setValue("endereco.logradouro", "");
      setValue("endereco.numero", "");
      setValue("endereco.bairro", "");
      setValue("endereco.cidade", "");
      setValue("endereco.estado", "");
      setValue("endereco.complemento", "");

      reset();
    }
  }, [selectedBranch, reset, setValue]);

  return (
    <Modal
      contentWidth={400}
      title={`${isEdit ? "Editar" : "Cadastrar"} Filial`}
      isOpen={isOpen}
      onClose={() => handleOnClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <form onSubmit={handleSubmit((data) => handleRegisterBranch(data))}>
          <div className="flex flex-col w-full gap-4">
            <TextInput
              size="lg"
              label="Nome"
              placeholder="Adicione o nome da filial"
              {...register("nome")}
              required
            />

            <TextInput
              size="lg"
              label="CEP"
              placeholder="Adicione o CEP"
              {...register("endereco.cep")}
              required
              disabled={viacep.isLoading}
              onChange={(e) => handleViaCep(e.target.value.replace(/\D/g, ""))}
            />
            <div className="grid grid-cols-1 gap-4 pb-4">
              <TextInput
                size="lg"
                label="Rua"
                placeholder="Adicione a rua"
                required
                {...register("endereco.logradouro")}
                disabled={viacep.isLoading}
              />
              <div className={"grid grid-cols-2 gap-4"}>
                <TextInput
                  size="lg"
                  label="Número"
                  placeholder="Adicione o número"
                  required
                  {...register("endereco.numero")}
                  disabled={viacep.isLoading}
                />

                <TextInput
                  size="lg"
                  label="Bairro"
                  placeholder="Adicione o bairro"
                  required
                  {...register("endereco.bairro")}
                  disabled={viacep.isLoading}
                />
              </div>
              <div className={"grid grid-cols-2 gap-4"}>
                <TextInput
                  size="lg"
                  label="Cidade"
                  placeholder="Adicione a cidade"
                  required
                  {...register("endereco.cidade")}
                  disabled={viacep.isLoading}
                />

                <TextInput
                  size="lg"
                  label="Estado"
                  placeholder="Adicione o estado"
                  required
                  {...register("endereco.estado")}
                  disabled={viacep.isLoading}
                />
              </div>
              <TextInput
                size="lg"
                label="Complemento"
                placeholder="Adicione o complemento"
                {...register("endereco.complemento")}
                disabled={viacep.isLoading}
              />
            </div>
          </div>
          <div className="w-full gap-2 flex flex-row items-center justify-end pt-6 border-t border-neutral-100">
            <Button
              size="md"
              variant="outline"
              label="Cancelar"
              onClick={() => handleOnClose()}
            />
            <Button
              isLoading={
                registerBranchMutation.isLoading || editBranchMutation.isLoading
              }
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
