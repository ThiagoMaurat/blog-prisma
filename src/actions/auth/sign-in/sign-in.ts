"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { makeAuthenticateUseCase } from "@/server/factories/make-authenticate-use-case";
import { signInSchema, SignInSchemaType, SignInTypeOutput } from "./schema.";

const handler = async (data: SignInSchemaType): Promise<SignInTypeOutput> => {
  const authenticateUseCase = makeAuthenticateUseCase();

  const user = await authenticateUseCase.execute(data);

  return {
    data: user,
  };
};

export const signInAction = createSafeAction(signInSchema, handler);
