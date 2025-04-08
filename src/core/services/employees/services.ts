import axiosInstance from "@/core/configs/axios";
import {
  Employee,
  CreateEmployee,
  UpdateEmployee,
  EmployeeListResponse,
} from "./types";

const URL_CONTROLLER = `/funcionario`;

const routes = {
  async createEmployee(params: CreateEmployee) {
    const result = await axiosInstance.post<Employee>(`${URL_CONTROLLER}`, {
      ...params,
    });
    return result?.data;
  },

  async updateEmployee(employeeId: number, params: UpdateEmployee) {
    const result = await axiosInstance.patch<Employee>(
      `${URL_CONTROLLER}/${employeeId}`,
      {
        ...params,
      }
    );
    return result?.data;
  },

  async deleteEmployee(employeeId: number) {
    const result = await axiosInstance.delete(
      `${URL_CONTROLLER}/${employeeId}`
    );
    return result?.data;
  },

  async getEmployee(employeeId: number) {
    const result = await axiosInstance.get<Employee>(
      `${URL_CONTROLLER}/${employeeId}`
    );
    return result?.data;
  },

  async getAllEmployees() {
    const result = await axiosInstance.get<EmployeeListResponse>(
      `${URL_CONTROLLER}s`
    );
    return result?.data;
  },
};

export default routes;
