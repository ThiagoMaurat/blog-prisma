import { PrismaPostRepository } from "../repositories/prisma/post-repository";
import { ListPostByIdUseCase } from "../use-cases/Posts/listPostById";

export function makeListPostByIdUseCase() {
  const prismaUsersRepository = new PrismaPostRepository();
  const listPostById = new ListPostByIdUseCase(prismaUsersRepository);

  return listPostById;
}
