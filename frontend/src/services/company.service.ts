import { Company } from "../schemas/company.schema";
import { backendFetch } from "../lib/backend/client";
import { Module } from "../schemas/module.schema";

export type GetCompaniesResponse = {
  companies: Company[];
};

export async function getCompaniesServer(): Promise<Company[]> {
  try {
    const response = await backendFetch("/api/v1/companies/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar empresas");
      return [];
    }

    const data = await response.json();

    return data.companies;
  } catch (error) {
    console.error("Erro ao buscar empresas: ", error);
    throw error;
  }
}

type getModulesServerProps = {
  companyId: string;
};

export async function getModulesServer({
  companyId,
}: getModulesServerProps): Promise<Module[]> {  
  try {
    const response = await backendFetch(
      `/api/v1/companies/${companyId}/modules`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar modulos");
    }

    const data = await response.json();

    return data.modules;
  } catch (error) {
    console.error("Erro ao buscar modulos: ", error);
    throw error;
  }
}
