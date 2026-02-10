"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, Plus } from "lucide-react"

// Interface para Meta Orçamentária
interface BudgetGoal {
  id: string
  period: string // YYYY-MM
  type: "income" | "expense"
  category: string
  categoryName: string
  budgetedAmount: number
  createdAt: string
}

// Dados mockados de tipos de receita
interface IncomeType {
  id: string
  name: string
}

// Dados mockados de tipos de gasto
interface ExpenseType {
  id: string
  name: string
}

const INCOME_TYPES: IncomeType[] = [
  { id: "1", name: "Receita com Produtos" },
  { id: "2", name: "Receita com Serviços" },
  { id: "3", name: "Receitas Financeiras" },
  { id: "4", name: "Outras Receitas" },
]

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

// Dados mockados de metas
const INITIAL_BUDGET_GOALS: BudgetGoal[] = [
  {
    id: "bg1",
    period: "2026-01",
    type: "income",
    category: "1",
    categoryName: "Receita com Produtos",
    budgetedAmount: 20000,
    createdAt: "2026-01-01",
  },
  {
    id: "bg2",
    period: "2026-01",
    type: "income",
    category: "2",
    categoryName: "Receita com Serviços",
    budgetedAmount: 15000,
    createdAt: "2026-01-01",
  },
  {
    id: "bg3",
    period: "2026-01",
    type: "expense",
    category: "1",
    categoryName: "Custos Variáveis",
    budgetedAmount: 15000,
    createdAt: "2026-01-01",
  },
  {
    id: "bg4",
    period: "2026-01",
    type: "expense",
    category: "4",
    categoryName: "Despesas com Pessoal",
    budgetedAmount: 20000,
    createdAt: "2026-01-01",
  },
]

