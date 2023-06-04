import { prisma } from "@/lib/prisma";
import { Post, Prisma } from "@prisma/client";
import { PostRepository } from "../post-repository";

export class PrismaPostRepository implements PostRepository {
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    if (!data.author || !data.author.connect || !data.author.connect.id) {
      throw new Error("Author id not provided");
    }

    const createPost = await prisma.post.create({
      data: {
        ...data,
        author: {
          connect: data.author.connect,
        },
      },
    });

    if (!createPost) {
      throw new Error("Error creating post");
    }

    return createPost;
  }

  async find(id: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    return post;
  }

  async findAll(page?: number, limit?: number): Promise<Post[]> {
    const pageSizeFindAll = limit || 99999999;
    const pageFindAll = page || 9999999;

    const offset = (pageFindAll - 1) * pageSizeFindAll;

    const posts = await prisma.post.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        title: true,
        content: true,
        publishedAt: true,
        authorId: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return posts;
  }
}
