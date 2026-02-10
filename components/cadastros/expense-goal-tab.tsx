"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Tipos de gasto do cadastro
interface ExpenseType {
  id: string
  name: string
}

// Lançamento de gasto
interface ExpenseRecord {
  id: string
  expenseTypeId: string
  description: string
  amount: number
  date: string
  supplierId?: string
  projectId?: string
  paymentMethodId?: string
}

// Dados mockados dos cadastros
const EXPENSE_TYPES: ExpenseType[] = [
  { id: "1", name: "Custos Variáveis" },
  { id: "2", name: "Despesas em Ocupação" },
  { id: "3", name: "Despesas com Serviços" },
  { id: "4", name: "Despesas com Pessoal" },
  { id: "5", name: "Deduções sobre Vendas" },
  { id: "6", name: "Impostos Diretos" },
  { id: "7", name: "Investimentos" },
  { id: "8", name: "Despesas Financeiras" },
  { id: "9", name: "Outras Despesas" },
]

// Dados mockados de lançamentos (em produção viriam do backend)
const EXPENSE_RECORDS: ExpenseRecord[] = [
  {
    id: "er1",
    expenseTypeId: "1",
    description: "Compra de Matéria Prima",
    amount: 2500,
    date: "2026-01-16",
    supplierId: "s1",
  },
  {
    id: "er2",
    expenseTypeId: "4",
    description: "Salários Colaboradores",
    amount: 8000,
    date: "2026-01-20",
  },
  {
    id: "er3",
    expenseTypeId: "2",
    description: "Aluguel do Escritório",
    amount: 3000,
    date: "2026-01-05",
  },
  {
    id: "er4",
    expenseTypeId: "3",
    description: "Serviços de Internet",
    amount: 500,
    date: "2026-01-10",
  },
]

// Dados mockados de orçamento por tipo
interface BudgetData {
  expenseTypeId: string
  budgeted: number
}

const BUDGET_DATA: BudgetData[] = [
  { expenseTypeId: "1", budgeted: 15000 },
  { expenseTypeId: "2", budgeted: 8000 },
  { expenseTypeId: "3", budgeted: 2000 },
  { expenseTypeId: "4", budgeted: 20000 },
  { expenseTypeId: "5", budgeted: 5000 },
  { expenseTypeId: "6", budgeted: 3000 },
  { expenseTypeId: "7", budgeted: 5000 },
  { expenseTypeId: "8", budgeted: 1000 },
  { expenseTypeId: "9", budgeted: 1000 },
]

export function ExpenseGoalTab() {
  const [filterMode, setFilterMode] = useState<"month" | "custom">("month")
  const [selectedMonth, setSelectedMonth] = useState("2026-01")
  const [startDate, setStartDate] = useState("2026-01-01")
  const [endDate, setEndDate] = useState("2026-01-31")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getExpenseTypeName = (id: string) => {
    return EXPENSE_TYPES.find((t) => t.id === id)?.name || "-"
  }

  const getDateRange = () => {
    if (filterMode === "month") {
      const [year, month] = selectedMonth.split("-")
      const monthNum = parseInt(month)
      return {
        start: new Date(parseInt(year), monthNum - 1, 1),
        end: new Date(parseInt(year), monthNum, 0),
      }
    }
    return {
      start: new Date(startDate),
      end: new Date(endDate),
    }
  }

  const filteredRecords = EXPENSE_RECORDS.filter((record) => {
    const range = getDateRange()
    const recordDate = new Date(record.date)
    return recordDate >= range.start && recordDate <= range.end
  })

  const calculateTotals = (expenseTypeId: string) => {
    const typeRecords = filteredRecords.filter((r) => r.expenseTypeId === expenseTypeId)
    const realized = typeRecords.reduce((sum, r) => sum + r.amount, 0)
    const budget = BUDGET_DATA.find((b) => b.expenseTypeId === expenseTypeId)?.budgeted || 0
    return { realized, budgeted: budget }
  }

  const totalBudgeted = BUDGET_DATA.reduce((sum, b) => sum + b.budgeted, 0)
  const totalRealized = filteredRecords.reduce((sum, r) => sum + r.amount, 0)
  const percentageRealized = totalBudgeted > 0 ? ((totalRealized / totalBudgeted) * 100).toFixed(2) : "0.00"

  const getStatus = (budgeted: number, realized: number) => {
    const percentage = budgeted > 0 ? (realized / budgeted) * 100 : 0
    if (percentage <= 100) return { label: "Dentro", color: "bg-green-500" }
    if (percentage <= 110) return { label: "Atenção", color: "bg-yellow-500" }
    return { label: "Excesso", color: "bg-red-500" }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtro de Período</CardTitle>
          <CardDescription>Selecione o período para análise</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="filter-mode">Tipo de Filtro</Label>
              <Select value={filterMode} onValueChange={(value: any) => setFilterMode(value)}>
                <SelectTrigger id="filter-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Mês Específico</SelectItem>
                  <SelectItem value="custom">Período Customizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filterMode === "month" && (
              <div>
                <Label htmlFor="month">Mês</Label>
                <Input
                  id="month"
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                />
              </div>
            )}

            {filterMode === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date">Data Inicial</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">Data Final</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumo de Metas de Gastos</CardTitle>
          <CardDescription>Comparativo entre gasto orçado e gasto realizado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Orçado</p>
              <p className="text-2xl font-bold">{formatCurrency(totalBudgeted)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Realizado</p>
              <p className="text-2xl font-bold">{formatCurrency(totalRealized)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">% Realizado</p>
              <p className="text-2xl font-bold">{percentageRealized}%</p>
              <Progress value={Math.min(parseFloat(percentageRealized), 100)} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes por Tipo de Gasto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Gasto</TableHead>
                  <TableHead className="text-right">Orçado</TableHead>
                  <TableHead className="text-right">Realizado</TableHead>
                  <TableHead className="text-right">% Realizado</TableHead>
                  <TableHead className="text-right">Diferença</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {EXPENSE_TYPES.map((type) => {
                  const { budgeted, realized } = calculateTotals(type.id)
                  const percentage = budgeted > 0 ? ((realized / budgeted) * 100).toFixed(2) : "0.00"
                  const difference = realized - budgeted
                  const status = getStatus(budgeted, realized)

                  return (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.name}</TableCell>
                      <TableCell className="text-right">{formatCurrency(budgeted)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(realized)}</TableCell>
                      <TableCell className="text-right">
                        <Progress value={Math.min(parseFloat(percentage), 100)} className="w-24 inline-block mr-2" />
                        <span className="text-sm">{percentage}%</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={difference <= 0 ? "text-green-600" : "text-red-600"}>
                          {formatCurrency(difference)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={status.color}>{status.label}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
