import { ActionState } from "@/lib/create-safe-action";
import { AuthenticateUserCaseResponse } from "@/server/use-cases/Authenticate/Authenticate";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignInTypeOutput = ActionState<
  SignInSchemaType,
  AuthenticateUserCaseResponse
>;
