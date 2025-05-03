import axiosInstance from "@/core/configs/axios";
import {
  FrequentClient,
  FrequentService,
  TotalMoneyResponse,
  TotalMoneyPerMonthResponse,
  FrequentServiceByClient,
  TotalSpentByClient,
  LastYearAppointment,
  BranchAppointmentsLastYear,
  BranchMoneyPerAppointment,
  BranchMonthlyRevenue,
  BranchFrequentServices,
  BranchFrequentServicesByClient,
} from "./types";

const URL_CONTROLLER = ``;

export const dashboardRoutes = {
  // Métricas Gerais
  async getMoreFrequentClients(): Promise<FrequentClient[]> {
    const { data } = await axiosInstance.get<FrequentClient[]>(
      `${URL_CONTROLLER}/getMoreFrequentClients`
    );
    return data;
  },

  async getAtendimentosFromLastYear(): Promise<LastYearAppointment> {
    const { data } = await axiosInstance.get<LastYearAppointment>(
      `${URL_CONTROLLER}/atendimentosFromLastYear`
    );
    return data;
  },

  async getTotalMoney(): Promise<TotalMoneyResponse> {
    const { data } = await axiosInstance.get<TotalMoneyResponse>(
      `${URL_CONTROLLER}/getTotalMoney`
    );
    return data;
  },

  async getTotalMoneyPerMonth(): Promise<TotalMoneyPerMonthResponse[]> {
    const { data } = await axiosInstance.get<TotalMoneyPerMonthResponse[]>(
      `${URL_CONTROLLER}/getTotalMoneyPorMes`
    );
    return data;
  },

  async getMoreFrequentServices(): Promise<FrequentService[]> {
    const { data } = await axiosInstance.get<FrequentService[]>(
      `${URL_CONTROLLER}/getMoreFrequentServices`
    );
    return data;
  },

  async getMoreFrequentServicesByClient(): Promise<FrequentServiceByClient[]> {
    const { data } = await axiosInstance.get<FrequentServiceByClient[]>(
      `${URL_CONTROLLER}/getMoreFrequentServicesByClient`
    );
    return data;
  },

  async getMoneySpentByClient(): Promise<TotalSpentByClient[]> {
    const { data } = await axiosInstance.get<TotalSpentByClient[]>(
      `${URL_CONTROLLER}/getMoneySpentByClient`
    );
    return data;
  },

  // Métricas por Filial
  async getAppointmentsFromLastYearByBranch(): Promise<
    BranchAppointmentsLastYear[]
  > {
    const { data } = await axiosInstance.get<BranchAppointmentsLastYear[]>(
      `${URL_CONTROLLER}/atendimentosFromLastYearByFilial`
    );
    return data;
  },

  async getTotalMoneyByAppointmentByBranch(): Promise<
    BranchMoneyPerAppointment[]
  > {
    const { data } = await axiosInstance.get<BranchMoneyPerAppointment[]>(
      `${URL_CONTROLLER}/getTotalMoneyPorAtendimentoByFilial`
    );
    return data;
  },

  async getTotalMoneyPorMesByBranch(): Promise<BranchMonthlyRevenue[]> {
    const { data } = await axiosInstance.get<BranchMonthlyRevenue[]>(
      `${URL_CONTROLLER}/getTotalMoneyPorMesByFilial`
    );
    return data;
  },

  async getMoreFrequentServicesByBranch(): Promise<BranchFrequentServices[]> {
    const { data } = await axiosInstance.get<BranchFrequentServices[]>(
      `${URL_CONTROLLER}/getMoreFrequentServicesByFilial`
    );
    return data;
  },

  async getMoreFrequentServicesByClientByBranch(): Promise<
    BranchFrequentServicesByClient[]
  > {
    const { data } = await axiosInstance.get<BranchFrequentServicesByClient[]>(
      `${URL_CONTROLLER}/getMoreFrequentServicesByClientByFilial`
    );
    return data;
  },
};

export default dashboardRoutes;
