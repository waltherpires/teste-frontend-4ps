"use client"

import { Header } from "@/components/dashboard/header"
import { KPICard } from "@/components/dashboard/kpi-card"
import { DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const revenueData = [
  { month: "Jan", receita: 245000, despesas: 180000 },
  { month: "Fev", receita: 285000, despesas: 195000 },
  { month: "Mar", receita: 310000, despesas: 210000 },
  { month: "Abr", receita: 295000, despesas: 200000 },
  { month: "Mai", receita: 330000, despesas: 220000 },
  { month: "Jun", receita: 380000, despesas: 240000 },
]

const cashFlowData = [
  { month: "Jan", operacional: 65000, investimento: -25000, financiamento: -10000 },
  { month: "Fev", operacional: 90000, investimento: -15000, financiamento: -12000 },
  { month: "Mar", operacional: 100000, investimento: -30000, financiamento: -8000 },
  { month: "Abr", operacional: 95000, investimento: -20000, financiamento: -15000 },
  { month: "Mai", operacional: 110000, investimento: -35000, financiamento: -5000 },
  { month: "Jun", operacional: 140000, investimento: -40000, financiamento: -10000 },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" description="Visão geral do desempenho financeiro" />

      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Receita Líquida"
            value="R$ 1.845.000"
            change={12.5}
            changeLabel="vs. período anterior"
            icon={DollarSign}
            trend="up"
          />
          <KPICard
            title="Lucro Líquido"
            value="R$ 285.000"
            change={8.3}
            changeLabel="vs. período anterior"
            icon={TrendingUp}
            trend="up"
          />
          <KPICard
            title="Margem Líquida"
            value="15.4%"
            change={-2.1}
            changeLabel="vs. período anterior"
            icon={Users}
            trend="down"
          />
          <KPICard
            title="Inadimplência"
            value="4.2%"
            change={0.8}
            changeLabel="vs. período anterior"
            icon={AlertTriangle}
            trend="down"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Receita vs Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
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
                    formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stackId="1"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.3}
                    name="Receita"
                  />
                  <Area
                    type="monotone"
                    dataKey="despesas"
                    stackId="2"
                    stroke="var(--chart-3)"
                    fill="var(--chart-3)"
                    fillOpacity={0.3}
                    name="Despesas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Fluxo de Caixa por Atividade</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cashFlowData}>
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
                    formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
                  />
                  <Bar dataKey="operacional" name="Operacional" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="investimento" name="Investimento" fill="var(--chart-4)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="financiamento" name="Financiamento" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Resumo por Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Módulo</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Valor Atual</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Período Anterior</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Variação</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-sm text-foreground">DRE - Lucro Líquido</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">R$ 285.000</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground text-right">R$ 263.000</td>
                    <td className="py-3 px-4 text-sm text-success text-right">+8.4%</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                        Positivo
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-sm text-foreground">DFC - Saldo Final</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">R$ 520.000</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground text-right">R$ 445.000</td>
                    <td className="py-3 px-4 text-sm text-success text-right">+16.9%</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
                        Positivo
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-sm text-foreground">Orçamento - Variação</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">-2.3%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground text-right">-4.1%</td>
                    <td className="py-3 px-4 text-sm text-success text-right">+1.8pp</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning">
                        Atenção
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 text-sm text-foreground">Inadimplência</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">4.2%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground text-right">3.4%</td>
                    <td className="py-3 px-4 text-sm text-destructive text-right">+0.8pp</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
                        Crítico
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-sm text-foreground">Margem Média (CMV)</td>
                    <td className="py-3 px-4 text-sm text-foreground text-right">32.5%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground text-right">34.2%</td>
                    <td className="py-3 px-4 text-sm text-destructive text-right">-1.7pp</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/20 text-warning">
                        Atenção
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
