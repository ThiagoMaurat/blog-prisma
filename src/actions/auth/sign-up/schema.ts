import { authSignUpSchema } from "@/components/Forms/singup/schema";
import { ActionState } from "@/lib/create-safe-action";
import { RegisterUseCaseOutput } from "@/server/use-cases/Users/RegistryUser";
import { z } from "zod";

export type SignUpSchemaType = z.infer<typeof authSignUpSchema>;
export type SignUpTypeOutput = ActionState<
  SignUpSchemaType,
  RegisterUseCaseOutput
>;
