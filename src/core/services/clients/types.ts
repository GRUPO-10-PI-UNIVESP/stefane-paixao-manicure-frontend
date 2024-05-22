export type Client = {
  clienteId: string;
  nomeCliente: string;
  numeroTelefone: string;
};

export type CreateClient = Omit<Client, "clienteId">;

export type UpdateClient = Partial<CreateClient>;
