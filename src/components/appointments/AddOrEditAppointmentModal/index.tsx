"use appointment";

import { DateTimePicker } from "@/components/_common/DateTimePicker";
import {
  useCreateAppointment,
  useUpdateAppointment,
} from "@/core/services/appointments/hooks";
import {
  Appointment,
  CreateAppointment,
} from "@/core/services/appointments/types";
import { Client } from "@/core/services/clients/types";
import { Service } from "@/core/services/services/types";
import { Button, Modal, Select } from "@stick-ui/lib";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddOrEditAppointmentModalProps {
  isOpen: boolean;
  clients: Client[];
  services: Service[];
  selectedAppointment?: Appointment;
  onClose: () => void;
}
export const AddOrEditAppointmentModal = ({
  isOpen,
  selectedAppointment,
  clients = [],
  services = [],
  onClose,
}: AddOrEditAppointmentModalProps) => {
  const { register, setValue, handleSubmit, reset } =
    useForm<CreateAppointment>();
  const registerAppointmentMutation = useCreateAppointment();
  const editAppointmentMutation = useUpdateAppointment();
  const isEdit = selectedAppointment?.atendimentoId;

  async function handleRegisterAppointment(data: CreateAppointment) {
    if (selectedAppointment !== undefined) {
      await editAppointmentMutation.mutateAsync({
        atendimentoId: selectedAppointment.atendimentoId,
        data: data,
      });
    } else {
      await registerAppointmentMutation.mutateAsync(data);
    }
    onClose();
    reset();
  }

  useEffect(() => {
    if (selectedAppointment !== undefined) {
      setValue("clienteId", Number(selectedAppointment?.clienteId));
      setValue(
        "servicoId",
        selectedAppointment?.atendimentoHasServico[0].servicoId
      );
      setValue("dataHoraInicial", selectedAppointment?.agenda.dataHoraInicial);
    } else {
      reset();
    }
  }, [selectedAppointment]);

  return (
    <Modal
      contentWidth={400}
      title={`${isEdit ? "Editar" : "Cadastrar"} Atendimento`}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <div className="flex flex-col w-full gap-6">
        <form
          onSubmit={handleSubmit((data) => handleRegisterAppointment(data))}
        >
          <div className="flex flex-col w-full gap-4">
            <Select
              label="Cliente"
              placeholder="Selecione um cliente"
              required
              {...register("clienteId")}
              defaultValue={selectedAppointment?.clienteId || ""}
              options={clients.map((client) => ({
                label: client.nomeCliente,
                value: client.clienteId,
              }))}
              onSelect={function (
                option?: { label: string; value: string } | undefined
              ): void {
                setValue("clienteId", Number(option?.value));
              }}
            />
            <Select
              label="Serviço"
              placeholder="Selecione um serviço"
              required
              {...register("servicoId")}
              defaultValue={
                selectedAppointment?.atendimentoHasServico[0].servicoId || ""
              }
              options={services.map((service) => ({
                label: service.nomeServico,
                value: service.servicoId,
              }))}
              onSelect={function (
                option?: { label: string; value: string } | undefined
              ): void {
                setValue("servicoId", Number(option?.value));
              }}
            />
            <DateTimePicker
              dateLabel="Data"
              initialDate={
                selectedAppointment?.agenda.dataHoraInicial.split("T")[0]
              }
              initialTime={
                selectedAppointment?.agenda.dataHoraInicial.split("T")[1]
              }
              timeLabel="Hora"
              onChange={(date) => {
                setValue("dataHoraInicial", date);
                setValue("dataHoraFinal", date);
              }}
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
              label={`${isEdit ? "Atualizar" : "Cadastrar"} Atendimento`}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
