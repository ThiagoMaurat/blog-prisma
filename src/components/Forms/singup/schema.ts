import { z } from "zod";
import { schema } from "../singin/schema";

export const authSignUpSchema = z
  .object({
    name: z
      .string()
      .min(6, { message: "Deve possuir pelo menos 6 caracteres" })
      .max(80, { message: "Deve possuir no máximo 81 caracteres" }),
    email: schema.shape.login,
    password: schema.shape.password,
    confirmPassword: schema.shape.password,
    birthdate: z.date({ required_error: "Campo obrigatório" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type SignOnType = z.infer<typeof authSignUpSchema>;
