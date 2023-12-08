import {
  FindAllPostsOutput,
  PostRepository,
} from "@/server/repositories/post-repository";

interface ListAllPostsInput {
  page?: number | null;
  limit?: number | null;
  search?: string | null;
}

export class ListAllPostsUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({
    limit,
    page,
    search,
  }: ListAllPostsInput): Promise<FindAllPostsOutput> {
    const post = await this.postRepository.findAll(page, limit, search);

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  }
}
