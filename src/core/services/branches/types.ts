export type Branch = {
  filialId: string;
  nome: string;
  endereco: {
    enderecoId?: string;
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    complemento: string;
  };
};
export type ListBranches = {
  filiais: Branch[];
  mensagem: string;
};

export type CreateBranch = Omit<Branch, "filialId">;

export type UpdateBranch = Partial<CreateBranch>;
