"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { makeRegisterUseCase } from "@/server/factories/make-register-use-case";
import { authSignUpSchema } from "@/components/Forms/singup/schema";
import { SignUpSchemaType, SignUpTypeOutput } from "./schema";

const handler = async (data: SignUpSchemaType): Promise<SignUpTypeOutput> => {
  const registerUseCase = makeRegisterUseCase();

  const user = await registerUseCase.execute({
    data: data,
  });

  return {
    data: user,
  };
};

export const signUpAction = createSafeAction(authSignUpSchema, handler);
