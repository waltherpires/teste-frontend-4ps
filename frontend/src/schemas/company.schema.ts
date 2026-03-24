import { z } from "zod";

export const companySchema = z.object({
  company_id: z.string(),
  name: z.string(),
  cnpj: z.string(),
  role_name: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
});

export type Company = z.infer<typeof companySchema>;

export const createCompanySchema = z.object({
  company_name: z.string().min(3, "Nome obrigatório"),
   cnpj: z
    .string().min(0, 'CNPJ é obrigatório.',)
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 14;
    }, 'CNPJ deve conter no mínimo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CNPJ deve conter no máximo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CNPJ deve conter apenas números.'),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
