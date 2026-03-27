import { ClashFlowEvolutionCard } from "@/src/components/financial/dashboard/cash-flow-evolution-card";
import { RevenueExpenseCard } from "@/src/components/financial/dashboard/revenue-expense-card";
import HeaderFinancial from "@/src/components/financial/header";
import { SelectedCompaniesInfo } from "@/src/components/financial/dashboard/selected-companies-info";
import { MetricCards } from "@/src/components/metric-cards";
import { dashboardMetricRepository } from "@/src/repository/financial/dashboard.repository";

export const dynamic = "force-dynamic";

interface FinancialDashboardPageProps {
  params: Promise<{
    companyId: string;
  }>;
  searchParams: Promise<{
    aggregatedCompanies?: string;
  }>;
}

export default async function FinancialDashboardPage({
  params,
  searchParams,
}: FinancialDashboardPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const activeCompanyId = resolvedParams.companyId || "company-1";
  const extraCompanyIds = resolvedSearchParams.aggregatedCompanies
    ? resolvedSearchParams.aggregatedCompanies
        .split(",")
        .map((companyId) => companyId?.trim())
        .filter(Boolean)
    : [];

  const period = { startDate: "123", endDate: "123" };
  const baseMetrics = await dashboardMetricRepository.getMetrics(period, {
    activeCompanyId,
    additionalCompanyIds: [],
  });
  const metrics = await dashboardMetricRepository.getMetrics(period, {
    activeCompanyId,
    additionalCompanyIds: extraCompanyIds,
  });

  return (
    <>
      <HeaderFinancial
        title="Dashboard"
        description="Visão geral do desempenho financeiro"
      />
      <div className="flex flex-col w-full mt-4">
        <SelectedCompaniesInfo
          activeCompanyId={activeCompanyId}
          additionalCompanyIds={extraCompanyIds}
        />

        <MetricCards metrics={metrics} />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 m-4">
          <RevenueExpenseCard />
          <ClashFlowEvolutionCard />
        </div>
      </div>
    </>
  );
}
