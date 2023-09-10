import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "Título obrigatório" }).nonempty(),
  content: z.string().min(10, { message: "Conteúdo obrigatório" }).nonempty(),
  thumbnail: z
    .string()
    .url({ message: "Thumbnail inválida" })
    .min(1, { message: "Thumbnail obrigatória" })
    .nonempty({ message: "Thumbnail obrigatória" }),
  themeId: z.string().min(1, { message: "Tema obrigatório" }).nonempty(),
  description: z
    .string()
    .min(10, { message: "Descrição obrigatória" })
    .nonempty(),
});
