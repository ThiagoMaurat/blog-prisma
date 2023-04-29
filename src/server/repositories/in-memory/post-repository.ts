import { Prisma, Post } from "@prisma/client";
import { PostRepository } from "../in-memory-post-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = [];

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    const post = {
      id: randomUUID(),
      title: data.title,
      content: data.content,
      publishedAt: new Date(),
      author: data.author,
      UserPost: data.UserPost,
    };

    this.items.push(post);

    return post;
  }
  async find(id: string): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Post[]> {
    throw new Error("Method not implemented.");
  }
}
