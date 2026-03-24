import { MetricUnit } from "../types/metric-unit.type";

export function formatMetricValue(
  value: number,
  unit: MetricUnit
): string {
  switch (unit) {
    case "currency":
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);

    case "percentage":
      return `${value.toFixed(1)}%`;

    case "pp":
      return `${value.toFixed(1)}pp`;

    default:
      return String(value);
  }
}