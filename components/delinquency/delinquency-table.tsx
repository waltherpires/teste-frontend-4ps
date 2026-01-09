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
import { Plus, Pencil, Trash2, MoreHorizontal, Phone, Mail, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface Client {
  id: number
  name: string
  document: string
  totalDue: number
  daysOverdue: number
  status: "critical" | "warning" | "attention" | "normal"
}

const initialClients: Client[] = [
  {
    id: 1,
    name: "Tech Solutions Ltda",
    document: "12.345.678/0001-90",
    totalDue: 45000,
    daysOverdue: 45,
    status: "critical",
  },
  {
    id: 2,
    name: "Comercial ABC S.A.",
    document: "23.456.789/0001-01",
    totalDue: 38000,
    daysOverdue: 38,
    status: "critical",
  },
  {
    id: 3,
    name: "Indústria XYZ Ltda",
    document: "34.567.890/0001-12",
    totalDue: 32000,
    daysOverdue: 30,
    status: "warning",
  },
  {
    id: 4,
    name: "Serviços Beta ME",
    document: "45.678.901/0001-23",
    totalDue: 28000,
    daysOverdue: 28,
    status: "warning",
  },
  {
    id: 5,
    name: "Construtora Delta",
    document: "56.789.012/0001-34",
    totalDue: 25000,
    daysOverdue: 22,
    status: "warning",
  },
  {
    id: 6,
    name: "Distribuidora Omega",
    document: "67.890.123/0001-45",
    totalDue: 22000,
    daysOverdue: 18,
    status: "attention",
  },
  {
    id: 7,
    name: "Consultoria Gama",
    document: "78.901.234/0001-56",
    totalDue: 18000,
    daysOverdue: 15,
    status: "attention",
  },
  {
    id: 8,
    name: "Loja Central",
    document: "89.012.345/0001-67",
    totalDue: 15000,
    daysOverdue: 12,
    status: "attention",
  },
]

export function DelinquencyTable() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    totalDue: 0,
    daysOverdue: 0,
    status: "attention" as Client["status"],
  })

  const resetForm = () => setFormData({ name: "", document: "", totalDue: 0, daysOverdue: 0, status: "attention" })

  const handleAdd = () => {
    const newClient: Client = {
      id: Date.now(),
      name: formData.name,
      document: formData.document,
      totalDue: formData.totalDue,
      daysOverdue: formData.daysOverdue,
      status: formData.status,
    }
    setClients([...clients, newClient])
    setIsAddOpen(false)
    resetForm()
  }

  const handleEdit = () => {
    if (!editingItem) return
    setClients(
      clients.map((c) =>
        c.id === editingItem.id
          ? {
              ...c,
              name: formData.name,
              document: formData.document,
              totalDue: formData.totalDue,
              daysOverdue: formData.daysOverdue,
              status: formData.status,
            }
          : c,
      ),
    )
    setIsEditOpen(false)
    setEditingItem(null)
    resetForm()
  }

  const handleDelete = () => {
    if (!editingItem) return
    setClients(clients.filter((c) => c.id !== editingItem.id))
    setIsDeleteOpen(false)
    setEditingItem(null)
  }

  const openEdit = (client: Client) => {
    setEditingItem(client)
    setFormData({
      name: client.name,
      document: client.document,
      totalDue: client.totalDue,
      daysOverdue: client.daysOverdue,
      status: client.status,
    })
    setIsEditOpen(true)
  }

  const openDelete = (client: Client) => {
    setEditingItem(client)
    setIsDeleteOpen(true)
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "critical":
        return { label: "Crítico", className: "bg-destructive/20 text-destructive border-destructive/30" }
      case "warning":
        return { label: "Atenção", className: "bg-warning/20 text-warning border-warning/30" }
      case "attention":
        return { label: "Monitorar", className: "bg-chart-5/20 text-chart-5 border-chart-5/30" }
      default:
        return { label: "Normal", className: "bg-success/20 text-success border-success/30" }
    }
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Clientes Inadimplentes</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
              {clients.filter((c) => c.status === "critical").length} críticos
            </Badge>
            <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">
              {clients.filter((c) => c.status === "warning").length} atenção
            </Badge>
            <Button onClick={() => setIsAddOpen(true)} size="sm" className="gap-1 ml-2">
              <Plus className="h-4 w-4" />
              Adicionar Cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">CNPJ</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Valor em Atraso</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Dias em Atraso</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const statusConfig = getStatusConfig(client.status)
                return (
                  <tr
                    key={client.id}
                    className={cn(
                      "border-b border-border hover:bg-secondary/30 transition-colors group",
                      client.status === "critical" && "bg-destructive/5",
                    )}
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-foreground">{client.name}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground font-mono">{client.document}</td>
                    <td className="py-3 px-4 text-sm text-right tabular-nums font-semibold text-destructive">
                      {formatCurrency(client.totalDue)}
                    </td>
                    <td
                      className={cn(
                        "py-3 px-4 text-sm text-right tabular-nums font-medium",
                        client.daysOverdue > 30 ? "text-destructive" : "text-warning",
                      )}
                    >
                      {client.daysOverdue} dias
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
                          onClick={() => openEdit(client)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => openDelete(client)}
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
                              <Phone className="mr-2 h-4 w-4" />
                              Registrar Contato
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Enviar Cobrança
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Ver Histórico
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
        title="Adicionar Cliente Inadimplente"
        description="Registre um novo cliente com dívidas em atraso."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome do Cliente</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Empresa XYZ Ltda"
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
              <Label>Valor em Atraso (R$)</Label>
              <Input
                type="number"
                value={formData.totalDue}
                onChange={(e) => setFormData({ ...formData, totalDue: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Dias em Atraso</Label>
              <Input
                type="number"
                value={formData.daysOverdue}
                onChange={(e) => setFormData({ ...formData, daysOverdue: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v as Client["status"] })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attention">Monitorar</SelectItem>
                <SelectItem value="warning">Atenção</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
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
        title="Editar Cliente"
        description="Modifique os dados do cliente."
      >
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Nome do Cliente</Label>
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
              <Label>Valor em Atraso (R$)</Label>
              <Input
                type="number"
                value={formData.totalDue}
                onChange={(e) => setFormData({ ...formData, totalDue: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
            <div className="grid gap-2">
              <Label>Dias em Atraso</Label>
              <Input
                type="number"
                value={formData.daysOverdue}
                onChange={(e) => setFormData({ ...formData, daysOverdue: Number(e.target.value) })}
                className="bg-input border-border"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(v) => setFormData({ ...formData, status: v as Client["status"] })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attention">Monitorar</SelectItem>
                <SelectItem value="warning">Atenção</SelectItem>
                <SelectItem value="critical">Crítico</SelectItem>
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
        title="Excluir Cliente"
        description={`Tem certeza que deseja excluir "${editingItem?.name}"?`}
        onConfirm={handleDelete}
        confirmText="Excluir"
        variant="destructive"
      />
    </>
  )
}
