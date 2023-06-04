import { Post } from "@prisma/client";
import { randomUUID } from "crypto";
import { PostRepository } from "@/server/repositories/post-repository";
import { UsersRepository } from "@/server/repositories/user-repository";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

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

    const isUserAdmin = await this.userRepository.findByIdUserAndCheckIfAdmin(
      authorId
    );

    if (!isUserAdmin) {
      throw new UserIsNotAdminError();
    }

    const post = await this.postRepository.create({
      author: {
        connect: {
          id: isUserAdmin.id,
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

  async listAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}
