export type Client = {
  id: string;
  nomeCliente: string;
  numeroTelefone: number;
};

export type CreateClient = Omit<Client, "id">;

export type UpdateClient = Partial<CreateClient>;
