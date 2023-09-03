import { z } from "zod";

export const schema = z.object({
  name: z.string().min(6, { message: "Deve possuir pelo menos 6 caracteres" }),
});
