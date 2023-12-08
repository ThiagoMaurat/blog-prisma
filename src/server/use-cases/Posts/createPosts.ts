import { Post } from "@prisma/client";
import { PostRepository } from "@/server/repositories/post-repository";
import { UserIsNotAdminError } from "@/server/errors/user-is-not-admin-error";

interface PostUseCaseInput {
  title: string;
  content: string;
  authorId: string;
  thumbnail: string;
  themeId: string;
  description: string;
  role: string;
}

export interface PostUseCaseResponse {
  post: Post;
}

export class PostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({
    authorId,
    content,
    title,
    themeId,
    thumbnail,
    description,
    role,
  }: PostUseCaseInput): Promise<PostUseCaseResponse> {
    if (role !== "admin") {
      throw new UserIsNotAdminError();
    }

    const post = await this.postRepository.create({
      author: {
        connect: {
          id: authorId,
        },
      },
      content,
      title,
      thumbnail,
      description,
      themesId: themeId,
      themes: {
        create: {
          themes: {
            connect: {
              id: themeId,
            },
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not created");
    }

    return { post };
  }
}
