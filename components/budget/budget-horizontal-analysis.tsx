"use client"

import { budgetData, formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function BudgetHorizontalAnalysis() {
  const chartData = budgetData.monthly.map((item, index) => {
    const prevPlanned = index > 0 ? budgetData.monthly[index - 1].planned : item.planned
    const prevActual = index > 0 ? budgetData.monthly[index - 1].actual : item.actual

    return {
      ...item,
      varPlanned: index > 0 ? ((item.planned - prevPlanned) / prevPlanned) * 100 : 0,
      varActual: index > 0 ? ((item.actual - prevActual) / prevActual) * 100 : 0,
    }
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Análise Horizontal - Evolução Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
                formatter={(value: number) => [formatCurrency(value), ""]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="planned"
                name="Planejado"
                stroke="var(--muted-foreground)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "var(--muted-foreground)" }}
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Realizado"
                stroke="var(--primary)"
                strokeWidth={3}
                dot={{ fill: "var(--primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Mês</th>
                  {budgetData.monthly.map((item) => (
                    <th key={item.month} className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">
                      {item.month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 px-3 text-sm text-foreground">Planejado</td>
                  {budgetData.monthly.map((item) => (
                    <td key={item.month} className="py-2 px-3 text-sm text-right tabular-nums text-muted-foreground">
                      {formatCurrency(item.planned)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 px-3 text-sm text-foreground">Realizado</td>
                  {budgetData.monthly.map((item) => (
                    <td key={item.month} className="py-2 px-3 text-sm text-right tabular-nums text-foreground">
                      {formatCurrency(item.actual)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border bg-secondary/30">
                  <td className="py-2 px-3 text-sm font-medium text-foreground">Var. AH (Realizado)</td>
                  {chartData.map((item, index) => (
                    <td
                      key={item.month}
                      className={cn(
                        "py-2 px-3 text-sm text-right tabular-nums font-medium",
                        index === 0
                          ? "text-muted-foreground"
                          : item.varActual > 0
                            ? "text-success"
                            : item.varActual < 0
                              ? "text-destructive"
                              : "text-muted-foreground",
                      )}
                    >
                      {index === 0 ? "-" : `${item.varActual > 0 ? "+" : ""}${item.varActual.toFixed(1)}%`}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
