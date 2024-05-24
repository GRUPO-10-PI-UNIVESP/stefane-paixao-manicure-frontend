"use client";
import {
  AddOrEditAppointmentModal,
  ExcludeAppointmentModal,
} from "@/components/appointments";
import { PageContainer } from "@/components/_common/PageContainer";
import { Appointment } from "@/core/services/appointments/types";
import { useGetAllClients } from "@/core/services/clients/hooks";
import { useGetAllServices } from "@/core/services/services/hooks";
import { ActionIcon, Button, Table, Text } from "@stick-ui/lib";
import React, { useState } from "react";
import { useGetAllAppointments } from "@/core/services/appointments/hooks";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const Appointments = () => {
  const services = useGetAllServices();
  const clients = useGetAllClients();
  const appointments = useGetAllAppointments();

  const [modalType, setModalType] = useState<string>();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();

  const openModal = (type: string, appointment?: Appointment) => {
    setModalType(type);
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setModalType(undefined);
    setSelectedAppointment(undefined);
    appointments.refetch();
  };

  const groupedAppointments = appointments.data?.reduce(
    (groups, appointment) => {
      const date = appointment.dataFormatada.data;

      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    },
    {}
  );

  const sortedDates = groupedAppointments
    ? Object.keys(groupedAppointments).sort((a, b) => {
        const dateA = parse(a, "dd/MM/yyyy", new Date());
        const dateB = parse(b, "dd/MM/yyyy", new Date());
        return dateB - dateA;
      })
    : [];

  return (
    <>
      <PageContainer
        title={"Atendimentos"}
        subtitle={"Gerencie todos os seus atendimentos"}
        actionButton={
          <Button
            size="sm"
            iconProps={{ iconName: "add", iconPosition: "left" }}
            label="Novo Atendimento"
            onClick={() => setModalType("edit")}
          />
        }
      >
        <div className="bg-white flex flex-col gap-4 ">
          {appointments.isLoading && <p>Carregando...</p>}
          {appointments.isError && (
            <p>Ocorreu um erro ao carregar os atendimentos</p>
          )}

          {!appointments.isLoading &&
            !appointments.isError &&
            groupedAppointments &&
            sortedDates.map((date) => (
              <div key={date} className="flex flex-col gap-4">
                <Text size="md" weight="bold" color="text-brand500">
                  {date}
                </Text>

                <Table
                  columns={[
                    {
                      index: "cliente",
                      label: "Cliente",
                      width: "200px",

                      render: (data) => data.cliente.nomeCliente,
                    },
                    {
                      index: "servico",
                      label: "Serviço",
                      width: "50%",
                      render: (data) =>
                        data.atendimentoHasServico
                          .map((servico) => servico.servico.nomeServico)
                          .join(", "),
                    },
                    {
                      index: "horaInicial",
                      label: "Hora",
                      render: (data) => data.dataFormatada.horaInicial,
                    },
                    {
                      index: "actions",
                      label: "Ações",
                      align: "center",
                      width: "100px",
                      render: (data) => (
                        <div className="flex items-center flex-row">
                          <ActionIcon
                            iconName="edit-box"
                            variant="subtle"
                            size="xs"
                            onClick={() => openModal("edit", data)}
                          />
                          <ActionIcon
                            iconName="trash"
                            variant="subtle"
                            size="xs"
                            onClick={() => openModal("exclude", data)}
                          />
                        </div>
                      ),
                    },
                  ]}
                  data={groupedAppointments[date]}
                />
              </div>
            ))}
        </div>
      </PageContainer>
      <AddOrEditAppointmentModal
        selectedAppointment={selectedAppointment}
        isOpen={modalType === "edit"}
        onClose={closeModal}
        clients={clients.data || []}
        services={services.data || []}
      />
      <ExcludeAppointmentModal
        isOpen={modalType === "exclude"}
        id={selectedAppointment?.atendimentoId || 0}
        onClose={closeModal}
      />
    </>
  );
};

export default Appointments;
