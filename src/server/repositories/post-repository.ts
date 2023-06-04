import { Prisma, Post } from "@prisma/client";
export interface PostRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
  find(id: string): Promise<Post | null>;
  findAll(page?: number, limit?: number): Promise<Post[]>;
}
