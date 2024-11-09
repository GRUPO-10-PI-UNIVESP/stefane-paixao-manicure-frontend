"use client";
import {
  AddOrEditAppointmentModal,
  ExcludeAppointmentModal,
} from "@/components/appointments";
import { PageContainer } from "@/components/_common/PageContainer";
import { Appointment } from "@/core/services/appointments/types";
import { useGetAllClients } from "@/core/services/clients/hooks";
import { useGetAllServices } from "@/core/services/services/hooks";
import { ActionIcon, Button, Icon, Loader, Table, Text } from "@istic-ui/react";
import React, { useState } from "react";
import { useGetAllAppointments } from "@/core/services/appointments/hooks";
import { parse } from "date-fns";
import { useGetAllBranches } from "@/core/services/branches/hooks";

enum ModalType {
  Edit = "edit",
  Exclude = "exclude",
}

const Appointments = () => {
  const services = useGetAllServices();
  const clients = useGetAllClients();
  const appointments = useGetAllAppointments();
  const branches = useGetAllBranches();

  const [modalType, setModalType] = useState<ModalType>();
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>();

  const openModal = (type: ModalType, appointment?: Appointment) => {
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
            isLoading={appointments.isLoading}
            size="sm"
            iconProps={{ iconName: "add", iconPosition: "left" }}
            label="Novo Atendimento"
            onClick={() => setModalType(ModalType.Edit)}
          />
        }
      >
        <div className="bg-white flex flex-col gap-4 ">
          {appointments.isLoading && (
            <div className="w-full h-[80dvh] flex items-center justify-center">
              <Loader width="bold" size="xl" color="border-brand-500" />
            </div>
          )}
          {appointments.isError && (
            <p>Ocorreu um erro ao carregar os atendimentos</p>
          )}

          {!appointments.isLoading &&
          !appointments.isError &&
          groupedAppointments &&
          sortedDates.length > 0 ? (
            sortedDates.map((date) => (
              <div key={date} className="flex flex-col gap-4">
                <Text size="md" weight="bold" color="text-brand-500">
                  {date}
                </Text>

                <Table<Appointment>
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
                            onClick={() => openModal(ModalType.Edit, data)}
                          />
                          <ActionIcon
                            iconName="trash"
                            variant="subtle"
                            size="xs"
                            onClick={() => openModal(ModalType.Exclude, data)}
                          />
                        </div>
                      ),
                    },
                  ]}
                  data={groupedAppointments[date]}
                />
              </div>
            ))
          ) : (
            <div className="w-full h-[80dvh] flex flex-col items-center justify-center">
              <Icon name="inbox-2" size={48} color="text-brand-500" />

              <Text
                color="text-neutral-800"
                weight="regular"
                size="lg"
                style={{
                  textAlign: "center",
                }}
              >
                Nenhum atendimento encontrado
              </Text>
              <Text
                color="text-neutral-600"
                weight="regular"
                size="sm"
                style={{
                  textAlign: "center",
                }}
              >
                Clique no botão acima para adicionar um novo atendimento
              </Text>
            </div>
          )}
        </div>
      </PageContainer>
      <AddOrEditAppointmentModal
        selectedAppointment={selectedAppointment}
        isOpen={modalType === ModalType.Edit}
        onClose={closeModal}
        clients={clients.data || []}
        services={services.data || []}
        branches={branches.data?.filiais || []}
      />
      <ExcludeAppointmentModal
        isOpen={modalType === ModalType.Exclude}
        id={selectedAppointment?.atendimentoId || 0}
        onClose={closeModal}
      />
    </>
  );
};

export default Appointments;
