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
type ItemType = "entrada" | "saida"

interface DFCItem {
  id: string
  name: string
  type: ItemType
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
    id: "receita-produtos",
    name: "Receita com produtos",
    type: "entrada",
    values: { jan: 45000, fev: 48000, mar: 52000, abr: 50000, mai: 54000, jun: 58000 },
  },
  {
    id: "receita-servicos",
    name: "Receita com serviços",
    type: "entrada",
    values: { jan: 25000, fev: 27000, mar: 30000, abr: 28000, mai: 32000, jun: 35000 },
  },
  {
    id: "receita-juros",
    name: "Receita de juros",
    type: "entrada",
    values: { jan: 2000, fev: 2500, mar: 3000, abr: 2500, mai: 3500, jun: 4000 },
  },
  {
    id: "pagto-fornecedores",
    name: "Pagamento de fornecedores",
    type: "saida",
    values: { jan: -30000, fev: -32000, mar: -35000, abr: -33000, mai: -38000, jun: -40000 },
  },
  {
    id: "pagto-folha",
    name: "Pagamento de folha",
    type: "saida",
    values: { jan: -25000, fev: -25000, mar: -25000, abr: -25000, mai: -25000, jun: -25000 },
  },
  {
    id: "pagto-aluguel",
    name: "Pagamento de aluguel",
    type: "saida",
    values: { jan: -5000, fev: -5000, mar: -5000, abr: -5000, mai: -5000, jun: -5000 },
  },
  {
    id: "pagto-utilidades",
    name: "Pagamento de utilidades",
    type: "saida",
    values: { jan: -3000, fev: -3000, mar: -3000, abr: -3000, mai: -3000, jun: -3000 },
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
    type: "entrada" as ItemType,
    jan: 0,
    fev: 0,
    mar: 0,
    abr: 0,
    mai: 0,
    jun: 0,
  })

  const resetForm = () => {
    setFormData({ name: "", type: "entrada", jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0 })
  }

  const handleAdd = () => {
    const newItem: DFCItem = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      type: formData.type,
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
              type: formData.type,
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
      type: item.type,
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

  const calculateTotalByType = (type: ItemType, period: Period): number => {
    return items.filter((i) => i.type === type).reduce((sum, item) => sum + item.values[period], 0)
  }

  const calculateSaldoOperacional = (period: Period): number => {
    const entradas = calculateTotalByType("entrada", period)
    const saidas = calculateTotalByType("saida", period)
    return entradas + saidas
  }

  const calculateSaldoFinal = (period: Period): number => {
    return saldoInicial[period] + calculateSaldoOperacional(period)
  }

  const renderTypeSection = (type: ItemType, title: string, bgClass: string, textClass: string) => {
    const typeItems = items.filter((i) => i.type === type)
    return (
      <>
        <tr className={`border-b border-border ${bgClass}`}>
          <td colSpan={8} className={`py-2 px-4 text-sm font-semibold ${textClass}`}>
            {title}
          </td>
        </tr>
        {typeItems.map((item) => (
          <tr key={item.id} className="border-b border-border hover:bg-secondary/30 group">
            <td className="py-3 px-4 text-sm text-foreground pl-8 sticky left-0 bg-card">{item.name}</td>
            {periods.map((period) => (
              <td
                key={period}
                className={cn(
                  "py-3 px-4 text-sm text-right tabular-nums",
                  type === "entrada" ? "text-success" : "text-destructive",
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
        <tr className={`border-b border-border ${bgClass}/50`}>
          <td className={`py-3 px-4 text-sm font-semibold sticky left-0 ${bgClass}/50`}>
            Total {title}
          </td>
          {periods.map((period) => {
            const total = calculateTotalByType(type, period)
            return (
              <td
                key={period}
                className={cn(
                  "py-3 px-4 text-sm text-right tabular-nums font-semibold",
                  type === "entrada" ? "text-success" : "text-destructive",
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
          <table className="w-full min-w-300">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground sticky left-0 bg-card min-w-75">
                  Descrição
                </th>
                {periods.map((period) => (
                  <th
                    key={period}
                    className="text-right py-3 px-4 text-sm font-medium text-muted-foreground min-w-30"
                  >
                    {periodLabels[period]}
                  </th>
                ))}
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground min-w-25">Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Saldo Inicial */}
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

              {/* Entradas */}
              {renderTypeSection("entrada", "Entradas", "bg-green-500/5", "text-green-600 dark:text-green-400")}

              {/* Saídas */}
              {renderTypeSection("saida", "Saídas", "bg-red-500/5", "text-red-600 dark:text-red-400")}

              {/* Saldo Operacional */}
              <tr className="border-b border-border bg-blue-500/10">
                <td className="py-3 px-4 text-sm font-bold text-blue-600 dark:text-blue-400 sticky left-0 bg-blue-500/10">
                  Saldo Operacional
                </td>
                {periods.map((period) => {
                  const saldoOp = calculateSaldoOperacional(period)
                  return (
                    <td
                      key={period}
                      className={cn(
                        "py-3 px-4 text-sm text-right tabular-nums font-bold",
                        saldoOp >= 0 ? "text-success" : "text-destructive",
                      )}
                    >
                      {formatCurrency(saldoOp)}
                    </td>
                  )
                })}
                <td></td>
              </tr>

              {/* Saldo Final */}
              <tr className="bg-primary/10">
                <td className="py-3 px-4 text-sm font-bold text-primary sticky left-0 bg-primary/10">
                  Saldo Final
                </td>
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
              placeholder="Ex: Receita com produtos"
              className="bg-input border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label>Tipo</Label>
            <Select
              value={formData.type}
              onValueChange={(v) => setFormData({ ...formData, type: v as ItemType })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
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
            <Label>Tipo</Label>
            <Select
              value={formData.type}
              onValueChange={(v) => setFormData({ ...formData, type: v as ItemType })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entrada">Entrada</SelectItem>
                <SelectItem value="saida">Saída</SelectItem>
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
