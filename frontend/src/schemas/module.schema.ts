import z from "zod";

export const moduleSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    is_active: z.boolean(),
})

export type Module = z.infer<typeof moduleSchema>;