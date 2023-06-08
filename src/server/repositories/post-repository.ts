import { Prisma, Post, Themes } from "@prisma/client";

export interface PostDTO {
  content: string;
  title: string;
  thumbnail: string;
  description: string;
  id: string;
  themes: {
    themes: Themes;
  }[];
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
