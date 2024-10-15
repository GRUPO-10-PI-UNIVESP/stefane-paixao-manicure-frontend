import { useMutation, useQuery, useQueryClient } from "react-query";
import appointmentAppointment from "@/core/services/appointments/services";
import {
  Appointment,
  CreateAppointment,
  UpdateAppointment,
} from "@/core/services/appointments/types";

const QUERY_KEY = "getAllAppointments";

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation<Appointment, Error, CreateAppointment>(
    appointmentAppointment.createAppointment,
    {
      onSuccess(data) {
        console.log("CreateAppointment onSuccess", data);
        queryClient.invalidateQueries(QUERY_KEY, { exact: true });
        queryClient.refetchQueries(QUERY_KEY, { exact: true });
      },
      onError(error) {
        console.error("CreateAppointment onError", error);
      },
    }
  );
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();
  return useMutation<
    Appointment,
    Error,
    { atendimentoId: number; data: UpdateAppointment }
  >(
    ({ atendimentoId, data }) =>
      appointmentAppointment.updateAppointment(atendimentoId, data),
    {
      onSuccess(data) {
        queryClient.invalidateQueries(QUERY_KEY, { exact: true });
        queryClient.refetchQueries(QUERY_KEY, { exact: true });
      },
      onError(error) {
        console.error("UpdateAppointment onError", error);
      },
    }
  );
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation(appointmentAppointment.deleteAppointment, {
    onSuccess(data) {
      queryClient.invalidateQueries(QUERY_KEY, { exact: true });
      queryClient.refetchQueries(QUERY_KEY, { exact: true });
    },
    onError(error) {
      console.error("DeleteAppointment onError", error);
    },
  });
}

export function useGetAppointment(atendimentoId: number) {
  return useQuery<Appointment, Error>(
    [`getAppointment`, atendimentoId],
    () => appointmentAppointment.getAppointment(atendimentoId),
    {
      onSuccess(data) {
        console.log("GetAppointment onSuccess", data);
      },
      onError(error) {
        console.error("GetAppointment onError", error);
      },
    }
  );
}

export function useGetAllAppointments() {
  return useQuery<Appointment[], Error>(
    [QUERY_KEY],
    () => appointmentAppointment.getAllAppointments(),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError(error) {
        console.error("GetAllAppointments onError", error);
      },
    }
  );
}
