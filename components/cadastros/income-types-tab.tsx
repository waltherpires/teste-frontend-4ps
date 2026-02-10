"use client";

import { useState } from "react";
import {
  useCadastros,
  type IncomeSubcategory,
  type IncomeType,
} from "@/lib/cadastros-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, Edit2, Plus, ChevronDown, ChevronRight } from "lucide-react";

export function IncomeTypesTab() {
  const {
    incomeTypes,
    addIncomeType,
    updateIncomeType,
    deleteIncomeType,
    addIncomeSubcategory,
    updateIncomeSubcategory,
    deleteIncomeSubcategory,
  } = useCadastros();

  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingTypeId, setEditingTypeId] = useState<string | null>(null);
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<
    string | null
  >(null);

  const [typeName, setTypeName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [mode, setMode] = useState<"type" | "subcategory">("type");
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);

  /* =========================
     Handlers – Categoria
     ========================= */

  const handleAddType = () => {
    if (!typeName.trim()) return;

    if (editingTypeId) {
      updateIncomeType(editingTypeId, typeName);
      setEditingTypeId(null);
    } else {
      const newType: IncomeType = {
        id: crypto.randomUUID(),
        name: typeName,
        isDefault: false,
        subcategories: [],
      };
      addIncomeType(newType);
    }

    resetDialog();
  };

  const handleEditType = (item: IncomeType) => {
    setEditingTypeId(item.id);
    setTypeName(item.name);
    setMode("type");
    setOpen(true);
  };

  const handleDeleteType = (id: string) => {
    const item = incomeTypes.find((i) => i.id === id);
    if (item?.isDefault) {
      alert("Tipos padrão não podem ser removidos");
      return;
    }
    deleteIncomeType(id);
  };

  /* =========================
     Handlers – Subcategoria
     ========================= */

  const handleAddSubcategory = () => {
    if (!subcategoryName.trim() || !selectedTypeId) return;

    if (editingSubcategoryId) {
      updateIncomeSubcategory(
        selectedTypeId,
        editingSubcategoryId,
        subcategoryName,
      );
      setEditingSubcategoryId(null);
    } else {
      const newSubcategory: IncomeSubcategory = {
        id: crypto.randomUUID(),
        name: subcategoryName,
      };
      addIncomeSubcategory(selectedTypeId, newSubcategory);
    }

    resetDialog();
  };

  const handleEditSubcategory = (
    typeId: string,
    sub: IncomeSubcategory,
  ) => {
    setSelectedTypeId(typeId);
    setEditingSubcategoryId(sub.id);
    setSubcategoryName(sub.name);
    setMode("subcategory");
    setOpen(true);
  };

  const handleAddSubcategoryMode = (typeId: string) => {
    setSelectedTypeId(typeId);
    setEditingSubcategoryId(null);
    setSubcategoryName("");
    setMode("subcategory");
    setOpen(true);
  };

  const handleDeleteSubcategory = (typeId: string, subId: string) => {
    deleteIncomeSubcategory(typeId, subId);
  };

  /* =========================
     Utils
     ========================= */

  const resetDialog = () => {
    setOpen(false);
    setEditingTypeId(null);
    setEditingSubcategoryId(null);
    setTypeName("");
    setSubcategoryName("");
    setSelectedTypeId(null);
    setMode("type");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) resetDialog();
    else setOpen(true);
  };

  /* =========================
     Render
     ========================= */

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tipos de Receita</CardTitle>
            <CardDescription>
              Gerencie categorias e subcategorias de receita. Elas serão usadas
              como referência nos lançamentos.
            </CardDescription>
          </div>

          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Novo
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {mode === "type"
                    ? editingTypeId
                      ? "Editar Categoria"
                      : "Nova Categoria de Receita"
                    : editingSubcategoryId
                      ? "Editar Subcategoria"
                      : "Nova Subcategoria"}
                </DialogTitle>
                <DialogDescription>
                  {mode === "type"
                    ? "Defina o nome da categoria"
                    : "Defina o nome da subcategoria"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {mode === "type" ? (
                  <>
                    <div>
                      <Label htmlFor="type-name">Nome da Categoria</Label>
                      <Input
                        id="type-name"
                        value={typeName}
                        onChange={(e) => setTypeName(e.target.value)}
                        placeholder="Ex: Receita com Produtos"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={resetDialog}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddType}>
                        {editingTypeId ? "Atualizar" : "Adicionar"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="subcategory-name">
                        Nome da Subcategoria
                      </Label>
                      <Input
                        id="subcategory-name"
                        value={subcategoryName}
                        onChange={(e) => setSubcategoryName(e.target.value)}
                        placeholder="Ex: Ventilador"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={resetDialog}>
                        Cancelar
                      </Button>
                      <Button onClick={handleAddSubcategory}>
                        {editingSubcategoryId ? "Atualizar" : "Adicionar"}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {incomeTypes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma categoria cadastrada
          </div>
        ) : (
          <div className="space-y-2">
            {incomeTypes.map((type) => (
              <div key={type.id} className="border rounded-lg">
                <div className="flex items-center justify-between p-4 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === type.id ? null : type.id,
                        )
                      }
                    >
                      {expandedId === type.id ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    <span className="font-semibold">{type.name}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditType(type)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>

                    {!type.isDefault && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleDeleteType(type.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddSubcategoryMode(type.id)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Subcategoria
                    </Button>
                  </div>
                </div>

                {expandedId === type.id && (
                  <div className="border-t">
                    {type.subcategories.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500 text-center">
                        Nenhuma subcategoria cadastrada
                      </div>
                    ) : (
                      type.subcategories.map((sub) => (
                        <div
                          key={sub.id}
                          className="flex justify-between items-center p-4 border-b last:border-b-0"
                        >
                          <span>{sub.name}</span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                handleEditSubcategory(type.id, sub)
                              }
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-red-600"
                              onClick={() =>
                                handleDeleteSubcategory(type.id, sub.id)
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
