"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/financial-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormDialog } from "@/components/ui/form-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { Plus, Pencil, Trash2, MoreHorizontal, Check, Calendar, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface Supplier {
  id: number
  name: string
  document: string
  totalAmount: number
  daysUntilDue: number
  status: "overdue" | "critical" | "warning" | "attention" | "normal"
}

const initialSuppliers: Supplier[] = [
  {
    id: 1,
    name: "Fornecedor Premium Ltda",
    document: "11.111.111/0001-11",
    totalAmount: 52000,
    daysUntilDue: -15,
    status: "overdue",
  },
  {
    id: 2,
    name: "Materiais ABC S.A.",
    document: "22.222.222/0001-22",
    totalAmount: 48000,
    daysUntilDue: -8,
    status: "overdue",
  },
  {
    id: 3,
    name: "Insumos Industriais Ltda",
    document: "33.333.333/0001-33",
    totalAmount: 42000,
    daysUntilDue: 3,
    status: "critical",
  },
  {
    id: 4,
    name: "Distribuidor Beta ME",
    document: "44.444.444/0001-44",
    totalAmount: 38000,
    daysUntilDue: 8,
    status: "warning",
  },
  {
    id: 5,
    name: "Peças Técnicas Omega",
    document: "55.555.555/0001-55",
    totalAmount: 35000,
    daysUntilDue: 12,
    status: "warning",
  },
  {
    id: 6,
    name: "Serviços Logísticos Gama",
    document: "66.666.666/0001-66",
    totalAmount: 30000,
    daysUntilDue: 18,
    status: "attention",
  },
  {
    id: 7,
    name: "Fornecedor Delta Ltda",
    document: "77.777.777/0001-77",
    totalAmount: 25000,
    daysUntilDue: 22,
    status: "attention",
  },
  {
    id: 8,
    name: "Supplier Iota Comércio",
    document: "88.888.888/0001-88",
    totalAmount: 15000,
    daysUntilDue: 28,
    status: "normal",
  },
]

export function PayableTable() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Supplier | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    totalAmount: 0,
    daysUntilDue: 0,
    status: "normal" as Supplier["status"],
  })

  const resetForm = () =>
    setFormData({ name: "", document: "", totalAmount: 0, daysUntilDue: 0, status: "normal" })

  const handleAdd = () => {
    const newSupplier: Supplier = {
      id: Date.now(),
      name: formData.name,
      document: formData.document,
      totalAmount: formData.totalAmount,
      daysUntilDue: formData.daysUntilDue,
      status: formData.status,
    }
    setSuppliers([...suppliers, newSupplier])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!editingItem) return
    setSuppliers(
      suppliers.map((s) =>
        s.id === editingItem.id
          ? {
              ...s,
              name: formData.name,
              document: formData.document,
              totalAmount: formData.totalAmount,
              daysUntilDue: formData.daysUntilDue,
              status: formData.status,
            }
          : s,
      ),
    )
    setIsEditOpen(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!editingItem) return
    setSuppliers(suppliers.filter((s) => s.id !== editingItem.id))
    setIsDeleteOpen(false)
    setEditingItem(null)
  }

  const openEdit = (supplier: Supplier) => {
    setEditingItem(supplier)
    setFormData({
      name: supplier.name,
      document: supplier.document,
      totalAmount: supplier.totalAmount,
      daysUntilDue: supplier.daysUntilDue,
      status: supplier.status,
    })
    setIsEditOpen(true)
  }

  const openDelete = (supplier: Supplier) => {
    setEditingItem(supplier)
    setIsDeleteOpen(true)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "overdue":
        return { label: "Vencido", className: "bg-destructive/20 text-destructive border-destructive/30" }
      case "critical":
        return { label: "Crítico", className: "bg-chart-5/20 text-chart-5 border-chart-5/30" }
      case "warning":
        return { label: "Atenção", className: "bg-warning/20 text-warning border-warning/30" }
      case "attention":
        return { label: "Monitorar", className: "bg-chart-3/20 text-chart-3 border-chart-3/30" }
      default:
        return { label: "Normal", className: "bg-success/20 text-success border-success/30" }
    }
  }

  const getDaysLabel = (days: number) => {
    if (days < 0) {
      return `${Math.abs(days)} dias (vencido)`
    }
    return `${days} dias`
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Contas a Pagar</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
              {suppliers.filter((s) => s.status === "overdue").length} vencidos
            </Badge>
            <Badge variant="outline" className="bg-chart-5/10 text-chart-5 border-chart-5/30">
              {suppliers.filter((s) => s.status === "critical").length} críticos
            </Badge>
            <Button onClick={() => setIsAddOpen(true)} size="sm" className="gap-1 ml-2">
              <Plus className="h-4 w-4" />
              Adicionar Fornecedor
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Fornecedor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">CNPJ</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Valor a Pagar</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Vencimento</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => {
                const statusConfig = getStatusConfig(supplier.status)
                const isOverdue = supplier.daysUntilDue < 0
                const isCritical = supplier.daysUntilDue >= 0 && supplier.daysUntilDue <= 7

                return (
                  <tr
                    key={supplier.id}
                    className={cn(
                      "border-b border-border hover:bg-secondary/30 transition-colors group",
                      isOverdue && "bg-destructive/5",
                      isCritical && supplier.status === "critical" && "bg-chart-5/5",
                    )}
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-foreground">{supplier.name}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{supplier.document}</td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums font-semibold text-foreground">
                      {formatCurrency(supplier.totalAmount)}
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right tabular-nums font-medium",
                        isOverdue ? "text-destructive" : isCritical ? "text-chart-5" : "text-warning",
                      )}
                    >
                      {getDaysLabel(supplier.daysUntilDue)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => openEdit(supplier)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => openDelete(supplier)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Marcar como Pago
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Adiar Pagamento
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Ver Detalhes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
        title="Adicionar Fornecedor"
        description="Registre uma nova conta a pagar a um fornecedor."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome do Fornecedor</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Fornecedor XYZ Ltda"
              className="bg-input border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label>CNPJ</Label>
            <Input
              value={formData.document}
              onChange={(e) => setFormData({ ...formData, document: e.target.value })}
              placeholder="00.000.000/0001-00"
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Valor a Pagar (R$)</Label>
              <Input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Dias para Vencer</Label>
              <Input
                type="number"
                value={formData.daysUntilDue}
                onChange={(e) => setFormData({ ...formData, daysUntilDue: Number(e.target.value) })}
                placeholder="Negativo = vencido"
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v as Supplier["status"] })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="attention">Monitorar</SelectItem>
                <SelectItem value="warning">Atenção</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
                <SelectItem value="overdue">Vencido</SelectItem>
              </SelectContent>
            </Select>
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
        title="Editar Fornecedor"
        description="Modifique os dados do fornecedor."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome do Fornecedor</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="grid gap-2">
            <Label>CNPJ</Label>
            <Input
              value={formData.document}
              onChange={(e) => setFormData({ ...formData, document: e.target.value })}
              className="bg-input border-border"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Valor a Pagar (R$)</Label>
              <Input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData({ ...formData, totalAmount: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Dias para Vencer</Label>
              <Input
                type="number"
                value={formData.daysUntilDue}
                onChange={(e) => setFormData({ ...formData, daysUntilDue: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v as Supplier["status"] })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="attention">Monitorar</SelectItem>
                <SelectItem value="warning">Atenção</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
                <SelectItem value="overdue">Vencido</SelectItem>
              </SelectContent>
            </Select>
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
        title="Excluir Fornecedor"
        description={`Tem certeza que deseja excluir "${editingItem?.name}"?`}
        onConfirm={handleDelete}
        confirmText="Excluir"
        variant="destructive"
      />
    </>
  )
}
