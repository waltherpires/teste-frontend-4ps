"use client"

import { payableData, formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts"

export function PayableDueDateAnalysis() {
  const colors = ["var(--destructive)", "var(--chart-5)", "var(--warning)", "var(--chart-3)"]

  const pieData = payableData.dueDateAnalysis.map((item, index) => ({
    ...item,
    color: colors[index],
  }))

  const totalValue = payableData.dueDateAnalysis.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Análise por Prazo de Vencimento (R$)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={payableData.dueDateAnalysis} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                type="number"
                stroke="var(--muted-foreground)"
                fontSize={12}
                tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
              />
              <YAxis type="category" dataKey="range" stroke="var(--muted-foreground)" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--foreground)" }}
                formatter={(value: number) => [formatCurrency(value), "Valor"]}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {payableData.dueDateAnalysis.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Distribuição por Prazo (%)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="60%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [formatCurrency(value), "Valor"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-foreground">{item.range}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-foreground">
                      {((item.value / totalValue) * 100).toFixed(1)}%
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">({item.count})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
