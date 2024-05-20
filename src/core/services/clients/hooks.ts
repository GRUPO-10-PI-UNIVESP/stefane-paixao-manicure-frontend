import { useMutation, useQuery } from "react-query";
import servicoClient from "./services";
import { CreateClient, Client, UpdateClient } from "./types";

const QUERY_KEY = "login";

export function useCreateClient() {
  return useMutation<Client, Error, CreateClient>(servicoClient.createClient, {
    onSuccess(data) {
      console.log(data, "Success");
    },
    onError(error) {
      console.log(error);
    },
  });
}

export function useUpdateClient() {
  return useMutation<Client, Error, { servicoId: string; data: UpdateClient }>(
    ({ servicoId, data }) => servicoClient.updateClient(servicoId, data),
    {
      onSuccess(data) {
        console.log(data, "Success");
      },
      onError(error) {
        console.log(error);
      },
    }
  );
}

export function useDeleteClient() {
  return useMutation<unknown, Error, string>(servicoClient.deleteClient, {
    onSuccess(data) {
      console.log(data, "Success");
    },
    onError(error) {
      console.log(error);
    },
  });
}

export function useGetClient(servicoId: string) {
  return useQuery<Client, Error>(
    [`getClient`, servicoId],
    () => servicoClient.getClient(servicoId),
    {
      onSuccess(data) {
        console.log(data, "Success");
      },
      onError(error) {
        console.log(error);
      },
    }
  );
}

export function useGetAllClients() {
  return useQuery<Client[], Error>(
    `getAllClients`,
    servicoClient.getAllClients,
    {
      onSuccess(data) {
        console.log(data, "Success");
      },
      onError(error) {
        console.log(error);
      },
    }
  );
}
