"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";

import { XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";

import { useEffect, useState } from "react";
import { getFinancialOverview } from "@/src/services/financial.service";
import { MonthlyFinancialData } from "@/src/types/financial";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../../ui/chart";

export function RevenueExpenseCard() {
  const financialChartConfig = {
    revenue: {
      label: "Receita",
      color: "hsl(var(--chart-3))",
    },

    expense: {
      label: "Despesas",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const [data, setData] = useState<MonthlyFinancialData[]>([]);

  useEffect(() => {
    async function loadData() {
      const result = await getFinancialOverview({ includeBalance: false }); 
      setData(result);
    }

    loadData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita vs Despesas (Últimos 6 meses)</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={financialChartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />

            <YAxis
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              allowDataOverflow={true}
            />

            <Area
              dataKey="revenue"
              type="natural"
              fill="var(--chart-3)"
              fillOpacity={0.4}
              stroke="var(--chart-3)"
            />

            <Area
              dataKey="expense"
              type="natural"
              fill="var(--chart-2)"
              fillOpacity={0.3}
              stroke="var(--chart-2)"
            />

            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
