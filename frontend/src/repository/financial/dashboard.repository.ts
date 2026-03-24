import { MetricRepository } from "../metric.repository";
import { DashboardMockDataSource } from "@/src/sources/financial/dashboard/dashboard-mock.data-source";

// todo: trocar por DashboardApiDataSource ao obter
export const dashboardMetricRepository = new MetricRepository(new DashboardMockDataSource());
