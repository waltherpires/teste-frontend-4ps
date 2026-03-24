import { Button } from "@/src/components/ui/button";
import { Bank } from "@/src/schemas/banks.schema";
import { formatMetricValue } from "@/src/util/format-currency";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, Pencil } from "lucide-react";


// todo: alterar ações dos botoes de actions
export const columns: ColumnDef<Bank>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "startBalance",
    header: "Balanço Inicial",
    cell: ({ row }) => formatMetricValue(row.original.startBalance, "currency"),
  },
  {
    accessorKey: "currentBalance",
    header: "Balanço Atual",
    cell: ({ row }) =>
      formatMetricValue(row.original.currentBalance, "currency"),
  },
  {
    accessorKey: "createdAt",
    header: "Cadastrado em",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("pt-BR"),
  },
  {
    id: "actions",
    header: () => (
      <div style={{ textAlign: "right", marginRight: "16px" }}>Ações</div>
    ),
    cell: ({ row }) => {
      const bank = row.original;

      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            className="cursor-pointer hover:bg-primary hover:**:text-white transition duration-300"
            onClick={() => console.log("Editar", bank.id)}
          >
            <Pencil />
          </Button>

          <Button
            variant="ghost"
            className="cursor-pointer *:text-red-600 hover:bg-red-600 hover:**:text-white transition duration-300"
            onClick={() => console.log("Excluir", bank.id)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
