import { Header } from "@/components/dashboard/header"
import { PayableTable } from "@/components/payable/payable-table"
import { PayableDueDateAnalysis } from "@/components/payable/payable-due-date-analysis"
import { PayableKPIs } from "@/components/payable/payable-kpis"

export default function PayablePage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Endividamento"
        description="Gestão de contas a pagar - Acompanhamento de fornecedores e pagamentos pendentes"
      />

      <div className="flex-1 p-6 space-y-6">
        <PayableKPIs />
        <PayableDueDateAnalysis />
        <PayableTable />
      </div>
    </div>
  )
}
