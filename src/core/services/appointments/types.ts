export interface Appointment {
  atendimentoId: number;
  clienteId: number;
  agendaId: number;
  valorTotal: string;
  cliente: {
    clienteId: number;
    nomeCliente: string;
    numeroTelefone: string;
  };
  atendimentoHasServico: Array<{
    atendimentoHasServicoId: number;
    atendimentoId: number;
    servicoId: number;
    servico: {
      servicoId: number;
      nomeServico: string;
      valorServico: string;
    };
  }>;
  agenda: {
    agendaId: number;
    dataHoraInicial: string;
    dataHoraFinal: string;
  };
  dataFormatada: {
    data: string;
    horaInicial: string;
    horaFinal: string;
  };
}

export type CreateAppointment = {
  clienteId: number;
  servicoId: number;
  agendaId?: number;
  dataHoraInicial: string;
  dataHoraFinal: string;
};

export type UpdateAppointment = Partial<CreateAppointment>;
