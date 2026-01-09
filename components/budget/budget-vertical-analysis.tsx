"use client"

import { budgetData, formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

export function BudgetVerticalAnalysis() {
  const totalPlanned = budgetData.categories.reduce((sum, c) => sum + c.planned, 0)
  const totalActual = budgetData.categories.reduce((sum, c) => sum + c.actual, 0)

  const chartData = budgetData.categories.map((category) => ({
    name: category.name.length > 20 ? category.name.substring(0, 20) + "..." : category.name,
    fullName: category.name,
    percentPlanned: (category.planned / totalPlanned) * 100,
    percentActual: (category.actual / totalActual) * 100,
    planned: category.planned,
    actual: category.actual,
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Análise Vertical - Representatividade %</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={11} width={150} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
                formatter={(value: number) => [
                  `${value.toFixed(1)}%`,
                  "",
                ]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
              />
              <Bar
                dataKey="percentPlanned"
                name="% Planejado"
                fill="var(--muted-foreground)"
                radius={[0, 4, 4, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-planned-${index}`} fillOpacity={0.5} />
                ))}
              </Bar>
              <Bar dataKey="percentActual" name="% Realizado" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Categoria</th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Planejado</th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">AV Plan. %</th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Realizado</th>
                  <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">AV Real. %</th>
                </tr>
              </thead>
              <tbody>
                {budgetData.categories.map((category) => {
                  const avPlanned = (category.planned / totalPlanned) * 100
                  const avActual = (category.actual / totalActual) * 100
                  return (
                    <tr key={category.id} className="border-b border-border hover:bg-secondary/30">
                      <td className="py-2 px-3 text-sm text-foreground">{category.name}</td>
                      <td className="py-2 px-3 text-sm text-right tabular-nums text-muted-foreground">
                        {formatCurrency(category.planned)}
                      </td>
                      <td className="py-2 px-3 text-sm text-right tabular-nums text-foreground">
                        {avPlanned.toFixed(1)}%
                      </td>
                      <td className="py-2 px-3 text-sm text-right tabular-nums text-muted-foreground">
                        {formatCurrency(category.actual)}
                      </td>
                      <td className="py-2 px-3 text-sm text-right tabular-nums text-foreground">
                        {avActual.toFixed(1)}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="bg-secondary/50">
                  <td className="py-2 px-3 text-sm font-semibold text-foreground">Total</td>
                  <td className="py-2 px-3 text-sm text-right tabular-nums font-semibold text-foreground">
                    {formatCurrency(totalPlanned)}
                  </td>
                  <td className="py-2 px-3 text-sm text-right tabular-nums font-semibold text-foreground">100.0%</td>
                  <td className="py-2 px-3 text-sm text-right tabular-nums font-semibold text-foreground">
                    {formatCurrency(totalActual)}
                  </td>
                  <td className="py-2 px-3 text-sm text-right tabular-nums font-semibold text-foreground">100.0%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
