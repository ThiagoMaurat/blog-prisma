import { PrismaPostRepository } from "../repositories/prisma/post-repository";
import { ListAllPostsUseCase } from "../use-cases/Posts/listAllPosts";

export function makeListAllPostUseCase() {
  const prismaUsersRepository = new PrismaPostRepository();
  const listAllPosts = new ListAllPostsUseCase(prismaUsersRepository);

  return listAllPosts;
}
