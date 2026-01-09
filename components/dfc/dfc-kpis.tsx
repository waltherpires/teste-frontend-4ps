import { KPICard } from "@/components/dashboard/kpi-card"
import { dfcData, formatCurrency } from "@/lib/financial-data"
import { Wallet, TrendingUp, ArrowDownUp, PiggyBank } from "lucide-react"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"

export function DFCKPIs() {
  const periods: Period[] = ["jan", "fev", "mar", "abr", "mai", "jun"]
  const lastPeriod = periods[periods.length - 1]
  const prevPeriod = periods[periods.length - 2]

  const calculateTotal = (items: Array<{ values: Record<string, number> }>, period: Period): number => {
    return items.reduce((sum, item) => sum + item.values[period], 0)
  }

  const calculateSaldoFinal = (period: Period): number => {
    const saldoInicial = dfcData.saldoInicial[period]
    const operacional = calculateTotal(dfcData.operacional, period)
    const investimento = calculateTotal(dfcData.investimento, period)
    const financiamento = calculateTotal(dfcData.financiamento, period)
    return saldoInicial + operacional + investimento + financiamento
  }

  const saldoFinal = calculateSaldoFinal(lastPeriod)
  const saldoFinalPrev = calculateSaldoFinal(prevPeriod)
  const saldoChange = ((saldoFinal - saldoFinalPrev) / saldoFinalPrev) * 100

  const operacionalAtual = calculateTotal(dfcData.operacional, lastPeriod)
  const operacionalPrev = calculateTotal(dfcData.operacional, prevPeriod)
  const operacionalChange = ((operacionalAtual - operacionalPrev) / Math.abs(operacionalPrev)) * 100

  const variacaoAtual =
    calculateTotal(dfcData.operacional, lastPeriod) +
    calculateTotal(dfcData.investimento, lastPeriod) +
    calculateTotal(dfcData.financiamento, lastPeriod)
  const variacaoPrev =
    calculateTotal(dfcData.operacional, prevPeriod) +
    calculateTotal(dfcData.investimento, prevPeriod) +
    calculateTotal(dfcData.financiamento, prevPeriod)
  const variacaoChange = variacaoAtual - variacaoPrev

  const investimentoAtual = Math.abs(calculateTotal(dfcData.investimento, lastPeriod))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Saldo Final"
        value={formatCurrency(saldoFinal)}
        change={saldoChange}
        changeLabel="vs. mês anterior"
        icon={Wallet}
        trend={saldoChange > 0 ? "up" : saldoChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Geração Operacional"
        value={formatCurrency(operacionalAtual)}
        change={operacionalChange}
        changeLabel="vs. mês anterior"
        icon={TrendingUp}
        trend={operacionalChange > 0 ? "up" : operacionalChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Variação Líquida"
        value={formatCurrency(variacaoAtual)}
        change={variacaoChange / 1000}
        changeLabel="R$ mil vs. anterior"
        icon={ArrowDownUp}
        trend={variacaoAtual > variacaoPrev ? "up" : variacaoAtual < variacaoPrev ? "down" : "neutral"}
      />
      <KPICard
        title="Investimentos"
        value={formatCurrency(investimentoAtual)}
        changeLabel="aplicados no período"
        icon={PiggyBank}
        trend="neutral"
      />
    </div>
  )
}
