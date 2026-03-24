import { MetricDTO } from "../types/dtos/metric.dto";
import {
  MonthlyFinancialDataWithBalance,
  MonthlyFinancialData,
} from "../types/financial";

export const dashboardMetrics: MetricDTO[] = [
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
