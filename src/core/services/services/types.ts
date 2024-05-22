export type Service = {
  servicoId: string;
  nomeServico: string;
  valorServico: number;
};

export type CreateService = Omit<Service, "servicoId">;

export type UpdateService = Partial<CreateService>;
