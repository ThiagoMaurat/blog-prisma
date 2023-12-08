import { PostRepository } from "@/server/repositories/post-repository";

interface ListPostByIdInput {
  id: string;
}

export interface ListPostByIdResponse {
  author: {
    image: string | null;
    name: string | null;
  };
  publishedAt: Date;
  themes: {
    themes: {
      id: string;
      name: string;
    };
  }[];
  title: string;
  id: string;
  content: string;
  description: string;
  thumbnail: string;
}

export class ListPostByIdUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute({ id }: ListPostByIdInput): Promise<ListPostByIdResponse> {
    const posts = await this.postRepository.find(id);

    if (!posts) {
      throw new Error("Post not found");
    }

    return posts;
  }
}
