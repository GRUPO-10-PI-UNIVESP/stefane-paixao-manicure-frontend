import axiosInstance from "@/core/configs/axios";
import { Client, CreateClient, UpdateClient } from "./types";

const URL_CONTROLLER = `/cliente`;

const routes = {
  async createClient(params: CreateClient) {
    const result = await axiosInstance.post<Client>(`${URL_CONTROLLER}`, {
      ...params,
    });
    return result?.data;
  },

  async updateClient(clienteId: string, params: UpdateClient) {
    const result = await axiosInstance.patch<Client>(
      `${URL_CONTROLLER}/${clienteId}`,
      {
        ...params,
      }
    );
    return result?.data;
  },

  async deleteClient(clienteId: string) {
    console.log({ clienteId });
    const result = await axiosInstance.delete(`${URL_CONTROLLER}/${clienteId}`);
    return result?.data;
  },

  async getClient(clienteId: string) {
    const result = await axiosInstance.get<Client>(
      `${URL_CONTROLLER}/${clienteId}`
    );
    return result?.data;
  },

  async getAllClients() {
    const result = await axiosInstance.get<Client[]>(`${URL_CONTROLLER}s`);
    return result?.data;
  },
};

export default routes;
