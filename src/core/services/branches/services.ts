import axiosInstance from "@/core/configs/axios";
import { Branch, CreateBranch, UpdateBranch } from "./types";

const URL_CONTROLLER = `/servico`;

const routes = {
  async createBranch(params: CreateBranch) {
    const result = await axiosInstance.post<Branch>(`${URL_CONTROLLER}`, {
      ...params,
    });
    return result?.data;
  },

  async updateBranch(branchId: string, params: UpdateBranch) {
    const result = await axiosInstance.patch<Branch>(
      `${URL_CONTROLLER}/${branchId}`,
      {
        ...params,
      }
    );
    return result?.data;
  },

  async deleteBranch(branchId: string) {
    const result = await axiosInstance.delete(`${URL_CONTROLLER}/${branchId}`);
    return result?.data;
  },

  async getBranch(branchId: string) {
    const result = await axiosInstance.get<Branch>(
      `${URL_CONTROLLER}/${branchId}`
    );
    return result?.data;
  },

  async getAllBranches() {
    const result = await axiosInstance.get<Branch[]>(`${URL_CONTROLLER}s`);
    return result?.data;
  },
};

export default routes;
