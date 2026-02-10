"use client"

import { Header } from "@/components/dashboard/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncomeTypesTab } from "@/components/cadastros/income-types-tab"
import { ExpenseTypesTab } from "@/components/cadastros/expense-types-tab"
import { BudgetGoalTab } from "@/components/cadastros/budget-goal-tab"
import { ClientsTab } from "@/components/cadastros/clients-tab"
import { SuppliersTab } from "@/components/cadastros/suppliers-tab"
import { ProjectsTab } from "@/components/cadastros/projects-tab"
import { PaymentMethodsTab } from "@/components/cadastros/payment-methods-tab"

export default function CadastrosPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Cadastros" description="Gerencie tipos de receita, despesas, clientes, fornecedores e mais" />

      <div className="flex-1 p-6 space-y-6">
        <Tabs defaultValue="income-types">
          <TabsList className="bg-secondary gap-3 flex flex-wrap h-auto justify-start">
            <TabsTrigger value="income-types">Tipos de Receita</TabsTrigger>
            <TabsTrigger value="expense-types">Tipos de Gastos</TabsTrigger>
            <TabsTrigger value="budget-goal">Cadastro de Metas</TabsTrigger>

            <TabsTrigger value="clients">Meus Clientes</TabsTrigger>
            <TabsTrigger value="suppliers">Meus Fornecedores</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="payment-methods">Formas de Pagamento</TabsTrigger>
          </TabsList>

          <TabsContent value="income-types" className="mt-6">
            <IncomeTypesTab />
          </TabsContent>

          <TabsContent value="expense-types" className="mt-6">
            <ExpenseTypesTab />
          </TabsContent>

          <TabsContent value="budget-goal" className="mt-6">
            <BudgetGoalTab />
          </TabsContent>

          <TabsContent value="clients" className="mt-6">
            <ClientsTab />
          </TabsContent>

          <TabsContent value="suppliers" className="mt-6">
            <SuppliersTab />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectsTab />
          </TabsContent>

          <TabsContent value="payment-methods" className="mt-6">
            <PaymentMethodsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
