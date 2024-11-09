"use service";

import {
  useCreateService,
  useUpdateService,
} from "@/core/services/services/hooks";
import { Service } from "@/core/services/services/types";
import { Button, Modal, NumberInput, TextInput } from "@istic-ui/react";
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
  const { register, setValue, handleSubmit } = useForm<Service>();
  const registerServiceMutation = useCreateService();
  const editServiceMutation = useUpdateService();
  const isEdit = selectedService?.servicoId;

  async function handleRegisterService(data: Service) {
    const convertedData: Service = {
      ...data,
      valorServico: Number(data.valorServico?.toString().replace(",", ".")),
    };

    if (selectedService !== undefined) {
      await editServiceMutation.mutateAsync({
        servicoId: selectedService.servicoId,
        data: convertedData,
      });
    } else {
      await registerServiceMutation.mutateAsync(convertedData);
    }
    handleOnClose();
  }

  const handleOnClose = () => {
    onClose();
    setValue("nomeServico", "");
    setValue("valorServico", undefined);
  };

  useEffect(() => {
    if (selectedService !== undefined) {
      setValue("nomeServico", String(selectedService?.nomeServico));
      setValue("valorServico", selectedService?.valorServico);
    } else {
      console.log("selectedService", selectedService);
      setValue("nomeServico", "");
      setValue("valorServico", undefined);
    }
  }, [selectedService, setValue]);

  return (
    <Modal
      contentWidth={400}
      title={`${isEdit ? "Editar" : "Cadastrar"} Serviço`}
      isOpen={isOpen}
      onClose={() => handleOnClose()}
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
            <NumberInput
              size="lg"
              label="Valor"
              decimalSeparator=","
              placeholder="Adicione o valor do serviço"
              {...register("valorServico")}
              onChange={(value) => setValue("valorServico", value)}
              required
            />
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
