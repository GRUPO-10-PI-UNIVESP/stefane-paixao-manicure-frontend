export type Employee = {
  id: number;
  nome: string;
  cargo: string;
  salario: number;
  admissao: Date;
  cpf: string;
  desligamento: null;
  enderecoId: number;
  filialId: number;
  endereco: {
    enderecoId: number;
    bairro: string;
    cidade: string;
    estado: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
  };
  filial: {
    filialId: number;
    nome: string;
    enderecoId: number;
  };
};

export type EmployeeListResponse = {
  result: Employee[];
  message: string;
};

export type CreateEmployee = {
  nome: string;
  cargo: string;
  salario: number;
  admissao: Date;
  cpf: string;
  filialId: number;
  endereco: {
    enderecoId: number;
    bairro: string;
    cidade: string;
    estado: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cep: string;
  };
};

export type UpdateEmployee = Partial<CreateEmployee>;
