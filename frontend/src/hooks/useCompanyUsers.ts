"use client";

import { useEffect, useState } from "react";
import { CompanyUser } from "../schemas/company-user.schema";
import { getCompanyUsers } from "../services/client/company.service";

export function useCompanyUsers(companyId?: string) {
  const [data, setData] = useState<CompanyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    if (!companyId) return;

    async function load() {
      try {
        setLoading(true);

        const data = await getCompanyUsers(companyId!);


        setData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.message === "FORBIDDEN") {
            setForbidden(true);
        }
        setError("Erro ao buscar usuários");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [companyId]);

  return { data, loading, error, forbidden };
}
