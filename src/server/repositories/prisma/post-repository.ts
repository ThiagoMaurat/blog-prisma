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
          connect: data.author.connect, // Utiliza a opção connect do objeto author
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
