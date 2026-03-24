// features/company/hooks/use-register-company.ts
"use client"

import { useState } from "react"
import { createCompany } from "../services/client/company.service"
import { CreateCompanySchema } from "@/src/schemas/company.schema"

export function useRegisterCompany() {
  const [loading, setLoading] = useState(false)

  async function registerCompany(
    values: CreateCompanySchema
  ) {
    setLoading(true)

    const result =
      await createCompany(values)

    setLoading(false)

    return result
  }

  return {
    registerCompany,
    loading,
  }
}