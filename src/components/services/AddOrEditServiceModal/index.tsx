"use service";

import {
  useCreateService,
  useUpdateService,
} from "@/core/services/services/hooks";
import { Service } from "@/core/services/services/types";
import { Button, Modal, TextInput } from "@istic-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddOrEditServiceModalProps {
  isOpen: boolean;
  selectedService?: Service;
  onClose: () => void;
}
export const AddOrEditServiceModal = ({
  isOpen,
  selectedService,
  onClose,
}: AddOrEditServiceModalProps) => {
  const { register, setValue, handleSubmit, control } = useForm<Service>();
  const registerServiceMutation = useCreateService();
  const editServiceMutation = useUpdateService();
  const isEdit = selectedService?.servicoId;

  async function handleRegisterService(data: Service) {
    if (selectedService !== undefined) {
      await editServiceMutation.mutateAsync({
        servicoId: selectedService.servicoId,
        data: data,
      });
    } else {
      await registerServiceMutation.mutateAsync(data);
    }
    onClose();
  }

  useEffect(() => {
    if (selectedService !== undefined) {
      setValue("nomeServico", String(selectedService?.nomeServico));
      setValue("valorServico", selectedService?.valorServico);
    } else {
      setValue("nomeServico", "");
      setValue("valorServico", undefined);
    }
  }, [selectedService]);

  return (
    <Modal
      contentWidth={400}
      title={`${isEdit ? "Editar" : "Cadastrar"} Serviço`}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <form onSubmit={handleSubmit((data) => handleRegisterService(data))}>
          <div className="flex flex-col w-full gap-4">
            <TextInput
              size="lg"
              label="Nome"
              placeholder="Adicione o nome do serviço"
              {...register("nomeServico")}
              required
            />
            <TextInput
              size="lg"
              label="Valor"
              placeholder="Adicione o valor do serviço"
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
              isLoading={
                registerServiceMutation.isLoading ||
                editServiceMutation.isLoading
              }
              size="md"
              label={`${isEdit ? "Atualizar" : "Cadastrar"} Serviço`}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
