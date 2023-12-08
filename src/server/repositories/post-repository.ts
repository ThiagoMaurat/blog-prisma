import { Prisma, Post } from "@prisma/client";

export type FindByIdOutput = {
  author: {
    image: string | null;
    name: string | null;
  };
  publishedAt: Date;
  themes: {
    themes: {
      id: string;
      name: string;
    };
  }[];
  title: string;
  id: string;
  content: string;
  description: string;
  thumbnail: string;
} | null;

export type FindAllPostsOutput = {
  total: number;
  page: number | null | undefined;
  limit: number | null | undefined;
  posts: {
    themes: {
      themes: {
        id: string;
        name: string;
      };
    }[];
    id: string;
    title: string;
    description: string;
    content: string;
    publishedAt: Date;
    thumbnail: string;
    author: {
      name: string | null;
      image: string | null;
    };
  }[];
};

export interface PostRepository {
  create(data: Prisma.PostCreateInput): Promise<Post>;
  find(id: string): Promise<FindByIdOutput>;
  findAll(
    page?: number | null,
    limit?: number | null,
    search?: string | null
  ): Promise<FindAllPostsOutput>;
}
