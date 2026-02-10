"use client"

import { useState } from "react"
import { useCadastros } from "@/lib/cadastros-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit2, Plus } from "lucide-react"

export function PaymentMethodsTab() {
  const { paymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod } = useCadastros()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")

  const handleAdd = () => {
    if (!name.trim()) return

    if (editingId) {
      updatePaymentMethod(editingId, name)
      setEditingId(null)
    } else {
      addPaymentMethod(name)
    }

    setName("")
    setOpen(false)
  }

  const handleEdit = (item: { id: string; name: string }) => {
    setEditingId(item.id)
    setName(item.name)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    const isDefault = paymentMethods.find(m => m.id === id)?.isDefault || false
    if (isDefault) {
      alert("Formas de pagamento padrão não podem ser removidas")
      return
    }
    deletePaymentMethod(id)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setEditingId(null)
      setName("")
    }
    setOpen(newOpen)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Formas de Pagamento</CardTitle>
            <CardDescription>Gerencie as formas de pagamento disponíveis</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Forma
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Editar Forma de Pagamento" : "Nova Forma de Pagamento"}</DialogTitle>
                <DialogDescription>
                  {editingId ? "Atualize a forma de pagamento abaixo" : "Adicione uma nova forma de pagamento"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Cheque"
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
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="w-32 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMethods.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="gap-2"
                    >
                      <Edit2 className="h-4 w-4" />
                      Editar
                    </Button>
                  <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="gap-2 text-destructive hover:text-destructive"
                      disabled={item.isDefault}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