export function BudgetGoalTab() {
  const [budgetGoals, setBudgetGoals] = useState<BudgetGoal[]>(INITIAL_BUDGET_GOALS)
  const [filterPeriod, setFilterPeriod] = useState("2026-01")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState<BudgetGoal | null>(null)
  const [formData, setFormData] = useState({
    period: "2026-01",
    type: "income" as "income" | "expense",
    category: "",
    budgetedAmount: "",
  })

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatPeriod = (period: string) => {
    const [year, month] = period.split("-")
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
    })
  }

  const getTypeLabel = (type: "income" | "expense") => {
    return type === "income" ? "Receita" : "Despesa"
  }

  const getTypeColor = (type: "income" | "expense") => {
    return type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getCategoryName = (type: "income" | "expense", categoryId: string) => {
    if (type === "income") {
      return INCOME_TYPES.find((t) => t.id === categoryId)?.name || "-"
    } else {
      return EXPENSE_TYPES.find((t) => t.id === categoryId)?.name || "-"
    }
  }

  const filteredGoals = budgetGoals.filter((goal) => {
    const matchesPeriod = goal.period === filterPeriod
    const matchesType = filterType === "all" || goal.type === filterType
    return matchesPeriod && matchesType
  })

  const handleOpenDialog = (goal?: BudgetGoal) => {
    if (goal) {
      setEditingGoal(goal)
      setFormData({
        period: goal.period,
        type: goal.type,
        category: goal.category,
        budgetedAmount: goal.budgetedAmount.toString(),
      })
    } else {
      setEditingGoal(null)
      setFormData({
        period: "2026-01",
        type: "income",
        category: "",
        budgetedAmount: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingGoal(null)
    setFormData({
      period: "2026-01",
      type: "income",
      category: "",
      budgetedAmount: "",
    })
  }

  const handleSaveGoal = () => {
    if (!formData.category || !formData.budgetedAmount) {
      alert("Por favor, preencha todos os campos")
      return
    }

    const amount = parseFloat(formData.budgetedAmount)
    if (isNaN(amount) || amount <= 0) {
      alert("Valor deve ser um número positivo")
      return
    }

    const categoryName = getCategoryName(formData.type, formData.category)

    if (editingGoal) {
      // Editar meta existente
      setBudgetGoals(
        budgetGoals.map((goal) =>
          goal.id === editingGoal.id
            ? {
                ...goal,
                period: formData.period,
                type: formData.type,
                category: formData.category,
                categoryName,
                budgetedAmount: amount,
              }
            : goal
        )
      )
    } else {
      // Criar nova meta
      const newGoal: BudgetGoal = {
        id: `bg${Date.now()}`,
        period: formData.period,
        type: formData.type,
        category: formData.category,
        categoryName,
        budgetedAmount: amount,
        createdAt: new Date().toISOString(),
      }
      setBudgetGoals([...budgetGoals, newGoal])
    }

    handleCloseDialog()
  }

  const handleDeleteGoal = (id: string) => {
    if (confirm("Deseja remover esta meta?")) {
      setBudgetGoals(budgetGoals.filter((goal) => goal.id !== id))
    }
  }

  const totalIncomeGoals = filteredGoals
    .filter((g) => g.type === "income")
    .reduce((sum, g) => sum + g.budgetedAmount, 0)

  const totalExpenseGoals = filteredGoals
    .filter((g) => g.type === "expense")
    .reduce((sum, g) => sum + g.budgetedAmount, 0)

  const allIncomeGoalsCurrentPeriod = budgetGoals
    .filter((g) => g.type === "income" && g.period === filterPeriod)
    .reduce((sum, g) => sum + g.budgetedAmount, 0)

  const allExpenseGoalsCurrentPeriod = budgetGoals
    .filter((g) => g.type === "expense" && g.period === filterPeriod)
    .reduce((sum, g) => sum + g.budgetedAmount, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cadastro de Metas Orçamentárias</CardTitle>
          <CardDescription>Configure metas de receita e despesas por período e categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="filter-period">Período</Label>
                <Input
                  id="filter-period"
                  type="month"
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="filter-type">Tipo</Label>
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                  <SelectTrigger id="filter-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="income">Receitas</SelectItem>
                    <SelectItem value="expense">Despesas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Orçado - Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{formatCurrency(totalIncomeGoals)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Período: {formatPeriod(filterPeriod)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Orçado - Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(totalExpenseGoals)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Período: {formatPeriod(filterPeriod)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Metas Cadastradas</CardTitle>
            <CardDescription>Gestão de metas por categoria e período</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingGoal ? "Editar Meta" : "Nova Meta Orçamentária"}</DialogTitle>
                <DialogDescription>
                  Defina uma meta de receita ou despesa para um período e categoria
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="dialog-period">Período</Label>
                  <Input
                    id="dialog-period"
                    type="month"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="dialog-type">Tipo</Label>
                  <Select value={formData.type} onValueChange={(value: any) => {
                    setFormData({ ...formData, type: value, category: "" })
                  }}>
                    <SelectTrigger id="dialog-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dialog-category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger id="dialog-category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {(formData.type === "income" ? INCOME_TYPES : EXPENSE_TYPES).map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dialog-amount">Valor Orçado</Label>
                  <Input
                    id="dialog-amount"
                    type="number"
                    placeholder="0,00"
                    value={formData.budgetedAmount}
                    onChange={(e) => setFormData({ ...formData, budgetedAmount: e.target.value })}
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveGoal}>
                  {editingGoal ? "Atualizar" : "Criar"} Meta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          {filteredGoals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma meta cadastrada para este período e tipo</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-right">Valor Orçado</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGoals.map((goal) => (
                    <TableRow key={goal.id}>
                      <TableCell className="font-medium">{formatPeriod(goal.period)}</TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(goal.type)}>
                          {getTypeLabel(goal.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>{goal.categoryName}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(goal.budgetedAmount)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(goal)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-base">Resumo - {formatPeriod(filterPeriod)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Receitas Orçadas</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(allIncomeGoalsCurrentPeriod)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Despesas Orçadas</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(allExpenseGoalsCurrentPeriod)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Saldo Orçado</p>
              <p className={`text-2xl font-bold ${
                allIncomeGoalsCurrentPeriod - allExpenseGoalsCurrentPeriod >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
                {formatCurrency(allIncomeGoalsCurrentPeriod - allExpenseGoalsCurrentPeriod)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantidade de Metas</p>
              <p className="text-2xl font-bold">
                {budgetGoals.filter((g) => g.period === filterPeriod).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
