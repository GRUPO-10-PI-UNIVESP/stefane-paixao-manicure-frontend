import { useMutation, useQuery } from "react-query";
import servicoService from "./services";
import { CreateService, Service, UpdateService } from "./types";

const QUERY_KEY = "login";

export function useCreateService() {
  return useMutation<Service, Error, CreateService>(
    servicoService.createService,
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

export function useUpdateService() {
  return useMutation<
    Service,
    Error,
    { servicoId: string; data: UpdateService }
  >(({ servicoId, data }) => servicoService.updateService(servicoId, data), {
    onSuccess(data) {
      console.log(data, "Success");
    },
    onError(error) {
      console.log(error);
    },
  });
}

export function useDeleteService() {
  return useMutation<unknown, Error, string>(servicoService.deleteService, {
    onSuccess(data) {
      console.log(data, "Success");
    },
    onError(error) {
      console.log(error);
    },
  });
}

export function useGetService(servicoId: string) {
  return useQuery<Service, Error>(
    [`getService`, servicoId],
    () => servicoService.getService(servicoId),
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

export function useGetAllServices() {
  return useQuery<Service[], Error>(
    `getAllServices`,
    servicoService.getAllServices,
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess(data) {
        console.log(data, "Success");
      },
      onError(error) {
        console.log(error);
      },
    }
  );
}
