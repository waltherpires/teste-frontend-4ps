"use client"

import { Header } from "@/components/dashboard/header"
import { BudgetVarianceTable } from "@/components/budget/budget-variance-table"
import { BudgetHorizontalAnalysis } from "@/components/budget/budget-horizontal-analysis"
import { BudgetVerticalAnalysis } from "@/components/budget/budget-vertical-analysis"
import { BudgetKPIs } from "@/components/budget/budget-kpis"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BudgetPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Planejamento Orçamentário" description="Análise de variações entre planejado e realizado" />

      <div className="flex-1 p-6 space-y-6">
        <BudgetKPIs />

        <Tabs defaultValue="variance" className="w-full">
          <TabsList className="bg-secondary">
            <TabsTrigger value="variance">Variância</TabsTrigger>
            <TabsTrigger value="horizontal">Análise Horizontal</TabsTrigger>
            <TabsTrigger value="vertical">Análise Vertical</TabsTrigger>
          </TabsList>

          <TabsContent value="variance" className="mt-6">
            <BudgetVarianceTable />
          </TabsContent>

          <TabsContent value="horizontal" className="mt-6">
            <BudgetHorizontalAnalysis />
          </TabsContent>

          <TabsContent value="vertical" className="mt-6">
            <BudgetVerticalAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
