import { MetricsDataSource } from "@/src/sources/financial/metrics.data-source";
import { DateRange } from "@/src/types/date-range";

export class MetricRepository {
  constructor(
    private datasource: MetricsDataSource
  ) {}

  getMetrics(period: DateRange) {
    return this.datasource.getMetrics(period);
  }
}
