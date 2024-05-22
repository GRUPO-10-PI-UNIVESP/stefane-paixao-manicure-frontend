import { useMutation, useQuery, useQueryClient } from "react-query";
import clienteClient from "@/core/services/clients/services";
import {
  Client,
  CreateClient,
  UpdateClient,
} from "@/core/services/clients/types";

const QUERY_KEY = "getAllClients";

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation<Client, Error, CreateClient>(clienteClient.createClient, {
    onSuccess(data) {
      console.log("CreateClient onSuccess", data);
      queryClient.invalidateQueries(QUERY_KEY, { exact: true });
      queryClient.refetchQueries(QUERY_KEY, { exact: true });
    },
    onError(error) {
      console.error("CreateClient onError", error);
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation<Client, Error, { clienteId: string; data: UpdateClient }>(
    ({ clienteId, data }) => clienteClient.updateClient(clienteId, data),
    {
      onSuccess(data) {
        console.log("UpdateClient onSuccess", data);
        queryClient.invalidateQueries(QUERY_KEY, { exact: true });
        queryClient.refetchQueries(QUERY_KEY, { exact: true });
      },
      onError(error) {
        console.error("UpdateClient onError", error);
      },
    }
  );
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation(clienteClient.deleteClient, {
    onSuccess(data) {
      console.log("DeleteClient onSuccess", data);
      queryClient.invalidateQueries(QUERY_KEY, { exact: true });
      queryClient.refetchQueries(QUERY_KEY, { exact: true });
    },
    onError(error) {
      console.error("DeleteClient onError", error);
    },
  });
}

export function useGetClient(clienteId: string) {
  return useQuery<Client, Error>(
    [`getClient`, clienteId],
    () => clienteClient.getClient(clienteId),
    {
      onSuccess(data) {
        console.log("GetClient onSuccess", data);
      },
      onError(error) {
        console.error("GetClient onError", error);
      },
    }
  );
}

export function useGetAllClients() {
  return useQuery<Client[], Error>(
    [QUERY_KEY],
    () => clienteClient.getAllClients(),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError(error) {
        console.error("GetAllClients onError", error);
      },
    }
  );
}
