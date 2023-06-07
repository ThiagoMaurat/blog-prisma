import { Prisma, Post } from "@prisma/client";

interface PostDTO {
  title: string;
  content: string;
  id: string;
  author: {
    image: string | null;
    name: string | null;
  };
  publishedAt: Date | null;
}
export interface PostRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
  find(id: string): Promise<Post | null>;
  findAll(page?: number, limit?: number): Promise<PostDTO[]>;
}
