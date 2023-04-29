import { User, Post } from "@prisma/client";
import { PostRepository } from "@/server/repositories/in-memory-post-repository";
import { UsersRepository } from "@/server/repositories/in-memory-user-repository";
import { randomUUID } from "crypto";
import { UserDoesNotExistsError } from "@/server/errors/user-does-not-exist";

interface PostUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
}

interface PostUseCaseResponse {
  post: Post;
}

export class PostUseCase {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UsersRepository
  ) {}

  async execute({
    authorId,
    content,
    title,
  }: PostUseCaseRequest): Promise<PostUseCaseResponse> {
    // create post

    const findUser = await this.userRepository.findById(authorId);

    if (!findUser) {
      throw new UserDoesNotExistsError();
    }

    const post = await this.postRepository.create({
      id: randomUUID(),
      publishedAt: new Date(),
      author: {
        connect: {
          id: authorId,
        },
      },
      title: title,
      content: content,
    });

    if (!post) {
      throw new Error("Post not created");
    }

    return { post };
  }
}
