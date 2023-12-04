import { ActionState } from "@/lib/create-safe-action";
import { ThemeListUseCaseOutput } from "@/server/use-cases/Themes/listTheme";
import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
});

export type ListThemeSchemaType = z.infer<typeof paginationSchema>;
export type ListThemeTypeOutput = ActionState<
  ListThemeSchemaType,
  ThemeListUseCaseOutput
>;
