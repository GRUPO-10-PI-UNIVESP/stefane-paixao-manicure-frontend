export type ILogin = {
  usuario: string;
  senha: string;
};
export type ILoginCreate = {
  loginId?: number;
  usuario: string;
  email: string;
  senha: string;
};
export type IValidateLoginResponse = {
  mensagem: string;
  login?: ILoginCreate;
};
