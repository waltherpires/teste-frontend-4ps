import { Header } from "@/components/dashboard/header"
import { DelinquencyTable } from "@/components/delinquency/delinquency-table"
import { DelinquencyAging } from "@/components/delinquency/delinquency-aging"
import { DelinquencyKPIs } from "@/components/delinquency/delinquency-kpis"

export default function DelinquencyPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Inadimplência"
        description="Gestão de crédito e cobrança - Acompanhamento de clientes inadimplentes"
      />

      <div className="flex-1 p-6 space-y-6">
        <DelinquencyKPIs />
        <DelinquencyAging />
        <DelinquencyTable />
      </div>
    </div>
  )
}
