import { PrismaUsersRepository } from "../repositories/prisma/users-repository";
import { AuthenticateUseCase } from "../use-cases/Authenticate/Authenticate";

export function makeAuthenticateUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const registerUseCase = new AuthenticateUseCase(prismaUsersRepository);

  return registerUseCase;
}
