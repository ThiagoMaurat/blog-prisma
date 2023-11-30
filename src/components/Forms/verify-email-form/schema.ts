import { z } from "zod";

export const verfifyEmailSchema = z.object({
  code: z.string().min(1, {
    message: "Código obrigatório",
  }),
  email: z.string().email().min(1, {
    message: "Email obrigatório",
  }),
});
