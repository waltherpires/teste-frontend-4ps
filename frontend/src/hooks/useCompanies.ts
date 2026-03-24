// hooks/useCompanies.ts
"use client";

import { useEffect, useState } from "react";
import { Company, CreateCompanySchema } from "@/src/schemas/company.schema";
import { getCompanies } from "@/src/services/client/company.service";

export function useCompanies() {
  const [data, setData] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const companies = await getCompanies();
      setData(companies);
      setLoading(false);
    }

    load();
  }, []);

  return { data, loading };
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
