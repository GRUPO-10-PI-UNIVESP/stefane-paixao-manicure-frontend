"use client";
import React from "react";
import { PageContainer } from "@/components/_common/PageContainer";
import {
  useGetMoreFrequentClients,
  useGetAtendimentosFromLastYear,
  useGetTotalMoney,
  useGetTotalMoneyPerMonth,
  useGetMoreFrequentServices,
  useGetMoreFrequentServicesByClient,
  useGetMoneySpentByClient,
  useGetTotalMoneyByAppointmentByBranch,
  useGetTotalMoneyPorMesByBranch,
  useGetMoreFrequentServicesByClientByBranch,
} from "@/core/services/dashboard/hooks";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiPieChart,
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = ({
  children,
  className = "",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
    {children}
  </div>
);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Dashboard = () => {
  const { data: totalRevenue, isLoading: loadingRevenue } = useGetTotalMoney();
  const { data: monthlyRevenue, isLoading: loadingMonthly } =
    useGetTotalMoneyPerMonth();
  const { data: clients, isLoading: loadingClients } =
    useGetMoreFrequentClients();
  const { data: services, isLoading: loadingServices } =
    useGetMoreFrequentServices();
  const { data: servicesByClient } = useGetMoreFrequentServicesByClient();
  const { data: spending } = useGetMoneySpentByClient();
  const { data: branchMoneyPerAppointment } =
    useGetTotalMoneyByAppointmentByBranch();
  const { data: branchMonthlyRevenue, isLoading: loadingBranchRevenue } =
    useGetTotalMoneyPorMesByBranch();
  useGetMoreFrequentServicesByClientByBranch();
  const { data: lastYearAppointments } = useGetAtendimentosFromLastYear();
  // const { data: branchServices } = useGetMoreFrequentServicesByBranch();
  // const { data: branchServicesByClient } =
  // const { data: branchAppointments } = useGetAppointmentsFromLastYearByBranch();

  // Chart data preparations
  const revenueChartData = {
    labels: monthlyRevenue?.map((item) => `${item.mes}/${item.ano.slice(2)}`),
    datasets: [
      {
        label: "Faturamento",
        data: monthlyRevenue?.map((item) => item.totalValor),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const topClientsData = {
    labels: clients?.slice(0, 5).map((client) => client.nomeCliente),
    datasets: [
      {
        label: "Atendimentos",
        data: clients?.slice(0, 5).map((client) => client.atendimento.length),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const popularServicesData = {
    labels: services?.slice(0, 5).map((service) => service.nomeServico),
    datasets: [
      {
        label: "Serviços mais solicitados",
        data: services?.slice(0, 5).map((service) => service.frequencia),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const branchRevenueData = {
    labels: Array.from(new Set(branchMonthlyRevenue?.map((b) => b.nomeFilial))),
    datasets:
      monthlyRevenue?.map((month) => ({
        label: `${month.mes}/${month.ano.slice(2)}`,
        data:
          branchMonthlyRevenue
            ?.filter(
              (b) =>
                String(b.mes) === String(month.mes) &&
                b.ano === String(month.ano)
            )
            .map((b) => b.totalValor) || [],
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      })) || [],
  };

  // Adjusted services by client data
  const servicesByClientData = {
    labels: servicesByClient?.slice(0, 5).map((client) => client.nomeCliente),
    datasets:
      services?.slice(0, 3).map((service) => ({
        label: service.nomeServico,
        data: servicesByClient?.slice(0, 5).map((client) => {
          const serviceData = client.servicosMaisFrequentes.find(
            (s) => s.nomeServico === service.nomeServico
          );
          return serviceData ? serviceData.frequencia : 0;
        }),
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
      })) || [],
  };

  // Branch performance data
  const branchPerformanceData = {
    labels: branchMoneyPerAppointment?.map((b) => b.nomeFilial),
    datasets: [
      {
        label: "Valor Médio por Atendimento",
        data: branchMoneyPerAppointment?.map((b) => b.totalValorServicos),
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };

  return (
    <PageContainer title="Dashboard" subtitle="Visão geral do seu negócio">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard>
          <div className="flex items-center">
            <FiDollarSign className="text-blue-500 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-500">Faturamento Total</p>
              <p className="text-2xl font-semibold">
                {loadingRevenue
                  ? "Carregando..."
                  : formatCurrency(totalRevenue?.totalFaturamento || 0)}
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center">
            <FiUsers className="text-green-500 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-500">Clientes Frequentes</p>
              <p className="text-2xl font-semibold">
                {loadingClients ? "Carregando..." : clients?.length || 0}
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center">
            <FiCalendar className="text-purple-500 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-500">Atendimentos/Ano</p>
              <p className="text-2xl font-semibold">
                {lastYearAppointments?.atendimentos.length || 0}
              </p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="flex items-center">
            <FiTrendingUp className="text-orange-500 text-2xl mr-3" />
            <div>
              <p className="text-sm text-gray-500">Serviços Populares</p>
              <p className="text-2xl font-semibold">
                {loadingServices ? "Carregando..." : services?.length || 0}
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Faturamento Mensal">
          {loadingMonthly ? (
            <div className="h-64 flex items-center justify-center">
              <p>Carregando dados...</p>
            </div>
          ) : (
            <Line data={revenueChartData} />
          )}
        </DashboardCard>

        <DashboardCard title="Top 5 Clientes">
          {loadingClients ? (
            <div className="h-64 flex items-center justify-center">
              <p>Carregando dados...</p>
            </div>
          ) : (
            <Bar data={topClientsData} />
          )}
        </DashboardCard>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <DashboardCard title="Serviços Mais Populares">
          {loadingServices ? (
            <div className="h-64 flex items-center justify-center">
              <p>Carregando dados...</p>
            </div>
          ) : (
            <Pie data={popularServicesData} />
          )}
        </DashboardCard>

        <DashboardCard title="Faturamento por Filial">
          {loadingBranchRevenue ? (
            <div className="h-64 flex items-center justify-center">
              <p>Carregando dados...</p>
            </div>
          ) : (
            <Bar
              data={branchRevenueData}
              options={{
                scales: {
                  x: { stacked: true },
                  y: { stacked: true },
                },
              }}
            />
          )}
        </DashboardCard>

        <DashboardCard title="Top Gastadores">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Cliente</th>
                  <th className="px-4 py-2 text-right">Total Gasto</th>
                </tr>
              </thead>
              <tbody>
                {spending?.slice(0, 5).map((client) => (
                  <tr key={client.clientId}>
                    <td className="px-4 py-2">{client.nomeCliente}</td>
                    <td className="px-4 py-2 text-right">
                      {formatCurrency(client.totalGasto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </div>

      {/* Additional Data Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Desempenho por Filial">
          <Bar
            data={branchPerformanceData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </DashboardCard>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
