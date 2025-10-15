import { z } from "zod";
import { minRequired } from "@/schemas/utils";

export const schema = z.object({
  email: z.email(),
  password: z.string().min(1, minRequired(1))
})

export type LoginFormType = z.infer<typeof schema>;