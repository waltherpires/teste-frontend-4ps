import { Company, CreateCompanySchema } from "@/src/schemas/company.schema";
import { GetCompaniesResponse } from "../company.service";
import { CompanyUser } from "@/src/schemas/company-user.schema";

export async function getCompanyUsers(
  companyId: string,
): Promise<CompanyUser[]> {
  if (!companyId) throw new Error("id de company necessario");

  const response = await fetch(`/api/companies/${companyId}/users`);

  if (response.status === 401) {
    throw new Error("UNAUTHORIZED");
  }

  if (response.status === 403) {
    throw new Error("FORBIDDEN");
  }

  if (!response.ok) {
    throw new Error("GENERIC_ERROR");
  }

  return response.json();
}

export async function getCompanies(): Promise<Company[]> {
  const response = await fetch("/api/companies");

  if (!response.ok) {
    throw new Error("Erro ao buscar empresas");
  }

  const data: GetCompaniesResponse = await response.json();

  return data.companies;
}

export async function createCompany(data: CreateCompanySchema) {
  try {
    const response = await fetch("/api/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: "Empresa criada",
    };
  } catch {
    return {
      success: false,
      message: "Erro de conexão com servidor",
    };
  }
}
