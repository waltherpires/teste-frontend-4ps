import { z } from "zod";

export const companyUserSchema = z.object({
    user_id: z.string(),
    name: z.string(),
    role_name: z.string(),
    created_at: z.string(),
});

export type CompanyUser = z.infer<typeof companyUserSchema>