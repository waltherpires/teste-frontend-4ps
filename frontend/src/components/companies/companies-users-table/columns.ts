import { CompanyUser } from "@/src/schemas/company-user.schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CompanyUser>[] = [
  { accessorKey: "name", header: "Nome" },
  { accessorKey: "role_name", header: "Função" },
  { accessorKey: "created_at", header: "Entrou em" },
];
