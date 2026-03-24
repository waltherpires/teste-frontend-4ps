// components/companies-table/columns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Company } from "@/src/schemas/company.schema";
import { patternFormatter } from "react-number-format";

function mapAccess(value: boolean) {
  if (value) return "Liberado"
  if (!value) return "Negado"
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Razão Social",
  },
  {
    accessorKey: "cnpj",
    header: "CNPJ",
  },
  {
    accessorKey: "role_name",
    header: "Função",
  },
  {
    accessorKey: "is_active",
    header: "Acesso",
    cell: ({ row }) => 
      mapAccess(row.original.is_active)
  },
  {
    accessorKey: "created_at",
    header: "Cadastrado em",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("pt-BR"),
  },
];
