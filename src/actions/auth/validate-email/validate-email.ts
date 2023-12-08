"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import {
  ValidateCodeEmailSchemaType,
  ValidateCodeEmailTypeOutput,
  validateCodeEmailSchema,
} from "./schema";
import { makeValidateEmailCode } from "@/server/factories/make-validate-email-code-use-case";

const handler = async (
  data: ValidateCodeEmailSchemaType
): Promise<ValidateCodeEmailTypeOutput> => {
  const validateEmailCode = makeValidateEmailCode();

  const code = await validateEmailCode.execute({
    code: data.code,
    email: data.email,
  });

  return {
    data: code,
  };
};

export const validateEmailCodeAction = createSafeAction(
  validateCodeEmailSchema,
  handler
);
