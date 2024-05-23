import axiosInstance from "@/core/configs/axios";
import { Appointment, CreateAppointment, UpdateAppointment } from "./types";

const URL_CONTROLLER = `/atendimento`;

const routes = {
  async createAppointment(params: CreateAppointment) {
    const result = await axiosInstance.post<Appointment>(`${URL_CONTROLLER}`, {
      ...params,
    });
    return result?.data;
  },

  async updateAppointment(atendimentoId: number, params: UpdateAppointment) {
    const result = await axiosInstance.patch<Appointment>(
      `${URL_CONTROLLER}/${atendimentoId}`,
      {
        ...params,
      }
    );
    return result?.data;
  },

  async deleteAppointment(atendimentoId: number) {
    const result = await axiosInstance.delete(
      `${URL_CONTROLLER}/${atendimentoId}`
    );
    return result?.data;
  },

  async getAppointment(atendimentoId: number) {
    const result = await axiosInstance.get<Appointment>(
      `${URL_CONTROLLER}/${atendimentoId}`
    );
    return result?.data;
  },

  async getAllAppointments() {
    const result = await axiosInstance.get<Appointment[]>(`${URL_CONTROLLER}s`);
    return result?.data;
  },
};

export default routes;
