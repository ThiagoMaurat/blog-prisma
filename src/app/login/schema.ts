import * as z from "zod";

export const schema = z.object({
  login: z
    .string()
    .email({ message: "Preencha o campo" })
    .min(1, { message: "Preencha o campo" }),
  password: z
    .string()
    .min(6, { message: "Deve possuir no mínimo 6 caracteres" })
    .nonempty({ message: "Preencha o campo" }),
});
