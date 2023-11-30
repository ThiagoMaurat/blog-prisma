import { ActionState } from "@/lib/create-safe-action";
import { ValidateCodeOutput } from "@/server/use-cases/Authenticate/ValidateCodeEmail";
import { z } from "zod";

export const validateCodeEmailSchema = z.object({
  code: z.string(),
  email: z.string().email(),
});

export type ValidateCodeEmailSchemaType = z.infer<
  typeof validateCodeEmailSchema
>;
export type ValidateCodeEmailTypeOutput = ActionState<
  ValidateCodeEmailSchemaType,
  ValidateCodeOutput
>;
