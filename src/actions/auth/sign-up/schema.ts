import { authSignUpSchema } from "@/components/Forms/singup/schema";
import { ActionState } from "@/lib/create-safe-action";
import { AuthenticateUserCaseResponse } from "@/server/use-cases/Authenticate/Authenticate";
import { z } from "zod";

export type SignUpSchemaType = z.infer<typeof authSignUpSchema>;
export type SignUpTypeOutput = ActionState<
  SignUpSchemaType,
  AuthenticateUserCaseResponse
>;
