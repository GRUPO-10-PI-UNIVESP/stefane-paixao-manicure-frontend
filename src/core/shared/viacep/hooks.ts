import { useMutation } from "react-query";
import { ViaCepData } from "./types";
const QUERY = "useViaCep";

export function useViaCep() {
  return useMutation(
    [QUERY],
    //specify the return type of the function
    async (cep: string): Promise<ViaCepData> => {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error("CEP inválido");
      }
      return response.json();
    },

    {
      onError() {},
    }
  );
}
