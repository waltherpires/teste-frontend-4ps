import { MetricDTO } from "../types/dtos/metric.dto";
import {
  MonthlyFinancialDataWithBalance,
  MonthlyFinancialData,
} from "../types/financial";

const baseDashboardMetrics: MetricDTO[] = [
  {
    title: "Faturamento",
    value: 493000,
    valueUnit: "currency",
    comparison: 12.5,
    comparisonUnit: "percentage",
    trend: 840000,
    trendUnit: "currency",
    goalProgress: 99,
  },
  {
    title: "Lucro Líquido",
    value: 58568,
    valueUnit: "currency",
    comparison: 7.4,
    comparisonUnit: "percentage",
    trend: 70000,
    trendUnit: "currency",
    goalProgress: 56,
  },
  {
    title: "Lucro Bruto",
    value: 58568,
    valueUnit: "currency",
    comparison: 7.4,
    comparisonUnit: "percentage",
    trend: 70000,
    trendUnit: "currency",
    goalProgress: 56,
  },
  {
    title: "CMV",
    comparison: 20,
    comparisonUnit: "percentage",
    value: 31200,
    valueUnit: "currency",
    goalProgress: 69,
  },
  {
    title: "EBITDA",
    comparison: 15,
    comparisonUnit: "percentage",
    value: 20000,
    valueUnit: "currency",
    goalProgress: 32,
    trend: 24000,
    trendUnit: "currency",
  },
  {
    title: "Ponto de Equilíbrio",
    value: 72000,
    valueUnit: "currency",
    goalProgress: 94,
  },
  {
    title: "Inadimplência",
    value: 4.8,
    valueUnit: "percentage",
    comparison: 0.8,
    comparisonUnit: "percentage",
  },
  {
    title: "Endividamento",
    value: 15000,
    valueUnit: "currency",
    comparison: 0.8,
    comparisonUnit: "percentage",
  },
];

const companyMetricMultipliers: Record<string, number> = {
  "company-1": 1,
  "company-2": 0.78,
  "company-3": 1.32,
  "company-4": 0.91,
};

const buildMetricsForCompany = (companyId: string | undefined): MetricDTO[] => {
  const safeCompanyId = companyId && companyId.trim() ? companyId : "company-1";
  const multiplier =
    companyMetricMultipliers[safeCompanyId] ??
    (1 +
      ((safeCompanyId
        .split("")
        .reduce((acc, c) => acc + c.charCodeAt(0), 0) % 30) -
        10) / 100);

  return baseDashboardMetrics.map((metric) => ({
    ...metric,
    value: Number((metric.value * multiplier).toFixed(0)),
    comparison:
      metric.comparison !== undefined
        ? Number((metric.comparison * multiplier).toFixed(1))
        : undefined,
    trend:
      metric.trend !== undefined
        ? Number((metric.trend * multiplier).toFixed(0))
        : undefined,
    goalProgress:
      metric.goalProgress !== undefined
        ? Number(
            Math.max(10, Math.min(99, Math.round(metric.goalProgress * multiplier)))
          )
        : undefined,
  }));
};

export const dashboardMetricsByCompany: Record<string, MetricDTO[]> = {
  "company-1": buildMetricsForCompany("company-1"),
  "company-2": buildMetricsForCompany("company-2"),
  "company-3": buildMetricsForCompany("company-3"),
};

const buildMetricMap = (metrics: MetricDTO[]) =>
  Object.fromEntries(metrics.map((it) => [it.title, it]));

export function aggregateMetrics(companyIds: string[]): MetricDTO[] {
  if (companyIds.length === 0) {
    return dashboardMetricsByCompany["company-1"];
  }

  const companiesMetrics = companyIds.map((companyId) => {
    return (
      dashboardMetricsByCompany[companyId] ||
      buildMetricsForCompany(companyId)
    );
  });

  const allTitles = Array.from(
    new Set(companiesMetrics.flatMap((metrics) => metrics.map((m) => m.title)))
  );

  return allTitles.map((title) => {
    const items = companiesMetrics
      .map((company) => company.find((m) => m.title === title))
      .filter((x): x is MetricDTO => Boolean(x));

    const totalValue = items.reduce((acc, item) => acc + item.value, 0);
    const totalTrend = items.reduce((acc, item) => acc + (item.trend ?? 0), 0);
    const averageComparison =
      items.length > 0
        ? items.reduce((acc, item) => acc + (item.comparison ?? 0), 0) /
          items.length
        : undefined;
    const averageGoalProgress =
      items.length > 0
        ? Math.round(
            items.reduce((acc, item) => acc + (item.goalProgress ?? 0), 0) /
              items.length
          )
        : undefined;

    const first = items[0];

    return {
      title,
      value: totalValue,
      valueUnit: first.valueUnit,
      comparison:
        averageComparison !== undefined ? Number(averageComparison.toFixed(1)) : undefined,
      comparisonUnit: first.comparisonUnit,
      trend: items.some((item) => item.trend !== undefined) ? totalTrend : undefined,
      trendUnit: first.trendUnit,
      goalProgress: averageGoalProgress,
    };
  });
}

export const monthlyFinancialData: MonthlyFinancialData[] = [
  { year: 2025, month: "Jan", revenue: 80000, expense: 45000 },
  { year: 2025, month: "Fev", revenue: 72000, expense: 50000 },
  { year: 2025, month: "Mar", revenue: 91000, expense: 60000 },
  { year: 2025, month: "Abr", revenue: 85000, expense: 55000 },
  { year: 2025, month: "Mai", revenue: 97000, expense: 65000 },
  { year: 2025, month: "Jun", revenue: 102000, expense: 70000 },
];

export const monthlyFinancialWithBalance: MonthlyFinancialDataWithBalance[] = [
  {
    year: 2025,
    month: "Jan",
    revenue: 80000,
    expense: 45000,
    finalBalance: 300000,
  },
  {
    year: 2025,
    month: "Fev",
    revenue: 72000,
    expense: 50000,
    finalBalance: 220000,
  },
  {
    year: 2025,
    month: "Mar",
    revenue: 91000,
    expense: 60000,
    finalBalance: 310000,
  },
  {
    year: 2025,
    month: "Abr",
    revenue: 85000,
    expense: 55000,
    finalBalance: 300000,
  },
  {
    year: 2025,
    month: "Mai",
    revenue: 97000,
    expense: 65000,
    finalBalance: 320000,
  },
  {
    year: 2025,
    month: "Jun",
    revenue: 102000,
    expense: 70000,
    finalBalance: 320000,
  },
];
