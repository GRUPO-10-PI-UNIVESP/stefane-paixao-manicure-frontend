import { useMutation } from "react-query";
import loginService from "./services";
import { IValidateLoginResponse } from "./types";
import { useToast } from "@/core/contexts/ToastNotification.provider";

export function useValidateLogin() {
  const toast = useToast();
  return useMutation(loginService.validateLogin, {
    onSuccess(data?: IValidateLoginResponse) {
      console.log(data, "Success");
    },
    onError(error) {
      toast.showToast({
        title: "Erro",
        type: "error",
        message: "Erro ao realizar login",
        durationInMs: 10000,
      });
    },
  });
}
