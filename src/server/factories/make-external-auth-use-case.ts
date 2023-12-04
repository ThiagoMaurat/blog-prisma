import { PrismaUsersRepository } from "../repositories/prisma/users-repository";
import { AuthenticateExternalProvider } from "../use-cases/Authenticate/AuthenticateExternalProvider";

export function makeExternalAuthUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const externalAuthUseCase = new AuthenticateExternalProvider(
    prismaUsersRepository
  );

  return externalAuthUseCase;
}
