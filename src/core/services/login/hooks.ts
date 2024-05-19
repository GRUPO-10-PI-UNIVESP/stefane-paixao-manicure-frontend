import { useMutation } from "react-query";
import loginService from "./services";
import { IValidateLoginResponse } from "./types";

const QUERY_KEY = "login";

export function useValidateLogin() {
  return useMutation(loginService.validateLogin, {
    onSuccess(data?: IValidateLoginResponse) {
      console.log(data, "Success");
    },
    onError(error) {
      console.log(error);
    },
  });
}
