"use client"
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { createBankSchema, CreateBankSchema } from "@/src/schemas/banks.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export function RegisterBankForm() {
  const form = useForm<CreateBankSchema>({
    resolver: zodResolver(createBankSchema),
    defaultValues: {
      name: "",
      startBalance: "",
    },
  });

  async function onSubmit(data: CreateBankSchema) {
    console.log("Banco criado");
  }

  return (
    <form id="register-bank-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Nome</FieldLabel>

              <Input
                {...field}
                placeholder="Nome do Banco"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="startBalance"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Balanço Inicial</FieldLabel>

              <Input
                {...field}
                type="number"
                placeholder="R$ 0,00"
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

          <Button type="submit" form="register-company-form">
            Cadastrar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
