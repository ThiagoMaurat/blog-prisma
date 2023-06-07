import { Post } from "@prisma/client";
import { PostRepository } from "@/server/repositories/post-repository";
import { UsersRepository } from "@/server/repositories/user-repository";

interface PostUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  thumbnail: string;
  themeId: string;
  description: string;
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
    themeId,
    thumbnail,
    description,
  }: PostUseCaseRequest): Promise<PostUseCaseResponse> {
    // create post

    // const isUserAdmin = await this.userRepository.findByIdUserAndCheckIfAdmin(
    //   authorId
    // );

    // if (!isUserAdmin) {
    //   throw new UserIsNotAdminError();
    // }

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

  async listAll(page?: number, limit?: number) {
    return this.postRepository.findAll(page, limit);
  }
}
