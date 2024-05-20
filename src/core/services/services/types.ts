export type Service = {
  id: string;
  nomeServico: string;
  valorServico: number;
};

export type CreateService = Omit<Service, "id">;

export type UpdateService = Partial<CreateService>;
