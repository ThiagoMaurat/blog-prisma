import { Prisma, Post, Themes } from "@prisma/client";

export interface PostRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
  find(id: string): Promise<any>;
  findAll(
    page?: number | null,
    limit?: number | null,
    search?: string | null
  ): Promise<any>;
}
