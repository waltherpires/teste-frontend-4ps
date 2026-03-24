import z from "zod";

export const banksSchema = z.object({
  id: z.string(),
  name: z.string(),
  startBalance: z.number(),
  currentBalance: z.number(),
  createdAt: z.string(),
});

export type Bank = z.infer<typeof banksSchema>;

export const createBankSchema = z.object({
  name: z.string().min(3, "Nome obrigatório"),
  startBalance: z.string().refine((doc) => {
    const replacedDoc = doc.replace(/\D/g, "");
    return !!Number(replacedDoc);
  }, "Balanço inicial deve conter apenas números."),
});

export type CreateBankSchema = z.infer<typeof createBankSchema>;
