import { User, Post } from "@prisma/client";
import { randomUUID } from "crypto";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";
import { PostRepository } from "@/server/repositories/post-repository";
import { UsersRepository } from "@/server/repositories/user-repository";

interface PostUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
}

interface PostUseCaseResponse {
  post: Post;
}

export class PostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({
    authorId,
    content,
    title,
  }: PostUseCaseRequest): Promise<PostUseCaseResponse> {
    // create post

    const post = await this.postRepository.create({
      author: {
        connect: {
          id: authorId,
        },
      },
      id: randomUUID(),
      content,
      title,
      publishedAt: new Date(),
    });

    if (!post) {
      throw new Error("Post not created");
    }

    return { post };
  }
}
