import { Prisma, Post } from "@prisma/client";
import { PostRepository } from "../post-repository";
import { randomUUID } from "node:crypto";
import { InMemoryUserRepository } from "./users-repository";

export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = [];

  constructor(private readonly userRepository: InMemoryUserRepository) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    const author = await this.userRepository.items.find(
      (item) => item === data.author
    );

    const post: Post = {
      id: data.id ?? randomUUID(),
      title: data.title,
      content: data.content,
      publishedAt: new Date(),
      authorId: author?.id ?? "",
    };

    this.items.push(post);

    return post;
  }

  async find(id: string): Promise<Post | null> {
    const findPost = this.items.find((post) => post.id === id);

    if (!findPost) {
      return null;
    }

    return findPost;
  }

  async findAll(): Promise<Post[]> {
    return this.items;
  }
}
