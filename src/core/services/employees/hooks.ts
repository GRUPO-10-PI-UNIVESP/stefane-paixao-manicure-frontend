import { useMutation, useQuery, useQueryClient } from "react-query";
import employeeEmployee from "@/core/services/employees/services";
import {
  Employee,
  CreateEmployee,
  UpdateEmployee,
  EmployeeListResponse,
} from "@/core/services/employees/types";

const QUERY_KEY = "getAllEmployees";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation<Employee, Error, CreateEmployee>(
    employeeEmployee.createEmployee,
    {
      onSuccess(data) {
        console.log("CreateEmployee onSuccess", data);
        queryClient.invalidateQueries(QUERY_KEY, { exact: true });
        queryClient.refetchQueries(QUERY_KEY, { exact: true });
      },
      onError(error) {
        console.error("CreateEmployee onError", error);
      },
    }
  );
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation<
    Employee,
    Error,
    { employeeId: number; data: UpdateEmployee }
  >(
    ({ employeeId, data }) => employeeEmployee.updateEmployee(employeeId, data),
    {
      onSuccess(data) {
        console.log("UpdateEmployee onSuccess", data);
        queryClient.invalidateQueries(QUERY_KEY, { exact: true });
        queryClient.refetchQueries(QUERY_KEY, { exact: true });
      },
      onError(error) {
        console.error("UpdateEmployee onError", error);
      },
    }
  );
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation(employeeEmployee.deleteEmployee, {
    onSuccess(data) {
      console.log("DeleteEmployee onSuccess", data);
      queryClient.invalidateQueries(QUERY_KEY, { exact: true });
      queryClient.refetchQueries(QUERY_KEY, { exact: true });
    },
    onError(error) {
      console.error("DeleteEmployee onError", error);
    },
  });
}

export function useGetEmployee(employeeId: number) {
  return useQuery<Employee, Error>(
    [`getEmployee`, employeeId],
    () => employeeEmployee.getEmployee(employeeId),
    {
      onSuccess(data) {
        console.log("GetEmployee onSuccess", data);
      },
      onError(error) {
        console.error("GetEmployee onError", error);
      },
    }
  );
}

export function useGetAllEmployees() {
  return useQuery<EmployeeListResponse, Error>(
    [QUERY_KEY],
    () => employeeEmployee.getAllEmployees(),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError(error) {
        console.error("GetAllEmployees onError", error);
      },
    }
  );
}
