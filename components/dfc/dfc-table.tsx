"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormDialog } from "@/components/ui/form-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

type Period = "jan" | "fev" | "mar" | "abr" | "mai" | "jun"
type Category = "operacional" | "investimento" | "financiamento"

interface DFCItem {
  id: string
  name: string
  category: Category
  values: Record<Period, number>
}

const periodLabels: Record<Period, string> = {
  jan: "Jan/24",
  fev: "Fev/24",
  mar: "Mar/24",
  abr: "Abr/24",
  mai: "Mai/24",
  jun: "Jun/24",
}

const initialDfcData: DFCItem[] = [
  {
    id: "lucro-liquido-dfc",
    name: "Lucro Líquido do Período",
    category: "operacional",
    values: { jan: 45441, fev: 48975, mar: 52510, abr: 49985, mai: 54529, jun: 58568 },
  },
  {
    id: "depreciacao",
    name: "(+) Depreciação e Amortização",
    category: "operacional",
    values: { jan: 12000, fev: 12000, mar: 12000, abr: 12000, mai: 12000, jun: 12000 },
  },
  {
    id: "var-clientes",
    name: "(+/-) Variação de Clientes",
    category: "operacional",
    values: { jan: -15000, fev: -8000, mar: -12000, abr: 5000, mai: -18000, jun: -10000 },
  },
  {
    id: "var-estoques",
    name: "(+/-) Variação de Estoques",
    category: "operacional",
    values: { jan: -8000, fev: -5000, mar: -10000, abr: 3000, mai: -7000, jun: -12000 },
  },
  {
    id: "var-fornecedores",
    name: "(+/-) Variação de Fornecedores",
    category: "operacional",
    values: { jan: 10000, fev: 7000, mar: 15000, abr: -2000, mai: 12000, jun: 8000 },
  },
  {
    id: "aquisicao-imob",
    name: "(-) Aquisição de Imobilizado",
    category: "investimento",
    values: { jan: -25000, fev: -15000, mar: -30000, abr: -20000, mai: -35000, jun: -40000 },
  },
  {
    id: "venda-ativos",
    name: "(+) Venda de Ativos",
    category: "investimento",
    values: { jan: 0, fev: 5000, mar: 0, abr: 0, mai: 10000, jun: 0 },
  },
  {
    id: "aplicacoes",
    name: "(-) Aplicações Financeiras",
    category: "investimento",
    values: { jan: -10000, fev: -5000, mar: -15000, abr: -10000, mai: -20000, jun: -15000 },
  },
  {
    id: "emprestimos",
    name: "(+/-) Empréstimos e Financiamentos",
    category: "financiamento",
    values: { jan: -5000, fev: -5000, mar: 20000, abr: -8000, mai: -5000, jun: 15000 },
  },
  {
    id: "dividendos",
    name: "(-) Dividendos Pagos",
    category: "financiamento",
    values: { jan: -15000, fev: -15000, mar: -15000, abr: -15000, mai: -15000, jun: -15000 },
  },
  {
    id: "aporte-capital",
    name: "(+) Aporte de Capital",
    category: "financiamento",
    values: { jan: 0, fev: 0, mar: 0, abr: 0, mai: 50000, jun: 0 },
  },
]

const saldoInicial: Record<Period, number> = {
  jan: 150000,
  fev: 139441,
  mar: 159416,
  abr: 176926,
  mai: 190911,
  jun: 228440,
}

