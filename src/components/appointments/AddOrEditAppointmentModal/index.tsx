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
import { Branch } from "@/core/services/branches/types";
import { Client } from "@/core/services/clients/types";
import { Service } from "@/core/services/services/types";
import { Button, Modal, Select } from "@istic-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddOrEditAppointmentModalProps {
  isOpen: boolean;
  clients: Client[];
  services: Service[];
  branches: Branch[];
  selectedAppointment?: Appointment;
  onClose: () => void;
}
export const AddOrEditAppointmentModal = ({
  isOpen,
  selectedAppointment,
  clients = [],
  services = [],
  branches = [],
  onClose,
}: AddOrEditAppointmentModalProps) => {
  const { register, setValue, handleSubmit, reset, watch } =
    useForm<CreateAppointment>();
  const registerAppointmentMutation = useCreateAppointment();
  const editAppointmentMutation = useUpdateAppointment();
  const isEdit = selectedAppointment?.atendimentoId;
  const filialId = watch("filialId");
  const clienteId = watch("clienteId");
  const servicoId = watch("servicoId");

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
      setValue("agendaId", Number(selectedAppointment?.agendaId));
      setValue("filialId", Number(selectedAppointment?.filialId));
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
              label="Filial"
              placeholder="Selecione uma filial"
              required
              pickerHeight="40dvh"
              {...register("filialId")}
              options={branches.map((branch) => ({
                label: branch.nomeFilial,
                value: branch.filialId,
              }))}
              onSelect={(option?: { label: string; value: string }) => {
                setValue("filialId", Number(option?.value));
              }}
              defaultValue={filialId}
            />
            <Select
              label="Cliente"
              placeholder="Selecione um cliente"
              required
              {...register("clienteId")}
              pickerHeight="40dvh"
              options={clients.map((client) => ({
                label: client.nomeCliente,
                value: client.clienteId,
              }))}
              onSelect={(option?: { label: string; value: string }) => {
                setValue("clienteId", Number(option?.value));
              }}
              defaultValue={clienteId}
            />
            <Select
              label="Serviço"
              placeholder="Selecione um serviço"
              required
              pickerHeight="40dvh"
              {...register("servicoId")}
              options={services.map((service) => ({
                label: service.nomeServico,
                value: service.servicoId,
              }))}
              onSelect={(option?: { label: string; value: string }) => {
                setValue("servicoId", Number(option?.value));
              }}
              defaultValue={servicoId}
            />
            <DateTimePicker
              dateLabel="Data"
              initialDate={
                selectedAppointment?.agenda.dataHoraInicial.split("T")[0] || ""
              }
              initialTime={
                selectedAppointment?.agenda.dataHoraInicial.split("T")[1] || ""
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
              size="md"
              variant="outline"
              label="Cancelar"
              onClick={() => onClose()}
            />
            <Button
              size="md"
              label={`${isEdit ? "Atualizar" : "Cadastrar"} Atendimento`}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
