import axiosInstance from "@/core/configs/axios";
import { Service, CreateService, UpdateService } from "./types";

const URL_CONTROLLER = `/servico`;

const routes = {
  async createService(params: CreateService) {
    const result = await axiosInstance.post<Service>(`${URL_CONTROLLER}`, {
      ...params,
    });
    return result?.data;
  },

  async updateService(serviceId: string, params: UpdateService) {
    const result = await axiosInstance.patch<Service>(
      `${URL_CONTROLLER}/${serviceId}`,
      {
        ...params,
      }
    );
    return result?.data;
  },

  async deleteService(serviceId: string) {
    const result = await axiosInstance.delete(`${URL_CONTROLLER}/${serviceId}`);
    return result?.data;
  },

  async getService(serviceId: string) {
    const result = await axiosInstance.get<Service>(
      `${URL_CONTROLLER}/${serviceId}`
    );
    return result?.data;
  },

  async getAllServices() {
    const result = await axiosInstance.get<Service[]>(`${URL_CONTROLLER}s`);
    return result?.data;
  },
};

export default routes;
