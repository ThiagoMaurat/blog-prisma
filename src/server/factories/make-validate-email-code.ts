import { PrismaUsersRepository } from "../repositories/prisma/users-repository";
import { ValidateCodeEmail } from "../use-cases/Authenticate/ValidateCodeEmail";

export function makeValidateEmailCode() {
  const prismaPostRepository = new PrismaUsersRepository();
  const validateCodeEmail = new ValidateCodeEmail(prismaPostRepository);

  return validateCodeEmail;
}
