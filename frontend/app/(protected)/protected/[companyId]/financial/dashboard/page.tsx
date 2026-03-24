import { ClashFlowEvolutionCard } from "@/src/components/financial/dashboard/cash-flow-evolution-card";
import { RevenueExpenseCard } from "@/src/components/financial/dashboard/revenue-expense-card";
import HeaderFinancial from "@/src/components/financial/header";
import { MetricCards } from "@/src/components/metric-cards";
import { dashboardMetricRepository } from "@/src/repository/financial/dashboard.repository";

export default async function FinancialDashboardPage() {
  const period = { startDate: "123", endDate: "123" };
  const metrics = await dashboardMetricRepository.getMetrics(period);

  return (
    <>
      <HeaderFinancial
        title="Dashboard"
        description="Visão geral do desempenho financeiro"
      />
      <div className="flex flex-col w-full mt-4">
        <MetricCards metrics={metrics} />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 m-4">
          <RevenueExpenseCard />
          <ClashFlowEvolutionCard />
        </div>
      </div>
    </>
  );
}
