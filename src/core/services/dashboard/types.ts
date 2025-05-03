export type FrequentClient = {
  atendimento: {
    agendaId: number;
    atendimentoId: number;
    clienteId: number;
    filialId: number;
    valorTotal: number;
  }[];
  clienteId: number;
  nomeCliente: string;
  numeroTelefone: string;
};

export type LastYearAppointment = {
  atendimentos: {
    atendimentoHasServicoId: number;
    atendimentoId: number;
    servicoId: number;
    atendimento: {
      agendaId: number;
      atendimentoId: number;
      clienteId: number;
      filialId: number;
      valorTotal: number;
    };
    servico: {
      servicoId: number;
      nomeServico: string;
      valorServico: number;
    };
  }[];
};

export type TotalMoneyResponse = {
  totalFaturamento: number;
};

export type TotalMoneyPerMonthResponse = {
  ano: string;
  mes: string;
  totalValor: number;
};

export type FrequentService = {
  nomeServico: string;
  frequencia: number;
};

export type FrequentServiceByClient = {
  clientId: number;
  nomeCliente: string;
  servicosMaisFrequentes: FrequentService[];
};

export type TotalSpentByClient = {
  clientId: number;
  nomeCliente: string;
  totalGasto: number;
};

// Novos tipos para substituir 'any'
export type BranchAppointmentsLastYear = {
  filialId: number;
  nomeFilial: string;
  totalAtendimentos: number;
};

export type BranchMoneyPerAppointment = {
  filialId: number;
  nomeFilial: string;
  totalValorServicos: number;
};

export type BranchMonthlyRevenue = {
  filialId: number;
  nomeFilial: string;
  ano: string;
  mes: number;
  totalValor: number;
};

export type BranchFrequentServices = {
  filialId: number;
  nomeFilial: string;
  servicosMaisFrequentes: FrequentService[];
};

export type BranchFrequentServicesByClient = {
  filialId: number;
  nomeFilial: string;
  clientes: FrequentServiceByClient[];
};
