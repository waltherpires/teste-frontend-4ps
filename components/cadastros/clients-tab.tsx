"use client"

import { useState } from "react"
import { useCadastros } from "@/lib/cadastros-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit2, Plus, Search } from "lucide-react"
import type { Client } from "@/lib/cadastros-context"

export function ClientsTab() {
  const { clients, addClient, updateClient, deleteClient } = useCadastros()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState<Partial<Client>>({
    type: "pf",
  })

  const handleInputChange = (field: keyof Client, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelectChange = (field: keyof Client, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleAdd = () => {
    if (!formData.name?.trim() || !formData.type) {
      alert("Nome do cliente e tipo são obrigatórios")
      return
    }

    if (editingId) {
      updateClient(editingId, formData as Omit<Client, 'id'>)
      setEditingId(null)
    } else {
      addClient(formData as Omit<Client, 'id'>)
    }

    setFormData({ type: "pf" })
    setOpen(false)
  }

  const handleEdit = (client: Client) => {
    setEditingId(client.id)
    setFormData(client)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteClient(id)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setEditingId(null)
      setFormData({ type: "pf" })
    }
    setOpen(newOpen)
  }

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone?.includes(searchTerm),
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Meus Clientes</CardTitle>
            <CardDescription>Gerencie seus clientes e informações de contato</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
                <DialogDescription>
                  {editingId ? "Atualize as informações do cliente" : "Adicione um novo cliente"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Cliente *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: Empresa XYZ"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo *</Label>
                  <Select value={formData.type || "pf"} onValueChange={(value) => handleSelectChange("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pf">Pessoa Física</SelectItem>
                      <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cpfCnpj">{formData.type === "pj" ? "CNPJ" : "CPF"}</Label>
                  <Input
                    id="cpfCnpj"
                    value={formData.cpfCnpj || ""}
                    onChange={(e) => handleInputChange("cpfCnpj", e.target.value)}
                    placeholder={formData.type === "pj" ? "12.345.678/0001-90" : "123.456.789-10"}
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ""}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(11) 98765-4321"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Rua A, 123"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={formData.city || ""}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="São Paulo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">UF</Label>
                    <Input
                      id="state"
                      value={formData.state || ""}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="SP"
                      maxLength={2}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactName">Nome do Contato</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName || ""}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="João Silva"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => handleOpenChange(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleAdd}>{editingId ? "Atualizar" : "Adicionar"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="gap-2"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>CPF/CNPJ</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="w-32 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.type === "pj" ? "Pessoa Jurídica" : "Pessoa Física"}</TableCell>
                    <TableCell>{client.cpfCnpj || "-"}</TableCell>
                    <TableCell>{client.email || "-"}</TableCell>
                    <TableCell>{client.phone || "-"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(client)}
                        className="gap-2"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(client.id)}
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
