import { KPICard } from "@/components/dashboard/kpi-card"
import { budgetData, formatCurrency } from "@/lib/financial-data"
import { Target, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export function BudgetKPIs() {
  const totalPlanned = budgetData.categories.reduce((sum, c) => sum + c.planned, 0)
  const totalActual = budgetData.categories.reduce((sum, c) => sum + c.actual, 0)
  const overallVariance = ((totalActual - totalPlanned) / totalPlanned) * 100

  const onBudgetCount = budgetData.categories.filter((c) => {
    const variance = Math.abs(((c.actual - c.planned) / c.planned) * 100)
    return variance <= 5
  }).length

  const executionRate = (totalActual / totalPlanned) * 100

  const lastMonth = budgetData.monthly[budgetData.monthly.length - 1]
  const monthlyVariance = ((lastMonth.actual - lastMonth.planned) / lastMonth.planned) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Orçamento Total"
        value={formatCurrency(totalPlanned)}
        changeLabel="orçado para o período"
        icon={Target}
        trend="neutral"
      />
      <KPICard
        title="Realizado Total"
        value={formatCurrency(totalActual)}
        change={overallVariance}
        changeLabel="vs. planejado"
        icon={TrendingUp}
        trend={overallVariance >= 0 ? "up" : "down"}
      />
      <KPICard
        title="Taxa de Execução"
        value={`${executionRate.toFixed(1)}%`}
        change={monthlyVariance}
        changeLabel="var. último mês"
        icon={AlertCircle}
        trend={Math.abs(monthlyVariance) <= 5 ? "up" : "down"}
      />
      <KPICard
        title="Categorias no Orçamento"
        value={`${onBudgetCount}/${budgetData.categories.length}`}
        changeLabel="dentro da meta (±5%)"
        icon={CheckCircle}
        trend={onBudgetCount >= budgetData.categories.length / 2 ? "up" : "down"}
      />
    </div>
  )
}
