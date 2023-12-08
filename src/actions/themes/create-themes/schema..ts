import { ActionState } from "@/lib/create-safe-action";
import { ThemeCreateUseCaseOutput } from "@/server/use-cases/Themes/createTheme";
import { z } from "zod";

export const createThemeSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.string().min(1, { message: "Role is required" }),
});

export type CreateThemeSchemaType = z.infer<typeof createThemeSchema>;
export type CreateThemeTypeOutput = ActionState<
  CreateThemeSchemaType,
  ThemeCreateUseCaseOutput
>;
