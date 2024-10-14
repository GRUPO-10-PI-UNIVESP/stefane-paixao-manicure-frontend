import { useMutation, useQuery } from "react-query";
import servicoBranch from "./services";
import { CreateBranch, Branch, UpdateBranch, ListBranches } from "./types";

export function useCreateBranch() {
  return useMutation<Branch, Error, CreateBranch>(servicoBranch.createBranch, {
    onSuccess(data) {
      console.log(data, "Success");
    },
    onError(error) {
      console.log(error);
    },
  });
}

export function useUpdateBranch() {
  return useMutation<Branch, Error, { filialId: string; data: UpdateBranch }>(
    ({ filialId, data }) => servicoBranch.updateBranch(filialId, data),
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

export function useDeleteBranch() {
  return useMutation<unknown, Error, string>(servicoBranch.deleteBranch, {
    onSuccess(data) {
      console.log(data, "Success");
    },
    onError(error) {
      console.log(error);
    },
  });
}

export function useGetBranch(servicoId: string) {
  return useQuery<Branch, Error>(
    [`getBranch`, servicoId],
    () => servicoBranch.getBranch(servicoId),
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

export function useGetAllBranches() {
  return useQuery<ListBranches, Error>(
    `getAllBranches`,
    servicoBranch.getAllBranches,
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
