import { PrismaPostRepository } from "../repositories/prisma/post-repository";
import { PrismaUsersRepository } from "../repositories/prisma/users-repository";
import { PostUseCase } from "../use-cases/Posts/post";

export function makePostUseCase() {
  const prismaPostRepository = new PrismaPostRepository();
  const prismaUsersRepository = new PrismaUsersRepository();
  const makePostUseCase = new PostUseCase(
    prismaPostRepository,
    prismaUsersRepository
  );

  return makePostUseCase;
}
