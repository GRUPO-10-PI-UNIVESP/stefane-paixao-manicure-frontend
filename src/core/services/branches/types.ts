export type Branch = {
  servicoId: string;
  nomeServico: string;
  valorServico: number;
};

export type CreateBranch = Omit<Branch, "servicoId">;

export type UpdateBranch = Partial<CreateBranch>;
