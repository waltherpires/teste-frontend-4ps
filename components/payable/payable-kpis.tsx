import { KPICard } from "@/components/dashboard/kpi-card"
import { payableData, formatCurrency } from "@/lib/financial-data"
import { AlertTriangle, Calendar, TrendingUp, Building2 } from "lucide-react"

export function PayableKPIs() {
  const { summary } = payableData

  // Simulated previous period for comparison
  const prevTotalAPagar = 265000
  const prevPagamentos = 10
  const prevTempoMedio = 32
  const prevFornecedores = 14

  const valorChange = ((summary.totalAPagar - prevTotalAPagar) / prevTotalAPagar) * 100
  const pagamentosChange = ((summary.pagamentosNoMes - prevPagamentos) / prevPagamentos) * 100
  const tempoChange = ((summary.tempoMedioPagamento - prevTempoMedio) / prevTempoMedio) * 100
  const fornecedoresChange = ((summary.fornecedoresAtivos - prevFornecedores) / prevFornecedores) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard
        title="Total a Pagar"
        value={formatCurrency(summary.totalAPagar)}
        change={valorChange}
        changeLabel="vs. período anterior"
        icon={TrendingUp}
        trend={valorChange > 0 ? "up" : valorChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Pagamentos no Mês"
        value={summary.pagamentosNoMes.toString()}
        change={pagamentosChange}
        changeLabel="vs. período anterior"
        icon={AlertTriangle}
        trend={pagamentosChange > 0 ? "up" : pagamentosChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Tempo Médio de Pagamento"
        value={`${summary.tempoMedioPagamento} dias`}
        change={tempoChange}
        changeLabel="vs. período anterior"
        icon={Calendar}
        trend={tempoChange > 0 ? "up" : tempoChange < 0 ? "down" : "neutral"}
      />
      <KPICard
        title="Fornecedores Ativos"
        value={summary.fornecedoresAtivos.toString()}
        change={fornecedoresChange}
        changeLabel="vs. período anterior"
        icon={Building2}
        trend={fornecedoresChange > 0 ? "up" : fornecedoresChange < 0 ? "down" : "neutral"}
      />
    </div>
  )
}
