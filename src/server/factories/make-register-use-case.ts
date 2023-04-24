import { PrismaUsersRepository } from "../repositories/prisma/users-repository";
import { RegisterUseCase } from "../use-cases/Users/RegistryUser";

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(prismaUsersRepository);

  return registerUseCase;
}
