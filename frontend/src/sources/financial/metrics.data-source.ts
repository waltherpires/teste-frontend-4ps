import { DateRange } from "@/src/types/date-range";
import { MetricDTO } from "@/src/types/dtos/metric.dto";

export interface MetricsDataSource {
  getMetrics(period: DateRange): Promise<MetricDTO[]>;
}