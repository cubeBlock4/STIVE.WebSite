import { z } from "zod";

export const schema = z.object({
  id: z.number(),
  firstName: z.string().min(1).max(255).optional(),
  lastName: z.string().min(1).max(255).optional(),
  email: z.email().min(1).max(255).optional(),
})

export type CustomerFormType = z.infer<typeof schema>;