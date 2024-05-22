"use client";

import {
  useCreateClient,
  useUpdateClient,
} from "@/core/services/clients/hooks";
import { Client } from "@/core/services/clients/types";
import { Button, Modal, TextInput } from "@stick-ui/lib";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddOrEditClientModalProps {
  isOpen: boolean;
  selectedClient?: Client;
  onClose: () => void;
}
export const AddOrEditClientModal = ({
  isOpen,
  selectedClient,
  onClose,
}: AddOrEditClientModalProps) => {
  const { register, setValue, handleSubmit, control } = useForm<Client>();
  const registerClientMutation = useCreateClient();
  const editClientMutation = useUpdateClient();
  const isEdit = selectedClient?.clienteId;

  async function handleRegisterClient(data: Client) {
    if (selectedClient !== undefined) {
      await editClientMutation.mutateAsync({
        clienteId: selectedClient.clienteId,
        data: data,
      });
    } else {
      await registerClientMutation.mutateAsync(data);
    }
    onClose();
  }

  useEffect(() => {
    if (selectedClient !== undefined) {
      setValue("nomeCliente", String(selectedClient?.nomeCliente));
      setValue("numeroTelefone", String(selectedClient?.numeroTelefone));
    }
  }, [selectedClient]);

  return (
    <Modal
      contentWidth={400}
      title={`${isEdit ? "Editar" : "Cadastrar"} Cliente`}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <form onSubmit={handleSubmit((data) => handleRegisterClient(data))}>
          <div className="flex flex-col w-full gap-4">
            <TextInput
              size="lg"
              label="Nome"
              placeholder="Adicione o nome do cliente"
              {...register("nomeCliente")}
              required
            />
            <TextInput
              size="lg"
              label="Telefone"
              placeholder="Adicione o telefone do cliente"
              {...register("numeroTelefone")}
              required
            />
          </div>

          <div className="w-full gap-2 flex flex-row items-center justify-end pt-6 border-t border-neutral100">
            <Button
              size="xs"
              variant="outline"
              label="Cancelar"
              onClick={() => onClose()}
            />
            <Button
              size="xs"
              label={`${isEdit ? "Atualizar" : "Cadastrar"} Cliente`}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
