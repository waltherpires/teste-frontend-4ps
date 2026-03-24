// mocks/company.mock.ts
import { Company } from "@/src/schemas/company.schema";

export const companiesMock: Company[] = [
  {
    company_id: "1",
    name: "Teste SA",
    cnpj: "12.345.678/0001-90",
    role_name: "Gerente",
    is_active: true,
    created_at: "2026-02-01",
  },
  {
    company_id: "2",
    name: "Teste LTDA",
    cnpj: "98.765.432/0001-10",
    role_name: "Gerente",
    is_active: true,
    created_at: "2026-02-12",
  },
];
