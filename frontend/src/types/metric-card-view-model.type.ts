export type MetricCardViewModel = {
  title: string;
  icon: React.ElementType;

  mainValue: string;

  comparison?: number;
  comparisonUnit?: "percentage" | "pp";

  trendingValue?: string;

  goalProgress?: number;
};