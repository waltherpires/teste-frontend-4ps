"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormDialog } from "@/components/ui/form-dialog"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { formatCurrency } from "@/lib/financial-data"

interface TransferenciaEntreBancos {
  id: string
  dataTransferencia: string
  saiuDoBanco: string
  entrouNoBanco: string
  valor: number
}

const initialData: TransferenciaEntreBancos[] = [
  {
    id: "1",
    dataTransferencia: "2025-01-15",
    saiuDoBanco: "Stone",
    entrouNoBanco: "Cora",
    valor: 10000,
  },
  {
    id: "2",
    dataTransferencia: "2025-01-10",
    saiuDoBanco: "Cora",
    entrouNoBanco: "Banco do Brasil",
    valor: 25000,
  },
]

const bancoOptions = [
  { value: "stone", label: "Stone" },
  { value: "cora", label: "Cora" },
  { value: "banco-brasil", label: "Banco do Brasil" },
  { value: "caixa", label: "Caixa" },
  { value: "nubank", label: "Nubank" },
  { value: "bradesco", label: "Bradesco" },
  { value: "itau", label: "Itaú" },
  { value: "santander", label: "Santander" },
]

export function TransferenciaEntreBancos() {
  const [items, setItems] = useState<TransferenciaEntreBancos[]>(initialData)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<TransferenciaEntreBancos | null>(null)
  const [formData, setFormData] = useState<Omit<TransferenciaEntreBancos, "id">>({
    dataTransferencia: "",
    saiuDoBanco: "",
    entrouNoBanco: "",
    valor: 0,
  })

  const resetForm = () => {
    setFormData({
      dataTransferencia: "",
      saiuDoBanco: "",
      entrouNoBanco: "",
      valor: 0,
    })
    setEditingItem(null)
  }

  const handleAdd = () => {
    const newItem: TransferenciaEntreBancos = {
      id: `transferencia-${Date.now()}`,
      ...formData,
    }
    setItems([...items, newItem])
    resetForm()
    setIsAddOpen(false)
  }

  const handleEdit = () => {
    if (!editingItem) return
    setItems(items.map((item) => (item.id === editingItem.id ? { ...editingItem, ...formData } : item)))
    resetForm()
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    if (!editingItem) return
    setItems(items.filter((item) => item.id !== editingItem.id))
    resetForm()
    setIsDeleteOpen(false)
  }

  const openEditDialog = (item: TransferenciaEntreBancos) => {
    setEditingItem(item)
    setFormData(item)
    setIsEditOpen(true)
  }

  const openDeleteDialog = (item: TransferenciaEntreBancos) => {
    setEditingItem(item)
    setIsDeleteOpen(true)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  const getBancoLabel = (value: string) => {
    return bancoOptions.find((opt) => opt.value === value)?.label || value
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transferência entre Bancos</CardTitle>
        <Button onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Transferência
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Data</th>
                <th className="text-left py-3 px-4 font-semibold">Saiu do Banco</th>
                <th className="text-left py-3 px-4 font-semibold">Entrou no Banco</th>
                <th className="text-left py-3 px-4 font-semibold">Valor</th>
                <th className="text-left py-3 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-4">{formatDate(item.dataTransferencia)}</td>
                  <td className="py-3 px-4 font-medium">{getBancoLabel(item.saiuDoBanco)}</td>
                  <td className="py-3 px-4 font-medium">{getBancoLabel(item.entrouNoBanco)}</td>
                  <td className="py-3 px-4">{formatCurrency(item.valor)}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openEditDialog(item)}
                      className="h-8 w-8"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => openDeleteDialog(item)}
                      className="h-8 w-8 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      {/* Dialog de Adicionar */}
      <FormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Nova Transferência entre Bancos"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="dataTransferencia">Data da Transferência</Label>
            <Input
              id="dataTransferencia"
              type="date"
              value={formData.dataTransferencia}
              onChange={(e) => setFormData({ ...formData, dataTransferencia: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="saiuDoBanco">Saiu do Banco</Label>
              <Select value={formData.saiuDoBanco} onValueChange={(v) => setFormData({ ...formData, saiuDoBanco: v })}>
                <SelectTrigger id="saiuDoBanco">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bancoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="entrouNoBanco">Entrou no Banco</Label>
              <Select
                value={formData.entrouNoBanco}
                onValueChange={(v) => setFormData({ ...formData, entrouNoBanco: v })}
              >
                <SelectTrigger id="entrouNoBanco">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bancoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="valor">Valor</Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </div>
        </div>
      </FormDialog>

      {/* Dialog de Editar */}
      <FormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Editar Transferência entre Bancos"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="dataTransferencia-edit">Data da Transferência</Label>
            <Input
              id="dataTransferencia-edit"
              type="date"
              value={formData.dataTransferencia}
              onChange={(e) => setFormData({ ...formData, dataTransferencia: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="saiuDoBanco-edit">Saiu do Banco</Label>
              <Select value={formData.saiuDoBanco} onValueChange={(v) => setFormData({ ...formData, saiuDoBanco: v })}>
                <SelectTrigger id="saiuDoBanco-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bancoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="entrouNoBanco-edit">Entrou no Banco</Label>
              <Select
                value={formData.entrouNoBanco}
                onValueChange={(v) => setFormData({ ...formData, entrouNoBanco: v })}
              >
                <SelectTrigger id="entrouNoBanco-edit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bancoOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="valor-edit">Valor</Label>
            <Input
              id="valor-edit"
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) || 0 })}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Atualizar</Button>
          </div>
        </div>
      </FormDialog>

      {/* Dialog de Deletar */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Deletar Transferência"
        description={`Tem certeza que deseja deletar a transferência de ${getBancoLabel(editingItem?.saiuDoBanco || "")} para ${getBancoLabel(editingItem?.entrouNoBanco || "")}?`}
        onConfirm={handleDelete}
        variant="destructive"
      />
    </Card>
  )
}
