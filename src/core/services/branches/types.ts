export type Branch = {
  filialId: string;
  nomeFilial: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type CreateBranch = Omit<Branch, "filialId">;

export type UpdateBranch = Partial<CreateBranch>;
