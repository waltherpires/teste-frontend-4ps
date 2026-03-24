import { MetricDTO } from "../types/dtos/metric.dto";

export const dreMetrics: MetricDTO[] = [
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
    title: "Lucro Líquido",
    value: 58568,
    valueUnit: "currency",

    comparison: 7.4,
    comparisonUnit: "percentage",

    trend: 70000,
    trendUnit: "currency",

    goalProgress: 56,
  },
];
