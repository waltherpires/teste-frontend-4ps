"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Tipos de receita do cadastro
interface IncomeType {
  id: string
  name: string
}

// Lançamento de receita
interface IncomeRecord {
  id: string
  incomeTypeId: string
  description: string
  amount: number
  date: string
  clientId?: string
  projectId?: string
  paymentMethodId?: string
}

// Dados mockados dos cadastros
const INCOME_TYPES: IncomeType[] = [
  { id: "1", name: "Receita com Produtos" },
  { id: "2", name: "Receita com Serviços" },
  { id: "3", name: "Receitas Financeiras" },
  { id: "4", name: "Outras Receitas" },
]

// Dados mockados de lançamentos (em produção viriam do backend)
const INCOME_RECORDS: IncomeRecord[] = [
  {
    id: "ir1",
    incomeTypeId: "1",
    description: "Venda de Produto A",
    amount: 5000,
    date: "2026-01-15",
    clientId: "c1",
  },
  {
    id: "ir2",
    incomeTypeId: "1",
    description: "Venda de Produto B",
    amount: 3500,
    date: "2026-01-18",
    clientId: "c2",
  },
  {
    id: "ir3",
    incomeTypeId: "2",
    description: "Serviço de Consultoria",
    amount: 8000,
    date: "2026-01-20",
    clientId: "c1",
  },
  {
    id: "ir4",
    incomeTypeId: "3",
    description: "Juros Recebidos",
    amount: 1200,
    date: "2026-01-25",
  },
]

// Dados mockados de orçamento por tipo
interface BudgetData {
  incomeTypeId: string
  budgeted: number
}

const BUDGET_DATA: BudgetData[] = [
  { incomeTypeId: "1", budgeted: 20000 },
  { incomeTypeId: "2", budgeted: 15000 },
  { incomeTypeId: "3", budgeted: 5000 },
  { incomeTypeId: "4", budgeted: 3000 },
]

export function IncomeGoalTab() {
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

  const getIncomeTypeName = (id: string) => {
    return INCOME_TYPES.find((t) => t.id === id)?.name || "-"
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

  const filteredRecords = INCOME_RECORDS.filter((record) => {
    const range = getDateRange()
    const recordDate = new Date(record.date)
    return recordDate >= range.start && recordDate <= range.end
  })

  const calculateTotals = (incomeTypeId: string) => {
    const typeRecords = filteredRecords.filter((r) => r.incomeTypeId === incomeTypeId)
    const realized = typeRecords.reduce((sum, r) => sum + r.amount, 0)
    const budget = BUDGET_DATA.find((b) => b.incomeTypeId === incomeTypeId)?.budgeted || 0
    return { realized, budgeted: budget }
  }

  const totalBudgeted = BUDGET_DATA.reduce((sum, b) => sum + b.budgeted, 0)
  const totalRealized = filteredRecords.reduce((sum, r) => sum + r.amount, 0)
  const percentageRealized = totalBudgeted > 0 ? ((totalRealized / totalBudgeted) * 100).toFixed(2) : "0.00"

  const getStatus = (budgeted: number, realized: number) => {
    const percentage = budgeted > 0 ? (realized / budgeted) * 100 : 0
    if (percentage >= 100) return { label: "Acima", color: "bg-green-500" }
    if (percentage >= 90) return { label: "Próximo", color: "bg-blue-500" }
    return { label: "Abaixo", color: "bg-yellow-500" }
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
          <CardTitle>Resumo de Metas de Receita</CardTitle>
          <CardDescription>Comparativo entre receita orçada e receita realizada</CardDescription>
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
          <CardTitle>Detalhes por Tipo de Receita</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo de Receita</TableHead>
                  <TableHead className="text-right">Orçado</TableHead>
                  <TableHead className="text-right">Realizado</TableHead>
                  <TableHead className="text-right">% Realizado</TableHead>
                  <TableHead className="text-right">Diferença</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INCOME_TYPES.map((type) => {
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
                        <span className={difference >= 0 ? "text-green-600" : "text-red-600"}>
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
