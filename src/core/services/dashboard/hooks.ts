import { useQuery } from "react-query";
import dashboardRoutes from "./services";
import {
  FrequentClient,
  LastYearAppointment,
  TotalMoneyResponse,
  TotalMoneyPerMonthResponse,
  FrequentService,
  FrequentServiceByClient,
  TotalSpentByClient,
  BranchAppointmentsLastYear,
  BranchMoneyPerAppointment,
  BranchMonthlyRevenue,
  BranchFrequentServices,
  BranchFrequentServicesByClient,
} from "./types";

// Helper para log de erros padrão
const handleError = (error: Error, context: string) => {
  console.error(`Error fetching ${context}:`, error);
};

// Hooks para dados gerais
export function useGetMoreFrequentClients() {
  return useQuery<FrequentClient[], Error>(
    ["getMoreFrequentClients"],
    dashboardRoutes.getMoreFrequentClients,
    { onError: (error) => handleError(error, "more frequent clients") }
  );
}

export function useGetAtendimentosFromLastYear() {
  return useQuery<LastYearAppointment, Error>(
    ["getAtendimentosFromLastYear"],
    dashboardRoutes.getAtendimentosFromLastYear,
    { onError: (error) => handleError(error, "last year appointments") }
  );
}

export function useGetTotalMoney() {
  return useQuery<TotalMoneyResponse, Error>(
    ["getTotalMoney"],
    dashboardRoutes.getTotalMoney,
    { onError: (error) => handleError(error, "total revenue") }
  );
}

export function useGetTotalMoneyPerMonth() {
  return useQuery<TotalMoneyPerMonthResponse[], Error>(
    ["getTotalMoneyPerMonth"],
    dashboardRoutes.getTotalMoneyPerMonth,
    { onError: (error) => handleError(error, "monthly revenue") }
  );
}

export function useGetMoreFrequentServices() {
  return useQuery<FrequentService[], Error>(
    ["getMoreFrequentServices"],
    dashboardRoutes.getMoreFrequentServices,
    { onError: (error) => handleError(error, "frequent services") }
  );
}

export function useGetMoreFrequentServicesByClient() {
  return useQuery<FrequentServiceByClient[], Error>(
    ["getMoreFrequentServicesByClient"],
    dashboardRoutes.getMoreFrequentServicesByClient,
    { onError: (error) => handleError(error, "frequent services by client") }
  );
}

export function useGetMoneySpentByClient() {
  return useQuery<TotalSpentByClient[], Error>(
    ["getMoneySpentByClient"],
    dashboardRoutes.getMoneySpentByClient,
    { onError: (error) => handleError(error, "money spent by client") }
  );
}

// Hooks para dados por filial
export function useGetAppointmentsFromLastYearByBranch() {
  return useQuery<BranchAppointmentsLastYear[], Error>(
    ["getAppointmentsFromLastYearByBranch"],
    dashboardRoutes.getAppointmentsFromLastYearByBranch,
    { onError: (error) => handleError(error, "branch appointments last year") }
  );
}

export function useGetTotalMoneyByAppointmentByBranch() {
  return useQuery<BranchMoneyPerAppointment[], Error>(
    ["getTotalMoneyByAppointmentByBranch"],
    dashboardRoutes.getTotalMoneyByAppointmentByBranch,
    {
      onError: (error) =>
        handleError(error, "average revenue per appointment by branch"),
    }
  );
}

export function useGetTotalMoneyPorMesByBranch() {
  return useQuery<BranchMonthlyRevenue[], Error>(
    ["getTotalMoneyPorMesByBranch"],
    dashboardRoutes.getTotalMoneyPorMesByBranch,
    { onError: (error) => handleError(error, "monthly revenue by branch") }
  );
}

export function useGetMoreFrequentServicesByBranch() {
  return useQuery<BranchFrequentServices[], Error>(
    ["getMoreFrequentServicesByBranch"],
    dashboardRoutes.getMoreFrequentServicesByBranch,
    { onError: (error) => handleError(error, "frequent services by branch") }
  );
}

export function useGetMoreFrequentServicesByClientByBranch() {
  return useQuery<BranchFrequentServicesByClient[], Error>(
    ["getMoreFrequentServicesByClientByBranch"],
    dashboardRoutes.getMoreFrequentServicesByClientByBranch,
    {
      onError: (error) =>
        handleError(error, "frequent services by client and branch"),
    }
  );
}
