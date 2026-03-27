import { DateRange } from "@/src/types/date-range";
import { MetricDTO } from "@/src/types/dtos/metric.dto";

export interface MetricsFilter {
  activeCompanyId?: string;
  additionalCompanyIds?: string[];
}

export interface MetricsDataSource {
  getMetrics(period: DateRange, filter?: MetricsFilter): Promise<MetricDTO[]>;
}