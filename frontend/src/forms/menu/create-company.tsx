"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { PatternFormat } from "react-number-format";

import {
  createCompanySchema,
  CreateCompanySchema,
} from "@/src/schemas/company.schema";

import { useRegisterCompany } from "@/src/hooks/useRegisterCompany";

import { Button } from "@/src/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";

import { Input } from "@/src/components/ui/input";
import { useRouter } from "next/navigation";

export function RegisterCompanyForm() {
  const router = useRouter();
  const { registerCompany, loading } = useRegisterCompany();

  const form = useForm<CreateCompanySchema>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      company_name: "",
      cnpj: "",
    },
  });

  async function onSubmit(data: CreateCompanySchema) {
    const result = await registerCompany(data);

    if (result.success) {
      form.reset();
      toast.success("Empresa cadastrada com sucesso");
      router.push(`/protected`);
    } else {
      toast.error(result.message);

      form.setError("company_name", {
        message: result.message || "Erro ao cadastrar empresa",
      });
    }
  }

  return (
    <form id="register-company-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Razão Social */}
        <Controller
          name="company_name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Razão Social</FieldLabel>

              <Input
                {...field}
                placeholder="Empresa LTDA"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CNPJ */}
        <Controller
          name="cnpj"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>CNPJ</FieldLabel>
              <PatternFormat
                {...field}
                customInput={Input}
                format="##.###.###/####-##"
                placeholder="00.000.000/0000-00"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>

          <Button type="submit" form="register-company-form" disabled={loading}>
            {loading ? "Salvando..." : "Cadastrar"}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
