"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit2, Plus } from "lucide-react"

interface Project {
  id: string
  name: string
  consolidated: boolean
}

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Projeto A",
      consolidated: true,
    },
    {
      id: "2",
      name: "Projeto B",
      consolidated: false,
    },
  ])
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [consolidated, setConsolidated] = useState(false)

  const handleAdd = () => {
    if (!name.trim()) {
      alert("Nome do projeto é obrigatório")
      return
    }

    if (editingId) {
      setProjects(
        projects.map((item) =>
          item.id === editingId
            ? { ...item, name, consolidated }
            : item
        ),
      )
      setEditingId(null)
    } else {
      const newProject: Project = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        consolidated,
      }
      setProjects([...projects, newProject])
    }

    setName("")
    setConsolidated(false)
    setOpen(false)
  }

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setName(project.name)
    setConsolidated(project.consolidated)
    setOpen(true)
  }

  const handleDelete = (id: string) => {
    setProjects(projects.filter((item) => item.id !== id))
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setEditingId(null)
      setName("")
      setConsolidated(false)
    }
    setOpen(newOpen)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projetos</CardTitle>
            <CardDescription>Gerencie seus projetos</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo Projeto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingId ? "Editar Projeto" : "Novo Projeto"}</DialogTitle>
                <DialogDescription>
                  {editingId ? "Atualize o projeto abaixo" : "Adicione um novo projeto"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Projeto *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Projeto de Implementação"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="consolidated"
                    checked={consolidated}
                    onCheckedChange={(checked) => setConsolidated(checked as boolean)}
                  />
                  <Label htmlFor="consolidated" className="cursor-pointer">
                    Consolidado
                  </Label>
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
                <TableHead>Consolidado</TableHead>
                <TableHead className="w-32 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>{project.consolidated ? "Sim" : "Não"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(project)}
                        className="gap-2"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        className="gap-2 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-6">
                    Nenhum projeto cadastrado
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
