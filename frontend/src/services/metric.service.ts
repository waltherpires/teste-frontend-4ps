import { mapMetricToCard } from "@/src/mappers/financial/financial-cards.mapper";
import { MetricDTO } from "../types/dtos/metric.dto";

export function buildMetricCards(
  metrics?: MetricDTO[]
) {
  if (!metrics || metrics.length === 0) {
    return [];
  }

  return metrics.map(mapMetricToCard);
}
