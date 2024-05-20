import axiosInstance from "@/core/configs/axios";
import { Client, CreateClient, UpdateClient } from "./types";

const URL_CONTROLLER = `/servico`;

const routes = {
  async createClient(params: CreateClient) {
    const result = await axiosInstance.post<Client>(`${URL_CONTROLLER}`, {
      ...params,
    });
    return result?.data;
  },

  async updateClient(serviceId: string, params: UpdateClient) {
    const result = await axiosInstance.patch<Client>(
      `${URL_CONTROLLER}/${serviceId}`,
      {
        ...params,
      }
    );
    return result?.data;
  },

  async deleteClient(serviceId: string) {
    const result = await axiosInstance.delete(`${URL_CONTROLLER}/${serviceId}`);
    return result?.data;
  },

  async getClient(serviceId: string) {
    const result = await axiosInstance.get<Client>(
      `${URL_CONTROLLER}/${serviceId}`
    );
    return result?.data;
  },

  async getAllClients() {
    const result = await axiosInstance.get<Client[]>(`${URL_CONTROLLER}s`);
    return result?.data;
  },
};

export default routes;
