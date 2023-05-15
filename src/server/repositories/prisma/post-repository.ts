import { prisma } from "@/lib/prisma";
import { Post, Prisma } from "@prisma/client";
import { PostRepository } from "../post-repository";

export class PrismaPostRepository implements PostRepository {
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    const authorId = data.author.connect?.id;

    if (!authorId) {
      throw new Error("Author id not provided");
    }

    const createPost = await prisma.post.create({
      data: {
        ...data,
        author: {
          connect: { id: authorId },
        },
      },
    });

    if (!createPost) {
      throw new Error("Error creating post");
    }

    return createPost;
  }

  async find(id: string): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
}
