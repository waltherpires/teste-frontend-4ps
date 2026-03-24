// CompaniesTable.tsx
"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { columns } from "./columns";
import { useCompanies } from "@/src/hooks/useCompanies";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Spinner } from "../../ui/spinner";
import { useParams, useRouter } from "next/navigation";

export function CompaniesTable() {
  const params = useParams();
  const selectedCompanyId = params.companyId as string;
  const { data, loading } = useCompanies();
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-40">
        <Spinner className="w-8 h-8" />
      </div>
    );

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => {
            const isSelected =
              String(row.original.company_id) === String(selectedCompanyId);

            return (
              <TableRow
                onClick={() =>
                  router.push(`/protected/${row.original.company_id}`)
                }
                key={row.id}
                className={
                  isSelected ? "bg-blue-500/20 hover:bg-blue-700/20" : "cursor-pointer"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              Nenhuma empresa encontrada.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
