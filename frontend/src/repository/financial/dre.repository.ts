import { DreMockDataSource } from "@/src/sources/financial/dre/dre-mock.data-sourte";
import { MetricRepository } from "../metric.repository";

// todo: trocar por DreApiDataSource ao obter
export const dreMetricRepository = new MetricRepository(new DreMockDataSource());
