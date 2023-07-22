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
    cpf: z
      .string()
      .min(11, { message: "Campo obrigatório" })
      .nonempty({ message: "Campo obrigatório" })
      .transform((val, ctx) => {
        const formattedVal = val
          .replaceAll(".", "")
          .replace("-", "")
          .replaceAll("_", "")
          .replaceAll(" ", "")
          .trim();

        if (formattedVal.length < 11) {
          ctx.addIssue({
            code: "custom",
            message: "Deve possuir 11 caracteres",
          });
        }

        return formattedVal;
      }),
    phone: z
      .string()
      .nonempty({ message: "Campo obrigatório" })
      .transform((val, ctx) => {
        const formattedVal = val
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll("-", "")
          .replaceAll("_", "")
          .replaceAll(" ", "")
          .trim();

        if (formattedVal.length < 11) {
          ctx.addIssue({
            code: "custom",
            message: "Deve ser no formato (DDD)99999-9999",
          });
        }

        return formattedVal;
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export type SignOnType = z.infer<typeof authSignUpSchema>;
