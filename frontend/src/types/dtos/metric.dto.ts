import { MetricUnit } from "../metric-unit.type";

export type MetricDTO = {
  title: string;

  value: number;
  valueUnit: MetricUnit;

  comparison?: number;
  comparisonUnit?: "percentage" | "pp";

  trend?: number;
  trendUnit?: MetricUnit;

  goalProgress?: number;
};