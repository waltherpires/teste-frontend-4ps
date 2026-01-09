"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormDialog } from "@/components/ui/form-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

interface BudgetCategory {
  id: string
  name: string
  planned: number
  actual: number
}

const initialBudgetData: BudgetCategory[] = [
  { id: "receita-orcada", name: "Receita Bruta", planned: 3100000, actual: 3070000 },
  { id: "cmv-orcado", name: "CMV / CSV", planned: 1550000, actual: 1504750 },
  { id: "despesas-admin", name: "Despesas Administrativas", planned: 400000, actual: 391426 },
  { id: "despesas-venda", name: "Despesas com Vendas", planned: 260000, actual: 260950 },
  { id: "despesas-fin", name: "Despesas Financeiras", planned: 130000, actual: 130474 },
  { id: "marketing", name: "Marketing e Publicidade", planned: 80000, actual: 92000 },
  { id: "ti", name: "Tecnologia da Informação", planned: 60000, actual: 55000 },
  { id: "rh", name: "Recursos Humanos", planned: 45000, actual: 48500 },
]

export function BudgetVarianceTable() {
  const [categories, setCategories] = useState<BudgetCategory[]>(initialBudgetData)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<BudgetCategory | null>(null)
  const [formData, setFormData] = useState({ name: "", planned: 0, actual: 0 })

  const resetForm = () => setFormData({ name: "", planned: 0, actual: 0 })

  const handleAdd = () => {
    const newCategory: BudgetCategory = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      planned: formData.planned,
      actual: formData.actual,
    }
    setCategories([...categories, newCategory])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!editingItem) return
    setCategories(
      categories.map((cat) =>
        cat.id === editingItem.id
          ? { ...cat, name: formData.name, planned: formData.planned, actual: formData.actual }
          : cat,
      ),
    )
    setIsEditOpen(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!editingItem) return
    setCategories(categories.filter((cat) => cat.id !== editingItem.id))
    setIsDeleteOpen(false)
    setEditingItem(null)
  }

  const openEdit = (category: BudgetCategory) => {
    setEditingItem(category)
    setFormData({ name: category.name, planned: category.planned, actual: category.actual })
    setIsEditOpen(true)
  }

  const openDelete = (category: BudgetCategory) => {
    setEditingItem(category)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Análise Planejado vs Realizado</CardTitle>
          <Button onClick={() => setIsAddOpen(true)} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Adicionar Categoria
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Categoria</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Planejado</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Realizado</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Variação R$</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Variação %</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground min-w-[150px]">
                  Execução
                </th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => {
                const variance = category.actual - category.planned
                const variancePercent = ((category.actual - category.planned) / category.planned) * 100
                const executionPercent = (category.actual / category.planned) * 100
                const isRevenue = category.id === "receita-orcada"
                const isPositiveVariance = isRevenue ? variance >= 0 : variance <= 0
                let status: "success" | "warning" | "danger"
                if (Math.abs(variancePercent) <= 3) status = "success"
                else if (Math.abs(variancePercent) <= 10) status = "warning"
                else status = "danger"

                return (
                  <tr key={category.id} className="border-b border-border hover:bg-secondary/30 group">
                    <td className="py-3 px-4 text-sm text-foreground font-medium">{category.name}</td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums text-muted-foreground">
                      {formatCurrency(category.planned)}
                    </td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums text-foreground">
                      {formatCurrency(category.actual)}
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right tabular-nums font-medium",
                        isPositiveVariance ? "text-success" : "text-destructive",
                      )}
                    >
                      {variance > 0 ? "+" : ""}
                      {formatCurrency(variance)}
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right tabular-nums font-medium",
                        isPositiveVariance ? "text-success" : "text-destructive",
                      )}
                    >
                      {variancePercent > 0 ? "+" : ""}
                      {variancePercent.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Progress
                          value={Math.min(executionPercent, 100)}
                          className={cn(
                            "h-2",
                            status === "success" && "[&>div]:bg-success",
                            status === "warning" && "[&>div]:bg-warning",
                            status === "danger" && "[&>div]:bg-destructive",
                          )}
                        />
                        <span className="text-xs text-muted-foreground w-12">{executionPercent.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                          status === "success" && "bg-success/20 text-success",
                          status === "warning" && "bg-warning/20 text-warning",
                          status === "danger" && "bg-destructive/20 text-destructive",
                        )}
                      >
                        {status === "success" ? "No Orçamento" : status === "warning" ? "Atenção" : "Fora do Orçamento"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(category)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => openDelete(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <FormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Adicionar Categoria"
        description="Adicione uma nova categoria ao orçamento."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome da Categoria</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Investimentos"
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Valor Planejado (R$)</Label>
              <Input
                type="number"
                value={formData.planned}
                onChange={(e) => setFormData({ ...formData, planned: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Valor Realizado (R$)</Label>
              <Input
                type="number"
                value={formData.actual}
                onChange={(e) => setFormData({ ...formData, actual: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </div>
        </div>
      </FormDialog>

      <FormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Editar Categoria"
        description="Modifique os dados da categoria."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome da Categoria</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Valor Planejado (R$)</Label>
              <Input
                type="number"
                value={formData.planned}
                onChange={(e) => setFormData({ ...formData, planned: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Valor Realizado (R$)</Label>
              <Input
                type="number"
                value={formData.actual}
                onChange={(e) => setFormData({ ...formData, actual: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Salvar</Button>
          </div>
        </div>
      </FormDialog>

      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Excluir Categoria"
        description={`Tem certeza que deseja excluir "${editingItem?.name}"?`}
        onConfirm={handleDelete}
        confirmText="Excluir"
        variant="destructive"
      />
    </>
  )
}