export function DFCTable() {
  const periods: Period[] = ["jan", "fev", "mar", "abr", "mai", "jun"]
  const [items, setItems] = useState<DFCItem[]>(initialDfcData)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<DFCItem | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "operacional" as Category,
    jan: 0,
    fev: 0,
    mar: 0,
    abr: 0,
    mai: 0,
    jun: 0,
  })

  const resetForm = () => {
    setFormData({ name: "", category: "operacional", jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0 })
  }

  const handleAdd = () => {
    const newItem: DFCItem = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      values: {
        jan: formData.jan,
        fev: formData.fev,
        mar: formData.mar,
        abr: formData.abr,
        mai: formData.mai,
        jun: formData.jun,
      },
    }
    setItems([...items, newItem])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!editingItem) return
    setItems(
      items.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              name: formData.name,
              category: formData.category,
              values: {
                jan: formData.jan,
                fev: formData.fev,
                mar: formData.mar,
                abr: formData.abr,
                mai: formData.mai,
                jun: formData.jun,
              },
            }
          : item,
      ),
    )
    setIsEditOpen(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!editingItem) return
    setItems(items.filter((item) => item.id !== editingItem.id))
    setIsDeleteOpen(false)
    setEditingItem(null)
  }

  const openEdit = (item: DFCItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      jan: item.values.jan,
      fev: item.values.fev,
      mar: item.values.mar,
      abr: item.values.abr,
      mai: item.values.mai,
      jun: item.values.jun,
    })
    setIsEditOpen(true)
  }

  const openDelete = (item: DFCItem) => {
    setEditingItem(item)
    setIsDeleteOpen(true)
  }

  const calculateTotal = (category: Category, period: Period): number => {
    return items.filter((i) => i.category === category).reduce((sum, item) => sum + item.values[period], 0)
  }

  const calculateSaldoFinal = (period: Period): number => {
    const operacional = calculateTotal("operacional", period)
    const investimento = calculateTotal("investimento", period)
    const financiamento = calculateTotal("financiamento", period)
    return saldoInicial[period] + operacional + investimento + financiamento
  }

  const renderCategorySection = (category: Category, title: string, bgClass: string, textClass: string) => {
    const categoryItems = items.filter((i) => i.category === category)
    return (
      <>
        <tr className={`border-b border-border ${bgClass}`}>
          <td colSpan={8} className={`py-2 px-4 text-sm font-semibold ${textClass}`}>
            {title}
          </td>
        </tr>
        {categoryItems.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-secondary/30 group">
            <td className="py-3 px-4 text-sm text-foreground pl-8 sticky left-0 bg-card">{item.name}</td>
            {periods.map((period) => (
              <td
                key={period}
                className={cn(
                  "py-3 px-4 text-sm text-right tabular-nums",
                  item.values[period] < 0 ? "text-destructive" : "text-success",
                )}
              >
                {formatCurrency(item.values[period])}
              </td>
            ))}
            <td className="py-3 px-4 text-center">
              <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => openDelete(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
        <tr className="border-b border-border bg-secondary/50">
          <td className="py-3 px-4 text-sm font-semibold text-foreground sticky left-0 bg-secondary/50">
            Total {title.split(" ").pop()}
          </td>
          {periods.map((period) => {
            const total = calculateTotal(category, period)
            return (
              <td
                key={period}
                className={cn(
                  "py-3 px-4 text-sm text-right tabular-nums font-semibold",
                  total >= 0 ? "text-success" : "text-destructive",
                )}
              >
                {formatCurrency(total)}
              </td>
            )
          })}
          <td></td>
        </tr>
      </>
    )
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Demonstrativo de Fluxo de Caixa</CardTitle>
          <Button onClick={() => setIsAddOpen(true)} size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Adicionar Lançamento
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground sticky left-0 bg-card min-w-[280px]">
                  Descrição
                </th>
                {periods.map((period) => (
                  <th
                    key={period}
                    className="text-right py-3 px-4 text-sm font-medium text-muted-foreground min-w-[100px]"
                  >
                    {periodLabels[period]}
                  </th>
                ))}
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground min-w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border bg-secondary/30">
                <td className="py-3 px-4 text-sm font-semibold text-foreground sticky left-0 bg-secondary/30">
                  Saldo Inicial
                </td>
                {periods.map((period) => (
                  <td key={period} className="py-3 px-4 text-sm text-right tabular-nums font-semibold text-foreground">
                    {formatCurrency(saldoInicial[period])}
                  </td>
                ))}
                <td></td>
              </tr>
              {renderCategorySection("operacional", "Atividades Operacionais", "bg-primary/5", "text-primary")}
              {renderCategorySection("investimento", "Atividades de Investimento", "bg-chart-4/10", "text-chart-4")}
              {renderCategorySection("financiamento", "Atividades de Financiamento", "bg-chart-5/10", "text-chart-5")}
              <tr className="bg-primary/10">
                <td className="py-3 px-4 text-sm font-bold text-primary sticky left-0 bg-primary/10">Saldo Final</td>
                {periods.map((period) => (
                  <td key={period} className="py-3 px-4 text-sm text-right tabular-nums font-bold text-primary">
                    {formatCurrency(calculateSaldoFinal(period))}
                  </td>
                ))}
                <td></td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>

      <FormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Adicionar Lançamento DFC"
        description="Preencha os dados do novo lançamento."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Descrição</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Pagamento de Fornecedores"
              className="bg-input border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(v) => setFormData({ ...formData, category: v as Category })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operacional">Operacional</SelectItem>
                <SelectItem value="investimento">Investimento</SelectItem>
                <SelectItem value="financiamento">Financiamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {periods.map((period) => (
              <div key={period} className="grid gap-1">
                <Label className="text-xs">{periodLabels[period]}</Label>
                <Input
                  type="number"
                  value={formData[period]}
                  onChange={(e) => setFormData({ ...formData, [period]: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            ))}
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
        title="Editar Lançamento DFC"
        description="Modifique os dados do lançamento."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Descrição</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(v) => setFormData({ ...formData, category: v as Category })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operacional">Operacional</SelectItem>
                <SelectItem value="investimento">Investimento</SelectItem>
                <SelectItem value="financiamento">Financiamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {periods.map((period) => (
              <div key={period} className="grid gap-1">
                <Label className="text-xs">{periodLabels[period]}</Label>
                <Input
                  type="number"
                  value={formData[period]}
                  onChange={(e) => setFormData({ ...formData, [period]: Number(e.target.value) })}
                  className="bg-input border-border"
                />
              </div>
            ))}
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
        title="Excluir Lançamento"
        description={`Tem certeza que deseja excluir "${editingItem?.name}"?`}
        onConfirm={handleDelete}
        confirmText="Excluir"
        variant="destructive"
      />
    </>
  )
}
