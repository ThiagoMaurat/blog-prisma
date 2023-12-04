import { PrismaUsersRepository } from "../repositories/prisma/users-repository";
import { SendEmailUseCase } from "../use-cases/SendEmail/SendEmail";
import { RegisterUseCase } from "../use-cases/Users/RegistryUser";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const emailUseCase = new SendEmailUseCase();
  const registerUseCase = new RegisterUseCase(
    prismaUsersRepository,
    emailUseCase
  );

  return registerUseCase;
}
